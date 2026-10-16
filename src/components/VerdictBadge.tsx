import type { VerdictColor } from "@/lib/types";

const BG: Record<VerdictColor, string> = {
  green: "bg-emerald-600",
  lime: "bg-lime-600",
  orange: "bg-amber-600",
  red: "bg-rose-600",
};

const GLYPH: Record<VerdictColor, string> = {
  green: "✓",
  lime: "~",
  orange: "!",
  red: "✕",
};

export default function VerdictBadge({
  label,
  color,
  className = "",
}: {
  label: string;
  color: VerdictColor;
  className?: string;
}) {
  const key: VerdictColor = BG[color] ? color : "orange";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-bold leading-none text-white shadow-md ring-1 ring-white/25 ${BG[key]} ${className}`}
    >
      <span aria-hidden="true" className="text-[12px] leading-none">
        {GLYPH[key]}
      </span>
      {label}
    </span>
  );
}
