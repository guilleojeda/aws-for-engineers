# ¿Dónde Aprendo AWS?

A Spanish-language AWS resource directory and blog generated from Markdown with Hugo. GitHub Actions validates repository changes and publishes the built files to a private S3 bucket served by CloudFront. Infrastructure updates use CloudFormation manually.

The AWS preview serves the resource directory and blog. During the domain migration, the existing production domain remains on its current platform until its website records are changed. The CloudFront hostname is excluded from indexing and does not send visits to Google Analytics. Content submissions and SEObot are not part of this site.

[Open the AWS preview](https://dwhs21rzi7jgg.cloudfront.net/).

## Edit and preview

Install [Hugo 0.166.0](https://github.com/gohugoio/hugo/releases/tag/v0.166.0), Python 3.11 or newer, and Node.js for the small JavaScript test suite. No npm packages or frontend framework are required.

```sh
hugo server
```

Each resource lives in `content/resources/` as a Markdown file. Copy an existing entry to add a resource, give it a unique filename and `id`, and edit its title, external URL, category, featured/order metadata, and description. Keep the section's `_index.md`; it prevents directory entries from becoming separate public pages. Homepage copy lives in `content/_index.md`.

Each article lives in `content/blog/` as a Markdown file. Copy an existing article's TOML front matter when adding one, then set its title, description, publication date, modification date, canonical `/blog/<slug>/` path, local cover image, and `archive_order`. The article body is ordinary Markdown. Existing heading fragments use explicit quoted `{id="..."}` attributes; retain those IDs when editing headings so incoming links keep working. The blog archive is built from these same files; there is no separate post feed or submission UI. Editorial images live under `static/assets/blog/` with content-hashed filenames. See [site behavior](docs/intent/site.md) for the field meanings and image convention.

Check the complete site before opening a pull request:

```sh
./scripts/check.sh
```

If Hugo is installed outside your PATH, use `HUGO=/path/to/hugo ./scripts/check.sh`. Generated output in `public/` is not committed. Open a pull request against `main`; its checks run without deployment permissions. Merging valid content, template or asset changes into `main` automatically publishes them.

## Publishing and infrastructure

GitHub authenticates to AWS with OIDC and temporary credentials. The publishing role can update this site's files and invalidate its CloudFront cache; it cannot manage infrastructure. Do not add AWS access keys to the repository or GitHub secrets.

The publishing workflow uses repository variables `AWS_ROLE_ARN`, `AWS_REGION`, `S3_BUCKET`, `CLOUDFRONT_DISTRIBUTION_ID`, and preview `SITE_URL`, taken from the manually deployed stack. After the production domain is healthy, set optional `PRODUCTION_SITE_URL=https://dondeaprendoaws.com` so every later publish and restore verifies both hosts. Infrastructure changes in `infra/cloudformation.yaml` must be reviewed and applied with a separately authenticated AWS CLI session; committing that file does not apply it.

See [publishing and recovery](docs/intent/publishing.md) for the exact deployment/restore commands, artifact retention, cache behavior and failure limits. See [site behavior](docs/intent/site.md) for directory interactions and content conventions.
