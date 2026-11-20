import { parseConclusion } from "@/lib/conclusion";
import type { Video } from "@/lib/types";
import { countClaims, formatDuration, videoOverall } from "@/lib/verdicts";
import Matrix from "./Matrix";

/**
 * Cabecera del caso: sello del veredicto, titular de la conclusión (o el título del
 * video si no hay conclusión), título original como subtítulo y conteos.
 */
export default function VideoHeader({ video }: { video: Video }) {
  const overall = videoOverall(video);
  const { title } = parseConclusion(video.conclusion);
  const dur = formatDuration(video.duration);

  return (
    <div className="case" data-v={overall.color}>
      <div>
        <span className="bigstamp">Veredicto: {overall.label}</span>
        <h1 className="slant">{title ?? video.title}</h1>
        {title ? <p className="orig">{video.title}</p> : null}
        <div className="meta">
          @{video.uploader}
          {dur ? ` · ${dur}` : ""} · {video.claims.length} datos revisados
        </div>
        <Matrix counts={countClaims(video.claims)} countUp />
        <div className="links">
          <a className="btn" href={video.url} target="_blank" rel="noopener noreferrer">
            Ver video original ↗
          </a>
          {video.conclusion ? (
            <a className="btn ghost" href="#conclusion">
              Ir a la conclusión ↓
            </a>
          ) : null}
        </div>
      </div>
      {video.thumbnail ? (
        <div className="photo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={video.thumbnail} alt={`Miniatura del video: ${video.title}`} />
        </div>
      ) : null}
    </div>
  );
}
