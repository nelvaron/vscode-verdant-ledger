# Claude guidance

## Project purpose

This repository contains the **Verdant Ledger Light** Visual Studio Code color
theme, its preview samples, and the extension packaging metadata. Keep changes
focused on the theme and its documentation.

## Design direction

- Preserve the calm, low-glare light appearance and the user's palette:
  - Deep evergreen: `#1b2320`
  - Secondary evergreen gray: `#5d6864`
  - Muted gray-green: `#66716d`
  - Forest green: `#2d6a3b`
  - Warm ochre: `#b8860b`
  - Accessible ochre for small text: `#8a6408`
  - Muted error red: `#a8322a`
  - Border gray-green: `#cfd6d2`
  - Pale surface: `#eef2ef`
  - Near-white surface: `#f6f8f6`
  - White: `#ffffff`
- Do not add unrelated accent colors or turn the theme into a high-contrast or
  dark theme without an explicit request.
- Prefer the darker `#8a6408` for small text. Reserve `#b8860b` for larger
  interface details where its contrast is appropriate.
- Keep syntax roles consistent across languages: comments muted, keywords
  ochre, strings and types green, ordinary identifiers deep evergreen, and
  errors red.

## Editing and validation

- Edit `themes/verdant-ledger-light-color-theme.json` for workbench colors,
  TextMate scopes, and semantic token colors.
- Keep theme and manifest JSON valid and free of duplicate keys.
- Reuse existing palette colors. Add a new color only when required for a
  distinct role and document why.
- Add or update a concise file under `examples/` when introducing or
  significantly changing language-specific highlighting.
- Do not add language extensions as runtime dependencies of this theme.
- Check `package.json` theme contributions and VSIX ignore rules if moving or
  renaming theme files.
- Validate JSON files, then run `vsce package` when the packaging tool is
  available. Do not publish the VSIX or push repository changes unless
  explicitly asked.
- Update `README.md` when installation, supported examples, palette, or
  development instructions change.
