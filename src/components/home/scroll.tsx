"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ShowcaseFilm } from "@/components/ShowcaseFilm";
import { LoopVideo } from "./LoopVideo";

/* ── Film that grows from a framed card to full bleed as it arrives. ─────── */
export function GrowingFilm({ src, poster, label }: { src: string; poster: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  // 0 when the film's top edge enters the viewport, 1 when it nears the top.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.18"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.7, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], [40, 0]);

  return (
    <div ref={ref} className="mt-12 lg:mt-16">
      <motion.div className="origin-top overflow-hidden bg-black" style={{ scale, borderRadius: radius }}>
        <ShowcaseFilm src={src} poster={poster} label={label} sound />
      </motion.div>
    </div>
  );
}

/* ── Before/after that wipes with the scroll, then hands over to the drag. ─ */
export function ScrollWipe({ before, after }: { before: string; after: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const taken = useRef(false); // true once the visitor drags: scroll stops driving
  const [dragging, setDragging] = useState(false);
  const pos = useMotionValue(92); // % of the frame still showing "before"

  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start 0.9", "start 0.25"] });
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (!taken.current) pos.set(92 - p * 62); // 92% -> 30%
  });

  const clip = useMotionTemplate`inset(0 ${useTransform(pos, (v) => 100 - v)}% 0 0)`;
  const left = useMotionTemplate`${pos}%`;

  const setFromX = (x: number) => {
    const r = wrap.current?.getBoundingClientRect();
    if (!r) return;
    pos.set(Math.max(0, Math.min(100, ((x - r.left) / r.width) * 100)));
  };

  return (
    <div
      ref={wrap}
      onPointerDown={(e) => {
        taken.current = true;
        setDragging(true);
        e.currentTarget.setPointerCapture(e.pointerId);
        setFromX(e.clientX);
      }}
      onPointerMove={(e) => dragging && setFromX(e.clientX)}
      onPointerUp={() => setDragging(false)}
      onPointerCancel={() => setDragging(false)}
      className="relative aspect-[16/9] cursor-ew-resize touch-pan-y select-none overflow-hidden rounded-2xl bg-bg-dark shadow-2xl"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={after} alt="After ModelMatch staging" draggable={false} className="pointer-events-none absolute inset-0 h-full w-full object-cover" />
      <motion.div className="absolute inset-0" style={{ clipPath: clip }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={before} alt="Before staging" draggable={false} className="pointer-events-none h-full w-full object-cover" />
      </motion.div>
      <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.15em] text-white backdrop-blur">
        Before
      </span>
      <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-accent px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.15em] text-white">
        After · ModelMatch
      </span>
      <motion.div className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white" style={{ left }}>
        <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-text-dark shadow-lg">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
            <path d="M9 6l-5 6 5 6M15 6l5 6-5 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </motion.div>
    </div>
  );
}

/* ── Photography strip that glides sideways as the page scrolls down. ────── */
export function GlideStrip({ items }: { items: { src: string; label: string; wide: boolean }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["6%", "-42%"]);

  const figure = (p: (typeof items)[number], sizing: string) => (
    <figure key={p.src} className={`relative shrink-0 overflow-hidden rounded-2xl bg-bg-dark ${sizing}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={p.src} alt={`${p.label} photography by DIG`} loading="lazy" className="h-full w-full object-cover" />
      <figcaption className="absolute left-4 top-4 rounded-full bg-black/55 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.15em] text-white backdrop-blur">
        {p.label}
      </figcaption>
    </figure>
  );

  return (
    <div ref={ref} className="mt-12 lg:mt-16">
      {/* lg and up: the strip moves with the scroll */}
      <div className="hidden overflow-hidden lg:block">
        <motion.div className="flex w-max gap-5 will-change-transform" style={{ x }}>
          {items.map((p) => figure(p, `h-[34rem] ${p.wide ? "w-[54rem]" : "w-[32rem]"}`))}
        </motion.div>
      </div>
      {/* below lg: an ordinary swipe row */}
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden">
        {items.map((p) => figure(p, `h-[22rem] snap-start ${p.wide ? "w-[88%] sm:w-[62%]" : "w-[70%] sm:w-[40%]"}`))}
      </div>
    </div>
  );
}

/* ── Scroll-scrubbed film: the scroll position is the playhead. ──────────── */
const SCRUB_STAGES = ["The plan", "The model", "The photograph"];

export function ScrubFilm({
  scrubSrc,
  loopSrc,
  poster,
  children,
}: {
  /** All-keyframe encode, so any frame can be shown instantly. */
  scrubSrc: string;
  /** Ordinary encode, autoplayed below lg where pinning is skipped. */
  loopSrc: string;
  poster: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [stage, setStage] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // A light spring so a flick of the wheel eases the film instead of jumping it.
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  useMotionValueEvent(smooth, "change", (p) => {
    const v = video.current;
    if (v && v.duration) v.currentTime = Math.min(v.duration - 0.05, Math.max(0, p) * v.duration);
    setStage(p < 0.3 ? 0 : p < 0.62 ? 1 : 2);
  });
  const bar = useTransform(smooth, [0, 1], ["0%", "100%"]);

  return (
    <>
      {/* Pinned and scrubbed, lg and up */}
      <div ref={ref} className="relative hidden h-[320vh] lg:block">
        <div className="sticky top-[7.5rem] h-[calc(100vh-7.5rem)] overflow-hidden bg-black">
          <video
            ref={video}
            src={scrubSrc}
            poster={poster}
            muted
            playsInline
            preload="auto"
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/25 to-transparent" />
          <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-between px-6 py-14">
            <div className="max-w-xl">{children}</div>
            <div className="max-w-md">
              <ol className="flex gap-6 text-xs font-bold uppercase tracking-[0.15em]">
                {SCRUB_STAGES.map((s, i) => (
                  <li key={s} className={`transition-colors duration-300 ${i === stage ? "text-white" : "text-white/35"}`}>
                    {s}
                  </li>
                ))}
              </ol>
              <div className="mt-3 h-px w-full bg-white/20">
                <motion.div className="h-px bg-white" style={{ width: bar }} />
              </div>
              <p className="mt-3 text-xs text-white/50">Scroll to build the home</p>
            </div>
          </div>
        </div>
      </div>

      {/* Below lg: the same film, simply playing */}
      <div className="bg-bg-dark px-6 py-24 text-text-light lg:hidden">
        {children}
        <div className="mt-10 overflow-hidden rounded-2xl bg-black">
          <LoopVideo src={loopSrc} poster={poster} className="aspect-video w-full object-cover" />
        </div>
      </div>
    </>
  );
}
