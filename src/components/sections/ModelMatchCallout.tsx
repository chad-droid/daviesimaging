"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Eyebrow } from "@/components/Eyebrow";
import { useEditableSlot } from "@/lib/useEditableSlot";
import { DynamicImage } from "@/components/DynamicImage";

// ─── Editable fields ──────────────────────────────────────────────────────────

const fields = [
  { key: "eyebrow",    label: "Eyebrow",      type: "text"     as const, defaultValue: "ModelMatch by DIG" },
  { key: "headline",   label: "Headline",     type: "textarea" as const, defaultValue: "Virtual staging that actually looks like **your homes**." },
  { key: "body1",      label: "Body paragraph 1", type: "textarea" as const, defaultValue: "Most virtual staging uses generic off-the-shelf furniture with no relationship to your brand, your model homes, or your actual merchandising strategy. The result: inconsistent design, off-brand visuals, and a disconnect between what buyers see online and what they experience in person." },
  { key: "body2",      label: "Body paragraph 2", type: "textarea" as const, defaultValue: "ModelMatch changes this. Build a brand-approved catalog from your own model homes and apply that same furniture, palette, and layout to every spec home you stage. One reference gallery. Consistent results across every community." },
  { key: "feature1",   label: "Feature 1",    type: "text"     as const, defaultValue: "Reference your own model home photos, not stock furniture" },
  { key: "feature2",   label: "Feature 2",    type: "text"     as const, defaultValue: "Brand-consistent results across every community and region" },
  { key: "feature3",   label: "Feature 3",    type: "text"     as const, defaultValue: "Available on every Spec+ and standalone staging order" },
  { key: "feature4",   label: "Feature 4",    type: "text"     as const, defaultValue: "Gallery lives in your digDesk account — reuse on every job" },
  { key: "ctaText",    label: "CTA Button",   type: "text"     as const, defaultValue: "Try ModelMatch in digDesk" },
  { key: "ctaHref",    label: "CTA URL",      type: "url"      as const, defaultValue: "/programs/digdesk" },
  { key: "stat1Value", label: "Stat 1 Value", type: "text"     as const, defaultValue: "24hrs" },
  { key: "stat1Label", label: "Stat 1 Label", type: "text"     as const, defaultValue: "Avg. delivery time per order" },
  { key: "stat2Value", label: "Stat 2 Value", type: "text"     as const, defaultValue: "81%" },
  { key: "stat2Label", label: "Stat 2 Label", type: "text"     as const, defaultValue: "Faster buyer decisions with staged homes" },
];

// ─── Main export ──────────────────────────────────────────────────────────────

export function ModelMatchCallout() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const { v, editOverlay } = useEditableSlot("model-match-main", fields);

  const features = [v.feature1, v.feature2, v.feature3, v.feature4].filter(Boolean);

  return (
    <section className="bg-bg-light py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div ref={ref} className="relative grid items-center gap-16 lg:grid-cols-2">
          {editOverlay}

          {/* Copy column */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <Eyebrow>{v.eyebrow}</Eyebrow>
            <h2 dangerouslySetInnerHTML={{ __html: v.headline }} />
            <p className="mt-5 text-text-body">{v.body1}</p>
            <p className="mt-4 text-text-body">{v.body2}</p>

            <ul className="mt-7 space-y-3">
              {features.map((item) => (
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
                href={v.ctaHref || "/programs/digdesk"}
                className="inline-flex items-center gap-1.5 rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
              >
                {v.ctaText}
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
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border-light bg-bg-surface">
              <DynamicImage
                slotId="modelmatch-callout-img"
                className="absolute inset-0 h-full w-full"
                aspectRatio="4/3"
              />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-border-light bg-bg-surface px-5 py-4">
                <p className="text-2xl font-semibold tracking-tight text-text-dark" style={{ fontFamily: "var(--font-heading)" }}>
                  {v.stat1Value}
                </p>
                <p className="mt-0.5 text-xs text-text-muted">{v.stat1Label}</p>
              </div>
              <div className="rounded-xl border border-border-light bg-bg-surface px-5 py-4">
                <p className="text-2xl font-semibold tracking-tight text-text-dark" style={{ fontFamily: "var(--font-heading)" }}>
                  {v.stat2Value}
                </p>
                <p className="mt-0.5 text-xs text-text-muted">{v.stat2Label}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
