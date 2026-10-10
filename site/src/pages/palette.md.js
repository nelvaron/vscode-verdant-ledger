import { paletteMarkdown } from "../lib/markdown.js";

export function GET() {
  return new Response(paletteMarkdown(), { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
}
