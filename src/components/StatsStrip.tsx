"use client";

import { useEffect, useRef, useState } from "react";

// ─────────────────────────────────────────────
// Stat definitions
// ─────────────────────────────────────────────
const stats = [
  {
    value: 48,
    suffix: " hrs",
    prefix: "",
    label: "Spec+ Delivery",
    sublabel: "Shoot to published assets",
    graphic: "timeline",
  },
  {
    value: 14,
    suffix: " days",
    prefix: "",
    label: "Faster to Sold",
    sublabel: "Avg. DOM reduction with DIG assets",
    graphic: "bars",
  },
  {
    value: 600,
    suffix: "",
    prefix: "$",
    label: "Complete Package",
    sublabel: "Photography, staging, and video",
    graphic: "layers",
  },
];

// ─────────────────────────────────────────────
// 48 hrs — animated delivery timeline rail
// A glowing dot races from "Shoot" to "Deliver"
// ─────────────────────────────────────────────
function TimelineGraphic({ animate }: { animate: boolean }) {
  const steps = ["Shoot", "Edit", "Stage", "Deliver"];
  const dotPos = animate ? 100 : 0; // percent along the rail

  return (
    <div className="flex w-full flex-col items-center gap-3 px-2">
      {/* Rail */}
      <div className="relative flex w-full max-w-[200px] items-center">
        {/* Track background */}
        <div className="absolute inset-y-0 left-0 right-0 my-auto h-px bg-white/10" />

        {/* Animated fill */}
        <div
          className="absolute inset-y-0 left-0 my-auto h-px bg-accent origin-left"
          style={{
            width: `${dotPos}%`,
            transition: animate ? "width 1.1s cubic-bezier(0.22,1,0.36,1) 0.1s" : "none",
          }}
        />

        {/* Tick marks + glowing dot at end */}
        {steps.map((_, i) => {
          const pct = (i / (steps.length - 1)) * 100;
          const isActive = animate && dotPos >= pct;
          const isLast = i === steps.length - 1;
          return (
            <div
              key={i}
              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${pct}%` }}
            >
              {isLast && animate ? (
                /* Glowing pulse at delivery point */
                <div className="relative flex items-center justify-center">
                  <div
                    className="absolute h-4 w-4 rounded-full bg-accent opacity-20"
                    style={{
                      animation: animate ? "ping 1.5s cubic-bezier(0,0,0.2,1) infinite 1.2s" : "none",
                    }}
                  />
                  <div className="h-2 w-2 rounded-full bg-accent shadow-[0_0_8px_rgba(var(--accent-rgb,79,70,229),0.8)]" />
                </div>
              ) : (
                <div
                  className="h-1.5 w-1.5 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: isActive ? "var(--accent)" : "rgba(255,255,255,0.2)",
                    transitionDelay: isActive ? `${(pct / 100) * 1.1}s` : "0s",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Step labels */}
      <div className="flex w-full max-w-[200px] justify-between">
        {steps.map((step, i) => (
          <span
            key={step}
            className="text-[9px] uppercase tracking-widest transition-colors duration-300"
            style={{
              color: animate && (i / (steps.length - 1)) * 100 <= dotPos
                ? "rgba(255,255,255,0.5)"
                : "rgba(255,255,255,0.15)",
              transitionDelay: animate ? `${(i / (steps.length - 1)) * 1.1 + 0.1}s` : "0s",
            }}
          >
            {step}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// 14 days — before/after bar comparison
// Industry avg vs DIG, with 2× delta label
// ─────────────────────────────────────────────
function BarsGraphic({ animate }: { animate: boolean }) {
  const industryH = 64; // px, "~28 days industry avg"
  const digH = 32;      // px, "~14 days with DIG"

  return (
    <div className="flex items-end justify-center gap-6">
      {/* Industry avg bar */}
      <div className="flex flex-col items-center gap-2">
        <span
          className="text-[9px] uppercase tracking-widest text-white/20 transition-opacity duration-500"
          style={{ opacity: animate ? 1 : 0, transitionDelay: animate ? "0.9s" : "0s" }}
        >
          Industry
        </span>
        <div className="relative w-8 overflow-hidden rounded-sm bg-white/5">
          <div
            className="w-full bg-white/15 rounded-sm transition-all duration-700 ease-out"
            style={{
              height: animate ? industryH : 0,
              transitionDelay: animate ? "0.15s" : "0s",
            }}
          />
          {/* height placeholder so layout doesn't jump */}
          <div style={{ height: industryH }} className="absolute inset-0 opacity-0" />
        </div>
      </div>

      {/* Delta label */}
      <div
        className="mb-8 flex flex-col items-center gap-1 transition-opacity duration-400"
        style={{ opacity: animate ? 1 : 0, transitionDelay: animate ? "0.85s" : "0s" }}
      >
        <span className="font-mono text-base font-bold text-accent">2×</span>
        <span className="text-[9px] uppercase tracking-widest text-white/25">faster</span>
      </div>

      {/* DIG bar */}
      <div className="flex flex-col items-center gap-2">
        <span
          className="text-[9px] uppercase tracking-widest text-accent/60 transition-opacity duration-500"
          style={{ opacity: animate ? 1 : 0, transitionDelay: animate ? "0.9s" : "0s" }}
        >
          DIG
        </span>
        <div className="relative w-8 overflow-hidden rounded-sm bg-white/5">
          <div
            className="w-full rounded-sm bg-accent/70 transition-all duration-700 ease-out"
            style={{
              height: animate ? digH : 0,
              transitionDelay: animate ? "0.35s" : "0s",
            }}
          />
          <div style={{ height: industryH }} className="absolute inset-0 opacity-0" />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// $600 — layered value stack
// Photo / Staging / Video build up in sequence
// ─────────────────────────────────────────────
function LayersGraphic({ animate }: { animate: boolean }) {
  const layers = [
    { label: "Photography", width: "100%" },
    { label: "Virtual Staging", width: "82%" },
    { label: "Virtual Video", width: "64%" },
  ];

  return (
    <div className="flex w-full max-w-[190px] flex-col gap-2">
      {layers.map((layer, i) => (
        <div key={layer.label} className="flex items-center gap-3">
          {/* Bar */}
          <div className="relative h-[7px] flex-1 overflow-hidden rounded-full bg-white/5">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-accent/60 origin-left"
              style={{
                width: layer.width,
                transform: animate ? "scaleX(1)" : "scaleX(0)",
                transition: animate
                  ? `transform 0.55s cubic-bezier(0.22,1,0.36,1) ${i * 160 + 80}ms`
                  : "none",
              }}
            />
          </div>
          {/* Label */}
          <span
            className="w-[90px] text-right text-[9px] uppercase tracking-widest transition-opacity duration-300"
            style={{
              color: "rgba(255,255,255,0.25)",
              opacity: animate ? 1 : 0,
              transitionDelay: animate ? `${i * 160 + 200}ms` : "0s",
            }}
          >
            {layer.label}
          </span>
        </div>
      ))}
    </div>
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
function StatCell({ stat }: { stat: (typeof stats)[number] }) {
  const [active, setActive] = useState(false);

  return (
    <div className="flex flex-col items-center px-8 py-10 text-center sm:py-0 first:pt-0 last:pb-0 sm:first:pt-0 sm:last:pb-0">
      {/* Graphic area — fixed height so numerals align */}
      <div className="flex h-[80px] w-full items-center justify-center">
        {stat.graphic === "timeline" && <TimelineGraphic animate={active} />}
        {stat.graphic === "bars" && <BarsGraphic animate={active} />}
        {stat.graphic === "layers" && <LayersGraphic animate={active} />}
      </div>

      {/* Large editorial numeral */}
      <p
        className="mt-6 text-[4.5rem] font-semibold leading-none tracking-tight text-text-light lg:text-[5.5rem] 2xl:text-[6.5rem]"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        <AnimatedCounter
          value={stat.value}
          prefix={stat.prefix}
          suffix={stat.suffix}
          onStart={() => setActive(true)}
        />
      </p>

      {/* Accent rule — expands with counter */}
      <div
        className="mt-5 h-px bg-accent"
        style={{
          width: active ? "3rem" : "0px",
          transition: active ? "width 0.8s cubic-bezier(0.22,1,0.36,1) 0.4s" : "none",
        }}
      />

      {/* Label */}
      <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.15em] text-text-light">
        {stat.label}
      </p>

      {/* Descriptor */}
      <p className="mt-1.5 text-xs leading-snug text-text-muted">{stat.sublabel}</p>
    </div>
  );
}

// ─────────────────────────────────────────────
// Main export
// ─────────────────────────────────────────────
export function StatsStrip() {
  return (
    <section className="bg-bg-dark py-20">
      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
      `}</style>

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
