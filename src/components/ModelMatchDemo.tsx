"use client";

import { Fragment, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DynamicImage } from "@/components/DynamicImage";

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

function getGridCols(activeStage: number | null): string {
  if (activeStage === null) return "1fr 32px 1fr 32px 1fr";
  const cols = ["0.8fr", "0.8fr", "0.8fr"];
  cols[activeStage] = "1.4fr";
  return `${cols[0]} 32px ${cols[1]} 32px ${cols[2]}`;
}

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
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const room = rooms[activeRoom];
  const isCompressed = (i: number) => isDesktop && activeStage !== null && activeStage !== i;

  return (
    <div>
      {/* Room selector pills */}
      <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
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

      {/* Stage panels */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeRoom}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="grid grid-cols-1 gap-4 lg:gap-0 lg:items-start"
            style={isDesktop ? {
              gridTemplateColumns: getGridCols(activeStage),
              transition: "grid-template-columns 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
            } : undefined}
          >
            {room.stages.map((stage, i) => (
              <Fragment key={stage.step}>
                {/* Card */}
                <div className="flex flex-col min-w-0">
                  <button
                    type="button"
                    onClick={() => setActiveStage(activeStage === i ? null : i)}
                    className={`group w-full overflow-hidden rounded-2xl text-left transition-shadow duration-200 focus:outline-none ${
                      activeStage === i
                        ? "ring-2 ring-accent shadow-lg"
                        : "ring-1 ring-border-light hover:shadow-md"
                    }`}
                  >
                    {/* Image area — aspect-ratio based so height scales with column width */}
                    <div className={`relative aspect-[4/3] w-full overflow-hidden ${stage.tint}`}>
                      <DynamicImage
                        slotId={stage.slotId}
                        className="absolute inset-0 h-full w-full"
                        aspectRatio="4/3"
                        disableLightbox
                      />
                    </div>

                    {/* Label bar */}
                    <div
                      className={`border-t px-6 py-3 transition-colors ${
                        activeStage === i
                          ? "border-accent/30 bg-accent/5"
                          : "border-border-light bg-bg-surface"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <p
                            className={`text-[10px] font-bold uppercase tracking-widest ${
                              stage.accent ? "text-accent" : "text-text-muted"
                            }`}
                          >
                            {stage.label}
                          </p>
                          {!isCompressed(i) && (
                            <p className="mt-0.5 break-words pr-1 text-sm font-medium leading-snug text-text-dark">
                              {stage.caption}
                            </p>
                          )}
                        </div>
                        {!isCompressed(i) && (
                          <svg
                            className={`mt-0.5 h-4 w-4 flex-shrink-0 transition-transform duration-200 ${
                              activeStage === i ? "rotate-180 text-accent" : "text-text-muted"
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </button>

                  {/* Expandable detail */}
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
                          <p className="text-sm leading-relaxed text-text-body">{stage.detail}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Arrow between cards */}
                {i < room.stages.length - 1 && (
                  <div className="hidden items-center justify-center lg:flex" style={{ paddingTop: "calc(3.25rem)" }}>
                    <ArrowIcon />
                  </div>
                )}
              </Fragment>
            ))}
          </div>

          <p className="mt-6 text-center text-xs text-text-muted">
            Click any panel to expand it.
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
