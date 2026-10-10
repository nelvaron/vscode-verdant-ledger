// Fails the build when a page and its Markdown version drift apart: every
// heading and paragraph in the page's <main> must also appear in the .md file.
// Text inside figures (code samples, demos) is left out; the Markdown
// describes those in its own words.

import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const PAGES = [
  { html: "index.html", markdown: "index.md" },
  { html: "palette/index.html", markdown: "palette.md" },
];

const ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', "#39": "'", nbsp: " " };

function plain(html) {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&(#?\w+);/g, (match, name) =>
      ENTITIES[name] ?? (name.startsWith("#") ? String.fromCodePoint(Number(name.slice(1))) : match),
    )
    .replace(/\s+/g, " ")
    .trim();
}

function markdownText(markdown) {
  return markdown
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[`*]/g, "")
    .replace(/\s+/g, " ");
}

function blocks(html) {
  const main = /<main[^>]*>([\s\S]*)<\/main>/.exec(html)?.[1] ?? "";
  const withoutFigures = main.replace(/<figure[\s\S]*?<\/figure>/g, "");
  return [...withoutFigures.matchAll(/<(h[1-6]|p)\b[^>]*>([\s\S]*?)<\/\1>/g)].map((m) => plain(m[2])).filter(Boolean);
}

export default function markdownParity() {
  return {
    name: "markdown-parity",
    hooks: {
      "astro:build:done": async ({ dir, logger }) => {
        const root = fileURLToPath(dir);
        const missing = [];
        for (const page of PAGES) {
          const html = await readFile(root + page.html, "utf8");
          const markdown = markdownText(await readFile(root + page.markdown, "utf8"));
          for (const text of blocks(html)) {
            if (!markdown.includes(text)) missing.push(`${page.markdown} is missing: “${text}”`);
          }
        }
        if (missing.length) throw new Error(`Markdown versions are out of date:\n${missing.join("\n")}`);
        logger.info(`${PAGES.length} Markdown versions match their pages.`);
      },
    },
  };
}
