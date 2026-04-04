"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Eyebrow } from "@/components/Eyebrow";

const modules = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <rect x="3" y="3" width="8" height="8" rx="1.5" />
        <rect x="13" y="3" width="8" height="8" rx="1.5" />
        <rect x="3" y="13" width="8" height="8" rx="1.5" />
        <rect x="13" y="13" width="8" height="8" rx="1.5" />
      </svg>
    ),
    label: "FrameFlow Studio",
    description: "Order virtual staging, virtual video, and Spec+ bundles.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <path d="M9 22V12h6v10" />
      </svg>
    ),
    label: "Listing Photography",
    description: "Schedule spec home and QMI photography orders.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    label: "Premium Photography",
    description: "Request model home and lifestyle shoot projects.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16" />
        <path d="M14 14l1.586-1.586a2 2 0 012.828 0L20 14" />
        <rect x="2" y="4" width="20" height="16" rx="2" />
      </svg>
    ),
    label: "ModelMatch Gallery",
    description: "Build and manage brand-reference galleries for staging.",
  },
];

/* Stylized digDesk UI mockup */
function DigDeskMockup() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border-light bg-bg-dark shadow-2xl shadow-black/20">
      {/* Window chrome */}
      <div className="flex items-center justify-between border-b border-white/8 bg-black/20 px-5 py-3">
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <div className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <div className="h-2.5 w-2.5 rounded-full bg-white/15" />
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1">
          <div className="h-1.5 w-1.5 rounded-full bg-accent/60" />
          <span className="text-[10px] text-white/30">digDesk — Grand Homes</span>
        </div>
        <div className="flex gap-2">
          <div className="h-4 w-4 rounded bg-white/8" />
        </div>
      </div>

      {/* App layout */}
      <div className="flex h-[320px]">
        {/* Sidebar */}
        <div className="w-44 border-r border-white/6 bg-black/10 p-3">
          <div className="mb-4 flex items-center gap-2 px-2">
            <div className="h-6 w-6 rounded-full bg-accent/20" />
            <div className="h-2 w-20 rounded bg-white/15" />
          </div>
          {[
            { label: "Dashboard", active: false },
            { label: "New Order", active: true },
            { label: "My Jobs", active: false },
            { label: "ModelMatch", active: false },
            { label: "Analytics", active: false },
          ].map((item) => (
            <div
              key={item.label}
              className={`mb-0.5 flex items-center gap-2 rounded-lg px-2 py-1.5 ${
                item.active ? "bg-accent/15 text-accent" : "text-white/30"
              }`}
            >
              <div className={`h-1.5 w-1.5 rounded-full ${item.active ? "bg-accent" : "bg-white/20"}`} />
              <span className="text-[10px]">{item.label}</span>
            </div>
          ))}

          <div className="mt-4 border-t border-white/6 pt-3">
            <div className="px-2 text-[9px] uppercase tracking-widest text-white/20 mb-2">Services</div>
            {["FrameFlow Studio", "Listing Photo", "Premium Photo"].map((s) => (
              <div key={s} className="mb-0.5 flex items-center gap-2 rounded-lg px-2 py-1 text-white/25">
                <div className="h-1 w-1 rounded-full bg-white/15" />
                <span className="text-[9px]">{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-[11px] font-semibold text-white/70">New Order</div>
              <div className="mt-0.5 text-[9px] text-white/30">Select a service to get started</div>
            </div>
            <div className="rounded-full bg-accent/20 px-3 py-1 text-[9px] text-accent">Step 1 of 5</div>
          </div>

          {/* Service selector cards */}
          <div className="grid grid-cols-2 gap-2">
            {[
              { name: "Spec+ Bundle", price: "$600", tag: "Best Value", active: true },
              { name: "Listing Photo", price: "From $400", tag: "24hr", active: false },
              { name: "Virtual Staging", price: "From $25/img", tag: "No Shoot", active: false },
              { name: "Premium Photo", price: "From $4,000", tag: "Flagship", active: false },
            ].map((card) => (
              <div
                key={card.name}
                className={`rounded-xl p-3 ${
                  card.active
                    ? "border border-accent/40 bg-accent/10"
                    : "border border-white/6 bg-white/3"
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-medium text-white/70">{card.name}</span>
                  <span className={`rounded-full px-1.5 py-0.5 text-[8px] font-bold ${card.active ? "bg-accent text-white" : "bg-white/10 text-white/30"}`}>
                    {card.tag}
                  </span>
                </div>
                <div className="mt-1 text-[11px] font-semibold text-white/50">{card.price}</div>
              </div>
            ))}
          </div>

          {/* Bottom action row */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="h-1.5 w-1.5 rounded-full bg-green-400/60" />
              <span className="text-[9px] text-white/30">128 pts remaining</span>
            </div>
            <div className="rounded-full bg-accent px-4 py-1.5 text-[10px] font-semibold text-white">
              Continue →
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DigDeskPlatform() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section className="relative overflow-hidden bg-bg-dark py-24">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] -translate-y-1/4 translate-x-1/4 rounded-full bg-accent/8 blur-[100px]" />

      <div ref={ref} className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <Eyebrow dark>digDesk — Now Rolling Out</Eyebrow>
            <h2 className="text-text-light">
              One portal for your{" "}
              <strong className="text-accent">entire visual pipeline</strong>.
            </h2>
            <p className="mt-5 text-text-muted">
              digDesk is DIG&rsquo;s professional client portal designed for
              high-performing, lean homebuilder marketing teams. Order every
              service, track every job, and manage every asset — from a single
              dashboard.
            </p>

            {/* Module list */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              {modules.map((m) => (
                <div
                  key={m.label}
                  className="rounded-xl border border-white/8 bg-white/[0.03] p-4 transition-colors hover:border-accent/25 hover:bg-accent/5"
                >
                  <div className="text-accent">{m.icon}</div>
                  <p className="mt-2 text-xs font-semibold text-text-light">{m.label}</p>
                  <p className="mt-1 text-[11px] leading-snug text-text-muted">{m.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/programs/frameflow"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
              >
                Get access to digDesk <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-2.5 text-sm font-medium text-text-light transition-colors hover:border-white/40"
              >
                Talk to the team
              </Link>
            </div>

            <p className="mt-4 text-xs text-text-muted">
              Currently available to existing DIG clients. Onboarding new
              accounts quarterly.
            </p>
          </motion.div>

          {/* Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
          >
            <DigDeskMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
