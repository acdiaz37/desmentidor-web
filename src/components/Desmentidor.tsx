"use client";

import { useMemo, useState } from "react";
import ClaimCard from "./ClaimCard";
import type { SiteData, Video } from "@/lib/types";
import { colorStyle } from "@/lib/verdicts";

function Stats({ data }: { data: SiteData }) {
  const totals = useMemo(() => {
    const counts = { green: 0, orange: 0, red: 0, claims: 0 };
    for (const v of data.videos) {
      for (const c of v.claims) {
        counts[c.color] += 1;
        counts.claims += 1;
      }
    }
    return counts;
  }, [data]);

  const items = [
    { label: "Videos", value: data.videos.length, cls: "text-zinc-900" },
    { label: "Datos", value: totals.claims, cls: "text-zinc-900" },
    { label: "Verdaderos", value: totals.green, cls: "text-emerald-600" },
    { label: "Con matices", value: totals.orange, cls: "text-amber-600" },
    { label: "Falsos", value: totals.red, cls: "text-rose-600" },
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

function VideoTabs({
  videos,
  active,
  onSelect,
}: {
  videos: Video[];
  active: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {videos.map((v, i) => {
        const isActive = i === active;
        return (
          <button
            key={v.slug}
            type="button"
            onClick={() => onSelect(i)}
            className={`flex shrink-0 items-center gap-2 rounded-lg border px-3 py-2 text-left text-xs transition ${
              isActive
                ? "border-zinc-900 bg-zinc-900 text-white"
                : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300"
            }`}
          >
            <span className="flex gap-0.5">
              {v.claims.map((c) => (
                <span key={c.id} className={`h-1.5 w-1.5 rounded-full ${colorStyle(c.color).dot}`} />
              ))}
            </span>
            <span className="max-w-[180px] truncate font-medium">
              {v.uploader || v.title || v.slug}
            </span>
            <span className={`rounded-full px-1.5 text-[10px] ${isActive ? "bg-white/15" : "bg-zinc-100"}`}>
              {v.claims.length}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function VideoHeader({ video }: { video: Video }) {
  const counts = { green: 0, orange: 0, red: 0 } as Record<string, number>;
  for (const c of video.claims) counts[c.color] += 1;

  return (
    <div className={`flex flex-col gap-4 rounded-2xl border bg-white p-4 sm:flex-row ${colorStyle("orange").border}`}>
      <div className="mx-auto w-full max-w-[200px] shrink-0 sm:mx-0">
        <div className="aspect-square w-full overflow-hidden rounded-xl bg-zinc-100">
          {video.thumbnail ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={video.thumbnail} alt={video.title} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-zinc-400">
              sin miniatura
            </div>
          )}
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
          Cuenta desmentida
        </div>
        <h2 className="text-base font-bold leading-snug text-zinc-900">{video.title}</h2>
        <p className="mt-0.5 text-xs text-zinc-500">
          @{video.uploader}
          {video.duration ? ` · ${Math.round(video.duration)}s` : ""}
        </p>
        <a
          href={video.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 truncate text-[11px] text-blue-600 hover:underline"
        >
          {video.url}
        </a>

        <div className="mt-auto flex flex-wrap gap-2 pt-3 text-[11px]">
          <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 font-medium text-emerald-700">
            {counts.green} verdaderos
          </span>
          <span className="rounded-full bg-amber-500/15 px-2 py-0.5 font-medium text-amber-700">
            {counts.orange} con matices
          </span>
          <span className="rounded-full bg-rose-500/15 px-2 py-0.5 font-medium text-rose-700">
            {counts.red} falsos
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Desmentidor({ data }: { data: SiteData }) {
  const [active, setActive] = useState(0);
  const video = data.videos[active];

  return (
    <div className="mx-auto w-full max-w-5xl px-4 pb-16 pt-8 sm:px-6">
      <header className="mb-8">
        <div className="mb-3 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-sm font-black text-white">
            D
          </span>
          <span className="text-sm font-bold uppercase tracking-widest text-zinc-900">Desmentidor</span>
        </div>
        <h1 className="text-3xl font-black tracking-tight text-zinc-900 sm:text-4xl">
          Desmintiendo el TikTok
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-500">
          Verificamos, uno por uno, los datos que circulan en videos virales. Aportamos cifras,
          fuentes y contexto histórico desde una mirada progresista, con un tono neutral:
          un dato puede ser verdadero y aun así estar exagerado o fuera de contexto.
        </p>
        <div className="mt-4">
          <Stats data={data} />
        </div>
      </header>

      <VideoTabs videos={data.videos} active={active} onSelect={setActive} />

      <div className="mt-4 space-y-3">
        <VideoHeader video={video} />
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
            Datos detectados ({video.claims.length})
          </h3>
          <span className="text-[11px] text-zinc-400">Toca un dato para ver el desmentido</span>
        </div>
        {video.claims.map((claim) => (
          <ClaimCard key={claim.id} claim={claim} />
        ))}
      </div>

      <footer className="mt-10 border-t border-zinc-200 pt-4 text-[11px] leading-relaxed text-zinc-400">
        <p>
          Cada dato se contrasta con fuentes verificables y se clasifica en{" "}
          <span className="font-medium text-emerald-600">verdadero</span>,{" "}
          <span className="font-medium text-amber-600">con matices / exagerado</span> o{" "}
          <span className="font-medium text-rose-600">falso</span>. La lectura progresista no niega
          hechos: los pone en su justa medida. Generado el {data.generatedAt}.
        </p>
      </footer>
    </div>
  );
}
