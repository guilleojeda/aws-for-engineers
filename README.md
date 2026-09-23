# ¿Dónde Aprendo AWS?

A Spanish-language AWS resource directory generated from Markdown with Hugo. GitHub Actions validates repository changes and publishes the built files to a private S3 bucket served by CloudFront. Infrastructure updates use CloudFormation manually.

The AWS copy currently covers the resource directory. Its Blog link opens the existing blog at https://dondeaprendoaws.com/blog/. The migration hostname is excluded from indexing and does not send visits to Google Analytics. Content submissions and SEObot are not part of this site.

[Open the AWS preview](https://dwhs21rzi7jgg.cloudfront.net/).

## Edit and preview

Install [Hugo 0.166.0](https://github.com/gohugoio/hugo/releases/tag/v0.166.0), Python 3.11 or newer, and Node.js for the small JavaScript test suite. No npm packages or frontend framework are required.

```sh
hugo server
```

Each resource lives in `content/resources/` as a Markdown file. Copy an existing entry to add a resource, give it a unique filename and `id`, and edit its title, external URL, category, featured/order metadata, and description. Keep the section's `_index.md`; it prevents directory entries from becoming separate public pages. Homepage copy lives in `content/_index.md`.

Check the complete site before opening a pull request:

```sh
./scripts/check.sh
```

If Hugo is installed outside your PATH, use `HUGO=/path/to/hugo ./scripts/check.sh`. Generated output in `public/` is not committed. Open a pull request against `main`; its checks run without deployment permissions. Merging valid content, template or asset changes into `main` automatically publishes them.

## Publishing and infrastructure

GitHub authenticates to AWS with OIDC and temporary credentials. The publishing role can update this site's files and invalidate its CloudFront cache; it cannot manage infrastructure. Do not add AWS access keys to the repository or GitHub secrets.

The publishing workflow uses repository variables `AWS_ROLE_ARN`, `AWS_REGION`, `S3_BUCKET`, `CLOUDFRONT_DISTRIBUTION_ID`, and `SITE_URL`, taken from the manually deployed stack. Infrastructure changes in `infra/cloudformation.yaml` must be reviewed and applied with a separately authenticated AWS CLI session; committing that file does not apply it.

See [publishing and recovery](docs/intent/publishing.md) for the exact deployment/restore commands, artifact retention, cache behavior and failure limits. See [site behavior](docs/intent/site.md) for directory interactions and content conventions.
