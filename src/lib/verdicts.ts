import type { Claim, VerdictColor, Video } from "./types";

/*
 * Sistema de veredictos. Ver DISENO.md (sección "Veredictos").
 *
 * Escala de menos a más grave: verde → ámbar → naranja intenso → rojo.
 * Los colores viven en globals.css como --v-green / --v-lime / --v-orange / --v-red
 * y se aplican con el atributo data-v="<color>" (que define --c para el bloque).
 * La clave "lime" se conserva por compatibilidad con los datos, pero su color es ÁMBAR.
 */

export const VERDICT_LABEL: Record<string, string> = {
  verdadero: "Verdadero",
  mayormente_verdadero: "Mayormente verdadero",
  exagerado: "Exagerado",
  enganoso: "Engañoso",
  engañoso: "Engañoso",
  falso: "Falso",
  sin_evidencia: "Sin evidencia",
  parcialmente_verificable: "Parcialmente verificable",
  opinion: "Opinión",
  error: "Error",
};

export function verdictLabel(verdict: string): string {
  return VERDICT_LABEL[(verdict || "").toLowerCase()] ?? verdict;
}

/** Categorías de conteo, en el orden en que se muestran siempre. */
export const CATEGORIES: { key: VerdictColor; label: string }[] = [
  { key: "green", label: "Mayormente" },
  { key: "lime", label: "A medias" },
  { key: "orange", label: "Con matices" },
  { key: "red", label: "Falsos" },
];

const VALID: VerdictColor[] = ["green", "lime", "orange", "red"];

export function safeColor(color: string | undefined): VerdictColor {
  return VALID.includes(color as VerdictColor) ? (color as VerdictColor) : "orange";
}

export type Counts = Record<VerdictColor, number>;

export function countClaims(claims: Claim[]): Counts {
  const counts: Counts = { green: 0, lime: 0, orange: 0, red: 0 };
  for (const c of claims) counts[safeColor(c.color)] += 1;
  return counts;
}

/** Etiqueta que se muestra para el veredicto de un dato. */
export function claimVerdictText(claim: Claim): string {
  const isPlainTrue = (claim.verdict || "").toLowerCase() === "verdadero";
  return isPlainTrue ? claim.headline || "Verdadero, pero con matices" : verdictLabel(claim.verdict);
}

/**
 * Color global del video: el explícito si existe; verde si es un video verificado;
 * si no, la categoría dominante entre sus datos (empates hacia lo más crítico).
 */
export function videoVerdictColor(video: Video): VerdictColor {
  if (video.conclusionColor && VALID.includes(video.conclusionColor)) {
    return video.conclusionColor;
  }
  if ((video.verdict || "").toLowerCase() === "verdadero") return "green";
  const counts = countClaims(video.claims);
  const priority: VerdictColor[] = ["red", "orange", "lime", "green"];
  let best: VerdictColor = "orange";
  let bestN = -1;
  for (const color of priority) {
    if (counts[color] > bestN) {
      bestN = counts[color];
      best = color;
    }
  }
  return best;
}

const INFER_LABEL: Record<VerdictColor, string> = {
  green: "Mayormente verdadero",
  lime: "A medias",
  orange: "Con matices",
  red: "Falso",
};

/** Etiqueta + color del veredicto general del video (explícito si existe). */
export function videoOverall(video: Video): { label: string; color: VerdictColor } {
  const color = videoVerdictColor(video);
  if (video.conclusionLabel) return { label: video.conclusionLabel, color };
  if ((video.verdict || "").toLowerCase() === "verdadero") {
    return { label: "Verdadero", color: "green" };
  }
  return { label: INFER_LABEL[color], color };
}

export function formatDuration(seconds: number | null): string {
  if (!seconds) return "";
  const s = Math.round(seconds);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}
