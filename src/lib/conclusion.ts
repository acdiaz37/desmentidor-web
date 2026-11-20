/** Utilidades para el texto de conclusión (markdown ligero: "## Título" + párrafos). */

function splitParagraphs(text: string): string[] {
  const normalized = text.replace(/\r\n/g, "\n").trim();
  const blocks = normalized
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean);
  if (blocks.length <= 1) {
    return normalized
      .split(/\n+/)
      .map((b) => b.trim())
      .filter(Boolean);
  }
  return blocks.map((b) => b.replace(/\n+/g, " "));
}

export function stripInlineMd(s: string): string {
  return s.replace(/\*\*/g, "").replace(/^\s*#+\s*/, "");
}

/** Separa el titular ("## ...") del cuerpo. El cuerpo nunca se resume ni se recorta. */
export function parseConclusion(text: string | undefined): { title: string | null; body: string[] } {
  if (!text) return { title: null, body: [] };
  const paragraphs = splitParagraphs(text);
  if (paragraphs.length === 0) return { title: null, body: [] };
  const first = paragraphs[0];
  if (first.startsWith("#")) {
    return { title: stripInlineMd(first), body: paragraphs.slice(1).map(stripInlineMd) };
  }
  return { title: null, body: paragraphs.map(stripInlineMd) };
}
