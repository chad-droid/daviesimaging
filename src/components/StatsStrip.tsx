"use client";

import { useEffect, useRef, useState } from "react";

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  { value: 24, suffix: "+", label: "Markets Served" },
  { value: 37, suffix: "%", label: "Avg. Days on Market Reduction" },
  { value: 10000, suffix: "+", label: "Homes Photographed" },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1600;
          const startTime = performance.now();

          function tick(now: number) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * value));
            if (progress < 1) requestAnimationFrame(tick);
          }

          requestAnimationFrame(tick);
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export function StatsStrip() {
  return (
    <section className="border-y border-border-light bg-bg-surface py-16">
      <p className="mb-8 text-center text-xs font-bold uppercase tracking-[0.15em] text-accent-secondary">
        By the Numbers
      </p>
      <div className="mx-auto grid max-w-5xl grid-cols-1 divide-y divide-border-light sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {stats.map((stat) => (
          <div key={stat.label} className="px-8 py-10 text-center">
            <p className="text-4xl font-semibold tracking-tight text-text-dark" style={{ fontFamily: "var(--font-heading)" }}>
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="meta-text mt-2">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
