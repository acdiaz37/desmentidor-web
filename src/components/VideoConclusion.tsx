import type { VerdictColor } from "@/lib/types";
import { colorStyle } from "@/lib/verdicts";

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

function stripInlineMd(s: string): string {
  return s.replace(/\*\*/g, "").replace(/^\s*#+\s*/, "");
}

export default function VideoConclusion({
  text,
  label,
  color,
}: {
  text: string;
  label?: string;
  color?: string;
}) {
  const paragraphs = splitParagraphs(text);
  if (paragraphs.length === 0) return null;

  const vc = colorStyle((color as VerdictColor) || "orange");

  let title = "La narrativa del video, en conjunto";
  let body = paragraphs;
  const first = paragraphs[0];
  if (first.startsWith("## ")) {
    title = stripInlineMd(first.slice(3).trim());
    body = paragraphs.slice(1);
  } else if (first.startsWith("#")) {
    title = stripInlineMd(first);
    body = paragraphs.slice(1);
  }

  return (
    <section className={`mt-6 overflow-hidden rounded-2xl border-2 ${vc.border} ${vc.soft}`}>
      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`text-[11px] font-semibold uppercase tracking-widest ${vc.text}`}>
            Conclusión
          </span>
          {label ? (
            <span
              className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold text-white ${vc.dot}`}
            >
              {label}
            </span>
          ) : null}
        </div>
        <h2 className={`mt-2 text-lg font-bold leading-snug ${vc.text}`}>{title}</h2>
        <div className="mt-3 space-y-3 text-[13.5px] leading-relaxed text-zinc-700">
          {(body.length ? body : [text]).map((p, i) => (
            <p key={i}>{stripInlineMd(p)}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
