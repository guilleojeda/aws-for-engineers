# Site content and directory behavior

This phase publishes the Spanish-language resource directory as a static Hugo homepage. The original blog remains at `https://dondeaprendoaws.com/blog/` until the blog migration replaces that link. The homepage does not load Google Analytics on the CloudFront preview, and it has no content submission form, submission CTA, reCAPTCHA, spreadsheet fetch, former-platform runtime, or SEObot integration. The general “¿Es gratis?” FAQ remains; the entries that promise content submissions or paid promotion were removed with that capability.

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

## Visual assets and phase boundary

The page uses locally hosted Fira Sans 400 and 700 font files. The SIL Open Font License text is included at `assets/fonts/OFL.txt`; image and font origins and processing are recorded in `assets/ASSETS.md`. Hugo fingerprints all published images, fonts, CSS, and JavaScript under `/assets/` so the publisher can retain them safely across page updates.

The current title, description, partner section, retained FAQ, and footer copy and links live in `content/_index.md`. The production GA4 property remains a phase 3 integration; no analytics requests are sent from this preview.
