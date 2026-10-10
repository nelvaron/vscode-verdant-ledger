// Everything the site says about the theme comes from the repository, so the
// pages cannot drift from the release: the theme file, the manifest, the
// palette, the example files and the validator's own count of checks.

import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

import theme from "../../../themes/verdant-ledger-light-color-theme.json";
import manifest from "../../../package.json";
import { palette } from "../../../scripts/palette.mjs";
import { contrast } from "../../../scripts/color.mjs";

import showcaseTs from "../../../examples/showcase.ts?raw";
import previewPy from "../../../examples/preview.py?raw";
import previewCss from "../../../examples/preview.css?raw";
import previewMd from "../../../examples/preview.md?raw";

export { theme, manifest };

const editorBackground = theme.colors["editor.background"];

export const version = manifest.version;
export const extensionId = `${manifest.publisher}.${manifest.name}`;
export const repositoryUrl = manifest.repository.url.replace(/\.git$/, "");

export const links = {
  marketplace: `https://marketplace.visualstudio.com/items?itemName=${extensionId}`,
  openVsx: `https://open-vsx.org/extension/${manifest.publisher}/${manifest.name}`,
  releases: `${repositoryUrl}/releases/latest`,
  repository: repositoryUrl,
  issues: manifest.bugs.url,
  design: `${repositoryUrl}/blob/main/DESIGN.md`,
  contributing: `${repositoryUrl}/blob/main/CONTRIBUTING.md`,
  license: `${repositoryUrl}/blob/main/LICENSE`,
};

// What a color can safely carry on the editor background (WCAG 2.x).
function fitFor(ratio) {
  if (ratio >= 4.5) return { key: "text", label: "Text" };
  if (ratio >= 3) return { key: "large", label: "Large marks" };
  return { key: "surface", label: "Surface" };
}

export const paletteEntries = Object.entries(palette).map(([hex, { name, role }], index) => {
  const ratio = contrast(hex, editorBackground);
  return { number: index + 1, hex, name, role, ratio, ratioText: `${ratio.toFixed(2)}:1`, fit: fitFor(ratio) };
});

export const editorBackgroundHex = editorBackground;

// The validator prints "All N checks passed." Running it here also stops the
// build if the theme is invalid.
function countChecks() {
  const script = resolve(process.cwd(), "..", "scripts", "validate.mjs");
  if (!existsSync(script)) {
    throw new Error(`Run the site from the site/ folder; ${script} was not found.`);
  }
  const output = execFileSync(process.execPath, [script], { encoding: "utf8" });
  const match = /All (\d+) checks passed/.exec(output);
  if (!match) throw new Error(`Unexpected validator output: ${output}`);
  return Number(match[1]);
}

export const figures = {
  checks: countChecks(),
  workbenchColors: Object.keys(theme.colors).length,
  terminalColors: Object.keys(theme.colors).filter((key) => key.startsWith("terminal.ansi")).length,
};

// Bracket pair colors in the order the bracket transformer expects:
// the nesting levels, then the color for an unexpected bracket.
export const bracketColors = [
  theme.colors["editorBracketHighlight.foreground1"],
  theme.colors["editorBracketHighlight.foreground2"],
  theme.colors["editorBracketHighlight.foreground3"],
  theme.colors["editorBracketHighlight.unexpectedBracket.foreground"],
];

function excerpt(source, first, last) {
  return source.split("\n").slice(first - 1, last).join("\n");
}

const trim = (source) => source.replace(/\n+$/, "");

export const samples = [
  { id: "typescript", label: "TypeScript", lang: "ts", file: "showcase.ts", firstLine: 14, code: excerpt(showcaseTs, 14, 32) },
  { id: "python", label: "Python", lang: "python", file: "preview.py", firstLine: 1, code: trim(previewPy) },
  { id: "css", label: "CSS", lang: "css", file: "preview.css", firstLine: 1, code: trim(previewCss) },
  { id: "markdown", label: "Markdown", lang: "markdown", file: "preview.md", firstLine: 1, code: trim(previewMd) },
];

// Machado, Oliveira and Fernandes (2009), full severity, in linear RGB.
const DEUTERANOPIA = [
  [0.367322, 0.860646, -0.227968],
  [0.280085, 0.672501, 0.047413],
  [-0.01182, 0.04294, 0.968881],
];

function simulate(hex, matrix) {
  const toLinear = (v) => {
    const c = v / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  const toByte = (c) => {
    const clamped = Math.min(1, Math.max(0, c));
    const v = clamped <= 0.0031308 ? 12.92 * clamped : 1.055 * clamped ** (1 / 2.4) - 0.055;
    return Math.round(v * 255).toString(16).padStart(2, "0");
  };
  const rgb = [1, 3, 5].map((i) => toLinear(parseInt(hex.slice(i, i + 2), 16)));
  return `#${matrix.map((row) => toByte(row[0] * rgb[0] + row[1] * rgb[1] + row[2] * rgb[2])).join("")}`;
}

const error = theme.colors["editorError.foreground"];
const warning = theme.colors["editorWarning.foreground"];

export const diagnostics = {
  typical: { error, warning },
  deuteranopia: { error: simulate(error, DEUTERANOPIA), warning: simulate(warning, DEUTERANOPIA) },
};
