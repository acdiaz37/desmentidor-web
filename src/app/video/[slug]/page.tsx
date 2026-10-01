import Link from "next/link";
import { notFound } from "next/navigation";
import ClaimCard from "@/components/ClaimCard";
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
    <div className="mx-auto w-full max-w-4xl px-4 pb-16 pt-8 sm:px-6">
      <header className="mb-6">
        <Link href="/" className="mb-3 inline-flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-sm font-black text-white">
            D
          </span>
          <span className="text-sm font-bold uppercase tracking-widest text-zinc-900">Desmentidor</span>
        </Link>
        <Link
          href="/"
          className="block text-[11px] font-medium text-zinc-500 transition hover:text-zinc-900"
        >
          ← Volver a todos los videos
        </Link>
      </header>

      <div className="space-y-3">
        <VideoHeader video={video} />

        <div className="flex items-center justify-between px-1 pt-1">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
            Datos detectados ({video.claims.length})
          </h3>
          <span className="text-[11px] text-zinc-400">Toca un dato para ver el desmentido</span>
        </div>

        {video.claims.map((claim) => (
          <ClaimCard key={claim.id} claim={claim} />
        ))}
      </div>

      <footer className="mt-10 border-t border-zinc-200 pt-4 text-[11px] leading-relaxed text-zinc-400">
        <p>
          La clasificación{" "}
          <span className="font-medium text-amber-600">con matices</span> indica que un dato puede
          ser cierto pero estar exagerado o fuera de contexto. No negamos hechos: los ponemos en
          su justa medida.
        </p>
      </footer>
    </div>
  );
}
