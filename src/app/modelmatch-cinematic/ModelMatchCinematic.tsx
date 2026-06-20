"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

/**
 * /modelmatch-cinematic — full-screen "Cinematic FrameFlow" deck.
 *
 * Mounted chromelessly via SiteShell. Layout matches the Cinematic FrameFlow
 * (design) PDF: dark/light alternating editorial slides, Cormorant headings +
 * Noto eyebrows, accent-purple labels, full-bleed media with bottom-left
 * captions, dig logo on the title/step/closing slides.
 *
 * Assets live in /public/mm-cinematic. Videos are YouTube ids in MEDIA.
 */

const ASSET = (f: string) => `/mm-cinematic/${f}`;

const MEDIA = {
  problem1: "problem-1.webp", // slide 2 — stacked square lifestyle shot
  problem2: "problem-2.webp", // slide 2 — stacked square lifestyle shot
  methodVideo: "method.mp4", // slide 4 — ambient background film (self-hosted)
  empty: "empty.webp", // slide 5 — empty great room
  staged: "staged.webp", // slide 6 — same room, ModelMatch staged
  vignette: "vignette.webp", // slide 7 — detail / vignette
  frameflowVideo: "frameflow.mp4", // slide 8 — FrameFlow immersion clip
  resultVideo: "result.mp4", // slide 9 — finished film
};

export function ModelMatchCinematic() {
  const [current, setCurrent] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const total = slides.length;

  const show = useCallback(
    (n: number) => {
      const clamped = Math.max(0, Math.min(total - 1, n));
      setCurrent(clamped);
      const hash = `#${clamped + 1}`;
      if (typeof window !== "undefined" && window.location.hash !== hash) {
        window.history.replaceState(null, "", hash);
      }
    },
    [total],
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement | null)?.tagName;
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
        show(total - 1);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [current, show, total]);

  useEffect(() => {
    let touchX: number | null = null;
    let ignore = false;
    function onStart(e: TouchEvent) {
      ignore = !!(e.target as HTMLElement | null)?.closest("[data-no-swipe]");
      touchX = e.changedTouches[0].clientX;
    }
    function onEnd(e: TouchEvent) {
      if (touchX === null || ignore) {
        touchX = null;
        return;
      }
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

  const chromeOnDark = !LIGHT_SLIDES.has(current);
  const fullBleed = FULL_BLEED_SLIDES.has(current);
  const showLogo = LOGO_SLIDES.has(current);
  const progressPct = ((current + 1) / total) * 100;

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-bg-light text-text-body">
      {fullBleed && (
        <>
          <div
            className="pointer-events-none fixed inset-x-0 top-0 z-[18] h-28"
            style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.45), rgba(0,0,0,0))" }}
            aria-hidden
          />
          <div
            className="pointer-events-none fixed inset-x-0 bottom-0 z-[18] h-32"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0))" }}
            aria-hidden
          />
        </>
      )}

      {/* Top chrome */}
      <header className="pointer-events-none fixed inset-x-0 top-0 z-20 flex items-start justify-between px-6 py-5 sm:px-10 sm:py-7">
        {showLogo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src="/dig-logo-light.png" alt="Davies Imaging Group" className="h-6 w-auto sm:h-7" />
        ) : (
          <span />
        )}
        {current === 0 && (
          <span className="text-[0.72rem] font-bold uppercase tracking-[0.28em] text-accent-dark-hover sm:text-[0.85rem]">
            Cinematic FrameFlow
          </span>
        )}
      </header>

      {/* Slide stage */}
      <main className="relative h-[100dvh] w-full">
        {slides.map((Slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 overflow-hidden transition-opacity duration-500 ease-out ${
              i === current ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
            }`}
            aria-hidden={i !== current}
          >
            <Slide active={i === current} />
          </div>
        ))}
      </main>

      {/* Bottom nav chrome */}
      <footer
        className={`fixed inset-x-0 bottom-0 z-20 flex items-center gap-4 px-6 py-4 sm:px-10 ${
          chromeOnDark ? "text-white" : "text-text-body"
        }`}
      >
        <button
          type="button"
          onClick={() => show(current - 1)}
          disabled={current === 0}
          className={`rounded-full border px-4 py-2 text-[0.62rem] font-bold uppercase tracking-[0.18em] transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${
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
          disabled={current === total - 1}
          className={`rounded-full border px-4 py-2 text-[0.62rem] font-bold uppercase tracking-[0.18em] transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${
            chromeOnDark
              ? "border-white/30 text-white/90 enabled:hover:border-accent-dark-hover enabled:hover:text-accent-dark-hover"
              : "border-border-light text-text-body enabled:hover:border-accent enabled:hover:text-accent"
          }`}
          aria-label="Next slide"
        >
          Next &rarr;
        </button>
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
// Building blocks
// ─────────────────────────────────────────────────────────────────────────────

function Glow({ pos }: { pos: "tr" | "bl" }) {
  const place = pos === "tr" ? "right-[-10%] top-[-15%]" : "bottom-[-15%] left-[-10%]";
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute h-[60vh] w-[60vh] rounded-full ${place}`}
      style={{
        background: "radial-gradient(circle, rgba(106,90,205,0.22), rgba(106,90,205,0) 70%)",
        filter: "blur(30px)",
      }}
    />
  );
}

function Eyebrow({ children, tone = "accent" }: { children: React.ReactNode; tone?: "accent" | "muted" | "onDark" }) {
  const color =
    tone === "muted" ? "text-text-muted" : tone === "onDark" ? "text-accent-dark-hover" : "text-accent";
  return (
    <p className={`text-[0.85rem] font-bold uppercase tracking-[0.26em] sm:text-base ${color}`}>
      {children}
    </p>
  );
}

/** Self-hosted ambient video — native autoplay, muted, looped, no controls,
 *  so there are zero YouTube/player artifacts. Mounted only on the active
 *  slide so off-screen clips don't all play at once. */
function AmbientVideo({ src, active }: { src: string; active: boolean }) {
  if (!active) return <div className="absolute inset-0 bg-bg-dark" />;
  return (
    <video
      src={ASSET(src)}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      className="pointer-events-none absolute inset-0 h-full w-full object-cover"
    />
  );
}

function BleedImage({ src, alt }: { src: string; alt: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={ASSET(src)} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
  );
}

/** Full-bleed media slide with a bottom-left caption + optional pill. */
function MediaSlide({
  step,
  title,
  pill,
  children,
}: {
  step: string;
  title: string;
  pill?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-bg-dark">
      {children}

      {/* Caption legibility scrim — strong enough for bright video frames. */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[64%]"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.66) 32%, rgba(0,0,0,0.2) 66%, rgba(0,0,0,0) 100%)",
        }}
        aria-hidden
      />

      {pill && (
        <span className="absolute right-6 top-6 z-[2] inline-flex items-center gap-2 rounded-full bg-black/55 px-3.5 py-1.5 text-[0.66rem] font-bold uppercase tracking-[0.16em] text-white backdrop-blur sm:right-10 sm:top-7">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-dark-hover" /> {pill}
        </span>
      )}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] px-8 pb-24 sm:px-[7%]">
        <div className="mx-auto max-w-6xl [text-shadow:0_2px_16px_rgba(0,0,0,0.7)]">
          <Eyebrow tone="onDark">{step}</Eyebrow>
          <h2 className="mt-2.5 max-w-[26ch] font-heading text-[clamp(1.9rem,4.4vw,3.4rem)] font-medium leading-[1.08] tracking-tight text-text-light">
            {title}
          </h2>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────

const APPROACH = [
  { n: "01", label: "Empty Spec Home Photographs" },
  { n: "02", label: "ModelMatch Virtual Staging" },
  { n: "03", label: "Virtual Vignettes, supporting shots" },
  { n: "04", label: "Cinematic FrameFlow" },
];

const PRICING = [
  { label: "20 virtually staged images", price: "$500" },
  { label: "Virtual Vignettes", price: "$200" },
  { label: "Cinematic FrameFlow Video", price: "$800" },
];

// ─────────────────────────────────────────────────────────────────────────────
// Slides
// ─────────────────────────────────────────────────────────────────────────────

type SlideProps = { active: boolean };

const slides: Array<(p: SlideProps) => React.ReactElement> = [
  // 0 — Title (dark)
  () => (
    <div className="relative flex h-full flex-col justify-center overflow-hidden bg-bg-dark px-8 py-16 text-text-light sm:px-[7%] sm:py-20">
      <Glow pos="tr" />
      <div className="relative z-[1] mx-auto w-full max-w-6xl">
        <Eyebrow tone="muted">Luxury Spec Home Presentation</Eyebrow>
        <h1 className="mt-6 max-w-[18ch] font-heading text-[clamp(2.6rem,6vw,5rem)] font-semibold leading-[1.04] tracking-tight text-text-light">
          Setting the new standard for spec home presentation for luxury properties.
        </h1>
        <p className="mt-10 text-sm text-white/40">daviesimaging.com</p>
      </div>
    </div>
  ),

  // 1 — The Problem (light) + two stacked square lifestyle shots
  () => (
    <div className="relative flex h-full flex-col justify-center overflow-hidden bg-bg-light px-8 py-16 text-text-body sm:px-[7%] sm:py-20">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <Eyebrow>The Problem</Eyebrow>
          <h1 className="mt-5 max-w-[20ch] font-heading text-[clamp(1.85rem,4.2vw,3.6rem)] font-normal leading-[1.1] tracking-tight text-text-dark">
            Luxury buyers want lifestyle inspiration. A vacant property gives them no way to see a
            future designed around their needs.
          </h1>
        </div>
        <div className="mx-auto grid w-full max-w-[19rem] grid-cols-2 gap-4 lg:max-w-[20rem] lg:grid-cols-1 lg:gap-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ASSET(MEDIA.problem1)}
            alt="Luxury lifestyle detail"
            className="aspect-square w-full rounded-xl object-cover shadow-lg"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ASSET(MEDIA.problem2)}
            alt="Luxury lifestyle detail"
            className="aspect-square w-full rounded-xl object-cover shadow-lg"
          />
        </div>
      </div>
    </div>
  ),

  // 2 — Our Approach (light, numbered list)
  () => (
    <div className="relative flex h-full flex-col justify-center overflow-hidden bg-bg-light px-8 py-16 text-text-body sm:px-[7%] sm:py-20">
      <div className="mx-auto w-full max-w-6xl">
        <Eyebrow>Our Approach</Eyebrow>
        <h1 className="mt-5 max-w-[24ch] font-heading text-[clamp(1.8rem,4vw,3.4rem)] font-normal leading-[1.1] tracking-tight text-text-dark">
          We combine our architectural photography expertise with groundbreaking virtual staging and
          video generation.
        </h1>
        <ul className="mt-8 border-t border-border-light">
          {APPROACH.map((a) => (
            <li key={a.n} className="flex items-center gap-6 border-b border-border-light py-3.5 sm:gap-8 sm:py-5">
              <span className="font-heading text-2xl font-medium text-accent sm:text-3xl">{a.n}</span>
              <span className="text-base font-semibold text-text-dark sm:text-xl">{a.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  ),

  // 3 — The Method (dark, ambient background film, italic question)
  ({ active }) => (
    <div className="relative flex h-full flex-col justify-center overflow-hidden bg-bg-dark px-8 py-16 text-text-light sm:px-[7%] sm:py-20">
      <AmbientVideo src={MEDIA.methodVideo} active={active} />
      <div className="absolute inset-0 bg-black/60" aria-hidden />
      <div className="relative z-[1] mx-auto w-full max-w-6xl [text-shadow:0_2px_16px_rgba(0,0,0,0.6)]">
        <Eyebrow tone="onDark">The Method</Eyebrow>
        <h1 className="mt-6 max-w-[22ch] font-heading text-[clamp(2rem,4.6vw,3.7rem)] font-medium italic leading-[1.12] tracking-tight text-text-light">
          How do we create this feeling, without the time and expense of physical staging and
          traditional video production?
        </h1>
      </div>
    </div>
  ),

  // 4 — Step One · Empty
  () => (
    <MediaSlide step="Step One · Empty" title="Start with an empty room.">
      <BleedImage src={MEDIA.empty} alt="Empty great room" />
    </MediaSlide>
  ),

  // 5 — Step Two · ModelMatch (staged, before/after pill)
  () => (
    <MediaSlide
      step="Step Two · ModelMatch"
      title="Create on-brand virtual staging using your show homes as art direction."
      pill="Before / After"
    >
      <BleedImage src={MEDIA.staged} alt="ModelMatch staged great room" />
    </MediaSlide>
  ),

  // 6 — Step Three · Virtual Vignette
  () => (
    <MediaSlide
      step="Step Three · Virtual Vignette"
      title="Create secondary shots that emphasize materials and mood."
    >
      <BleedImage src={MEDIA.vignette} alt="Virtual vignette detail" />
    </MediaSlide>
  ),

  // 7 — Step Four · Cinematic FrameFlow (ambient film)
  ({ active }) => (
    <MediaSlide
      step="Step Four · Cinematic FrameFlow"
      title="Generate motion using our FrameFlow video generation process."
    >
      <AmbientVideo src={MEDIA.frameflowVideo} active={active} />
    </MediaSlide>
  ),

  // 8 — The Result (finished film, with sound)
  ({ active }) => (
    <MediaSlide step="The Result" title="Compile the results, add music to enhance the emotional response.">
      <AmbientVideo src={MEDIA.resultVideo} active={active} />
    </MediaSlide>
  ),

  // 9 — Pricing (light)
  () => (
    <div className="relative flex h-full flex-col justify-center overflow-hidden bg-bg-light px-8 py-16 text-text-body sm:px-[7%] sm:py-20">
      <div className="mx-auto w-full max-w-5xl">
        <Eyebrow>Unparalleled Value</Eyebrow>
        <h1 className="mt-5 font-heading text-[clamp(1.9rem,4vw,3.4rem)] font-semibold leading-tight tracking-tight text-text-dark">
          One package. Every asset.
        </h1>
        <dl className="mt-8 border-t border-border-light sm:mt-10">
          {PRICING.map((row) => (
            <div key={row.label} className="flex items-baseline justify-between border-b border-border-light py-3.5 sm:py-5">
              <dt className="text-lg text-text-dark sm:text-xl">{row.label}</dt>
              <dd className="font-heading text-xl text-text-dark sm:text-2xl">{row.price}</dd>
            </div>
          ))}
          <div className="flex items-baseline justify-between border-b-2 border-text-dark py-4 sm:py-6">
            <dt className="text-sm font-bold uppercase tracking-[0.2em] text-accent">Total</dt>
            <dd className="font-heading text-[clamp(2.5rem,6vw,4rem)] font-semibold leading-none text-accent">
              $1,500
            </dd>
          </div>
        </dl>
        <div className="mt-4 flex items-center justify-between rounded-xl bg-black/[0.04] px-5 py-3.5 sm:py-4">
          <span className="text-sm text-text-muted sm:text-base">Optional Vertical Edit</span>
          <span className="text-sm font-medium text-text-muted sm:text-base">+ $500</span>
        </div>
      </div>
    </div>
  ),

  // 10 — Turnaround + digDesk (dark)
  () => (
    <div className="relative flex h-full flex-col justify-center overflow-hidden bg-bg-dark px-8 py-16 text-text-light sm:px-[7%] sm:py-20">
      <Glow pos="tr" />
      <div className="relative z-[1] mx-auto w-full max-w-6xl">
        <div className="grid gap-10 sm:grid-cols-2 sm:gap-16">
          <div>
            <div className="mb-6 h-px w-full bg-accent/60" />
            <Eyebrow tone="onDark">Turnaround Time</Eyebrow>
            <p className="mt-4 font-heading leading-none">
              <span className="text-[clamp(3.5rem,9vw,6rem)] font-semibold text-text-light">72</span>{" "}
              <span className="text-[clamp(1.5rem,3.5vw,2.5rem)] italic text-white/55">hours</span>
            </p>
          </div>
          <div>
            <div className="mb-6 h-px w-full bg-accent/60" />
            <Eyebrow tone="onDark">Order Management</Eyebrow>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ASSET("digdesk-logo.png")} alt="digDesk" className="mt-5 h-9 w-auto sm:h-11" />
            <p className="mt-4 max-w-[36ch] text-sm text-white/55 sm:text-base">
              One portal for ordering, tracking, and asset delivery.
            </p>
          </div>
        </div>
        <div className="mt-12 flex items-end justify-between gap-4 sm:mt-16">
          <p className="font-heading text-base italic text-white/70 sm:text-lg">
            Photography built for Homebuilders.
          </p>
          <Link href="/" className="text-sm text-white/45 transition-colors hover:text-white">
            daviesimaging.com
          </Link>
        </div>
      </div>
    </div>
  ),
];

// Slide index sets (0-based).
const LIGHT_SLIDES = new Set<number>([1, 2, 9]); // problem, approach, pricing
const FULL_BLEED_SLIDES = new Set<number>([3, 4, 5, 6, 7, 8]); // method film + 5 media
const LOGO_SLIDES = new Set<number>([0, 4, 6, 10]); // title, empty, vignette, closing
