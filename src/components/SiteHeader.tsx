import Link from "next/link";
import type { SiteData } from "@/lib/types";

export function Stats({ data }: { data: SiteData }) {
  const counts = { green: 0, lime: 0, orange: 0, red: 0, claims: 0 };
  for (const v of data.videos) {
    for (const c of v.claims) {
      counts[c.color] += 1;
      counts.claims += 1;
    }
  }

  const items = [
    { label: "Videos", value: data.videos.length, cls: "text-zinc-900" },
    { label: "Datos", value: counts.claims, cls: "text-zinc-900" },
    { label: "Mayormente", value: counts.green, cls: "text-emerald-600" },
    { label: "A medias", value: counts.lime, cls: "text-lime-600" },
    { label: "Con matices", value: counts.orange, cls: "text-amber-600" },
    { label: "Falsos", value: counts.red, cls: "text-rose-600" },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((it) => (
        <div key={it.label} className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5">
          <div className={`text-lg font-bold leading-none ${it.cls}`}>{it.value}</div>
          <div className="mt-0.5 text-[10px] uppercase tracking-wide text-zinc-400">{it.label}</div>
        </div>
      ))}
    </div>
  );
}

export default function SiteHeader({ data, compact = false }: { data: SiteData; compact?: boolean }) {
  return (
    <header className={compact ? "mb-6" : "mb-8"}>
      <Link href="/" className="mb-3 inline-flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-sm font-black text-white">
          D
        </span>
        <span className="text-sm font-bold uppercase tracking-widest text-zinc-900">Desmentidor</span>
      </Link>
      <h1 className="text-3xl font-black tracking-tight text-zinc-900 sm:text-4xl">
        Desmintiendo el TikTok
      </h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-500">
        Verificamos, uno por uno, los datos que circulan en videos virales. Aportamos cifras,
        fuentes y contexto histórico con un tono neutral: un dato puede ser verdadero y aun
        así estar exagerado o fuera de contexto.
      </p>
      {!compact && (
        <div className="mt-4">
          <Stats data={data} />
        </div>
      )}
    </header>
  );
}
