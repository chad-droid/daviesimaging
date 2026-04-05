"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useEditableSlot } from "@/lib/useEditableSlot";

// ─────────────────────────────────────────────────────────────────────────────
// 48 hrs — animated clock
// Minute hand sweeps once; hour hand advances to ~2 o'clock (48 hrs = 2 days)
// ─────────────────────────────────────────────────────────────────────────────
function ClockGraphic({ animate }: { animate: boolean }) {
  const cx = 32, cy = 32, r = 28;

  return (
    <svg width="64" height="64" viewBox="0 0 64 64" className="text-accent" aria-hidden="true">
      {/* Face */}
      <circle cx={cx} cy={cy} r={r} stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" fill="none" />

      {/* 12 tick marks */}
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i * 30 - 90) * (Math.PI / 180);
        const isMain = i % 3 === 0;
        const inner = r - (isMain ? 7 : 4);
        return (
          <line
            key={i}
            x1={cx + inner * Math.cos(angle)}
            y1={cy + inner * Math.sin(angle)}
            x2={cx + (r - 1) * Math.cos(angle)}
            y2={cy + (r - 1) * Math.sin(angle)}
            stroke={isMain ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)"}
            strokeWidth={isMain ? 2 : 1}
            strokeLinecap="round"
          />
        );
      })}

      {/* Hour hand — rotates to 60° (2 o'clock = 48 hrs) */}
      <line
        x1={cx}
        y1={cy}
        x2={cx}
        y2={cy - r * 0.55}
        stroke="rgba(255,255,255,0.45)"
        strokeWidth="2.5"
        strokeLinecap="round"
        style={{
          transformOrigin: `${cx}px ${cy}px`,
          transform: animate ? "rotate(60deg)" : "rotate(0deg)",
          transition: animate ? "transform 1.8s cubic-bezier(0.22,1,0.36,1) 0s" : "none",
        }}
      />

      {/* Minute hand — sweeps full 360° */}
      <line
        x1={cx}
        y1={cy}
        x2={cx}
        y2={cy - r * 0.77}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        style={{
          transformOrigin: `${cx}px ${cy}px`,
          transform: animate ? "rotate(360deg)" : "rotate(0deg)",
          transition: animate ? "transform 1.8s cubic-bezier(0.22,1,0.36,1) 0s" : "none",
        }}
      />

      {/* Center cap */}
      <circle cx={cx} cy={cy} r="2.5" fill="currentColor" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 14 days — calendar counting backwards
// 14 day cells animate with strikethrough sequentially — showing days saved
// ─────────────────────────────────────────────────────────────────────────────
function CalendarGraphic({ animate }: { animate: boolean }) {
  // 14 cells: shows days 14 → 1, each getting crossed off as animation runs
  const DAYS = Array.from({ length: 14 }, (_, i) => 14 - i); // [14,13,...,1]
  const DURATION_EACH = 110; // ms per cell

  return (
    <div className="flex flex-col items-center gap-1">
      {/* Calendar header */}
      <div className="flex h-5 w-full items-center justify-center rounded-t-md bg-accent/25 px-2">
        <span className="text-[8px] font-bold uppercase tracking-widest text-accent/80">Days Saved</span>
      </div>

      {/* Grid: 2 rows of 7 */}
      <div className="grid grid-cols-7 gap-[3px]">
        {DAYS.map((day, i) => (
          <div
            key={day}
            className="relative flex h-[22px] w-[22px] items-center justify-center rounded transition-colors duration-200"
            style={{
              backgroundColor: animate ? "rgba(106,90,205,0.18)" : "rgba(255,255,255,0.05)",
              transitionDelay: animate ? `${i * DURATION_EACH}ms` : "0s",
            }}
          >
            <span
              className="relative text-[8px] font-semibold transition-colors duration-200"
              style={{
                color: animate ? "rgba(106,90,205,0.6)" : "rgba(255,255,255,0.2)",
                transitionDelay: animate ? `${i * DURATION_EACH}ms` : "0s",
              }}
            >
              {day}
            </span>
            {/* Strikethrough */}
            <span
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
              aria-hidden="true"
            >
              <span
                className="block h-px bg-accent/50 origin-left"
                style={{
                  width: animate ? "14px" : "0px",
                  transition: animate
                    ? `width 0.2s ease ${i * DURATION_EACH + 120}ms`
                    : "none",
                }}
              />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// $600 — price breakdown with savings callout
// ─────────────────────────────────────────────────────────────────────────────
function PackageBreakdown({ animate }: { animate: boolean }) {
  const components = [
    { label: "Photography",     price: "$450" },
    { label: "Virtual Staging", price: "$250" },
    { label: "Virtual Video",   price: "$200" },
  ];

  return (
    <div className="flex w-full max-w-[200px] flex-col gap-1.5">
      {components.map((item, i) => (
        <div key={item.label} className="flex items-center gap-2">
          {/* Bar */}
          <div className="relative h-[5px] flex-1 overflow-hidden rounded-full bg-white/5">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-accent/50 origin-left"
              style={{
                transform: animate ? "scaleX(1)" : "scaleX(0)",
                transition: animate
                  ? `transform 0.45s cubic-bezier(0.22,1,0.36,1) ${i * 140 + 60}ms`
                  : "none",
              }}
            />
          </div>
          {/* Label + price */}
          <div
            className="flex w-[115px] shrink-0 items-center justify-between transition-opacity duration-300"
            style={{ opacity: animate ? 1 : 0, transitionDelay: animate ? `${i * 140 + 100}ms` : "0s" }}
          >
            <span className="text-[8px] uppercase tracking-widest text-white/30">{item.label}</span>
            <span className="text-[9px] font-mono text-white/30 line-through">{item.price}</span>
          </div>
        </div>
      ))}

      {/* Savings badge */}
      <div
        className="mt-1 flex items-center justify-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 transition-all duration-500"
        style={{ opacity: animate ? 1 : 0, transitionDelay: animate ? "600ms" : "0s" }}
      >
        <svg viewBox="0 0 12 12" className="h-3 w-3 flex-shrink-0 text-accent" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M1.5 10.5l9-9M4.5 1.5h-3v3M10.5 7.5v3h-3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-[10px] font-bold tracking-widest text-accent">SAVE $300</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Animated counter
// ─────────────────────────────────────────────────────────────────────────────
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
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Stat cell
// ─────────────────────────────────────────────────────────────────────────────
function StatCell({ slotIndex }: { slotIndex: number }) {
  const [active, setActive] = useState(false);

  const DEFAULTS = [
    { value: "48",  prefix: "",  suffix: " hrs", label: "Spec+ Delivery",  sublabel: "Shoot to published assets",         graphic: "clock"    },
    { value: "14",  prefix: "",  suffix: " days",label: "Faster to Sold",   sublabel: "Avg. DOM reduction with DIG assets", graphic: "calendar" },
    { value: "600", prefix: "$", suffix: "",      label: "Complete Package", sublabel: "Photography, staging, and video",    graphic: "package"  },
  ][slotIndex];

  const fields = [
    { key: "value",    label: "Numeric value",      type: "text" as const, defaultValue: DEFAULTS.value },
    { key: "prefix",   label: "Prefix (e.g. $)",    type: "text" as const, defaultValue: DEFAULTS.prefix },
    { key: "suffix",   label: "Suffix (e.g. hrs)",  type: "text" as const, defaultValue: DEFAULTS.suffix },
    { key: "label",    label: "Label",              type: "text" as const, defaultValue: DEFAULTS.label },
    { key: "sublabel", label: "Descriptor",         type: "text" as const, defaultValue: DEFAULTS.sublabel },
  ];

  const { v, editOverlay } = useEditableSlot(`stats-strip-stat-${slotIndex + 1}`, fields);
  const numericValue = parseInt(v.value) || parseInt(DEFAULTS.value);

  return (
    <div className="relative flex flex-col items-center px-6 py-10 text-center sm:py-0 first:pt-0 last:pb-0 sm:first:pt-0 sm:last:pb-0">
      {editOverlay}

      {/* Graphic — fixed height so numerals align across all three cells */}
      <div className="flex h-[90px] w-full items-center justify-center">
        {DEFAULTS.graphic === "clock"    && <ClockGraphic    animate={active} />}
        {DEFAULTS.graphic === "calendar" && <CalendarGraphic animate={active} />}
        {DEFAULTS.graphic === "package"  && <PackageBreakdown animate={active} />}
      </div>

      {/* Large editorial numeral */}
      <p
        className="mt-6 text-[4.5rem] font-semibold leading-none tracking-tight text-text-light lg:text-[5.5rem] 2xl:text-[6.5rem]"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        <AnimatedCounter
          value={numericValue}
          prefix={v.prefix}
          suffix={v.suffix}
          onStart={() => setActive(true)}
        />
      </p>

      {/* Accent rule */}
      <div
        className="mt-5 h-px bg-accent"
        style={{
          width: active ? "3rem" : "0px",
          transition: active ? "width 0.8s cubic-bezier(0.22,1,0.36,1) 0.4s" : "none",
        }}
      />

      {/* Label */}
      <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.15em] text-text-light">
        {v.label}
      </p>

      {/* Descriptor */}
      <p className="mt-1.5 text-xs leading-snug text-text-muted">{v.sublabel}</p>

      {/* Explore Spec+ CTA — only on the $600 column */}
      {slotIndex === 2 && (
        <Link
          href="/programs/spec-plus"
          className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-5 py-2 text-[11px] font-semibold text-accent transition-all hover:border-accent hover:bg-accent/20"
          style={{ opacity: active ? 1 : 0, transition: active ? "opacity 0.5s ease 1.2s" : "none" }}
        >
          Explore Spec+
          <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M2 6h8M7 3l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main export
// ─────────────────────────────────────────────────────────────────────────────
export function StatsStrip() {
  return (
    <section className="bg-bg-dark py-20">
      <p className="mb-14 text-center text-xs font-bold uppercase tracking-[0.2em] text-text-muted">
        Best Value in Homebuilding
      </p>

      <div className="mx-auto grid max-w-5xl grid-cols-1 divide-y divide-white/8 px-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {[0, 1, 2].map((i) => (
          <StatCell key={i} slotIndex={i} />
        ))}
      </div>
    </section>
  );
}
