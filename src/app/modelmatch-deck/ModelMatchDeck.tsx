"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Eyebrow } from "@/components/Eyebrow";
import { DarkSectionBg } from "@/components/DarkSectionBg";
import MMSlider from "@/components/lp/MMSlider";

/**
 * /modelmatch-deck — full-screen ModelMatch virtual-staging deck.
 *
 * Mounted chromelessly via SiteShell (no Nav, Footer, or email modal). Mirrors
 * the structure of the "ModelMatch VS Intro" PDF: positioning, how-it-works,
 * three builder samples (each with an interactive before/after slider), why,
 * pricing, and the digDesk platform walkthrough.
 *
 * Images live in /public/mm-deck (curated before/after pairs copied out of the
 * gated showcase library + digDesk screenshots). Public route, so assets must
 * NOT live under /modelmatch-demo (that path is password-gated).
 */

const IMG = (f: string) => `/mm-deck/${f}`;

// 0-indexed slides that paint chrome over an edge-to-edge image.
const FULL_BLEED_SLIDES = new Set<number>([4, 8, 12, 18, 19, 20]);
// 0-indexed slides with a dark background (chrome goes light-on-dark).
const DARK_SLIDES = new Set<number>([0, 2, 17]);

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

export function ModelMatchDeck() {
  const [current, setCurrent] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
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
    const el = slideRefs.current[current];
    if (el) el.scrollTop = 0;
  }, [current]);

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

  // Touch swipe — but ignore gestures that start inside a before/after slider,
  // so dragging the handle doesn't also flip the slide.
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

  const slideIsDark = DARK_SLIDES.has(current);
  const slideIsFullBleed = FULL_BLEED_SLIDES.has(current);
  const chromeOnDark = slideIsDark || slideIsFullBleed;
  const progressPct = ((current + 1) / total) * 100;

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-bg-light text-text-body">
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
          ModelMatch
        </span>
        <span
          className={`text-[0.65rem] font-medium uppercase tracking-[0.25em] tabular-nums transition-colors ${
            chromeOnDark ? "text-white/60" : "text-text-muted"
          }`}
        >
          {pad(current + 1)} / {pad(total)}
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
          disabled={current === total - 1}
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
          href="/services/virtual-staging"
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
// Building blocks
// ─────────────────────────────────────────────────────────────────────────────

function SlideShell({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
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

function FullBleed({
  eyebrow,
  title,
  lede,
  imageSrc,
  imageAlt,
  objectPosition = "center",
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede?: string;
  imageSrc: string;
  imageAlt: string;
  objectPosition?: string;
}) {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-bg-dark text-text-light">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageSrc}
        alt={imageAlt}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.55) 30%, rgba(0,0,0,0.15) 65%, rgba(0,0,0,0) 100%)",
        }}
        aria-hidden
      />
      <div className="absolute inset-x-0 bottom-24 px-6 sm:bottom-28 sm:px-12">
        <div className="mx-auto max-w-6xl">
          <Eyebrow dark>{eyebrow}</Eyebrow>
          <h1 className="font-heading text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-[1.04] tracking-tight text-text-light">
            {title}
          </h1>
          {lede && <p className="lead-text mt-4 max-w-[55ch] text-white/80">{lede}</p>}
        </div>
      </div>
    </div>
  );
}

/** A centered before/after slider on a light slide, with eyebrow + caption. */
function SliderSlide({
  eyebrow,
  room,
  before,
  after,
  note,
}: {
  eyebrow: string;
  room: string;
  before: string;
  after: string;
  note?: string;
}) {
  return (
    <SlideShell>
      <div className="mx-auto w-full max-w-5xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mb-6 mt-1 font-heading text-[clamp(1.5rem,3vw,2.25rem)] font-medium leading-tight tracking-tight text-text-dark">
          {room}
        </h2>
        <div data-mm-slider>
          <MMSlider before={IMG(before)} after={IMG(after)} />
        </div>
        {note && <p className="mt-5 max-w-[60ch] text-sm leading-relaxed text-text-muted">{note}</p>}
      </div>
    </SlideShell>
  );
}

function SampleDivider({ letter, builder }: { letter: string; builder: string }) {
  return (
    <SlideShell>
      <div className="text-center">
        <h1 className="font-heading text-[clamp(3rem,7vw,5.5rem)] font-semibold leading-none tracking-tight text-text-dark">
          Sample {letter}
        </h1>
        <p className="mt-5 text-sm font-bold uppercase tracking-[0.35em] text-accent">{builder}</p>
      </div>
    </SlideShell>
  );
}

function BenefitCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-border-light bg-bg-surface p-6">
      <h4 className="text-text-dark">{title}</h4>
      <p className="mt-2 text-sm leading-relaxed text-text-muted">{body}</p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Slides
// ─────────────────────────────────────────────────────────────────────────────

const HOW_STEPS = [
  {
    n: "01",
    title: "Build your ModelMatch Gallery",
    body: "Upload existing model home photography into your account. These images become your permanent design reference library.",
  },
  {
    n: "02",
    title: "Create a virtual staging order",
    body: "Place a new order in digDesk. Upload the vacant listing photos you want staged.",
  },
  {
    n: "03",
    title: "Select your ModelMatch Gallery",
    body: "Choose the model home reference set that best matches the community or floorplan. Our team handles the rest.",
  },
  {
    n: "04",
    title: "Receive polished, on-brand results",
    body: "Finished staged images are delivered to your digDesk portal within one business day, ready to publish across every channel.",
  },
];

const WHY_CARDS = [
  {
    title: "Reference-based, not random",
    body: "We use your approved model home photography as the design source. The result reflects your community, not a stock furniture catalog.",
  },
  {
    title: "Matches your design palette",
    body: "Material selections, furniture style, and color palette are pulled from your existing photography, so every staged image is brand-consistent.",
  },
  {
    title: "Works on photos you already have",
    body: "No new shoot required. Send existing listing photography and receive staged images ready for MLS, website, and paid media.",
  },
  {
    title: "Fast turnaround, bulk-friendly",
    body: "Order standalone through digDesk or bundle inside Spec+ for photography, staging, and video in one delivery.",
  },
];

const slides: Array<() => React.ReactElement> = [
  // 0 — Title (dark)
  () => (
    <SlideShell dark>
      <div>
        <Eyebrow dark>Virtual Staging</Eyebrow>
        <h1 className="font-heading text-[clamp(2.5rem,6vw,4.75rem)] font-semibold leading-[1.04] tracking-tight text-text-light">
          ModelMatch is virtual staging built for Homebuilders.
        </h1>
        <p className="lead-text mt-6 max-w-[55ch] text-white/80">
          Virtual staging that uses your model home photography as art direction. Every staged image
          is on-brand, not a generic template.
        </p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/dig-logo-light.png" alt="Davies Imaging Group" className="mt-12 h-9 w-auto" />
      </div>
    </SlideShell>
  ),

  // 1 — The ModelMatch Difference (text + image)
  () => (
    <SlideShell>
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <Eyebrow>The ModelMatch Difference</Eyebrow>
          <h1 className="font-heading text-[clamp(2rem,4.4vw,3.4rem)] font-semibold leading-[1.06] tracking-tight text-text-dark">
            Zero generic furniture. <strong>Brand-matched staging.</strong>
          </h1>
          <p className="mt-5 max-w-[48ch] leading-relaxed text-text-body">
            Most virtual staging services drop generic furniture into empty rooms. DIG builds a
            permanent staging reference library from your actual model home photography. Every staged
            image reflects your builder&rsquo;s design identity.
          </p>
          <p className="mt-4 max-w-[48ch] leading-relaxed text-text-body">
            The result: staged listings that feel like an extension of your community, not a
            furniture showroom. Buyers recognize the brand. That recognition builds trust.
          </p>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={IMG("grand-lkd-after.jpg")}
          alt="Brand-matched virtual staging"
          className="aspect-[4/3] w-full rounded-2xl object-cover shadow-xl"
        />
      </div>
    </SlideShell>
  ),

  // 2 — How it works (dark, 4 cards)
  () => (
    <SlideShell dark>
      <div className="text-center">
        <Eyebrow dark>How It Works</Eyebrow>
        <h1 className="font-heading text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-tight tracking-tight text-text-light">
          Four steps to <strong>on-brand staging.</strong>
        </h1>
        <p className="mx-auto mt-4 max-w-[60ch] text-white/70">
          ModelMatch is built around your account. Once your reference library is set up, every
          future order uses it automatically.
        </p>
      </div>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {HOW_STEPS.map((s) => (
          <div key={s.n} className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <span className="font-heading text-3xl font-semibold text-accent-dark-hover">{s.n}</span>
            <h4 className="mt-3 text-text-light">{s.title}</h4>
            <p className="mt-2 text-sm leading-relaxed text-white/60">{s.body}</p>
          </div>
        ))}
      </div>
    </SlideShell>
  ),

  // 3 — Sample A divider
  () => <SampleDivider letter="A" builder="Perry Homes" />,

  // 4 — Perry staged reference (full-bleed)
  () => (
    <FullBleed
      eyebrow="Sample A / Perry Homes"
      title="Staged to match the model."
      lede="Riley Street, Avondale. The finished ModelMatch result, pulled from Perry's own model home palette."
      imageSrc={IMG("perry-living-after.jpg")}
      imageAlt="Perry Homes staged living room"
    />
  ),

  // 5 — Perry slider 1
  () => (
    <SliderSlide
      eyebrow="Sample A / Perry Homes"
      room="Living Room"
      before="perry-living-before.jpg"
      after="perry-living-after.jpg"
      note="Drag to compare. The vacant listing photo on the left, the ModelMatch-staged result on the right."
    />
  ),

  // 6 — Perry slider 2
  () => (
    <SliderSlide
      eyebrow="Sample A / Perry Homes"
      room="Primary Bedroom"
      before="perry-bed-before.jpg"
      after="perry-bed-after.jpg"
    />
  ),

  // 7 — Sample B divider
  () => <SampleDivider letter="B" builder="Grand Homes" />,

  // 8 — Grand staged reference (full-bleed)
  () => (
    <FullBleed
      eyebrow="Sample B / Grand Homes"
      title="One open plan, fully furnished."
      lede="Rivercrest. Living, kitchen, and dining staged as a single on-brand space."
      imageSrc={IMG("grand-lkd-after.jpg")}
      imageAlt="Grand Homes staged open plan"
    />
  ),

  // 9 — Grand slider 1
  () => (
    <SliderSlide
      eyebrow="Sample B / Grand Homes"
      room="Living, Kitchen & Dining"
      before="grand-lkd-before.jpg"
      after="grand-lkd-after.jpg"
      note="Drag to compare. ModelMatch furnishes the full open-concept space in a single pass."
    />
  ),

  // 10 — Grand slider 2
  () => (
    <SliderSlide
      eyebrow="Sample B / Grand Homes"
      room="Formal Dining"
      before="grand-dining-before.jpg"
      after="grand-dining-after.jpg"
    />
  ),

  // 11 — Sample C divider
  () => <SampleDivider letter="C" builder="Beazer Homes" />,

  // 12 — Beazer staged reference (full-bleed)
  () => (
    <FullBleed
      eyebrow="Sample C / Beazer Homes"
      title="Move-in ready, on screen."
      lede="OAC Lot 59, Nashville. Staged bedrooms and baths that read as finished spaces."
      imageSrc={IMG("beazer-bed-after.jpg")}
      imageAlt="Beazer Homes staged bedroom"
    />
  ),

  // 13 — Beazer slider 1
  () => (
    <SliderSlide
      eyebrow="Sample C / Beazer Homes"
      room="Bedroom"
      before="beazer-bed-before.jpg"
      after="beazer-bed-after.jpg"
      note="Drag to compare. Empty room to staged, ready for the listing."
    />
  ),

  // 14 — Beazer slider 2
  () => (
    <SliderSlide
      eyebrow="Sample C / Beazer Homes"
      room="Bathroom"
      before="beazer-bath-before.jpg"
      after="beazer-bath-after.jpg"
    />
  ),

  // 15 — Why builders choose ModelMatch
  () => (
    <SlideShell>
      <div className="text-center">
        <Eyebrow>Why Builders Choose ModelMatch</Eyebrow>
        <h1 className="font-heading text-[clamp(2rem,4.4vw,3.4rem)] font-semibold leading-tight tracking-tight text-text-dark">
          Every listing. <strong>Same brand.</strong>
        </h1>
      </div>
      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {WHY_CARDS.map((c) => (
          <BenefitCard key={c.title} title={c.title} body={c.body} />
        ))}
      </div>
    </SlideShell>
  ),

  // 16 — Pricing
  () => (
    <SlideShell>
      <div className="text-center">
        <Eyebrow>Pricing</Eyebrow>
        <h1 className="font-heading text-[clamp(2rem,4.4vw,3.4rem)] font-semibold leading-tight tracking-tight text-text-dark">
          Standalone or <strong>bundled in Spec+.</strong>
        </h1>
        <p className="mx-auto mt-4 max-w-[60ch] text-text-body">
          Order virtual staging by itself through digDesk, or bundle it with listing photography and
          virtual video inside Spec+ for one flat price.
        </p>
      </div>
      <div className="mx-auto mt-12 grid w-full max-w-4xl gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-border-light bg-bg-surface p-8">
          <h4 className="text-text-dark">Standalone Virtual Staging</h4>
          <p className="mt-2 text-sm leading-relaxed text-text-muted">
            Already have photos? Upload them through digDesk and receive ModelMatch-staged images
            ready to publish.
          </p>
          <p className="mt-6 font-heading text-4xl font-semibold text-text-dark">
            Starting at $25 <span className="text-base font-normal text-text-muted">/ image</span>
          </p>
        </div>
        <div className="relative rounded-2xl border-2 border-accent bg-bg-surface p-8">
          <span className="absolute -top-3 left-8 rounded-full bg-accent/15 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.15em] text-accent">
            Best Value
          </span>
          <h4 className="text-text-dark">Spec+ Bundle</h4>
          <p className="mt-2 text-sm leading-relaxed text-text-muted">
            Photography, staging, and virtual video in one $600 order. 72-hour delivery after the
            shoot.
          </p>
          <p className="mt-6 font-heading text-4xl font-semibold text-text-dark">
            $600 flat <span className="text-base font-normal text-text-muted">/ property</span>
          </p>
        </div>
      </div>
    </SlideShell>
  ),

  // 17 — digDesk reveal (dark)
  () => (
    <SlideShell dark>
      <div className="text-center">
        <span className="font-heading text-[clamp(3rem,8vw,6rem)] font-bold tracking-tight">
          <span className="text-white">dig</span>
          <span className="text-accent-dark-hover">Desk</span>
        </span>
        <p className="mx-auto mt-6 max-w-[50ch] text-white/70">
          Order ModelMatch, track every job, and download finished assets from one portal.
        </p>
      </div>
    </SlideShell>
  ),

  // 18 — digDesk dashboard (full-bleed)
  () => (
    <FullBleed
      eyebrow="The Platform / digDesk"
      title="One dashboard, every order."
      lede="Active orders, delivery status, and account balance at a glance."
      imageSrc={IMG("digdesk-dashboard.jpg")}
      imageAlt="digDesk dashboard"
      objectPosition="top"
    />
  ),

  // 19 — digDesk delivery (full-bleed)
  () => (
    <FullBleed
      eyebrow="The Platform / digDesk"
      title="Files delivered, ready to download."
      lede="Every staged image lands in the portal with a clear order timeline."
      imageSrc={IMG("digdesk-delivery.jpg")}
      imageAlt="digDesk delivery page"
      objectPosition="top"
    />
  ),

  // 20 — digDesk gallery (full-bleed)
  () => (
    <FullBleed
      eyebrow="The Platform / digDesk"
      title="Your ModelMatch reference library."
      lede="Model home galleries, saved to your account and reused on every future order."
      imageSrc={IMG("digdesk-gallery.jpg")}
      imageAlt="digDesk ModelMatch gallery"
      objectPosition="top"
    />
  ),

  // 21 — Closing
  () => (
    <SlideShell>
      <div className="text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/dig-logo-original.png" alt="Davies Imaging Group" className="mx-auto h-12 w-auto" />
        <h1 className="mt-8 font-heading text-[clamp(1.75rem,3.6vw,2.75rem)] font-medium leading-tight tracking-tight text-text-dark">
          Branded virtual staging, built for homebuilders.
        </h1>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-dark-hover"
          >
            Book a Strategy Call
          </Link>
          <Link
            href="/services/virtual-staging"
            className="text-sm font-medium text-text-muted transition-colors hover:text-accent"
          >
            Explore ModelMatch &rarr;
          </Link>
        </div>
      </div>
    </SlideShell>
  ),
];
