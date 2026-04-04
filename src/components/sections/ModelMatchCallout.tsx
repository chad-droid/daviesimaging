"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Eyebrow } from "@/components/Eyebrow";

/* Simulated before/after staging comparison */
function StagingComparison() {
  const [active, setActive] = useState<"before" | "after">("after");

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border-light">
      {/* Toggle pill */}
      <div className="absolute left-1/2 top-4 z-20 flex -translate-x-1/2 gap-0.5 rounded-full border border-border-light bg-bg-surface px-1 py-1 shadow-sm">
        {(["before", "after"] as const).map((label) => (
          <button
            key={label}
            onClick={() => setActive(label)}
            className={`rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest transition-all ${
              active === label
                ? "bg-accent text-white shadow"
                : "text-text-muted hover:text-text-body"
            }`}
          >
            {label === "before" ? "Generic Staging" : "ModelMatch"}
          </button>
        ))}
      </div>

      {/* Image placeholder — replace with real DIG before/after */}
      <div
        className={`relative aspect-[4/3] transition-all duration-500 ${
          active === "before"
            ? "bg-gradient-to-br from-stone-200 via-stone-100 to-stone-200"
            : "bg-gradient-to-br from-bg-surface via-accent/8 to-bg-surface"
        }`}
      >
        {active === "before" ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-8">
            {/* Simulated generic-furniture room */}
            <div className="w-full max-w-[200px]">
              <div className="h-16 w-full rounded-lg bg-stone-300/60" />
              <div className="mt-2 flex gap-2">
                <div className="h-10 flex-1 rounded bg-stone-300/40" />
                <div className="h-10 flex-1 rounded bg-stone-200/60" />
              </div>
            </div>
            <p className="mt-2 text-center text-[11px] text-stone-500">
              Random furniture. No relationship to your brand.<br />
              Off-spec colors. Generic look.
            </p>
          </div>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-8">
            {/* Simulated ModelMatch-aligned room */}
            <div className="w-full max-w-[200px]">
              <div className="h-16 w-full rounded-lg bg-accent/20 ring-1 ring-accent/30" />
              <div className="mt-2 flex gap-2">
                <div className="h-10 flex-1 rounded bg-accent/15 ring-1 ring-accent/20" />
                <div className="h-10 flex-1 rounded bg-accent/10 ring-1 ring-accent/15" />
              </div>
              <div className="mt-1.5 flex items-center gap-1.5">
                <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span className="text-[9px] font-semibold uppercase tracking-widest text-accent">Maple Grove Reference Applied</span>
              </div>
            </div>
            <p className="mt-2 text-center text-[11px] text-text-body">
              Your model home furniture. Your color palette.<br />
              Consistent across every spec home.
            </p>
          </div>
        )}

        {/* Slot hint label */}
        <div className="absolute bottom-3 right-3 rounded-full bg-bg-surface/90 px-2.5 py-1 text-[9px] text-text-muted shadow">
          Replace with real DIG before/after via admin
        </div>
      </div>
    </div>
  );
}

export function ModelMatchCallout() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="bg-bg-light py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div
          ref={ref}
          className="grid items-center gap-16 lg:grid-cols-2"
        >
          {/* Copy column */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <Eyebrow>ModelMatch by DIG</Eyebrow>
            <h2>
              Virtual staging that actually looks like{" "}
              <strong>your homes</strong>.
            </h2>
            <p className="mt-5 text-text-body">
              Most virtual staging uses generic off-the-shelf furniture with no
              relationship to your brand, your model homes, or your actual
              merchandising strategy. The result: inconsistent design, off-brand
              visuals, and a disconnect between what buyers see online and what
              they experience in person.
            </p>
            <p className="mt-4 text-text-body">
              ModelMatch changes this. Build a brand-approved catalog from your
              own model homes and apply that same furniture, palette, and layout
              to every spec home you stage. One reference gallery. Consistent
              results across every community.
            </p>

            {/* Feature list */}
            <ul className="mt-7 space-y-3">
              {[
                "Reference your own model home photos — not stock furniture",
                "Brand-consistent results across every community and region",
                "Available on every Spec+ and standalone staging order",
                "Gallery lives in your FrameFlow account — reuse on every job",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-text-body">
                  <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-accent/10">
                    <svg viewBox="0 0 10 10" className="h-2.5 w-2.5 text-accent" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M2 5l2 2.5 4-4.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/offerings/frameflow"
                className="inline-flex items-center gap-1.5 rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
              >
                Try ModelMatch in FrameFlow
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/services/virtual-staging"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-text-dark transition-colors hover:text-accent"
              >
                Learn about Virtual Staging
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </motion.div>

          {/* Visual column */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <StagingComparison />

            {/* Stat callout */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-border-light bg-bg-surface px-5 py-4">
                <p className="text-2xl font-semibold tracking-tight text-text-dark" style={{ fontFamily: "var(--font-heading)" }}>
                  24hrs
                </p>
                <p className="mt-0.5 text-xs text-text-muted">Avg. delivery time per order</p>
              </div>
              <div className="rounded-xl border border-border-light bg-bg-surface px-5 py-4">
                <p className="text-2xl font-semibold tracking-tight text-text-dark" style={{ fontFamily: "var(--font-heading)" }}>
                  81%
                </p>
                <p className="mt-0.5 text-xs text-text-muted">Faster buyer decisions with staged homes</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
