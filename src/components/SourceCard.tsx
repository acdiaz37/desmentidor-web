"use client";

import { useState } from "react";
import type { SourceLink } from "@/lib/types";

export default function SourceCard({ source }: { source: SourceLink }) {
  const [failed, setFailed] = useState(false);
  const showImg = Boolean(source.image) && !failed;

  return (
    <a
      href={source.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex min-w-0 items-start gap-3 rounded-lg border border-[#ded8cd] p-3 transition hover:border-[#b9b09f] hover:bg-[#faf7f1]"
    >
      {showImg ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={source.image}
          alt=""
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-14 w-16 shrink-0 rounded object-cover"
        />
      ) : (
        <span className="grid h-14 w-16 shrink-0 place-items-center rounded bg-[#f1ece2] px-1 text-center text-[9px] font-bold leading-tight text-[#6e6a63]">
          {source.host}
        </span>
      )}
      <span className="min-w-0">
        <span className="block truncate text-[10px] font-bold uppercase tracking-wider text-[#9a938a]">
          {source.ref ? `${source.ref} · ` : ""}
          {source.host}
        </span>
        <span className="mt-1 block text-xs font-semibold leading-snug text-[#26241f]">
          {source.title || source.host}
        </span>
        {source.note && (
          <span className="mt-1 block text-[11px] leading-snug text-[#6e6a63]">{source.note}</span>
        )}
      </span>
    </a>
  );
}
