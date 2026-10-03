import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";

const root = resolve("_site");
const posts = resolve("src/posts");
const failures = [];
const identity = JSON.parse(readFileSync(resolve("src/_data/identity.json"), "utf8"));
const profileUrl = `https://awsforengineers.com${identity.authorPath}`;

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

function schemasIn(html, name) {
  const schemas = [];
  for (const [, attributes, text] of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
    if (attribute(attributes, "type") !== "application/ld+json") continue;
    try {
      schemas.push(JSON.parse(text));
    } catch {
      failures.push(`Invalid JSON-LD: ${name}`);
    }
  }
  return schemas;
}

function validDate(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2}))?$/.test(value)) return false;
  const [year, month, day] = value.slice(0, 10).split("-").map(Number);
  const calendar = new Date(Date.UTC(year, month - 1, day));
  return calendar.getUTCFullYear() === year && calendar.getUTCMonth() === month - 1 && calendar.getUTCDate() === day && !Number.isNaN(Date.parse(value));
}

function checkIdentity(schema, key, expected, name) {
  const actual = schema?.[key];
  if (!actual || ["@type", "@id", "name", "url"].some((field) => actual[field] !== expected[field])) {
    failures.push(`Incorrect ${key} identity: ${name}`);
  }
}

const files = visit(root);
const pages = files.filter((file) => file.endsWith(".html"));
const articleFiles = readdirSync(posts).filter((file) => file.endsWith(".md") || file.endsWith(".html"));
const articleSlugs = new Set(articleFiles.map((file) => file.replace(/\.(md|html)$/, "")));
if (articleFiles.length < 141) failures.push(`Expected at least 141 migrated articles; found ${articleFiles.length}`);

const sitemap = readFileSync(join(root, "sitemap.xml"), "utf8");
const sitemapDates = new Map([...sitemap.matchAll(/<url>\s*<loc>([^<]+)<\/loc>(?:\s*<lastmod>([^<]+)<\/lastmod>)?\s*<\/url>/g)].map(([, url, modified]) => [url, modified]));
if (identity.author.url !== profileUrl || identity.author["@id"] !== `${profileUrl}#person`) failures.push("Author identity and profile URL differ");
if (!existsSync(targetFor(identity.authorPath)) || !sitemapDates.has(profileUrl)) failures.push("Author profile is missing from output or sitemap");
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
  const schemas = schemasIn(html, name);
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
    const articleSchemas = schemas.filter((schema) => schema["@type"] === "BlogPosting");
    if (articleSchemas.length !== 1) failures.push(`Expected one BlogPosting: ${name}`);
    const article = articleSchemas[0];
    checkIdentity(article, "author", identity.author, name);
    checkIdentity(article, "publisher", identity.publisher, name);
    if (!html.includes(`<meta name="author" content="${identity.author.name}">`)) failures.push(`Missing author meta: ${name}`);
    const header = html.match(/<header class="article-header">([\s\S]*?)<\/header>/)?.[1] || "";
    const authorLink = [...header.matchAll(/<a\b([^>]*)>([^<]+)<\/a>/g)].find(([, attrs, text]) =>
      attribute(attrs, "href") === identity.authorPath && attribute(attrs, "rel")?.split(/\s+/).includes("author") && text === identity.author.name,
    );
    if (!authorLink) failures.push(`Missing linked author byline: ${name}`);
    if (!html.includes(`Published by <a href="/">${identity.publisher.name}</a>`)) failures.push(`Missing visible publisher: ${name}`);
    const visibleDates = [...header.matchAll(/<time\b([^>]*)>/g)].map(([, attrs]) => attribute(attrs, "datetime"));
    if (!validDate(article?.datePublished) || visibleDates[0] !== article?.datePublished) failures.push(`Publication date mismatch: ${name}`);
    const url = article?.mainEntityOfPage;
    const canonical = [...html.matchAll(/<link\b[^>]*>/g)].map(([tag]) => tag).find((tag) => attribute(tag, "rel") === "canonical");
    if (url !== attribute(canonical || "", "href")) failures.push(`Article schema and canonical differ: ${name}`);
    const source = articleFiles.find((source) => source.replace(/\.(md|html)$/, "") === articleMatch?.[1]);
    const frontMatter = source ? readFileSync(join(posts, source), "utf8").match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] || "" : "";
    const sourceModified = frontMatter.match(/^dateModified:\s*["']?([^"'\s]+)["']?\s*$/m)?.[1];
    const hasUpdateNote = /<p class="article-update-note">\s*\S[\s\S]*?<\/p>/.test(header);
    if (sourceModified) {
      if (!validDate(article?.dateModified) || article?.dateModified !== sourceModified || visibleDates[1] !== sourceModified || sitemapDates.get(url) !== sourceModified) {
        failures.push(`Modification date mismatch: ${name}`);
      }
      // A date-only update denotes a calendar day, not an invented midnight timestamp.
      if (validDate(article?.dateModified) && validDate(article?.datePublished)) {
        const precedesPublication = article.dateModified.includes("T") && article.datePublished.includes("T")
          ? Date.parse(article.dateModified) < Date.parse(article.datePublished)
          : article.dateModified.slice(0, 10) < article.datePublished.slice(0, 10);
        if (precedesPublication) failures.push(`Modification precedes publication: ${name}`);
      }
      if (!hasUpdateNote) failures.push(`Missing editorial update note: ${name}`);
    } else if (article?.dateModified !== undefined || visibleDates.length !== 1 || sitemapDates.get(url) !== undefined || hasUpdateNote) {
      failures.push(`Unrecorded editorial modification: ${name}`);
    }
  }
  if (name === "authors/guille-ojeda/index.html") {
    const profileSchemas = schemas.filter((schema) => schema["@type"] === "ProfilePage");
    if (profileSchemas.length !== 1) failures.push("Expected one ProfilePage");
    const profile = profileSchemas[0];
    checkIdentity(profile, "mainEntity", identity.author, name);
    checkIdentity(profile, "publisher", identity.publisher, name);
    if (profile?.url !== profileUrl || !html.includes(`<h1>${identity.author.name}</h1>`)) failures.push("Profile identity does not match the visible page");
    for (const url of identity.author.sameAs) {
      if (!html.includes(`href="${url}"`)) failures.push(`Profile is missing verified identity link: ${url}`);
    }
    const profileDate = html.match(/Profile updated on <time datetime="([^"]+)"/)?.[1];
    if (!validDate(profile?.dateCreated) || !validDate(profile?.dateModified) || profileDate !== profile?.dateModified || sitemapDates.get(profileUrl) !== profile?.dateModified) failures.push("Profile dates are invalid or inconsistent");
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
