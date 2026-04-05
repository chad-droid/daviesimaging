"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useEditableSlot } from "@/lib/useEditableSlot";
import { DarkSectionBg } from "@/components/DarkSectionBg";

// ─────────────────────────────────────────────────────────────────────────────
// Clock — compact, used as right-side accent in the 48-hr cell
// ─────────────────────────────────────────────────────────────────────────────
function ClockGraphic({ animate }: { animate: boolean }) {
  const cx = 28, cy = 28, r = 24;
  return (
    <svg
      width="56" height="56" viewBox="0 0 56 56"
      className="text-accent flex-shrink-0"
      aria-hidden="true"
    >
      <circle cx={cx} cy={cy} r={r} stroke="rgba(255,255,255,0.10)" strokeWidth="1.5" fill="none" />
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i * 30 - 90) * (Math.PI / 180);
        const isMain = i % 3 === 0;
        const inner = r - (isMain ? 6 : 3);
        return (
          <line
            key={i}
            x1={cx + inner * Math.cos(angle)} y1={cy + inner * Math.sin(angle)}
            x2={cx + (r - 1) * Math.cos(angle)} y2={cy + (r - 1) * Math.sin(angle)}
            stroke={isMain ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.08)"}
            strokeWidth={isMain ? 1.5 : 1}
            strokeLinecap="round"
          />
        );
      })}
      {/* Hour hand — rotates to 60° (2 o'clock = 48 hrs) */}
      <line
        x1={cx} y1={cy} x2={cx} y2={cy - r * 0.54}
        stroke="rgba(255,255,255,0.40)" strokeWidth="2" strokeLinecap="round"
        style={{
          transformOrigin: `${cx}px ${cy}px`,
          transform: animate ? "rotate(60deg)" : "rotate(0deg)",
          transition: animate ? "transform 1.8s cubic-bezier(0.22,1,0.36,1) 0s" : "none",
        }}
      />
      {/* Minute hand — sweeps 360° */}
      <line
        x1={cx} y1={cy} x2={cx} y2={cy - r * 0.76}
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
        style={{
          transformOrigin: `${cx}px ${cy}px`,
          transform: animate ? "rotate(360deg)" : "rotate(0deg)",
          transition: animate ? "transform 1.8s cubic-bezier(0.22,1,0.36,1) 0s" : "none",
        }}
      />
      <circle cx={cx} cy={cy} r="2" fill="currentColor" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Calendar — compact 2×7 countdown, used as right-side accent in the 14-day cell
// ─────────────────────────────────────────────────────────────────────────────
function CalendarGraphic({ animate }: { animate: boolean }) {
  const DAYS = Array.from({ length: 14 }, (_, i) => 14 - i);
  const DELAY = 100;
  return (
    <div className="flex flex-col items-center gap-1 flex-shrink-0">
      <div className="flex h-4 w-full items-center justify-center rounded-t bg-accent/20 px-1.5">
        <span className="text-[7px] font-bold uppercase tracking-widest text-accent/70">Days</span>
      </div>
      <div className="grid grid-cols-7 gap-[2px]">
        {DAYS.map((day, i) => (
          <div
            key={day}
            className="relative flex h-5 w-5 items-center justify-center rounded"
            style={{
              backgroundColor: animate ? "rgba(106,90,205,0.15)" : "rgba(255,255,255,0.04)",
              transitionDelay: animate ? `${i * DELAY}ms` : "0s",
            }}
          >
            <span
              className="relative text-[7px] font-semibold"
              style={{
                color: animate ? "rgba(106,90,205,0.55)" : "rgba(255,255,255,0.18)",
                transitionDelay: animate ? `${i * DELAY}ms` : "0s",
              }}
            >
              {day}
            </span>
            <span className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden>
              <span
                className="block h-px bg-accent/40 origin-left"
                style={{
                  width: animate ? "12px" : "0px",
                  transition: animate ? `width 0.18s ease ${i * DELAY + 100}ms` : "none",
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
// Package breakdown — used inside the featured $600 cell
// ─────────────────────────────────────────────────────────────────────────────
function PackageBreakdown({ animate }: { animate: boolean }) {
  const items = [
    { label: "Photography",     price: "$450", pct: 0.72 },
    { label: "Virtual Staging", price: "$250", pct: 0.50 },
    { label: "Virtual Video",   price: "$200", pct: 0.40 },
  ];

  return (
    <div className="w-full space-y-3">
      {items.map((item, i) => (
        <div key={item.label} className="flex items-center gap-3">
          {/* Bar track */}
          <div className="relative h-[4px] flex-1 overflow-hidden rounded-full bg-white/6">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-accent/45 origin-left"
              style={{
                transform: animate ? "scaleX(1)" : "scaleX(0)",
                transition: animate
                  ? `transform 0.5s cubic-bezier(0.22,1,0.36,1) ${i * 130 + 80}ms`
                  : "none",
              }}
            />
          </div>
          {/* Label + price */}
          <div
            className="flex w-[128px] shrink-0 items-center justify-between transition-opacity duration-300"
            style={{ opacity: animate ? 1 : 0, transitionDelay: animate ? `${i * 130 + 120}ms` : "0s" }}
          >
            <span className="text-[9px] uppercase tracking-widest text-white/28">{item.label}</span>
            <span className="text-[9px] font-mono text-white/28 line-through">{item.price}</span>
          </div>
        </div>
      ))}

      {/* Savings badge */}
      <div
        className="mt-2 flex items-center justify-center gap-2 rounded-full border border-accent/25 bg-accent/8 px-4 py-2 transition-all duration-500"
        style={{ opacity: animate ? 1 : 0, transitionDelay: animate ? "580ms" : "0s" }}
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
  value, prefix, suffix, onStart,
}: {
  value: number; prefix: string; suffix: string; onStart?: () => void;
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
// Support cell — compact horizontal layout: NUMBER left, GRAPHIC right
// Used for 48 hrs (clock) and 14 days (calendar)
// ─────────────────────────────────────────────────────────────────────────────
function SupportStatCell({ slotIndex }: { slotIndex: number }) {
  const [active, setActive] = useState(false);

  const DEFAULTS = [
    { value: "48",  prefix: "",  suffix: " hrs", label: "Spec+ Delivery",  sublabel: "Shoot to published assets",         graphic: "clock"    },
    { value: "14",  prefix: "",  suffix: " days",label: "Faster to Sold",   sublabel: "Avg. DOM reduction with DIG assets", graphic: "calendar" },
  ][slotIndex];

  const fields = [
    { key: "value",    label: "Numeric value",     type: "text" as const, defaultValue: DEFAULTS.value },
    { key: "prefix",   label: "Prefix (e.g. $)",   type: "text" as const, defaultValue: DEFAULTS.prefix },
    { key: "suffix",   label: "Suffix (e.g. hrs)", type: "text" as const, defaultValue: DEFAULTS.suffix },
    { key: "label",    label: "Label",             type: "text" as const, defaultValue: DEFAULTS.label },
    { key: "sublabel", label: "Descriptor",        type: "text" as const, defaultValue: DEFAULTS.sublabel },
  ];

  const { v, editOverlay } = useEditableSlot(`stats-strip-stat-${slotIndex + 1}`, fields);
  const numericValue = parseInt(v.value) || parseInt(DEFAULTS.value);

  return (
    <div className="relative flex flex-col justify-center px-8 py-10">
      {editOverlay}

      {/* Top row: number left, graphic right */}
      <div className="flex items-start justify-between gap-4">
        {/* Big number */}
        <p
          className="text-[4rem] font-semibold leading-none tracking-tight text-text-light lg:text-[4.5rem]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          <AnimatedCounter
            value={numericValue}
            prefix={v.prefix}
            suffix={v.suffix}
            onStart={() => setActive(true)}
          />
        </p>

        {/* Graphic — clock or calendar */}
        <div className="mt-1 flex-shrink-0 opacity-90">
          {DEFAULTS.graphic === "clock"    && <ClockGraphic    animate={active} />}
          {DEFAULTS.graphic === "calendar" && <CalendarGraphic animate={active} />}
        </div>
      </div>

      {/* Accent rule */}
      <div
        className="mt-5 h-px bg-accent"
        style={{
          width: active ? "2.5rem" : "0px",
          transition: active ? "width 0.8s cubic-bezier(0.22,1,0.36,1) 0.4s" : "none",
        }}
      />

      {/* Label + sublabel */}
      <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.15em] text-text-light">
        {v.label}
      </p>
      <p className="mt-1.5 text-xs leading-snug text-text-muted">{v.sublabel}</p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Featured cell — $600 Complete Package
// Full-height left column: package breakdown + number + CTA
// ─────────────────────────────────────────────────────────────────────────────
function FeaturedStatCell() {
  const [active, setActive] = useState(false);

  const DEFAULTS = {
    value: "600", prefix: "$", suffix: "",
    label: "Spec+ Complete Package", sublabel: "Photo + virtual staging + virtual video",
  };

  const fields = [
    { key: "value",    label: "Numeric value",     type: "text" as const, defaultValue: DEFAULTS.value },
    { key: "prefix",   label: "Prefix (e.g. $)",   type: "text" as const, defaultValue: DEFAULTS.prefix },
    { key: "suffix",   label: "Suffix",            type: "text" as const, defaultValue: DEFAULTS.suffix },
    { key: "label",    label: "Label",             type: "text" as const, defaultValue: DEFAULTS.label },
    { key: "sublabel", label: "Descriptor",        type: "text" as const, defaultValue: DEFAULTS.sublabel },
  ];

  const { v, editOverlay } = useEditableSlot("stats-strip-stat-3", fields);
  const numericValue = parseInt(v.value) || parseInt(DEFAULTS.value);

  return (
    <div className="relative flex h-full flex-col px-8 py-10">
      {editOverlay}

      {/* Spec+ attribution — anchors everything in this cell */}
      <div className="mb-6 flex items-center gap-2.5">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-3 py-1 ring-1 ring-inset ring-accent/25">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-accent">Spec+ Bundle</span>
        </span>
        <span className="text-[10px] text-text-muted">All home sizes</span>
      </div>

      {/* Package breakdown */}
      <div className="flex-1 flex flex-col justify-center">
        <PackageBreakdown animate={active} />
      </div>

      {/* Divider */}
      <div className="my-6 h-px bg-white/8" />

      {/* Big number */}
      <p
        className="text-[5rem] font-semibold leading-none tracking-tight text-text-light lg:text-[5.5rem] 2xl:text-[6.5rem]"
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

      {/* Label + sublabel */}
      <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.15em] text-text-light">
        {v.label}
      </p>
      <p className="mt-1.5 text-xs leading-snug text-text-muted">{v.sublabel}</p>

      {/* Explore Spec+ CTA */}
      <Link
        href="/programs/spec-plus"
        className="mt-7 inline-flex items-center justify-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-5 py-2.5 text-[11px] font-semibold text-accent transition-all hover:border-accent hover:bg-accent/20"
        style={{ opacity: active ? 1 : 0, transition: active ? "opacity 0.5s ease 1.2s" : "none" }}
      >
        Explore Spec+
        <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M2 6h8M7 3l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main export
// Layout: asymmetric editorial grid
//   Left col  (lg:row-span-2) → $600 featured cell
//   Right top                 → 48 hrs
//   Right bottom              → 14 days
// ─────────────────────────────────────────────────────────────────────────────
export function StatsStrip() {
  return (
    <section className="relative overflow-hidden bg-bg-dark py-20">
      <DarkSectionBg
        showGrid={false}
        glowIntensity={6}
        glowSize={700}
        glowBlur={130}
      />

      <div className="relative mb-14 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-text-muted">
          Best Value in Homebuilding
        </p>
        <p className="mx-auto mt-2 max-w-md text-sm text-text-muted/60">
          The Spec+ bundle combines photography, virtual staging, and virtual video into one flat-rate order — not a la carte pricing.
        </p>
      </div>

      <div className="relative mx-auto max-w-5xl px-6">
        {/* Bordered grid container — gap-px creates hairline dividers */}
        <div className="overflow-hidden rounded-2xl border border-white/8 lg:grid lg:grid-cols-2">

          {/* ── Featured cell: $600 ── left col, spans both rows on desktop */}
          <div className="border-b border-white/8 lg:row-span-2 lg:border-b-0 lg:border-r">
            <FeaturedStatCell />
          </div>

          {/* ── Support cell: 48 hrs ── top-right */}
          <div className="border-b border-white/8">
            <SupportStatCell slotIndex={0} />
          </div>

          {/* ── Support cell: 14 days ── bottom-right */}
          <div>
            <SupportStatCell slotIndex={1} />
          </div>

        </div>
      </div>
    </section>
  );
}
