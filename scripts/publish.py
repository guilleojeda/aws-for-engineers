#!/usr/bin/env python3
"""Publish a Hugo output directory to the private S3/CloudFront site."""

from __future__ import annotations

import argparse
from concurrent.futures import ThreadPoolExecutor, as_completed
import json
import mimetypes
import os
import re
import subprocess
import sys
import tempfile
import urllib.error
import urllib.request
from html.parser import HTMLParser
from pathlib import Path
from typing import Iterable
from urllib.parse import urljoin


REVISION_RE = re.compile(r"^[0-9a-f]{40}$")
HASHED_ASSET_RE = re.compile(r"(?:^|[.-])[0-9a-f]{12,64}(?:[.-]|$)", re.IGNORECASE)
ASSET_CACHE_CONTROL = "public, max-age=31536000, immutable"
MUTABLE_CACHE_CONTROL = "public, max-age=0, s-maxage=60, must-revalidate"


class PublishError(RuntimeError):
    pass


class _LocalStylesheetParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.hrefs: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag.lower() != "link":
            return
        values = {key.lower(): value for key, value in attrs}
        rel = (values.get("rel") or "").lower().split()
        href = values.get("href")
        if "stylesheet" in rel and href:
            self.hrefs.append(href)


def run(command: list[str], *, cwd: Path | None = None) -> str:
    try:
        result = subprocess.run(command, cwd=cwd, text=True, capture_output=True, check=True)
    except FileNotFoundError as error:
        raise PublishError(f"Required command not found: {command[0]}") from error
    except subprocess.CalledProcessError as error:
        detail = (error.stderr or error.stdout or "").strip()
        raise PublishError(f"Command failed ({error.returncode}): {' '.join(command)}\n{detail}") from error
    return result.stdout


def validate_revision(value: str) -> str:
    if not REVISION_RE.fullmatch(value):
        raise PublishError("Revision must be a 40-character lowercase Git commit SHA.")
    return value


def site_files(site_dir: Path) -> list[Path]:
    root = site_dir.resolve(strict=True)
    if not root.is_dir():
        raise PublishError(f"Site output is not a directory: {root}")
    files: list[Path] = []
    for path in sorted(root.rglob("*")):
        if path.is_symlink():
            raise PublishError(f"Symbolic links are not publishable: {path}")
        if path.is_file():
            files.append(path)
    if not files:
        raise PublishError(f"Site output is empty: {root}")
    if not any(path.relative_to(root).as_posix() == "index.html" for path in files):
        raise PublishError("Site output must include index.html.")
    return files


def prepare_site(site_dir: Path, revision: str) -> Path:
    revision = validate_revision(revision)
    root = site_dir.resolve(strict=True)
    if not root.is_dir():
        raise PublishError(f"Site output is not a directory: {root}")
    marker = root / "revision.json"
    payload = json.dumps({"revision": revision}, separators=(",", ":")) + "\n"
    temporary = root / ".revision.json.tmp"
    temporary.write_text(payload, encoding="utf-8")
    temporary.replace(marker)
    return marker


def require_artifact_revision(site_dir: Path, revision: str) -> list[Path]:
    revision = validate_revision(revision)
    files = site_files(site_dir)
    marker_path = site_dir.resolve() / "revision.json"
    try:
        marker = json.loads(marker_path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as error:
        raise PublishError("Build artifact is missing a valid revision.json.") from error
    if marker != {"revision": revision}:
        raise PublishError("Build artifact revision does not match the requested Git commit.")
    return files


def check_main_head(revision: str) -> None:
    output = run(["git", "ls-remote", "origin", "refs/heads/main"])
    rows = [line.split() for line in output.splitlines() if line.strip()]
    if len(rows) != 1 or len(rows[0]) != 2 or rows[0][1] != "refs/heads/main":
        raise PublishError("Could not determine the current origin/main commit; no files were uploaded.")
    if rows[0][0].lower() != revision:
        raise PublishError(
            f"Refusing stale automatic publish for {revision}; origin/main is {rows[0][0].lower()}."
        )


def aws(*arguments: str) -> str:
    return run(["aws", *arguments, "--no-cli-pager"])


def relative_key(root: Path, path: Path) -> str:
    return path.relative_to(root).as_posix()


def is_asset(key: str) -> bool:
    return key.startswith("assets/")


def is_hashed_asset(key: str) -> bool:
    return is_asset(key) and HASHED_ASSET_RE.search(Path(key).name) is not None


def cache_control(key: str) -> str:
    return ASSET_CACHE_CONTROL if is_hashed_asset(key) else MUTABLE_CACHE_CONTROL


def upload_file(path: Path, key: str, bucket: str) -> None:
    content_type = mimetypes.guess_type(path.name)[0] or "application/octet-stream"
    print(f"Uploading {key}", flush=True)
    aws(
        "s3",
        "cp",
        str(path),
        f"s3://{bucket}/{key}",
        "--cache-control",
        cache_control(key),
        "--content-type",
        content_type,
        "--only-show-errors",
    )


def upload_batch(files: list[tuple[str, Path]], bucket: str) -> None:
    with ThreadPoolExecutor(max_workers=8) as pool:
        uploads = [pool.submit(upload_file, path, key, bucket) for key, path in files]
        for upload in as_completed(uploads):
            upload.result()


def remote_keys(bucket: str) -> set[str]:
    response = json.loads(aws("s3api", "list-objects-v2", "--bucket", bucket, "--output", "json"))
    return {item["Key"] for item in response.get("Contents", []) if "Key" in item}


def delete_obsolete_pages(bucket: str, existing: set[str], desired: set[str]) -> list[str]:
    obsolete = sorted(key for key in existing - desired if not is_asset(key))
    for offset in range(0, len(obsolete), 500):
        batch = obsolete[offset : offset + 500]
        payload = json.dumps({"Objects": [{"Key": key} for key in batch], "Quiet": True})
        filename: str | None = None
        try:
            with tempfile.NamedTemporaryFile("w", encoding="utf-8", suffix=".json", delete=False) as stream:
                stream.write(payload)
                filename = stream.name
            response = json.loads(aws(
                "s3api",
                "delete-objects",
                "--bucket",
                bucket,
                "--delete",
                f"file://{filename}",
                "--output",
                "json",
            ))
            errors = response.get("Errors", [])
            if errors:
                failed = ", ".join(
                    f"{item.get('Key', '<unknown>')}: {item.get('Code', 'unknown')}"
                    for item in errors
                )
                raise PublishError(f"S3 did not delete all obsolete site objects: {failed}")
        finally:
            if filename is not None:
                Path(filename).unlink(missing_ok=True)
    return obsolete


def request_bytes(url: str) -> tuple[int, dict[str, str], bytes]:
    request = urllib.request.Request(url, headers={"User-Agent": "dondeaprendoaws-publisher/1"})
    try:
        with urllib.request.urlopen(request, timeout=20) as response:
            return response.status, dict(response.headers.items()), response.read()
    except urllib.error.HTTPError as error:
        return error.code, dict(error.headers.items()), error.read()
    except (urllib.error.URLError, TimeoutError) as error:
        raise PublishError(f"Could not verify {url}: {error}") from error


def verify_served_site(site_url: str, revision: str) -> None:
    base = site_url.rstrip("/")
    root_status, root_headers, root_body = request_bytes(base + "/")
    root_type = _header(root_headers, "content-type")
    if root_status != 200 or "text/html" not in root_type.lower():
        raise PublishError(f"Homepage verification failed: HTTP {root_status}, content type {root_type!r}.")
    if "noindex" not in _header(root_headers, "x-robots-tag").lower():
        raise PublishError("Homepage is missing the required X-Robots-Tag noindex response header.")

    stylesheets = _LocalStylesheetParser()
    stylesheets.feed(root_body.decode("utf-8", errors="replace"))
    local_stylesheet = next((href for href in stylesheets.hrefs if href.startswith("/assets/")), None)
    if local_stylesheet is None:
        raise PublishError("Homepage did not reference a generated local stylesheet under /assets/.")
    asset_url = urljoin(base + "/", local_stylesheet)
    asset_status, asset_headers, _ = request_bytes(asset_url)
    asset_type = _header(asset_headers, "content-type")
    if asset_status != 200 or "text/css" not in asset_type.lower():
        raise PublishError(f"Stylesheet verification failed: HTTP {asset_status}, content type {asset_type!r}.")

    missing_status, missing_headers, _ = request_bytes(base + "/__publish_check_missing__")
    missing_type = _header(missing_headers, "content-type")
    if missing_status != 404 or "text/html" not in missing_type.lower():
        raise PublishError(
            f"Not-found verification failed: HTTP {missing_status}, content type {missing_type!r}."
        )
    if "noindex" not in _header(missing_headers, "x-robots-tag").lower():
        raise PublishError("Not-found response is missing the required X-Robots-Tag noindex header.")

    revision_status, _, revision_body = request_bytes(base + "/revision.json")
    if revision_status != 200:
        raise PublishError(f"Revision endpoint verification failed: HTTP {revision_status}.")
    try:
        served = json.loads(revision_body)
    except json.JSONDecodeError as error:
        raise PublishError("The served revision.json is not valid JSON.") from error
    if served != {"revision": revision}:
        raise PublishError(f"CloudFront served revision {served!r}; expected {revision}.")


def _header(headers: dict[str, str], name: str) -> str:
    expected = name.lower()
    return next((value for key, value in headers.items() if key.lower() == expected), "")


def publish_site(
    site_dir: Path,
    bucket: str,
    distribution_id: str,
    site_url: str,
    revision: str,
    *,
    restore: bool = False,
) -> None:
    files = require_artifact_revision(site_dir, revision)
    if not bucket or not distribution_id or not site_url:
        raise PublishError("Bucket, distribution ID, and site URL are required.")
    if not site_url.startswith("https://"):
        raise PublishError("Site URL must use HTTPS.")

    # This check happens before the first AWS request or mutation. Explicit artifact restores
    # are selected from successful main-branch runs by the workflow and intentionally bypass it.
    if not restore:
        check_main_head(revision)

    root = site_dir.resolve()
    keyed_files = [(relative_key(root, path), path) for path in files]
    assets = [(key, path) for key, path in keyed_files if is_asset(key)]
    pages = [(key, path) for key, path in keyed_files if not is_asset(key)]
    hashed_assets = [(key, path) for key, path in assets if is_hashed_asset(key)]
    mutable_assets = [(key, path) for key, path in assets if not is_hashed_asset(key)]

    # Finish immutable assets before mutable files and pages. Independent uploads within
    # each group can run together; a failure still stops before deletion or invalidation.
    for group in (hashed_assets, mutable_assets, pages):
        upload_batch(group, bucket)

    existing = remote_keys(bucket)
    desired = {key for key, _ in keyed_files}
    deleted = delete_obsolete_pages(bucket, existing, desired)
    if deleted:
        print(f"Deleted {len(deleted)} obsolete non-asset object(s).", flush=True)

    invalidation = json.loads(
        aws(
            "cloudfront",
            "create-invalidation",
            "--distribution-id",
            distribution_id,
            "--paths",
            "/*",
            "--output",
            "json",
        )
    )
    invalidation_id = invalidation["Invalidation"]["Id"]
    print(f"Waiting for CloudFront invalidation {invalidation_id}.", flush=True)
    aws(
        "cloudfront",
        "wait",
        "invalidation-completed",
        "--distribution-id",
        distribution_id,
        "--id",
        invalidation_id,
    )
    verify_served_site(site_url, revision)
    print(f"Verified served revision {revision} at {site_url.rstrip('/')}/", flush=True)


def parser() -> argparse.ArgumentParser:
    root = argparse.ArgumentParser(description=__doc__)
    commands = root.add_subparsers(dest="command", required=True)

    prepare = commands.add_parser("prepare", help="write the commit marker into a built site")
    prepare.add_argument("--site-dir", type=Path, default=Path("public"))
    prepare.add_argument("--revision", required=True)

    publish = commands.add_parser("publish", help="publish a built site and verify its served revision")
    publish.add_argument("--site-dir", type=Path, default=Path("public"))
    publish.add_argument("--bucket", default=os.environ.get("S3_BUCKET", ""))
    publish.add_argument("--distribution-id", default=os.environ.get("CLOUDFRONT_DISTRIBUTION_ID", ""))
    publish.add_argument("--site-url", default=os.environ.get("SITE_URL", ""))
    publish.add_argument("--revision", default=os.environ.get("GITHUB_SHA", ""))
    publish.add_argument(
        "--restore",
        action="store_true",
        help="publish an explicitly selected successful main build artifact, bypassing only the stale-run check",
    )
    return root


def main(argv: Iterable[str] | None = None) -> int:
    args = parser().parse_args(argv)
    try:
        if args.command == "prepare":
            marker = prepare_site(args.site_dir, args.revision)
            print(f"Prepared {marker} for revision {args.revision}")
        else:
            publish_site(
                args.site_dir,
                args.bucket,
                args.distribution_id,
                args.site_url,
                args.revision,
                restore=args.restore,
            )
    except (OSError, PublishError, KeyError, json.JSONDecodeError) as error:
        print(f"publish.py: {error}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
