import assert from "node:assert/strict";
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, relative, resolve, sep } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const affiliateCode = "212820_ppf2onij";
const disclosure = "Affiliate disclosure: I may earn a commission if you buy through these links.";
const catalogPath = join(root, "src", "_data", "courses.json");
const originalCatalogText = readFileSync(catalogPath, "utf8");
const originalCatalog = JSON.parse(originalCatalogText);
const heroImage = "/assets/media/c6ffbfb618cb8fc3857d.jpg";
const fixtureDate = "2026-10-20";

function attributes(source) {
  return Object.fromEntries([...source.matchAll(/([\w-]+)=(?:"([^"]*)"|'([^']*)')/g)]
    .map(([, name, double, single]) => [name, double ?? single ?? ""]));
}

function visibleText(html) {
  return html.replace(/<!--[^]*?-->/g, " ")
    .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function affiliateLinks(html) {
  return [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)]
    .map((match) => ({
      index: match.index,
      end: match.index + match[0].length,
      attributes: attributes(match[1]),
      text: visibleText(match[2]),
    }))
    .filter((link) => link.attributes.href?.includes("learn.cantrill.io"));
}

function parseAffiliateUrl(link, context) {
  let url;
  const href = link.attributes.href.replaceAll("&amp;", "&");
  assert.doesNotThrow(() => { url = new URL(href); }, context + ": affiliate href must be a URL");
  assert.equal(url.protocol, "https:", context + ": affiliate links must use HTTPS");
  assert.equal(url.hostname, "learn.cantrill.io", context + ": link must go directly to learn.cantrill.io");
  assert.match(url.pathname, /^\/p\/[^/]+$/, context + ": link must go directly to a course page");
  assert.deepEqual(url.searchParams.getAll("affcode"), [affiliateCode], context + ": use the approved referral code exactly once");
  assert.ok(link.attributes.rel?.split(/\s+/).includes("sponsored"), context + ': affiliate link needs rel="sponsored"');
  assert.ok(link.attributes.target === undefined || link.attributes.target.toLowerCase() === "_self",
    context + ": affiliate link must use normal same-tab navigation");
  return url;
}

function recommendationAsides(html) {
  return [...html.matchAll(/<aside\b[^>]*>[\s\S]*?<\/aside>/gi)]
    .map((match) => ({ html: match[0], index: match.index, end: match.index + match[0].length }))
    .filter((aside) => affiliateLinks(aside.html).length);
}

function frontMatter(source) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  assert.ok(match, "fixture article needs YAML front matter");
  return { yaml: match[1] };
}

function fixtureWorkspace() {
  const fixture = mkdtempSync(join(tmpdir(), "aws-article-course-recommendations-"));
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
    output: (result.stdout || "") + "\n" + (result.stderr || "") + (result.error ? "\n" + result.error.message : ""),
  };
}

function assertBuildRejected(result, context, diagnostic) {
  assert.equal(result.error, undefined, context + ": fixture CLI must start and finish without a spawn error");
  assert.equal(result.signal, null, context + ": fixture build must not be terminated or time out");
  assert.ok(Number.isInteger(result.status) && result.status !== 0,
    context + ": Eleventy must reject this article during build\n" + result.output.slice(-5000));
  assert.match(result.output, diagnostic,
    context + ": build output should identify the invalid recommendation\n" + result.output.slice(-5000));
}

function articleFrontMatter(options) {
  const recommendations = options.recommendations;
  let recommendationsYaml = "";
  if (recommendations !== undefined) {
    if (recommendations.length === 0) {
      recommendationsYaml = "courseRecommendations: []\n";
    } else {
      recommendationsYaml = "courseRecommendations:\n" + recommendations.map(({ course, reason }) =>
        "  - course: " + course + "\n" + (reason === undefined ? "" : "    reason: " + JSON.stringify(reason) + "\n"),
      ).join("");
    }
  }
  const templateOverride = options.markdown ? "" : "templateEngineOverride: html\n";
  return [
    "---",
    "layout: post.njk",
    templateOverride.trimEnd(),
    "tags: posts",
    "title: " + JSON.stringify(options.title),
    'description: "Synthetic article used to verify course recommendations."',
    'date: "2025-05-01"',
    'datePublished: "2025-05-01T12:30:00Z"',
    'heroImage: "' + heroImage + '"',
    'permalink: "/blog/' + options.slug + '/"',
    'dateModified: "' + fixtureDate + '"',
    'updateNote: "Updated this synthetic article for acceptance checks."',
    recommendationsYaml.trimEnd(),
    "---",
    "",
  ].filter((line) => line !== "").join("\n") + "\n";
}

const injectedReason = '<img src=x onerror="alert(1)"> & a specific next step';
const singleHtml = articleFrontMatter({
  slug: "acceptance-single-html",
  title: "Single HTML recommendation fixture",
  recommendations: [{ course: "architecture", reason: injectedReason }],
}) + '<p id="preserved-html-intro">This original HTML body remains available without buying a course.</p>\n' +
  '<h2 id="original-html-section-one">Original HTML section one</h2><p>First technical section.</p>\n' +
  '<h2 id="original-html-section-two">Original HTML section two</h2><p>Second technical section.</p>\n' +
  '<h2 id="original-html-section-three">Original HTML section three</h2><pre><code>const templateValue = "{{ untouched }}";\nconst acceptanceFixture = true;</code></pre>\n';

const twoMarkdown = articleFrontMatter({
  slug: "acceptance-two-markdown",
  title: "Two Markdown recommendations fixture",
  markdown: true,
  recommendations: [
    { course: "development", reason: "Continue with structured application development learning." },
    { course: "operations", reason: "Compare this with the operational perspective when it fits your role." },
  ],
}) + "Original Markdown body remains available without buying a course.\n\n" +
  "## Original Markdown section one\n\nFirst technical section.\n\n" +
  "## Original Markdown section two\n\nSecond technical section.\n\n" +
  "## Original Markdown section three\n\n" +
  "~~~js\nconst templateValue = \"{{ untouched }}\";\nconst acceptanceFixture = true;\n~~~\n";

const noRecommendationHtml = articleFrontMatter({
  slug: "acceptance-no-selection-html",
  title: "No recommendation fixture",
}) + '<p id="preserved-no-selection">This article has no selected paid course.</p>\n' +
  '<h2 id="no-selection-section-one">Section one</h2><p>First section.</p>\n' +
  '<h2 id="no-selection-section-two">Section two</h2><p>Second section.</p>\n' +
  '<h2 id="no-selection-section-three">Section three</h2><p>Third section.</p>\n';

const emptyRecommendationMarkdown = articleFrontMatter({
  slug: "acceptance-empty-selection-markdown",
  title: "Empty recommendation fixture",
  markdown: true,
  recommendations: [],
}) + "This Markdown article has an explicit empty selection.\n\n" +
  "## Empty selection section one\n\nFirst section.\n\n" +
  "## Empty selection section two\n\nSecond section.\n\n" +
  "## Empty selection section three\n\nThird section.\n";

function addFixtureArticles(fixture) {
  const posts = join(fixture, "src", "posts");
  mkdirSync(posts, { recursive: true });
  writeFileSync(join(posts, "acceptance-single-html.html"), singleHtml);
  writeFileSync(join(posts, "acceptance-two-markdown.md"), twoMarkdown);
  writeFileSync(join(posts, "acceptance-no-selection-html.html"), noRecommendationHtml);
  writeFileSync(join(posts, "acceptance-empty-selection-markdown.md"), emptyRecommendationMarkdown);
  writeFileSync(join(fixture, "src", "acceptance-article-course-manifest.njk"), [
    "---",
    'permalink: "/__article-course-acceptance-manifest.json"',
    "---",
    "[",
    "{% for post in collections.posts %}",
    "  {% set recommendations = post.data.courseRecommendations or [] %}",
    '  {"inputPath": {{ post.inputPath | jsonScript | safe }}, "url": {{ post.url | jsonScript | safe }}, "courseRecommendations": {{ recommendations | jsonScript | safe }}}{% if not loop.last %},{% endif %}',
    "{% endfor %}",
    "]",
    "",
  ].join("\n"));
  for (const [file, expectedCourse] of [
    ["acceptance-single-html.html", "architecture"],
    ["acceptance-two-markdown.md", "development"],
    ["acceptance-no-selection-html.html", undefined],
    ["acceptance-empty-selection-markdown.md", undefined],
  ]) {
    const fixtureMatter = frontMatter(readFileSync(join(posts, file), "utf8"));
    assert.match(fixtureMatter.yaml, /^layout: post\.njk$/m, file + ": front matter should end before article body content");
    if (expectedCourse) assert.match(fixtureMatter.yaml, new RegExp("course: " + expectedCourse), file + ": selected course must be in parsed front matter");
  }
}

function outputArticle(fixture, slug) {
  return readFileSync(join(fixture, "_site", "blog", slug, "index.html"), "utf8");
}

function assertArticleDateContract(html, slug, outputRoot) {
  const route = "https://awsforengineers.com/blog/" + slug + "/";
  const articleSchema = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)]
    .find(([, attrs]) => attributes(attrs).type === "application/ld+json");
  assert.ok(articleSchema, slug + ": BlogPosting schema should remain present");
  const schema = JSON.parse(articleSchema[2]);
  assert.equal(schema.datePublished, "2025-05-01T12:30:00Z", slug + ": publication date must remain unchanged");
  assert.equal(schema.dateModified, fixtureDate, slug + ": schema modification date must remain unchanged");
  const visibleDates = [...html.matchAll(/<time\b([^>]*)>/g)].map(([, attrs]) => attributes(attrs).datetime);
  assert.deepEqual(visibleDates, [schema.datePublished, fixtureDate], slug + ": visible dates must match the schema");
  const sitemap = readFileSync(join(outputRoot, "sitemap.xml"), "utf8");
  assert.match(sitemap, new RegExp("<loc>" + route + "</loc>\\s*<lastmod>" + fixtureDate + "</lastmod>"),
    slug + ": sitemap lastmod must match the visible and schema modification date");
}

function matchingDivEnd(html, openingIndex) {
  if (openingIndex < 0) return -1;
  const tags = [...html.slice(openingIndex).matchAll(/<!--[\s\S]*?-->|<(script|style|textarea)\b[^>]*>[\s\S]*?<\/\1\s*>|<\/?div\b[^>]*>/gi)];
  let depth = 0;
  for (const tag of tags) {
    if (tag[1] || tag[0].startsWith("<!--")) continue;
    if (tag[0].startsWith("</")) depth--;
    else if (!/\/\s*>$/.test(tag[0])) depth++;
    if (depth === 0) return openingIndex + tag.index + tag[0].length;
  }
  return -1;
}

function assertTrainingIsOptional(text, context) {
  assert.match(text, /(?:paid )?(?:course|training).{0,80}(?:optional|not required|not mandatory)|(?:optional|not required|not mandatory).{0,80}(?:paid )?(?:course|training)|no purchase (?:is )?(?:needed|required|necessary)/i,
    context + ": aside should say that paid training is optional");
}

function assertTechnicalOutline(html, expectedIds, context) {
  const outline = html.match(/<details class="article-contents">([\s\S]*?)<\/details>/)?.[1] || "";
  const outlineIds = [...outline.matchAll(/href="#([^"]+)"/g)].map(([, id]) => decodeURIComponent(id));
  assert.deepEqual(outlineIds, expectedIds, context + ": technical contents should retain original heading anchors");
}

function assertRecommendationGroup(html, options) {
  const slug = options.slug;
  const expectedProducts = options.expectedProducts;
  assertTechnicalOutline(html, options.expectedOriginalHeadingIds, slug);
  const asides = recommendationAsides(html);
  assert.equal(asides.length, 1, slug + ": selected article should have one complementary course group");
  const aside = asides[0];
  const asideLinks = affiliateLinks(aside.html);
  assert.equal(asideLinks.length, expectedProducts.length, slug + ": one course link should render per selection");
  const asideText = visibleText(aside.html);
  assert.equal(asideText.split(disclosure).length - 1, 1, slug + ": group should have one exact visible disclosure");
  assertTrainingIsOptional(asideText, slug);
  const disclosureIndex = aside.html.indexOf(disclosure);
  assert.ok(disclosureIndex >= 0 && disclosureIndex < asideLinks[0].index,
    slug + ": disclosure must appear immediately before the paid links");
  for (const product of expectedProducts) {
    assert.ok(asideText.includes(product.name), slug + ": display name must come from the shared catalog");
    if (product.instructor) assert.ok(asideText.includes(product.instructor), slug + ": instructor attribution should match the shared catalog");
    if (product.qualification) assert.ok(asideText.includes(product.qualification), slug + ": qualification should match the shared catalog");
  }
  for (const reason of options.expectedReasons || []) {
    assert.ok(asideText.includes(reason), slug + ": each article-specific reason should remain readable plain text");
  }
  const urls = asideLinks.map((link, index) => {
    const url = parseAffiliateUrl(link, slug);
    assert.equal(url.origin + url.pathname, expectedProducts[index].url,
      slug + ": course " + expectedProducts[index].name + " should use the shared catalog destination");
    return url;
  });
  assert.equal(new Set(urls.map((url) => url.href)).size, expectedProducts.length,
    slug + ": each selected product should keep its own catalog destination");
  if (options.expectedReason) {
    assert.ok(asideText.includes(options.expectedReason), slug + ": article-specific reason should remain visible as plain text");
    assert.ok(html.includes("&lt;img src=x onerror=&quot;alert(1)&quot;&gt;"), slug + ": markup-like reason must be escaped");
    assert.ok(!html.includes(options.expectedReason), slug + ": markup-like reason must not become active HTML");
  }

  const articleBody = html.match(/<div class="article-body">([\s\S]*?)<\/div>/)?.[1] || "";
  assert.ok(articleBody.includes("Original"), slug + ": original article body must remain intact");
  assert.ok(!articleBody.includes("learn.cantrill.io"), slug + ": paid links should stay outside the technical body");
  const bodyElement = html.indexOf('<div class="article-body">');
  const bodyEnd = matchingDivEnd(html, bodyElement);
  const tailStart = html.indexOf('<div class="article-tail">');
  assert.ok(aside.index >= bodyEnd && aside.end < tailStart,
    slug + ": recommendation group must follow the original body and precede the author tail");
  assert.ok(tailStart > aside.end && html.includes('aria-label="About the author"'), slug + ": author tail must remain after the group");
  assert.match(html, /href="\/blog\/">← Read more articles<\/a>/, slug + ": article navigation must remain in the tail");

  const outline = html.match(/<details class="article-contents">([\s\S]*?)<\/details>/)?.[1] || "";
  assert.ok(!visibleText(outline).includes("course"), slug + ": recommendation copy must not enter technical contents");
}

test("article recommendations render from the shared catalog and invalid selections fail real builds", async (t) => {
  const fixture = fixtureWorkspace();
  const fixturePosts = join(fixture, "src", "posts");
  const positiveCatalog = JSON.parse(originalCatalogText);
  positiveCatalog.products.architecture.name = "Acceptance Catalog Architecture";
  positiveCatalog.products.architecture.url = "https://learn.cantrill.io/p/acceptance-fixture-architecture";
  positiveCatalog.products.architecture.instructor = "Acceptance Instructor";
  positiveCatalog.products.architecture.qualification = "Acceptance catalog qualification.";
  positiveCatalog.products.development.name = "Acceptance Catalog Development";
  positiveCatalog.products.development.url = "https://learn.cantrill.io/p/acceptance-fixture-development";
  positiveCatalog.products.development.qualification = "Acceptance development qualification.";

  try {
    addFixtureArticles(fixture);
    writeFileSync(join(fixture, "src", "_data", "courses.json"), JSON.stringify(positiveCatalog, null, 2) + "\n");

    let validBuild;
    await t.test("valid selected, absent, and empty fixture articles build", () => {
      validBuild = runBuild(fixture);
      assert.equal(validBuild.error, undefined, "fixture build must start and finish without a spawn error\n" + validBuild.output.slice(-5000));
      assert.equal(validBuild.signal, null, "fixture build must not be terminated or time out\n" + validBuild.output.slice(-5000));
      assert.equal(validBuild.status, 0, "valid article fixtures should build\n" + validBuild.output.slice(-5000));
    });

    await t.test("one selected HTML article renders a catalog-backed aside", () => {
      assert.equal(validBuild?.status, 0, "valid fixture build must complete before reading generated output");
      const single = outputArticle(fixture, "acceptance-single-html");
      assert.match(single, /<title>Single HTML recommendation fixture<\/title>/, "fixture title front matter should render");
      assert.match(single, /<h1>Single HTML recommendation fixture<\/h1>/, "fixture article heading should render");
      assertArticleDateContract(single, "acceptance-single-html", join(fixture, "_site"));
      assert.ok(single.includes("This original HTML body remains available without buying a course."), "original HTML body should render");
      assert.ok(single.includes("const templateValue = \"{{ untouched }}\";"), "Nunjucks-looking text in imported HTML code should stay literal");
      assert.ok(single.includes("const acceptanceFixture = true;"), "original code example should remain intact");
      assertRecommendationGroup(single, {
        slug: "acceptance-single-html",
        expectedProducts: [positiveCatalog.products.architecture],
        expectedReason: injectedReason,
        expectedOriginalHeadingIds: ["original-html-section-one", "original-html-section-two", "original-html-section-three"],
      });
      assert.ok(visibleText(single).includes("This original HTML body remains available without buying a course."),
        "a recommendation must not replace the free original article");
    });

    await t.test("two selected Markdown courses render together in one catalog-backed aside", () => {
      assert.equal(validBuild?.status, 0, "valid fixture build must complete before reading generated output");
      const two = outputArticle(fixture, "acceptance-two-markdown");
      assert.match(two, /<title>Two Markdown recommendations fixture<\/title>/, "Markdown fixture title front matter should render");
      assert.match(two, /<h1>Two Markdown recommendations fixture<\/h1>/, "Markdown fixture article heading should render");
      assertArticleDateContract(two, "acceptance-two-markdown", join(fixture, "_site"));
      assert.ok(visibleText(two).includes("Original Markdown body remains available without buying a course."), "original Markdown body should render");
      assert.ok(visibleText(two).includes("const templateValue = \"{{ untouched }}\";"), "Nunjucks-looking text in Markdown code should stay literal");
      assert.ok(visibleText(two).includes("const acceptanceFixture = true;"), "original Markdown code example should remain intact");
      assertRecommendationGroup(two, {
        slug: "acceptance-two-markdown",
        expectedProducts: [positiveCatalog.products.development, positiveCatalog.products.operations],
        expectedReasons: [
          "Continue with structured application development learning.",
          "Compare this with the operational perspective when it fits your role.",
        ],
        expectedOriginalHeadingIds: ["section-original-markdown-section-one", "section-original-markdown-section-two", "section-original-markdown-section-three"],
      });
      assert.ok(visibleText(two).includes("Original Markdown body remains available without buying a course."),
        "two recommendations must not replace the free original article");
    });

    await t.test("absent and empty selections render no recommendation or disclosure", () => {
      assert.equal(validBuild?.status, 0, "valid fixture build must complete before reading generated output");
      for (const [slug, marker] of [
        ["acceptance-no-selection-html", "This article has no selected paid course."],
        ["acceptance-empty-selection-markdown", "This Markdown article has an explicit empty selection."],
      ]) {
        const html = outputArticle(fixture, slug);
        assert.equal([...html.matchAll(/<aside\b[^>]*>[\s\S]*?<\/aside>/gi)].length, 0, slug + ": no-selection fixture should not gain any aside");
        assert.equal(recommendationAsides(html).length, 0, slug + ": no selection should render no recommendation group");
        assert.equal(affiliateLinks(html).length, 0, slug + ": no selection should render no affiliate anchors");
        assert.ok(!visibleText(html).includes(disclosure), slug + ": no selection should render no affiliate disclosure");
        assert.ok(visibleText(html).includes(marker), slug + ": original free article content must remain");
      }
    });

    await t.test("current article sources match their generated output", () => {
      assert.equal(validBuild?.status, 0, "fixture build must complete before checking current article data");
      assertCurrentArticles(fixture);
    });

    await t.test("unknown article course key is rejected with a useful diagnostic", () => {
      const invalidPath = join(fixturePosts, "acceptance-invalid-unknown.html");
      writeFileSync(join(fixture, "src", "_data", "courses.json"), originalCatalogText);
      try {
        const source = articleFrontMatter({
          slug: "acceptance-invalid-unknown",
          title: "Unknown article course fixture",
          recommendations: [{ course: "__unknown_article_course__", reason: "A reason is present." }],
        }) + "<h2>Technical section</h2><p>Original article.</p>";
        writeFileSync(invalidPath, source);
        assert.match(frontMatter(readFileSync(invalidPath, "utf8")).yaml, /course: __unknown_article_course__/,
          "unknown course fixture must be recognized as article front matter");
        assertBuildRejected(runBuild(fixture), "unknown selected article course key",
          /(?:unknown|unrecognized|not found|missing|invalid).{0,100}(?:course|product|selection)|(?:course|product|selection).{0,100}(?:unknown|unrecognized|not found|missing|invalid)|__unknown_article_course__/i);
      } finally {
        rmSync(invalidPath, { force: true });
        writeFileSync(join(fixture, "src", "_data", "courses.json"), originalCatalogText);
      }
    });

    await t.test("missing article reason is rejected with a useful diagnostic", () => {
      const invalidPath = join(fixturePosts, "acceptance-invalid-reason.html");
      writeFileSync(join(fixture, "src", "_data", "courses.json"), originalCatalogText);
      try {
        const source = articleFrontMatter({
          slug: "acceptance-invalid-reason",
          title: "Missing article reason fixture",
          recommendations: [{ course: "architecture" }],
        }) + "<h2>Technical section</h2><p>Original article.</p>";
        writeFileSync(invalidPath, source);
        assert.match(frontMatter(readFileSync(invalidPath, "utf8")).yaml, /course: architecture/,
          "missing-reason fixture must be recognized as article front matter");
        assert.doesNotMatch(frontMatter(readFileSync(invalidPath, "utf8")).yaml, /^\s*reason:/m,
          "missing-reason fixture must actually omit the reason field");
        assertBuildRejected(runBuild(fixture), "missing selected article reason", /\b(?:reason|explanation)\b/i);
      } finally {
        rmSync(invalidPath, { force: true });
        writeFileSync(join(fixture, "src", "_data", "courses.json"), originalCatalogText);
      }
    });

    await t.test("malformed destination is rejected only when an article selects that catalog product", () => {
      const invalidCatalog = JSON.parse(originalCatalogText);
      invalidCatalog.products.articleOnlyInvalid = { name: "Article-only invalid product", url: "not a URL" };
      const invalidPath = join(fixturePosts, "acceptance-invalid-destination.html");
      try {
        writeFileSync(join(fixture, "src", "_data", "courses.json"), JSON.stringify(invalidCatalog, null, 2) + "\n");
        const source = articleFrontMatter({
          slug: "acceptance-invalid-destination",
          title: "Malformed article destination fixture",
          recommendations: [{ course: "articleOnlyInvalid", reason: "This selected destination is deliberately invalid." }],
        }) + "<h2>Technical section</h2><p>Original article.</p>";
        writeFileSync(invalidPath, source);
        assert.match(frontMatter(readFileSync(invalidPath, "utf8")).yaml, /course: articleOnlyInvalid/,
          "malformed-destination fixture must be recognized as article front matter");
        assertBuildRejected(runBuild(fixture), "malformed destination selected by an article", /\b(?:url|destination|host|learn\.cantrill\.io)\b/i);
      } finally {
        rmSync(invalidPath, { force: true });
        writeFileSync(join(fixture, "src", "_data", "courses.json"), originalCatalogText);
      }
    });
  } finally {
    writeFileSync(join(fixture, "src", "_data", "courses.json"), originalCatalogText);
    rmSync(fixture, { recursive: true, force: true });
  }
});

function productionArticlePath(permalink) {
  assert.ok(permalink?.startsWith("/blog/") && permalink.endsWith("/"), "article should keep its blog route: " + permalink);
  return join(root, "_site", permalink.replace(/^\/+/, ""), "index.html");
}

function assertCurrentArticles(fixture) {
  const currentFiles = readdirSync(join(root, "src", "posts")).filter((file) => /\.(?:html|md)$/.test(file));
  assert.ok(currentFiles.length >= 141, "expected the current article collection; found " + currentFiles.length);
  const currentFileSet = new Set(currentFiles);
  const manifest = JSON.parse(readFileSync(join(fixture, "_site", "__article-course-acceptance-manifest.json"), "utf8"));
  assert.ok(Array.isArray(manifest), "fixture-only Eleventy manifest should serialize the posts collection");
  const manifestByFile = new Map(manifest.map((entry) => [String(entry.inputPath).replaceAll("\\", "/").split("/").at(-1), entry]));
  assert.deepEqual(manifestByFile.get("acceptance-single-html.html")?.courseRecommendations,
    [{ course: "architecture", reason: injectedReason }], "Eleventy should parse the selected HTML front matter");
  assert.deepEqual(manifestByFile.get("acceptance-two-markdown.md")?.courseRecommendations, [
    { course: "development", reason: "Continue with structured application development learning." },
    { course: "operations", reason: "Compare this with the operational perspective when it fits your role." },
  ], "Eleventy should parse the selected Markdown front matter");
  const articles = manifest.filter((entry) => {
    const inputPath = String(entry.inputPath || "").replaceAll("\\", "/");
    const file = inputPath.split("/").at(-1);
    return inputPath.includes("src/posts/") && currentFileSet.has(file);
  });
  assert.equal(articles.length, currentFiles.length, "manifest should include each current HTML or Markdown article once");
  assert.equal(new Set(articles.map((entry) => String(entry.inputPath).split(/[\\/]/).at(-1))).size, currentFiles.length,
    "manifest should not duplicate a current source article");

  const selectedArticles = articles.filter((article) => Array.isArray(article.courseRecommendations) && article.courseRecommendations.length > 0);
  let selectedGroups = 0;

  for (const article of articles) {
    const context = article.url || article.inputPath;
    const outputPath = productionArticlePath(article.url);
    assert.ok(existsSync(outputPath), "run npm run build before checking generated article " + context);
    const html = readFileSync(outputPath, "utf8");
    const groups = recommendationAsides(html);
    const recommendations = article.courseRecommendations || [];
    assert.ok(Array.isArray(recommendations), context + ": courseRecommendations should be a list when present");
    if (!recommendations.length) {
      assert.equal(groups.length, 0, context + ": absent or empty selection must not render a paid course group");
      assert.equal(affiliateLinks(html).length, 0, context + ": skipped article must not render affiliate anchors");
      assert.ok(!visibleText(html).includes(disclosure), context + ": skipped article must not render an affiliate disclosure");
      continue;
    }
    assert.ok(recommendations.every((recommendation) => typeof recommendation?.course === "string" &&
      typeof recommendation?.reason === "string" && recommendation.reason.trim()),
      context + ": every selected course needs a non-empty article-specific reason");
    selectedGroups += groups.length;
    assert.equal(groups.length, 1, context + ": one selected article should have one local recommendation group");
    const group = groups[0];
    const links = affiliateLinks(group.html);
    assert.equal(links.length, recommendations.length, context + ": selected catalog products should each have one link");
    const groupText = visibleText(group.html);
    assert.equal(groupText.split(disclosure).length - 1, 1, context + ": selected article should have one visible disclosure");
    assertTrainingIsOptional(groupText, context);
    assert.equal(visibleText(html).split(disclosure).length - 1, 1, context + ": disclosure should appear only in the local aside");
    const disclosureIndex = group.html.indexOf(disclosure);
    assert.ok(disclosureIndex >= 0 && disclosureIndex < links[0].index, context + ": disclosure should precede the paid links");
    for (const [index, recommendation] of recommendations.entries()) {
      const product = originalCatalog.products[recommendation.course];
      assert.ok(product, context + ": " + recommendation.course + " must exist in the shared catalog");
      const url = parseAffiliateUrl(links[index], context);
      assert.equal(url.origin + url.pathname, product.url,
        context + ": selected " + recommendation.course + " must use the shared catalog destination");
      assert.ok(groupText.includes(product.name), context + ": selected " + recommendation.course + " label should match the catalog");
      if (product.instructor) assert.ok(groupText.includes(product.instructor), context + ": " + recommendation.course + " instructor attribution should match the catalog");
      if (product.qualification) assert.ok(groupText.includes(product.qualification), context + ": " + recommendation.course + " qualification should match the catalog");
      const visibleReason = recommendation.reason.replace(/\s+/g, " ").trim();
      assert.ok(groupText.includes(visibleReason),
        context + ": article-specific reason should remain visible as plain text");
    }
    const bodyElement = html.indexOf('<div class="article-body">');
    const bodyEnd = matchingDivEnd(html, bodyElement);
    assert.ok(bodyElement >= 0 && bodyEnd > bodyElement, context + ": generated article body should have a closed wrapper");
    const tailStart = html.indexOf('<div class="article-tail">');
    assert.ok(group.index >= bodyEnd && group.end < tailStart, context + ": paid group belongs after the body and before the retained tail");
    assert.ok(html.slice(tailStart).includes('aria-label="About the author"'), context + ": author tail should remain after recommendations");
    assert.match(html.slice(tailStart), /<a\b[^>]*href="\/blog\/"[^>]*>← Read more articles<\/a>/,
      context + ": article navigation should remain in the tail");
    assert.ok(!affiliateLinks(html.slice(0, group.index)).length && !affiliateLinks(html.slice(group.end)).length,
      context + ": selected paid links should be confined to the local recommendation aside");
    const contents = html.match(/<details class="article-contents">([\s\S]*?)<\/details>/)?.[1] || "";
    const asideHeadingIds = [...group.html.matchAll(/<h[2-6]\b([^>]*)>/gi)]
      .map(([, attrs]) => attributes(attrs).id)
      .filter(Boolean);
    const contentHeadingIds = [...contents.matchAll(/href="#([^"]+)"/g)].map(([, id]) => decodeURIComponent(id));
    const recommendationHeadingText = [...group.html.matchAll(/<h[2-6]\b[^>]*>([\s\S]*?)<\/h[2-6]>/gi)]
      .map(([, text]) => visibleText(text));
    assert.ok(!affiliateLinks(contents).length && !contentHeadingIds.some((id) => asideHeadingIds.includes(id)) &&
      !recommendationHeadingText.some((heading) => visibleText(contents).includes(heading)),
      context + ": recommendation links and headings must stay out of technical contents");
  }

  assert.ok(selectedArticles.length > 0 && selectedGroups > 0,
    "at least one current production article should select a recommendation after delivery");
}
