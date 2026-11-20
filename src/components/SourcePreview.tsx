"use client";

import { useState } from "react";
import type { SourceLink } from "@/lib/types";

/** Fuente como tarjeta legible: medio, título y nota primero; la imagen es secundaria. */
export default function SourcePreview({ source, index = 0 }: { source: SourceLink; index?: number }) {
  const [imgFailed, setImgFailed] = useState(false);
  const label = source.title || source.host;

  return (
    <a
      className="src"
      href={source.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ "--j": index % 4 } as React.CSSProperties}
    >
      {source.image && !imgFailed ? (
        <div className="src-img">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={source.image} alt="" loading="lazy" onError={() => setImgFailed(true)} />
        </div>
      ) : null}
      <div className="src-txt">
        <small>
          {source.ref ? `${source.ref} · ` : ""}
          {source.host} ↗
        </small>
        <strong>{label}</strong>
        {source.note ? <span>{source.note}</span> : null}
      </div>
    </a>
  );
}
