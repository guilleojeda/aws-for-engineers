Sora fonts

The Latin and Latin Extended variable WOFF2 files are unmodified Google Fonts Sora v17 subsets, downloaded on 3 October 2026. They support weights 100–800, including this site's 400, 600 and 700. The SIL Open Font License is included in OFL.txt.

- Latin source: https://fonts.gstatic.com/s/sora/v17/xMQbuFFYT72XzQUpDqW1KX4.woff2
- Latin Extended source: https://fonts.gstatic.com/s/sora/v17/xMQbuFFYT72XzQspDqW1KX7wmA.woff2
- Upstream license: https://github.com/google/fonts/blob/main/ofl/sora/OFL.txt

The Latin face is preloaded; the extended subset loads only for its declared Unicode range. Both remain local assets so rendering does not wait for a Google Fonts stylesheet.

CSS fallback metrics use Sora's 1000-unit em, 970-unit ascent, 290-unit descent and zero line gap. `size-adjust` is the ratio of character-frequency-weighted advance widths in the current English article corpus to Arial's, calculated separately at weights 400, 600 and 700 (113.3655%, 106.6357%, 107.341%). The ascent/descent overrides divide Sora's em ratios by that scale. Arial and its metric-compatible Liberation Sans fallback are optional; browsers without them continue to Arial/sans-serif. Preloading remains the primary way to reduce font swap delay.
