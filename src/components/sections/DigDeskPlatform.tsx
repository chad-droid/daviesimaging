"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Eyebrow } from "@/components/Eyebrow";
import { useEditableSlot } from "@/lib/useEditableSlot";
import { DarkSectionBg } from "@/components/DarkSectionBg";

// ─── Editable fields ──────────────────────────────────────────────────────────

const metaFields = [
  { key: "eyebrow",  label: "Eyebrow",    type: "text"     as const, defaultValue: "digDesk — Now Rolling Out" },
  { key: "headline", label: "Headline",   type: "textarea" as const, defaultValue: "One portal for your **entire visual pipeline**." },
  { key: "body",     label: "Body",       type: "textarea" as const, defaultValue: "digDesk is DIG's professional client portal designed for high-performing, lean homebuilder marketing teams. Order every service, track every job, and manage every asset from a single dashboard." },
  { key: "ctaText",  label: "CTA Button", type: "text"     as const, defaultValue: "Get access to digDesk" },
  { key: "ctaHref",  label: "CTA URL",    type: "url"      as const, defaultValue: "/programs/frameflow" },
  { key: "ctaNote",  label: "CTA Note",   type: "text"     as const, defaultValue: "Currently available to existing DIG clients. Onboarding new accounts quarterly." },
];

const moduleFieldDefs = (n: number, labelDef: string, descDef: string) => [
  { key: "label",       label: `Module ${n} Name`,        type: "text"     as const, defaultValue: labelDef },
  { key: "description", label: `Module ${n} Description`, type: "textarea" as const, defaultValue: descDef },
];

const MODULE_DEFAULTS = [
  { label: "FrameFlow Studio",      description: "Order virtual staging, virtual video, and Spec+ bundles." },
  { label: "Listing Photography",   description: "Schedule spec home and QMI photography orders." },
  { label: "Premium Photography",   description: "Request model home and lifestyle shoot projects." },
  { label: "ModelMatch Gallery",    description: "Build and manage brand-reference galleries for staging." },
];

// ─── Static module icons (structural — not editable) ─────────────────────────

const MODULE_ICONS = [
  <svg key="ff" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <rect x="3" y="3" width="8" height="8" rx="1.5" />
    <rect x="13" y="3" width="8" height="8" rx="1.5" />
    <rect x="3" y="13" width="8" height="8" rx="1.5" />
    <rect x="13" y="13" width="8" height="8" rx="1.5" />
  </svg>,
  <svg key="lp" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
    <path d="M9 22V12h6v10" />
  </svg>,
  <svg key="pp" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>,
  <svg key="mm" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16" />
    <path d="M14 14l1.586-1.586a2 2 0 012.828 0L20 14" />
    <rect x="2" y="4" width="20" height="16" rx="2" />
  </svg>,
];

// ─── Editable module card ─────────────────────────────────────────────────────

function ModuleCard({ index }: { index: number }) {
  const def = MODULE_DEFAULTS[index];
  const { v, editOverlay } = useEditableSlot(
    `digdesk-module-${index + 1}`,
    moduleFieldDefs(index + 1, def.label, def.description),
  );

  return (
    <div className="relative rounded-xl border border-white/8 bg-white/[0.03] p-4 transition-colors hover:border-accent/25 hover:bg-accent/5">
      {editOverlay}
      <div className="text-accent">{MODULE_ICONS[index]}</div>
      <p className="mt-2 text-xs font-semibold text-text-light">{v.label}</p>
      <p className="mt-1 text-[11px] leading-snug text-white/75">{v.description}</p>
    </div>
  );
}

// ─── Stylized digDesk UI mockup (structural) ──────────────────────────────────

function DigDeskMockup() {
  // Render the mockup at a fixed 560px design width and scale it to fit
  // whatever column width we're in. This keeps every child's typography
  // and spacing exactly proportional instead of cramming narrow text into
  // sm breakpoints. The outer wrapper preserves layout height via aspect.
  return (
    <div
      className="w-full"
      style={{ aspectRatio: "560 / 376", containerType: "inline-size" }}
    >
      <div
        className="origin-top-left"
        style={{
          width: 560,
          transform: "scale(calc(100cqw / 560))",
        }}
      >
        <div className="overflow-hidden rounded-2xl border border-border-light bg-bg-dark shadow-2xl shadow-black/20">
          <div className="flex items-center justify-between border-b border-white/8 bg-black/20 px-5 py-3">
            <div className="flex gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <div className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <div className="h-2.5 w-2.5 rounded-full bg-white/15" />
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1">
              <div className="h-1.5 w-1.5 rounded-full bg-accent/60" />
              <span className="text-[10px] text-white/60">digDesk — Grand Homes</span>
            </div>
            <div className="flex gap-2">
              <div className="h-4 w-4 rounded bg-white/8" />
            </div>
          </div>

          <div className="flex h-[320px]">
            <div className="w-44 border-r border-white/6 bg-black/10 p-3">
              <div className="mb-4 flex items-center gap-2 px-2">
                <div className="h-6 w-6 rounded-full bg-accent/20" />
                <div className="h-2 w-20 rounded bg-white/15" />
              </div>
              {[
                { label: "Dashboard", active: false },
                { label: "New Order",  active: true  },
                { label: "My Jobs",    active: false },
                { label: "ModelMatch", active: false },
                { label: "Analytics",  active: false },
              ].map((item) => (
                <div
                  key={item.label}
                  className={`mb-0.5 flex items-center gap-2 rounded-lg px-2 py-1.5 ${item.active ? "bg-accent/15 text-accent" : "text-white/45"}`}
                >
                  <div className={`h-1.5 w-1.5 rounded-full ${item.active ? "bg-accent" : "bg-white/30"}`} />
                  <span className="text-[10px]">{item.label}</span>
                </div>
              ))}
              <div className="mt-4 border-t border-white/6 pt-3">
                <div className="mb-2 px-2 text-[9px] uppercase tracking-widest text-white/30">Services</div>
                {["FrameFlow Studio", "Listing Photo", "Premium Photo"].map((s) => (
                  <div key={s} className="mb-0.5 flex items-center gap-2 rounded-lg px-2 py-1 text-white/40">
                    <div className="h-1 w-1 rounded-full bg-white/25" />
                    <span className="text-[9px]">{s}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-semibold text-white/80">New Order</div>
                  <div className="mt-0.5 text-[9px] text-white/55">Select a service to get started</div>
                </div>
                <div className="flex-shrink-0 rounded-full bg-accent/20 px-3 py-1 text-[9px] text-accent">Step 1 of 5</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { name: "Spec+ Bundle",    price: "$600",        tag: "Best Value", active: true  },
                  { name: "Listing Photo",   price: "From $400",   tag: "24hr",       active: false },
                  { name: "Virtual Staging", price: "From $25/img",tag: "No Shoot",   active: false },
                  { name: "Premium Photo",   price: "From $4,000", tag: "Flagship",   active: false },
                ].map((card) => (
                  <div
                    key={card.name}
                    className={`rounded-xl p-3 ${card.active ? "border border-accent/40 bg-accent/10" : "border border-white/6 bg-white/3"}`}
                  >
                    <div className="flex items-start justify-between gap-1">
                      <span className="text-[10px] font-medium text-white/80">{card.name}</span>
                      <span className={`flex-shrink-0 rounded-full px-1.5 py-0.5 text-[8px] font-bold ${card.active ? "bg-accent text-white" : "bg-white/10 text-white/55"}`}>
                        {card.tag}
                      </span>
                    </div>
                    <div className="mt-1 text-[11px] font-semibold text-white/65">{card.price}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-400/60" />
                  <span className="text-[9px] text-white/55">128 pts remaining</span>
                </div>
                <div className="rounded-full bg-accent px-4 py-1.5 text-[10px] font-semibold text-white">
                  Continue →
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function DigDeskPlatform() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const { v, editOverlay } = useEditableSlot("digdesk-meta", metaFields);

  return (
    <section className="relative overflow-hidden bg-bg-dark py-24">
      <DarkSectionBg showGrid={false} glowIntensity={20} glowSize={600} glowBlur={120} />

      <div ref={ref} className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {editOverlay}
            <Eyebrow dark>{v.eyebrow}</Eyebrow>
            <h2 className="text-text-light" dangerouslySetInnerHTML={{ __html: v.headline }} />
            <p className="mt-5 text-white/80">{v.body}</p>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {MODULE_DEFAULTS.map((_, i) => (
                <ModuleCard key={i} index={i} />
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href={v.ctaHref || "/programs/frameflow"}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
              >
                {v.ctaText} <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-2.5 text-sm font-medium text-text-light transition-colors hover:border-white/40"
              >
                Talk to the team
              </Link>
            </div>

            <p className="mt-4 text-xs text-white/70">{v.ctaNote}</p>
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
