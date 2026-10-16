export default function VerdictBadge({
  verdict,
  className = "",
}: {
  verdict?: string;
  className?: string;
}) {
  if (verdict !== "verdadero") return null;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-emerald-500 px-2.5 py-1 text-[11px] font-bold text-white shadow-sm ${className}`}
    >
      <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
        <path
          fillRule="evenodd"
          d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 0 1 1.4-1.4l3.8 3.8 6.8-6.8a1 1 0 0 1 1.4 0Z"
          clipRule="evenodd"
        />
      </svg>
      Verdadero
    </span>
  );
}
