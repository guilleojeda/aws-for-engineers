#!/usr/bin/env python3
"""Validate the generated directory against its Markdown source."""

from __future__ import annotations

import argparse
import re
import sys
import tomllib
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit


FORBIDDEN_RUNTIME_HOSTS = (
    "unicornplatform",
    "unicorn-images",
    "sheets-api",
    "seobot",
    "googletagmanager",
    "google-analytics",
    "fonts.googleapis.com",
    "fonts.gstatic.com",
    "recaptcha",
)
ASSET_PATH = re.compile(r"^/assets/.+\.[0-9a-f]{64}\.[a-z0-9]+$", re.IGNORECASE)


class SiteParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.cards: list[dict[str, str]] = []
        self.categories: list[str] = []
        self.asset_references: list[str] = []
        self.nav_hrefs: list[str] = []
        self.forms: list[dict[str, str]] = []
        self.anchor_hrefs: list[str] = []
        self.resource_card: dict[str, str] | None = None
        self.capture: tuple[str, str] | None = None
        self.capture_text: list[str] = []
        self.in_navigation = False
        self.inline_scripts = 0

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = {key: value or "" for key, value in attrs}

        if tag == "nav":
            self.in_navigation = True
        if tag == "form":
            self.forms.append(values)
        if tag == "script" and not values.get("src"):
            self.inline_scripts += 1

        if tag == "article" and "data-resource-card" in values:
            self.resource_card = {
                "id": values.get("data-resource-id", ""),
                "url": values.get("data-resource-url", ""),
                "category": values.get("data-category", ""),
                "order": values.get("data-order", ""),
                "featured": values.get("data-featured", ""),
                "source_row": values.get("data-source-row", ""),
                "title": "",
                "description": "",
                "href": "",
                "target": "",
            }
        elif tag == "a":
            href = values.get("href", "")
            self.anchor_hrefs.append(href)
            if self.in_navigation:
                self.nav_hrefs.append(href)
            if self.resource_card is not None:
                self.resource_card["href"] = href
                self.resource_card["target"] = values.get("target", "")
        elif tag == "h2" and self.resource_card is not None:
            self.capture = (tag, "title")
            self.capture_text = []
        elif tag == "p" and self.resource_card is not None:
            self.capture = (tag, "description")
            self.capture_text = []

        if tag == "button" and "data-category-button" in values:
            self.categories.append(values["data-category-button"])

        if values.get("src"):
            self.asset_references.append(values["src"])
        if values.get("srcset"):
            self.asset_references.extend(
                candidate.strip().split()[0]
                for candidate in values["srcset"].split(",")
                if candidate.strip()
            )
        if tag == "link" and any(
            rel in {"stylesheet", "icon"}
            for rel in values.get("rel", "").split()
        ):
            if values.get("href"):
                self.asset_references.append(values["href"])

    def handle_data(self, data: str) -> None:
        if self.capture is not None:
            self.capture_text.append(data)

    def handle_endtag(self, tag: str) -> None:
        if self.capture is not None and self.capture[0] == tag:
            _, field = self.capture
            if self.resource_card is not None:
                self.resource_card[field] = " ".join("".join(self.capture_text).split())
            self.capture = None
            self.capture_text = []
        if tag == "article" and self.resource_card is not None:
            self.cards.append(self.resource_card)
            self.resource_card = None
        if tag == "nav":
            self.in_navigation = False


def fail(message: str) -> None:
    raise ValueError(message)


def visible_text(value: object) -> str:
    return " ".join(str(value).split())


def read_resource_sources(repository: Path) -> list[dict[str, object]]:
    resources_dir = repository / "content" / "resources"
    if not resources_dir.is_dir():
        fail(f"Missing Markdown resources directory: {resources_dir}")

    source_records: list[dict[str, object]] = []
    for path in sorted(resources_dir.glob("*.md")):
        if path.name == "_index.md":
            continue
        text = path.read_text(encoding="utf-8")
        match = re.match(r"\A\+\+\+\s*\n(.*?)\n\+\+\+", text, re.DOTALL)
        if not match:
            fail(f"{path.relative_to(repository)} must use TOML front matter delimited by +++")
        try:
            record = tomllib.loads(match.group(1))
        except tomllib.TOMLDecodeError as error:
            fail(f"Invalid front matter in {path.relative_to(repository)}: {error}")
        required = ("id", "title", "external_url", "description", "category", "order", "featured")
        missing = [key for key in required if key not in record]
        if missing:
            fail(f"{path.relative_to(repository)} is missing: {', '.join(missing)}")
        if not all(str(record[key]).strip() for key in ("id", "title", "category")):
            fail(f"{path.relative_to(repository)} has an empty id, title, or category")
        if not isinstance(record["order"], int):
            fail(f"{path.relative_to(repository)} order must be an integer")
        if not isinstance(record["featured"], bool):
            fail(f"{path.relative_to(repository)} featured must be true or false")
        if not isinstance(record["description"], str):
            fail(f"{path.relative_to(repository)} description must be text")
        url = str(record["external_url"])
        if urlsplit(url).scheme != "https" or not urlsplit(url).netloc:
            fail(f"{path.relative_to(repository)} external_url must be an HTTPS URL")
        source_records.append(record)
    return source_records


def validate_assets(site_dir: Path, references: list[str]) -> None:
    for reference in references:
        parts = urlsplit(reference)
        if parts.scheme or parts.netloc:
            host = parts.netloc.lower()
            if any(forbidden in host for forbidden in FORBIDDEN_RUNTIME_HOSTS):
                fail(f"Former-platform or tracking asset is referenced: {reference}")
            fail(f"Site runtime asset must be self-hosted: {reference}")
        if not ASSET_PATH.fullmatch(parts.path):
            fail(f"Runtime asset must use a fingerprinted /assets/ URL: {reference}")
        if not (site_dir / parts.path.lstrip("/")).is_file():
            fail(f"Runtime asset is missing from generated output: {reference}")

    css_files = list((site_dir / "assets").rglob("*.css"))
    if not css_files:
        fail("Generated output has no stylesheet")
    for css_path in css_files:
        css = css_path.read_text(encoding="utf-8")
        for forbidden in FORBIDDEN_RUNTIME_HOSTS:
            if forbidden in css.lower():
                fail(f"Generated stylesheet contains a former-platform or tracking reference: {css_path}")
        for match in re.finditer(r"url\((['\"]?)(.*?)\1\)", css, re.IGNORECASE):
            url = match.group(2).strip()
            if url.startswith("data:"):
                continue
            parts = urlsplit(url)
            if parts.scheme or parts.netloc or not ASSET_PATH.fullmatch(parts.path):
                fail(f"Stylesheet asset must use a fingerprinted /assets/ URL: {url}")
            if not (site_dir / parts.path.lstrip("/")).is_file():
                fail(f"Stylesheet asset is missing from generated output: {url}")

    for path in (site_dir / "assets").rglob("*"):
        if path.is_file() and not re.search(r"\.[0-9a-f]{64}\.[a-z0-9]+$", path.name, re.IGNORECASE):
            fail(f"Generated asset is not fingerprinted: {path.relative_to(site_dir)}")


def validate_site(site_dir: Path, repository: Path) -> None:
    index_path = site_dir / "index.html"
    not_found_path = site_dir / "404.html"
    if not index_path.is_file():
        fail(f"Missing generated homepage: {index_path}")
    if not not_found_path.is_file():
        fail(f"Missing generated 404 page: {not_found_path}")
    if (site_dir / "resources").exists():
        fail("Resource Markdown must not create individual resource routes")

    index = index_path.read_text(encoding="utf-8")
    parser = SiteParser()
    parser.feed(index)
    parser.close()
    if parser.forms:
        fail("Generated homepage contains a form")
    if parser.inline_scripts:
        fail("Generated homepage contains inline JavaScript")
    if "https://dondeaprendoaws.com/blog/" not in parser.nav_hrefs:
        fail("The navigation must link to the existing blog until its migration phase")
    if any("cta_form" in href.lower() for href in parser.anchor_hrefs):
        fail("Generated homepage contains a link to the removed submission form")
    if len(parser.categories) != len(set(parser.categories)):
        fail("Generated category controls contain duplicate categories")

    source_records = read_resource_sources(repository)
    source_by_id = {str(record["id"]): record for record in source_records}
    if len(source_by_id) != len(source_records):
        fail("Resource Markdown contains duplicate ids")
    generated_by_id = {card["id"]: card for card in parser.cards}
    if len(generated_by_id) != len(parser.cards):
        fail("Generated homepage contains duplicate resource ids")
    if set(generated_by_id) != set(source_by_id):
        missing = sorted(set(source_by_id) - set(generated_by_id))
        unexpected = sorted(set(generated_by_id) - set(source_by_id))
        fail(f"Generated card ids do not match Markdown (missing={missing}, unexpected={unexpected})")

    source_categories = {str(record["category"]) for record in source_records}
    if set(parser.categories) != source_categories:
        fail("Generated category controls do not match the current Markdown categories")

    generated_orders: list[int] = []
    for card in parser.cards:
        resource_id = card["id"]
        source = source_by_id[resource_id]
        expected_values = {
            "title": visible_text(source["title"]),
            "description": visible_text(source["description"]),
            "url": str(source["external_url"]),
            "href": str(source["external_url"]),
            "category": str(source["category"]),
            "order": str(source["order"]),
            "featured": str(source["featured"]).lower(),
            "source_row": str(source.get("source_row", "")),
        }
        for field, expected in expected_values.items():
            if card[field] != expected:
                fail(f"Generated resource {resource_id} has {field}={card[field]!r}; expected {expected!r}")
        if card["target"] != "_blank":
            fail(f"Generated resource {resource_id} must open its learning link in a new tab")
        generated_orders.append(int(card["order"]))

    if generated_orders != sorted(generated_orders, reverse=True):
        fail("Generated cards are not sorted by source Order, descending")

    validate_assets(site_dir, parser.asset_references)

    not_found = not_found_path.read_text(encoding="utf-8")
    not_found_parser = SiteParser()
    not_found_parser.feed(not_found)
    not_found_parser.close()
    if "404" not in not_found or "/" not in not_found_parser.anchor_hrefs:
        fail("Generated 404 page must identify the error and link back to the homepage")

    sitemap_path = site_dir / "sitemap.xml"
    if sitemap_path.exists() and "/resources/" in sitemap_path.read_text(encoding="utf-8"):
        fail("Generated sitemap contains unpublished directory resource routes")

    query_string_urls = sum("&" in str(record["external_url"]) for record in source_records)
    print(
        f"Site validation passed: {len(source_records)} Markdown resources, "
        f"{len(source_categories)} categories, {query_string_urls} exact query-string URLs, "
        "homepage, 404, and fingerprinted local assets."
    )


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("site_dir", type=Path, help="Hugo generated output directory, such as public")
    args = parser.parse_args()
    site_dir = args.site_dir.resolve()
    repository = Path(__file__).resolve().parent.parent
    try:
        validate_site(site_dir, repository)
    except (OSError, ValueError, tomllib.TOMLDecodeError) as error:
        print(f"Site validation failed: {error}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
