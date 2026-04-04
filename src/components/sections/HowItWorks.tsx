"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Eyebrow } from "@/components/Eyebrow";

const steps = [
  {
    number: "01",
    title: "Upload your photos",
    body: "Drop listing photos into FrameFlow Studio — from any photographer, any shoot. The dashboard organizes your jobs, tracks delivery status, and stores every asset you've ever ordered.",
    proof: "Works with photos you already have",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth={1.5}>
        <rect x="4" y="6" width="24" height="20" rx="2" />
        <path d="M4 12h24" />
        <path d="M16 18v6M13 21l3-3 3 3" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Choose services. Apply ModelMatch.",
    body: "Select virtual staging, virtual video, or the full Spec+ bundle. Apply your ModelMatch gallery to stage every spec home using your actual model home furniture — not generic stock furniture.",
    proof: "Brand-consistent results across every community",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth={1.5}>
        <rect x="3" y="8" width="11" height="8" rx="1.5" />
        <rect x="18" y="8" width="11" height="8" rx="1.5" />
        <rect x="3" y="20" width="11" height="4" rx="1.5" />
        <rect x="18" y="20" width="11" height="4" rx="1.5" />
        <path d="M14 12h4" strokeDasharray="2 1.5" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Assets in your dashboard. 24 hours.",
    body: "Finished photos, staged images, and videos appear in your FrameFlow dashboard within 24 hours. Download and deploy to MLS, your website, email campaigns, and paid media — all from one folder.",
    proof: "One order. Multiple outputs. Every channel covered.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth={1.5}>
        <path d="M16 4v16M10 14l6 6 6-6" />
        <path d="M6 24h20" />
        <path d="M6 28h20" strokeOpacity={0.4} />
      </svg>
    ),
  },
];

/* Fake FrameFlow UI mockup — stylized app window per step */
function UIPreview({ step }: { step: number }) {
  if (step === 0) {
    return (
      <div className="mt-6 overflow-hidden rounded-xl border border-white/8 bg-black/30 backdrop-blur-sm">
        <div className="flex items-center gap-1.5 border-b border-white/6 px-4 py-2.5">
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="ml-2 text-[10px] text-white/25">FrameFlow Studio — New Job</span>
        </div>
        <div className="p-4">
          <div className="mb-3 flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-accent/40" />
            <div className="h-2.5 w-28 rounded-full bg-white/10" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className={`aspect-square rounded-lg ${i === 2 || i === 5 ? "border-2 border-accent/60 bg-accent/10" : "bg-white/6"}`}>
                {(i === 2 || i === 5) && (
                  <div className="flex h-full items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-accent/70" />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-3 h-6 w-full rounded-lg bg-accent/20 border border-accent/30 flex items-center justify-center">
            <span className="text-[9px] font-semibold uppercase tracking-wider text-accent/70">+ Drop photos here</span>
          </div>
        </div>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div className="mt-6 overflow-hidden rounded-xl border border-white/8 bg-black/30 backdrop-blur-sm">
        <div className="flex items-center gap-1.5 border-b border-white/6 px-4 py-2.5">
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="ml-2 text-[10px] text-white/25">Staging Direction</span>
        </div>
        <div className="p-4 space-y-2.5">
          {["Virtual Staging", "Virtual Video", "Spec+ Bundle"].map((service, i) => (
            <div key={service} className={`flex items-center justify-between rounded-lg px-3 py-2 ${i === 2 ? "border border-accent/40 bg-accent/10" : "bg-white/5"}`}>
              <div className="flex items-center gap-2">
                <div className={`h-3 w-3 rounded-full border ${i === 2 ? "border-accent bg-accent" : "border-white/20"}`} />
                <span className={`text-[10px] ${i === 2 ? "text-white/80" : "text-white/30"}`}>{service}</span>
              </div>
              {i === 2 && <span className="text-[9px] text-accent/70 uppercase tracking-wider">Selected</span>}
            </div>
          ))}
          <div className="pt-1">
            <div className="flex items-center justify-between text-[9px] text-white/30 mb-1">
              <span>ModelMatch Gallery</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2">
              <div className="h-5 w-5 rounded bg-accent/20" />
              <span className="text-[10px] text-white/50">Maple Grove Model — Applied</span>
              <div className="ml-auto h-2 w-2 rounded-full bg-accent/60" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 overflow-hidden rounded-xl border border-white/8 bg-black/30 backdrop-blur-sm">
      <div className="flex items-center gap-1.5 border-b border-white/6 px-4 py-2.5">
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="ml-2 text-[10px] text-white/25">Job Dashboard</span>
      </div>
      <div className="p-4 space-y-2">
        {[
          { label: "Maple Grove — Lot 14", status: "Delivered", color: "text-green-400" },
          { label: "Meadowbrook — Lot 7", status: "In Progress", color: "text-accent/70" },
          { label: "Vista Ridge — Lot 22", status: "Delivered", color: "text-green-400" },
        ].map((job) => (
          <div key={job.label} className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2">
            <div className="flex items-center gap-2.5">
              <div className="aspect-square h-7 w-7 rounded bg-white/10" />
              <div>
                <div className="text-[10px] text-white/60">{job.label}</div>
                <div className="text-[9px] text-white/30">Spec+ · 12 images · 1 video</div>
              </div>
            </div>
            <span className={`text-[9px] font-semibold ${job.color}`}>{job.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section className="relative overflow-hidden bg-bg-dark py-28">
      {/* Grid texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: [
            "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 80px)",
            "repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 80px)",
          ].join(","),
        }}
      />

      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="mx-auto max-w-xl text-center">
          <Eyebrow dark>How It Works</Eyebrow>
          <h2 className="mt-2 text-text-light">
            Order complete. Assets live.{" "}
            <strong className="text-accent">24 hours.</strong>
          </h2>
          <p className="mt-4 text-text-muted">
            FrameFlow Studio handles the workflow. You focus on moving homes.
          </p>
        </div>

        {/* Step cards */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-16 grid gap-6 sm:grid-cols-3"
        >
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              variants={cardVariants}
              className="group relative rounded-2xl border border-white/8 bg-white/[0.03] p-6 transition-colors hover:border-white/14 hover:bg-white/[0.055]"
            >
              {/* Connector arrow — desktop */}
              {i < steps.length - 1 && (
                <div className="absolute -right-3.5 top-[3.6rem] z-10 hidden sm:block">
                  <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 rotate-0 text-white/15">
                    <path d="M1 7h12M8 3l5 4-5 4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                </div>
              )}

              {/* Step header row */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-accent/25 bg-accent/8 text-accent transition-colors group-hover:border-accent/40 group-hover:bg-accent/12">
                  {step.icon}
                </div>
                <span
                  className="text-[4.5rem] font-semibold leading-none text-white/5 transition-colors group-hover:text-white/[0.07]"
                  style={{ fontFamily: "var(--font-heading)" }}
                  aria-hidden
                >
                  {step.number}
                </span>
              </div>

              {/* Copy */}
              <h3 className="mt-5 text-[1.1rem] font-medium leading-snug text-text-light">
                {step.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-text-muted">{step.body}</p>

              {/* Proof line */}
              <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.12em] text-accent/70">
                {step.proof}
              </p>

              {/* Stylized UI preview */}
              <UIPreview step={i} />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-14 flex flex-col items-center gap-3"
        >
          <Link
            href="/programs/frameflow"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-medium text-white shadow-lg shadow-accent/20 transition-all hover:bg-accent-hover hover:shadow-accent/30"
          >
            Start your first order in FrameFlow
            <span aria-hidden="true">→</span>
          </Link>
          <p className="text-xs text-text-muted">
            No setup fee. First Spec+ order includes a risk-free FrameFlow video.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
