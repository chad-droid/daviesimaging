"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import MMSlider from "@/components/lp/MMSlider";

/**
 * /modelmatch-cinematic — full-screen "Cinematic FrameFlow" deck.
 *
 * Mounted chromelessly via SiteShell (no Nav/Footer/email modal). Layout matches
 * the Cinematic FrameFlow (design) PDF: dark/light alternating editorial slides,
 * Cormorant headings + Noto eyebrows, accent-purple labels, full-bleed media with
 * bottom-left captions, dig logo top-left on the title/step/closing slides.
 *
 * The 5 media slides are ASSET SLOTS. Until a file is set in MEDIA below they
 * render the design's "Drop …" placeholder. To wire real assets: drop files into
 * /public/mm-cinematic and fill the matching MEDIA value (image path, or a
 * YouTube id / .mp4 path for the FrameFlow film + its poster).
 */

const ASSET = (f: string) => `/mm-cinematic/${f}`;

// ── Asset slots (empty => styled placeholder). Fill once Chad provides files. ──
const MEDIA = {
  empty: "", // Step One — empty room photograph (full-bleed)
  stagedBefore: "", // Step Two — vacant photo (left of before/after compare)
  stagedAfter: "", // Step Two — ModelMatch staged photo (right of compare)
  vignette: "", // Step Three — detail / vignette shot (full-bleed)
  frameflowVideo: "", // Step Four — YouTube id OR /mm-cinematic/xxx.mp4
  frameflowPoster: "", // Step Four — poster frame behind the play button
  result: "", // The Result — finished staged photo (full-bleed)
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

  // Touch swipe — ignore gestures starting inside a before/after slider.
  useEffect(() => {
    let touchX: number | null = null;
    let ignore = false;
    function onStart(e: TouchEvent) {
      ignore = !!(e.target as HTMLElement | null)?.closest("[data-mm-slider]");
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
          <span className="text-[0.62rem] font-bold uppercase tracking-[0.28em] text-accent-dark-hover sm:text-[0.7rem]">
            Cinematic FrameFlow
          </span>
        )}
      </header>

      {/* Slide stage */}
      <main className="relative h-full w-full">
        {slides.map((Slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 overflow-auto transition-opacity duration-500 ease-out ${
              i === current ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
            }`}
            aria-hidden={i !== current}
          >
            <Slide />
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
  const place =
    pos === "tr" ? "right-[-10%] top-[-15%]" : "bottom-[-15%] left-[-10%]";
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
    tone === "muted"
      ? "text-text-muted"
      : tone === "onDark"
        ? "text-accent-dark-hover"
        : "text-accent";
  return (
    <p className={`text-[0.7rem] font-bold uppercase tracking-[0.28em] sm:text-[0.78rem] ${color}`}>
      {children}
    </p>
  );
}

/** Editorial text slide — left-justified, vertically centered. */
function TextSlide({
  dark,
  glow,
  eyebrow,
  eyebrowTone,
  children,
}: {
  dark?: boolean;
  glow?: "tr" | "bl";
  eyebrow: string;
  eyebrowTone?: "accent" | "onDark";
  children: React.ReactNode;
}) {
  return (
    <div
      className={`relative min-h-full px-8 pb-24 pt-24 sm:px-[7%] ${
        dark ? "bg-bg-dark text-text-light" : "bg-bg-light text-text-body"
      }`}
    >
      {dark && glow && <Glow pos={glow} />}
      <div className="relative z-[1] mx-auto flex min-h-[calc(100vh-12rem)] max-w-6xl flex-col justify-center">
        <Eyebrow tone={eyebrowTone ?? (dark ? "onDark" : "accent")}>{eyebrow}</Eyebrow>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}

/** Full-bleed media slot. Image / before-after / video, or a styled placeholder
 *  when its asset is empty. Caption (eyebrow + headline) overlays bottom-left. */
function MediaSlide({
  step,
  title,
  kind,
  placeholder,
}: {
  step: string;
  title: string;
  kind: "image" | "beforeAfter" | "video";
  placeholder: string;
}) {
  let body: React.ReactNode;

  if (kind === "image") {
    const src = step.includes("EMPTY") ? MEDIA.empty : step.includes("RESULT") ? MEDIA.result : MEDIA.vignette;
    body = src ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={ASSET(src)} alt={title} className="absolute inset-0 h-full w-full object-cover" />
    ) : (
      <Placeholder label={placeholder} />
    );
  } else if (kind === "beforeAfter") {
    body =
      MEDIA.stagedBefore && MEDIA.stagedAfter ? (
        <div data-mm-slider className="absolute inset-0 flex items-center justify-center p-6 sm:p-12">
          <div className="w-full max-w-[1500px]">
            <MMSlider before={ASSET(MEDIA.stagedBefore)} after={ASSET(MEDIA.stagedAfter)} />
          </div>
        </div>
      ) : (
        <Placeholder label={placeholder} />
      );
  } else {
    // video
    if (MEDIA.frameflowVideo) {
      const yt = !MEDIA.frameflowVideo.includes("/") && !MEDIA.frameflowVideo.includes(".");
      body = yt ? (
        <div className="absolute inset-0 origin-center scale-[1.3]">
          <iframe
            src={`https://www.youtube.com/embed/${MEDIA.frameflowVideo}?autoplay=1&mute=1&loop=1&playlist=${MEDIA.frameflowVideo}&controls=0&modestbranding=1&playsinline=1&rel=0&showinfo=0&disablekb=1`}
            title={title}
            className="pointer-events-none h-full w-full"
            allow="autoplay; encrypted-media"
            tabIndex={-1}
          />
        </div>
      ) : (
        <video
          src={ASSET(MEDIA.frameflowVideo)}
          poster={MEDIA.frameflowPoster ? ASSET(MEDIA.frameflowPoster) : undefined}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
      );
    } else {
      body = (
        <Placeholder label={placeholder}>
          <PlayButton />
        </Placeholder>
      );
    }
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-bg-dark">
      {body}

      {/* Before / After pill (ModelMatch step) */}
      {kind === "beforeAfter" && !(MEDIA.stagedBefore && MEDIA.stagedAfter) && (
        <span className="absolute right-6 top-6 z-[2] inline-flex items-center gap-2 rounded-full bg-black/60 px-3.5 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-white backdrop-blur sm:right-10 sm:top-7">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-dark-hover" /> Before / After
        </span>
      )}

      {/* Caption */}
      <div className="absolute inset-x-0 bottom-0 z-[2] px-8 pb-24 sm:px-[7%]">
        <div className="mx-auto max-w-6xl [text-shadow:0_2px_14px_rgba(0,0,0,0.6)]">
          <Eyebrow tone="onDark">{step}</Eyebrow>
          <h2 className="mt-2 font-heading text-[clamp(1.9rem,4.4vw,3.4rem)] font-medium leading-[1.08] tracking-tight text-text-light">
            {title}
          </h2>
        </div>
      </div>
    </div>
  );
}

function Placeholder({ label, children }: { label: string; children?: React.ReactNode }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white/20">
      {children ?? (
        <svg viewBox="0 0 24 24" className="h-9 w-9" fill="none" stroke="currentColor" strokeWidth={1.4}>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.6" />
          <path d="M21 15l-5-5L5 21" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      <span className="text-[0.7rem] font-medium uppercase tracking-[0.2em]">{label}</span>
    </div>
  );
}

function PlayButton() {
  return (
    <span className="flex h-20 w-20 items-center justify-center rounded-full border border-white/30 bg-black/20 backdrop-blur">
      <svg viewBox="0 0 24 24" className="ml-1 h-8 w-8 text-white/80" fill="currentColor">
        <path d="M8 5v14l11-7z" />
      </svg>
    </span>
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

const slides: Array<() => React.ReactElement> = [
  // 0 — Title (dark)
  () => (
    <div className="relative min-h-full overflow-hidden bg-bg-dark px-8 pb-24 pt-28 text-text-light sm:px-[7%]">
      <Glow pos="tr" />
      <div className="relative z-[1] mx-auto flex min-h-[calc(100vh-12rem)] max-w-6xl flex-col justify-center">
        <Eyebrow tone="muted">Luxury Spec Home Presentation</Eyebrow>
        <h1 className="mt-6 max-w-[18ch] font-heading text-[clamp(2.6rem,6vw,5rem)] font-semibold leading-[1.04] tracking-tight text-text-light">
          Setting the new standard for spec home presentation for luxury properties.
        </h1>
        <p className="mt-10 text-sm text-white/40">daviesimaging.com</p>
      </div>
    </div>
  ),

  // 1 — The Problem (light)
  () => (
    <TextSlide eyebrow="The Problem">
      <h1 className="max-w-[20ch] font-heading text-[clamp(2.1rem,4.8vw,3.9rem)] font-normal leading-[1.1] tracking-tight text-text-dark">
        Luxury buyers want lifestyle inspiration. A vacant property gives them no way to see a future
        designed around their needs.
      </h1>
    </TextSlide>
  ),

  // 2 — Our Approach (light, numbered list)
  () => (
    <TextSlide eyebrow="Our Approach">
      <h1 className="max-w-[24ch] font-heading text-[clamp(1.9rem,4.2vw,3.4rem)] font-normal leading-[1.1] tracking-tight text-text-dark">
        We combine our architectural photography expertise with groundbreaking virtual staging and
        video generation.
      </h1>
      <ul className="mt-10 border-t border-border-light">
        {APPROACH.map((a) => (
          <li key={a.n} className="flex items-center gap-6 border-b border-border-light py-4 sm:gap-8 sm:py-5">
            <span className="font-heading text-2xl font-medium text-accent sm:text-3xl">{a.n}</span>
            <span className="text-base font-semibold text-text-dark sm:text-xl">{a.label}</span>
          </li>
        ))}
      </ul>
    </TextSlide>
  ),

  // 3 — The Method (dark, italic)
  () => (
    <TextSlide dark glow="bl" eyebrow="The Method">
      <h1 className="max-w-[22ch] font-heading text-[clamp(2rem,4.6vw,3.7rem)] font-medium italic leading-[1.12] tracking-tight text-text-light">
        How do we create this feeling, without the time and expense of physical staging and
        traditional video production?
      </h1>
    </TextSlide>
  ),

  // 4 — Step One · Empty (media)
  () => (
    <MediaSlide
      step="Step One · Empty"
      title="Start with an empty room."
      kind="image"
      placeholder="Drop empty room photograph"
    />
  ),

  // 5 — Step Two · ModelMatch (before/after media)
  () => (
    <MediaSlide
      step="Step Two · ModelMatch"
      title="Create on-brand virtual staging using your show homes as art direction."
      kind="beforeAfter"
      placeholder="Drop before / after pair"
    />
  ),

  // 6 — Step Three · Virtual Vignette (media)
  () => (
    <MediaSlide
      step="Step Three · Virtual Vignette"
      title="Create secondary shots that emphasize materials and mood."
      kind="image"
      placeholder="Drop detail / vignette shot"
    />
  ),

  // 7 — Step Four · Cinematic FrameFlow (video media)
  () => (
    <MediaSlide
      step="Step Four · Cinematic FrameFlow"
      title="Generate motion using our FrameFlow video generation process."
      kind="video"
      placeholder="Drop FrameFlow film"
    />
  ),

  // 8 — The Result (media)
  () => (
    <MediaSlide
      step="The Result"
      title="Compile the results, add music to enhance the emotional response."
      kind="image"
      placeholder="Drop finished result"
    />
  ),

  // 9 — Pricing (light)
  () => (
    <div className="relative min-h-full bg-bg-light px-8 pb-24 pt-24 text-text-body sm:px-[7%]">
      <div className="mx-auto flex min-h-[calc(100vh-12rem)] max-w-5xl flex-col justify-center">
        <Eyebrow>Unparalleled Value</Eyebrow>
        <h1 className="mt-5 font-heading text-[clamp(2rem,4.2vw,3.4rem)] font-semibold leading-tight tracking-tight text-text-dark">
          One package. Every asset.
        </h1>
        <dl className="mt-12 border-t border-border-light">
          {PRICING.map((row) => (
            <div
              key={row.label}
              className="flex items-baseline justify-between border-b border-border-light py-5"
            >
              <dt className="text-lg text-text-dark sm:text-xl">{row.label}</dt>
              <dd className="font-heading text-xl text-text-dark sm:text-2xl">{row.price}</dd>
            </div>
          ))}
          <div className="flex items-baseline justify-between border-b-2 border-text-dark py-6">
            <dt className="text-sm font-bold uppercase tracking-[0.2em] text-accent">Total</dt>
            <dd className="font-heading text-[clamp(2.5rem,6vw,4rem)] font-semibold leading-none text-accent">
              $1,500
            </dd>
          </div>
        </dl>
        <div className="mt-4 flex items-center justify-between rounded-xl bg-black/[0.04] px-5 py-4">
          <span className="text-sm text-text-muted sm:text-base">Optional Vertical Edit</span>
          <span className="text-sm font-medium text-text-muted sm:text-base">+ $500</span>
        </div>
      </div>
    </div>
  ),

  // 10 — Turnaround + digDesk (dark)
  () => (
    <div className="relative min-h-full overflow-hidden bg-bg-dark px-8 pb-24 pt-28 text-text-light sm:px-[7%]">
      <Glow pos="tr" />
      <div className="relative z-[1] mx-auto flex min-h-[calc(100vh-12rem)] max-w-6xl flex-col justify-center">
        <div className="grid gap-12 sm:grid-cols-2 sm:gap-16">
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
            <p className="mt-4 font-heading text-[clamp(2.25rem,5vw,3.5rem)] font-medium leading-none text-text-light">
              via digDesk
            </p>
            <p className="mt-4 max-w-[36ch] text-sm text-white/55 sm:text-base">
              One portal for ordering, tracking, and asset delivery.
            </p>
          </div>
        </div>
        <div className="mt-16 flex items-end justify-between gap-4">
          <p className="font-heading text-base italic text-white/70 sm:text-lg">
            Photography built for Homebuilders.
          </p>
          <Link
            href="/"
            className="text-sm text-white/45 transition-colors hover:text-white"
          >
            daviesimaging.com
          </Link>
        </div>
      </div>
    </div>
  ),
];

// Slide index sets (0-based).
const LIGHT_SLIDES = new Set<number>([1, 2, 9]); // problem, approach, pricing
const FULL_BLEED_SLIDES = new Set<number>([4, 5, 6, 7, 8]); // the 5 media slots
const LOGO_SLIDES = new Set<number>([0, 4, 6, 10]); // title, empty, vignette, closing
