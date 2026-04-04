"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Eyebrow } from "@/components/Eyebrow";
import { DynamicImage } from "@/components/DynamicImage";

const tabs = [
  {
    id: "spec-plus",
    label: "Spec+",
    tag: "$600 flat — all sizes",
    tagColor: "bg-accent text-white",
    headline: "Every spec home. Complete package.",
    body: "25 listing photos, 8 ModelMatch-staged images, and 1 virtual video. Photography plus FrameFlow digital production in one package. 72-hour delivery, flat $600 pricing regardless of home size.",
    details: [
      "25 MLS-ready listing images",
      "8 ModelMatch virtually staged images",
      "1 wide FrameFlow virtual video",
      "72-hour delivery after photography",
    ],
    cta: "Order via FrameFlow",
    ctaHref: "/programs/spec-plus",
    secondaryCta: "Learn more",
    secondaryHref: "/programs/spec-plus",
    imageSlot: "explorer-spec-plus",
    badge: "Best Value",
  },
  {
    id: "listing",
    label: "Listing",
    tag: "From $400",
    tagColor: "bg-green-600 text-white",
    headline: "Spec homes, MLS-ready in 24 hours.",
    body: "25 HDR listing photos for vacant spec and QMI homes. Fast-turn, professionally retouched, and delivered within 24 hours of the shoot.",
    details: [
      "25 MLS-ready images",
      "24-hour delivery",
      "Sky replacement + retouching",
      "Add drone, Matterport, or staging",
    ],
    cta: "Book a Listing Shoot",
    ctaHref: "/contact",
    secondaryCta: "Learn more",
    secondaryHref: "/services/listing",
    imageSlot: "explorer-listing",
    badge: null,
  },
  {
    id: "virtual-staging",
    label: "Virtual Staging",
    tag: "No shoot required",
    tagColor: "bg-accent-secondary/20 text-accent",
    headline: "Already have photos? We can work with that.",
    body: "ModelMatch virtual staging uses your builder's own model home photos as the design reference. Not generic furniture swaps — branded, on-spec rooms that feel like your community.",
    details: [
      "Reference-based staging (ModelMatch)",
      "Matches your builder's design palette",
      "Works on existing listing photos",
      "Order standalone or bundle in Spec+",
    ],
    cta: "Explore ModelMatch",
    ctaHref: "/services/virtual-staging",
    secondaryCta: "See examples",
    secondaryHref: "/results/spec-homes",
    imageSlot: "explorer-virtual-staging",
    badge: null,
  },
  {
    id: "virtual-video",
    label: "Virtual Video",
    tag: "24–48hr turnaround",
    tagColor: "bg-purple-100 text-purple-700",
    headline: "Listing video without the crew.",
    body: "Digital video built from your existing photos or staging outputs. No shoot, no scheduling, no crew cost. Order standalone or bundle it inside Spec+.",
    details: [
      "No on-site shoot required",
      "Built from existing photos",
      "Wide or portrait formats available",
      "Order standalone via FrameFlow",
    ],
    cta: "Order via FrameFlow",
    ctaHref: "/services/virtual-video",
    secondaryCta: "Learn more",
    secondaryHref: "/services/virtual-video",
    imageSlot: "explorer-virtual-video",
    badge: null,
  },
  {
    id: "premium",
    label: "Premium",
    tag: "From $4,000",
    tagColor: "bg-bg-dark text-text-light",
    headline: "Model home photography done right.",
    body: "Full-service lifestyle and model home photography. DIG's signature offering, built for builders who need their best homes to earn the attention they deserve.",
    details: [
      "15 curated images, unlimited retouching",
      "7-day delivery",
      "Sky replacement + digital fence removal",
      "Lifestyle, amenity, and sales center shoots",
    ],
    cta: "Explore Premium",
    ctaHref: "/services/premium",
    secondaryCta: "View results",
    secondaryHref: "/results/model-homes",
    imageSlot: "explorer-premium",
    badge: null,
  },
];

const contentVariants = {
  enter: { opacity: 0, y: 12 },
  center: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

export function ServiceExplorer() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.1 });
  const tab = tabs[active];

  return (
    <section ref={sectionRef} className="bg-bg-light py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Eyebrow>Services</Eyebrow>
          <h2>
            Everything your marketing team needs.{" "}
            <strong>One platform to order it.</strong>
          </h2>
          <p className="mt-4 text-text-body">
            From flagship model home photography to 72-hour spec bundles. Digital services like virtual staging and video are powered by FrameFlow Studio inside digDesk.
          </p>
        </motion.div>

        {/* Pill tabs */}
        <motion.div
          className="mt-12 flex items-center justify-center gap-2 overflow-x-auto pb-1"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {tabs.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setActive(i)}
              className={`flex-shrink-0 rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
                active === i
                  ? "bg-bg-dark text-text-light shadow-sm"
                  : "bg-bg-surface text-text-muted hover:text-text-body hover:bg-border-light"
              }`}
            >
              {t.label}
            </button>
          ))}
        </motion.div>

        {/* Content panel */}
        <div className="mt-10 min-h-[420px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab.id}
              variants={contentVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="grid items-center gap-12 lg:grid-cols-2"
            >
              {/* Left: copy */}
              <div>
                {/* Tag */}
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${tab.tagColor}`}
                >
                  {tab.tag}
                </span>
                {tab.badge && (
                  <span className="ml-2 inline-flex rounded-full bg-accent/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-accent">
                    {tab.badge}
                  </span>
                )}

                <h3 className="mt-4 text-[1.75rem] font-semibold leading-snug text-text-dark">
                  {tab.headline}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-text-body">
                  {tab.body}
                </p>

                {/* Detail list */}
                <ul className="mt-6 space-y-2.5">
                  {tab.details.map((d) => (
                    <li key={d} className="flex items-start gap-2.5 text-sm text-text-body">
                      <svg
                        viewBox="0 0 16 16"
                        className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-accent"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path d="M3 8l3 3.5 7-7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {d}
                    </li>
                  ))}
                </ul>

                {/* CTAs */}
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link
                    href={tab.ctaHref}
                    className="rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
                  >
                    {tab.cta}
                  </Link>
                  <Link
                    href={tab.secondaryHref}
                    className="text-sm font-medium text-text-muted underline decoration-dotted underline-offset-4 hover:text-accent"
                  >
                    {tab.secondaryCta} →
                  </Link>
                </div>
              </div>

              {/* Right: image */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-bg-surface">
                <DynamicImage
                  slotId={tab.imageSlot}
                  className="h-full w-full object-cover"
                  fallbackClass="h-full w-full"
                />
                {/* Fallback gradient when no image assigned */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-bg-surface to-border-light [&:has(img)]:hidden">
                  <span className="text-xs font-medium uppercase tracking-widest text-text-muted">
                    {tab.label}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Tab indicators */}
        <div className="mt-8 flex justify-center gap-1.5">
          {tabs.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-1 rounded-full transition-all duration-300 ${
                active === i ? "w-6 bg-accent" : "w-1.5 bg-border-light hover:bg-text-muted"
              }`}
              aria-label={`View ${tabs[i].label}`}
            />
          ))}
        </div>

        {/* Additional services footnote */}
        <p className="mt-10 text-center text-xs text-text-muted">
          Also available:{" "}
          <Link href="/services/matterport" className="underline decoration-dotted hover:text-accent">Matterport</Link>
          {" · "}
          <Link href="/services/video-production" className="underline decoration-dotted hover:text-accent">Video Production</Link>
          {" · "}
          Drone · Amenities · Sales Centers · Twilight —{" "}
          <Link href="/contact" className="underline decoration-dotted hover:text-accent">request a custom quote</Link>
        </p>
      </div>
    </section>
  );
}
