import { driveImage } from "@/lib/cms";

function escapeAttr(str: string): string {
  return str.replace(/"/g, "&quot;");
}

function extractContents(rawHtml: string): string {
  const startMarker = /<div id="contents"[^>]*>/i;
  const startMatch = rawHtml.match(startMarker);
  if (!startMatch || startMatch.index === undefined) return "";

  const contentStart = startMatch.index + startMatch[0].length;
  let depth = 1;

  const tagRegex = /<\/?div\b[^>]*>/gi;
  tagRegex.lastIndex = contentStart;

  let match: RegExpExecArray | null;
  while ((match = tagRegex.exec(rawHtml)) !== null) {
    if (match[0].startsWith("</")) {
      depth--;
      if (depth === 0) {
        return rawHtml.slice(contentStart, match.index);
      }
    } else {
      depth++;
    }
  }

  return rawHtml.slice(contentStart);
}

// Google Docs wraps every text run in <span>, <a>, <font>, etc. — even
// plain-text shortcode lines with no real formatting. Shortcode matching
// has to happen against clean text, not against tag soup, or it silently
// fails to match. This strips inline tags from inside each <p> while
// keeping the surrounding <p> wrapper, BEFORE any shortcode/heading regex
// runs against it.
function normalizeParagraphs(html: string): string {
  return html.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, (_full, inner: string) => {
    const cleanText = inner
      .replace(/<\/?(span|font|a|b|i|u|strong|em)[^>]*>/gi, "")
      .replace(/<br\s*\/?>/gi, " ")
      .trim();
    return `<p>${cleanText}</p>`;
  });
}

function convertHeadings(html: string): string {
  let out = html;
  out = out.replace(/<p>\s*H2:\s*([^<]+?)\s*<\/p>/g, (_, text) => `<h2>${text.trim()}</h2>`);
  out = out.replace(/<p>\s*H3:\s*([^<]+?)\s*<\/p>/g, (_, text) => `<h3>${text.trim()}</h3>`);
  return out;
}

export async function fetchDoc(docId: string): Promise<string> {
  if (!docId) return "";

  const url = docId.startsWith("2PACX")
    ? `https://docs.google.com/document/d/e/${docId}/pub`
    : `https://docs.google.com/document/d/${docId}/pub`;

  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const raw = await res.text();

    let html = extractContents(raw);

    html = html.replace(/<script[\s\S]*?<\/script>/gi, "");
    html = html.replace(/<style[\s\S]*?<\/style>/gi, "");
    html = html.replace(/<!--[\s\S]*?-->/g, "");

    html = normalizeParagraphs(html);
    html = convertHeadings(html);

    // Strip the first H1 — title comes from Sheets, not the doc.
    // Must run AFTER normalization since the raw doc has <p> not <h1>
    // for the title line in some Docs exports; handle both forms.
    html = html.replace(/<h1[^>]*>[\s\S]*?<\/h1>/i, "");
    html = html.replace(/^\s*<p>\s*H1:\s*[^<]*<\/p>/i, "");

    return parseShortcodes(html);
  } catch (err) {
    console.error(`Docs: failed to fetch "${docId}":`, err);
    return "";
  }
}

export function parseShortcodes(html: string): string {
  let out = html;

  out = out.replace(
    /<p>\[EMBED:tableau:([^\]]+)\]<\/p>/g,
    (_, url) =>
      `<div class="embed-tableau"><iframe src="${escapeAttr(url)}?:embed=yes&:display_count=no&:toolbar=no" width="100%" height="500" frameborder="0" loading="lazy"></iframe></div>`
  );

  out = out.replace(
    /<p>\[EMBED:mindmap:([^\]]+)\]<\/p>/g,
    (_, url) =>
      `<div class="embed-mindmap"><iframe src="${escapeAttr(url)}" width="100%" height="480" frameborder="0" loading="lazy"></iframe></div>`
  );

  out = out.replace(
    /<p>\[EMBED:image:([^|\]]+)\|([^\]]+)\]<\/p>/g,
    (_, driveId, caption) =>
      `<figure class="embed-image"><img src="${driveImage(driveId.trim(), 1200)}" alt="${escapeAttr(caption.trim())}" loading="lazy" /><figcaption>${caption.trim()}</figcaption></figure>`
  );

  out = out.replace(
    /<p>\[EMBED:image:([^|\]]+)\]<\/p>/g,
    (_, driveId) =>
      `<figure class="embed-image"><img src="${driveImage(driveId.trim(), 1200)}" alt="" loading="lazy" /></figure>`
  );

  out = out.replace(
    /<p>\[EMBED:iframe:([^|\]]+)\|([^\]]+)\]<\/p>/g,
    (_, url, height) =>
      `<div class="embed-iframe"><iframe src="${escapeAttr(url)}" width="100%" height="${height.trim()}" frameborder="0" loading="lazy"></iframe></div>`
  );

  out = out.replace(
    /<p>\[EMBED:youtube:([^\]]+)\]<\/p>/g,
    (_, videoId) =>
      `<div class="embed-youtube"><iframe src="https://www.youtube.com/embed/${escapeAttr(videoId.trim())}" width="100%" height="420" frameborder="0" allowfullscreen loading="lazy"></iframe></div>`
  );

  out = out.replace(
    /<p>\[CALLOUT:([^\]]+)\]<\/p>/g,
    (_, text) => `<div class="block-callout">${text.trim()}</div>`
  );

  out = out.replace(
    /<p>\[METRIC:([^|\]]+)\|([^\]]+)\]<\/p>/g,
    (_, value, label) =>
      `<div class="block-metric"><span class="metric-value">${value.trim()}</span><span class="metric-label">${label.trim()}</span></div>`
  );

  out = out.replace(
    /<p>\[COL2:([^|\]]+)\|([^\]]+)\]<\/p>/g,
    (_, left, right) =>
      `<div class="block-col2"><div class="col2-left">${left.trim()}</div><div class="col2-right">${right.trim()}</div></div>`
  );

  out = out.replace(
    /<p>\[TAGS:([^\]]+)\]<\/p>/g,
    (_, tagList) => {
      const tags = tagList.split(",").map((t: string) => t.trim()).filter(Boolean);
      const pills = tags.map((t: string) => `<span class="tag-pill">${t}</span>`).join("");
      return `<div class="block-tags">${pills}</div>`;
    }
  );

  out = out.replace(/<p>\[DIVIDER\]<\/p>/g, `<hr class="block-divider" />`);

  out = out.replace(
    /<p>\[BUTTON:([^|\]]+)\|([^\]]+)\]<\/p>/g,
    (_, label, url) =>
      `<a class="block-button" href="${escapeAttr(url.trim())}" target="_blank" rel="noopener noreferrer">${label.trim()}</a>`
  );

  out = out.replace(
    /<p>\[GITHUB:([^|\]]+)\|([^\]]+)\]<\/p>/g,
    (_, label, url) =>
      `<a class="block-github" href="${escapeAttr(url.trim())}" target="_blank" rel="noopener noreferrer">${label.trim()}</a>`
  );

  out = out.replace(
    /<p>\[QUOTE:([^\]]+)\]<\/p>/g,
    (_, text) => `<blockquote class="block-quote">${text.trim()}</blockquote>`
  );

  return out;
}