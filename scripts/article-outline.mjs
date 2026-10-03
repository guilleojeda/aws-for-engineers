// Only change heading tags; reserializing imported article HTML can alter code examples.
export function articleOutline(html) {
  const rawText = /<(script|style|textarea)\b[^>]*>[\s\S]*?<\/\1\s*>|<!--[\s\S]*?-->/gi;
  const usedIds = new Set([...html.replace(rawText, "").matchAll(/\bid\s*=\s*(["'])(.*?)\1/g)].map((match) => match[2]));
  const sections = [];
  // Raw-text elements can contain HTML examples or JSON strings, not visible headings.
  const headingOrRawText = /<(script|style|textarea)\b[^>]*>[\s\S]*?<\/\1\s*>|<!--[\s\S]*?-->|<h2\b([^>]*)>([\s\S]*?)<\/h2>/gi;
  const content = html.replace(headingOrRawText, (heading, rawTag, attributes, inner) => {
    if (attributes === undefined) return heading;
    const label = inner.replace(/<[^>]+>/g, "").trim();
    let id = attributes.match(/\bid\s*=\s*(["'])(.*?)\1/i)?.[2];
    if (!id) {
      const stem = `section-${label.normalize("NFKD").replace(/&[^;]+;/g, "-").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "heading"}`;
      id = stem;
      for (let suffix = 2; usedIds.has(id); suffix++) id = `${stem}-${suffix}`;
      usedIds.add(id);
      heading = `<h2${attributes} id="${id}">${inner}</h2>`;
    }
    sections.push({ id, label });
    return heading;
  });
  return { content, sections };
}
