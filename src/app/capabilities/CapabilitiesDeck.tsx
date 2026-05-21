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
 *  - Drop in YouTube IDs for Video Content (slide 7) / Video Production (slide 20)
 *    by filling YT.videoContent / YT.videoProduction.
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
  stagingVacant: `${BLOB}/site-assets/1775671026521-living-room-1424KirkhillLane-02a-jItfigI7QoAD9ucHry0F3taWJbe68d.jpg`,
  stagingResult: `${BLOB}/site-assets/1775671035424-living-room-1424KirkhillLane-03-AZDTQiTFPd60vALdR7kjpXKUyEDQmW.jpg`,
  specPlus: `${BLOB}/site-assets/living-room-1424kirkhilllane-08.webp`,
  videoProduction: `${BLOB}/site-assets/screenshot-2026-04-07-at-7-55-33-pm.webp`,
  amenity: `${BLOB}/site-assets/regency_amenity_back-exterior_1.webp`,
  digDesk: `${BLOB}/site-assets/digdesk-screenshot.webp`,
  regional: `${BLOB}/site-assets/heronbay_clubhouse_aerial.webp`,
  siloModel: `${BLOB}/site-assets/ashbourne-merrick-web-15.webp`,
  siloListings: `${BLOB}/site-assets/wayward-wind-7432-vacant-01.webp`,
  siloCommunity: `${BLOB}/site-assets/santa-rita-ranch-aerials-web-1.webp`,
};

// Fill these with YouTube IDs to swap the photo placeholder for a video embed.
// virtualVideo → Perry Homes FrameFlow promo (verified in src/data/deals.json).
const YT = {
  videoContent: "I14Qvzlja34",    // Slide 7 — Model Home Video.
  virtualVideo: "4MYlfUOAdOk",    // Slide 14 — Perry Homes FrameFlow promo.
  videoProduction: "dFI--iFGkNU", // Slide 20 — Community Video.
};

const TOTAL_SLIDES = 27;

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
  const progressPct = ((current + 1) / TOTAL_SLIDES) * 100;

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-bg-light text-text-body">
      {/* Top chrome */}
      <header className="pointer-events-none fixed inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-5 sm:px-10">
        <span
          className={`text-[0.65rem] font-bold uppercase tracking-[0.4em] transition-colors ${
            slideIsDark ? "text-white/70" : "text-text-dark"
          }`}
        >
          Davies Imaging Group
        </span>
        <span
          className={`text-[0.65rem] font-medium uppercase tracking-[0.25em] tabular-nums transition-colors ${
            slideIsDark ? "text-white/45" : "text-text-muted"
          }`}
        >
          {pad(current + 1)} / {pad(TOTAL_SLIDES)}
        </span>
      </header>
      <div
        className={`pointer-events-none fixed inset-x-6 top-[3.2rem] z-[19] h-px transition-colors sm:inset-x-10 ${
          slideIsDark ? "bg-white/10" : "bg-border-light"
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
          slideIsDark ? "text-white" : "text-text-body"
        }`}
      >
        <button
          type="button"
          onClick={() => show(current - 1)}
          disabled={current === 0}
          className={`rounded-full border px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.18em] transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${
            slideIsDark
              ? "border-white/20 text-white/80 enabled:hover:border-accent-dark-hover enabled:hover:text-accent-dark-hover"
              : "border-border-light text-text-body enabled:hover:border-accent enabled:hover:text-accent"
          }`}
          aria-label="Previous slide"
        >
          &larr; Prev
        </button>
        <div
          className={`relative h-px flex-1 overflow-hidden ${
            slideIsDark ? "bg-white/15" : "bg-border-light"
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
            slideIsDark
              ? "border-white/20 text-white/80 enabled:hover:border-accent-dark-hover enabled:hover:text-accent-dark-hover"
              : "border-border-light text-text-body enabled:hover:border-accent enabled:hover:text-accent"
          }`}
          aria-label="Next slide"
        >
          Next &rarr;
        </button>
        <Link
          href="/"
          className={`ml-2 hidden text-[0.65rem] font-medium uppercase tracking-[0.2em] transition-colors sm:inline-flex ${
            slideIsDark ? "text-white/40 hover:text-white" : "text-text-muted hover:text-accent"
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
// Reusable building blocks (styled to mirror /services and /programs pages)
// ─────────────────────────────────────────────────────────────────────────────

function SlideShell({
  children,
  dark,
  full,
}: {
  children: React.ReactNode;
  dark?: boolean;
  /** Render edge-to-edge with no centered max-width wrapper. */
  full?: boolean;
}) {
  return (
    <div
      className={`relative min-h-full px-6 pb-24 pt-24 sm:px-12 sm:pt-28 ${
        dark ? "bg-bg-dark text-text-light" : "bg-bg-light text-text-body"
      }`}
    >
      {dark && <DarkSectionBg glowIntensity={14} />}
      <div
        className={`relative z-[1] flex min-h-[calc(100vh-12rem)] flex-col justify-center ${
          full ? "" : "mx-auto max-w-6xl"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <span
      className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent/10 ${className}`}
    >
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

function SlideMedia({
  youtubeId,
  imageSrc,
  imageAlt,
}: {
  youtubeId?: string;
  imageSrc?: string;
  imageAlt: string;
}) {
  if (youtubeId) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-bg-dark shadow-sm">
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&modestbranding=1&playsinline=1&rel=0`}
          className="pointer-events-none absolute inset-0 h-full w-full"
          allow="autoplay; encrypted-media"
          tabIndex={-1}
          title={imageAlt}
        />
      </div>
    );
  }
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-bg-surface shadow-sm">
      {imageSrc && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageSrc}
          alt={imageAlt}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
    </div>
  );
}

function ServiceShow({
  eyebrow,
  title,
  positioning,
  chips,
  imageSrc,
  imageAlt,
  youtubeId,
}: {
  eyebrow: string;
  title: React.ReactNode;
  positioning: string;
  chips: string[];
  imageSrc: string;
  imageAlt: string;
  youtubeId?: string;
}) {
  return (
    <SlideShell>
      <div className="grid items-center gap-10 lg:grid-cols-[5fr_6fr] lg:gap-14">
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="font-heading text-[clamp(2.25rem,4.2vw,3.5rem)] font-semibold leading-[1.05] tracking-tight text-text-dark">
            {title}
          </h1>
          <p className="lead-text mt-6 max-w-[34ch] text-text-body">{positioning}</p>
          <p className="mt-8 text-[0.65rem] font-bold uppercase tracking-[0.28em] text-accent">
            Where it lives
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {chips.map((c) => (
              <ChannelPill key={c}>{c}</ChannelPill>
            ))}
          </div>
        </div>
        <SlideMedia youtubeId={youtubeId} imageSrc={imageSrc} imageAlt={imageAlt} />
      </div>
    </SlideShell>
  );
}

function ServiceDetails({
  eyebrow,
  title,
  included,
  uses,
  usesHeading = "Use cases",
  statBand,
}: {
  eyebrow: string;
  title: string;
  included: string[];
  uses: string[];
  usesHeading?: string;
  statBand?: { label: string; value: string };
}) {
  return (
    <SlideShell>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="font-heading text-[clamp(1.75rem,3.4vw,2.6rem)] font-medium leading-[1.12] tracking-tight text-text-dark">
        {title}
      </h2>
      <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-14">
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
        <div>
          <h4 className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-accent">
            {usesHeading}
          </h4>
          <ol className="mt-5 space-y-3">
            {uses.map((line, i) => (
              <li key={line} className="flex items-start gap-3 text-[0.95rem] text-text-body">
                <span className="mt-0.5 w-7 flex-shrink-0 font-mono text-[10px] text-text-muted">
                  {pad(i + 1)}
                </span>
                <span>{line}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
      {statBand && (
        <div className="mt-10 flex flex-col gap-2 rounded-xl bg-bg-dark px-6 py-5 text-text-light sm:flex-row sm:items-center sm:justify-between">
          <span className="text-[0.65rem] font-bold uppercase tracking-[0.25em] text-accent-dark-hover">
            {statBand.label}
          </span>
          <span className="text-sm text-text-light-muted">{statBand.value}</span>
        </div>
      )}
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
// Individual slides (27)
// ─────────────────────────────────────────────────────────────────────────────

function SlideCover() {
  return (
    <SlideShell dark>
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

function SlidePremiumShow() {
  return (
    <ServiceShow
      eyebrow="Model Homes / Premium Photography"
      title={
        <>
          Premium
          <br />
          Photography.
        </>
      }
      positioning="DIG's signature service. Precise, methodical, architectural photography for the homes that matter most."
      chips={[
        "Website Hero",
        "Sales Center",
        "Agent Kits",
        "Launch Campaign",
        "Design Center",
        "Brand PR",
      ]}
      imageSrc={SITE.premium}
      imageAlt="Premium model home photography"
    />
  );
}

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
      uses={[
        "Model home photography for grand openings",
        "Amenity photography across pools, clubhouses, and parks",
        "Lifestyle photography with talent and styling",
        "Regional rollouts coordinated across markets",
      ]}
      statBand={{
        label: "One umbrella",
        value: "Model, Amenity, and Lifestyle ordered separately, scoped per subject.",
      }}
    />
  );
}

function SlideVideoContentShow() {
  return (
    <ServiceShow
      eyebrow="Model Homes / Video Content"
      title={
        <>
          Video
          <br />
          Content.
        </>
      }
      positioning="Cinematic walkthrough video for website hero, sales center displays, and digital ads."
      chips={["Website Hero", "Paid Social", "YouTube", "Sales Center", "Email", "Agent Kits"]}
      imageSrc={SITE.modelHomeHero}
      imageAlt="Model home video still"
      youtubeId={YT.videoContent || undefined}
    />
  );
}

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

function SlideMatterportShow() {
  return (
    <ServiceShow
      eyebrow="Model Homes / Matterport 3D"
      title={
        <>
          Matterport
          <br />
          3D Tours.
        </>
      }
      positioning="Let buyers walk through before they visit. Immersive room-by-room navigation, captured on-site."
      chips={["Website Embed", "Sales Center", "Email", "Remote Buyers", "Agent Tool", "Open House"]}
      imageSrc={SITE.matterport}
      imageAlt="Matterport 3D scan preview"
    />
  );
}

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
      statBand={{
        label: "Custom quoted",
        value: "Priced by property size. Start with a strategy call.",
      }}
    />
  );
}

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

function SlideListingPhotoShow() {
  return (
    <ServiceShow
      eyebrow="Listings / Listing Photography"
      title={
        <>
          Listing
          <br />
          Photography.
        </>
      }
      positioning="Every listing, exceptional standards. Fast turnaround, consistent quality, built for sales velocity."
      chips={["MLS", "Website", "Paid Media", "Email", "Agent", "Brochures"]}
      imageSrc={SITE.listing}
      imageAlt="Listing photography example"
    />
  );
}

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

function SlideVirtualVideoShow() {
  return (
    <ServiceShow
      eyebrow="Listings / Virtual Video"
      title={
        <>
          Virtual
          <br />
          Video.
        </>
      }
      positioning="Beautiful videos for less. No shoot day, no scheduling, fast delivery through digDesk."
      chips={["MLS", "Website", "Paid Social", "Email", "Vertical", "Landscape"]}
      imageSrc={SITE.virtualVideoCover}
      imageAlt="Virtual video preview"
      youtubeId={YT.virtualVideo || undefined}
    />
  );
}

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

function SlideVirtualStagingShow() {
  return (
    <SlideShell>
      <div className="grid items-center gap-10 lg:grid-cols-[5fr_6fr] lg:gap-14">
        <div>
          <Eyebrow>Listings / Virtual Staging</Eyebrow>
          <h1 className="font-heading text-[clamp(2.25rem,4.2vw,3.5rem)] font-semibold leading-[1.05] tracking-tight text-text-dark">
            Virtual
            <br />
            Staging.
          </h1>
          <p className="lead-text mt-6 max-w-[34ch] text-text-body">
            ModelMatch staging that actually looks like your homes. Brand-matched, not generic
            furniture.
          </p>
          <p className="mt-8 text-[0.65rem] font-bold uppercase tracking-[0.28em] text-accent">
            Where it lives
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {["MLS", "Website", "Paid Media", "Email", "Agent Kits", "Brochures"].map((c) => (
              <ChannelPill key={c}>{c}</ChannelPill>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-bg-surface shadow-sm">
            <span className="absolute left-3 top-3 z-10 rounded-full bg-bg-dark/80 px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-white">
              Vacant
            </span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={SITE.stagingVacant}
              alt="Vacant living room"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-bg-surface shadow-sm">
            <span className="absolute left-3 top-3 z-10 rounded-full bg-accent px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-white">
              Staged
            </span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={SITE.stagingResult}
              alt="ModelMatch virtually staged living room"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

function SlideVirtualStagingDetails() {
  return (
    <ServiceDetails
      eyebrow="Listings / Virtual Staging"
      title="Virtual Staging (ModelMatch). Details."
      included={[
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
      statBand={{
        label: "Proven impact",
        value: "24-hour delivery. 81% faster buyer decisions on staged homes.",
      }}
    />
  );
}

function SlideSpecPlus() {
  return (
    <SlideShell>
      <Eyebrow>Best Value in Homebuilding</Eyebrow>
      <h1 className="font-heading text-[clamp(2rem,4.4vw,3.6rem)] font-semibold leading-[1.05] tracking-tight text-text-dark">
        Photography. Virtual staging.
        <br />
        Virtual video. One <strong className="text-accent">$600</strong> order.
      </h1>

      <div className="mt-10 grid gap-8 lg:grid-cols-[5fr_6fr]">
        {/* Inset photo */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-bg-surface shadow-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={SITE.specPlus}
            alt="Spec+ delivery"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        {/* Included list */}
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

      {/* Pricing band — mirrors the live /programs/spec-plus pricing strip */}
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

function SlideVideoProductionShow() {
  return (
    <ServiceShow
      eyebrow="Community Content / Video Production"
      title={
        <>
          Video
          <br />
          Production.
        </>
      }
      positioning="Cinematic video that moves buyers to action. On-site crew, talent, and high-craft storytelling."
      chips={["Website Hero", "Paid Social", "YouTube", "Sales Center", "Email", "Brand PR"]}
      imageSrc={SITE.videoProduction}
      imageAlt="Community video still"
      youtubeId={YT.videoProduction || undefined}
    />
  );
}

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

function SlideAmenityShow() {
  return (
    <ServiceShow
      eyebrow="Community Content / Amenity Photography"
      title={
        <>
          Amenity
          <br />
          Photography.
        </>
      }
      positioning="Amenities are the differentiator. Pool decks, clubhouses, fitness centers, and trails, photographed with model-home care."
      chips={["Website", "Paid Social", "Sales Center", "Agent Kits", "Email", "PR"]}
      imageSrc={SITE.amenity}
      imageAlt="Amenity photography"
    />
  );
}

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

function SlideDigDesk() {
  const modules = [
    { num: "01", title: "FrameFlow Studio", body: "Virtual staging, virtual video, Spec+ bundles." },
    { num: "02", title: "Listing Photography", body: "Spec home and QMI photography orders." },
    { num: "03", title: "Premium Photography", body: "Model home and lifestyle shoot projects." },
    { num: "04", title: "ModelMatch Gallery", body: "Brand-reference image library." },
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

function SlideMarkets() {
  return (
    <div className="relative flex min-h-full flex-col bg-bg-light px-6 pb-24 pt-24 sm:px-12 sm:pt-28">
      <div className="mx-auto flex w-full max-w-6xl flex-col">
        <Eyebrow>Our Markets</Eyebrow>
        <h2 className="font-heading text-[clamp(1.75rem,3.6vw,2.8rem)] font-medium leading-[1.1] tracking-tight text-text-dark">
          One standard across every market.
        </h2>
        <p className="lead-text mt-2 max-w-[70ch] text-text-body">
          28 markets across four U.S. regions. Offices in Sacramento, Dallas, and Guadalajara.
        </p>
      </div>
      <div className="relative mx-auto mt-6 w-full max-w-6xl flex-1">
        <RegionMap />
      </div>
    </div>
  );
}

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

function SlideCloser() {
  return (
    <SlideShell dark>
      <Eyebrow dark>Ready?</Eyebrow>
      <h1 className="font-heading text-[clamp(2.75rem,6vw,5rem)] font-semibold leading-[1.02] tracking-tight text-text-light">
        Let&apos;s build assets
        <br />
        that move homes.
      </h1>
      <p className="lead-text mt-8 max-w-[60ch] text-text-light-muted">
        If your content isn&apos;t driving momentum, it&apos;s time to rethink the strategy.
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-3">
        <Link
          href="/contact"
          className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-dark-hover"
        >
          Book a Strategy Call
        </Link>
        <Link
          href="/programs/spec-plus"
          className="rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-text-light/80 transition-colors hover:border-white/50 hover:text-text-light"
        >
          Explore Spec+ &rarr;
        </Link>
        <Link
          href="/"
          className="rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-text-light/80 transition-colors hover:border-white/50 hover:text-text-light"
        >
          daviesimaging.com &rarr;
        </Link>
      </div>
    </SlideShell>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Ordered slide list
// ─────────────────────────────────────────────────────────────────────────────

const slides: Array<() => React.ReactElement> = [
  SlideCover,
  SlideDifference,
  SlideSilosOverview,
  SlideSilo1Divider,
  SlidePremiumShow,
  SlidePremiumDetails,
  SlideVideoContentShow,
  SlideVideoContentDetails,
  SlideMatterportShow,
  SlideMatterportDetails,
  SlideSilo2Divider,
  SlideListingPhotoShow,
  SlideListingPhotoDetails,
  SlideVirtualVideoShow,
  SlideVirtualVideoDetails,
  SlideVirtualStagingShow,
  SlideVirtualStagingDetails,
  SlideSpecPlus,
  SlideSilo3Divider,
  SlideVideoProductionShow,
  SlideVideoProductionDetails,
  SlideAmenityShow,
  SlideAmenityDetails,
  SlideDigDesk,
  SlideMarkets,
  SlideRegionalPartnership,
  SlideCloser,
];
