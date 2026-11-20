import { CATEGORIES, type Counts } from "@/lib/verdicts";

/** Conteo por categoría: número + etiqueta + franja de color. Siempre las 4, en el mismo orden. */
export default function Matrix({ counts, countUp = false }: { counts: Counts; countUp?: boolean }) {
  return (
    <div className="matrix">
      {CATEGORIES.map((cat, i) => (
        <div key={cat.key} data-v={cat.key} style={{ "--i": i } as React.CSSProperties}>
          <b {...(countUp ? { "data-n": counts[cat.key], "data-delay": 500 } : {})}>{counts[cat.key]}</b>
          <span>{cat.label}</span>
        </div>
      ))}
    </div>
  );
}
