import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import test from "node:test";
import { siteRenderingFailures } from "./site-rendering-check.mjs";

const siteScript = readFileSync(new URL("../src/assets/site.js", import.meta.url), "utf8");
const adsenseUrl = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9639896081226655";

function createSite({ hostname = "awsforengineers.com", readyState = "loading", hidden = false } = {}) {
  const frames = [];
  const scripts = [];
  const windowListeners = new Map();
  const documentListeners = new Map();
  const searchListeners = new Map();
  const input = {
    value: "",
    addEventListener: (event, listener) => searchListeners.set(event, listener),
  };
  const cards = [
    { textContent: "IAM access policies", hidden: false },
    { textContent: "S3 storage classes", hidden: false },
  ];
  const status = { textContent: "" };
  const document = {
    hidden,
    readyState,
    querySelectorAll(selector) {
      if (selector === "[data-post-search]") return [input];
      if (selector === "[data-search-card]") return cards;
      return [];
    },
    querySelector(selector) {
      return selector === "[data-search-status]" ? status : null;
    },
    createElement: () => ({ type: "" }),
    head: { appendChild: (script) => scripts.push(script) },
    addEventListener(event, listener) {
      documentListeners.set(event, [...(documentListeners.get(event) || []), listener]);
    },
  };
  const window = {
    requestAnimationFrame(callback) {
      frames.push(callback);
      return frames.length;
    },
    addEventListener(event, listener, options) {
      windowListeners.set(event, { listener, options });
    },
  };
  runInNewContext(siteScript, { document, window, location: { hostname } });

  return {
    cards,
    document,
    frames,
    input,
    scripts,
    searchListeners,
    status,
    windowListeners,
    documentListeners,
    flushFrame() {
      const callback = frames.shift();
      assert.ok(callback, "expected a queued animation frame");
      callback();
    },
    dispatchDocument(event) {
      for (const listener of documentListeners.get(event) || []) listener();
    },
  };
}

test("render checker requires one exact inline stylesheet and rejects stylesheet links", () => {
  const css = ".site-header { color: navy; }\n";
  const version = "abcdef123456";
  const valid = `<head><style data-site-stylesheet="true">${css}</style></head><body><script defer src="/assets/site.js?v=${version}"></script></body>`;
  assert.deepEqual(siteRenderingFailures(valid, css, version), []);
  assert.ok(siteRenderingFailures(valid.replace("color: navy", "color: blue"), css, version).some((issue) => issue.includes("differs")));
  assert.ok(siteRenderingFailures(`<link rel="stylesheet" href="/assets/site.css">${valid}`, css, version).some((issue) => issue.includes("stylesheet link")));
  assert.ok(siteRenderingFailures(`<head></head><body><style data-site-stylesheet="true">${css}</style><script defer src="/assets/site.js?v=${version}"></script></body>`, css, version).some((issue) => issue.includes("outside the head")));
  assert.ok(siteRenderingFailures("<head></head>", css, version).some((issue) => issue.includes("exactly one")));
  assert.ok(siteRenderingFailures(valid.replace(`site.js?v=${version}`, "site.js"), css, version).some((issue) => issue.includes("current deferred site.js")));
});

test("only the exact production host schedules ads while local and preview hosts keep search local", () => {
  const site = createSite({ hostname: "localhost", readyState: "complete" });
  assert.equal(site.frames.length, 0);
  assert.equal(site.scripts.length, 0);

  site.input.value = "iam";
  site.searchListeners.get("input")();
  assert.equal(site.cards[0].hidden, false);
  assert.equal(site.cards[1].hidden, true);
  assert.equal(site.status.textContent, "1 article shown");

  for (const hostname of [
    "127.0.0.1",
    "d1234567890abc.cloudfront.net",
    "www.awsforengineers.com",
  ]) {
    const preview = createSite({ hostname, readyState: "complete" });
    assert.equal(preview.frames.length, 0, `${hostname} must not schedule production ads`);
    assert.equal(preview.scripts.length, 0, `${hostname} must not insert production scripts`);
  }
});

test("production ads wait for load and two visible animation frames, then load once with existing attributes", () => {
  const site = createSite();
  assert.equal(site.scripts.length, 0);
  assert.equal(site.windowListeners.get("load").options.once, true);

  site.document.readyState = "complete";
  site.windowListeners.get("load").listener();
  site.windowListeners.get("load").listener();
  assert.equal(site.frames.length, 1, "repeated load events must not queue duplicate loading");
  assert.equal(site.scripts.length, 0);
  site.flushFrame();
  assert.equal(site.scripts.length, 0);
  site.flushFrame();

  assert.deepEqual(site.scripts.map((script) => script.src), [adsenseUrl]);
  assert.equal(site.scripts[0].async, true);
  assert.equal(site.scripts[0].crossOrigin, "anonymous");
  assert.equal(site.scripts[0].type, "", "AdSense should use the default classic script type");

  site.dispatchDocument("visibilitychange");
  site.windowListeners.get("load").listener();
  assert.equal(site.scripts.length, 1);
});

test("an already-complete production document uses the same two-frame schedule", () => {
  const site = createSite({ readyState: "complete" });
  assert.equal(site.scripts.length, 0);
  site.flushFrame();
  assert.equal(site.scripts.length, 0);
  site.flushFrame();
  assert.equal(site.scripts.length, 1);
});

test("a hidden document resumes ad loading when visible, including when hidden between frames", () => {
  const initiallyHidden = createSite({ readyState: "complete", hidden: true });
  initiallyHidden.dispatchDocument("visibilitychange");
  assert.equal(initiallyHidden.frames.length, 0);
  initiallyHidden.document.hidden = false;
  initiallyHidden.dispatchDocument("visibilitychange");
  initiallyHidden.flushFrame();
  initiallyHidden.document.hidden = true;
  initiallyHidden.flushFrame();
  assert.equal(initiallyHidden.scripts.length, 0);
  initiallyHidden.document.hidden = false;
  initiallyHidden.dispatchDocument("visibilitychange");
  initiallyHidden.flushFrame();
  initiallyHidden.flushFrame();
  assert.equal(initiallyHidden.scripts.length, 1);

  const hiddenDuringFirstFrame = createSite({ readyState: "complete" });
  hiddenDuringFirstFrame.document.hidden = true;
  hiddenDuringFirstFrame.flushFrame();
  assert.equal(hiddenDuringFirstFrame.scripts.length, 0);
  hiddenDuringFirstFrame.document.hidden = false;
  hiddenDuringFirstFrame.dispatchDocument("visibilitychange");
  hiddenDuringFirstFrame.flushFrame();
  hiddenDuringFirstFrame.flushFrame();
  assert.equal(hiddenDuringFirstFrame.scripts.length, 1);

  const hiddenDuringSecondFrame = createSite({ readyState: "complete" });
  hiddenDuringSecondFrame.flushFrame();
  hiddenDuringSecondFrame.document.hidden = true;
  hiddenDuringSecondFrame.flushFrame();
  assert.equal(hiddenDuringSecondFrame.scripts.length, 0);
  hiddenDuringSecondFrame.document.hidden = false;
  hiddenDuringSecondFrame.dispatchDocument("visibilitychange");
  hiddenDuringSecondFrame.flushFrame();
  hiddenDuringSecondFrame.flushFrame();
  assert.equal(hiddenDuringSecondFrame.scripts.length, 1);

  const canceledInBackground = createSite({ readyState: "complete" });
  canceledInBackground.flushFrame();
  canceledInBackground.document.hidden = true;
  canceledInBackground.frames.length = 0;
  canceledInBackground.document.hidden = false;
  canceledInBackground.dispatchDocument("visibilitychange");
  canceledInBackground.flushFrame();
  canceledInBackground.flushFrame();
  assert.equal(canceledInBackground.scripts.length, 1);
});
