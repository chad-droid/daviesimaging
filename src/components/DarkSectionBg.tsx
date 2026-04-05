/**
 * DarkSectionBg — reusable atmospheric background for `bg-bg-dark` sections
 * with no photo or video assigned.
 *
 * Composed of two layers:
 *   1. Grid texture — repeating-linear-gradient hairline grid at very low opacity
 *   2. Radial glow  — blurred accent-color blob giving a soft ambient light
 *
 * Drop inside any `relative overflow-hidden` dark section:
 *
 *   <section className="relative overflow-hidden bg-bg-dark py-24">
 *     <DarkSectionBg />
 *     <div className="relative ...">content</div>
 *   </section>
 *
 * ─── Tuning guide ────────────────────────────────────────────────────────────
 *
 *  gridSize      (default 80)    — px between grid lines. Larger = coarser grid.
 *  gridOpacity   (default 0.025) — 0–1. 0.02 is barely-there; 0.05 reads clearly.
 *  glowPosition  (default "center") — where the glow sits in the section.
 *  glowIntensity (default 5)    — bg-accent/X. 5 = very subtle, 12 = noticeable.
 *  glowSize      (default 600)  — px diameter of the source circle before blur.
 *  glowBlur      (default 120)  — px CSS blur radius. Higher = softer/wider spread.
 */

type GlowPosition =
  | "center"
  | "top-center"
  | "top-left"
  | "top-right"
  | "bottom-center"
  | "bottom-left"
  | "bottom-right";

interface DarkSectionBgProps {
  gridSize?:      number;
  gridOpacity?:   number;
  glowPosition?:  GlowPosition;
  glowIntensity?: number;
  glowSize?:      number;
  glowBlur?:      number;
  /** Set false to suppress the grid (glow only) */
  showGrid?:      boolean;
  /** Set false to suppress the glow (grid only) */
  showGlow?:      boolean;
}

const POSITION_CLASSES: Record<GlowPosition, string> = {
  "center":        "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
  "top-center":    "left-1/2 top-0 -translate-x-1/2 -translate-y-1/2",
  "top-left":      "left-0 top-0 -translate-x-1/3 -translate-y-1/3",
  "top-right":     "right-0 top-0 translate-x-1/3 -translate-y-1/3",
  "bottom-center": "left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2",
  "bottom-left":   "left-0 bottom-0 -translate-x-1/3 translate-y-1/3",
  "bottom-right":  "right-0 bottom-0 translate-x-1/3 translate-y-1/3",
};

export function DarkSectionBg({
  gridSize      = 80,
  gridOpacity   = 0.025,
  glowPosition  = "center",
  glowIntensity = 5,
  glowSize      = 600,
  glowBlur      = 120,
  showGrid      = true,
  showGlow      = true,
}: DarkSectionBgProps) {
  return (
    <>
      {/* Layer 1 — grid texture */}
      {showGrid && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: gridOpacity,
            backgroundImage: [
              `repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent ${gridSize}px)`,
              `repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent ${gridSize}px)`,
            ].join(","),
          }}
        />
      )}

      {/* Layer 2 — radial glow */}
      {showGlow && (
        <div
          aria-hidden
          className={`pointer-events-none absolute rounded-full ${POSITION_CLASSES[glowPosition]}`}
          style={{
            width:  glowSize,
            height: glowSize,
            backgroundColor: `color-mix(in srgb, var(--accent) ${glowIntensity}%, transparent)`,
            filter: `blur(${glowBlur}px)`,
          }}
        />
      )}
    </>
  );
}
