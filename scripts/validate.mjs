// Validate the Verdant Ledger Light theme: JSON structure, palette use,
// color keys known to VS Code, required translucency and WCAG contrast.
//
// Run with: npm test   (Node.js 18 or later, no dependencies)

import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { contrast, over } from "./color.mjs";
import { palette, tints } from "./palette.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
let checks = 0;

function check(ok, message) {
  checks += 1;
  if (!ok) errors.push(message);
  return ok;
}

// ---------------------------------------------------------------------------
// Strict JSON parsing: JSON.parse silently keeps the last of duplicate keys.

function parseStrictJson(text, file) {
  let i = 0;
  const lineAt = (pos) => text.slice(0, pos).split("\n").length;
  const fail = (message) => {
    throw new Error(`${file}:${lineAt(i)}: ${message}`);
  };
  const ws = () => {
    while (/\s/.test(text[i])) i += 1;
  };
  const string = () => {
    const start = i;
    i += 1;
    while (text[i] !== '"') {
      if (i >= text.length) fail("unterminated string");
      i += text[i] === "\\" ? 2 : 1;
    }
    i += 1;
    return JSON.parse(text.slice(start, i));
  };
  const value = () => {
    ws();
    const ch = text[i];
    if (ch === "{") {
      i += 1;
      const object = {};
      ws();
      if (text[i] === "}") {
        i += 1;
        return object;
      }
      for (;;) {
        ws();
        if (text[i] !== '"') fail("expected a property name");
        const keyPos = i;
        const key = string();
        if (Object.hasOwn(object, key)) {
          errors.push(`${file}:${lineAt(keyPos)}: duplicate key "${key}"`);
        }
        ws();
        if (text[i] !== ":") fail("expected ':'");
        i += 1;
        object[key] = value();
        ws();
        if (text[i] === ",") {
          i += 1;
          continue;
        }
        if (text[i] === "}") {
          i += 1;
          return object;
        }
        fail("expected ',' or '}'");
      }
    }
    if (ch === "[") {
      i += 1;
      const array = [];
      ws();
      if (text[i] === "]") {
        i += 1;
        return array;
      }
      for (;;) {
        array.push(value());
        ws();
        if (text[i] === ",") {
          i += 1;
          continue;
        }
        if (text[i] === "]") {
          i += 1;
          return array;
        }
        fail("expected ',' or ']'");
      }
    }
    if (ch === '"') return string();
    const literal = /^(?:true|false|null|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)/.exec(text.slice(i));
    if (!literal) fail("unexpected character");
    i += literal[0].length;
    return JSON.parse(literal[0]);
  };
  const result = value();
  ws();
  if (i !== text.length) fail("unexpected content after the JSON value");
  return result;
}

function readJson(relativePath) {
  try {
    return parseStrictJson(readFileSync(join(root, relativePath), "utf8"), relativePath);
  } catch (error) {
    console.error(`✗ ${error.message}`);
    process.exit(1);
  }
}

const HEX = /^#[0-9a-f]{6}(?:[0-9a-f]{2})?$/;

// ---------------------------------------------------------------------------
// Manifest

const manifest = readJson("package.json");
const themes = manifest.contributes?.themes ?? [];
check(themes.length > 0, "package.json: contributes.themes is empty");

for (const entry of themes) {
  const themePath = join(root, entry.path);
  if (!check(existsSync(themePath), `package.json: theme file ${entry.path} does not exist`)) continue;
  validateTheme(entry);
}

// ---------------------------------------------------------------------------

function validateTheme(entry) {
  const file = entry.path.replace(/^\.\//, "");
  const theme = readJson(file);
  const colors = theme.colors ?? {};
  const where = (detail) => `${file}: ${detail}`;

  // Structure
  check(theme.name === entry.label, where(`name "${theme.name}" differs from the label "${entry.label}" in package.json`));
  check(theme.type === "light" && entry.uiTheme === "vs", where('a light theme needs "type": "light" and uiTheme "vs"'));
  check(theme.semanticHighlighting === true, where('"semanticHighlighting": true is required for semanticTokenColors to apply'));

  // Every color value: format and palette membership
  const allowedOpaque = new Set([...Object.keys(palette), ...Object.keys(tints)]);
  const seenTints = new Set();
  const validateColor = (value, label) => {
    if (!check(typeof value === "string" && HEX.test(value), where(`${label}: "${value}" is not a lowercase #rrggbb or #rrggbbaa color`))) return;
    const base = value.slice(0, 7);
    if (value.length === 9) {
      check(base in palette, where(`${label}: translucent ${value} must be based on a palette color`));
    } else {
      check(allowedOpaque.has(base), where(`${label}: ${value} is not in scripts/palette.mjs`));
    }
    if (base in tints) seenTints.add(base);
  };

  const known = new Set(readJson("scripts/vscode-color-ids.json").ids);
  for (const [key, value] of Object.entries(colors)) {
    validateColor(value, key);
    check(known.has(key), where(`"${key}" is not a color VS Code knows (see scripts/update-color-ids.mjs)`));
  }

  const fontStyles = /^(?:(?:italic|bold|underline|strikethrough)(?: |$))*$/;
  theme.tokenColors.forEach((rule, index) => {
    const scopes = Array.isArray(rule.scope) ? rule.scope : [rule.scope];
    const label = `tokenColors[${index}] (${scopes[0]})`;
    check(scopes.length > 0 && scopes.every((s) => typeof s === "string" && s.trim()), where(`${label}: scope is empty`));
    check(!("background" in rule.settings), where(`${label}: VS Code ignores token backgrounds`));
    if (rule.settings.foreground) validateColor(rule.settings.foreground, label);
    if ("fontStyle" in rule.settings) {
      check(fontStyles.test(rule.settings.fontStyle), where(`${label}: invalid fontStyle "${rule.settings.fontStyle}"`));
    }
  });

  const semantic = Object.entries(theme.semanticTokenColors ?? {}).map(([selector, style]) => [
    selector,
    typeof style === "string" ? style : style.foreground,
  ]);
  for (const [selector, foreground] of semantic) {
    if (foreground) validateColor(foreground, `semanticTokenColors["${selector}"]`);
  }

  for (const tint of Object.keys(tints)) {
    check(seenTints.has(tint), where(`derived tint ${tint} is listed in scripts/palette.mjs but never used`));
  }

  // Layers VS Code paints over text and decorations must stay translucent.
  // Source: color descriptions in VS Code 1.140 that say "must not be opaque".
  const mustBeTranslucent = [
    "editor.selectionHighlightBackground", "editor.inactiveSelectionBackground",
    "editor.wordHighlightBackground", "editor.wordHighlightStrongBackground",
    "editor.wordHighlightTextBackground", "editor.findMatchHighlightBackground",
    "editor.findRangeHighlightBackground", "editor.hoverHighlightBackground",
    "editor.rangeHighlightBackground", "editor.symbolHighlightBackground",
    "editor.foldBackground", "diffEditor.insertedTextBackground",
    "diffEditor.removedTextBackground", "diffEditor.insertedLineBackground",
    "diffEditor.removedLineBackground", "merge.currentHeaderBackground",
    "merge.currentContentBackground", "merge.incomingHeaderBackground",
    "merge.incomingContentBackground", "merge.commonHeaderBackground",
    "merge.commonContentBackground", "editorOverviewRuler.findMatchForeground",
    "editorOverviewRuler.selectionHighlightForeground", "terminal.findMatchBackground",
    "terminal.findMatchHighlightBackground", "editorError.background",
    "editorWarning.background", "editorInfo.background",
  ];
  for (const key of mustBeTranslucent) {
    if (key in colors) check(colors[key].length === 9 && !colors[key].endsWith("ff"), where(`${key} must be translucent (#rrggbbaa)`));
  }

  // -------------------------------------------------------------------------
  // Contrast

  const color = (key) => {
    if (key.startsWith("#")) return key;
    if (!(key in colors)) {
      check(false, where(`contrast check refers to "${key}", which the theme does not set`));
      return undefined;
    }
    return colors[key];
  };
  const editor = color("editor.background");
  const surface = (key) => {
    const value = color(key);
    return value && value.length === 9 ? over(value, editor) : value;
  };
  const ratio = (fgKey, bgKey, minimum, note = "") => {
    const bg = surface(bgKey);
    const fgRaw = color(fgKey);
    if (!bg || !fgRaw) return;
    const fg = fgRaw.length === 9 ? over(fgRaw, bg) : fgRaw;
    const value = contrast(fg, bg);
    check(value >= minimum, where(`${fgKey} on ${bgKey}${note}: ${value.toFixed(2)}:1, needs ${minimum}:1`));
  };

  const currentLine = over(color("editor.lineHighlightBackground"), editor);
  const syntax = [
    ...theme.tokenColors.filter((r) => r.settings.foreground).map((r) => [r.settings.foreground, `token ${[r.scope].flat()[0]}`]),
    ...semantic.filter(([, fg]) => fg).map(([selector, fg]) => [fg, `semantic ${selector}`]),
  ];
  // Text on the editor and on the current line: WCAG AA.
  for (const [fg, label] of syntax) {
    for (const [bg, name] of [[editor, "editor background"], [currentLine, "current line"]]) {
      const value = contrast(fg, bg);
      check(value >= 4.5, where(`${label} (${fg}) on ${name}: ${value.toFixed(2)}:1, needs 4.5:1`));
    }
  }
  // Highlights that come and go: every syntax color keeps 3.5:1 while shown.
  const overlays = [
    ["editor.selectionBackground"],
    ["editor.findMatchBackground"],
    ["editor.findMatchHighlightBackground"],
    ["editor.selectionHighlightBackground"],
    ["editor.wordHighlightStrongBackground"],
    ["diffEditor.insertedLineBackground", "diffEditor.insertedTextBackground"],
    ["diffEditor.removedLineBackground", "diffEditor.removedTextBackground"],
  ];
  for (const layers of overlays) {
    const bg = layers.reduce((under, key) => over(color(key), under), editor);
    for (const [fg, label] of syntax) {
      const value = contrast(fg, bg);
      check(value >= 3.5, where(`${label} (${fg}) on ${layers.at(-1)}: ${value.toFixed(2)}:1, needs 3.5:1`));
    }
  }

  // Workbench text: WCAG AA (4.5:1).
  const text = [
    ["editor.foreground", "editor.background"],
    ["editorLineNumber.foreground", "editor.background"],
    ["editorLineNumber.activeForeground", "editor.lineHighlightBackground"],
    ["editorCodeLens.foreground", "editor.background"],
    ["breadcrumb.foreground", "editor.background"],
    ["editorInlayHint.foreground", "editorInlayHint.background"],
    ["editorBracketHighlight.foreground1", "editor.background"],
    ["editorBracketHighlight.foreground2", "editor.background"],
    ["editorBracketHighlight.foreground3", "editor.background"],
    ["editorBracketHighlight.unexpectedBracket.foreground", "editor.background"],
    ["textLink.foreground", "editor.background"],
    ["textLink.foreground", "editorHoverWidget.background"],
    ["textPreformat.foreground", "textPreformat.background"],
    ["sideBar.foreground", "sideBar.background"],
    ["sideBarTitle.foreground", "sideBar.background"],
    ["sideBarSectionHeader.foreground", "sideBarSectionHeader.background"],
    ["descriptionForeground", "sideBar.background"],
    ["descriptionForeground", "editor.background"],
    ["list.highlightForeground", "sideBar.background"],
    ["list.highlightForeground", "list.hoverBackground"],
    ["list.highlightForeground", "list.inactiveSelectionBackground"],
    ["list.activeSelectionForeground", "list.activeSelectionBackground"],
    ["list.focusHighlightForeground", "list.activeSelectionBackground"],
    ["list.errorForeground", "sideBar.background"],
    ["list.warningForeground", "sideBar.background"],
    ["gitDecoration.addedResourceForeground", "sideBar.background"],
    ["gitDecoration.modifiedResourceForeground", "sideBar.background"],
    ["gitDecoration.deletedResourceForeground", "sideBar.background"],
    ["gitDecoration.untrackedResourceForeground", "sideBar.background"],
    ["gitDecoration.ignoredResourceForeground", "sideBar.background"],
    ["gitDecoration.conflictingResourceForeground", "sideBar.background"],
    ["gitDecoration.submoduleResourceForeground", "sideBar.background"],
    ["tab.activeForeground", "tab.activeBackground"],
    ["tab.inactiveForeground", "tab.inactiveBackground"],
    ["tab.unfocusedActiveForeground", "tab.activeBackground"],
    ["tab.unfocusedInactiveForeground", "tab.inactiveBackground"],
    ["titleBar.activeForeground", "titleBar.activeBackground"],
    ["titleBar.inactiveForeground", "titleBar.inactiveBackground"],
    ["statusBar.foreground", "statusBar.background"],
    ["statusBar.debuggingForeground", "statusBar.debuggingBackground"],
    ["statusBarItem.prominentForeground", "statusBarItem.prominentBackground"],
    ["statusBarItem.remoteForeground", "statusBarItem.remoteBackground"],
    ["statusBarItem.errorForeground", "statusBarItem.errorBackground"],
    ["statusBarItem.warningForeground", "statusBarItem.warningBackground"],
    ["activityBarBadge.foreground", "activityBarBadge.background"],
    ["activityErrorBadge.foreground", "activityErrorBadge.background"],
    ["activityWarningBadge.foreground", "activityWarningBadge.background"],
    ["badge.foreground", "badge.background"],
    ["panelTitle.activeForeground", "panel.background"],
    ["panelTitle.inactiveForeground", "panel.background"],
    ["button.foreground", "button.background"],
    ["button.foreground", "button.hoverBackground"],
    ["button.secondaryForeground", "button.secondaryBackground"],
    ["input.foreground", "input.background"],
    ["input.placeholderForeground", "input.background"],
    ["dropdown.foreground", "dropdown.background"],
    ["editorWidget.foreground", "editorWidget.background"],
    ["editorSuggestWidget.foreground", "editorSuggestWidget.selectedBackground"],
    ["editorSuggestWidget.highlightForeground", "editorSuggestWidget.selectedBackground"],
    ["editorHoverWidget.foreground", "editorHoverWidget.background"],
    ["menu.foreground", "menu.background"],
    ["menu.selectionForeground", "menu.selectionBackground"],
    ["quickInputList.focusForeground", "quickInputList.focusBackground"],
    ["pickerGroup.foreground", "quickInput.background"],
    ["notifications.foreground", "notifications.background"],
    ["notificationLink.foreground", "notifications.background"],
    ["keybindingLabel.foreground", "keybindingLabel.background"],
    ["peekViewTitleLabel.foreground", "peekViewTitle.background"],
    ["peekViewTitleDescription.foreground", "peekViewTitle.background"],
    ["debugConsole.infoForeground", "panel.background"],
    ["debugConsole.warningForeground", "panel.background"],
    ["debugConsole.errorForeground", "panel.background"],
    ["terminal.foreground", "terminal.background"],
  ];
  const ansiNames = ["Black", "Red", "Green", "Yellow", "Blue", "Magenta", "Cyan", "White"];
  for (const ansi of ansiNames) {
    text.push([`terminal.ansi${ansi}`, "terminal.background"]);
    // Bright white is the one intentionally pale ANSI color.
    if (ansi !== "White") text.push([`terminal.ansiBright${ansi}`, "terminal.background"]);
  }
  for (const [fg, bg] of text) ratio(fg, bg, 4.5);

  // Terminal colors: normal and bright share the 4.5:1 band on a light
  // background, so they are told apart by lightness. Colored normal colors
  // reach 7:1, and each bright color is at least 1.5 times lighter.
  const terminal = surface("terminal.background");
  const onTerminal = (key) => contrast(color(key), terminal);
  for (const ansi of ansiNames.slice(1, 7)) ratio(`terminal.ansi${ansi}`, "terminal.background", 7);
  for (const ansi of ansiNames) {
    const normal = onTerminal(`terminal.ansi${ansi}`);
    const bright = onTerminal(`terminal.ansiBright${ansi}`);
    check(
      normal / bright >= 1.5,
      where(`terminal.ansiBright${ansi} must be clearly lighter than terminal.ansi${ansi}: ${(normal / bright).toFixed(2)}x, needs 1.5x`),
    );
  }
  // Bright white is the lightest gray and stays legible.
  ratio("terminal.ansiBrightWhite", "terminal.background", 3);
  for (const gray of ["terminal.ansiWhite", "terminal.ansiBrightBlack"]) {
    check(onTerminal("terminal.ansiBrightWhite") < onTerminal(gray), where(`terminal.ansiBrightWhite must be lighter than ${gray}`));
  }
  // Red stays darker than the ochre, so the two remain apart with red-green
  // color blindness.
  check(
    onTerminal("terminal.ansiRed") / onTerminal("terminal.ansiYellow") >= 1.5,
    where("terminal.ansiRed must be at least 1.5 times darker than terminal.ansiYellow"),
  );

  // Ghost text is a dismissible preview; it stays visibly fainter than code.
  ratio("editorGhostText.foreground", "editor.background", 3);

  // Non-text: borders, icons and indicators need 3:1 (WCAG 1.4.11).
  const nonText = [
    ["input.border", "input.background"],
    ["dropdown.border", "dropdown.background"],
    ["checkbox.border", "checkbox.background"],
    ["focusBorder", "editor.background"],
    ["focusBorder", "sideBar.background"],
    ["list.focusOutline", "sideBar.background"],
    ["editorCursor.foreground", "editor.background"],
    ["editor.findMatchBorder", "editor.background"],
    ["editorError.foreground", "editor.background"],
    ["editorWarning.foreground", "editor.background"],
    ["editorInfo.foreground", "editor.background"],
    ["editorGutter.addedBackground", "editor.background"],
    ["editorGutter.modifiedBackground", "editor.background"],
    ["editorGutter.deletedBackground", "editor.background"],
    ["activityBar.foreground", "activityBar.background"],
    ["activityBar.inactiveForeground", "activityBar.background"],
    ["activityBar.activeBorder", "activityBar.background"],
    ["tab.activeBorderTop", "tab.activeBackground"],
    ["panelTitle.activeBorder", "panel.background"],
    ["icon.foreground", "sideBar.background"],
    ["progressBar.background", "sideBar.background"],
    ["testing.iconPassed", "sideBar.background"],
    ["testing.iconFailed", "sideBar.background"],
    ["notificationsErrorIcon.foreground", "notifications.background"],
    ["notificationsWarningIcon.foreground", "notifications.background"],
    ["notificationsInfoIcon.foreground", "notifications.background"],
  ];
  for (const [fg, bg] of nonText) ratio(fg, bg, 3);
}

// ---------------------------------------------------------------------------
// Documentation: every palette color and tint is described in DESIGN.md,
// and every palette color appears in the README's palette table.

const design = readFileSync(join(root, "DESIGN.md"), "utf8").toLowerCase();
const readme = readFileSync(join(root, "README.md"), "utf8").toLowerCase();
for (const hex of [...Object.keys(palette), ...Object.keys(tints)]) {
  check(design.includes(hex), `DESIGN.md: ${hex} from scripts/palette.mjs is not documented`);
}
for (const hex of Object.keys(palette)) {
  check(readme.includes(hex), `README.md: palette color ${hex} is missing from the palette table`);
}

// ---------------------------------------------------------------------------

if (errors.length) {
  console.error(`${errors.length} of ${checks} checks failed:\n`);
  for (const message of errors) console.error(`  ✗ ${message}`);
  process.exit(1);
}
console.log(`All ${checks} checks passed.`);
