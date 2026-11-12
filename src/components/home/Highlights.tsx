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
    line: "Photos, staging and video. One order, $600.",
    href: "/programs/spec-plus",
    video: "/client-showcase/specplus-artisan.mp4",
    image: "/client-showcase/specplus-artisan-poster.webp",
  },
  {
    label: "ModelMatch",
    line: "Staged with your own model home furniture.",
    href: "/services/virtual-staging",
    image: "/mm/result-1-great-room.jpg",
  },
  {
    label: "Cinematic",
    line: "A home told as a story, not a tour.",
    href: "/services/showcase#cinematic",
    video: "/client-showcase/cineflow-crestmont.mp4",
    image: "/client-showcase/cineflow-crestmont-poster.webp",
  },
  {
    label: "PlanMatch",
    line: "Photography before the home is built.",
    href: "/services/showcase#planmatch",
    image: "/client-showcase/planmatch-coventry-ext-twilight.webp",
  },
  {
    label: "Moments",
    line: "The details a wide listing shot misses.",
    href: "/services/showcase#moments",
    image: "/showcase/moments-hood-2.webp",
  },
  {
    label: "Premium",
    line: "Model homes, amenities and lifestyle.",
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
    <section id="highlights" className="scroll-mt-28 bg-bg-dark py-24 text-text-light lg:py-32">
      <div className="mx-auto flex max-w-7xl items-end justify-between gap-6 px-6">
        <h2 className="text-text-light lg:text-[3rem]">
          Get the <strong>highlights</strong>.
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
        className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:px-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]"
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
