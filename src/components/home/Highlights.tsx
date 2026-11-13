"use client";

import Link from "next/link";
import { useRef } from "react";
import { LoopVideo } from "./LoopVideo";

type Card = {
  label: string;
  line: string;
  href: string;
  video?: string;
  image: string;
};

const BLOB = "https://6pcw74e8rdx0ig2m.public.blob.vercel-storage.com";

const CARDS: Card[] = [
  {
    label: "Spec+",
    line: "Listing photography, ModelMatch staging and FrameFlow video for $600.",
    href: "/programs/spec-plus",
    video: "/client-showcase/specplus-artisan.mp4",
    image: "/client-showcase/specplus-artisan-poster.webp",
  },
  {
    label: "ModelMatch",
    line: "Your model home merchandising, in each and every one of your listings.",
    href: "/services/virtual-staging",
    image: "/mm/result-1-great-room.jpg",
  },
  {
    label: "CineFlow",
    line: "Lifelike cinematic sequences without a real photo shoot.",
    href: "/services/cineflow",
    video: "/client-showcase/cineflow-crestmont.mp4",
    image: "/client-showcase/cineflow-crestmont-poster.webp",
  },
  {
    label: "PlanMatch",
    line: "Photorealistic images of your plans, before your community is built.",
    href: "/services/planmatch",
    image: "/client-showcase/planmatch-coventry-ext-twilight.webp",
  },
  {
    label: "Moments",
    line: "Vertical close ups of what is built into the home.",
    href: "/services/moments",
    image: "/showcase/moments-hood-2.webp",
  },
  {
    label: "ActFlow",
    line: "Virtual talent, so buyers can envision life in your homes.",
    href: "/services/actflow",
    video: "/client-showcase/actflow-blueheron.mp4",
    image: "/client-showcase/actflow-blueheron-poster.webp",
  },
  {
    label: "Premium",
    line: "The best model home photography available to the industry.",
    href: "/services/premium",
    image: `${BLOB}/site-assets/shawood-aspen-v2-8.webp`,
  },
];

/** "Get the highlights": one tall card per product, swiped or paddled. */
export function Highlights() {
  const track = useRef<HTMLDivElement>(null);
  const nudge = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  const paddle =
    "flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-white hover:text-white";

  return (
    <section id="highlights" className="scroll-mt-28 bg-bg-dark py-24 text-text-light lg:py-36">
      <div className="mx-auto flex max-w-7xl items-end justify-between gap-6 px-6">
        <h2 className="max-w-[40rem] text-text-light lg:text-[3rem] lg:leading-[1.08]">
          A visual asset platform for <strong>home builders</strong>.
        </h2>
        <div className="hidden gap-3 sm:flex">
          <button type="button" onClick={() => nudge(-1)} aria-label="Previous highlights" className={paddle}>
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
              <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button type="button" onClick={() => nudge(1)} aria-label="More highlights" className={paddle}>
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
              <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={track}
        className="mt-14 flex snap-x lg:mt-20 snap-mandatory gap-5 overflow-x-auto px-6 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:px-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]"
      >
        {CARDS.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="group relative aspect-[4/5] w-[78%] shrink-0 snap-start overflow-hidden rounded-3xl bg-bg-dark-surface ring-1 ring-white/10 sm:w-[46%] lg:w-[30%]"
          >
            {c.video ? (
              <LoopVideo
                src={c.video}
                poster={c.image}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={c.image}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/30" />
            <div className="absolute inset-x-0 top-0 p-6">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-white/80">{c.label}</p>
            </div>
            <div className="absolute inset-x-0 bottom-0 p-6">
              <p className="font-serif text-[1.6rem] leading-tight text-white lg:text-[1.85rem]" style={{ fontFamily: "var(--font-heading)" }}>
                {c.line}
              </p>
              <p className="mt-4 text-sm font-medium text-white/70 transition-colors group-hover:text-white">
                Learn more &rarr;
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
