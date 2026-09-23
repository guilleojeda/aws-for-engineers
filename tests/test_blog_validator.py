from __future__ import annotations

import json
import tempfile
import unittest
from pathlib import Path

from scripts.check_blog import BlogError, validate_blog


HASH_A = "a" * 64
HASH_B = "b" * 64
HASH_C = "c" * 64


class BlogValidatorTests(unittest.TestCase):
    def setUp(self) -> None:
        self.temporary = tempfile.TemporaryDirectory()
        self.addCleanup(self.temporary.cleanup)
        self.root = Path(self.temporary.name)
        self.repository = self.root / "repo"
        self.site = self.root / "public"
        (self.repository / "content" / "blog").mkdir(parents=True)
        (self.site / "blog").mkdir(parents=True)
        (self.site / "assets" / "blog").mkdir(parents=True)
        self.write_post("uno", "Artículo Uno", HASH_A, 1, "2025-01-01T12:00:00Z")
        self.write_post("dos", "Artículo Dos", HASH_B, 2, "2025-01-02T12:00:00Z", related=("uno",))
        self.write_asset(HASH_A)
        self.write_asset(HASH_B)
        self.write_archive()
        self.write_article("uno", "Artículo Uno", HASH_A, "2025-01-01T12:00:00Z", fragment="tabla")
        self.write_article(
            "dos", "Artículo Dos", HASH_B, "2025-01-02T12:00:00Z", related=("uno",), author="Equipo AWS"
        )
        self.write_sitemap()

    def write_asset(self, digest: str) -> None:
        (self.site / "assets" / "blog" / f"{digest}.jpg").write_bytes(b"image")

    def write_post(
        self,
        slug: str,
        title: str,
        digest: str,
        order: int,
        published: str,
        *,
        related: tuple[str, ...] = (),
        lastmod: str = "2025-02-01T12:00:00Z",
    ) -> None:
        lines = [
            "+++",
            f'url = "/blog/{slug}/"',
            f'title = "{title}"',
            f'description = "Descripción de {title}."',
            f'date = "{published}"',
            f'lastmod = "{lastmod}"',
            f'image = "/assets/blog/{digest}.jpg"',
            f'image_alt = "Portada de {title}"',
            f"archive_order = {order}",
        ]
        for related_slug in related:
            lines.extend(
                [
                    "",
                    "[[related]]",
                    f'title = "Artículo {"Uno" if related_slug == "uno" else "Dos"}"',
                    f'url = "/blog/{related_slug}/"',
                    f'image = "/assets/blog/{HASH_A if related_slug == "uno" else HASH_B}.jpg"',
                ]
            )
        lines.extend(["+++", "", "Texto editorial."])
        if slug == "dos":
            lines.append("[Ir a la tabla](/blog/uno/?ref=relacion#tabla)")
        (self.repository / "content" / "blog" / f"{slug}.md").write_text("\n".join(lines), encoding="utf-8")

    def write_archive(self, *, form: bool = False) -> None:
        cards = []
        for slug, title, digest in (("uno", "Artículo Uno", HASH_A), ("dos", "Artículo Dos", HASH_B)):
            cards.append(
                f'<article><a href="/blog/{slug}/"><img src="/assets/blog/{digest}.jpg" alt="Portada de {title}"><h2>{title}</h2></a></article>'
            )
        forms = "<form action='/submit'></form>" if form else ""
        (self.site / "blog" / "index.html").write_text(
            '<!doctype html><html><head><link rel="canonical" href="https://dondeaprendoaws.com/blog/"></head>'
            f"<body><nav><a href='/blog/'>Blog</a></nav>{forms}{''.join(cards)}</body></html>",
            encoding="utf-8",
        )

    def write_article(
        self,
        slug: str,
        title: str,
        digest: str,
        published: str,
        *,
        fragment: str = "",
        related: tuple[str, ...] = (),
        author: str = "",
        runtime: str = "",
        image_src: str | None = None,
        modified: str = "2025-02-01T12:00:00Z",
        fragment_ids: tuple[str, ...] = (),
        internal_fragments: tuple[str, ...] | None = None,
    ) -> None:
        description = f"Descripción de {title}."
        image_path = image_src or f"/assets/blog/{digest}.jpg"
        related_html = "".join(
            f'<article><a href="/blog/{target}/">Artículo Uno</a><img src="/assets/blog/{HASH_A}.jpg" alt="Artículo Uno"></article>'
            for target in related
        )
        jsonld: dict[str, object] = {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": title,
            "description": description,
            "datePublished": published,
            "dateModified": modified,
            "image": f"https://dondeaprendoaws.com{image_path}",
        }
        if author:
            jsonld["author"] = {"@type": "Person", "name": author}
        fragment_html = f'<h2 id="{fragment}">Tabla</h2>' if fragment else ""
        fragment_html += "".join(f'<h2 id="{value}">Fragmento</h2>' for value in fragment_ids)
        if slug == "dos":
            link_fragments = internal_fragments if internal_fragments is not None else ("tabla",)
            internal_link = "".join(
                f'<a href="/blog/uno/?ref=relacion#{value}">Ir al fragmento</a>'
                for value in link_fragments
            )
        else:
            internal_link = ""
        output = self.site / "blog" / slug / "index.html"
        output.parent.mkdir(parents=True, exist_ok=True)
        output.write_text(
            "<!doctype html><html><head>"
            f"<title>{title} | Dónde Aprendo AWS</title>"
            f'<meta name="description" content="{description}">'
            f'<meta property="og:title" content="{title}">'
            f'<meta property="og:description" content="{description}">'
            f'<meta property="og:image" content="https://dondeaprendoaws.com{image_path}">'
            f'<meta property="article:published_time" content="{published}">'
            f'<meta property="article:modified_time" content="{modified}">'
            f'<link rel="canonical" href="https://dondeaprendoaws.com/blog/{slug}/">'
            f'<script type="application/ld+json">{json.dumps(jsonld, ensure_ascii=False)}</script>'
            f"</head><body>{runtime}<time datetime='{published}'>1 de enero de 2025</time>"
            f'<img src="{image_path}" alt="Portada de {title}">{fragment_html}{internal_link}{related_html}</body></html>',
            encoding="utf-8",
        )

    def write_sitemap(self, *, include_two: bool = True) -> None:
        urls = ["https://dondeaprendoaws.com/blog/"]
        urls.append("https://dondeaprendoaws.com/blog/uno/")
        if include_two:
            urls.append("https://dondeaprendoaws.com/blog/dos/")
        nodes = []
        for url in urls:
            lastmod = "2025-02-01T12:00:00Z" if url.endswith("/") and url != urls[0] else "2025-01-01T00:00:00Z"
            nodes.append(f"<url><loc>{url}</loc><lastmod>{lastmod}</lastmod></url>")
        (self.site / "sitemap.xml").write_text(
            "<urlset xmlns='http://www.sitemaps.org/schemas/sitemap/0.9'>" + "".join(nodes) + "</urlset>",
            encoding="utf-8",
        )

    def add_internal_links(self, slug: str, hrefs: tuple[str, ...]) -> None:
        output = self.site / "blog" / slug / "index.html"
        source = output.read_text(encoding="utf-8")
        links = "".join(f'<a href="{href}">legacy reference</a>' for href in hrefs)
        output.write_text(source.replace("</body>", f"{links}</body>"), encoding="utf-8")

    def test_accepts_dynamic_markdown_routes_metadata_media_and_related_links(self) -> None:
        validate_blog(self.site, self.repository)

    def test_new_markdown_post_requires_a_rendered_route(self) -> None:
        self.write_post("tres", "Artículo Tres", HASH_C, 3, "2025-01-03T12:00:00Z")
        with self.assertRaisesRegex(BlogError, "no generated article"):
            validate_blog(self.site, self.repository)

    def test_archive_must_include_posts_in_archive_order(self) -> None:
        self.write_post("uno", "Artículo Uno", HASH_A, 2, "2025-01-01T12:00:00Z")
        self.write_post("dos", "Artículo Dos", HASH_B, 1, "2025-01-02T12:00:00Z", related=("uno",))
        with self.assertRaisesRegex(BlogError, "archive_order"):
            validate_blog(self.site, self.repository)

    def test_rejects_missing_local_editorial_image(self) -> None:
        self.write_article("uno", "Artículo Uno", HASH_A, "2025-01-01T12:00:00Z", image_src="https://images.example/cover.jpg")
        with self.assertRaisesRegex(BlogError, "externally hosted editorial image"):
            validate_blog(self.site, self.repository)

    def test_rejects_submission_form_and_preview_analytics_runtime(self) -> None:
        self.write_archive(form=True)
        with self.assertRaisesRegex(BlogError, "contains a form"):
            validate_blog(self.site, self.repository)

        self.write_archive()
        self.write_article(
            "uno", "Artículo Uno", HASH_A, "2025-01-01T12:00:00Z", runtime='<script src="https://www.googletagmanager.com/gtag/js"></script>'
        )
        with self.assertRaisesRegex(BlogError, "forbidden.*runtime marker"):
            validate_blog(self.site, self.repository)

    def test_rejects_missing_heading_fragment(self) -> None:
        self.write_article("uno", "Artículo Uno", HASH_A, "2025-01-01T12:00:00Z")
        with self.assertRaisesRegex(BlogError, "missing heading fragment"):
            validate_blog(self.site, self.repository)

    def test_accepts_literal_percent_ids_and_decoded_encoded_fragments(self) -> None:
        literal_id = "bienvenidos-al-mundo-de-aws%3A-origen"
        self.write_article(
            "uno",
            "Artículo Uno",
            HASH_A,
            "2025-01-01T12:00:00Z",
            fragment=literal_id,
            fragment_ids=("sección",),
        )
        self.write_article(
            "dos",
            "Artículo Dos",
            HASH_B,
            "2025-01-02T12:00:00Z",
            related=("uno",),
            author="Equipo AWS",
            internal_fragments=(literal_id, "secci%C3%B3n"),
        )
        validate_blog(self.site, self.repository)

    def test_sitemap_must_match_markdown_routes_and_lastmod(self) -> None:
        self.write_sitemap(include_two=False)
        with self.assertRaisesRegex(BlogError, "Sitemap blog routes differ"):
            validate_blog(self.site, self.repository)

    def test_rejects_a_missing_internal_article_route(self) -> None:
        self.add_internal_links("uno", ("/blog/a-new-broken-link/",))
        with self.assertRaisesRegex(BlogError, "links to a missing blog route"):
            validate_blog(self.site, self.repository)

    def test_date_only_lastmod_matches_date_metadata_and_sitemap_timestamp(self) -> None:
        self.write_post(
            "uno", "Artículo Uno", HASH_A, 1, "2025-01-01T12:00:00Z", lastmod="2025-02-01"
        )
        self.write_article(
            "uno", "Artículo Uno", HASH_A, "2025-01-01T12:00:00Z", fragment="tabla", modified="2025-02-01"
        )
        validate_blog(self.site, self.repository)

    def test_equivalent_fractional_second_precision_passes_and_truncation_fails(self) -> None:
        source_date = "2025-01-01T12:00:00.123000Z"
        self.write_post("uno", "Artículo Uno", HASH_A, 1, source_date)
        self.write_article("uno", "Artículo Uno", HASH_A, "2025-01-01T12:00:00.123Z", fragment="tabla")
        validate_blog(self.site, self.repository)

        self.write_article("uno", "Artículo Uno", HASH_A, "2025-01-01T12:00:00Z", fragment="tabla")
        with self.assertRaisesRegex(BlogError, "article:published_time does not match"):
            validate_blog(self.site, self.repository)


if __name__ == "__main__":
    unittest.main()
