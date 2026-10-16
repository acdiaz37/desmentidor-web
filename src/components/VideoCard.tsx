import Link from "next/link";
import type { VerdictColor, Video } from "@/lib/types";
import { revStyle, videoOverall } from "@/lib/verdicts";

export default function VideoCard({ video }: { video: Video }) {
  const counts: Record<VerdictColor, number> = { green: 0, lime: 0, orange: 0, red: 0 };
  for (const c of video.claims) counts[c.color] += 1;
  const overall = videoOverall(video);
  const verified = (video.verdict || "").toLowerCase() === "verdadero";

  const cells: { label: string; value: number; color: VerdictColor }[] = [
    { label: "Mayormente", value: counts.green, color: "green" },
    { label: "A medias", value: counts.lime, color: "lime" },
    { label: "Con matices", value: counts.orange, color: "orange" },
    { label: "Falsos", value: counts.red, color: "red" },
  ];

  return (
    <Link
      href={`/video/${video.slug}`}
      className="group relative grid min-h-[216px] grid-cols-[32%_1fr] overflow-hidden rounded-[5px] border border-[#ded8cd] bg-[#fffefa] transition hover:-translate-y-0.5 hover:shadow-[0_7px_18px_#33271712]"
    >
      <div className="relative bg-[#eee8dc]">
        {video.thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={video.thumbnail}
            alt={video.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[10px] text-[#6e6a63]">
            sin video
          </div>
        )}
        <span className="absolute inset-x-1 bottom-1 rounded-full bg-[#090909a8] py-0.5 text-center text-[9px] font-semibold text-white backdrop-blur">
          {video.claims.length} datos
        </span>
        {verified && (
          <b className="absolute right-1 top-1 rounded-[3px] bg-[#17875f] px-1.5 py-0.5 text-[9px] font-bold text-white">
            ✓ Verdadero
          </b>
        )}
      </div>

      <div className="flex min-w-0 flex-col justify-center px-3.5 py-3">
        <span
          className={`mb-1.5 self-start rounded-[3px] px-2 py-1 text-[10px] font-bold leading-[1.1] ${revStyle(overall.color).tag}`}
        >
          {overall.label}
        </span>
        <h3 className="font-serif text-[18px] font-normal leading-[1.12] text-[#1b1b1b]">
          {video.title}
        </h3>
        <p className="mt-0.5 text-[11px] text-[#6e6a63]">
          @{video.uploader}
          {video.duration ? ` · ${Math.round(video.duration)}s` : ""}
        </p>

        <div className="mt-2.5 grid grid-cols-2 gap-x-2">
          {cells.map((cell) => {
            const rev = revStyle(cell.color);
            return (
              <div
                key={cell.label}
                className={`flex items-center justify-between gap-1 border-b border-[#ded8cd] px-1.5 py-1 ${rev.cellBox}`}
              >
                <span className="text-[9px] leading-[1.1] text-[#6e6a63]">{cell.label}</span>
                <b className={`font-serif text-[23px] font-normal leading-[.95] ${rev.cellNum}`}>
                  {cell.value}
                </b>
              </div>
            );
          })}
        </div>
      </div>
    </Link>
  );
}
