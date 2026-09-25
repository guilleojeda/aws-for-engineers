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
