# Asset sources and licenses

| File | Source and use | License information |
| --- | --- | --- |
| `fonts/fira-sans-400.woff2`, `fonts/fira-sans-700.woff2` | Fira Sans Latin subset, downloaded from Google Fonts for local use. | SIL Open Font License 1.1; see `fonts/OFL.txt`. |
| `images/site-icon.png` | Existing site's 120×120 favicon image, formerly served from the site's Unicorn image host. | The migration keeps the image used by the existing site; the captured source did not include a separate license statement. |
| `images/simple-aws-logo.png` | Existing site's Simple AWS partner logo, formerly served from the site's Unicorn image host. | The migration keeps the partner graphic used by the existing site; the captured source did not include a separate license statement. |
| `../static/assets/blog/*` | 373 unique article cover, thumbnail, body, and related-card images copied from the existing blog. The source served these through `assets.seobotai.com` and `mars-images.imgix.net`; filenames now contain each file's SHA-256 hash. | The migration preserves the images used by the owner's existing articles; the captured source did not include separate image-license statements. |

Hugo copies the homepage files into fingerprinted public URLs under `/assets/`. Blog media is already content-hashed under `static/assets/blog/` and is copied directly to the same public path. The site does not request these images from the source hosts at runtime. The one-time import's source-URL-to-local-file inventory is retained in the ignored migration evidence, not needed for ordinary Markdown editing.
