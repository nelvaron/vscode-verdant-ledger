import { homeMarkdown } from "../lib/markdown.js";

export async function GET() {
  return new Response(await homeMarkdown(), { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
}
