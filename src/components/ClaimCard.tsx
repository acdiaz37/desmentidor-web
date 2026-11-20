"use client";

import { useId, useState } from "react";
import type { Claim } from "@/lib/types";
import { claimVerdictText, safeColor } from "@/lib/verdicts";
import SourcePreview from "./SourcePreview";

function Section({ title, lead, children }: { title: string; lead?: boolean; children: React.ReactNode }) {
  return (
    <div className={lead ? "sec lead" : "sec"}>
      <h4>{title}</h4>
      {children}
    </div>
  );
}

/**
 * Un dato del video. Cerrado muestra número, veredicto, tema, confianza, la afirmación
 * y un avance del desmentido; abierto muestra TODOS los campos (ver DISENO.md).
 */
export default function ClaimCard({ claim }: { claim: Claim }) {
  const [open, setOpen] = useState(false);
  const bodyId = useId();
  const color = safeColor(claim.color);

  // Índices para escalonar la entrada de cada bloque al abrir.
  let i = 0;
  const idx = () => ({ "--i": i++ } as React.CSSProperties);

  return (
    <article className={open ? "claim open" : "claim"} data-v={color}>
      <button
        type="button"
        className="claim-head"
        aria-expanded={open}
        aria-controls={bodyId}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="num">{claim.id}</span>
        <div>
          <span className="vtag">{claimVerdictText(claim)}</span>
          <span className="tmeta">
            {[claim.topic, claim.confidence ? `Confianza ${claim.confidence}` : ""].filter(Boolean).join(" · ")}
          </span>
          <h3>{claim.claim}</h3>
          {claim.summary ? <p>{claim.summary}</p> : null}
        </div>
        <span className="tog" aria-hidden="true" />
      </button>

      <div className="claim-fold" id={bodyId}>
        <div inert={!open}>
          <div className="claim-body">
            {claim.quote ? (
              <p className="quote" style={idx()}>
                <span>“{claim.quote}”</span>
              </p>
            ) : null}
            {claim.summary ? (
              <div style={idx()}>
                <Section title="Desmentido" lead>
                  <p>{claim.summary}</p>
                </Section>
              </div>
            ) : null}
            {claim.context ? (
              <div style={idx()}>
                <Section title="Contexto y magnitud real">
                  <p>{claim.context}</p>
                </Section>
              </div>
            ) : null}
            {claim.progressivePerspective ? (
              <div style={idx()}>
                <Section title="Análisis">
                  <p>{claim.progressivePerspective}</p>
                </Section>
              </div>
            ) : null}
            {claim.whatTheyOmit ? (
              <div style={idx()}>
                <Section title="Qué omite el video">
                  <p>{claim.whatTheyOmit}</p>
                </Section>
              </div>
            ) : null}
            {claim.keyFacts.length > 0 ? (
              <div style={idx()}>
                <Section title="Hechos clave">
                  <ul className="facts">
                    {claim.keyFacts.map((fact, j) => (
                      <li key={j} style={{ "--j": j % 4 } as React.CSSProperties}>
                        {fact}
                      </li>
                    ))}
                  </ul>
                </Section>
              </div>
            ) : null}
            {claim.sources.length > 0 ? (
              <div style={idx()}>
                <Section title="Fuentes">
                  <div className="sources">
                    {claim.sources.map((source, j) => (
                      <SourcePreview key={j} source={source} index={j} />
                    ))}
                  </div>
                </Section>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
