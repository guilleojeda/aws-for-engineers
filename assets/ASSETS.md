# Asset sources and licenses

| File | Source and use | License information |
| --- | --- | --- |
| `fonts/fira-sans-400.woff2`, `fonts/fira-sans-700.woff2` | Fira Sans Latin subset, downloaded from Google Fonts for local use. | SIL Open Font License 1.1; see `fonts/OFL.txt`. |
| `images/site-icon.png` | Existing site's 120×120 favicon image, formerly served from the site's Unicorn image host. | The migration keeps the image used by the existing site; the captured source did not include a separate license statement. |
| `images/simple-aws-logo.png` | Existing site's Simple AWS partner logo, formerly served from the site's Unicorn image host. | The migration keeps the partner graphic used by the existing site; the captured source did not include a separate license statement. |

Hugo copies these files into fingerprinted public URLs under `/assets/`. The site does not request them from the source hosts at runtime.
