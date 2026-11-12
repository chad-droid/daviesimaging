"use client";

import Link from "next/link";
import { useRef, useState } from "react";
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
      <Link href="/gallery/listings" className="text-sm font-medium text-text-body transition-colors hover:text-accent">
        See Spec+ deliveries &rarr;
      </Link>
    </div>
  );
}

/**
 * Spec+ chapter. From lg up the section pins while the visitor scrolls: the
 * frame on the right moves from photo, to staged, to video as each step on
 * the left lights up. Below lg the three steps simply stack.
 */
export function SpecPlusPinned() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setActive(Math.min(STEPS.length - 1, Math.floor(p * STEPS.length)));
  });

  const heading = (
    <>
      <Eyebrow>Spec+</Eyebrow>
      <h2 className="lg:text-[clamp(2rem,5.2vh,3rem)] lg:leading-[1.08]">
        One order. <strong>Everything</strong> a spec home needs.
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

      {/* Stacked: below lg, and on windows too short to pin */}
      <div className="mx-auto max-w-7xl px-6 py-24 [@media(min-height:720px)]:lg:hidden">
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
