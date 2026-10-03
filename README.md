# AWS for Engineers

Static source for [awsforengineers.com](https://awsforengineers.com/). Eleventy builds the homepage, blog archive, and article pages. Content and images live in this repository; the published site does not need Unicorn Platform or SEO Bot.

## Work locally

Use Node.js 22 or newer; the publishing workflow uses Node.js 24.

```sh
npm ci
npm run dev
```

Open `http://localhost:8080/`. Before publishing, run:

```sh
npm run build
npm run check
```

## Publish a post

Create `src/posts/my-post.md` with this front matter and Markdown body:

```md
---
layout: post.njk
tags: posts
title: "My post title"
description: "A short description for search results and social previews."
date: "2026-09-25"
heroImage: "/assets/media/my-post-cover.jpg"
permalink: "/blog/my-post/"
---

Your article starts here.
```

Place new images under `src/assets/media/` and reference them with `/assets/media/...` URLs. The filename and permalink must match. Use a publication date in `YYYY-MM-DD` format. `datePublished` can be set to a full ISO timestamp if needed; otherwise the date is used for structured data.

All articles are attributed to Guille Ojeda using the shared identity in `src/_data/identity.json`. Keep the author profile at `/authors/guille-ojeda/` and its visible biography consistent with that record. Articles show a linked byline and identify both the author and AWS for Engineers publisher in structured data.

When an article receives a real editorial update, add or change both fields below in its front matter:

```yaml
dateModified: "2026-10-03"
updateNote: "Added author attribution and profile information."
```

Use the actual update date and describe that article's change; the example records the historical attribution update, not a default for future posts. The date appears visibly, in BlogPosting structured data, and as sitemap `lastmod`. Leave both fields out for a new article that has not been updated. Preserve the original publication date. Do not change dates merely because the site is rebuilt or deployed, or describe an attribution change as a technical review.

The build automatically generates responsive images and intrinsic dimensions for ordinary HTML and Markdown images. Images are lazy-loaded by default; for a large image visible immediately at the start of a post, use an HTML image with `loading="eager"` and `fetchpriority="high"`. The listing templates already prioritize their first image. Give a custom image's `sizes` attribute the width it occupies if it differs from the standard article column. Source originals stay available for existing links and social previews.

Pushing to `main` runs the [publishing workflow](.github/workflows/publish.yml). It builds and checks the entire site, uploads it to private S3, waits for CloudFront invalidation, and checks the AWS preview URL. The public domain uses the same CloudFront distribution, so the push also publishes the post there; there is no separate deployment command.

The 141 historical articles are stored as HTML source files in `src/posts/`. They were imported from the live website because the Unicorn Platform ZIP did not include article content. They remain editable, but new posts should be Markdown. Keeping the imported bodies as HTML preserves code examples and tables exactly.

The production build includes `ads.txt` with this site's AdSense publisher declaration. Keep that declaration in place while the site uses this AdSense account.

Infrastructure setup and cutover notes are in [infra/README.md](infra/README.md). The current behavior and migration rationale are in [docs/intent/site.md](docs/intent/site.md).
