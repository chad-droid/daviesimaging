"use client";

import { useEffect, useRef, useState } from "react";

interface Stat {
  value: number;
  suffix: string;
  prefix: string;
  label: string;
  sublabel: string;
  accent: string;
}

const stats: Stat[] = [
  {
    value: 24,
    prefix: "",
    suffix: "+",
    label: "Markets",
    sublabel: "Nationwide",
    accent: "#6A5ACD",
  },
  {
    value: 14,
    prefix: "",
    suffix: "",
    label: "Day Avg.",
    sublabel: "DOM Reduction",
    accent: "#4CAF50",
  },
  {
    value: 258,
    prefix: "",
    suffix: "",
    label: "Communities",
    sublabel: "Photographed in 2025",
    accent: "#6A5ACD",
  },
];

function AnimatedCounter({ value, prefix, suffix }: { value: number; prefix: string; suffix: string }) {
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
          const duration = 2000;
          const startTime = performance.now();

          function tick(now: number) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * value));
            if (progress < 1) requestAnimationFrame(tick);
          }

          requestAnimationFrame(tick);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

function CircularProgress({ value, max, accent, children }: { value: number; max: number; accent: string; children: React.ReactNode }) {
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const startTime = performance.now();
          const target = (value / max) * 100;

          function tick(now: number) {
            const elapsed = now - startTime;
            const p = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setProgress(eased * target);
            if (p < 1) requestAnimationFrame(tick);
          }

          requestAnimationFrame(tick);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, max]);

  const circumference = 2 * Math.PI * 54;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div ref={ref} className="relative inline-flex items-center justify-center">
      <svg width="140" height="140" className="-rotate-90">
        {/* Background track */}
        <circle
          cx="70" cy="70" r="54"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          className="text-border-light"
        />
        {/* Progress arc */}
        <circle
          cx="70" cy="70" r="54"
          fill="none"
          stroke={accent}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: "stroke-dashoffset 0.1s ease-out" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
}

export function StatsStrip() {
  const maxValues = [30, 30, 300]; // denominators for the circular progress

  return (
    <section className="bg-bg-dark py-20">
      <p className="mb-12 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-accent-secondary">
        By the Numbers
      </p>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-6 sm:grid-cols-3 sm:gap-4">
        {stats.map((stat, i) => (
          <div key={stat.label} className="flex flex-col items-center text-center">
            <CircularProgress value={stat.value} max={maxValues[i]} accent={stat.accent}>
              <p className="text-3xl font-semibold tracking-tight text-text-light lg:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>
                <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </p>
            </CircularProgress>
            <p className="mt-4 text-sm font-semibold uppercase tracking-widest text-text-light">
              {stat.label}
            </p>
            <p className="mt-1 text-xs text-accent-secondary">
              {stat.sublabel}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
