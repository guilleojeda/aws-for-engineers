# AWS for Engineers

Static source for [awsforengineers.com](https://awsforengineers.com/). Eleventy builds the homepage, blog archive, and article pages. Content and images live in this repository; the published site does not need Unicorn Platform or SEO Bot.

## Work locally

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

After the AWS infrastructure and GitHub variables are configured, pushing to `main` runs the [publishing workflow](.github/workflows/publish.yml). It builds and checks the entire site, uploads it to private S3, waits for CloudFront invalidation, and checks the preview URL. The push itself publishes the post; there is no separate deployment command.

The 141 historical articles are stored as HTML source files in `src/posts/`. They were imported from the live website because the Unicorn Platform ZIP did not include article content. They remain editable, but new posts should be Markdown. Keeping the imported bodies as HTML preserves code examples and tables exactly.

Infrastructure setup and cutover notes are in [infra/README.md](infra/README.md). The current behavior and migration rationale are in [docs/intent/site.md](docs/intent/site.md).
