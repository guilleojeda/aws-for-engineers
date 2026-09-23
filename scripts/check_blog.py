#!/usr/bin/env python3
"""Check generated blog routes and metadata against the current Markdown posts."""

from __future__ import annotations

import json
import re
import tomllib
from datetime import date, datetime, timezone
from html.parser import HTMLParser
from pathlib import Path
from typing import Any
from urllib.parse import unquote, urljoin, urlsplit
import xml.etree.ElementTree as ET


PRODUCTION_BASE = "https://dondeaprendoaws.com/"
BLOG_IMAGE_PATH = re.compile(r"^/assets/blog/[0-9a-f]{64}\.[a-z0-9]+$", re.IGNORECASE)
FORBIDDEN_RUNTIME = (
    "unicornplatform",
    "unicorn-images",
    "sheets-api",
    "seobot",
    "googletagmanager",
    "google-analytics",
    "g-3nxs6qfkhz",
    "gtag(",
    "datalayer",
    "sbb-",
)


class BlogError(ValueError):
    """A generated blog output does not satisfy its Markdown contract."""


class BlogHtmlParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.meta: dict[str, list[str]] = {}
        self.canonicals: list[str] = []
        self.title: list[str] = []
        self.time_datetimes: list[str] = []
        self.links: list[dict[str, str]] = []
        self.images: list[dict[str, str]] = []
        self.asset_references: list[tuple[str, str]] = []
        self.ids: set[str] = set()
        self.script_sources: list[str] = []
        self.script_text: list[str] = []
        self.runtime_markers: list[str] = []
        self._current_script: list[str] = []
        self.form_count = 0
        self.submission_links: list[str] = []
        self._title_depth = 0
        self._script_depth = 0
        self._script_type = ""
        self._current_link: dict[str, str] | None = None
        self._link_depth = 0

    @staticmethod
    def _srcset_urls(srcset: str) -> list[str]:
        return [candidate.strip().split()[0] for candidate in srcset.split(",") if candidate.strip()]

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = {key.lower(): value or "" for key, value in attrs}
        self.runtime_markers.extend(
            value
            for key, value in values.items()
            if key in {"class", "id", "content", "action", "onclick"} or key.startswith("data-")
        )
        if values.get("id"):
            self.ids.add(values["id"])

        if tag == "meta":
            key = values.get("name") or values.get("property") or ""
            content = values.get("content", "")
            if key and content:
                self.meta.setdefault(key.lower(), []).append(content)
        elif tag == "link" and "canonical" in values.get("rel", "").lower().split():
            self.canonicals.append(values.get("href", ""))
        elif tag == "title":
            self._title_depth += 1
        elif tag == "time" and values.get("datetime"):
            self.time_datetimes.append(values["datetime"])
        elif tag == "a":
            self._current_link = {"href": values.get("href", ""), "text": "", "alt": ""}
            self._link_depth = 1
            if "cta_form" in values.get("href", "").lower():
                self.submission_links.append(values["href"])
        elif self._current_link is not None:
            self._link_depth += 1

        if tag == "form":
            self.form_count += 1

        if tag == "img":
            image = {"src": values.get("src", ""), "alt": values.get("alt", "")}
            self.images.append(image)
            if image["src"]:
                self.asset_references.append((image["src"], "image"))
            self.asset_references.extend((src, "asset") for src in self._srcset_urls(values.get("srcset", "")))
        elif tag == "source":
            self.asset_references.extend((src, "asset") for src in self._srcset_urls(values.get("srcset", "")))
            if values.get("src"):
                self.asset_references.append((values["src"], "asset"))
        elif tag in {"audio", "video", "track"} and values.get("src"):
            self.asset_references.append((values["src"], "asset"))
        if tag == "video" and values.get("poster"):
            self.asset_references.append((values["poster"], "asset"))

        if tag == "script":
            self._script_depth += 1
            self._script_type = values.get("type", "").lower()
            self._current_script = []
            if values.get("src"):
                self.script_sources.append(values["src"])
                self.asset_references.append((values["src"], "script"))
        if tag == "link" and values.get("href"):
            rels = values.get("rel", "").lower().split()
            if "stylesheet" in rels:
                self.asset_references.append((values["href"], "stylesheet"))
            elif "icon" in rels:
                self.asset_references.append((values["href"], "asset"))

    def handle_startendtag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        self.handle_starttag(tag, attrs)
        self.handle_endtag(tag)

    def handle_data(self, data: str) -> None:
        if self._title_depth:
            self.title.append(data)
        if self._script_depth:
            self._current_script.append(data)
        if self._current_link is not None:
            self._current_link["text"] += data

    def handle_endtag(self, tag: str) -> None:
        if tag == "title" and self._title_depth:
            self._title_depth -= 1
        elif tag == "script" and self._script_depth:
            self._script_depth -= 1
            if not self._script_depth:
                self.script_text.append("".join(self._current_script))
                self._current_script = []
                self._script_type = ""
        elif tag == "a" and self._current_link is not None:
            self.links.append(self._current_link)
            self._current_link = None
            self._link_depth = 0
        elif self._current_link is not None and self._link_depth > 1:
            self._link_depth -= 1


def fail(message: str) -> None:
    raise BlogError(message)


def normalized(value: object) -> str:
    return " ".join(str(value).split())


def date_value(value: object, label: str) -> date | datetime:
    if isinstance(value, datetime):
        return value
    if isinstance(value, date):
        return value
    if isinstance(value, str):
        candidate = value.strip()
        try:
            if "T" in candidate or " " in candidate:
                return datetime.fromisoformat(candidate.replace("Z", "+00:00"))
            return date.fromisoformat(candidate)
        except ValueError:
            pass
    fail(f"{label} must be an ISO date or timestamp")
    raise AssertionError("unreachable")


def date_key(value: object, label: str) -> tuple[str, str]:
    parsed = date_value(value, label)
    if isinstance(parsed, datetime):
        if parsed.tzinfo is not None:
            parsed = parsed.astimezone(timezone.utc)
        return ("datetime", parsed.isoformat(timespec="microseconds" if parsed.microsecond else "seconds"))
    return ("date", parsed.isoformat())


def dates_match(actual: str, expected: object, label: str) -> bool:
    try:
        parsed_actual = date_value(actual, label)
        parsed_expected = date_value(expected, label)
        if isinstance(parsed_expected, date) and not isinstance(parsed_expected, datetime):
            actual_date = parsed_actual.date() if isinstance(parsed_actual, datetime) else parsed_actual
            return actual_date == parsed_expected
        if isinstance(parsed_actual, date) and not isinstance(parsed_actual, datetime):
            return False
        return date_key(parsed_actual, label) == date_key(parsed_expected, label)
    except BlogError:
        return False


def local_route(url: str, label: str) -> str:
    parts = urlsplit(url)
    if parts.query or parts.fragment:
        fail(f"{label} must not contain a query or fragment: {url}")
    if parts.scheme or parts.netloc:
        if f"{parts.scheme}://{parts.netloc}/" != PRODUCTION_BASE:
            fail(f"{label} must use the production site URL: {url}")
    path = unquote(parts.path)
    if path != "/blog/" and not re.fullmatch(r"/blog/[^/]+/", path):
        fail(f"{label} must be a clean /blog/<slug>/ route: {url}")
    return path


def blog_image_url(value: object, label: str) -> str:
    if not isinstance(value, str) or not BLOG_IMAGE_PATH.fullmatch(value):
        fail(f"{label} must be a content-hashed /assets/blog/<hash>.<ext> URL")
    return value


def read_posts(repository: Path) -> list[dict[str, Any]]:
    blog_dir = repository / "content" / "blog"
    if not blog_dir.is_dir():
        fail(f"Missing Markdown blog directory: {blog_dir}")

    posts: list[dict[str, Any]] = []
    for path in sorted(blog_dir.rglob("*.md")):
        if path.name == "_index.md":
            continue
        raw = path.read_text(encoding="utf-8")
        match = re.match(r"\A\+\+\+\s*\n(.*?)\n\+\+\+", raw, re.DOTALL)
        if not match:
            fail(f"{path.relative_to(repository)} must use TOML front matter delimited by +++")
        try:
            record = tomllib.loads(match.group(1))
        except tomllib.TOMLDecodeError as error:
            fail(f"Invalid front matter in {path.relative_to(repository)}: {error}")

        required = ("url", "title", "description", "date", "lastmod", "image", "archive_order")
        missing = [key for key in required if key not in record]
        if missing:
            fail(f"{path.relative_to(repository)} is missing: {', '.join(missing)}")
        if not isinstance(record["title"], str) or not record["title"].strip():
            fail(f"{path.relative_to(repository)} title must be nonempty text")
        if not isinstance(record["description"], str) or not record["description"].strip():
            fail(f"{path.relative_to(repository)} description must be nonempty text")
        if isinstance(record["archive_order"], bool) or not isinstance(record["archive_order"], (int, float)):
            fail(f"{path.relative_to(repository)} archive_order must be numeric")
        date_value(record["date"], f"{path.relative_to(repository)} date")
        date_value(record["lastmod"], f"{path.relative_to(repository)} lastmod")
        route = local_route(str(record["url"]), f"{path.relative_to(repository)} url")
        image = blog_image_url(record["image"], f"{path.relative_to(repository)} image")
        if "image_alt" in record and not isinstance(record["image_alt"], str):
            fail(f"{path.relative_to(repository)} image_alt must be text when present")
        if "author" in record and (not isinstance(record["author"], str) or not record["author"].strip()):
            fail(f"{path.relative_to(repository)} author must be nonempty text when present")

        related = record.get("related", [])
        if not isinstance(related, list):
            fail(f"{path.relative_to(repository)} related must be an array of tables")
        related_records: list[dict[str, str]] = []
        for index, item in enumerate(related):
            if not isinstance(item, dict):
                fail(f"{path.relative_to(repository)} related[{index}] must be a table")
            for key in ("title", "url", "image"):
                if not isinstance(item.get(key), str) or not item[key].strip():
                    fail(f"{path.relative_to(repository)} related[{index}].{key} must be nonempty text")
            related_records.append(
                {
                    "title": item["title"],
                    "route": local_route(item["url"], f"{path.relative_to(repository)} related[{index}].url"),
                    "image": blog_image_url(item["image"], f"{path.relative_to(repository)} related[{index}].image"),
                }
            )

        posts.append(
            {
                "source": path,
                "front_matter": record,
                "route": route,
                "title": record["title"],
                "description": record["description"],
                "date": record["date"],
                "lastmod": record["lastmod"],
                "image": image,
                "related": related_records,
            }
        )

    if not posts:
        fail("No Markdown blog posts found under content/blog")
    routes = [post["route"] for post in posts]
    if len(routes) != len(set(routes)):
        fail("Blog Markdown contains duplicate article URLs")
    return posts


def read_page(path: Path) -> BlogHtmlParser:
    if not path.is_file():
        fail(f"Missing generated blog page: {path}")
    source = path.read_text(encoding="utf-8")
    parser = BlogHtmlParser()
    parser.feed(source)
    parser.close()
    return parser


def page_file(site_dir: Path, route: str) -> Path:
    if route == "/":
        return site_dir / "index.html"
    return site_dir / route.strip("/") / "index.html"


def canonical_url(route: str) -> str:
    return urljoin(PRODUCTION_BASE, route.lstrip("/"))


def parsed_blog_path(url: str, current_url: str, label: str) -> tuple[str, str]:
    resolved = urljoin(current_url, url)
    parts = urlsplit(resolved)
    if parts.scheme not in {"http", "https"} or parts.netloc.lower() not in {
        "dondeaprendoaws.com",
        "www.dondeaprendoaws.com",
    }:
        return "", ""
    path = unquote(parts.path)
    if path.startswith("/blog/"):
        if not path.endswith("/"):
            path += "/"
        return path, parts.fragment
    return "", ""


def check_runtime(parser: BlogHtmlParser, label: str) -> None:
    runtime_text = "\n".join(parser.runtime_markers + parser.script_sources + parser.script_text).lower()
    for marker in FORBIDDEN_RUNTIME:
        if marker in runtime_text:
            fail(f"{label} contains forbidden platform, SEObot, or preview Analytics runtime marker: {marker}")
    if parser.form_count:
        fail(f"{label} contains a form")
    if parser.submission_links:
        fail(f"{label} links to the removed submission form: {parser.submission_links[0]}")
    for script_url in parser.script_sources:
        parts = urlsplit(script_url)
        if parts.scheme or parts.netloc:
            fail(f"{label} must not load an external runtime script: {script_url}")


def validate_local_assets(site_dir: Path, parser: BlogHtmlParser, label: str) -> None:
    for reference, kind in parser.asset_references:
        parts = urlsplit(reference)
        if parts.scheme or parts.netloc:
            if kind in {"image", "script", "stylesheet"}:
                descriptor = "editorial image" if kind == "image" else "runtime asset"
                fail(f"{label} has an externally hosted {descriptor}: {reference}")
            continue
        if not parts.path.startswith("/assets/"):
            if kind == "image":
                fail(f"{label} image must use a local /assets/blog/ URL: {reference}")
            continue
        if kind == "image" and not BLOG_IMAGE_PATH.fullmatch(parts.path):
            fail(f"{label} image must use a content-hashed /assets/blog/<hash>.<ext> URL: {reference}")
        target = site_dir / unquote(parts.path).lstrip("/")
        if not target.is_file():
            fail(f"{label} references a missing local asset: {reference}")


def structured_blog_post(parser: BlogHtmlParser, label: str) -> dict[str, Any]:
    candidates: list[dict[str, Any]] = []
    for script in parser.script_text:
        try:
            value = json.loads(script)
        except json.JSONDecodeError:
            continue
        stack = value if isinstance(value, list) else [value]
        while stack:
            item = stack.pop()
            if isinstance(item, list):
                stack.extend(item)
            elif isinstance(item, dict):
                types = item.get("@type", [])
                if isinstance(types, str):
                    types = [types]
                if "BlogPosting" in types:
                    candidates.append(item)
                graph = item.get("@graph", [])
                if isinstance(graph, list):
                    stack.extend(graph)
    if not candidates:
        fail(f"{label} is missing BlogPosting structured data")
    return candidates[0]


def validate_article(site_dir: Path, post: dict[str, Any], output: Path) -> BlogHtmlParser:
    label = f"Generated article {post['route']}"
    parser = read_page(output)
    check_runtime(parser, label)
    validate_local_assets(site_dir, parser, label)

    expected_canonical = canonical_url(post["route"])
    if parser.canonicals != [expected_canonical]:
        fail(f"{label} canonical must be {expected_canonical}, got {parser.canonicals}")
    if parser.meta.get("og:title") != [post["title"]]:
        fail(f"{label} og:title does not match Markdown title")
    if parser.meta.get("description") != [post["description"]]:
        fail(f"{label} description does not match Markdown description")
    if parser.meta.get("og:description") != [post["description"]]:
        fail(f"{label} og:description does not match Markdown description")
    title = normalized("".join(parser.title))
    if normalized(post["title"]) not in title:
        fail(f"{label} HTML title does not include the Markdown title")

    published = parser.meta.get("article:published_time", [])
    modified = parser.meta.get("article:modified_time", [])
    if len(published) != 1 or not dates_match(published[0], post["date"], f"{label} article:published_time"):
        fail(f"{label} article:published_time does not match Markdown date")
    if len(modified) != 1 or not dates_match(modified[0], post["lastmod"], f"{label} article:modified_time"):
        fail(f"{label} article:modified_time does not match Markdown lastmod")
    if not any(dates_match(value, post["date"], f"{label} visible time") for value in parser.time_datetimes):
        fail(f"{label} has no visible time element for the Markdown publication date")

    og_images = parser.meta.get("og:image", [])
    if len(og_images) != 1 or urlsplit(og_images[0]).path != post["image"]:
        fail(f"{label} og:image does not match the local Markdown image")
    expected_image = urlsplit(post["image"]).path

    structured = structured_blog_post(parser, label)
    if normalized(structured.get("headline", "")) != normalized(post["title"]):
        fail(f"{label} BlogPosting headline does not match Markdown title")
    if normalized(structured.get("description", "")) != normalized(post["description"]):
        fail(f"{label} BlogPosting description does not match Markdown description")
    if not dates_match(str(structured.get("datePublished", "")), post["date"], f"{label} datePublished"):
        fail(f"{label} BlogPosting datePublished does not match Markdown date")
    if not dates_match(str(structured.get("dateModified", "")), post["lastmod"], f"{label} dateModified"):
        fail(f"{label} BlogPosting dateModified does not match Markdown lastmod")
    structured_images = structured.get("image", [])
    if isinstance(structured_images, str):
        structured_images = [structured_images]
    elif isinstance(structured_images, dict):
        structured_images = [structured_images.get("url", "")]
    if not any(urlsplit(str(value)).path == expected_image for value in structured_images):
        fail(f"{label} BlogPosting image does not match the local Markdown image")
    if "author" in post["front_matter"]:
        author = structured.get("author", [])
        if isinstance(author, (str, dict)):
            author = [author]
        names = [item if isinstance(item, str) else item.get("name", "") for item in author if isinstance(item, (str, dict))]
        if post["front_matter"]["author"] not in names:
            fail(f"{label} BlogPosting author does not match Markdown author")

    for related in post["related"]:
        route = related["route"]
        candidates = [
            link
            for link in parser.links
            if parsed_blog_path(link["href"], expected_canonical, label)[0] == route
        ]
        if not candidates:
            fail(f"{label} is missing its related article link: {route}")
        if not any(normalized(related["title"]) in normalized(link["text"]) for link in candidates):
            fail(f"{label} related link {route} does not display its Markdown title")
        if not any(urlsplit(image["src"]).path == related["image"] for image in parser.images):
            fail(f"{label} is missing related image {related['image']}")
    return parser


def validate_blog(site_dir: Path, repository: Path) -> None:
    posts = read_posts(repository)
    route_to_post = {post["route"]: post for post in posts}
    for post in posts:
        output = page_file(site_dir, post["route"])
        if not output.is_file():
            fail(f"Markdown article {post['route']} has no generated article at {output}")

    archive_route = "/blog/"
    archive_file = page_file(site_dir, archive_route)
    archive = read_page(archive_file)
    check_runtime(archive, "Generated blog archive")
    validate_local_assets(site_dir, archive, "Generated blog archive")
    archive_canonical = canonical_url(archive_route)
    if archive.canonicals != [archive_canonical]:
        fail(f"Generated blog archive canonical must be {archive_canonical}, got {archive.canonicals}")

    for post in posts:
        image_path = urlsplit(post["image"]).path
        image_file = site_dir / unquote(image_path).lstrip("/")
        if not image_file.is_file():
            fail(f"Markdown cover image is missing from generated output: {post['image']}")
        expected_alt = post["front_matter"].get("image_alt", post["title"])
        if not any(
            urlsplit(image["src"]).path == image_path and image["alt"] == expected_alt
            for image in archive.images
        ):
            fail(f"Blog archive cover image or alt text does not match Markdown for {post['route']}")
        for related in post["related"]:
            related_file = site_dir / unquote(related["image"]).lstrip("/")
            if not related_file.is_file():
                fail(f"Related image is missing from generated output: {related['image']}")

    expected_order = [post["route"] for post in sorted(posts, key=lambda post: (post["front_matter"]["archive_order"], post["route"]))]
    archive_order: list[str] = []
    for link in archive.links:
        route, _ = parsed_blog_path(link["href"], archive_canonical, "Generated blog archive")
        if route in route_to_post and route not in archive_order:
            archive_order.append(route)
    if archive_order != expected_order:
        missing = [route for route in expected_order if route not in archive_order]
        unexpected = [route for route in archive_order if route not in route_to_post]
        fail(f"Blog archive links/order differ from Markdown archive_order (missing={missing}, unexpected={unexpected})")

    page_parsers: dict[str, BlogHtmlParser] = {archive_route: archive}
    for post in posts:
        output = page_file(site_dir, post["route"])
        page_parsers[post["route"]] = validate_article(site_dir, post, output)

    for post in posts:
        for related in post["related"]:
            if related["route"] not in route_to_post:
                fail(f"{post['source'].relative_to(repository)} related link points to missing Markdown article {related['route']}")

    allowed_routes = set(route_to_post) | {archive_route}
    for current_route, parser in page_parsers.items():
        current_url = canonical_url(current_route)
        for link in parser.links:
            route, fragment = parsed_blog_path(link["href"], current_url, f"{current_route} link")
            if not route:
                continue
            if route not in allowed_routes:
                fail(f"{current_route} links to a missing blog route: {link['href']}")
            if fragment:
                target_parser = page_parsers.get(route)
                fragment_ids = {fragment, unquote(fragment)}
                if target_parser is None or not fragment_ids.intersection(target_parser.ids):
                    fail(f"{current_route} links to a missing heading fragment: {link['href']}")

    sitemap_path = site_dir / "sitemap.xml"
    if not sitemap_path.is_file():
        fail("Generated site is missing sitemap.xml")
    try:
        root = ET.parse(sitemap_path).getroot()
    except ET.ParseError as error:
        fail(f"Generated sitemap.xml is invalid: {error}")
    sitemap: dict[str, str] = {}
    for url_node in root.iter():
        if url_node.tag.rsplit("}", 1)[-1] != "url":
            continue
        values = {child.tag.rsplit("}", 1)[-1]: (child.text or "").strip() for child in url_node}
        loc = values.get("loc", "")
        if loc:
            sitemap[loc] = values.get("lastmod", "")
    blog_sitemap = {url for url in sitemap if urlsplit(url).path.startswith("/blog/")}
    expected_sitemap = {canonical_url(archive_route)} | {canonical_url(post["route"]) for post in posts}
    if blog_sitemap != expected_sitemap:
        missing = sorted(expected_sitemap - blog_sitemap)
        unexpected = sorted(blog_sitemap - expected_sitemap)
        fail(f"Sitemap blog routes differ from Markdown (missing={missing}, unexpected={unexpected})")
    for post in posts:
        sitemap_url = canonical_url(post["route"])
        if not dates_match(sitemap.get(sitemap_url, ""), post["lastmod"], f"sitemap lastmod for {post['route']}"):
            fail(f"Sitemap lastmod does not match Markdown lastmod for {post['route']}")

    print(f"Blog validation passed: {len(posts)} Markdown articles, archive order, sitemap, metadata, internal links, local media, and runtime checks.")
