// Join a site path with the configured base, so links work both on
// nelvaron.github.io/vscode-verdant-ledger/ and on a future custom domain.
export function url(path = "") {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const clean = path.replace(/^\//, "");
  return `${base}/${clean}`;
}
