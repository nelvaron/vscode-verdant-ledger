import { defineConfig } from "astro/config";
import markdownParity from "./integrations/markdown-parity.mjs";

// Published as a GitHub Pages project site. With a custom domain later,
// set `site` to that domain and remove `base`.
export default defineConfig({
  site: "https://nelvaron.github.io",
  base: "/vscode-verdant-ledger",
  integrations: [markdownParity()],
  vite: {
    // The site reads the theme, examples and scripts from the repository root.
    server: { fs: { allow: [".."] } },
  },
});
