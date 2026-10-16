import type { VerdictColor, Video } from "./types";

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

interface ColorStyle {
  dot: string;
  pill: string;
  border: string;
  text: string;
  soft: string;
}

export const COLOR_STYLE: Record<VerdictColor, ColorStyle> = {
  green: {
    dot: "bg-emerald-500",
    pill: "bg-emerald-500/15 text-emerald-700 ring-emerald-600/25",
    border: "border-emerald-500/30",
    text: "text-emerald-700",
    soft: "bg-emerald-50",
  },
  lime: {
    dot: "bg-lime-500",
    pill: "bg-lime-500/15 text-lime-700 ring-lime-600/25",
    border: "border-lime-500/30",
    text: "text-lime-700",
    soft: "bg-lime-50",
  },
  orange: {
    dot: "bg-amber-500",
    pill: "bg-amber-500/15 text-amber-700 ring-amber-600/25",
    border: "border-amber-500/30",
    text: "text-amber-700",
    soft: "bg-amber-50",
  },
  red: {
    dot: "bg-rose-500",
    pill: "bg-rose-500/15 text-rose-700 ring-rose-600/25",
    border: "border-rose-500/30",
    text: "text-rose-700",
    soft: "bg-rose-50",
  },
};

export function colorStyle(color: VerdictColor): ColorStyle {
  return COLOR_STYLE[color] ?? COLOR_STYLE.orange;
}

/**
 * Color global del video (para pintar el titulo): verde si es un video verificado,
 * si no, la categoria dominante entre sus datos. Empates se resuelven hacia el lado
 * mas critico (rojo > naranja > lima > verde).
 */
export function videoVerdictColor(video: Video): VerdictColor {
  if (
    video.conclusionColor &&
    ["green", "lime", "orange", "red"].includes(video.conclusionColor)
  ) {
    return video.conclusionColor;
  }
  if ((video.verdict || "").toLowerCase() === "verdadero") return "green";
  const counts: Record<VerdictColor, number> = { green: 0, lime: 0, orange: 0, red: 0 };
  for (const c of video.claims) {
    if (c.color in counts) counts[c.color] += 1;
  }
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

/** Etiqueta + color del veredicto general del video (explicito si existe). */
export function videoOverall(video: Video): { label: string; color: VerdictColor } {
  const color = videoVerdictColor(video);
  if (video.conclusionLabel) return { label: video.conclusionLabel, color };
  if ((video.verdict || "").toLowerCase() === "verdadero") {
    return { label: "Verdadero", color: "green" };
  }
  return { label: INFER_LABEL[color], color };
}

/**
 * Paleta del rediseno "Revista": clases Tailwind para el color de cada veredicto.
 * (tag = etiqueta de veredicto; cell = celda de la matriz numerica; solid = marca/dot/numero).
 */
export const REV: Record<
  VerdictColor,
  { solid: string; tag: string; cellBox: string; cellNum: string; quote: string; soft: string }
> = {
  green: {
    solid: "bg-[#17875f]",
    tag: "bg-[#e4f0e9] text-[#176746]",
    cellBox: "bg-[#f2f7f3] border-l-[3px] border-l-[#17875f]",
    cellNum: "text-[#17875f]",
    quote: "border-[#17875f]",
    soft: "bg-[#f2f7f3]",
  },
  lime: {
    solid: "bg-[#83a72c]",
    tag: "bg-[#eef2dd] text-[#61751d]",
    cellBox: "bg-[#f5f7ec] border-l-[3px] border-l-[#83a72c]",
    cellNum: "text-[#6e8d20]",
    quote: "border-[#83a72c]",
    soft: "bg-[#f5f7ec]",
  },
  orange: {
    solid: "bg-[#d5891e]",
    tag: "bg-[#f6ead5] text-[#965b12]",
    cellBox: "bg-[#fcf6ed] border-l-[3px] border-l-[#d5891e]",
    cellNum: "text-[#aa6910]",
    quote: "border-[#d5891e]",
    soft: "bg-[#fcf6ed]",
  },
  red: {
    solid: "bg-[#c43e55]",
    tag: "bg-[#f5e1e3] text-[#a33143]",
    cellBox: "bg-[#fcf2f2] border-l-[3px] border-l-[#c43e55]",
    cellNum: "text-[#b9384f]",
    quote: "border-[#c43e55]",
    soft: "bg-[#fcf2f2]",
  },
};

export function revStyle(color: VerdictColor) {
  return REV[color] ?? REV.orange;
}
