function attribute(attributes, name) {
  return attributes.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1];
}

export function siteRenderingFailures(html, stylesheet, scriptVersion) {
  const failures = [];
  const heads = [...html.matchAll(/<head\b[^>]*>([\s\S]*?)<\/head\s*>/gi)];
  if (heads.length !== 1) failures.push("Generated HTML must contain exactly one head element");

  const stylesheetLinks = [...html.matchAll(/<link\b([^>]*)>/gi)].filter(([, attributes]) =>
    attribute(attributes, "rel")?.toLowerCase().split(/\s+/).includes("stylesheet"),
  );
  if (stylesheetLinks.length) failures.push("Generated HTML contains a stylesheet link");

  const embedded = [...html.matchAll(/<style\b([^>]*)>([\s\S]*?)<\/style\s*>/gi)]
    .filter(([, attributes]) => attribute(attributes, "data-site-stylesheet") !== undefined);
  if (embedded.length !== 1) {
    failures.push("Generated HTML must contain exactly one named inline stylesheet");
  } else if (heads.length === 1) {
    const headStart = heads[0].index + heads[0][0].indexOf(">") + 1;
    const headEnd = heads[0].index + heads[0][0].lastIndexOf("</head");
    const stylesheetStart = embedded[0].index;
    if (stylesheetStart < headStart || stylesheetStart + embedded[0][0].length > headEnd) {
      failures.push("Inline stylesheet is outside the head element");
    }
    if (embedded[0][2] !== stylesheet) failures.push("Inline stylesheet differs from src/assets/site.css");
  }

  const siteScripts = [...html.matchAll(/<script\b([^>]*)>/gi)].filter(([, attributes]) =>
    attribute(attributes, "src")?.startsWith("/assets/site.js"),
  );
  const expectedScript = `/assets/site.js?v=${scriptVersion}`;
  if (siteScripts.length !== 1 || attribute(siteScripts[0]?.[1] || "", "src") !== expectedScript ||
      !/\bdefer(?:\s|=|$)/i.test(siteScripts[0]?.[1] || "")) {
    failures.push("Generated HTML must load the current deferred site.js version");
  }
  return failures;
}
