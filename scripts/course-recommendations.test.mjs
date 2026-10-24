import assert from "node:assert/strict";
import { cpSync, existsSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, relative, resolve, sep } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const affiliateCode = "212820_ppf2onij";
const disclosure = "Affiliate disclosure: I may earn a commission if you buy through these links.";
const knownProducts = {
  architecture: "/p/aws-certified-solutions-architect-associate-saa-c03",
  development: "/p/aws-certified-developer-associate",
};

function attributes(source) {
  return Object.fromEntries([...source.matchAll(/([\w-]+)=(?:"([^"]*)"|'([^']*)')/g)]
    .map(([, name, double, single]) => [name, double ?? single]));
}

function affiliateLinks(html) {
  return [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)]
    .map((match) => ({
      index: match.index,
      attributes: attributes(match[1]),
      text: match[2],
    }))
    .filter((link) => link.attributes.href?.includes("learn.cantrill.io"));
}

function parsedHref(link, context) {
  const href = link.attributes.href.replaceAll("&amp;", "&");
  let url;
  assert.doesNotThrow(() => { url = new URL(href); }, `${context}: affiliate href must be a URL`);
  return url;
}

function assertAffiliateLinkContract(html, context) {
  const links = affiliateLinks(html);
  assert.ok(links.length, `${context}: expected a direct course recommendation`);
  assert.ok(visibleText(html).includes(disclosure), `${context}: expected a visible affiliate disclosure`);
  for (const link of links) {
    const url = parsedHref(link, context);
    assert.equal(url.protocol, "https:", `${context}: affiliate links must use HTTPS`);
    assert.equal(url.hostname, "learn.cantrill.io", `${context}: link must go directly to learn.cantrill.io`);
    assert.match(url.pathname, /^\/p\/[^/]+$/, `${context}: link must go directly to a course page`);
    assert.deepEqual(url.searchParams.getAll("affcode"), [affiliateCode], `${context}: use the approved referral code exactly once`);
    assert.ok(link.attributes.rel?.split(/\s+/).includes("sponsored"), `${context}: affiliate link needs rel="sponsored"`);
    assert.ok(link.attributes.target === undefined || link.attributes.target.toLowerCase() === "_self",
      `${context}: affiliate link must use normal same-tab navigation`);
  }
  return links;
}

function headings(html) {
  return [...html.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/g)].map((match) => ({
    text: match[2].replace(/<[^>]*>/g, " ").replace(/&amp;/g, "&").trim(),
    index: match.index,
    end: match.index + match[0].length,
  }));
}

function visibleText(html) {
  return html.replace(/<!--[^]*?-->/g, " ")
    .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ");
}

function sectionForHeading(html, headingText) {
  const heading = headings(html).find(({ text }) => text.toLowerCase() === headingText.toLowerCase());
  assert.ok(heading, `expected the ${headingText} section heading`);
  const start = html.lastIndexOf("<section", heading.index);
  const closingTag = "</section>";
  const close = html.indexOf(closingTag, heading.end);
  assert.ok(start >= 0 && close >= 0, `${headingText} should be contained in a section`);
  return { start, end: close + closingTag.length, html: html.slice(start, close + closingTag.length) };
}

function assert2AOutput(outputRoot) {
  const homePath = join(outputRoot, "index.html");
  const pagePath = join(outputRoot, "certifications", "index.html");
  assert.ok(existsSync(homePath), "run npm run build before checking the 2A homepage output");
  assert.ok(existsSync(pagePath), "expected the static /certifications/ page from the Eleventy build");
  const home = readFileSync(homePath, "utf8");
  const certifications = readFileSync(pagePath, "utf8");
  const homeHeadings = headings(home).map((heading) => heading.text.toLowerCase());
  const topicIndex = homeHeadings.findIndex((heading) => heading.includes("explore aws by topic"));
  const recommendationIndex = homeHeadings.findIndex((heading) => heading === "recommended aws courses");
  const whyIndex = homeHeadings.findIndex((heading) => heading.includes("why should software engineers learn aws"));
  assert.ok(topicIndex >= 0 && topicIndex < recommendationIndex && recommendationIndex < whyIndex,
    "homepage recommendations must sit after topic exploration and before the 'Why Learn AWS' section");

  const recommendationSection = sectionForHeading(home, "Recommended AWS courses");
  assert.ok(visibleText(recommendationSection.html).includes(disclosure), "homepage course section should visibly disclose the affiliate relationship");
  const homeLinks = assertAffiliateLinkContract(home, "homepage");
  for (const link of homeLinks) {
    assert.ok(link.index >= recommendationSection.start && link.index < recommendationSection.end,
      "homepage course links should stay in the compact recommendations section");
  }
  for (const path of Object.values(knownProducts)) {
    assert.ok(homeLinks.some((link) => parsedHref(link, "homepage").pathname === path),
      `homepage should recommend the verified ${path} course`);
  }
  assert.ok(home.includes('href="/certifications/"'), "homepage should link readers to course guidance");

  const canonical = certifications.match(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"/);
  assert.equal(canonical?.[1], "https://awsforengineers.com/certifications/", "certifications page needs its canonical URL");
  const sitemap = readFileSync(join(outputRoot, "sitemap.xml"), "utf8");
  assert.ok(sitemap.includes("<loc>https://awsforengineers.com/certifications/</loc>"), "certifications page belongs in the sitemap");
  const footer = certifications.match(/<footer\b[\s\S]*?<\/footer>/)?.[0] || "";
  assert.ok(footer.includes('href="/certifications/"'), "shared footer should link to certifications from the page");
  const homeFooter = home.match(/<footer\b[\s\S]*?<\/footer>/)?.[0] || "";
  assert.ok(homeFooter.includes('href="/certifications/"'), "shared footer should link to certifications from the homepage");

  const pageText = visibleText(certifications);
  const officialLinks = [...certifications.matchAll(/<a\b([^>]*)>/g)]
    .map(([, raw]) => attributes(raw).href || "")
    .filter((href) => /https:\/\/(?:aws\.amazon\.com\/certification|docs\.aws\.amazon\.com\/aws-certification)/.test(href));
  assert.ok(officialLinks.length >= 2, "include official AWS certification and exam-preparation references");
  assert.match(pageText, /(?:course|training).{0,100}(?:optional|not required|not mandatory)|(?:optional|not required|not mandatory).{0,100}(?:course|training)/i,
    "make clear that paid training is optional");

  const pageLinks = assertAffiliateLinkContract(certifications, "certifications page");
  for (const path of Object.values(knownProducts)) {
    const link = pageLinks.find((candidate) => parsedHref(candidate, "certifications page").pathname === path);
    assert.ok(link, `certifications page should include the verified ${path} course`);
  }
}

function frontMatter(source) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  assert.ok(match, "homepage needs YAML front matter for its course recommendations");
  return { yaml: match[1], replace: (yaml) => source.replace(match[1], yaml) };
}

function replaceFirstField(yaml, field, value) {
  const pattern = new RegExp(`^([ \\t]*(?:-[ \\t]*)?${field}:[ \\t]*)(?:"(?:\\\\.|[^"])*"|'[^']*'|[^\\r\\n]*)(\\r?)$`, "m");
  assert.match(yaml, pattern, `expected a ${field} field in homepage courseRecommendations`);
  return yaml.replace(pattern, (_line, prefix, cr) => `${prefix}${JSON.stringify(value)}${cr}`);
}

function withoutFirstField(yaml, field) {
  const pattern = new RegExp(`^[ \\t]*(?:-[ \\t]*)?${field}:[^\\r\\n]*(?:\\r?\\n)?`, "m");
  assert.match(yaml, pattern, `expected a ${field} field in homepage courseRecommendations`);
  return yaml.replace(pattern, "");
}

function fixtureWorkspace() {
  const fixture = mkdtempSync(join(tmpdir(), "aws-course-recommendations-"));
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

function buildFixture(fixture) {
  const result = spawnSync("npm", ["run", "build"], {
    cwd: fixture,
    encoding: "utf8",
    timeout: 120_000,
    maxBuffer: 8 * 1024 * 1024,
  });
  return { ...result, output: `${result.stdout || ""}\n${result.stderr || ""}${result.error ? `\n${result.error.message}` : ""}` };
}

function assertBuildRejected(result, context, diagnostic) {
  assert.equal(result.error, undefined, `${context}: fixture CLI must start and finish without a spawn error`);
  assert.equal(result.signal, null, `${context}: fixture build must not be terminated or time out`);
  assert.ok(Number.isInteger(result.status) && result.status !== 0,
    `${context}: Eleventy must reject this recommendation during build\n${result.output.slice(-5000)}`);
  assert.match(result.output, diagnostic, `${context}: build output should identify the invalid recommendation category\n${result.output.slice(-5000)}`);
}

test("2A homepage and certifications output meet the reader and link contract", () => {
  assert2AOutput(join(root, "_site"));
});

test("Eleventy uses the shared catalog, escapes copy, and rejects invalid recommendations", () => {
  const catalogPath = join(root, "src", "_data", "courses.json");
  assert.ok(existsSync(catalogPath), "Phase 2A should define its shared course catalog before building recommendations");
  const originalCatalog = readFileSync(catalogPath, "utf8");
  const originalHome = readFileSync(join(root, "src", "index.njk"), "utf8");
  const products = JSON.parse(originalCatalog).products;
  const architecture = Object.entries(products).find(([, product]) =>
    product.url === `https://learn.cantrill.io${knownProducts.architecture}`);
  assert.ok(architecture, "shared catalog should contain the verified Solutions Architect Associate product");
  const [architectureKey] = architecture;
  let homeMatter = frontMatter(originalHome);
  const reasonPattern = /^[ \t]*reason:[^\r\n]*$/m;
  assert.match(homeMatter.yaml, reasonPattern, "homepage recommendation should include its own explanation");
  const fixture = fixtureWorkspace();

  try {
    const changedCatalog = JSON.parse(originalCatalog);
    changedCatalog.products[architectureKey].name = "Acceptance Catalog Name";
    changedCatalog.products[architectureKey].url = "https://learn.cantrill.io/p/acceptance-fixture-product";
    writeFileSync(join(fixture, "src", "_data", "courses.json"), `${JSON.stringify(changedCatalog, null, 2)}\n`);
    const injectedExplanation = "<img src=x onerror=alert(1)>";
    homeMatter = frontMatter(originalHome);
    const changedYaml = replaceFirstField(homeMatter.yaml, "reason", injectedExplanation);
    writeFileSync(join(fixture, "src", "index.njk"), homeMatter.replace(changedYaml));

    const positive = buildFixture(fixture);
    assert.equal(positive.status, 0, `valid shared-catalog fixture should build\n${positive.output.slice(-5000)}`);
    for (const page of ["index.html", "certifications/index.html"]) {
      const html = readFileSync(join(fixture, "_site", page), "utf8");
      assert.ok(html.includes("Acceptance Catalog Name"), `${page} should use the shared catalog name`);
      assert.ok(html.includes("/p/acceptance-fixture-product?affcode=212820_ppf2onij"), `${page} should use the shared catalog URL`);
    }
    const homeOutput = readFileSync(join(fixture, "_site", "index.html"), "utf8");
    assert.ok(homeOutput.includes("&lt;img src=x onerror=alert(1)&gt;"), "untrusted explanation should render as escaped text");
    assert.ok(!homeOutput.includes(injectedExplanation), "untrusted explanation must not become executable markup");

    writeFileSync(join(fixture, "src", "_data", "courses.json"), originalCatalog);
    homeMatter = frontMatter(originalHome);
    writeFileSync(join(fixture, "src", "index.njk"), homeMatter.replace(replaceFirstField(homeMatter.yaml, "course", "__unknown_acceptance_course__")));
    assertBuildRejected(buildFixture(fixture), "unknown selected course key",
      /(?:unknown|unrecognized|not found|missing|invalid).{0,100}(?:course|product)|(?:course|product).{0,100}(?:unknown|unrecognized|not found|missing|invalid)|__unknown_acceptance_course__/i);

    for (const [label, url] of [
      ["malformed product destination", "not a URL"],
      ["foreign-host product destination", "https://example.invalid/p/course"],
    ]) {
      const invalidCatalog = JSON.parse(originalCatalog);
      invalidCatalog.products[architectureKey].url = url;
      writeFileSync(join(fixture, "src", "_data", "courses.json"), `${JSON.stringify(invalidCatalog, null, 2)}\n`);
      writeFileSync(join(fixture, "src", "index.njk"), originalHome);
      assertBuildRejected(buildFixture(fixture), label, /\b(?:url|destination|host|learn\.cantrill\.io)\b/i);
    }

    writeFileSync(join(fixture, "src", "_data", "courses.json"), originalCatalog);
    homeMatter = frontMatter(originalHome);
    writeFileSync(join(fixture, "src", "index.njk"), homeMatter.replace(withoutFirstField(homeMatter.yaml, "reason")));
    assertBuildRejected(buildFixture(fixture), "missing recommendation explanation", /\b(?:reason|explanation)\b/i);
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});
