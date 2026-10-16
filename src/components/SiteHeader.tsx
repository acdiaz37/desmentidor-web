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
    { label: "Videos", value: data.videos.length },
    { label: "Datos", value: counts.claims },
    { label: "Mayormente", value: counts.green },
    { label: "A medias", value: counts.lime },
    { label: "Con matices", value: counts.orange },
    { label: "Falsos", value: counts.red },
  ];

  return (
    <div className="mt-6 grid grid-cols-3 border-l border-t border-[#ded8cd] sm:grid-cols-6">
      {items.map((it) => (
        <div key={it.label} className="border-b border-r border-[#ded8cd] px-3.5 py-3">
          <strong className="block font-serif text-[28px] font-normal leading-none text-[#1b1b1b]">
            {it.value}
          </strong>
          <span className="mt-1 block text-[9px] font-bold uppercase tracking-[.1em] text-[#6e6a63]">
            {it.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function SiteHeader({
  data,
  compact = false,
}: {
  data: SiteData;
  compact?: boolean;
}) {
  return (
    <header className={compact ? "mb-6" : "mb-8 border-t border-[#1b1b1b] pt-5"}>
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-2.5 text-[12px] font-extrabold uppercase tracking-[.16em] text-[#b23125]"
      >
        <span className="grid h-8 w-8 place-items-center bg-[#b23125] text-sm font-black text-white">
          D
        </span>
        Desmentidor
      </Link>
      <h1 className="font-serif text-[clamp(46px,7vw,76px)] font-normal leading-[1] tracking-[-.035em] text-[#1b1b1b]">
        Desmintiendo el TikTok
      </h1>
      <p className="mt-3 max-w-[720px] text-[14px] leading-7 text-[#6e6a63]">
        Verificamos, uno por uno, los datos que circulan en videos virales. Aportamos cifras,
        fuentes y contexto histórico con un tono neutral: un dato puede ser verdadero y aun así
        estar exagerado o fuera de contexto.
      </p>
      {!compact && <Stats data={data} />}
    </header>
  );
}
