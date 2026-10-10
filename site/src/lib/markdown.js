// Markdown versions of the pages, for AI agents and other tools that read
// source rather than HTML. They use the same data as the pages, and the build
// checks that every heading and paragraph of a page also appears here
// (see integrations/markdown-parity.mjs).

import { getImage } from "astro:assets";
import screenshot from "../../../images/screenshot-typescript.png";
import { url } from "./url.js";
import {
  manifest,
  version,
  extensionId,
  links,
  figures,
  paletteEntries,
  editorBackgroundHex,
  diagnostics,
  samples,
} from "./repo.js";

export const absolute = (path = "") => new URL(url(path), import.meta.env.SITE).href;
const raw = (file) => `${links.repository.replace("https://github.com/", "https://raw.githubusercontent.com/")}/main/${file}`;
const formatNumber = (n) => n.toLocaleString("en-US");

function frontmatter(fields) {
  const lines = Object.entries(fields).map(([key, value]) => `${key}: ${JSON.stringify(value)}`);
  return `---\n${lines.join("\n")}\n---`;
}

const join = (...blocks) => `${blocks.flat().filter(Boolean).join("\n\n")}\n`;

// Fenced code that stays valid even when the sample itself contains fences.
function fence(code, lang) {
  const longest = Math.max(2, ...[...code.matchAll(/`+/g)].map((m) => m[0].length));
  const ticks = "`".repeat(longest + 1);
  return `${ticks}${lang}\n${code}\n${ticks}`;
}

const cell = (text) => String(text).replace(/\|/g, "\\|");
const table = (head, rows) =>
  [head, head.map(() => "---"), ...rows].map((row) => `| ${row.map(cell).join(" | ")} |`).join("\n");

const footer = `Verdant Ledger Light ${version} · [MIT license](${links.license}) · © 2026 nelvaron · [Source](${links.repository}) · [Design notes](${raw("DESIGN.md")}) · [Report an issue](${links.issues})`;

export const pages = {
  home: {
    title: "Verdant Ledger Light — a calm light theme for VS Code",
    description:
      "A low-glare Visual Studio Code theme in deep evergreen, forest green and ochre, with every color checked for contrast.",
    path: "",
    markdownPath: "index.md",
  },
  palette: {
    title: "Palette ledger — Verdant Ledger Light",
    description:
      "The fourteen colors of Verdant Ledger Light, with their contrast on the editor background and the job each one does.",
    path: "palette/",
    markdownPath: "palette.md",
  },
};

function head(page) {
  return frontmatter({
    title: page.title,
    description: page.description,
    url: absolute(page.path),
    version,
    license: manifest.license,
  });
}

export async function homeMarkdown() {
  const page = pages.home;
  const image = await getImage({ src: screenshot, width: 1400 });
  const featured = ["#1b2320", "#2d6a3b", "#8a6408", "#3d5f7a", "#2f6b6b", "#7a4a6e", "#8a2621", "#eef2ef"];

  return join(
    head(page),
    "# Calm color for long days in code.",
    "Visual Studio Code theme · Light · Free",
    "Verdant Ledger Light is a low-glare theme in deep evergreen, forest green and ochre. Color is kept for meaning, and every pair is checked for contrast.",
    `- [Install from Marketplace](${links.marketplace})\n- [Open VSX](${links.openVsx})\n- [Download VSIX](${links.releases})`,
    `Version ${version} · MIT license · VS Code 1.80+, VSCodium, Cursor, Windsurf`,
    "Code samples, highlighted with the theme file at build time, so every sample matches the current release:",
    samples.flatMap((sample) => {
      const lineCount = sample.code.split("\n").length;
      const range = sample.firstLine > 1 ? `, lines ${sample.firstLine}–${sample.firstLine + lineCount - 1}` : "";
      return [`${sample.label}: \`examples/${sample.file}\`${range}`, fence(sample.code, sample.lang)];
    }),
    "## The theme in figures",
    [
      `- **4.5:1**: minimum contrast for every syntax color on the editor and the current line`,
      `- **${formatNumber(figures.workbenchColors)}**: workbench colors set, so no default blue shows through`,
      `- **${formatNumber(figures.checks)}**: automated checks on every change: contrast, palette, known keys`,
      `- **${figures.terminalColors}**: terminal colors, each one distinct and readable`,
    ].join("\n"),
    "## The whole workbench, in one quiet register.",
    `![VS Code with Verdant Ledger Light: the Explorer and a TypeScript command registry with slate blue types, green strings and ochre keywords](${new URL(image.src, import.meta.env.SITE).href})`,
    "## Features",
    "### Calm by design",
    "Most code stays deep evergreen. Ochre marks keywords, forest green marks strings, slate blue marks types. Nothing else competes.",
    "### Readable for everyone",
    "WCAG AA text, 3:1 borders and icons, and an error red that stays apart from warnings with red-green color blindness.",
    "### Complete",
    "Diff and merge views, debugging, testing, notebooks, the Source Control graph, chat and the terminal all share the palette.",
    "### Semantic, not just syntax",
    "Declarations are bold, deprecated symbols are struck through, and `this` and `self` stand out.",
    "## An error should never look like a warning.",
    "Accessibility, measured",
    "With deuteranopia, red and ochre drift toward the same olive. Verdant Ledger’s red is darker than its ochre, so the difference survives as lightness.",
    `The page shows two squiggly underlines. With typical vision the error is \`${diagnostics.typical.error}\` and the warning \`${diagnostics.typical.warning}\`. With simulated deuteranopia they become \`${diagnostics.deuteranopia.error}\` and \`${diagnostics.deuteranopia.warning}\`: close in hue, still apart in lightness.`,
    `[See the contrast of every color](${absolute(pages.palette.markdownPath)})`,
    "## Fourteen colors, each with a job.",
    featured
      .map((hex) => paletteEntries.find((entry) => entry.hex === hex))
      .map((entry) => `- ${entry.name}: \`${entry.hex}\``)
      .join("\n"),
    `[Open the palette ledger](${absolute(pages.palette.markdownPath)})`,
    "## Install in under a minute.",
    [
      "1. **Open Extensions.** Press Ctrl+Shift+X (Cmd+Shift+X on macOS).",
      `2. **Search and install.** Search for *Verdant Ledger Light*, or run \`ext install ${extensionId}\` in Quick Open.`,
      "3. **Choose the theme.** Run *Preferences: Color Theme* and pick Verdant Ledger Light.",
    ].join("\n"),
    `- [Visual Studio Marketplace](${links.marketplace})\n- [Open VSX](${links.openVsx})\n- [VSIX from GitHub](${links.releases})`,
    "---",
    footer,
  );
}

const roles = [
  { role: "Keywords", sample: "return  if  def", color: "#8a6408" },
  { role: "Strings", sample: '"terminal"', color: "#2d6a3b" },
  { role: "Types", sample: "Command  str  number", color: "#3d5f7a" },
  { role: "Declarations", sample: "register", color: "#1b2320", style: "bold" },
  { role: "Parameters", sample: "command  args", color: "#5d6864", style: "italic" },
  { role: "Comments", sample: "// recede, don't vanish", color: "#66716d", style: "italic" },
  { role: "Language variables", sample: "this  self", color: "#8a6408", style: "italic" },
  { role: "Errors", sample: "undefinedTotal", color: "#8a2621", style: "wavy underline" },
];
export { roles };

export function paletteMarkdown() {
  const page = pages.palette;
  return join(
    head(page),
    "# Every color is an account with a purpose.",
    "Palette ledger",
    `Contrast is measured against the editor background, \`${editorBackgroundHex}\`. Text needs 4.5:1; large marks and icons need 3:1.`,
    `The ${paletteEntries.length} palette colors, in order of use:`,
    table(
      ["No.", "Name", "Hex", "On editor", "Fit for", "Role"],
      paletteEntries.map((e) => [e.number, e.name, `\`${e.hex}\``, e.ratioText, e.fit.label, e.role]),
    ),
    `Derived tints cover selections, hovers and the bright terminal colors. Each is listed with its job in [DESIGN.md](${raw("DESIGN.md")}).`,
    "## Same role, same color, in every language.",
    table(
      ["Role", "Sample", "Color", "Style"],
      roles.map((r) => [r.role, `\`${r.sample}\``, `\`${r.color}\``, r.style ?? "regular"]),
    ),
    `Checked on every change by ${formatNumber(figures.checks)} automated tests.`,
    `[How the checks work](${raw("CONTRIBUTING.md")})`,
    "---",
    footer,
  );
}

// llms.txt (v2): a short, curated index, scoped to this site's path.
export function llmsTxt() {
  return join(
    "# Verdant Ledger Light",
    `> ${manifest.description} A free color theme for Visual Studio Code and editors that use Open VSX.`,
    [
      `- Extension ID: \`${extensionId}\``,
      `- Version: ${version}`,
      `- License: ${manifest.license}`,
      `- Install: run \`ext install ${extensionId}\` in Quick Open, or search for "Verdant Ledger Light" in the Extensions view.`,
      `- Works in VS Code ${manifest.engines.vscode.replace(/^\^/, "").replace(/\.0$/, "")} and later, VSCodium, Cursor, Windsurf and other Open VSX editors.`,
    ].join("\n"),
    "Each page of this site is also available as Markdown: add `.md` to the page path (`index.md` for the home page).",
    "## Pages",
    [
      `- [Home](${absolute(pages.home.markdownPath)}): what the theme looks like, its accessibility approach, and how to install it.`,
      `- [Palette ledger](${absolute(pages.palette.markdownPath)}): the ${paletteEntries.length} palette colors with contrast ratios and roles.`,
    ].join("\n"),
    "## Source",
    [
      `- [README](${raw("README.md")}): features, syntax colors, accessibility, and how to turn off italics.`,
      `- [DESIGN.md](${raw("DESIGN.md")}): the role of every palette color and derived tint.`,
      `- [Theme file](${raw("themes/verdant-ledger-light-color-theme.json")}): the complete color theme JSON.`,
      `- [CHANGELOG](${raw("CHANGELOG.md")}): release notes.`,
      `- [CONTRIBUTING.md](${raw("CONTRIBUTING.md")}): how to preview, validate, and package the theme.`,
    ].join("\n"),
    "## Optional",
    [
      `- [Visual Studio Marketplace](${links.marketplace})`,
      `- [Open VSX](${links.openVsx})`,
      `- [Issues](${links.issues})`,
    ].join("\n"),
  );
}
