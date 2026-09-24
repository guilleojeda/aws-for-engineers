# Site content and behavior

The Spanish-language resource directory and blog are static Hugo pages whose authored content lives in Markdown. The production domain is `dondeaprendoaws.com`; `www` redirects to it. The CloudFront preview sends no Google Analytics visits. The site has no content submission form, submission CTA, reCAPTCHA, spreadsheet fetch, former-platform runtime, or SEObot integration. The general “¿Es gratis?” FAQ remains; the entries that promise content submissions or paid promotion were removed with that capability. The owner approved launching without ads, so no ad tags, slots, consent manager, or `ads.txt` are configured.

## Editing directory entries

Each resource is a Markdown file under `content/resources/`. The current files retain source-row identifiers and the 2026-09-23 directory snapshot. Use TOML front matter with these fields when adding a resource:

```toml
+++
id = "resource-example"
title = "Nombre del recurso"
external_url = "https://example.com/"
description = "Descripción breve en Español."
category = "Serverless"
order = 1000
featured = false
+++
```

`id` must stay unique and should not change when the title changes. `external_url` is intentionally named that way because Hugo reserves the top-level `url` field for output paths. `description` may be empty when the source provides no description. `order` is the source directory's current order value; the homepage sorts larger values first. `featured` preserves the source flag. The source uses the same gold star icon for every card, so this flag does not change its appearance. `source_row` is optional migration provenance and is not needed for new entries.

Categories are derived from the Markdown records, so adding a category requires no template or validator edit. Resource pages are included in the homepage but are not published as individual routes.

The homepage initially shows eight resources. “Mostrar Todos” expands the full directory. Search checks titles, descriptions, and categories. Search and category selection are mutually exclusive: typing clears a selected category, and selecting a category clears the query. Selecting an active category again shows the full set. Clearing a text query also reveals the full set and hides “Mostrar Todos,” matching the current source behavior.

Build and validate the site with the commands in the repository README. The site validator compares generated cards and category controls against the current Markdown, so content can be added, removed, and recategorized without changing fixed expected counts. The dependency-free interaction tests use `node --test tests/directory*.mjs`.

## Blog articles

Each article is a Markdown file under `content/blog/` with TOML front matter. The blog archive and article routes are generated from these files; there is no second authored feed. A typical front matter shape is:

```toml
+++
title = "Título del artículo"
description = "Resumen breve para el archivo y los buscadores."
url = "/blog/slug-existente/"
date = "2025-09-08T14:45:28Z"
lastmod = "2025-09-11"
image = "/assets/blog/<content-hash>.webp"
archive_order = 1
+++
```

`url` keeps a stable public route when the filename or title changes. `date` is the original publication timestamp; `lastmod` is the separate source sitemap modification date and should change for substantive later edits. `archive_order` preserves the source archive order, with smaller values shown first. Optional `image_alt` and `author` fields describe the cover and byline; optional `[[related]]` tables hold related-card `title`, `url`, and local `image` values. Keep body prose, links, lists, tables, image alt text, and captions in Markdown. Existing headings with old incoming fragment URLs carry quoted `{id="exact-source-id"}` attributes; do not let a title edit silently change those IDs.

The observed YouTube embeds use `{{< blog-video src="https://www.youtube-nocookie.com/embed/VIDEO_ID" >}}` in Markdown. This narrow shortcode renders the video without enabling raw HTML in article bodies. Its URL is restricted to observed HTTPS YouTube embed hosts and paths; other embed shapes need explicit review rather than pasted iframe markup.

Article and card images are served locally from `static/assets/blog/`. Use a content hash in each filename so the publisher can give it immutable caching; changing image bytes requires a new filename and a corresponding Markdown reference. Ordinary external learning-resource links remain external. The archive, canonical URLs, social metadata, `BlogPosting` data, and sitemap derive from the same article files. The preview hostname remains excluded from indexing by a CloudFront response header; canonical links point at the production domain.

The same distribution serves the preview, production apex, and `www`. A viewer-request function redirects `www` to the apex and retains the blog's clean-path routing. The default response-header policy marks pages `noindex`; a viewer-response function removes that header from successful apex pages only, so preview pages and not-found responses remain excluded from indexing. This hostname-specific rule runs after CloudFront's response-header policy and does not require separate content builds or distributions.

## Visual assets

The page uses locally hosted Fira Sans 400 and 700 font files. The SIL Open Font License text is included at `assets/fonts/OFL.txt`; image and font origins and processing are recorded in `assets/ASSETS.md`. Hugo fingerprints the homepage image, fonts, CSS, and JavaScript under `/assets/`. Blog image filenames carry their own content hashes. Both forms let the publisher retain immutable assets safely across page updates.

The homepage title, description, partner section, retained FAQ, and footer copy and links live in `content/_index.md`. One fingerprinted local analytics module is shared across the generated pages. It loads the existing GA4 property `G-3NXS6QFKHZ` only when the browser hostname is exactly `dondeaprendoaws.com`; localhost, `www`, and the CloudFront preview make no GA network request.
