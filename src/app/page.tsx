import VideoCard from "@/components/VideoCard";
import data from "@/data/videos.json";
import type { SiteData } from "@/lib/types";
import { CATEGORIES, countClaims } from "@/lib/verdicts";

export default function Home() {
  const site = data as SiteData;
  // Los más nuevos (últimos incorporados) primero.
  const videos = [...site.videos].reverse();
  const counts = countClaims(site.videos.flatMap((v) => v.claims));
  const totalClaims = site.videos.reduce((n, v) => n + v.claims.length, 0);
  const collage = videos.filter((v) => v.thumbnail).slice(0, 4);

  return (
    <>
      <section className="hero">
        <div>
          <h1 className="hero-t slant">
            <span className="ln"><span>Desmintiendo</span></span>
            <br />
            <span className="blk"><span className="ln"><span>lo viral</span></span></span>
          </h1>
          <div className="bars slant" aria-hidden="true"><i /><i /></div>
          <p className="tagline">Que sea viral no significa que sea cierto.</p>
          <p className="lede">
            Millones de vistas no convierten un dato en verdad. Revisamos videos de TikTok,
            Instagram, Facebook, YouTube y X, y contrastamos cada cifra con fuentes y contexto.
          </p>
        </div>
        {collage.length > 0 && (
          <div className="photo" aria-hidden="true">
            <div className="collage">
              {collage.map((v) => (
                <div key={v.slug}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={v.thumbnail} alt="" />
                </div>
              ))}
            </div>
            <span className="tag">
              <small>VIDEOS REVISADOS</small>
              <span data-n={site.videos.length} data-delay={900}>{site.videos.length}</span>
            </span>
          </div>
        )}
      </section>

      <div className="stats">
        <div className="dark" style={{ "--i": 0 } as React.CSSProperties}>
          <b data-n={site.videos.length}>{site.videos.length}</b>
          <span>Videos</span>
        </div>
        <div className="dark" style={{ "--i": 1 } as React.CSSProperties}>
          <b data-n={totalClaims}>{totalClaims}</b>
          <span>Datos</span>
        </div>
        {CATEGORIES.map((cat, k) => (
          <div key={cat.key} data-v={cat.key} style={{ "--i": k + 2 } as React.CSSProperties}>
            <b data-n={counts[cat.key]}>{counts[cat.key]}</b>
            <span>{cat.label}</span>
          </div>
        ))}
      </div>

      <div className="sec-h rv">
        <h2><span>Los videos</span></h2>
        <p>Más recientes primero</p>
      </div>
      <div className="grid">
        {videos.map((video, i) => (
          <div key={video.slug} className="rv" style={{ "--d": `${(i % 2) * 90}ms` } as React.CSSProperties}>
            <VideoCard video={video} />
          </div>
        ))}
      </div>
    </>
  );
}
