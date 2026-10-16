# Accessibility

Verdant Ledger Light is a light color theme for Visual Studio Code, built so
that code stays readable for long sessions and for people with low vision or
color blindness. This page covers the theme and its website,
[nelvaron.github.io/vscode-verdant-ledger](https://nelvaron.github.io/vscode-verdant-ledger/):
what we aim for, what we test, the barriers we know about, and how to report
a new one.

## Priorities

- **Contrast you can read.** Syntax colors and interface text meet WCAG 2.2
  AA contrast (4.5:1). Borders of inputs and checkboxes, icons, and other
  marks people rely on meet 3:1.
- **Not color alone.** Errors, warnings, and additions differ in lightness as
  well as hue, so they stay apart with deuteranopia and protanopia. The error
  red is darker than the warning ochre for this reason.
- **Visible focus and state.** Keyboard focus has an outline, the current
  find match has an outline as well as a fill, and selected, hovered, and
  focused list items look different from one another.
- **Measured, not judged by eye.** Every contrast target above is checked by
  `npm test` on every pull request.

## Supported environments

| Environment | Status |
| --- | --- |
| Visual Studio Code 1.80 and later | Supported; checked with VS Code 1.140 |
| VSCodium, Cursor, Windsurf, and other editors that install from Open VSX | Supported; the theme file is the same |
| Light theme | The only variant |
| Dark and high-contrast themes | Not provided (see Known barriers) |
| Website | Tested in Chromium; plain HTML and CSS for current browsers; works without JavaScript |

Screen readers are not affected by a color theme. The theme does not change
VS Code's keyboard behavior, focus order, or accessibility settings.

## What we test

- **Theme:** `npm test` (`scripts/validate.mjs`) checks contrast for every
  syntax color on the editor background and on the current line (4.5:1),
  under selection, find, and diff highlights (3.5:1), interface text (4.5:1),
  non-text marks (3:1), and the terminal colors. It also checks that the
  layers VS Code paints on top of each other stay translucent, so overlapping
  highlights remain visible. The **Validate** workflow runs it on every pull
  request.
- **Color blindness:** the error, warning, and success colors were compared
  after simulating deuteranopia and protanopia (Machado, Oliveira and
  Fernandes, 2009) with the CIEDE2000 color difference. The palette colors
  and terminal colors were also compared with each other after simulating
  deuteranopia; the colored pairs that come closest are listed under Known
  barriers.
- **Website:** checked with axe-core (WCAG 2.2 A and AA rules) with no
  violations, by keyboard alone, at 390 px width, and with
  `prefers-reduced-motion`. It has a skip link, one `main` landmark, a
  visible focus outline, real headings, and tabs that follow the ARIA tabs
  pattern. Each page is also published as Markdown (`index.md`,
  `palette.md`).

## Known barriers

- **No dark or high-contrast variant.** The theme is light only. If you need
  more contrast, VS Code's built-in **Light High Contrast** and **Dark High
  Contrast** themes are designed for that; a Verdant Ledger high-contrast
  theme is not planned yet.
- **Highlights lower contrast for a moment.** While a selection, find match,
  or diff highlight sits behind text, syntax colors are held to 3.5:1 instead
  of 4.5:1. The highlight goes away when you move on.
- **Italics.** Comments, parameters, and `this`/`self` are italic, which some
  people find harder to read. The README shows how to
  [turn off italics](README.md#turn-off-italics).
- **Bright white in the terminal** is intentionally paler (3.35:1). With VS
  Code's default `terminal.integrated.minimumContrastRatio` of 4.5, VS Code
  raises it to about 4.5:1 for you. See
  [Bright white in the terminal](README.md#bright-white-in-the-terminal).
- **Teal and plum look alike with deuteranopia.** After simulating it, the
  muted teal and plum used for the second and third bracket levels and for
  two Source Control graph lanes are only 2.5 CIEDE2000 units apart. The
  terminal's magenta and cyan are 2.7 apart (5.1 for the bright pair). The
  bracket match outline and the graph's lines still show what belongs
  together, but color alone does not separate these pairs.
- **Modified-file marks on inactive tabs.** The warm ochre border that marks
  unsaved changes reaches 3:1 on the active tab but only about 1.8:1 on
  inactive tabs, where it is dimmed on purpose. VS Code also shows a dot on
  the tab's close button, so the border is never the only cue.
- **Colors the theme does not control.** Extension webviews, output from
  programs in the terminal (unless VS Code's minimum contrast setting applies),
  and images inside notebooks and Markdown previews keep their own colors.
- **The website is light only.** It does not offer a dark mode, to match the
  product it shows.

## Reporting a barrier

If something is hard to read, hard to tell apart, or impossible to reach by
keyboard, please
[open an issue](https://github.com/nelvaron/vscode-verdant-ledger/issues/new)
and start the title with **Accessibility:**. These details help:

- What you were doing, and in which language or part of VS Code.
- Your editor and version, and any assistive technology or display settings
  (zoom, color filters, high-contrast mode).
- A screenshot, if you can share one. A description works just as well.

If you would rather not write in public, send a direct message to
[@nelvaron@mastodon.social](https://mastodon.social/@nelvaron).

We aim to reply within a week. A barrier that makes code unreadable is
treated as a bug and fixed in the next release.

## Contributing

Pull requests must keep `npm test` passing; the validator rejects a color
that misses its contrast target. When a change adds a color, give it one role
in [DESIGN.md](DESIGN.md) and check it against every background it appears
on. [CONTRIBUTING.md](CONTRIBUTING.md) explains how to preview and validate
changes.

## Ownership and maintenance

The theme and this page are maintained by
[@nelvaron](https://github.com/nelvaron). This page is reviewed with every
release, and whenever a known barrier is fixed or a new one is found.

Last reviewed: 16 October 2026, for version 1.1.0.
