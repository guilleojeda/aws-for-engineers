import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";

const root = resolve("_site");
const posts = resolve("src/posts");
const failures = [];

function visit(path) {
  return readdirSync(path).flatMap((entry) => {
    const full = join(path, entry);
    return statSync(full).isDirectory() ? visit(full) : [full];
  });
}

function targetFor(url) {
  const clean = decodeURIComponent(url.split(/[?#]/, 1)[0]);
  if (!clean.startsWith("/")) return null;
  if (clean === "/") return join(root, "index.html");
  if (clean.endsWith("/")) return join(root, clean, "index.html");
  if (/\.[a-z0-9]+$/i.test(clean)) return join(root, clean);
  return join(root, clean, "index.html");
}

function attribute(tag, name) {
  return tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1];
}

const files = visit(root);
const pages = files.filter((file) => file.endsWith(".html"));
const articleFiles = readdirSync(posts).filter((file) => file.endsWith(".md") || file.endsWith(".html"));
const articleSlugs = new Set(articleFiles.map((file) => file.replace(/\.(md|html)$/, "")));
if (articleFiles.length < 141) failures.push(`Expected at least 141 migrated articles; found ${articleFiles.length}`);

const sitemap = readFileSync(join(root, "sitemap.xml"), "utf8");
for (const file of articleFiles) {
  const slug = file.replace(/\.(md|html)$/, "");
  const path = `/blog/${slug}/`;
  if (!existsSync(targetFor(path))) failures.push(`Missing generated article: ${path}`);
  if (!sitemap.includes(`https://awsforengineers.com${path}`)) failures.push(`Article absent from sitemap: ${path}`);
}

for (const file of pages) {
  const name = relative(root, file);
  const articleMatch = name.match(/^blog\/([^/]+)\/index\.html$/);
  if (articleMatch && !articleSlugs.has(articleMatch[1])) failures.push(`Stale article output: ${name}`);
  const html = readFileSync(file, "utf8");
  if (!/<title>[^<]+<\/title>/.test(html)) failures.push(`Missing title: ${name}`);
  if (!/<link rel="canonical" href="https:\/\/awsforengineers\.com\//.test(html)) failures.push(`Missing canonical: ${name}`);
  if (!/<meta name="description" content="[^"]+"/.test(html)) failures.push(`Missing description: ${name}`);
  if (/(?:app|assets)\.seobotai\.com|unicornplatform\.com|mars-images\.imgix\.net/.test(html)) {
    failures.push(`Old platform dependency in generated HTML: ${name}`);
  }
  if (/fonts\.(?:googleapis|gstatic)\.com/.test(html)) failures.push(`External font dependency: ${name}`);
  const fontPreload = [...html.matchAll(/<link\b[^>]*>/g)].map(([tag]) => tag).find((tag) =>
    attribute(tag, "rel") === "preload" && attribute(tag, "href") === "/assets/fonts/sora-latin.woff2" &&
    attribute(tag, "as") === "font" && attribute(tag, "type") === "font/woff2" && attribute(tag, "crossorigin") !== undefined,
  );
  if (!fontPreload) {
    failures.push(`Missing local Sora preload: ${name}`);
  }
  const images = [...html.matchAll(/<img\b[^>]*>/g)].map(([tag]) => tag);
  for (const image of images) {
    if (!(Number(attribute(image, "width")) > 0 && Number(attribute(image, "height")) > 0)) {
      failures.push(`Image has no intrinsic dimensions in ${name}: ${attribute(image, "src")}`);
    }
    if (attribute(image, "alt") === undefined) failures.push(`Image has no alt attribute in ${name}`);
    if (!/^(?:lazy|eager)$/.test(attribute(image, "loading") || "")) failures.push(`Image has no loading policy in ${name}`);
    // SVG stays scalable without raster variants or a srcset.
    if (!attribute(image, "src")?.endsWith(".svg") && (!attribute(image, "sizes") || !attribute(image, "srcset"))) {
      failures.push(`Image is not responsive in ${name}`);
    }
  }
  // All candidates, not just the fallback src, must be present before publishing.
  for (const [, srcset] of html.matchAll(/\bsrcset="([^"]+)"/g)) {
    for (const candidate of srcset.split(",")) {
      const url = candidate.trim().split(/\s+/)[0];
      const target = targetFor(url.replaceAll("&amp;", "&"));
      if (target && !existsSync(target)) failures.push(`Broken image candidate in ${name}: ${url}`);
    }
  }
  if (name === "index.html" || name === "blog/index.html" || /^blog\/page\/\d+\/index\.html$/.test(name)) {
    if (!images.length || attribute(images[0], "loading") !== "eager" || attribute(images[0], "fetchpriority") !== "high") {
      failures.push(`First listing image is not prioritized: ${name}`);
    }
    if (images.slice(1).some((image) => attribute(image, "loading") !== "lazy")) {
      failures.push(`Later listing images are not lazy-loaded: ${name}`);
    }
  }
  for (const [, url] of html.matchAll(/(?:href|src)="(\/[^"<>]+)"/g)) {
    const target = targetFor(url.replaceAll("&amp;", "&"));
    if (target && !existsSync(target)) failures.push(`Broken internal reference in ${name}: ${url}`);
  }
  if (name.startsWith("blog/") && !name.includes("/page/") && name !== "blog/index.html") {
    if (!/<article class="article wrap">/.test(html)) failures.push(`Missing article container: ${name}`);
    if (!/<meta property="og:image"/.test(html)) failures.push(`Missing social image: ${name}`);
  }
}

if (!existsSync(join(root, "robots.txt"))) failures.push("Missing robots.txt");
if (!existsSync(join(root, "404.html"))) failures.push("Missing 404.html");
const stylesheet = readFileSync(join(root, "assets/site.css"), "utf8");
if (/fonts\.(?:googleapis|gstatic)\.com/.test(stylesheet)) failures.push("External font dependency in stylesheet");
for (const subset of ["latin", "latin-ext"]) {
  const url = `/assets/fonts/sora-${subset}.woff2`;
  if (!existsSync(targetFor(url)) || !stylesheet.includes(url)) failures.push(`Missing local Sora font: ${subset}`);
}
const adsFile = join(root, "ads.txt");
if (!existsSync(adsFile) || readFileSync(adsFile, "utf8").trim() !== "google.com, pub-9639896081226655, DIRECT, f08c47fec0942fa0") {
  failures.push("AdSense ads.txt publisher declaration is missing or incorrect");
}

if (failures.length) {
  console.error(failures.slice(0, 50).join("\n"));
  if (failures.length > 50) console.error(`... ${failures.length - 50} more failures`);
  process.exit(1);
}
console.log(`Checked ${articleFiles.length} articles, ${pages.length} HTML pages, and internal references.`);
