# Changelog

All notable changes to Verdant Ledger Light are listed here. The project
follows [Semantic Versioning](https://semver.org/).

## 1.1.0 - 2026-10-11

- Terminal: each normal ANSI color is now clearly different from its bright
  version. Normal colors are darker versions of the syntax colors (at least
  7:1), bright colors are lighter (about 4.6:1), and bright white is the
  lightest gray (`#7f8a86`). Syntax and interface colors are unchanged.
- The terminal palette matches the
  [Apple Terminal profile](https://github.com/nelvaron/terminal-verdant-ledger).
- README: how to see bright white as designed, since VS Code raises terminal
  text to 4.5:1 by default.

## 1.0.0 - 2026-10-07

First public release.

- Calm light theme in deep evergreen, forest green, ochre, and soft
  gray-green neutrals, with slate blue for types and information.
- Syntax colors for TypeScript, JavaScript, JSX, Python, HTML, XML, CSS,
  JSON, YAML, TOML, SQL, Markdown, LaTeX, shell, and Git diffs, kept
  consistent across languages.
- Semantic highlighting: bold declarations, struck-through deprecated
  symbols, italic parameters and `this`/`self`.
- Complete workbench coverage, including diff and merge views, debugging,
  testing, notebooks, the Source Control graph, chat, and all 16 terminal
  colors.
- Bracket pair colors in ochre, teal, and plum.
- WCAG AA contrast for syntax and interface text, 3:1 for borders and icons,
  and an error red that stays distinct from warnings with red-green color
  blindness.
