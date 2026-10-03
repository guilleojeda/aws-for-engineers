import assert from "node:assert/strict";
import { test } from "node:test";
import { articleOutline } from "./article-outline.mjs";

test("contents preserve existing anchors and create noncolliding anchors for Markdown headings", () => {
  const existing = '<h2 id="legacy%3A-section">Inline <code>code</code> &amp; examples</h2>';
  const html = '<div id="section-repeat"></div><h2>Repeat</h2><h2>Repeat</h2>' + existing;
  const outline = articleOutline(html);
  assert.deepEqual(outline.sections, [
    { id: "section-repeat-2", label: "Repeat" },
    { id: "section-repeat-3", label: "Repeat" },
    { id: "legacy%3A-section", label: "Inline code &amp; examples" },
  ]);
  assert.ok(outline.content.includes(existing));
});

test("HTML examples in scripts, styles, textareas and comments stay outside the outline", () => {
  const examples = [
    '<script type="application/ld+json">{"text":"</style><h2>Hidden example</h2>"}</script>',
    '<style>/* <h2>Style example</h2> */</style>',
    '<textarea><h2>Editable example</h2></textarea>',
    '<!-- <h2>Comment example</h2> -->',
    '<pre><code>&lt;h2&gt;Code example&lt;/h2&gt;</code></pre>',
  ].join("");
  const outline = articleOutline(examples + '<h2 id="visible">Visible section</h2>');
  assert.deepEqual(outline.sections, [{ id: "visible", label: "Visible section" }]);
  assert.equal(outline.content, examples + '<h2 id="visible">Visible section</h2>');
});
