import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { GA4_MEASUREMENT_ID, initializeAnalytics } from "../assets/js/analytics.mjs";

const source = await readFile(new URL("../assets/js/analytics.mjs", import.meta.url), "utf8");

function browserHarness() {
  const appendedScripts = [];
  const documentRef = {
    head: { appendChild: (script) => appendedScripts.push(script) },
    createElement: (tag) => ({ tagName: tag.toUpperCase() }),
  };
  const windowRef = {};
  return { appendedScripts, documentRef, windowRef };
}

test("loads GA4 and queues one configuration only on the exact production hostname", () => {
  const { appendedScripts, documentRef, windowRef } = browserHarness();

  assert.equal(GA4_MEASUREMENT_ID, "G-3NXS6QFKHZ");
  assert.equal(initializeAnalytics("dondeaprendoaws.com", documentRef, windowRef), true);
  assert.equal(appendedScripts.length, 1);
  assert.equal(appendedScripts[0].tagName, "SCRIPT");
  assert.equal(appendedScripts[0].async, true);
  assert.equal(
    appendedScripts[0].src,
    `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`,
  );
  assert.equal(windowRef.dataLayer.length, 2);
  assert.equal(windowRef.dataLayer[0][0], "js");
  assert.equal(windowRef.dataLayer[1][0], "config");
  assert.equal(windowRef.dataLayer[1][1], GA4_MEASUREMENT_ID);
});

for (const hostname of [
  "www.dondeaprendoaws.com",
  "dwhs21rzi7jgg.cloudfront.net",
  "localhost",
  "dondeaprendoaws.com.example.org",
]) {
  test(`does not load or queue GA4 on ${hostname}`, () => {
    const { appendedScripts, documentRef, windowRef } = browserHarness();

    assert.equal(initializeAnalytics(hostname, documentRef, windowRef), false);
    assert.deepEqual(appendedScripts, []);
    assert.equal(windowRef.dataLayer, undefined);
    assert.equal(windowRef.gtag, undefined);
  });
}

test("the browser entry point reads location.hostname", () => {
  assert.match(source, /initializeAnalytics\(window\.location\.hostname, document, window\)/);
});

test("the shared production layout emits the fingerprinted analytics module once", async () => {
  const baseLayout = await readFile(
    fileURLToPath(new URL("../layouts/_default/baseof.html", import.meta.url)),
    "utf8",
  );
  const assetsPartial = await readFile(
    fileURLToPath(new URL("../layouts/partials/site-assets.html", import.meta.url)),
    "utf8",
  );

  assert.equal((baseLayout.match(/\$analyticsScript\.RelPermalink/g) ?? []).length, 1);
  assert.match(assetsPartial, /resources\.Fingerprint "sha256"/);
  assert.match(assetsPartial, /assets\/js\/analytics\.mjs/);
});
