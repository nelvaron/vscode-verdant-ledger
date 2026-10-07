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
| `#2d6a3b` | Forest green | Theme accent, strings, types, markup tags |
| `#b8860b` | Warm ochre | Interface warning accent and modified-file marker |
| `#8a6408` | Accessible ochre | Keywords, numbers, booleans, warning text |
| `#a8322a` | Muted red | Errors and deleted content |
| `#cfd6d2` | Soft gray-green | Borders and separators |
| `#eef2ef` | Pale green-gray | Sidebars, secondary surfaces, code blocks in hovers |
| `#f6f8f6` | Almost-white green | Subtle editor highlights and welcome surfaces |
| `#ffffff` | White | Main editor and widget backgrounds |

The brighter ochre `#b8860b` is kept mainly to larger UI indicators. The
darker `#8a6408` is used for small text such as keywords and warnings to keep
it readable on light backgrounds.

## Syntax color guide

| Syntax role | Color treatment |
| --- | --- |
| Comments | Muted gray-green, italic |
| Keywords and control flow | Accessible ochre |
| Symbolic operators (`=`, `=>`, `+`, `&&`) | Evergreen gray |
| Word operators (`new`, `typeof`, `and`, `in`) | Accessible ochre |
| Strings | Forest green |
| Functions and ordinary variables | Deep evergreen |
| Types, classes, and markup tags | Forest green |
| Parameters and JSON/YAML keys | Evergreen gray |
| Punctuation and structural separators | Muted gray-green |
| Bracket pairs (nesting levels 1–3) | Accessible ochre, forest green, evergreen gray |
| Markdown inline code | Accessible ochre |
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
- Node.js and npm only if you need to build a VSIX package.
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

The examples include HTML, XHTML, XML, JSON, JavaScript, TypeScript, CSS,
Markdown, Python, Nunjucks, TOML, YAML, LaTeX (`.cls`, `.tex`, and `.sty`),
dotfiles, and a Git diff.

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
- `.vscode/launch.json` — Extension Development Host launch configuration.
- `CLAUDE.md` — project-specific guidance for future Claude-assisted edits.
- `LICENSE` — MIT License.

## License

This project is released under the MIT License. See the `LICENSE` file.
