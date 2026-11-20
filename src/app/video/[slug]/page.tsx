import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ClaimCard from "@/components/ClaimCard";
import VideoConclusion from "@/components/VideoConclusion";
import VideoHeader from "@/components/VideoHeader";
import data from "@/data/videos.json";
import { parseConclusion } from "@/lib/conclusion";
import type { SiteData } from "@/lib/types";
import { videoOverall } from "@/lib/verdicts";

const site = data as SiteData;

export function generateStaticParams() {
  return site.videos.map((video) => ({ slug: video.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const video = site.videos.find((v) => v.slug === slug);
  if (!video) return {};
  const { title } = parseConclusion(video.conclusion);
  const overall = videoOverall(video);
  return {
    title: `${title ?? video.title} · Desmentidor`,
    description: `Veredicto: ${overall.label}. ${video.claims.length} datos revisados del video de @${video.uploader}.`,
  };
}

export default async function VideoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const video = site.videos.find((v) => v.slug === slug);
  if (!video) notFound();
  const overall = videoOverall(video);

  return (
    <>
      <Link className="back" href="/">
        ← Todos los videos
      </Link>

      <VideoHeader video={video} />

      <div className="sec-h rv">
        <h2>
          <span>Dato por dato</span>
        </h2>
        <p>Toca cada dato para abrirlo</p>
      </div>
      {video.claims.map((claim) => (
        <ClaimCard key={claim.id} claim={claim} />
      ))}

      {video.conclusion ? (
        <VideoConclusion text={video.conclusion} label={overall.label} color={overall.color} />
      ) : null}
    </>
  );
}
