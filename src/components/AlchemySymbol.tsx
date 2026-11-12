export type ElementKey = "fire" | "water" | "earth" | "air";

/**
 * Símbolos alquímicos clásicos de los cuatro elementos:
 * fuego △ · agua ▽ · aire △ con barra · tierra ▽ con barra.
 */
export function AlchemySymbol({ el, className }: { el: ElementKey; className?: string }) {
  const up = el === "fire" || el === "air";
  const tri = up ? "M50 8 L94 88 L6 88 Z" : "M6 12 L94 12 L50 92 Z";
  const bar = el === "air" ? "M22 60 L78 60" : el === "earth" ? "M22 40 L78 40" : null;
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" aria-hidden="true">
      <path d={tri} pathLength={400} />
      {bar && <path d={bar} pathLength={400} />}
    </svg>
  );
}
