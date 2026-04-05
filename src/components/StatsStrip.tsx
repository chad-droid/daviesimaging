"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  {
    value: 48,
    suffix: " hrs",
    prefix: "",
    label: "Spec+ Delivery",
    sublabel: "Shoot to published assets",
    icon: "speed",
  },
  {
    value: 14,
    suffix: " days",
    prefix: "",
    label: "Faster to Sold",
    sublabel: "Avg. DOM reduction with DIG assets",
    icon: "trend",
  },
  {
    value: 600,
    suffix: "",
    prefix: "$",
    label: "Complete Package",
    sublabel: "Photography, staging, and video",
    icon: "stack",
  },
];

// ─────────────────────────────────────────────
// Animated SVG icons — line-art, stroke-based
// ─────────────────────────────────────────────

function SpeedIcon({ animate }: { animate: boolean }) {
  // Three rightward speed lines — communicates fast delivery
  return (
    <svg
      width="36"
      height="24"
      viewBox="0 0 36 24"
      fill="none"
      className="text-accent"
      aria-hidden="true"
    >
      {[
        { y: 4, len: 28, delay: 0 },
        { y: 12, len: 36, delay: 80 },
        { y: 20, len: 22, delay: 160 },
      ].map(({ y, len, delay }) => (
        <line
          key={y}
          x1={36 - len}
          y1={y}
          x2="36"
          y2={y}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          style={{
            strokeDasharray: len,
            strokeDashoffset: animate ? 0 : len,
            transition: animate
              ? `stroke-dashoffset 0.55s cubic-bezier(0.22,1,0.36,1) ${delay}ms`
              : "none",
          }}
        />
      ))}
    </svg>
  );
}

function TrendIcon({ animate }: { animate: boolean }) {
  // Downward-stepping trend line — communicates DOM reduction
  const path = "M2 4 L10 4 L10 10 L20 10 L20 16 L30 16 L30 22";
  const totalLen = 66; // approximate path length
  return (
    <svg
      width="32"
      height="26"
      viewBox="0 0 32 26"
      fill="none"
      className="text-accent"
      aria-hidden="true"
    >
      <path
        d={path}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray: totalLen,
          strokeDashoffset: animate ? 0 : totalLen,
          transition: animate
            ? "stroke-dashoffset 0.75s cubic-bezier(0.22,1,0.36,1) 0ms"
            : "none",
        }}
      />
      {/* Arrowhead at end */}
      <polyline
        points="24,22 30,22 30,16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          opacity: animate ? 1 : 0,
          transition: animate ? "opacity 0.2s ease 0.7s" : "none",
        }}
      />
    </svg>
  );
}

function StackIcon({ animate }: { animate: boolean }) {
  // Three stacked bars building up — communicates layered complete package
  return (
    <svg
      width="32"
      height="26"
      viewBox="0 0 32 26"
      fill="none"
      className="text-accent"
      aria-hidden="true"
    >
      {[
        { y: 18, delay: 0 },
        { y: 11, delay: 120 },
        { y: 4, delay: 240 },
      ].map(({ y, delay }, i) => (
        <rect
          key={i}
          x="2"
          y={y}
          width="28"
          height="5"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          style={{
            strokeDasharray: 66,
            strokeDashoffset: animate ? 0 : 66,
            transition: animate
              ? `stroke-dashoffset 0.5s cubic-bezier(0.22,1,0.36,1) ${delay}ms`
              : "none",
          }}
        />
      ))}
    </svg>
  );
}

// ─────────────────────────────────────────────
// Animated counter
// ─────────────────────────────────────────────

function AnimatedCounter({
  value,
  prefix,
  suffix,
  onStart,
}: {
  value: number;
  prefix: string;
  suffix: string;
  onStart?: () => void;
}) {
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
          onStart?.();
          const duration = 1800;
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
  }, [value, onStart]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

// ─────────────────────────────────────────────
// Single stat cell
// ─────────────────────────────────────────────

function StatCell({
  stat,
}: {
  stat: (typeof stats)[number];
}) {
  const [active, setActive] = useState(false);

  const icon =
    stat.icon === "speed" ? (
      <SpeedIcon animate={active} />
    ) : stat.icon === "trend" ? (
      <TrendIcon animate={active} />
    ) : (
      <StackIcon animate={active} />
    );

  return (
    <div className="flex flex-col items-center px-8 py-8 text-center sm:py-0 first:pt-0 last:pb-0 sm:first:pt-0 sm:last:pb-0">
      {/* Animated icon */}
      <div className="mb-5 flex h-8 items-center justify-center opacity-80">
        {icon}
      </div>

      {/* Large editorial numeral */}
      <p
        className="text-[4.5rem] font-semibold leading-none tracking-tight text-text-light lg:text-[5.5rem] 2xl:text-[6.5rem]"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        <AnimatedCounter
          value={stat.value}
          prefix={stat.prefix}
          suffix={stat.suffix}
          onStart={() => setActive(true)}
        />
      </p>

      {/* Accent rule — animates width from 0 to 3rem (w-12) */}
      <div
        className="mt-5 h-px bg-accent"
        style={{
          width: active ? "3rem" : "0px",
          transition: active
            ? "width 0.8s cubic-bezier(0.22,1,0.36,1) 0.4s"
            : "none",
        }}
      />

      {/* Label */}
      <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.15em] text-text-light">
        {stat.label}
      </p>

      {/* Descriptor */}
      <p className="mt-1.5 text-xs leading-snug text-text-muted">
        {stat.sublabel}
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────
// Main export
// ─────────────────────────────────────────────

export function StatsStrip() {
  return (
    <section className="bg-bg-dark py-20">
      <p className="mb-14 text-center text-xs font-bold uppercase tracking-[0.2em] text-text-muted">
        By the Numbers
      </p>

      <div className="mx-auto grid max-w-4xl grid-cols-1 divide-y divide-white/8 px-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {stats.map((stat) => (
          <StatCell key={stat.label} stat={stat} />
        ))}
      </div>
    </section>
  );
}
