"use client";

import { useState } from "react";
import type { SourceLink } from "@/lib/types";

function faviconUrl(host: string): string {
  return `https://www.google.com/s2/favicons?domain=${host}&sz=64`;
}

export default function SourcePreview({ source }: { source: SourceLink }) {
  const [imgFailed, setImgFailed] = useState(false);
  const showImage = source.image && !imgFailed;
  const label = source.title || source.host;

  return (
    <a
      href={source.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white transition hover:border-zinc-300 hover:shadow-sm"
    >
      <div className="relative h-24 w-full overflow-hidden bg-zinc-100">
        {showImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={source.image}
            alt={label}
            loading="lazy"
            onError={() => setImgFailed(true)}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={faviconUrl(source.host)} alt="" className="h-8 w-8 opacity-80" />
          </div>
        )}
        {showImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={faviconUrl(source.host)}
            alt=""
            className="absolute left-2 top-2 h-4 w-4 rounded bg-white/80 p-0.5 backdrop-blur"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-2.5">
        <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wide text-zinc-400">
          {source.ref && <span className="rounded bg-zinc-100 px-1 py-0.5 text-zinc-500">{source.ref}</span>}
          <span className="truncate">{source.host}</span>
        </div>
        <p className="line-clamp-2 text-xs font-medium leading-snug text-zinc-700 group-hover:text-zinc-900">
          {label}
        </p>
        {source.note && (
          <p className="line-clamp-3 text-[11px] leading-snug text-zinc-500">{source.note}</p>
        )}
      </div>
    </a>
  );
}
