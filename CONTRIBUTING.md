# Contributing to Verdant Ledger Light

Thank you for helping. Bug reports, screenshots of colors that look wrong in
a language, and pull requests are all welcome. Read [DESIGN.md](DESIGN.md)
first: it explains the palette, the role of each color, and the contrast
targets every change must meet.

## Requirements

- Visual Studio Code 1.80 or later.
- Node.js 18 or later, for validation and packaging.

## Preview your changes

1. Open this folder in VS Code.
2. Open **Run and Debug**, select **Run Theme in Extension Host**, and press
   **F5**.
3. In the new window, run **Preferences: Color Theme** and choose **Verdant
   Ledger Light**. The theme reloads when you save the theme file.
4. Open files from `examples/` to check syntax colors. Use **View: Split
   Editor** to compare languages side by side.

`examples/diagnostics.ts` and `examples/diagnostics.css` contain intentional
problems, so you can check errors, warnings, deprecated symbols, and unused
variables. To check the terminal colors, run
`sh examples/terminal-colors.sh` in the integrated terminal.

## Validate

```bash
npm test
```

The validator has no dependencies. It checks that:

- the theme and manifest are valid JSON without duplicate keys;
- every color key is one VS Code knows (`scripts/vscode-color-ids.json`);
- every color comes from `scripts/palette.mjs`: a palette color, a
  translucent form of one, or a documented derived tint;
- layers VS Code draws over text stay translucent;
- syntax colors, interface text, borders, icons, and terminal colors meet
  the contrast targets in DESIGN.md;
- every palette color and tint is documented in DESIGN.md, and every palette
  color in the README.

GitHub Actions runs the same check and builds a VSIX for every pull request
and every push to `main`. The VSIX is attached to the workflow run.

When a new VS Code release adds color keys you want to use, run
**Developer: Generate Color Theme From Current Settings** in that release,
save the result, and refresh the list:

```bash
node scripts/update-color-ids.mjs generated-theme.jsonc 1.141.0
```

## Build and install a VSIX locally

```bash
npx @vscode/vsce package
```

This creates `verdant-ledger-light-<version>.vsix`. In VS Code, run
**Extensions: Install from VSIX...** and select it.

## Release

Maintainers release by pushing a version tag:

1. Update `version` in `package.json` and add a section for it at the top of
   `CHANGELOG.md`, for example `## 1.0.1 - 2026-11-02`.
2. Commit, then tag and push:

   ```bash
   git tag v1.0.1
   git push origin v1.0.1
   ```

The **Release** workflow validates the theme, checks that the tag matches
`package.json`, builds the VSIX, creates a GitHub release with the VSIX and
the changelog section, and publishes to Open VSX when the `OVSX_PAT` secret
is set.

### VS Code Marketplace

The Marketplace upload is manual. Azure DevOps retires the global personal
access tokens that `vsce publish` relies on on 1 December 2026, and the
replacement (Microsoft Entra ID with workload identity federation) needs an
Azure setup that a small theme does not warrant. Uploading the VSIX in the
browser needs no token:

1. Download the VSIX from the GitHub release.
2. Open the [publisher page](https://marketplace.visualstudio.com/manage/publishers/nelvaron).
3. For the first release, select **New extension** > **Visual Studio Code**
   and upload the VSIX. For later releases, open the extension's **...**
   menu, select **Update**, and upload the new VSIX.

The Marketplace verifies the upload, which usually takes a few minutes.

### One-time setup

Visual Studio Marketplace:

1. Sign in at the [Marketplace management page](https://marketplace.visualstudio.com/manage)
   with a Microsoft account.
2. Create a publisher with the ID `nelvaron`. It must match `publisher` in
   `package.json`.

Open VSX:

1. Sign in at [open-vsx.org](https://open-vsx.org) with GitHub, and sign the
   Eclipse Foundation publisher agreement from your profile.
2. Create an access token in your profile settings.
3. Create the namespace once:

   ```bash
   npx ovsx create-namespace nelvaron --pat <token>
   ```

4. In the GitHub repository, open **Settings** > **Secrets and variables** >
   **Actions** and add the token as a secret named `OVSX_PAT`.

The README images use relative paths. The Marketplace and Open VSX resolve
them through the repository URL, so they appear only once the repository is
public.
