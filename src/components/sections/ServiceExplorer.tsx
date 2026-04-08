"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Eyebrow } from "@/components/Eyebrow";
import { DynamicImage } from "@/components/DynamicImage";
import { useEditableSlot } from "@/lib/useEditableSlot";

// ─── Static tab structure (labels, hrefs, colors stay in code) ────────────────

const TAB_STATIC = [
  {
    id: "spec-plus",
    label: "Spec+",
    tagColor: "bg-accent text-white",
    ctaHref: "/programs/spec-plus",
    secondaryHref: "/programs/spec-plus",
    imageSlot: "explorer-spec-plus",
  },
  {
    id: "virtual-staging",
    label: "Virtual Staging",
    tagColor: "bg-accent-secondary/20 text-accent",
    ctaHref: "/services/virtual-staging",
    secondaryHref: "/gallery/listings",
    imageSlot: "explorer-virtual-staging",
  },
  {
    id: "virtual-video",
    label: "Virtual Video",
    tagColor: "bg-purple-100 text-purple-700",
    ctaHref: "/services/virtual-video",
    secondaryHref: "/services/virtual-video",
    imageSlot: "explorer-virtual-video",
  },
  {
    id: "model-home",
    label: "Model Home",
    tagColor: "bg-bg-dark text-text-light",
    ctaHref: "/services/premium",
    secondaryHref: "/gallery/models",
    imageSlot: "explorer-model-home",
  },
  {
    id: "amenity",
    label: "Amenity",
    tagColor: "bg-green-100 text-green-700",
    ctaHref: "/services/premium",
    secondaryHref: "/gallery/amenities",
    imageSlot: "explorer-amenity",
  },
];

// ─── Per-tab default content ───────────────────────────────────────────────────

const TAB_DEFAULTS = [
  {
    tag: "$600 flat — all sizes",
    badge: "Best Value",
    headline: "Every spec home. Complete package.",
    body: "25 listing photos, 8 ModelMatch-staged images, and 1 virtual video. Photography plus digital production in one package. 72-hour delivery, flat $600 pricing regardless of home size.",
    detail1: "25 MLS-ready listing images",
    detail2: "8 ModelMatch virtually staged images",
    detail3: "1 wide virtual listing video",
    detail4: "72-hour delivery after photography",
    cta: "Order via digDesk",
    secondaryCta: "Learn more",
  },
  {
    tag: "No shoot required",
    badge: "",
    headline: "Already have photos? We can work with that.",
    body: "ModelMatch virtual staging uses your builder's own model home photos as the design reference. Not generic furniture swaps — branded, on-spec rooms that feel like your community.",
    detail1: "Reference-based staging (ModelMatch)",
    detail2: "Matches your builder's design palette",
    detail3: "Works on existing listing photos",
    detail4: "Order standalone or bundle in Spec+",
    cta: "Explore Virtual Staging",
    secondaryCta: "See examples",
  },
  {
    tag: "24–48hr turnaround",
    badge: "",
    headline: "Listing video without the crew.",
    body: "Digital video built from your existing photos or staging outputs. No shoot, no scheduling, no crew cost. Order standalone or bundle it inside Spec+.",
    detail1: "No on-site shoot required",
    detail2: "Built from existing photos",
    detail3: "Wide or portrait formats available",
    detail4: "Order standalone via digDesk",
    cta: "Order via digDesk",
    secondaryCta: "Learn more",
  },
  {
    tag: "From $4,000",
    badge: "",
    headline: "Model home photography done right.",
    body: "Full-service lifestyle and model home photography. DIG's signature offering, built for builders who need their best homes to earn the attention they deserve.",
    detail1: "15 curated images, unlimited retouching",
    detail2: "7-day delivery",
    detail3: "Sky replacement + digital fence removal",
    detail4: "Lifestyle and sales center shoots available",
    cta: "Explore Model Home",
    secondaryCta: "View results",
  },
  {
    tag: "Pools, clubhouses, trails",
    badge: "",
    headline: "Community spaces that sell the lifestyle.",
    body: "Amenity photography showcases the shared spaces that buyers fall in love with. Scheduled independently from model home shoots to capture each space at its best.",
    detail1: "Pools, clubhouses, and fitness centers",
    detail2: "Trails, parks, and community amenities",
    detail3: "Twilight and golden-hour options",
    detail4: "Complements model home photography",
    cta: "Book Amenity Photography",
    secondaryCta: "View examples",
  },
];

const tabFields = (defaults: (typeof TAB_DEFAULTS)[number]) => [
  { key: "tag",         label: "Tag label",    type: "text"     as const, defaultValue: defaults.tag },
  { key: "badge",       label: "Badge (optional)", type: "text" as const, defaultValue: defaults.badge },
  { key: "headline",    label: "Headline",     type: "text"     as const, defaultValue: defaults.headline },
  { key: "body",        label: "Body",         type: "textarea" as const, defaultValue: defaults.body },
  { key: "detail1",     label: "Detail 1",     type: "text"     as const, defaultValue: defaults.detail1 },
  { key: "detail2",     label: "Detail 2",     type: "text"     as const, defaultValue: defaults.detail2 },
  { key: "detail3",     label: "Detail 3",     type: "text"     as const, defaultValue: defaults.detail3 },
  { key: "detail4",     label: "Detail 4",     type: "text"     as const, defaultValue: defaults.detail4 },
  { key: "ctaText",     label: "CTA Button",   type: "text"     as const, defaultValue: defaults.cta },
  { key: "secondaryCta",label: "Secondary CTA",type: "text"     as const, defaultValue: defaults.secondaryCta },
];

const metaFields = [
  { key: "eyebrow",  label: "Eyebrow",  type: "text"     as const, defaultValue: "Services" },
  { key: "headline", label: "Headline", type: "textarea" as const, defaultValue: "Everything your marketing team needs. **One platform to order it.**" },
  { key: "subhead",  label: "Subhead",  type: "textarea" as const, defaultValue: "From flagship model home photography to 72-hour spec bundles. Digital services like virtual staging and video are ordered through digDesk." },
];

// ─── Animation ────────────────────────────────────────────────────────────────

const contentVariants = {
  enter: { opacity: 0, y: 12 },
  center: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
  exit:   { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

// ─── Tab content panel with its own slot ─────────────────────────────────────

function TabPanel({
  tabIndex,
  tabStatic,
  onSwipeNext,
  onSwipePrev,
}: {
  tabIndex: number;
  tabStatic: (typeof TAB_STATIC)[number];
  onSwipeNext: () => void;
  onSwipePrev: () => void;
}) {
  const defaults = TAB_DEFAULTS[tabIndex];
  const { v, editOverlay } = useEditableSlot(
    `service-explorer-tab-${tabStatic.id}`,
    tabFields(defaults),
  );

  const details = [v.detail1, v.detail2, v.detail3, v.detail4].filter(Boolean);

  return (
    <motion.div
      key={tabStatic.id}
      variants={contentVariants}
      initial="enter"
      animate="center"
      exit="exit"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.25}
      onDragEnd={(_, info) => {
        const threshold = 60;
        if (info.offset.x < -threshold || info.velocity.x < -400) onSwipeNext();
        else if (info.offset.x > threshold || info.velocity.x > 400) onSwipePrev();
      }}
      style={{ touchAction: "pan-y" }}
      className="relative grid cursor-grab items-center gap-8 active:cursor-grabbing lg:cursor-default lg:grid-cols-2 lg:gap-12"
    >
      {editOverlay}

      {/* Image — shows first on mobile (flex order), right column on desktop */}
      <div className="group relative order-first aspect-[4/3] overflow-hidden rounded-2xl bg-bg-surface lg:order-last">
        <DynamicImage
          slotId={tabStatic.imageSlot}
          className="h-full w-full"
          fallbackClass="h-full w-full bg-gradient-to-br from-bg-surface to-border-light"
          aspectRatio="4/3"
        />
      </div>

      {/* Copy — below image on mobile, left column on desktop */}
      <div>
        <div className="flex items-center gap-2">
          <span className={`inline-flex rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${tabStatic.tagColor}`}>
            {v.tag}
          </span>
          {v.badge && (
            <span className="inline-flex rounded-full bg-accent/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-accent">
              {v.badge}
            </span>
          )}
        </div>

        <h3 className="mt-4 text-[1.75rem] font-semibold leading-snug text-text-dark"
          dangerouslySetInnerHTML={{ __html: v.headline }}
        />
        <p className="mt-4 text-base leading-relaxed text-text-body">{v.body}</p>

        <ul className="mt-6 space-y-2.5">
          {details.map((d) => (
            <li key={d} className="flex items-start gap-2.5 text-sm text-text-body">
              <svg viewBox="0 0 16 16" className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-accent" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M3 8l3 3.5 7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {d}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link href={tabStatic.ctaHref} className="rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover">
            {v.ctaText}
          </Link>
          <Link href={tabStatic.secondaryHref} className="text-sm font-medium text-text-muted underline decoration-dotted underline-offset-4 hover:text-accent">
            {v.secondaryCta} →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function ServiceExplorer() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const inView = useInView(sectionRef, { once: true, amount: 0.1 });
  const { v: meta, editOverlay: metaEditOverlay } = useEditableSlot("service-explorer-meta", metaFields);

  // Keep the active pill in view as the user swipes/taps through tabs —
  // otherwise on mobile the scrollable pill row can fall out of sync with
  // the card below and users lose track of which service they're looking at.
  useEffect(() => {
    const el = pillRefs.current[active];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [active]);

  return (
    <section ref={sectionRef} className="bg-bg-light py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          className="relative mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {metaEditOverlay}
          <Eyebrow>{meta.eyebrow}</Eyebrow>
          <h2 dangerouslySetInnerHTML={{ __html: meta.headline }} />
          <p className="mt-4 text-text-body">{meta.subhead}</p>
        </motion.div>

        {/* Pill tabs */}
        <motion.div
          className="mt-12 flex items-center justify-center gap-2 overflow-x-auto pb-1"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {TAB_STATIC.map((t, i) => (
            <button
              key={t.id}
              ref={(el) => { pillRefs.current[i] = el; }}
              onClick={() => setActive(i)}
              className={`flex-shrink-0 rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
                active === i
                  ? "bg-bg-dark text-text-light shadow-sm"
                  : "bg-bg-surface text-text-muted hover:bg-border-light hover:text-text-body"
              }`}
            >
              {t.label}
            </button>
          ))}
        </motion.div>

        {/* Mobile-only connector: labels what the user is looking at
            and visually ties the active pill to the card below */}
        <div className="relative mt-5 flex flex-col items-center lg:hidden">
          <svg
            className="h-3 w-3 text-bg-dark"
            viewBox="0 0 12 12"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M6 10 L0 0 L12 0 Z" />
          </svg>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-text-muted">
              Viewing
            </span>
            <span className="text-sm font-semibold text-text-dark">
              {TAB_STATIC[active].label}
            </span>
            <span className="text-[10px] text-text-muted">
              ({active + 1} of {TAB_STATIC.length})
            </span>
          </div>
        </div>

        {/* Content panel with side-arrow navigation */}
        <div className="relative mt-6 min-h-[420px] lg:mt-10 lg:px-14">

          {/* ← Prev arrow */}
          <button
            onClick={() => setActive((a) => Math.max(0, a - 1))}
            disabled={active === 0}
            className="absolute left-0 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border-light bg-bg-surface shadow-sm transition-all hover:border-text-muted hover:shadow-md disabled:opacity-20 disabled:cursor-default lg:flex"
            aria-label="Previous service"
          >
            <svg viewBox="0 0 16 16" className="h-4 w-4 text-text-body" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 3L5 8l5 5" />
            </svg>
          </button>

          <AnimatePresence mode="wait">
            <TabPanel
              key={active}
              tabIndex={active}
              tabStatic={TAB_STATIC[active]}
              onSwipeNext={() => setActive((a) => Math.min(TAB_STATIC.length - 1, a + 1))}
              onSwipePrev={() => setActive((a) => Math.max(0, a - 1))}
            />
          </AnimatePresence>

          {/* → Next arrow */}
          <button
            onClick={() => setActive((a) => Math.min(TAB_STATIC.length - 1, a + 1))}
            disabled={active === TAB_STATIC.length - 1}
            className="absolute right-0 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border-light bg-bg-surface shadow-sm transition-all hover:border-text-muted hover:shadow-md disabled:opacity-20 disabled:cursor-default lg:flex"
            aria-label="Next service"
          >
            <svg viewBox="0 0 16 16" className="h-4 w-4 text-text-body" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 3l5 5-5 5" />
            </svg>
          </button>

        </div>

        {/* Dot indicators */}
        <div className="mt-8 flex justify-center gap-1.5">
          {TAB_STATIC.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-1 rounded-full transition-all duration-300 ${
                active === i ? "w-6 bg-accent" : "w-1.5 bg-border-light hover:bg-text-muted"
              }`}
              aria-label={`View ${TAB_STATIC[i].label}`}
            />
          ))}
        </div>

        {/* Footnote */}
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
