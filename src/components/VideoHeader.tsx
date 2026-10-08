import type { Video } from "@/lib/types";

export default function VideoHeader({ video }: { video: Video }) {
  const counts = { green: 0, lime: 0, orange: 0, red: 0 } as Record<string, number>;
  for (const c of video.claims) counts[c.color] += 1;

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-4 sm:flex-row">
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
            {counts.green} mayormente verdaderos
          </span>
          <span className="rounded-full bg-lime-500/15 px-2 py-0.5 font-medium text-lime-700">
            {counts.lime} a medias
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
