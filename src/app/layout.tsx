import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import Link from "next/link";
import Motion from "@/components/Motion";
import "./globals.css";

const bebas = Bebas_Neue({ variable: "--font-bebas", weight: "400", subsets: ["latin"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Desmentidor · Desmintiendo lo viral",
  description:
    "Que sea viral no significa que sea cierto. Revisamos dato por dato videos de TikTok, Instagram, Facebook, YouTube y X con cifras, fuentes y contexto.",
};

// Activa las animaciones de entrada antes del primer pintado (evita parpadeos).
// Si JS falla o el usuario pidió reducir movimiento, todo se ve sin animar.
const ANIM_BOOT =
  "try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('anim')}catch(e){}";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${bebas.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: ANIM_BOOT }} />
      </head>
      <body>
        <header className="site-header">
          <div className="wrap">
            <Link className="brand" href="/" aria-label="Desmentidor, inicio">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/mark-white.png" alt="" width={133} height={103} />
              <i className="slash" />
              <span>DESMENTIDOR</span>
            </Link>
            <nav className="site-nav">
              <Link href="/">Videos</Link>
            </nav>
          </div>
        </header>
        <main className="wrap">{children}</main>
        <footer className="site-footer">
          <div className="wrap">
            <p>
              Cada dato se contrasta con fuentes verificables y se clasifica en mayormente
              verdadero, a medias, con matices o falso. Un dato puede ser cierto y aun así estar
              fuera de contexto: lo ponemos en su justa medida.
            </p>
            <div className="pixels" aria-hidden="true">
              <i /><i /><i /><i /><i /><i />
            </div>
          </div>
        </footer>
        <Motion />
      </body>
    </html>
  );
}
