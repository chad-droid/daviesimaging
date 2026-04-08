"use client";

import { Fragment, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const rooms = [
  {
    id: "living",
    label: "Living Room",
    stages: [
      {
        step: "01",
        label: "Reference",
        caption: "Model home source imagery",
        detail: "Your existing model home photography becomes the design brief. Furniture style, palette, and material selections are catalogued as permanent account assets for your builder.",
        tint: "bg-[#F0EDE8]",
        numBg: "bg-[#C9B99A]",
        numText: "text-[#5C4A2A]",
        accent: false,
        slotId: "modelmatch-living-reference",
      },
      {
        step: "02",
        label: "Vacant Room",
        caption: "Empty listing photo",
        detail: "The bare listing photo is uploaded through digDesk. Standard HDR listing photography works perfectly. No special requirements or new shoot needed.",
        tint: "bg-[#EBEBEB]",
        numBg: "bg-[#C0C0C0]",
        numText: "text-[#3A3A3A]",
        accent: false,
        slotId: "modelmatch-living-vacant",
      },
      {
        step: "03",
        label: "ModelMatch Result",
        caption: "On-brand staged output",
        detail: "The finished image uses furniture and accessories built from your model home references. It looks like your community, not a generic catalog. Delivered within one business day.",
        tint: "bg-[#EAE8F5]",
        numBg: "bg-accent/20",
        numText: "text-accent",
        accent: true,
        slotId: "modelmatch-living-result",
      },
    ],
  },
  {
    id: "primary",
    label: "Primary Bedroom",
    stages: [
      {
        step: "01",
        label: "Reference",
        caption: "Model home source imagery",
        detail: "The primary bedroom in your model home sets the standard. Bedding, nightstands, lighting, and artwork become catalogued design assets stored in your account.",
        tint: "bg-[#F0EDE8]",
        numBg: "bg-[#C9B99A]",
        numText: "text-[#5C4A2A]",
        accent: false,
        slotId: "modelmatch-primary-reference",
      },
      {
        step: "02",
        label: "Vacant Room",
        caption: "Empty listing photo",
        detail: "The vacant primary bedroom, photographed by a DIG listing photographer or sourced from existing inventory photography. Upload directly in digDesk.",
        tint: "bg-[#EBEBEB]",
        numBg: "bg-[#C0C0C0]",
        numText: "text-[#3A3A3A]",
        accent: false,
        slotId: "modelmatch-primary-vacant",
      },
      {
        step: "03",
        label: "ModelMatch Result",
        caption: "On-brand staged output",
        detail: "The staged primary bedroom mirrors your model home aesthetic. Buyers see the lifestyle they are purchasing, not an empty room. Every detail references your brand.",
        tint: "bg-[#EAE8F5]",
        numBg: "bg-accent/20",
        numText: "text-accent",
        accent: true,
        slotId: "modelmatch-primary-result",
      },
    ],
  },
  {
    id: "dining",
    label: "Dining Room",
    stages: [
      {
        step: "01",
        label: "Reference",
        caption: "Model home source imagery",
        detail: "Dining furniture, table settings, art placement, and lighting fixtures from your model home are catalogued as permanent account assets reused on every future order.",
        tint: "bg-[#F0EDE8]",
        numBg: "bg-[#C9B99A]",
        numText: "text-[#5C4A2A]",
        accent: false,
        slotId: "modelmatch-dining-reference",
      },
      {
        step: "02",
        label: "Vacant Room",
        caption: "Empty listing photo",
        detail: "An open dining space becomes the canvas. Existing photography or new listing photos both work. Upload through digDesk and select your ModelMatch Gallery.",
        tint: "bg-[#EBEBEB]",
        numBg: "bg-[#C0C0C0]",
        numText: "text-[#3A3A3A]",
        accent: false,
        slotId: "modelmatch-dining-vacant",
      },
      {
        step: "03",
        label: "ModelMatch Result",
        caption: "On-brand staged output",
        detail: "The finished image places your signature dining aesthetic into the vacant space. Brand-consistent across every listing, every community, every market.",
        tint: "bg-[#EAE8F5]",
        numBg: "bg-accent/20",
        numText: "text-accent",
        accent: true,
        slotId: "modelmatch-dining-result",
      },
    ],
  },
];

const ArrowIcon = () => (
  <svg
    className="h-5 w-5 text-border-light"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.75}
    stroke="currentColor"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

export function ModelMatchDemo() {
  const [activeRoom, setActiveRoom] = useState(0);
  const [activeStage, setActiveStage] = useState<number | null>(null);

  const room = rooms[activeRoom];

  return (
    <div>
      {/* Room selector pills */}
      <div className="mb-10 flex flex-wrap items-center gap-2">
        <span className="mr-1 text-xs font-medium uppercase tracking-widest text-text-muted">Room:</span>
        {rooms.map((r, i) => (
          <button
            key={r.id}
            type="button"
            onClick={() => {
              setActiveRoom(i);
              setActiveStage(null);
            }}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
              activeRoom === i
                ? "bg-accent text-white shadow-sm"
                : "border border-border-light text-text-body hover:border-accent hover:text-accent"
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      {/* Stage panels — animate on room switch */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeRoom}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* 3-column grid with arrow columns in between */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_32px_1fr_32px_1fr] lg:gap-0 lg:items-start">
            {room.stages.map((stage, i) => (
              <Fragment key={stage.step}>
                {/* Card column */}
                <div className="flex flex-col">
                  <button
                    type="button"
                    onClick={() => setActiveStage(activeStage === i ? null : i)}
                    className={`group w-full overflow-hidden rounded-2xl text-left transition-all duration-200 focus:outline-none ${
                      activeStage === i
                        ? "ring-2 ring-accent shadow-lg"
                        : "ring-1 ring-border-light hover:shadow-md hover:-translate-y-0.5"
                    }`}
                  >
                    {/* Image placeholder */}
                    <div className={`relative aspect-[4/3] w-full overflow-hidden ${stage.tint}`}>
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6">
                        <span
                          className={`inline-flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold ${stage.numBg} ${stage.numText}`}
                        >
                          {stage.step}
                        </span>
                        <span
                          className={`text-[11px] font-semibold uppercase tracking-widest ${
                            stage.accent ? "text-accent" : "text-text-muted"
                          }`}
                        >
                          {stage.label}
                        </span>
                        <span className="mt-1 font-mono text-[9px] text-text-muted/50">{stage.slotId}</span>
                      </div>
                    </div>

                    {/* Label bar */}
                    <div
                      className={`border-t px-4 py-3 transition-colors ${
                        activeStage === i
                          ? "border-accent/30 bg-accent/5"
                          : "border-border-light bg-bg-surface"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <p
                            className={`text-[10px] font-bold uppercase tracking-widest ${
                              stage.accent ? "text-accent" : "text-text-muted"
                            }`}
                          >
                            {stage.label}
                          </p>
                          <p className="mt-0.5 truncate text-sm font-medium text-text-dark">
                            {stage.caption}
                          </p>
                        </div>
                        <svg
                          className={`h-4 w-4 flex-shrink-0 transition-transform duration-200 ${
                            activeStage === i ? "rotate-180 text-accent" : "text-text-muted"
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                      </div>
                    </div>
                  </button>

                  {/* Expandable detail panel */}
                  <AnimatePresence initial={false}>
                    {activeStage === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="rounded-b-xl border border-t-0 border-accent/30 bg-accent/5 px-4 py-4">
                          <p className="text-sm leading-relaxed text-text-body">
                            {stage.detail}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Arrow column — only between cards, not after last */}
                {i < room.stages.length - 1 && (
                  <div className="hidden lg:flex items-center justify-center pt-[calc((50%-22px))]">
                    <ArrowIcon />
                  </div>
                )}
              </Fragment>
            ))}
          </div>

          <p className="mt-6 text-center text-xs text-text-muted">
            Tap any panel to learn more about that stage.
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
