'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

// ──────────────────────────────────────────────────────────────
// Constants
// ──────────────────────────────────────────────────────────────
export const TRIAL_URL = 'https://desk.daviesimaging.com/trial';
export const IMG = (file: string) => `/modelmatch/${file}`;

// ──────────────────────────────────────────────────────────────
// Reveal — IntersectionObserver fade + translateY
// ──────────────────────────────────────────────────────────────
export function Reveal({
  children,
  delay = 0,
  style = {},
}: {
  children: ReactNode;
  delay?: number;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Graceful fallback if IntersectionObserver is unavailable
    if (typeof IntersectionObserver === 'undefined') {
      setOn(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: on ? 1 : 0,
        transform: on ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity .6s var(--ease-soft) ${delay}s, transform .6s var(--ease-soft) ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
