import Link from "next/link";
import type { Video } from "@/lib/types";
import { colorStyle } from "@/lib/verdicts";

export default function VideoCard({ video }: { video: Video }) {
  const counts = { green: 0, orange: 0, red: 0 } as Record<string, number>;
  for (const c of video.claims) counts[c.color] += 1;

  return (
    <Link
      href={`/video/${video.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-zinc-100">
        {video.thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={video.thumbnail}
            alt={video.title}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-zinc-400">
            sin miniatura
          </div>
        )}
        <div className="absolute left-2 top-2 flex gap-0.5 rounded-full bg-black/45 px-2 py-1 backdrop-blur">
          {video.claims.map((c) => (
            <span key={c.id} className={`h-1.5 w-1.5 rounded-full ${colorStyle(c.color).dot}`} />
          ))}
        </div>
        <div className="absolute bottom-2 right-2 rounded-full bg-black/55 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur">
          {video.claims.length} datos
        </div>
      </div>

      <div className="flex flex-1 flex-col p-3">
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-zinc-800 group-hover:text-zinc-950">
          {video.title}
        </h3>
        <p className="mt-0.5 text-[11px] text-zinc-500">
          @{video.uploader}
          {video.duration ? ` · ${Math.round(video.duration)}s` : ""}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5 text-[10px] font-medium">
          <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-emerald-700">
            {counts.green} verdad.
          </span>
          <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-amber-700">
            {counts.orange} matices
          </span>
          <span className="rounded-full bg-rose-500/15 px-2 py-0.5 text-rose-700">
            {counts.red} falsos
          </span>
        </div>
      </div>
    </Link>
  );
}
