# Verdant Ledger Light

Verdant Ledger Light is a quiet, low-glare light color theme for Visual Studio
Code. Its soft green-tinted surfaces, deep evergreen text, and restrained
ochre accents are designed to keep code legible during long editing sessions
without relying on a large number of competing colors.

The theme includes workbench colors and syntax highlighting for common
programming, markup, configuration, documentation, LaTeX, and Git diff
workflows. Language grammars are supplied by VS Code or by the relevant
language extension; this project does not install language support.

## Color palette

| Color | Name / role | Typical use |
| --- | --- | --- |
| `#1b2320` | Deep evergreen | Main editor text, variables, functions |
| `#5d6864` | Evergreen gray | Secondary text, parameters, JSON/YAML keys |
| `#66716d` | Muted gray-green | Comments, hints, subdued interface labels |
| `#2d6a3b` | Forest green | Theme accent, strings, markup tags, success |
| `#b8860b` | Warm ochre | Interface warning accent and modified-file marker |
| `#8a6408` | Accessible ochre | Keywords, numbers, booleans, warning text |
| `#8a2621` | Deep brick red | Errors and deleted content |
| `#3d5f7a` | Slate blue | Types, classes, interfaces; information messages; terminal blue |
| `#2f6b6b` | Muted teal | Second bracket level; terminal cyan |
| `#7a4a6e` | Plum | Third bracket level; terminal magenta |
| `#cfd6d2` | Soft gray-green | Borders and separators |
| `#eef2ef` | Pale green-gray | Sidebars, secondary surfaces, code blocks in hovers |
| `#f6f8f6` | Almost-white green | Editor, panel, and terminal background |
| `#ffffff` | White | Floating widgets, menus, inputs, and peek editors |

The brighter ochre `#b8860b` is kept mainly to larger UI indicators. The
darker `#8a6408` is used for small text such as keywords and warnings to keep
it readable on light backgrounds.

Slate blue, teal, and plum are deliberately muted so they sit with the greens
and ochres. Slate blue gives types and information messages their own color,
apart from strings and success states. Teal and plum appear only where
several things must be told apart at once: nested brackets, the terminal,
and graphs.

### Derived tints

A few interface states need a value between two palette colors. Each one is
derived from the palette and has a single job:

| Color | Derived from | Role |
| --- | --- | --- |
| `#245630` | Forest green, darker | Button hover, active links, highlighted letters in a focused list item |
| `#7f8a86` | Muted gray-green, lighter | Input, dropdown, and checkbox borders (3.57:1); bracket match outline; ghost text; quote bar |
| `#8c9894` | Muted gray-green, lighter | Decorations only: active indent guide, disabled breakpoint |
| `#c7d7cb` | 20% forest green over `#eef2ef` | Selected item in lists and trees |
| `#d5e1d8` | 20% forest green over white | Selected item in menus, Quick Open, and suggestions |
| `#dce8df` | Forest green tint | Inactive list selection, badges, menu bar |
| `#dfe7e1` | Forest green tint | List hover |
| `#e4ebe6` | Forest green tint | Tab and button hover |
| `#e4e9e6` | Border gray-green, lighter | Indent guides and rulers |
| `#fcf3f2` | Muted red tint | Validation and exception widget backgrounds |
| `#f8edc9` | Warm ochre tint | Warning validation background |
| `#ebeff1` | Slate blue tint | Info validation background |
| `#f0f3f1` | Pale surface, lighter | Current line highlight (comments stay at 4.53:1) |
| `#b8443a` `#3a7d4a` `#8f6809` `#4a6e8e` `#8d5a80` `#367878` | Red, green, ochre, slate, plum, teal | Bright terminal colors (at least 4.67:1) |

Editor layers that VS Code paints on top of each other (selection, find and
word highlights, diff backgrounds, merge conflicts) use translucent forms of
the palette, such as `#2d6a3b33` (forest green at 20%) or `#b8860b26` (warm
ochre at 15%), so overlapping highlights stay visible.

## Accessibility

- Editor text, keywords, strings, types, comments, and errors meet WCAG AA
  (at least 4.5:1) on the editor background and on the current-line
  highlight.
- Secondary text on the pale `#eef2ef` surfaces uses `#5d6864` (5.12:1);
  the lighter `#66716d` is used for text only on the editor background
  (4.74:1) and white.
- All 15 colored ANSI terminal colors reach at least 4.5:1 on the terminal
  background; only "bright white" is intentionally pale.
- Input, dropdown, and checkbox borders meet the 3:1 non-text contrast
  requirement.
- Selected, hovered, and keyboard-focused list items are distinct; keyboard
  focus is also shown with a forest green outline.
- The current find match has an ochre outline in addition to its fill.
- The red for errors is deliberately darker than the ochre for warnings and
  the green for additions. With red-green color blindness these hues look
  alike, so the difference in lightness keeps an error squiggle
  distinguishable from a warning.
- Colors are never the only signal VS Code uses for diff, Git, test, and
  problem states, which also show `+`/`-` markers, letters, or icons.
- Highlights that come and go (selection, find matches, diff changes) keep
  every syntax color at 3.5:1 or more while they are shown.

Comments and parameters are italic. If your font has no true italic, or you
find italics harder to read, turn them off in your user settings:

```jsonc
"editor.tokenColorCustomizations": {
  "[Verdant Ledger Light]": {
    "textMateRules": [
      {
        "scope": ["comment", "punctuation.definition.comment", "variable.parameter"],
        "settings": { "fontStyle": "" }
      }
    ]
  }
},
"editor.semanticTokenColorCustomizations": {
  "[Verdant Ledger Light]": {
    "rules": { "parameter": { "italic": false } }
  }
}
```

## Syntax color guide

| Syntax role | Color treatment |
| --- | --- |
| Comments | Muted gray-green, italic |
| Keywords and control flow | Accessible ochre |
| Symbolic operators (`=`, `=>`, `+`, `&&`) | Evergreen gray |
| Word operators (`new`, `typeof`, `and`, `in`) | Accessible ochre |
| Strings | Forest green |
| Function and method declarations | Deep evergreen, bold |
| Function calls and ordinary variables | Deep evergreen |
| Types, classes, interfaces, built-in types | Slate blue |
| `this`, `self`, `super`, `cls` | Accessible ochre, italic |
| Decorators | Accessible ochre |
| Markup tags (HTML, XML), CSS selectors | Forest green |
| Attribute names (HTML, XML, JSX) | Accessible ochre |
| Parameters and JSON/YAML keys | Evergreen gray |
| Punctuation and structural separators | Muted gray-green |
| Bracket pairs (nesting levels 1–3) | Accessible ochre, muted teal, plum |
| Markdown inline code | Accessible ochre |
| Markdown quotes | Evergreen gray, italic |
| Deprecated symbols (semantic) | Strikethrough |
| Errors and deleted diff lines | Muted red |
| Inserted diff lines | Forest green |

Semantic highlighting is enabled, so language servers such as TypeScript and
Pylance can refine the TextMate colors with the same palette.

Language-specific rules refine the shared palette. JSON/YAML keys are distinct
from values, CSS selectors are green, TOML section names are green and bold,
Markdown headings are green and bold, and LaTeX commands use the keyword
accent.

## Requirements

- Visual Studio Code 1.80.0 or later.
- Node.js 18 or later and npm only if you need to validate the theme or build
  a VSIX package.
- Optional language extensions for YAML, Nunjucks, and LaTeX syntax
  highlighting. See [Language support](#language-support).

## Install for regular use

The steps below install the theme locally from this source folder. The VSIX
does not need to be published to the Visual Studio Marketplace.

1. Open PowerShell.
2. Install the VS Code extension packaging tool if it is not already installed:

   ```powershell
   npm install --global @vscode/vsce
   ```

3. Change to the project folder (adjust this path if you put the folder
   elsewhere):

   ```powershell
   cd C:\path\to\vscode-verdant-ledger
   ```

4. Build the installable package:

   ```powershell
   vsce package --allow-missing-repository
   ```

   This creates `verdant-ledger-light-0.0.1.vsix` in the project folder. The
   flag avoids a repository-metadata warning before you add a private remote.

5. In VS Code, open the Command Palette with **Ctrl+Shift+P** and run
   **Extensions: Install from VSIX...**.
6. Select `verdant-ledger-light-0.0.1.vsix`.
7. Open **Preferences: Color Theme** from the Command Palette and choose
   **Verdant Ledger Light**.

To upgrade after changing the theme, build a new VSIX and install it the same
way. Increase the `version` in `package.json` when preparing a new release.
To remove it, open the Extensions view, find **Verdant Ledger Light**, and
select **Uninstall**.

## Preview changes in the Extension Development Host

1. Open this project folder in VS Code.
2. Open **Run and Debug**, select **Run Theme in Extension Host**, and press
   **F5**.
3. In the new Extension Development Host window, choose **Preferences: Color
   Theme** and select **Verdant Ledger Light**.
4. Open files from `examples` to preview syntax colors. Use **View: Split
   Editor** to compare samples side by side.

The examples include HTML, XHTML, XML, JSON, JavaScript, JSX, TypeScript,
CSS, SQL, Markdown, Python, Nunjucks, TOML, YAML, LaTeX (`.cls`, `.tex`, and
`.sty`), dotfiles, and a Git diff. `diagnostics.ts` and `diagnostics.css`
contain intentional problems, so you can check how errors, warnings,
deprecated symbols, and unused variables look. To preview the terminal
colors, run `sh examples/terminal-colors.sh` in the integrated terminal.

## Validate changes

Run the validator before committing a change to the theme:

```bash
npm test
```

It needs no dependencies and checks that:

- the theme and manifest are valid JSON without duplicate keys;
- every color key is one VS Code knows, using the list in
  `scripts/vscode-color-ids.json`;
- every color comes from `scripts/palette.mjs`: a palette color, a
  translucent form of one, or a documented derived tint;
- layers VS Code draws over text (selection, find, word highlights, diff,
  merge) stay translucent;
- syntax colors reach 4.5:1 on the editor and the current line, and at least
  3.5:1 under selections, find matches, and diff highlights;
- interface text reaches 4.5:1, and borders, icons, and indicators 3:1;
- every palette color and tint is documented in this README.

GitHub Actions runs the same check and builds a VSIX for every pull request
and every push to `main`. The VSIX is attached to the workflow run as an
artifact.

To add a color, add it to `scripts/palette.mjs` and to the tables in this
README. When a new VS Code release adds color keys you want to use, run
**Developer: Generate Color Theme From Current Settings** in that release,
save the result, and refresh the list:

```bash
node scripts/update-color-ids.mjs generated-theme.jsonc 1.141.0
```

## Language support

The examples use standard file extensions where possible. Install the
following extensions if the language is not recognized or does not receive
syntax highlighting in your VS Code installation:

| Language / files | Optional VS Code extension |
| --- | --- |
| YAML (`.yaml`, `.yml`) | YAML by Red Hat |
| Nunjucks (`.njk`) | A Nunjucks language extension |
| LaTeX (`.tex`, `.cls`, `.sty`) | LaTeX Workshop |

Dotfiles may need a language mode selected from the language indicator in the
bottom-right of the status bar. The samples use EditorConfig, Git Config, and
Shell syntax. Git diff syntax coloring is shown in `examples/preview.diff`.

## Repository setup

This folder is prepared for a private Git repository named
`vscode-verdant-ledger`. To create one on GitHub, first create an **empty
private repository** with that name, then run these commands from the project
folder. Replace the remote URL with the URL of your private repository:

```bash
git init -b main
git add .
git commit -m "Initial Verdant Ledger Light theme"
git remote add origin <private-repository-url>
git push -u origin main
```

The `.gitignore` excludes generated VSIX files and common local artifacts. The
`.vscodeignore` keeps development examples and editor configuration out of the
installable extension package while retaining its README and license.

## Project files

- `themes/verdant-ledger-light-color-theme.json` — workbench and syntax colors.
- `examples/` — small files for visually reviewing supported syntax.
- `scripts/validate.mjs` — the validator run by `npm test`.
- `scripts/palette.mjs` — the palette and derived tints the validator allows.
- `scripts/vscode-color-ids.json` — color keys known to VS Code.
- `.github/workflows/validate.yml` — runs the validator and builds a VSIX.
- `.vscode/launch.json` — Extension Development Host launch configuration.
- `CLAUDE.md` — project-specific guidance for future Claude-assisted edits.
- `LICENSE` — MIT License.

## License

This project is released under the MIT License. See the `LICENSE` file.
