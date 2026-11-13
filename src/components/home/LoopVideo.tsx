"use client";

import { useEffect, useRef } from "react";

interface LoopVideoProps {
  src: string;
  poster: string;
  className?: string;
  /** Set false to hold on the poster (e.g. a slide that is not showing). */
  active?: boolean;
}

/**
 * Silent ambient loop that only decodes while it is on screen. Visitors who
 * ask for reduced motion get the poster.
 */
export function LoopVideo({ src, poster, className = "", active = true }: LoopVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const inView = useRef(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sync = () => {
      if (inView.current && active && !reduce) v.play().catch(() => {});
      else v.pause();
    };
    const io = new IntersectionObserver(
      ([e]) => {
        inView.current = e.isIntersecting;
        sync();
      },
      { threshold: 0.4 },
    );
    io.observe(v);
    sync();
    return () => io.disconnect();
  }, [active]);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden
      className={className}
    />
  );
}
