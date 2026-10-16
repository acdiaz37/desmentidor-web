import type { Claim } from "@/lib/types";
import { revStyle, verdictLabel } from "@/lib/verdicts";
import SourceCard from "./SourceCard";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-[#e6e0d5] pt-4">
      <h4 className="mb-2 text-[11px] font-bold uppercase tracking-[.14em] text-[#9a938a]">
        {title}
      </h4>
      <div className="text-[14px] leading-7 text-[#4a463f]">{children}</div>
    </section>
  );
}

export default function ClaimCard({ claim }: { claim: Claim }) {
  const rev = revStyle(claim.color);
  const plainTrue = (claim.verdict || "").toLowerCase() === "verdadero";
  const verdictText = plainTrue
    ? claim.headline || "Verdadero, pero con matices"
    : verdictLabel(claim.verdict);

  return (
    <details className="group overflow-hidden rounded-xl border border-[#ded8cd] bg-[#fffefa] open:border-[#b9b09f]">
      <summary className="flex cursor-pointer list-none items-start gap-3 p-4 sm:gap-4 sm:p-5">
        <span
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-full font-serif text-lg text-white ${rev.solid}`}
        >
          {claim.id}
        </span>
        <span className="min-w-0 flex-1">
          <span className="mb-2 flex flex-wrap items-center gap-2">
            <span className={`rounded px-2.5 py-1 text-[11px] font-bold ${rev.tag}`}>
              {verdictText}
            </span>
            {claim.topic && (
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#9a938a]">
                {claim.topic}
              </span>
            )}
            {claim.confidence && (
              <span className="text-[10px] text-[#9a938a]">Confianza {claim.confidence}</span>
            )}
          </span>
          <span className="block text-[15px] font-semibold leading-snug text-[#26241f] sm:text-base">
            {claim.claim}
          </span>
          {claim.summary && (
            <span className="mt-2 line-clamp-2 block text-xs leading-relaxed text-[#6e6a63]">
              {claim.summary}
            </span>
          )}
        </span>
        <span className="mt-2 text-xl leading-none text-[#9a938a] transition-transform group-open:rotate-180">
          ⌄
        </span>
      </summary>

      <div className="space-y-5 border-t border-[#efe9df] p-4 sm:p-5">
        {claim.quote && (
          <blockquote
            className={`border-l-[3px] bg-[#faf7f1] px-4 py-3 font-serif text-[17px] italic leading-relaxed text-[#4a463f] ${rev.quote}`}
          >
            “{claim.quote}”
          </blockquote>
        )}

        {claim.summary && (
          <section className={`rounded-lg border-l-4 bg-[#f8f5ef] p-4 sm:p-5 ${rev.quote}`}>
            <h4 className="mb-2 text-[11px] font-bold uppercase tracking-[.14em] text-[#9a938a]">
              Desmentido
            </h4>
            <p className="text-[14px] leading-7 text-[#26241f]">{claim.summary}</p>
          </section>
        )}

        <div className="grid gap-5 lg:grid-cols-2">
          {claim.context && (
            <Section title="Contexto y magnitud real">
              <p>{claim.context}</p>
            </Section>
          )}
          {claim.progressivePerspective && (
            <Section title="Análisis">
              <p>{claim.progressivePerspective}</p>
            </Section>
          )}
          {claim.whatTheyOmit && (
            <Section title="Qué omite el video">
              <p>{claim.whatTheyOmit}</p>
            </Section>
          )}
        </div>

        {claim.keyFacts.length > 0 && (
          <Section title="Hechos clave">
            <ul className="grid gap-2 sm:grid-cols-2">
              {claim.keyFacts.map((fact, i) => (
                <li key={i} className="flex gap-2 rounded-lg bg-[#f8f5ef] p-3 text-[12px] leading-relaxed">
                  <span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${rev.solid}`} />
                  {fact}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {claim.sources.length > 0 && (
          <Section title="Fuentes">
            <div className="grid gap-2 sm:grid-cols-2">
              {claim.sources.map((source, i) => (
                <SourceCard key={i} source={source} />
              ))}
            </div>
          </Section>
        )}
      </div>
    </details>
  );
}
