"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Eyebrow } from "@/components/Eyebrow";
import { DarkSectionBg } from "@/components/DarkSectionBg";
import { RegionMap } from "@/components/RegionMap";

/**
 * /capabilities — full-screen presentation deck.
 *
 * Mounted chromelessly via SiteShell (no Nav, no Footer, no email modal).
 * Typography, color tokens, and card patterns mirror the rest of daviesimaging.com.
 *
 * Editing tips:
 *  - Swap photos by editing the SITE entries below.
 *  - Drop in YouTube IDs in the YT object to swap a hero image for a video.
 *  - FULL_BLEED_SLIDES (below) controls which slides paint chrome over an image.
 */

// ─── Media sources (pulled from daviesimaging.com /api/site-assets) ──────────
const BLOB = "https://6pcw74e8rdx0ig2m.public.blob.vercel-storage.com";
const SITE = {
  premium: `${BLOB}/site-assets/shawood-aspen-v2-8.webp`,
  premiumAmenities: `${BLOB}/site-assets/regency_amenity_back-exterior_1.webp`,
  modelHomeHero: `${BLOB}/gallery/cadence-homes/trinity-falls-model-photography/trinity-falls-camille-hires-14.webp`,
  matterport: `${BLOB}/site-assets/04072026_200107.webp`,
  listing: `${BLOB}/site-assets/1775674604579-Indio-Hills-Lot-174-vacant-01-9kDK7wf6vjIsVqUd6Xe90TkQFzFcuG.jpg`,
  virtualVideoCover: `${BLOB}/site-assets/bolsena-plan-3366-web-2.webp`,
  modelMatch: {
    living: {
      reference: `${BLOB}/site-assets/1775671014519-living-room-1424KirkhillLane-02-bCdPPCGkj4wkvMzDGkyrWPFqPzUJ2v.jpg`,
      vacant: `${BLOB}/site-assets/1775671026521-living-room-1424KirkhillLane-02a-jItfigI7QoAD9ucHry0F3taWJbe68d.jpg`,
      result: `${BLOB}/site-assets/1775671035424-living-room-1424KirkhillLane-03-AZDTQiTFPd60vALdR7kjpXKUyEDQmW.jpg`,
    },
    dining: {
      reference: `${BLOB}/site-assets/1775671472528-dining-area-1424KirkhillLane-08-qtXIcAsqumTCteo8uw4sh49kHdfpir.jpg`,
      vacant: `${BLOB}/site-assets/1775671512626-dining-area-1424KirkhillLane-08a-RhtvXNzR1SnjD6wyUDE6NbKft9AJoX.jpg`,
      result: `${BLOB}/site-assets/1775671530144-dining-area-1424KirkhillLane-08b-HFQ3jmjaC8HOoq3OjWl3tMLB5ARuEc.jpg`,
    },
    primary: {
      reference: `${BLOB}/site-assets/1775671434628-main-bedroom-1424KirkhillLane-12-3QmSWZSZisA7V0ZVZEJ74VesqCdjEw.jpg`,
      vacant: `${BLOB}/site-assets/1775671445384-main-bedroom-1424KirkhillLane-15-2Qijaj7oU59B5TFW3kAKBpYpWzpIuX.jpg`,
      result: `${BLOB}/site-assets/1775671455693-main-bedroom-1424KirkhillLane-16-9M3DwbLY2RoF8SbPAYbVSUi8nyKhi4.jpg`,
    },
  },
  specPlus: `${BLOB}/site-assets/living-room-1424kirkhilllane-08.webp`,
  videoProduction: `${BLOB}/site-assets/screenshot-2026-04-07-at-7-55-33-pm.webp`,
  amenity: `${BLOB}/site-assets/regency_amenity_back-exterior_1.webp`,
  digDesk: `${BLOB}/site-assets/digdesk-screenshot.webp`,
  regional: `${BLOB}/site-assets/heronbay_clubhouse_aerial.webp`,
  siloModel: `${BLOB}/site-assets/ashbourne-merrick-web-15.webp`,
  siloListings: `${BLOB}/site-assets/wayward-wind-7432-vacant-01.webp`,
  siloCommunity: `${BLOB}/site-assets/santa-rita-ranch-aerials-web-1.webp`,
};

const YT = {
  videoContent: "I14Qvzlja34",    // Model Home Video.
  virtualVideo: "4MYlfUOAdOk",    // Perry Homes FrameFlow promo.
  videoProduction: "dFI--iFGkNU", // Community Video.
};

const TOTAL_SLIDES = 31;

// 0-indexed slide positions that render edge-to-edge image/video. Chrome
// switches to light-on-dark with gradient overlays so it stays legible.
const FULL_BLEED_SLIDES = new Set<number>([
  4,  // Premium Show
  6,  // Video Content Show
  8,  // Matterport Show
  11, // Listing Show
  13, // Virtual Video Show
  16, // ModelMatch — Reference
  17, // ModelMatch — Vacant
  18, // ModelMatch — Staged Result
  23, // Video Production Show
  25, // Amenity Show
]);

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

export function CapabilitiesDeck() {
  const [current, setCurrent] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);

  const show = useCallback((n: number) => {
    const clamped = Math.max(0, Math.min(TOTAL_SLIDES - 1, n));
    setCurrent(clamped);
    const hash = `#${clamped + 1}`;
    if (typeof window !== "undefined" && window.location.hash !== hash) {
      window.history.replaceState(null, "", hash);
    }
  }, []);

  useEffect(() => {
    const el = slideRefs.current[current];
    if (el) el.scrollTop = 0;
  }, [current]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        show(current + 1);
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        show(current - 1);
      } else if (e.key === "Home") {
        show(0);
      } else if (e.key === "End") {
        show(TOTAL_SLIDES - 1);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [current, show]);

  useEffect(() => {
    let touchX: number | null = null;
    function onStart(e: TouchEvent) {
      touchX = e.changedTouches[0].clientX;
    }
    function onEnd(e: TouchEvent) {
      if (touchX === null) return;
      const dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 60) {
        if (dx < 0) show(current + 1);
        else show(current - 1);
      }
      touchX = null;
    }
    document.addEventListener("touchstart", onStart);
    document.addEventListener("touchend", onEnd);
    return () => {
      document.removeEventListener("touchstart", onStart);
      document.removeEventListener("touchend", onEnd);
    };
  }, [current, show]);

  useEffect(() => {
    const hashN = parseInt(window.location.hash.slice(1), 10);
    if (!isNaN(hashN)) show(hashN - 1);
    const t1 = window.setTimeout(() => setShowHint(true), 800);
    const t2 = window.setTimeout(() => setShowHint(false), 5200);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const slideIsDark = current === 0 || current === TOTAL_SLIDES - 1;
  const slideIsFullBleed = FULL_BLEED_SLIDES.has(current);
  // Chrome treats full-bleed slides like dark slides (white text, white-on-dark borders).
  const chromeOnDark = slideIsDark || slideIsFullBleed;
  const progressPct = ((current + 1) / TOTAL_SLIDES) * 100;

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-bg-light text-text-body">
      {/* Chrome legibility gradients on full-bleed slides */}
      {slideIsFullBleed && (
        <>
          <div
            className="pointer-events-none fixed inset-x-0 top-0 z-[18] h-28"
            style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0))" }}
            aria-hidden
          />
          <div
            className="pointer-events-none fixed inset-x-0 bottom-0 z-[18] h-28"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5), rgba(0,0,0,0))" }}
            aria-hidden
          />
        </>
      )}

      {/* Top chrome */}
      <header className="pointer-events-none fixed inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-5 sm:px-10">
        <span
          className={`text-[0.65rem] font-bold uppercase tracking-[0.4em] transition-colors ${
            chromeOnDark ? "text-white/85" : "text-text-dark"
          }`}
        >
          Davies Imaging Group
        </span>
        <span
          className={`text-[0.65rem] font-medium uppercase tracking-[0.25em] tabular-nums transition-colors ${
            chromeOnDark ? "text-white/60" : "text-text-muted"
          }`}
        >
          {pad(current + 1)} / {pad(TOTAL_SLIDES)}
        </span>
      </header>
      <div
        className={`pointer-events-none fixed inset-x-6 top-[3.2rem] z-[19] h-px transition-colors sm:inset-x-10 ${
          chromeOnDark ? "bg-white/20" : "bg-border-light"
        }`}
      />

      {/* Slide stage */}
      <main className="relative h-full w-full">
        {slides.map((Slide, i) => (
          <div
            key={i}
            ref={(el) => {
              slideRefs.current[i] = el;
            }}
            className={`absolute inset-0 overflow-auto transition-opacity duration-500 ease-out ${
              i === current ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
            }`}
            aria-hidden={i !== current}
          >
            <Slide />
          </div>
        ))}
      </main>

      {/* Bottom chrome */}
      <footer
        className={`fixed inset-x-0 bottom-0 z-20 flex items-center gap-4 px-6 py-4 sm:px-10 ${
          chromeOnDark ? "text-white" : "text-text-body"
        }`}
      >
        <button
          type="button"
          onClick={() => show(current - 1)}
          disabled={current === 0}
          className={`rounded-full border px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.18em] transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${
            chromeOnDark
              ? "border-white/30 text-white/90 enabled:hover:border-accent-dark-hover enabled:hover:text-accent-dark-hover"
              : "border-border-light text-text-body enabled:hover:border-accent enabled:hover:text-accent"
          }`}
          aria-label="Previous slide"
        >
          &larr; Prev
        </button>
        <div
          className={`relative h-px flex-1 overflow-hidden ${
            chromeOnDark ? "bg-white/25" : "bg-border-light"
          }`}
        >
          <div
            className="absolute inset-y-0 left-0 bg-accent transition-[width] duration-500 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <button
          type="button"
          onClick={() => show(current + 1)}
          disabled={current === TOTAL_SLIDES - 1}
          className={`rounded-full border px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.18em] transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${
            chromeOnDark
              ? "border-white/30 text-white/90 enabled:hover:border-accent-dark-hover enabled:hover:text-accent-dark-hover"
              : "border-border-light text-text-body enabled:hover:border-accent enabled:hover:text-accent"
          }`}
          aria-label="Next slide"
        >
          Next &rarr;
        </button>
        <Link
          href="/"
          className={`ml-2 hidden text-[0.65rem] font-medium uppercase tracking-[0.2em] transition-colors sm:inline-flex ${
            chromeOnDark ? "text-white/55 hover:text-white" : "text-text-muted hover:text-accent"
          }`}
        >
          daviesimaging.com
        </Link>
      </footer>

      {/* Keyboard hint */}
      <div
        className={`pointer-events-none fixed bottom-20 left-1/2 z-30 -translate-x-1/2 rounded bg-bg-dark/85 px-3 py-2 text-[0.7rem] font-medium uppercase tracking-[0.15em] text-text-light transition-opacity duration-500 ${
          showHint ? "opacity-100" : "opacity-0"
        }`}
      >
        Use{" "}
        <kbd className="mx-0.5 rounded bg-accent px-1.5 py-0.5 text-[0.65rem] text-white">&larr;</kbd>{" "}
        <kbd className="mx-0.5 rounded bg-accent px-1.5 py-0.5 text-[0.65rem] text-white">&rarr;</kbd>{" "}
        to navigate
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Reusable building blocks
// ─────────────────────────────────────────────────────────────────────────────

function SlideShell({
  children,
  dark,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <div
      className={`relative min-h-full px-6 pb-24 pt-24 sm:px-12 sm:pt-28 ${
        dark ? "bg-bg-dark text-text-light" : "bg-bg-light text-text-body"
      }`}
    >
      {dark && <DarkSectionBg glowIntensity={14} />}
      <div className="relative z-[1] mx-auto flex min-h-[calc(100vh-12rem)] max-w-6xl flex-col justify-center">
        {children}
      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent/10">
      <svg
        viewBox="0 0 16 16"
        className="h-3 w-3 text-accent"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <path d="M3 8l3 3.5 7-7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function ChannelPill({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span
      className={`rounded-full border px-3 py-1 text-[0.7rem] font-medium ${
        dark ? "border-white/20 text-white/75" : "border-border-light text-text-muted"
      }`}
    >
      {children}
    </span>
  );
}

/**
 * FullBleedShow — image or YouTube fills the slide; text sits over a
 * bottom-left dark gradient. Used for service "show" slides and the
 * ModelMatch process steps.
 */
function FullBleedShow({
  eyebrow,
  title,
  lede,
  imageSrc,
  imageAlt,
  youtubeId,
  badge,
  objectPosition = "center",
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede?: string;
  imageSrc: string;
  imageAlt: string;
  youtubeId?: string;
  /** Small floating callout in top-right. */
  badge?: { label: string; sublabel?: string };
  objectPosition?: string;
}) {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-bg-dark text-text-light">
      {/* Media layer */}
      {youtubeId ? (
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&modestbranding=1&playsinline=1&rel=0`}
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ width: "177.78vh", height: "56.25vw", minWidth: "100vw", minHeight: "100vh" }}
          allow="autoplay; encrypted-media"
          tabIndex={-1}
          title={imageAlt}
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageSrc}
          alt={imageAlt}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition }}
        />
      )}

      {/* Bottom-left gradient anchoring text */}
      <div
        className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.55) 30%, rgba(0,0,0,0.15) 65%, rgba(0,0,0,0) 100%)",
        }}
        aria-hidden
      />

      {/* Text block */}
      <div className="absolute inset-x-0 bottom-24 px-6 sm:bottom-28 sm:px-12">
        <div className="mx-auto max-w-6xl">
          <Eyebrow dark>{eyebrow}</Eyebrow>
          <h1 className="font-heading text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-[1.04] tracking-tight text-text-light">
            {title}
          </h1>
          {lede && (
            <p className="lead-text mt-4 max-w-[55ch] text-white/80">{lede}</p>
          )}
        </div>
      </div>

      {/* Optional top-right badge */}
      {badge && (
        <div className="absolute right-6 top-24 sm:right-12 sm:top-28">
          <div className="flex flex-col items-end rounded-2xl bg-accent px-5 py-3 text-right shadow-lg">
            <span className="font-heading text-2xl font-semibold leading-none text-white">
              {badge.label}
            </span>
            {badge.sublabel && (
              <span className="mt-1 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white/80">
                {badge.sublabel}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function ServiceDetails({
  eyebrow,
  title,
  included,
  uses,
  usesHeading = "Use cases",
}: {
  eyebrow: string;
  title: string;
  included: string[];
  uses?: string[];
  usesHeading?: string;
}) {
  const hasUses = uses && uses.length > 0;
  return (
    <SlideShell>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="font-heading text-[clamp(1.75rem,3.4vw,2.6rem)] font-medium leading-[1.12] tracking-tight text-text-dark">
        {title}
      </h2>
      <div
        className={`mt-10 grid gap-10 lg:gap-14 ${
          hasUses ? "lg:grid-cols-2" : "mx-auto max-w-3xl"
        }`}
      >
        <div>
          <h4 className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-accent">
            What&apos;s included
          </h4>
          <ul className="mt-5 space-y-3">
            {included.map((line) => (
              <li key={line} className="flex items-start gap-3 text-[0.95rem] text-text-body">
                <CheckIcon />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
        {hasUses && (
          <div>
            <h4 className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-accent">
              {usesHeading}
            </h4>
            <ol className="mt-5 space-y-3">
              {uses!.map((line, i) => (
                <li key={line} className="flex items-start gap-3 text-[0.95rem] text-text-body">
                  <span className="mt-0.5 w-7 flex-shrink-0 font-mono text-[10px] text-text-muted">
                    {pad(i + 1)}
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </SlideShell>
  );
}

function SiloDivider({
  number,
  title,
  lede,
  services,
  imageSrc,
  imageAlt,
}: {
  number: string;
  title: string;
  lede: string;
  services: { tag: string; name: string }[];
  imageSrc: string;
  imageAlt: string;
}) {
  return (
    <SlideShell>
      <div className="grid items-center gap-10 lg:grid-cols-[5fr_6fr] lg:gap-14">
        <div>
          <Eyebrow>{`Silo ${number}`}</Eyebrow>
          <h1 className="font-heading text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[1.02] tracking-tight text-text-dark">
            {title}
          </h1>
          <p className="lead-text mt-6 max-w-[40ch] text-text-body">{lede}</p>
          <ul className="mt-10 space-y-5">
            {services.map((s) => (
              <li key={s.name} className="flex items-baseline gap-4">
                <span className="font-mono text-[10px] text-text-muted">{s.tag}</span>
                <span className="font-heading text-2xl font-medium text-text-dark">{s.name}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-bg-surface shadow-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageSrc}
            alt={imageAlt}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
    </SlideShell>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Individual slides (31)
// ─────────────────────────────────────────────────────────────────────────────

// 0
function SlideCover() {
  return (
    <SlideShell dark>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/dig-logo-light.png"
        alt="Davies Imaging Group"
        className="mb-10 h-16 w-auto self-start"
      />
      <Eyebrow dark>Capabilities Overview</Eyebrow>
      <h1 className="font-heading text-[clamp(3rem,7vw,5.5rem)] font-semibold leading-[1.02] tracking-tight text-text-light">
        Marketing assets
        <br />
        that move homes.
      </h1>
      <p className="lead-text mt-8 max-w-[60ch] text-text-light-muted">
        Trusted by homebuilders across 28 markets.
      </p>
    </SlideShell>
  );
}

// 1
function SlideDifference() {
  return (
    <SlideShell>
      <Eyebrow>The DIG Difference</Eyebrow>
      <h1 className="font-heading text-[clamp(2.25rem,4.6vw,4rem)] font-semibold leading-[1.05] tracking-tight text-text-dark">
        Stop creating content.
        <br />
        Start building <strong className="text-accent">assets</strong>.
      </h1>
      <p className="lead-text mt-8 max-w-[70ch] text-text-body">
        Most builder marketing teams invest in photography that lives in one place. DIG builds
        assets designed for website conversion, paid media, sales centers, email, and listing
        refreshes.
      </p>
      <div className="mt-12 flex flex-wrap gap-3">
        {["Website", "Paid Media", "Sales Center", "Email", "Listing Refreshes"].map((c) => (
          <ChannelPill key={c}>{c}</ChannelPill>
        ))}
      </div>
    </SlideShell>
  );
}

// 2
function SlideSilosOverview() {
  const silos = [
    {
      tag: "01",
      name: "Model Homes",
      items: ["Premium Photography", "Video Content", "Matterport 3D"],
      img: SITE.siloModel,
    },
    {
      tag: "02",
      name: "Listings",
      items: ["Listing Photography", "Virtual Video", "Virtual Staging"],
      img: SITE.siloListings,
    },
    {
      tag: "03",
      name: "Community Content",
      items: ["Video Production", "Amenity Photography"],
      img: SITE.siloCommunity,
    },
  ];
  return (
    <SlideShell>
      <Eyebrow>Full Range of Services</Eyebrow>
      <h1 className="font-heading text-[clamp(2rem,4.4vw,3.6rem)] font-semibold leading-[1.05] tracking-tight text-text-dark">
        Everything your marketing team needs.
        <br />
        One platform to order it.
      </h1>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {silos.map((s) => (
          <div
            key={s.tag}
            className="overflow-hidden rounded-xl border border-border-light bg-bg-surface"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-bg-light">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.img}
                alt={s.name}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="px-6 py-5">
              <span className="font-mono text-[10px] text-text-muted">{s.tag}</span>
              <h3 className="mt-1 font-heading text-xl font-medium text-text-dark">{s.name}</h3>
              <ul className="mt-3 space-y-1.5">
                {s.items.map((line) => (
                  <li key={line} className="flex items-center gap-2 text-sm text-text-body">
                    <span className="h-px w-3 flex-shrink-0 bg-accent" aria-hidden />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-10 text-center text-sm italic text-text-muted">
        Every service ordered through digDesk. Every job tracked in one dashboard.
      </p>
    </SlideShell>
  );
}

// 3
function SlideSilo1Divider() {
  return (
    <SiloDivider
      number="01"
      title="Model Homes."
      lede="Showcase your project in the best light."
      services={[
        { tag: "01", name: "Premium Photography" },
        { tag: "02", name: "Video Content" },
        { tag: "03", name: "Matterport 3D" },
      ]}
      imageSrc={SITE.siloModel}
      imageAlt="DIG model home photography"
    />
  );
}

// 4
function SlidePremiumShow() {
  return (
    <FullBleedShow
      eyebrow="Model Homes / Premium Photography"
      title="Premium Photography."
      lede="DIG's signature service. Precise, methodical, architectural photography for the homes that matter most."
      imageSrc={SITE.premium}
      imageAlt="Premium model home photography"
    />
  );
}

// 5
function SlidePremiumDetails() {
  return (
    <ServiceDetails
      eyebrow="Model Homes / Premium Photography"
      title="Premium Photography. Details."
      included={[
        "Room-by-room coverage of furnished interiors",
        "Architectural detail and finish work",
        "Twilight exteriors",
        "Planned in advance, executed at launch",
        "Delivered as a complete publish-ready package",
      ]}
    />
  );
}

// 6
function SlideVideoContentShow() {
  return (
    <FullBleedShow
      eyebrow="Model Homes / Video Content"
      title="Video Content."
      lede="Cinematic walkthrough video for website hero, sales center displays, and digital ads."
      imageSrc={SITE.modelHomeHero}
      imageAlt="Model home video"
      youtubeId={YT.videoContent || undefined}
    />
  );
}

// 7
function SlideVideoContentDetails() {
  return (
    <ServiceDetails
      eyebrow="Model Homes / Video Content"
      title="Video Content. Details."
      included={[
        "Cinematic walkthrough of the furnished model",
        "B-roll for paid and organic social",
        "Listing cut for MLS portals",
        "Vertical social cut for IG, TikTok, YouTube Shorts",
        "Color and sound finished to broadcast standard",
      ]}
      usesHeading="How it works"
      uses={[
        "One shoot day, multiple deliverables.",
        "Designed to pair with Premium Photography.",
        "Brand-aligned pacing across every model.",
        "Built for downstream velocity across every channel.",
      ]}
    />
  );
}

// 8
function SlideMatterportShow() {
  return (
    <FullBleedShow
      eyebrow="Model Homes / Matterport 3D"
      title="Matterport 3D Tours."
      lede="Let buyers walk through before they visit. Immersive room-by-room navigation, captured on-site."
      imageSrc={SITE.matterport}
      imageAlt="Matterport 3D scan preview"
    />
  );
}

// 9
function SlideMatterportDetails() {
  return (
    <ServiceDetails
      eyebrow="Model Homes / Matterport 3D"
      title="Matterport 3D. Details."
      included={[
        "Complete 3D scan of the physical space",
        "Buyers navigate room by room from anywhere",
        "Embed on website model pages",
        "Share via email or sales-center kiosk",
        "One scan, multiple deployment channels",
      ]}
      uses={[
        "Model home showcase for out-of-market buyers",
        "Sales center display for sold or untoured homes",
        "Remote-buyer tool for relocation markets",
        "Email and digital campaign driver",
      ]}
    />
  );
}

// 10
function SlideSilo2Divider() {
  return (
    <SiloDivider
      number="02"
      title="Listings."
      lede="Listing media built for sales velocity."
      services={[
        { tag: "01", name: "Listing Photography" },
        { tag: "02", name: "Virtual Video" },
        { tag: "03", name: "Virtual Staging" },
      ]}
      imageSrc={SITE.siloListings}
      imageAlt="Spec home listing"
    />
  );
}

// 11
function SlideListingPhotoShow() {
  return (
    <FullBleedShow
      eyebrow="Listings / Listing Photography"
      title="Listing Photography."
      lede="Every listing, exceptional standards. Fast turnaround, consistent quality, built for sales velocity."
      imageSrc={SITE.listing}
      imageAlt="Listing photography example"
    />
  );
}

// 12
function SlideListingPhotoDetails() {
  return (
    <ServiceDetails
      eyebrow="Listings / Listing Photography"
      title="Listing Photography. Details."
      included={[
        "HDR-processed, color-corrected images",
        "MLS-ready resolution and file sizing",
        "Exterior, interior, and detail coverage",
        "Web-optimized and print-ready formats",
        "Delivered via digDesk within 48 hours",
      ]}
      uses={[
        "Spec home photography at production speed",
        "QMI homes ready for activation",
        "Standing inventory photographed by community batch",
        "Bundle inside Spec+ for staging and video at $600 flat",
      ]}
    />
  );
}

// 13
function SlideVirtualVideoShow() {
  return (
    <FullBleedShow
      eyebrow="Listings / Virtual Video"
      title="Virtual Video."
      lede="Beautiful videos for less. No shoot day, no scheduling, fast delivery through digDesk."
      imageSrc={SITE.virtualVideoCover}
      imageAlt="Virtual video preview"
      youtubeId={YT.virtualVideo || undefined}
    />
  );
}

// 14
function SlideVirtualVideoDetails() {
  return (
    <ServiceDetails
      eyebrow="Listings / Virtual Video"
      title="Virtual Video. Details."
      included={[
        "Built from photography you already have",
        "Smooth, cinematic transitions",
        "Landscape for web, vertical for social, MLS cut",
        "Consistent pacing across every listing",
        "Pairs with virtual staging: video built from staged frames",
      ]}
      usesHeading="How to order"
      uses={[
        "Standalone: starting at $150 per video",
        "Bundled inside Spec+ for $600 flat with photo and staging",
        "Available as an add-on to any digDesk order",
        "Delivered to the dashboard within 24 hours",
      ]}
    />
  );
}

// 15 — ModelMatch Intro
function SlideModelMatchIntro() {
  return (
    <SlideShell>
      <Eyebrow>Listings / Virtual Staging</Eyebrow>
      <h1 className="font-heading text-[clamp(2.25rem,4.6vw,4rem)] font-semibold leading-[1.05] tracking-tight text-text-dark">
        ModelMatch: virtual staging
        <br />
        that looks like <strong className="text-accent">your homes</strong>.
      </h1>
      <p className="lead-text mt-8 max-w-[70ch] text-text-body">
        Generic staging libraries don&apos;t match your brand. ModelMatch does. We pull design
        references from your model homes, then apply them to vacant listings so every staged image
        feels on-brand.
      </p>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {[
          {
            num: "01",
            title: "Pick a Reference",
            body: "A finished room from a builder's model home becomes the design source.",
          },
          {
            num: "02",
            title: "Photograph the Listing",
            body: "DIG captures the vacant inventory on your listing shoot.",
          },
          {
            num: "03",
            title: "Deliver the Result",
            body: "ModelMatch staging applied. Same brand, every time. $25 per image.",
          },
        ].map((step) => (
          <div
            key={step.num}
            className="rounded-xl border border-border-light bg-bg-surface p-6"
          >
            <span className="font-mono text-[10px] text-text-muted">{step.num}</span>
            <h3 className="mt-2 font-heading text-xl font-medium text-text-dark">{step.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-text-body">{step.body}</p>
          </div>
        ))}
      </div>
    </SlideShell>
  );
}

// 16 — ModelMatch Reference (full-bleed)
function SlideModelMatchReference() {
  return (
    <FullBleedShow
      eyebrow="ModelMatch / Step 01"
      title="The Reference."
      lede="A finished room from the builder's model home. This becomes the design source ModelMatch uses on every future listing."
      imageSrc={SITE.modelMatch.living.reference}
      imageAlt="Model home reference photograph"
    />
  );
}

// 17 — ModelMatch Vacant (full-bleed)
function SlideModelMatchVacant() {
  return (
    <FullBleedShow
      eyebrow="ModelMatch / Step 02"
      title="The Vacant Listing."
      lede="The empty inventory home, photographed on the listing shoot. This is what buyers see today."
      imageSrc={SITE.modelMatch.living.vacant}
      imageAlt="Vacant listing photograph"
    />
  );
}

// 18 — ModelMatch Result (full-bleed + price badge)
function SlideModelMatchResult() {
  return (
    <FullBleedShow
      eyebrow="ModelMatch / Step 03"
      title="The Staged Result."
      lede="ModelMatch staging applied. Same reference, same brand, same palette, every time."
      imageSrc={SITE.modelMatch.living.result}
      imageAlt="ModelMatch virtually staged result"
      badge={{ label: "$25", sublabel: "per staged image" }}
    />
  );
}

// 19 — ModelMatch More Examples
function SlideModelMatchExamples() {
  const pairs = [
    {
      name: "Dining Area",
      before: SITE.modelMatch.dining.vacant,
      after: SITE.modelMatch.dining.result,
    },
    {
      name: "Primary Bedroom",
      before: SITE.modelMatch.primary.vacant,
      after: SITE.modelMatch.primary.result,
    },
  ];
  return (
    <SlideShell>
      <Eyebrow>Listings / Virtual Staging</Eyebrow>
      <h2 className="font-heading text-[clamp(1.75rem,3.4vw,2.6rem)] font-medium leading-[1.1] tracking-tight text-text-dark">
        Same reference. Different rooms.{" "}
        <strong className="text-accent">Brand-consistent results</strong>.
      </h2>
      <p className="lead-text mt-3 max-w-[68ch] text-text-body">
        The ModelMatch reference applies across every room in the listing.
      </p>

      <div className="mt-10 space-y-6">
        {pairs.map((p) => (
          <div key={p.name}>
            <p className="mb-3 text-[0.65rem] font-bold uppercase tracking-[0.25em] text-text-muted">
              {p.name}
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-bg-surface shadow-sm">
                <span className="absolute left-3 top-3 z-10 rounded-full bg-bg-dark/80 px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-white">
                  Vacant
                </span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.before}
                  alt={`${p.name}: vacant`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-bg-surface shadow-sm">
                <span className="absolute left-3 top-3 z-10 rounded-full bg-accent px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-white">
                  Staged
                </span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.after}
                  alt={`${p.name}: ModelMatch staged`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </SlideShell>
  );
}

// 20 — ModelMatch Details
function SlideModelMatchDetails() {
  return (
    <ServiceDetails
      eyebrow="Listings / Virtual Staging"
      title="ModelMatch. Details."
      included={[
        "$25 per staged image, billed through digDesk",
        "Uses your model home photos as the design reference",
        "Brand-consistent results across every community",
        "Matches your design palette and material selections",
        "Works on existing listing photography, no new shoot required",
        "Gallery lives in FrameFlow for reuse on every job",
      ]}
      usesHeading="How it works"
      uses={[
        "Build your ModelMatch Gallery from model home photos",
        "Place a virtual staging order in digDesk",
        "Select the gallery that matches the community",
        "Receive polished, on-brand results within 24 hours",
      ]}
    />
  );
}

// 21 — Spec+
function SlideSpecPlus() {
  return (
    <SlideShell>
      <Eyebrow>Programs / Spec+</Eyebrow>
      <h1 className="font-heading text-[clamp(2rem,4.4vw,3.6rem)] font-semibold leading-[1.05] tracking-tight text-text-dark">
        <strong className="text-accent">Spec+</strong>: photography, virtual staging,
        <br />
        and virtual video. One $600 order.
      </h1>

      <div className="mt-10 grid gap-8 lg:grid-cols-[5fr_6fr]">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-bg-surface shadow-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={SITE.specPlus}
            alt="Spec+ delivery"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        <div>
          <h4 className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-accent">
            What&apos;s included
          </h4>
          <ul className="mt-5 space-y-3">
            {[
              "25 MLS-ready listing images",
              "8 ModelMatch virtually staged images",
              "1 wide virtual listing video",
              "72-hour delivery after photography",
              "Ordered via digDesk",
            ].map((line) => (
              <li key={line} className="flex items-start gap-3 text-[0.95rem] text-text-body">
                <CheckIcon />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-10 rounded-xl border border-border-light bg-bg-surface px-6 py-6">
        <div className="grid grid-cols-2 gap-y-6 sm:grid-cols-4">
          {[
            { v: "$600", l: "Flat rate, all home sizes" },
            { v: "72 hrs", l: "Delivery after photography" },
            { v: "3", l: "Asset types in one order" },
            { v: "$220", l: "Saved vs. à la carte" },
          ].map((s) => (
            <div key={s.l} className="flex flex-col items-start sm:items-center sm:text-center">
              <span className="font-heading text-4xl font-semibold text-text-dark">{s.v}</span>
              <span className="mt-1 text-sm text-text-muted">{s.l}</span>
            </div>
          ))}
        </div>
      </div>
    </SlideShell>
  );
}

// 22
function SlideSilo3Divider() {
  return (
    <SiloDivider
      number="03"
      title="Community Content."
      lede="Tell the destination story."
      services={[
        { tag: "01", name: "Video Production" },
        { tag: "02", name: "Amenity Photography" },
      ]}
      imageSrc={SITE.siloCommunity}
      imageAlt="Community amenity"
    />
  );
}

// 23
function SlideVideoProductionShow() {
  return (
    <FullBleedShow
      eyebrow="Community Content / Video Production"
      title="Video Production."
      lede="Cinematic video that moves buyers to action. On-site crew, talent, and high-craft storytelling."
      imageSrc={SITE.videoProduction}
      imageAlt="Community video"
      youtubeId={YT.videoProduction || undefined}
    />
  );
}

// 24
function SlideVideoProductionDetails() {
  return (
    <ServiceDetails
      eyebrow="Community Content / Video Production"
      title="Video Production. Details."
      included={[
        "On-site, full-crew production",
        "Cinematic motion and color grade",
        "Multi-format outputs from one shoot day",
        "Talent-driven storytelling when needed",
        "Custom-quoted based on scope and location",
      ]}
      uses={[
        "Community walkthroughs and master-plan tours",
        "Lifestyle video with talent and styling",
        "Amenity showcases across pools, clubhouses, and parks",
        "Brand films for builder storytelling",
      ]}
    />
  );
}

// 25
function SlideAmenityShow() {
  return (
    <FullBleedShow
      eyebrow="Community Content / Amenity Photography"
      title="Amenity Photography."
      lede="Amenities are the differentiator. Pool decks, clubhouses, fitness centers, and trails, photographed with model-home care."
      imageSrc={SITE.amenity}
      imageAlt="Amenity photography"
    />
  );
}

// 26
function SlideAmenityDetails() {
  return (
    <ServiceDetails
      eyebrow="Community Content / Amenity Photography"
      title="Amenity Photography. Details."
      included={[
        "Pools, clubhouses, fitness centers, trails, parks",
        "Planned, lit, and executed with model-home care",
        "Gallery-quality across web, paid, and sales center",
        "Scheduled independently from model home shoots",
        "Available standalone or under Premium Photography",
      ]}
      uses={[
        "Community grand openings",
        "Amenity reveals as new phases open",
        "Quarterly refresh for paid media",
        "Sales-center display content",
      ]}
    />
  );
}

// 27
function SlideDigDesk() {
  const modules = [
    {
      num: "01",
      title: "FrameFlow Studio",
      body: "Order virtual staging, virtual video for your existing listings.",
    },
    {
      num: "02",
      title: "Listing Photography",
      body: "MLS photography and bundles for your spec homes.",
    },
    {
      num: "03",
      title: "Premium Photography",
      body: "Model home and amenity photography.",
    },
    {
      num: "04",
      title: "ModelMatch Gallery",
      body: "Brand-reference image library for virtual staging.",
    },
  ];
  return (
    <SlideShell>
      <Eyebrow>digDesk: available now</Eyebrow>
      <h1 className="font-heading text-[clamp(2rem,4.4vw,3.6rem)] font-semibold leading-[1.05] tracking-tight text-text-dark">
        One portal for your
        <br />
        entire visual pipeline.
      </h1>

      <div className="mt-10 grid gap-8 lg:grid-cols-[6fr_5fr]">
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border-light bg-bg-surface shadow-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={SITE.digDesk}
            alt="digDesk dashboard"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
        </div>
        <div>
          <p className="lead-text text-text-body">
            Order every service, track every job, manage your ModelMatch brand library, and download
            finished assets, all from a single dashboard.
          </p>
          <ul className="mt-6 space-y-4">
            {modules.map((m) => (
              <li key={m.num} className="flex items-start gap-4">
                <span className="font-mono text-[10px] text-text-muted">{m.num}</span>
                <div>
                  <h3 className="font-heading text-lg font-medium text-text-dark">{m.title}</h3>
                  <p className="text-sm text-text-body">{m.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SlideShell>
  );
}

// 28
function SlideMarkets() {
  return (
    <div className="relative flex min-h-full flex-col items-center justify-center bg-bg-light px-6 pb-24 pt-24 sm:px-12 sm:pt-28">
      <div className="mx-auto w-full max-w-3xl">
        <Eyebrow>Our Markets</Eyebrow>
        <h2 className="font-heading text-[clamp(1.75rem,3.6vw,2.8rem)] font-medium leading-[1.1] tracking-tight text-text-dark">
          One standard across every market.
        </h2>
        <p className="lead-text mt-2 max-w-[70ch] text-text-body">
          28 markets across four U.S. regions. Offices in Sacramento, Dallas, and Guadalajara.
        </p>
        <div className="relative mt-4 w-full">
          <RegionMap />
        </div>
      </div>
    </div>
  );
}

// 29
function SlideRegionalPartnership() {
  return (
    <SlideShell>
      <Eyebrow>For National and Regional Builders</Eyebrow>
      <h1 className="font-heading text-[clamp(2rem,4.4vw,3.6rem)] font-semibold leading-[1.05] tracking-tight text-text-dark">
        Dedicated capacity.
        <br />
        Volume pricing. One account team.
      </h1>

      <div className="mt-10 grid items-stretch gap-8 lg:grid-cols-[6fr_5fr]">
        <div className="space-y-5">
          <p className="text-[1.0625rem] leading-relaxed text-text-body">
            For builders running multiple launches simultaneously, DIG&apos;s Regional Partnerships
            program provides dedicated production capacity, volume pricing, and a single account
            team across all four U.S. regions. Same process, same quality checks, same delivery
            standard in every market.
          </p>
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-bg-surface shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={SITE.regional}
              alt="Heron Bay clubhouse aerial"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="rounded-2xl bg-bg-dark p-8 text-text-light">
          <h4 className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-accent-dark-hover">
            What partnership unlocks
          </h4>
          <ul className="mt-6 space-y-4">
            {[
              "Reserved production capacity for launch windows",
              "Volume pricing across photography, staging, and video",
              "One account team coordinating every market",
              "Regional dashboards in digDesk for cross-market visibility",
            ].map((line) => (
              <li
                key={line}
                className="flex items-start gap-3 text-[0.95rem] text-text-light-muted"
              >
                <span
                  className="mt-1 h-5 w-5 flex-shrink-0 rounded-full bg-accent/15 ring-1 ring-accent/40"
                  aria-hidden
                />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SlideShell>
  );
}

// 30
function SlideCloser() {
  return (
    <SlideShell dark>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/dig-logo-light.png"
        alt="Davies Imaging Group"
        className="mb-10 h-16 w-auto self-start"
      />
      <Eyebrow dark>Ready?</Eyebrow>
      <h1 className="font-heading text-[clamp(2.75rem,6vw,5rem)] font-semibold leading-[1.02] tracking-tight text-text-light">
        Let&apos;s build assets
        <br />
        that move homes.
      </h1>
      <p className="lead-text mt-8 max-w-[60ch] text-text-light-muted">
        If your content isn&apos;t driving momentum, it&apos;s time to rethink the strategy.
      </p>
    </SlideShell>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Ordered slide list (31 total)
// ─────────────────────────────────────────────────────────────────────────────

const slides: Array<() => React.ReactElement> = [
  SlideCover,                  // 0
  SlideDifference,             // 1
  SlideSilosOverview,          // 2
  SlideSilo1Divider,           // 3
  SlidePremiumShow,            // 4  *full-bleed
  SlidePremiumDetails,         // 5
  SlideVideoContentShow,       // 6  *full-bleed
  SlideVideoContentDetails,    // 7
  SlideMatterportShow,         // 8  *full-bleed
  SlideMatterportDetails,      // 9
  SlideSilo2Divider,           // 10
  SlideListingPhotoShow,       // 11 *full-bleed
  SlideListingPhotoDetails,    // 12
  SlideVirtualVideoShow,       // 13 *full-bleed
  SlideVirtualVideoDetails,    // 14
  SlideModelMatchIntro,        // 15
  SlideModelMatchReference,    // 16 *full-bleed
  SlideModelMatchVacant,       // 17 *full-bleed
  SlideModelMatchResult,       // 18 *full-bleed
  SlideModelMatchExamples,     // 19
  SlideModelMatchDetails,      // 20
  SlideSpecPlus,               // 21
  SlideSilo3Divider,           // 22
  SlideVideoProductionShow,    // 23 *full-bleed
  SlideVideoProductionDetails, // 24
  SlideAmenityShow,            // 25 *full-bleed
  SlideAmenityDetails,         // 26
  SlideDigDesk,                // 27
  SlideMarkets,                // 28
  SlideRegionalPartnership,    // 29
  SlideCloser,                 // 30
];
