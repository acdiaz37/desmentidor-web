import SiteHeader from "@/components/SiteHeader";
import VideoCard from "@/components/VideoCard";
import data from "@/data/videos.json";
import type { SiteData } from "@/lib/types";

export default function Home() {
  const site = data as SiteData;

  return (
    <div className="mx-auto w-full max-w-5xl px-4 pb-16 pt-8 sm:px-6">
      <SiteHeader data={site} />

      <div className="mb-3 flex items-center justify-between px-1">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
          Videos desmentidos ({site.videos.length})
        </h2>
        <span className="text-[11px] text-zinc-400">Elige un video para ver los datos</span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {site.videos.map((video) => (
          <VideoCard key={video.slug} video={video} />
        ))}
      </div>

      <footer className="mt-10 border-t border-zinc-200 pt-4 text-[11px] leading-relaxed text-zinc-400">
        <p>
          Cada dato se contrasta con fuentes verificables y se clasifica en{" "}
          <span className="font-medium text-emerald-600">mayormente verdadero</span>,{" "}
          <span className="font-medium text-lime-600">verdadero, pero le falta contexto</span>,{" "}
          <span className="font-medium text-amber-600">con matices / exagerado</span> o{" "}
          <span className="font-medium text-rose-600">falso</span>. Un dato puede ser cierto y aun
          así estar fuera de contexto: lo ponemos en su justa medida.
        </p>
      </footer>
    </div>
  );
}
