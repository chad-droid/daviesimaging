"use client";

import { useEffect, useRef } from "react";

/**
 * Shows that a sideways row has more in it: the first time the row comes on
 * screen it slides a little to the left and back. Only where the row actually
 * overflows, only once, and never for visitors who ask for reduced motion or
 * who have already moved it themselves.
 */
export function useSwipeHint<T extends HTMLElement>(ref: React.RefObject<T | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timers: number[] = [];
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        if (el.scrollWidth <= el.clientWidth + 8 || el.scrollLeft > 0) return;
        // Snap points would pull a small scroll straight back, so they are
        // switched off for the length of the hint.
        const snap = el.style.scrollSnapType;
        el.style.scrollSnapType = "none";
        timers = [
          window.setTimeout(() => el.scrollTo({ left: 84, behavior: "smooth" }), 350),
          window.setTimeout(() => el.scrollTo({ left: 0, behavior: "smooth" }), 1050),
          window.setTimeout(() => {
            el.style.scrollSnapType = snap;
          }, 1750),
        ];
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [ref]);
}

/** A row that swipes sideways on phones and hints that it does. Pass the layout in `className`. */
export function SwipeRow({ className = "", children }: { className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useSwipeHint(ref);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
