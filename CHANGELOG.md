# Changelog

All notable changes to Verdant Ledger Light are listed here. The project
follows [Semantic Versioning](https://semver.org/).

## 1.2.0 - 2026-10-16

- Color vision: the second and third bracket levels and the teal and plum
  Source Control graph lanes now differ in lightness, so they stay apart with
  deuteranopia (10.3 CIEDE2000 units after simulation, was 2.5). Muted teal is
  now `#367878` and plum `#6a3b5f`; with normal vision the change is slight.
- The darker plum also separates the plum and slate blue graph lanes with
  protanopia (8.5, was 3.6).
- Terminal: normal magenta is darker (`#4d2e45`), so it stays apart from cyan
  with deuteranopia (7.9, was 2.7). Bright magenta and cyan are unchanged.
- `npm test` now checks these pairs, and the error and warning colors, after
  simulating deuteranopia and protanopia.
- New `ACCESSIBILITY.md` with what is tested, the known barriers, and how to
  report one.

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
