import Link from "next/link";
import type { Video } from "@/lib/types";
import { countClaims, formatDuration, videoOverall } from "@/lib/verdicts";
import Matrix from "./Matrix";

/** Tarjeta de video de la portada. Todas pesan igual (ver DISENO.md). */
export default function VideoCard({ video }: { video: Video }) {
  const counts = countClaims(video.claims);
  const overall = videoOverall(video);
  const dur = formatDuration(video.duration);
  const fallback = video.claims.find((c) => c.quote)?.quote;

  return (
    <Link className="card" href={`/video/${video.slug}`}>
      {video.thumbnail ? (
        <div className="thumb">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={video.thumbnail} alt="" loading="lazy" />
          <span className="stamp" data-v={overall.color}>{overall.label}</span>
        </div>
      ) : (
        <div className="thumb noimg">
          <span>{fallback ? `«${fallback}»` : video.title}</span>
          <span className="stamp" data-v={overall.color}>{overall.label}</span>
        </div>
      )}
      <div className="info">
        <h3>{video.title}</h3>
        <div className="meta">
          @{video.uploader}
          {dur ? ` · ${dur}` : ""} · {video.claims.length} datos
        </div>
        <Matrix counts={counts} />
      </div>
    </Link>
  );
}
