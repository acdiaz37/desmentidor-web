import type { VerdictColor, Video } from "@/lib/types";
import { revStyle, videoOverall } from "@/lib/verdicts";

function conclusionTitle(text?: string): string {
  if (!text) return "Análisis del video";
  const first = text.split(/\n\s*\n/)[0]?.trim() || "";
  const clean = first.replace(/^#+\s*/, "").replace(/\*\*/g, "");
  return clean || "Análisis del video";
}

export default function VideoHeader({ video }: { video: Video }) {
  const counts: Record<VerdictColor, number> = { green: 0, lime: 0, orange: 0, red: 0 };
  for (const c of video.claims) counts[c.color] += 1;
  const overall = videoOverall(video);

  const cells: { label: string; value: number; color: VerdictColor }[] = [
    { label: "Mayormente", value: counts.green, color: "green" },
    { label: "A medias", value: counts.lime, color: "lime" },
    { label: "Con matices", value: counts.orange, color: "orange" },
    { label: "Falsos", value: counts.red, color: "red" },
  ];

  return (
    <section className="grid overflow-hidden rounded-2xl border border-[#ded8cd] bg-[#fffefa] md:grid-cols-[220px_1fr]">
      <div className="relative min-h-[200px] bg-[#eee8dc] md:min-h-full">
        {video.thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={video.thumbnail}
            alt={video.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : null}
      </div>

      <div className="flex flex-col justify-center p-5 sm:p-7">
        <p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#b23125]">
          Conclusión general · @{video.uploader}
          {video.duration ? ` · ${Math.round(video.duration)}s` : ""}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span
            className={`rounded-[3px] px-2 py-1 text-[11px] font-bold ${revStyle(overall.color).tag}`}
          >
            {overall.label}
          </span>
        </div>
        <h1 className="mt-3 font-serif text-3xl font-normal leading-tight tracking-tight text-[#1b1b1b] sm:text-4xl">
          {conclusionTitle(video.conclusion)}
        </h1>
        <p className="mt-3 text-sm font-semibold leading-snug text-[#6e6a63]">{video.title}</p>
        <a
          href={video.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 w-fit max-w-full truncate text-xs font-medium text-[#6e6a63] underline decoration-[#ded8cd] underline-offset-4 hover:text-[#1b1b1b]"
        >
          Ver video original ↗
        </a>

        <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {cells.map((cell) => {
            const rev = revStyle(cell.color);
            return (
              <div key={cell.label} className={`border-t-2 bg-[#f5f1e9] px-3 py-2 ${rev.quote}`}>
                <strong className={`block font-serif text-2xl font-normal ${rev.cellNum}`}>
                  {cell.value}
                </strong>
                <span className="text-[9px] font-bold uppercase tracking-wide text-[#6e6a63]">
                  {cell.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
