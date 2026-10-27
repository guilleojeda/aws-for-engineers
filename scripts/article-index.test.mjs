import assert from "node:assert/strict";
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, relative, resolve, sep } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const origin = "https://awsforengineers.com";
const expectedSource = { id: "aws-for-engineers", label: "AWS for Engineers" };
const markdownFixtureName = "acceptance-article-index-date-fallback.md";
const htmlFixtureName = "acceptance-article-index-original-timestamp.html";
const markdownFixtureTitle = "Markdown date fallback: AWS — guía";
const htmlFixtureTitle = 'AWS "quotes" & Unicode — Café 日本語';
const markdownFixtureModifiedAt = "2026-10-24";
const htmlFixturePublishedAt = "2024-08-03T04:05:06.789123+05:30";
const htmlFixtureModifiedAt = "2026-10-24";

function frontMatter(source, context) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  assert.ok(match, `${context}: expected YAML front matter`);
  return match[1];
}

function quotedField(yaml, name, context) {
  const match = yaml.match(new RegExp(`^${name}: ("(?:\\\\.|[^"\\\\])*")\\s*$`, "m"));
  assert.ok(match, `${context}: expected JSON-compatible quoted ${name} front matter`);
  return JSON.parse(match[1]);
}

function sourceArticles(projectRoot) {
  const postsDirectory = join(projectRoot, "src", "posts");
  return readdirSync(postsDirectory)
    .filter((filename) => /\.(?:html|md)$/.test(filename))
    .map((filename) => {
      const context = `src/posts/${filename}`;
      const yaml = frontMatter(readFileSync(join(postsDirectory, filename), "utf8"), context);
      if (!/^tags: posts\s*$/m.test(yaml)) return undefined;
      const hasPublishedAt = /^datePublished:/m.test(yaml);
      const publishedAtField = hasPublishedAt ? "datePublished" : "date";
      return {
        filename,
        title: quotedField(yaml, "title", context),
        publishedAt: quotedField(yaml, publishedAtField, context),
        publishedAtField,
        dateModified: /^dateModified:/m.test(yaml) ? quotedField(yaml, "dateModified", context) : undefined,
        url: origin + quotedField(yaml, "permalink", context),
      };
    })
    .filter(Boolean);
}

function assertIndexMatchesSource(indexPath, projectRoot) {
  assert.ok(existsSync(indexPath), `expected the static article index at ${relative(projectRoot, indexPath)} after the build`);
  const index = JSON.parse(readFileSync(indexPath, "utf8"));
  const identity = JSON.parse(readFileSync(join(projectRoot, "src", "_data", "identity.json"), "utf8"));
  const expectedAuthor = { name: identity.author.name, url: identity.author.url };
  const expected = sourceArticles(projectRoot);

  assert.deepEqual(Object.keys(index).sort(), ["articles", "schemaVersion", "source"], "index should expose only the version, source, and articles");
  assert.equal(index.schemaVersion, 1, "index schema version should be 1");
  assert.deepEqual(index.source, expectedSource, "index should identify AWS for Engineers as its source");
  assert.ok(Array.isArray(index.articles), "index articles should be an array");

  const expectedUrls = expected.map((article) => article.url);
  const actualUrls = index.articles.map((article) => article.url);
  assert.equal(new Set(expectedUrls).size, expectedUrls.length, "source permalinks should identify unique published articles");
  assert.equal(new Set(actualUrls).size, actualUrls.length, "index article URLs should be unique");
  assert.deepEqual([...actualUrls].sort(), [...expectedUrls].sort(), "index URLs should cover the posts collection without additions or omissions");

  const actualByUrl = new Map(index.articles.map((article) => [article.url, article]));
  for (const article of expected) {
    const actual = actualByUrl.get(article.url);
    const context = article.filename;
    assert.deepEqual(Object.keys(actual).sort(), ["author", "language", "publishedAt", "title", "url"], `${context}: item should contain only public metadata`);
    assert.equal(actual.title, article.title, `${context}: preserve the readable source title`);
    assert.equal(actual.language, "en", `${context}: article content language should be English`);
    assert.equal(actual.publishedAt, article.publishedAt, `${context}: preserve the original ${article.publishedAtField} value`);
    assert.equal(actual.url, article.url, `${context}: use the publication permalink as the canonical URL`);
    assert.deepEqual(actual.author, expectedAuthor, `${context}: use the public identity author fields`);
    assert.deepEqual(Object.keys(actual.author).sort(), ["name", "url"], `${context}: author should contain only public identity fields`);
  }

  const discriminatingArticle = expected.find((article) =>
    article.publishedAtField === "datePublished" && article.dateModified && article.publishedAt !== article.dateModified,
  );
  assert.ok(discriminatingArticle, "source should include an article whose original publication date differs from its modification date");
  const discriminatingOutput = actualByUrl.get(discriminatingArticle.url);
  assert.equal(discriminatingOutput.publishedAt, discriminatingArticle.publishedAt, "publishedAt should use the original datePublished value");
  assert.notEqual(discriminatingOutput.publishedAt, discriminatingArticle.dateModified, "publishedAt should not use dateModified");

  return { index, expected };
}

function fixtureWorkspace() {
  const fixture = mkdtempSync(join(tmpdir(), "aws-article-index-"));
  cpSync(root, fixture, {
    recursive: true,
    filter(path) {
      const relativePath = relative(root, path);
      if (!relativePath) return true;
      const segments = relativePath.split(sep);
      return !segments.some((segment) => [".git", ".work", "node_modules", "_site"].includes(segment));
    },
  });
  symlinkSync(join(root, "node_modules"), join(fixture, "node_modules"), "dir");
  return fixture;
}

function runBuild(cwd) {
  const result = spawnSync("npm", ["run", "build"], {
    cwd,
    encoding: "utf8",
    timeout: 120_000,
    maxBuffer: 8 * 1024 * 1024,
  });
  return {
    ...result,
    output: `${result.stdout || ""}\n${result.stderr || ""}${result.error ? `\n${result.error.message}` : ""}`,
  };
}

function addCollectionManifest(fixture) {
  writeFileSync(join(fixture, "src", "article-index-acceptance-manifest.njk"), [
    "---",
    'permalink: "/__article-index-acceptance-manifest.json"',
    "---",
    "[",
    "{% for post in collections.posts %}",
    '  {"inputPath": {{ post.inputPath | jsonScript | safe }}, "url": {{ post.url | jsonScript | safe }}}{% if not loop.last %},{% endif %}',
    "{% endfor %}",
    "]",
    "",
  ].join("\n"));
}

function addFixturePosts(fixture) {
  const postsDirectory = join(fixture, "src", "posts");
  mkdirSync(postsDirectory, { recursive: true });
  writeFileSync(join(postsDirectory, markdownFixtureName), [
    "---",
    "layout: post.njk",
    "tags: posts",
    `title: ${JSON.stringify(markdownFixtureTitle)}`,
    'description: "Synthetic Markdown article for the article-index acceptance test."',
    'date: "2025-05-06"',
    'heroImage: "/assets/media/8f45d96f322928a2ccab.jpg"',
    'permalink: "/blog/acceptance-article-index-date-fallback/"',
    `dateModified: "${markdownFixtureModifiedAt}"`,
    'updateNote: "Updated this synthetic Markdown article to test date fallback."',
    "---",
    "",
    "## Article-index date fallback",
    "",
    "Synthetic Markdown post used to verify automatic collection discovery.",
    "",
  ].join("\n"));
  writeFileSync(join(postsDirectory, htmlFixtureName), [
    "---",
    "layout: post.njk",
    "templateEngineOverride: html",
    "tags: posts",
    `title: ${JSON.stringify(htmlFixtureTitle)}`,
    'description: "Synthetic HTML article for the article-index acceptance test."',
    'date: "2024-08-03"',
    `datePublished: "${htmlFixturePublishedAt}"`,
    'heroImage: "/assets/media/8f45d96f322928a2ccab.jpg"',
    'permalink: "/blog/acceptance-article-index-original-timestamp/"',
    `dateModified: "${htmlFixtureModifiedAt}"`,
    'updateNote: "Updated this synthetic HTML article to test publication timestamp preservation."',
    "---",
    "<p>Synthetic HTML post used to verify automatic collection discovery.</p>",
    "",
  ].join("\n"));
  addCollectionManifest(fixture);
}

test("built article index contains every native post as exact public metadata", () => {
  const { expected } = assertIndexMatchesSource(join(root, "_site", "article-index.json"), root);
  assert.ok(expected.length > 0, "source should contain published posts");
});

test("fixture build discovers new Markdown and HTML posts and preserves source values", () => {
  const fixture = fixtureWorkspace();
  try {
    addFixturePosts(fixture);
    const build = runBuild(fixture);
    assert.equal(build.error, undefined, `fixture build command should start and finish\n${build.output.slice(-5000)}`);
    assert.equal(build.signal, null, `fixture build should not be terminated or time out\n${build.output.slice(-5000)}`);
    assert.equal(build.status, 0, `fixture build should succeed\n${build.output.slice(-5000)}`);

    const collectionManifestPath = join(fixture, "_site", "__article-index-acceptance-manifest.json");
    assert.ok(existsSync(collectionManifestPath), "fixture should emit a manifest of the native posts collection");
    const nativePosts = JSON.parse(readFileSync(collectionManifestPath, "utf8"));
    const expected = sourceArticles(fixture);
    const nativeUrls = nativePosts.map((post) => origin + post.url);
    assert.deepEqual([...nativeUrls].sort(), [...expected.map((article) => article.url)].sort(), "article index should match the native posts collection");
    for (const filename of [markdownFixtureName, htmlFixtureName]) {
      assert.ok(nativePosts.some((post) => post.inputPath.replaceAll("\\", "/").endsWith(`/src/posts/${filename}`)),
        `${filename}: new post should be discovered by collections.posts`);
    }

    const { index } = assertIndexMatchesSource(join(fixture, "_site", "article-index.json"), fixture);
    const markdown = index.articles.find((article) => article.url.endsWith("/acceptance-article-index-date-fallback/"));
    assert.equal(markdown?.publishedAt, "2025-05-06", "Markdown post without datePublished should use its original date-only value");
    assert.notEqual(markdown?.publishedAt, markdownFixtureModifiedAt, "Markdown date fallback should not use dateModified");
    const html = index.articles.find((article) => article.url.endsWith("/acceptance-article-index-original-timestamp/"));
    assert.equal(html?.title, htmlFixtureTitle, "JSON title should preserve quotes, ampersand, and Unicode without HTML entity encoding");
    assert.equal(html?.publishedAt, htmlFixturePublishedAt, "HTML post should preserve original timezone and fractional timestamp precision");
    assert.notEqual(html?.publishedAt, htmlFixtureModifiedAt, "HTML post should not substitute dateModified for datePublished");
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});
