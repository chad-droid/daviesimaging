"use client";

/**
 * DarkSectionBg — animated atmospheric background for `bg-bg-dark` sections.
 *
 * Behaviour:
 *   • Glow starts at a random position on every page load (via useEffect to avoid SSR mismatch)
 *   • Continuously pulses scale 0.75 → 1.3 → 0.75 with a random phase per instance
 *   • Drifts diagonally across the section as the user scrolls past it (Framer useScroll)
 *   • Grids are OFF by default — set showGrid={true} to enable
 *
 * Drop inside any `relative overflow-hidden` dark section, or use the <DarkSection> wrapper
 * which handles the positioning automatically.
 *
 *   <section className="relative overflow-hidden bg-bg-dark py-24">
 *     <DarkSectionBg />
 *     <div className="relative">content</div>   ← inner content needs relative to stack above
 *   </section>
 */

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface DarkSectionBgProps {
  /** Accent opacity for the glow — higher = more visible. Default 6 */
  glowIntensity?: number;
  /** Diameter of the glow source circle before blur (px). Default 650 */
  glowSize?: number;
  /** CSS blur radius (px). Default 130 */
  glowBlur?: number;
  /** Show the hairline grid texture. Default false */
  showGrid?: boolean;
  /** Show the animated radial glow. Default true */
  showGlow?: boolean;
  /** Grid cell size (px). Default 80 */
  gridSize?: number;
  /** Grid opacity (0–1). Default 0.025 */
  gridOpacity?: number;
}

export function DarkSectionBg({
  glowIntensity = 20,
  glowSize = 650,
  glowBlur = 130,
  showGrid = false,
  showGlow = true,
  gridSize = 80,
  gridOpacity = 0.025,
}: DarkSectionBgProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Random origin — computed after mount to avoid SSR hydration mismatch
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const [pulseDuration, setPulseDuration] = useState(5);
  const [pulseDelay, setPulseDelay] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setOrigin({
      x: 15 + Math.random() * 70, // 15–85% from left
      y: 15 + Math.random() * 70, // 15–85% from top
    });
    setPulseDuration(4 + Math.random() * 3); // 4–7 s per cycle
    setPulseDelay(-(Math.random() * 6));     // random phase offset
    setMounted(true);
  }, []);

  // Scroll-linked drift — glow moves diagonally as the section passes the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const xDrift = useTransform(scrollYProgress, [0, 1], ["-22%", "22%"]);
  const yDrift = useTransform(scrollYProgress, [0, 1], ["14%", "-14%"]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {/* ── Layer 1: optional grid ── */}
      {showGrid && (
        <div
          className="absolute inset-0"
          style={{
            opacity: gridOpacity,
            backgroundImage: [
              `repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent ${gridSize}px)`,
              `repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent ${gridSize}px)`,
            ].join(","),
          }}
        />
      )}

      {/* ── Layer 2: animated glow ── */}
      {showGlow && mounted && (
        // Outer motion.div: scroll-linked position drift
        <motion.div
          style={{
            position: "absolute",
            left: `${origin.x}%`,
            top: `${origin.y}%`,
            x: xDrift,
            y: yDrift,
          }}
        >
          {/* Inner motion.div: continuous pulse. The glow is painted as a
              radial-gradient that fades to fully transparent at ~70% of
              the radius — this eliminates the visible hard edge / "band"
              that a solid circle + CSS blur produced when the sized
              circle was larger than the section and got clipped by
              overflow-hidden. Gradients fade to alpha 0 naturally, so
              clipping happens at transparent pixels and is invisible. */}
          <motion.div
            animate={{ scale: [0.75, 1.3, 0.75] }}
            transition={{
              duration: pulseDuration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: pulseDelay,
            }}
            style={{
              width: glowSize * 1.4,
              height: glowSize * 1.4,
              borderRadius: "50%",
              translateX: "-50%",
              translateY: "-50%",
              backgroundImage: `radial-gradient(circle, color-mix(in srgb, var(--accent) ${glowIntensity}%, transparent) 0%, color-mix(in srgb, var(--accent) ${Math.round(glowIntensity * 0.4)}%, transparent) 28%, transparent 68%)`,
              filter: `blur(${Math.round(glowBlur * 0.4)}px)`,
            }}
          />
        </motion.div>
      )}
    </div>
  );
}
