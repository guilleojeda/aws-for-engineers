from __future__ import annotations

import json
import tempfile
import threading
import unittest
from pathlib import Path
from unittest.mock import patch

import scripts.publish as publisher


REVISION = "a" * 40


class FakeAWS:
    def __init__(
        self,
        existing: set[str] | None = None,
        fail_upload_key: str | None = None,
        delete_error: dict[str, str] | None = None,
    ):
        self.existing = existing or set()
        self.fail_upload_key = fail_upload_key
        self.delete_error = delete_error
        self.calls: list[list[str]] = []
        self.deleted: list[str] = []

    def __call__(self, *arguments: str) -> str:
        call = list(arguments)
        self.calls.append(call)
        if call[:2] == ["s3", "cp"]:
            key = call[3].split("/", 3)[-1]
            if key == self.fail_upload_key:
                raise publisher.PublishError(f"failed upload {key}")
            return ""
        if call[:2] == ["s3api", "list-objects-v2"]:
            return json.dumps({"Contents": [{"Key": key} for key in sorted(self.existing)]})
        if call[:2] == ["s3api", "delete-objects"]:
            argument = call[call.index("--delete") + 1]
            payload = json.loads(Path(argument.removeprefix("file://")).read_text(encoding="utf-8"))
            self.deleted.extend(item["Key"] for item in payload["Objects"])
            if self.delete_error:
                return json.dumps(
                    {"Errors": [{"Key": self.delete_error["key"], "Code": self.delete_error["code"]}]}
                )
            return "{}"
        if call[:2] == ["cloudfront", "create-invalidation"]:
            return json.dumps({"Invalidation": {"Id": "I123"}})
        if call[:2] == ["cloudfront", "wait"]:
            return ""
        raise AssertionError(f"Unexpected AWS call: {call}")


class PublishTests(unittest.TestCase):
    def make_site(self, *, marker_revision: str = REVISION) -> Path:
        directory = Path(self.temporary.name) / "public"
        (directory / "assets").mkdir(parents=True, exist_ok=True)
        (directory / "index.html").write_text("<html></html>", encoding="utf-8")
        (directory / "assets" / "app.0123456789abcdef.js").write_text("app", encoding="utf-8")
        (directory / "assets" / "theme.css").write_text("body{}", encoding="utf-8")
        (directory / "revision.json").write_text(
            json.dumps({"revision": marker_revision}) + "\n", encoding="utf-8"
        )
        return directory

    def setUp(self) -> None:
        self.temporary = tempfile.TemporaryDirectory()
        self.addCleanup(self.temporary.cleanup)

    def install_successful_site_verification(self) -> None:
        def response(url: str) -> tuple[int, dict[str, str], bytes]:
            if url.endswith("/revision.json"):
                return 200, {"Content-Type": "application/json"}, json.dumps({"revision": REVISION}).encode()
            if "/assets/" in url:
                return 200, {"Content-Type": "text/css"}, b"body{}"
            if url.endswith("/__publish_check_missing__"):
                return 404, {"Content-Type": "text/html", "X-Robots-Tag": "noindex, nofollow"}, b"404"
            return (
                200,
                {"Content-Type": "text/html; charset=utf-8", "X-Robots-Tag": "noindex, nofollow"},
                b'<html><link rel="stylesheet" href="/assets/app.0123456789abcdef.css"></html>',
            )

        self.addCleanup(patch.stopall)
        patcher = patch.object(publisher, "request_bytes", side_effect=response)
        patcher.start()
        patcher2 = patch.object(publisher, "check_main_head")
        patcher2.start()

    def test_hashed_assets_upload_first_and_obsolete_pages_delete_without_assets(self) -> None:
        site = self.make_site()
        fake_aws = FakeAWS(
            {"old-article/index.html", "assets/old.abcdef123456.css", "assets/theme.css"}
        )
        self.install_successful_site_verification()
        with patch.object(publisher, "aws", side_effect=fake_aws):
            publisher.publish_site(site, "site-bucket", "D123", "https://d123.cloudfront.net", REVISION)

        uploads = [call for call in fake_aws.calls if call[:2] == ["s3", "cp"]]
        keys = [call[3].split("/", 3)[-1] for call in uploads]
        self.assertEqual(keys[:2], ["assets/app.0123456789abcdef.js", "assets/theme.css"])
        self.assertEqual(fake_aws.deleted, ["old-article/index.html"])
        self.assertNotIn("assets/old.abcdef123456.css", fake_aws.deleted)
        self.assertLess(keys.index("assets/app.0123456789abcdef.js"), keys.index("index.html"))
        self.assertEqual(uploads[0][uploads[0].index("--cache-control") + 1], publisher.ASSET_CACHE_CONTROL)
        self.assertEqual(uploads[1][uploads[1].index("--cache-control") + 1], publisher.MUTABLE_CACHE_CONTROL)

    def test_existing_content_hashed_asset_is_not_reuploaded(self) -> None:
        site = self.make_site()
        fake_aws = FakeAWS(existing={"assets/app.0123456789abcdef.js"})
        self.install_successful_site_verification()
        with patch.object(publisher, "aws", side_effect=fake_aws):
            publisher.publish_site(site, "site-bucket", "D123", "https://d123.cloudfront.net", REVISION)

        uploads = [call[3].split("/", 3)[-1] for call in fake_aws.calls if call[:2] == ["s3", "cp"]]
        self.assertNotIn("assets/app.0123456789abcdef.js", uploads)
        self.assertIn("assets/theme.css", uploads)
        self.assertIn("index.html", uploads)

    def test_upload_failure_stops_before_deleting_or_invalidating(self) -> None:
        site = self.make_site()
        fake_aws = FakeAWS(existing={"old.html"}, fail_upload_key="assets/theme.css")
        self.install_successful_site_verification()
        with patch.object(publisher, "aws", side_effect=fake_aws):
            with self.assertRaisesRegex(publisher.PublishError, "failed upload assets/theme.css"):
                publisher.publish_site(site, "site-bucket", "D123", "https://d123.cloudfront.net", REVISION)

        self.assertEqual(len([call for call in fake_aws.calls if call[:2] == ["s3", "cp"]]), 2)
        self.assertEqual(len([call for call in fake_aws.calls if call[:2] == ["s3api", "list-objects-v2"]]), 1)
        self.assertFalse(any(call[0] == "cloudfront" for call in fake_aws.calls))
        self.assertEqual(fake_aws.deleted, [])

    def test_blog_media_uploads_in_parallel_before_pages(self) -> None:
        site = self.make_site()
        media = site / "assets" / "blog"
        media.mkdir()
        names = [f"{number:064x}.png" for number in range(4)]
        for name in names:
            (media / name).write_bytes(b"image")
        gate = threading.Barrier(len(names))
        completed: set[str] = set()

        def upload(_path: Path, key: str, _bucket: str) -> None:
            if key.startswith("assets/blog/"):
                gate.wait(timeout=3)
                completed.add(key)
            if key == "index.html":
                self.assertEqual(completed, {f"assets/blog/{name}" for name in names})

        self.install_successful_site_verification()
        with patch.object(publisher, "aws", side_effect=FakeAWS()):
            with patch.object(publisher, "upload_file", side_effect=upload):
                publisher.publish_site(site, "site-bucket", "D123", "https://d123.cloudfront.net", REVISION)

    def test_partial_s3_delete_response_fails_before_invalidation(self) -> None:
        site = self.make_site()
        fake_aws = FakeAWS(
            existing={"old-article/index.html"},
            delete_error={"key": "old-article/index.html", "code": "AccessDenied"},
        )
        self.install_successful_site_verification()
        with patch.object(publisher, "aws", side_effect=fake_aws):
            with self.assertRaisesRegex(publisher.PublishError, "old-article/index.html: AccessDenied"):
                publisher.publish_site(site, "site-bucket", "D123", "https://d123.cloudfront.net", REVISION)

        self.assertEqual(fake_aws.deleted, ["old-article/index.html"])
        self.assertFalse(any(call[0] == "cloudfront" for call in fake_aws.calls))

    def test_stale_automatic_revision_stops_before_any_aws_request(self) -> None:
        site = self.make_site()
        fake_aws = FakeAWS()
        with patch.object(publisher, "check_main_head", side_effect=publisher.PublishError("stale")):
            with patch.object(publisher, "aws", side_effect=fake_aws):
                with self.assertRaisesRegex(publisher.PublishError, "stale"):
                    publisher.publish_site(site, "site-bucket", "D123", "https://d123.cloudfront.net", REVISION)
        self.assertEqual(fake_aws.calls, [])

    def test_main_head_guard_accepts_current_commit_and_rejects_older_one(self) -> None:
        with patch.object(publisher, "run", return_value=f"{REVISION}\trefs/heads/main\n") as run_command:
            publisher.check_main_head(REVISION)
        run_command.assert_called_once_with(["git", "ls-remote", "origin", "refs/heads/main"])

        with patch.object(publisher, "run", return_value=f"{'b' * 40}\trefs/heads/main\n"):
            with self.assertRaisesRegex(publisher.PublishError, "Refusing stale automatic publish"):
                publisher.check_main_head(REVISION)

    def test_restore_requires_matching_revision_marker_and_bypasses_only_head_guard(self) -> None:
        mismatch_site = self.make_site(marker_revision="b" * 40)
        fake_aws = FakeAWS()
        with patch.object(publisher, "check_main_head", side_effect=AssertionError("restore must skip stale guard")):
            with patch.object(publisher, "aws", side_effect=fake_aws):
                with self.assertRaisesRegex(publisher.PublishError, "does not match"):
                    publisher.publish_site(
                        mismatch_site,
                        "site-bucket",
                        "D123",
                        "https://d123.cloudfront.net",
                        REVISION,
                        restore=True,
                    )
        self.assertEqual(fake_aws.calls, [])

        site = self.make_site()
        self.install_successful_site_verification()
        with patch.object(publisher, "check_main_head", side_effect=AssertionError("restore must skip stale guard")):
            with patch.object(publisher, "aws", side_effect=fake_aws):
                publisher.publish_site(
                    site,
                    "site-bucket",
                    "D123",
                    "https://d123.cloudfront.net",
                    REVISION,
                    restore=True,
                )


if __name__ == "__main__":
    unittest.main()
