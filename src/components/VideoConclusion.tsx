import { parseConclusion } from "@/lib/conclusion";
import type { VerdictColor } from "@/lib/types";

/**
 * Conclusión general: siempre completa y sin contraer, al final de la página.
 * El color (franja, sello, sombra y subrayado) es el del veredicto general.
 */
export default function VideoConclusion({
  text,
  label,
  color,
}: {
  text: string;
  label: string;
  color: VerdictColor;
}) {
  const { title, body } = parseConclusion(text);
  if (!title && body.length === 0) return null;

  return (
    <section className="concl rv" id="conclusion" data-v={color}>
      <div className="concl-top">
        <span className="k">Conclusión general</span>
        <span className="cstamp">
          Veredicto: <b>{label}</b>
        </span>
      </div>
      <div className="concl-in">
        <h2>
          <span>{title ?? "La narrativa del video, en conjunto"}</span>
        </h2>
        <div className="cols">
          {body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
