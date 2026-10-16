import Link from "next/link";
import { notFound } from "next/navigation";
import ClaimCard from "@/components/ClaimCard";
import VideoConclusion from "@/components/VideoConclusion";
import VideoHeader from "@/components/VideoHeader";
import data from "@/data/videos.json";
import type { SiteData } from "@/lib/types";

const site = data as SiteData;

export function generateStaticParams() {
  return site.videos.map((video) => ({ slug: video.slug }));
}

export default async function VideoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const video = site.videos.find((v) => v.slug === slug);
  if (!video) notFound();

  return (
    <div className="mx-auto w-full max-w-[1120px] px-4 pb-16 pt-6 sm:px-8 sm:pt-9">
      <header className="mb-5 flex items-center justify-between border-b border-[#d8d1c5] pb-4">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-[12px] font-extrabold uppercase tracking-[.16em] text-[#b23125]"
        >
          <span className="grid h-8 w-8 place-items-center bg-[#b23125] text-sm font-black text-white">
            D
          </span>
          Desmentidor
        </Link>
        <Link href="/" className="text-xs font-semibold text-[#6e6a63] hover:text-[#1b1b1b]">
          ← Todos los videos
        </Link>
      </header>

      <VideoHeader video={video} />

      <div className="mb-3 mt-8 flex items-end justify-between border-b-2 border-[#1b1b1b] pb-2">
        <h2 className="text-xs font-bold uppercase tracking-[.14em] text-[#1b1b1b]">
          Datos detectados ({video.claims.length})
        </h2>
        <span className="hidden text-[11px] text-[#6e6a63] sm:block">
          Abre un dato para ver el análisis completo
        </span>
      </div>

      <section className="space-y-5">
        {video.claims.map((claim) => (
          <ClaimCard key={claim.id} claim={claim} />
        ))}
      </section>

      {video.conclusion ? (
        <VideoConclusion
          text={video.conclusion}
          label={video.conclusionLabel}
          color={video.conclusionColor}
        />
      ) : null}

      <footer className="mt-10 border-t border-[#ded8cd] pt-4 text-[11px] leading-relaxed text-[#6e6a63]">
        <p>
          La clasificación{" "}
          <span className="font-medium text-[#aa6910]">con matices</span> indica que un dato puede
          ser cierto pero estar exagerado o fuera de contexto. No negamos hechos: los ponemos en
          su justa medida.
        </p>
      </footer>
    </div>
  );
}
