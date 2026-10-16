import SiteHeader from "@/components/SiteHeader";
import VideoCard from "@/components/VideoCard";
import data from "@/data/videos.json";
import type { SiteData } from "@/lib/types";

export default function Home() {
  const site = data as SiteData;
  // Más nuevos primero (aproximación: el orden del JSON es de incorporación).
  const videos = [...site.videos].reverse();

  return (
    <div className="mx-auto w-full max-w-[1220px] px-4 pb-14 pt-7 sm:px-8">
      <SiteHeader data={site} />

      <div className="mb-3.5 flex items-baseline justify-between border-t-[3px] border-b border-t-[#1b1b1b] border-b-[#ded8cd] py-2.5">
        <h2 className="text-[12px] font-bold uppercase tracking-[.12em] text-[#1b1b1b]">
          Videos desmentidos ({site.videos.length})
        </h2>
        <span className="hidden text-[12px] text-[#6e6a63] sm:block">
          Elige un video para ver los datos
        </span>
      </div>

      <section className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
        {videos.map((video) => (
          <VideoCard key={video.slug} video={video} />
        ))}
      </section>

      <footer className="mt-8 max-w-[820px] border-t border-[#ded8cd] pt-4 text-[12px] leading-relaxed text-[#6e6a63]">
        <p>
          Cada dato se contrasta con fuentes verificables y se clasifica en{" "}
          <b className="font-semibold text-[#17875f]">mayormente verdadero</b>,{" "}
          <b className="font-semibold text-[#6e8d20]">verdadero, pero le falta contexto</b>,{" "}
          <b className="font-semibold text-[#aa6910]">con matices / exagerado</b> o{" "}
          <b className="font-semibold text-[#b9384f]">falso</b>. Un dato puede ser cierto y aun así
          estar fuera de contexto: lo ponemos en su justa medida.
        </p>
      </footer>
    </div>
  );
}
