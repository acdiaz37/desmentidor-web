import type { VerdictColor } from "@/lib/types";
import { revStyle } from "@/lib/verdicts";

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
  return blocks;
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
    <section className="mt-9 overflow-hidden rounded-xl border border-[#ded8cd] bg-[#f0ebe1]">
      <div className="border-b border-[#ded8cd] px-5 py-4 sm:px-7">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#b23125]">Conclusión</p>
          {label ? (
            <span
              className={`rounded-[3px] px-2 py-0.5 text-[10px] font-bold ${revStyle((color as VerdictColor) || "orange").tag}`}
            >
              {label}
            </span>
          ) : null}
        </div>
        <h2 className="mt-2 max-w-3xl font-serif text-2xl font-normal leading-tight text-[#1b1b1b] sm:text-3xl">
          {title}
        </h2>
      </div>
      <div className="grid gap-x-8 gap-y-4 px-5 py-5 text-[13px] leading-7 text-[#4a463f] sm:px-7 lg:grid-cols-2">
        {(body.length ? body : [text]).map((p, i) => (
          <p key={i} className="border-l-2 border-[#b23125]/35 pl-4">
            {stripInlineMd(p)}
          </p>
        ))}
      </div>
    </section>
  );
}
