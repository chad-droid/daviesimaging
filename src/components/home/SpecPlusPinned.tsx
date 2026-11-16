"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { Eyebrow } from "@/components/Eyebrow";
import { LoopVideo } from "./LoopVideo";

const STEPS = [
  {
    n: "01",
    title: "Listing photography",
    count: "25",
    unit: "photos",
    body: "MLS-ready photographs of the finished home.",
    image: "/mm/shane-before.jpg",
    alt: "Listing photograph of a vacant great room",
  },
  {
    n: "02",
    title: "Virtual staging",
    count: "8",
    unit: "staged images",
    body: "Staged with ModelMatch, using your own model home furniture.",
    image: "/mm/shane-after.jpg",
    alt: "The same great room, virtually staged",
  },
  {
    n: "03",
    title: "Virtual video",
    count: "1",
    unit: "listing video",
    body: "A wide FrameFlow listing video, built from the same photos.",
    image: "/client-showcase/specplus-palatka-poster.webp",
    video: "/client-showcase/specplus-palatka.mp4",
    alt: "Spec+ listing video",
  },
];

function Media({ step, active }: { step: (typeof STEPS)[number]; active: boolean }) {
  return step.video ? (
    <LoopVideo src={step.video} poster={step.image} active={active} className="h-full w-full object-cover" />
  ) : (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={step.image} alt={step.alt} className="h-full w-full object-cover" />
  );
}

/**
 * One deliverable per row: how many on the left in large numerals, what it is
 * on the right. The active row is full strength with an accent rule; the
 * others sit back until the scroll reaches them.
 */
function StepRow({ step, active }: { step: (typeof STEPS)[number]; active: boolean }) {
  return (
    <div
      className={`relative grid grid-cols-[5.5rem_1fr] items-center gap-5 border-b border-border-light py-[clamp(0.6rem,1.8vh,1rem)] transition-opacity duration-500 ${
        active ? "opacity-100" : "opacity-40"
      }`}
    >
      <span
        className={`absolute -top-px left-0 h-0.5 bg-accent transition-all duration-500 ${active ? "w-full" : "w-0"}`}
        aria-hidden
      />
      <div>
        <p className="text-[clamp(2.25rem,5.5vh,3rem)] leading-none text-text-dark" style={{ fontFamily: "var(--font-heading)" }}>
          {step.count}
        </p>
        <p className="mt-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-accent">{step.unit}</p>
      </div>
      <div>
        <h3 className="text-[clamp(1.25rem,2.8vh,1.5rem)] leading-tight">{step.title}</h3>
        <p className="mt-1.5 text-text-body">{step.body}</p>
      </div>
    </div>
  );
}

function Numbers() {
  return (
    <dl className="mt-8 flex gap-12 lg:mt-5 lg:justify-end">
      <div>
        <dd className="text-[2.5rem] leading-none text-text-dark" style={{ fontFamily: "var(--font-heading)" }}>
          $600
        </dd>
        <dt className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-text-muted">Flat, all home sizes</dt>
      </div>
      <div>
        <dd className="text-[2.5rem] leading-none text-text-dark" style={{ fontFamily: "var(--font-heading)" }}>
          72 hrs
        </dd>
        <dt className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-text-muted">After photography</dt>
      </div>
    </dl>
  );
}

function Cta() {
  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
      <Link
        href="/programs/spec-plus"
        className="rounded-full bg-accent px-8 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
      >
        Explore Spec+
      </Link>
    </div>
  );
}

/**
 * The pinned chapter for phones. One frame holds still while the visitor
 * scrolls, and moves from photo, to staged, to video. Under it the three
 * deliverables sit side by side as numerals, the current one lit, with a
 * single line saying what it is. Price, turnaround and the button stay in
 * view the whole way through.
 */
function PhonePin() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setActive(Math.min(STEPS.length - 1, Math.floor(p * STEPS.length)));
  });
  const step = STEPS[active];

  return (
    <div ref={ref} className="relative h-[190svh]">
      <div className="sticky top-[7.5rem] flex h-[calc(100svh-7.5rem)] flex-col justify-center gap-5 overflow-hidden px-6 py-6">
        <div className="relative aspect-[4/3] max-h-[38svh] w-full overflow-hidden rounded-2xl bg-bg-dark">
          {STEPS.map((s, i) => (
            <div key={s.n} className="absolute inset-0 transition-opacity duration-700" style={{ opacity: i === active ? 1 : 0 }}>
              <Media step={s} active={i === active} />
            </div>
          ))}
          <span className="absolute left-4 top-4 rounded-full bg-black/55 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.15em] text-white backdrop-blur">
            {step.n} · {step.title}
          </span>
        </div>

        <div>
          <div className="grid grid-cols-3 gap-3">
            {STEPS.map((s, i) => (
              <button
                key={s.n}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={i === active}
                className={`relative border-t border-border-light pt-3 text-left transition-opacity duration-500 ${
                  i === active ? "opacity-100" : "opacity-40"
                }`}
              >
                <span
                  className={`absolute -top-px left-0 h-0.5 bg-accent transition-all duration-500 ${i === active ? "w-full" : "w-0"}`}
                  aria-hidden
                />
                <span className="block text-[2.25rem] leading-none text-text-dark" style={{ fontFamily: "var(--font-heading)" }}>
                  {s.count}
                </span>
                <span className="mt-1 block text-[0.6rem] font-bold uppercase tracking-[0.1em] text-accent">{s.unit}</span>
              </button>
            ))}
          </div>
          <p className="mt-3 min-h-[2.75rem] text-[0.9375rem] leading-snug text-text-body" aria-live="polite">
            {step.body}
          </p>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-border-light pt-4">
          <p className="text-sm leading-snug text-text-body">
            <strong className="text-text-dark">$600</strong> flat, all home sizes.
            <br />
            <strong className="text-text-dark">72 hrs</strong> after photography.
          </p>
          <Link
            href="/programs/spec-plus"
            className="shrink-0 rounded-full bg-accent px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
          >
            Explore Spec+
          </Link>
        </div>
      </div>
    </div>
  );
}

/**
 * Spec+ chapter. The section pins while the visitor scrolls and one frame
 * moves from photo, to staged, to video. From lg up the steps sit beside the
 * frame; on phones they sit under it (PhonePin). Windows too short to pin,
 * landscape phones and reduced-motion visitors get the three steps stacked.
 */
export function SpecPlusPinned() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setActive(Math.min(STEPS.length - 1, Math.floor(p * STEPS.length)));
  });

  // Phones in portrait pin too. Decided after mount, so the stacked layout is
  // what is served and what reduced-motion visitors keep.
  const [phonePin, setPhonePin] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(
      "(max-width: 1023px) and (min-height: 560px) and (orientation: portrait) and (prefers-reduced-motion: no-preference)",
    );
    const sync = () => setPhonePin(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const heading = (
    <>
      <Eyebrow>Spec+</Eyebrow>
      <h2 className="lg:text-[clamp(2rem,5.2vh,3rem)] lg:leading-[1.08]">
        Listing photography, ModelMatch staging and FrameFlow video, <strong>in one order</strong>.
      </h2>
    </>
  );

  return (
    <section id="spec-plus" className="scroll-mt-28 bg-bg-light">
      {/* Pinned, lg and up */}
      <div ref={ref} className="relative hidden h-[175vh] [@media(min-height:720px)]:lg:block">
        <div className="sticky top-[7.5rem] flex h-[calc(100vh-7.5rem)] items-center overflow-hidden">
          <div className="mx-auto grid w-full max-w-7xl grid-cols-[5fr_7fr] items-center gap-16 px-6">
            <div>
              {heading}
              <div className="mt-6 border-t border-border-light">
                {STEPS.map((s, i) => (
                  <button key={s.n} type="button" onClick={() => setActive(i)} className="block w-full cursor-pointer text-left">
                    <StepRow step={s} active={i === active} />
                  </button>
                ))}
              </div>
              <Cta />
            </div>
            <div>
            <div className="relative aspect-[4/3] max-h-[52vh] w-full overflow-hidden rounded-3xl bg-bg-dark shadow-2xl">
              {STEPS.map((s, i) => (
                <div
                  key={s.n}
                  className="absolute inset-0 transition-opacity duration-700"
                  style={{ opacity: i === active ? 1 : 0 }}
                >
                  <Media step={s} active={i === active} />
                </div>
              ))}
              <span className="absolute left-5 top-5 rounded-full bg-black/55 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.15em] text-white backdrop-blur">
                {STEPS[active].n} · {STEPS[active].title}
              </span>
            </div>
            <Numbers />
            </div>
          </div>
        </div>
      </div>

      {/* Pinned, phones in portrait */}
      {phonePin && (
        <div className="lg:hidden">
          <div className="px-6 pt-16">{heading}</div>
          <PhonePin />
        </div>
      )}

      {/* Stacked: everything else below lg, and windows too short to pin */}
      <div className={`mx-auto max-w-7xl px-6 py-16 lg:py-24 [@media(min-height:720px)]:lg:hidden ${phonePin ? "hidden" : ""}`}>
        {heading}
        <div className="mt-10 space-y-12">
          {STEPS.map((s) => (
            <div key={s.n} className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-12">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-bg-dark">
                <Media step={s} active />
              </div>
              <div className="mt-2 lg:mt-0">
                <StepRow step={s} active />
              </div>
            </div>
          ))}
        </div>
        <Numbers />
        <Cta />
      </div>
    </section>
  );
}
