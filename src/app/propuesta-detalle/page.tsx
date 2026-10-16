import Link from "next/link";
import data from "@/data/videos.json";
import type { Claim, SiteData } from "@/lib/types";
import { verdictLabel } from "@/lib/verdicts";

const video = (data as SiteData).videos[0];
const colorClasses: Record<string, { pill: string; mark: string; wash: string }> = {
  green: { pill: "bg-emerald-50 text-emerald-800", mark: "bg-emerald-600", wash: "border-emerald-200" },
  lime: { pill: "bg-lime-50 text-lime-800", mark: "bg-lime-600", wash: "border-lime-200" },
  orange: { pill: "bg-amber-50 text-amber-900", mark: "bg-amber-600", wash: "border-amber-300" },
  red: { pill: "bg-rose-50 text-rose-800", mark: "bg-rose-600", wash: "border-rose-200" },
};

function TextSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-stone-200 pt-4">
      <h4 className="mb-2 text-[11px] font-bold uppercase tracking-[.14em] text-stone-500">{title}</h4>
      <div className="text-[14px] leading-7 text-stone-700">{children}</div>
    </section>
  );
}

function ClaimDetail({ claim }: { claim: Claim }) {
  const color = colorClasses[claim.color] ?? colorClasses.orange;
  const plainTrue = claim.verdict.toLowerCase() === "verdadero";
  const label = plainTrue ? claim.headline || "Verdadero, pero con matices" : verdictLabel(claim.verdict);

  return (
    <details className="group overflow-hidden rounded-xl border border-stone-200 bg-white open:border-stone-300">
      <summary className="flex cursor-pointer list-none items-start gap-3 p-4 sm:gap-4 sm:p-5">
        <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full font-serif text-lg text-white ${color.mark}`}>{claim.id}</span>
        <span className="min-w-0 flex-1">
          <span className="mb-2 flex flex-wrap items-center gap-2">
            <span className={`rounded px-2.5 py-1 text-[11px] font-bold ${color.pill}`}>{label}</span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-400">{claim.topic}</span>
            {claim.confidence && <span className="text-[10px] text-stone-400">Confianza {claim.confidence}</span>}
          </span>
          <span className="block text-[15px] font-semibold leading-snug text-stone-800 sm:text-base">{claim.claim}</span>
          {claim.summary && <span className="mt-2 line-clamp-2 block text-xs leading-relaxed text-stone-500">{claim.summary}</span>}
        </span>
        <span className="chevron mt-2 text-xl leading-none text-stone-400 transition-transform group-open:rotate-180">⌄</span>
      </summary>

      <div className="space-y-5 border-t border-stone-100 p-4 sm:p-5">
        {claim.quote && <blockquote className={`border-l-[3px] ${color.wash} bg-stone-50 px-4 py-3 font-serif text-[17px] italic leading-relaxed text-stone-700`}>
          “{claim.quote}”
        </blockquote>}
        {claim.summary && <section className={`rounded-lg border-l-4 ${color.mark} bg-[#f8f5ef] p-4 sm:p-5`}>
          <h4 className="mb-2 text-[11px] font-bold uppercase tracking-[.14em] text-stone-500">Desmentido</h4>
          <p className="text-[14px] leading-7 text-stone-800">{claim.summary}</p>
        </section>}
        <div className="grid gap-5 lg:grid-cols-2">
          {claim.context && <TextSection title="Contexto y magnitud real"><p>{claim.context}</p></TextSection>}
          {claim.progressivePerspective && <TextSection title="Análisis"><p>{claim.progressivePerspective}</p></TextSection>}
          {claim.whatTheyOmit && <TextSection title="Qué omite el video"><p>{claim.whatTheyOmit}</p></TextSection>}
        </div>
        {claim.keyFacts.length > 0 && <TextSection title="Hechos clave">
          <ul className="grid gap-2 sm:grid-cols-2">
            {claim.keyFacts.map((fact, i) => <li key={i} className="flex gap-2 rounded-lg bg-stone-50 p-3 text-[12px] leading-relaxed">
              <span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${color.mark}`} />{fact}
            </li>)}
          </ul>
        </TextSection>}
        {claim.sources.length > 0 && <TextSection title="Fuentes">
          <div className="grid gap-2 sm:grid-cols-2">
            {claim.sources.map((source, i) => <a key={i} href={source.url} target="_blank" rel="noreferrer" className="flex min-w-0 items-start gap-3 rounded-lg border border-stone-200 p-3 transition hover:border-stone-400 hover:bg-stone-50">
              {source.image ? <img src={source.image} alt="" className="h-14 w-16 shrink-0 rounded object-cover" /> : <span className="grid h-14 w-16 shrink-0 place-items-center rounded bg-stone-100 text-[10px] font-bold text-stone-500">{source.host}</span>}
              <span className="min-w-0"><span className="block truncate text-[10px] font-bold uppercase tracking-wider text-stone-400">{source.ref && `${source.ref} · `}{source.host}</span><span className="mt-1 block text-xs font-semibold leading-snug text-stone-700">{source.title || source.host}</span>{source.note && <span className="mt-1 block text-[11px] leading-snug text-stone-500">{source.note}</span>}</span>
            </a>)}
          </div>
        </TextSection>}
      </div>
    </details>
  );
}

export default function DetailDesignPreview() {
  const counts = { green: 0, lime: 0, orange: 0, red: 0 };
  for (const claim of video.claims) counts[claim.color] += 1;
  const conclusion = (video.conclusion || "").split(/\n\s*\n/).filter(Boolean);
  const conclusionTitle = conclusion[0]?.replace(/^#+\s*/, "") || "La narrativa del video, en conjunto";

  return (
    <main className="mx-auto max-w-5xl px-4 pb-16 pt-6 sm:px-6 sm:pt-9">
      <header className="mb-5 flex items-center justify-between border-b border-stone-300 pb-4">
        <Link href="/" className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.16em] text-stone-800">
          <span className="grid h-8 w-8 place-items-center bg-[#b23125] text-white">D</span>Desmentidor
        </Link>
        <Link href="/" className="text-xs font-semibold text-stone-500 hover:text-stone-900">← Todos los videos</Link>
      </header>

      <section className="grid overflow-hidden rounded-2xl border border-stone-200 bg-[#fffefa] md:grid-cols-[220px_1fr]">
        <img src={video.thumbnail} alt={video.title} className="h-52 w-full object-cover md:h-full" />
        <div className="flex flex-col justify-center p-5 sm:p-7">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[.16em] text-[#b23125]">Conclusión general · @{video.uploader} · {Math.round(video.duration || 0)}s</p>
          <h1 className="font-serif text-3xl leading-tight tracking-tight text-stone-900 sm:text-4xl">{conclusionTitle}</h1>
          <p className="mt-3 text-sm font-semibold leading-snug text-stone-600">{video.title}</p>
          <a href={video.url} target="_blank" rel="noreferrer" className="mt-3 w-fit max-w-full truncate text-xs font-medium text-stone-500 underline decoration-stone-300 underline-offset-4 hover:text-stone-900">Ver video original ↗</a>
          <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {[[counts.green,"Mayormente","text-emerald-700"],[counts.lime,"A medias","text-lime-700"],[counts.orange,"Con matices","text-amber-700"],[counts.red,"Falsos","text-rose-700"]].map(([value,label,color]) => <div key={String(label)} className="border-t-2 border-stone-200 bg-stone-50 px-3 py-2">
              <strong className={`block font-serif text-2xl ${color}`}>{value}</strong><span className="text-[9px] font-bold uppercase tracking-wide text-stone-500">{label}</span>
            </div>)}
          </div>
        </div>
      </section>

      <div className="mb-3 mt-8 flex items-end justify-between border-b-2 border-stone-800 pb-2">
        <h2 className="text-xs font-bold uppercase tracking-[.14em] text-stone-800">Datos detectados ({video.claims.length})</h2>
        <span className="text-[11px] text-stone-500">Abre un dato para ver el análisis completo</span>
      </div>
      <section className="space-y-5">
        {video.claims.map((claim) => <ClaimDetail key={claim.id} claim={claim} />)}
      </section>

      {conclusion.length > 0 && <section className="mt-9 overflow-hidden rounded-xl border border-stone-200 bg-[#f0ebe1]">
        <div className="border-b border-stone-300 px-5 py-4 sm:px-7">
          <p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#b23125]">Conclusión</p>
          <h2 className="mt-2 max-w-3xl font-serif text-2xl leading-tight text-stone-900 sm:text-3xl">{conclusionTitle}</h2>
        </div>
        <div className="grid gap-x-8 gap-y-4 px-5 py-5 text-[13px] leading-7 text-stone-700 sm:px-7 lg:grid-cols-2">
          {conclusion.slice(1).map((p, i) => <p key={i} className="border-l-2 border-[#b23125]/35 pl-4">{p}</p>)}
        </div>
      </section>}
    </main>
  );
}
