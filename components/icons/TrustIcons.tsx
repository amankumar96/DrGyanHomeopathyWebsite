/**
 * Minimal line-art icons for the trust strip (guide §5.1 "Practising since 2003",
 * "BHMS, Lucknow", "Holistic, individualised consultations"). Hand-coded SVG —
 * stroke-only, no fills, consistent stroke width, no text/numbers. Each is sized
 * by its wrapper; color comes from `currentColor` so a parent sets text color.
 */

type IconProps = {
  className?: string;
};

const SHARED = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Leaf wrapped by a partial growth-ring arc — experience / longevity. */
export function ExperienceIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} {...SHARED}>
      <path d="M8,30 A16,16 0 0 1 40,30" />
      <path d="M24,34 C14,30 12,18 24,10 C36,18 34,30 24,34 Z" />
      <path d="M24,13 L24,31" />
    </svg>
  );
}

/** Herbal medicine bowl with a sprig rising from it, small cross accent — BHMS. */
export function QualificationIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} {...SHARED}>
      <path d="M12,22 C12,19 17,17 24,17 C31,17 36,19 36,22" />
      <path d="M12,22 C12,30 18,34 24,34 C30,34 36,30 36,22" />
      <path d="M24,17 L24,9" />
      <path d="M24,13 C20,11 19,8 21,6" />
      <path d="M24,13 C28,11 29,8 27,6" />
      <path d="M32,12 L32,18" strokeWidth={1.3} />
      <path d="M29,15 L35,15" strokeWidth={1.3} />
    </svg>
  );
}

/** Heart with a small leaf growing from its crown — holistic, personalised care. */
export function HolisticIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} {...SHARED}>
      <path d="M24,34 C10,24 10,14 18,12 C21,11 24,13 24,17 C24,13 27,11 30,12 C38,14 38,24 24,34 Z" />
      <path d="M24,12 C22,8 24,4 28,4 C28,8 26,11 24,12 Z" />
    </svg>
  );
}
