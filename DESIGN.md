# Verdant Ledger Light design

This document describes the decisions behind the theme, so changes keep its
character. [CONTRIBUTING.md](CONTRIBUTING.md) covers the practical workflow.

## Principles

- **Calm first.** The theme is light and low-glare, not high-contrast. Most
  code is deep evergreen and gray-green; color is reserved for meaning.
- **Every color has a role.** A color is added only for a distinct job that
  no existing color can do, and its role is written down here.
- **Same role, same color, in every language.** Comments are muted, keywords
  ochre, strings green, types slate blue, ordinary identifiers deep
  evergreen, and errors red, whether the file is TypeScript, Python, or
  LaTeX.
- **Accessible by measurement.** Contrast targets are checked by
  `npm test`, not judged by eye.
- **No borrowed defaults.** Every workbench color VS Code would otherwise
  fill with its default blue, purple, or orange is set from the palette.

## Palette

| Color | Name | Role |
| --- | --- | --- |
| `#1b2320` | Deep evergreen | Main text, variables, functions |
| `#5d6864` | Evergreen gray | Secondary text, parameters, keys, operators; text on `#eef2ef` |
| `#66716d` | Muted gray-green | Comments, punctuation, line numbers; text on the editor and white only |
| `#2d6a3b` | Forest green | Theme accent, strings, markup tags, success, additions |
| `#8a6408` | Accessible ochre | Keywords, numbers, attributes, warnings: any small text in ochre |
| `#b8860b` | Warm ochre | Larger indicators only: modified-file marks, warning badges, find outline |
| `#3d5f7a` | Slate blue | Types, classes, interfaces; information messages; terminal blue |
| `#2f6b6b` | Muted teal | Second bracket level; terminal cyan; graphs |
| `#7a4a6e` | Plum | Third bracket level; terminal magenta; graphs |
| `#8a2621` | Deep brick red | Errors, deletions, failures |
| `#cfd6d2` | Border gray-green | Borders and separators |
| `#eef2ef` | Pale surface | Sidebars, tabs, title and status bars |
| `#f6f8f6` | Near-white surface | Editor, panel, and terminal background |
| `#ffffff` | White | Floating widgets, menus, inputs, peek editors |

Two ochres exist on purpose. `#b8860b` has only 3.25:1 contrast on white, so
it never carries small text; `#8a6408` does that job at 5.37:1.

Slate blue, teal, and plum are muted so they sit with the greens and ochres.
Slate blue separates types from strings and information from success. Teal
and plum appear only where several things must be told apart at once:
nested brackets, the terminal, and graphs.

The red is deliberately darker than the ochre and green. Red, ochre, and
green look alike with red-green color blindness, and lightness is what still
separates them. After simulating deuteranopia, `#8a2621` differs from the
warning ochre by a CIEDE2000 distance of 11.9, where the earlier `#a8322a`
managed only 5.2.

## Derived tints

Some interface states need a value between two palette colors. Each tint has
a single job.

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
| `#f0f3f1` | Pale surface, lighter | Current line (comments stay at 4.53:1) |
| `#fcf3f2` | Brick red tint | Error validation and exception backgrounds |
| `#f8edc9` | Warm ochre tint | Warning validation background |
| `#ebeff1` | Slate blue tint | Info validation background |
| `#b8443a` `#3a7d4a` `#8f6809` `#4a6e8e` `#8d5a80` `#367878` | Red, green, ochre, slate, plum, teal | Bright terminal colors (at least 4.67:1) |

Layers that VS Code paints on top of each other (selection, find and word
highlights, diff, merge conflicts) use translucent palette colors such as
`#2d6a3b33` (forest green at 20%) or `#b8860b40` (warm ochre at 25%), so
overlapping highlights stay visible.

## Syntax roles

| Role | Treatment | Why |
| --- | --- | --- |
| Comments | Muted gray-green, italic | Recede without disappearing |
| Keywords, word operators | Accessible ochre | Show the shape of control flow |
| Symbolic operators | Evergreen gray | Frequent; ochre here was noisy |
| Strings | Forest green | Data, clearly apart from code |
| Types | Slate blue | Distinct from strings in `x: Type = "value"` |
| Function declarations | Deep evergreen, bold | Easy to scan for definitions without a new color |
| Calls, variables, properties | Deep evergreen | The quiet majority of code |
| Parameters | Evergreen gray, italic | Local inputs, one step quieter |
| `this`, `self`, `super`, `cls` | Ochre, italic | Language-provided names, like keywords |
| Punctuation | Muted gray-green | Structure without weight |
| Brackets | Ochre, teal, plum | Nesting visible at a glance |
| Errors, deletions | Deep brick red | Darker than warnings for color-blind users |

## Accessibility targets

These are enforced by `npm test`:

- Syntax colors: 4.5:1 on the editor background and the current line;
  3.5:1 under selection, find matches, and diff highlights, which are
  temporary.
- Interface text: 4.5:1 on its own background.
- Borders, icons, and indicators: 3:1.
- Colored ANSI terminal colors: 4.5:1. Bright white is the only exception.
- Layers VS Code requires to be translucent stay translucent.

## Changing the theme

1. Edit `themes/verdant-ledger-light-color-theme.json`.
2. Reuse palette colors and documented tints. If a new color is needed, add
   it to `scripts/palette.mjs` and to the tables in this document with its
   role.
3. Add or update a file in `examples/` when you change language-specific
   highlighting.
4. Run `npm test`, then preview the result in the Extension Development
   Host.
5. Don't make the theme dark or high-contrast; those would be separate
   themes.
