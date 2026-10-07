// Refresh scripts/vscode-color-ids.json from VS Code's own color registry.
//
// 1. In VS Code, run "Developer: Generate Color Theme From Current Settings".
// 2. Save the generated document, for example as generated-theme.jsonc.
// 3. Run: node scripts/update-color-ids.mjs generated-theme.jsonc <vscode-version>

import { readFileSync, writeFileSync } from "node:fs";

const [source, version] = process.argv.slice(2);
if (!source || !version) {
  console.error("Usage: node scripts/update-color-ids.mjs <generated-theme.jsonc> <vscode-version>");
  process.exit(2);
}

const text = readFileSync(source, "utf8");
const start = text.indexOf('"colors"');
const end = text.indexOf('"tokenColors"');
if (start < 0 || end < 0) {
  console.error(`${source} does not look like a generated color theme.`);
  process.exit(1);
}

// Defaults appear commented out (// "id": ...), so match both forms.
const ids = [...text.slice(start, end).matchAll(/^\s*(?:\/\/\s*)?"([A-Za-z][\w.-]*)"\s*:/gm)]
  .map((match) => match[1]);
const unique = [...new Set(ids)].sort();

const target = new URL("./vscode-color-ids.json", import.meta.url);
writeFileSync(target, JSON.stringify({ vscodeVersion: version, ids: unique }, null, 2) + "\n");
console.log(`Wrote ${unique.length} color IDs for VS Code ${version}.`);
