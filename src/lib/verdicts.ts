import type { VerdictColor } from "./types";

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
