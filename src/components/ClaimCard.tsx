"use client";

import { useState } from "react";
import SourcePreview from "./SourcePreview";
import type { Claim } from "@/lib/types";
import { colorStyle, verdictLabel } from "@/lib/verdicts";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-zinc-400">{title}</h4>
      <p className="text-[13px] leading-relaxed text-zinc-600">{children}</p>
    </div>
  );
}

export default function ClaimCard({ claim }: { claim: Claim }) {
  const [open, setOpen] = useState(false);
  const c = colorStyle(claim.color);

  return (
    <article className={`overflow-hidden rounded-xl border bg-white transition-shadow hover:shadow-sm ${open ? c.border : "border-zinc-200"}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start gap-3 p-3 text-left"
      >
        <span className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white ${c.dot}`}>
          {claim.id}
        </span>

        <div className="min-w-0 flex-1">
          <div className="mb-1 flex flex-wrap items-center gap-1.5">
            <span className={`rounded-md px-2 py-0.5 text-[11px] font-semibold leading-snug ring-1 ring-inset ${c.pill}`}>
              {claim.headline || verdictLabel(claim.verdict)}
            </span>
            <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-medium text-zinc-500">
              {claim.topic}
            </span>
            {claim.confidence && (
              <span className="text-[10px] text-zinc-400">confianza {claim.confidence}</span>
            )}
          </div>
          <h3 className="text-sm font-semibold leading-snug text-zinc-800">{claim.claim}</h3>
          {!open && claim.summary && (
            <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-zinc-500">{claim.summary}</p>
          )}
        </div>

        <span className={`mt-0.5 shrink-0 text-xs font-medium ${c.text}`}>
          {open ? "−" : "＋"}
        </span>
      </button>

      {open && (
        <div className="space-y-3 border-t border-zinc-100 px-3 pb-3 pt-3">
          {claim.quote && (
            <blockquote className={`rounded-lg border-l-2 ${c.border} ${c.soft} px-3 py-2 text-[12px] italic leading-snug text-zinc-600`}>
              “{claim.quote}”
            </blockquote>
          )}

          {claim.summary && <Section title="Desmentido">{claim.summary}</Section>}
          {claim.context && <Section title="Contexto y magnitud real">{claim.context}</Section>}
          {claim.progressivePerspective && (
            <Section title="Análisis">{claim.progressivePerspective}</Section>
          )}
          {claim.whatTheyOmit && <Section title="Qué omite el video">{claim.whatTheyOmit}</Section>}

          {claim.keyFacts.length > 0 && (
            <div>
              <h4 className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-zinc-400">
                Hechos clave
              </h4>
              <ul className="space-y-1">
                {claim.keyFacts.map((fact, i) => (
                  <li key={i} className="flex gap-2 text-[12px] leading-snug text-zinc-600">
                    <span className={`mt-1.5 h-1 w-1 shrink-0 rounded-full ${c.dot}`} />
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {claim.sources.length > 0 && (
            <div>
              <h4 className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-zinc-400">
                Fuentes
              </h4>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {claim.sources.map((source, i) => (
                  <SourcePreview key={i} source={source} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </article>
  );
}
