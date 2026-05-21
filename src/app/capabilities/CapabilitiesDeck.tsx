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
 * 27 slides, keyboard + button + touch navigation, URL hash deep links.
 * Typography and color tokens match the rest of daviesimaging.com.
 */

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

  // Reset scroll within slide on change
  useEffect(() => {
    const el = slideRefs.current[current];
    if (el) el.scrollTop = 0;
  }, [current]);

  // Keyboard nav
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

  // Touch swipe
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

  // Boot from URL hash + show hint briefly
  useEffect(() => {
    const hashN = parseInt(window.location.hash.slice(1), 10);
    if (!isNaN(hashN)) show(hashN - 1);
    const t1 = window.setTimeout(() => setShowHint(true), 800);
    const t2 = window.setTimeout(() => setShowHint(false), 5200);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
    // Intentional: boot once on mount
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
          className={`border px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.18em] transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${
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
          className={`border px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.18em] transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${
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
        <kbd className="mx-0.5 rounded bg-accent px-1.5 py-0.5 text-[0.65rem] text-white">
          &larr;
        </kbd>{" "}
        <kbd className="mx-0.5 rounded bg-accent px-1.5 py-0.5 text-[0.65rem] text-white">
          &rarr;
        </kbd>{" "}
        to navigate
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Slide building blocks
// ─────────────────────────────────────────────────────────────────────────────

function SlideShell({
  children,
  dark,
  accentBar,
}: {
  children: React.ReactNode;
  dark?: boolean;
  accentBar?: boolean;
}) {
  return (
    <div
      className={`relative min-h-full px-6 pb-24 pt-24 sm:px-12 sm:pt-28 ${
        dark ? "bg-bg-dark text-text-light" : "bg-bg-light text-text-body"
      }`}
    >
      {dark && <DarkSectionBg glowIntensity={14} />}
      {accentBar && (
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1.5 bg-accent" aria-hidden />
      )}
      <div className="relative z-[1] mx-auto flex min-h-[calc(100vh-12rem)] max-w-6xl flex-col justify-center">
        {children}
      </div>
    </div>
  );
}

function AccentRule({ dark }: { dark?: boolean }) {
  return <span className={`mt-5 mb-6 block h-[3px] w-24 ${dark ? "bg-accent-dark-hover" : "bg-accent"}`} />;
}

function ChannelChip({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative border border-border-light bg-white px-3 py-4 text-center text-[0.65rem] font-bold uppercase tracking-[0.2em] text-text-dark">
      <span className="absolute inset-x-0 top-0 h-[3px] bg-accent" aria-hidden />
      {children}
    </div>
  );
}

function ShowChip({ children }: { children: React.ReactNode }) {
  return (
    <div className="border border-border-light bg-white px-2 py-2.5 text-center text-[0.6rem] font-bold uppercase tracking-[0.18em] text-text-body">
      {children}
    </div>
  );
}

function Placeholder({
  variant,
  label,
  caption,
}: {
  variant: "image" | "video" | "3d";
  label: string;
  caption: string;
}) {
  return (
    <div className="flex min-h-[360px] flex-col items-center justify-center gap-3 border border-dashed border-border-light bg-white/60 px-6 py-12 text-center">
      {variant === "image" && (
        <div className="relative h-12 w-16 bg-accent">
          <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-bg-light" aria-hidden />
        </div>
      )}
      {variant === "video" && (
        <div
          aria-hidden
          className="h-0 w-0"
          style={{
            borderLeft: "32px solid var(--accent)",
            borderTop: "20px solid transparent",
            borderBottom: "20px solid transparent",
          }}
        />
      )}
      {variant === "3d" && (
        <div className="relative h-14 w-14">
          <span className="absolute right-0 top-0 h-10 w-10 bg-accent" aria-hidden />
          <span className="absolute bottom-0 left-0 h-10 w-10 bg-accent-secondary" aria-hidden />
        </div>
      )}
      <span className="mt-2 text-[0.7rem] font-bold uppercase tracking-[0.25em] text-text-dark">
        {label}
      </span>
      <span className="max-w-[28ch] text-xs italic text-text-muted">{caption}</span>
    </div>
  );
}

function ServiceShow({
  eyebrow,
  title,
  positioning,
  chips,
  placeholder,
}: {
  eyebrow: string;
  title: React.ReactNode;
  positioning: string;
  chips: string[];
  placeholder: { variant: "image" | "video" | "3d"; label: string; caption: string };
}) {
  return (
    <SlideShell>
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="font-heading text-[clamp(2.25rem,4.5vw,3.6rem)] font-semibold leading-[1.05] tracking-tight text-text-dark">
            {title}
          </h1>
          <AccentRule />
          <p className="lead-text mt-2 max-w-[32ch] text-text-body">{positioning}</p>
          <p className="mt-8 text-[0.65rem] font-bold uppercase tracking-[0.3em] text-accent">
            Where it lives
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {chips.map((c) => (
              <ShowChip key={c}>{c}</ShowChip>
            ))}
          </div>
        </div>
        <Placeholder {...placeholder} />
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
      <h2 className="font-heading text-[clamp(1.8rem,3.6vw,2.8rem)] font-medium leading-[1.1] tracking-tight text-text-dark">
        {title}
      </h2>
      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <h4 className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-accent">
            What&apos;s included
          </h4>
          <ul className="mt-5 space-y-1">
            {included.map((line) => (
              <li key={line} className="relative pl-6 text-[0.95rem] leading-[1.55] text-text-body">
                <span className="absolute left-0 top-3 h-px w-3.5 bg-accent" aria-hidden />
                {line}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-accent">
            {usesHeading}
          </h4>
          <ol className="mt-5 space-y-1 [counter-reset:step]">
            {uses.map((line) => (
              <li
                key={line}
                className="relative pl-12 text-[0.95rem] leading-[1.55] text-text-body [counter-increment:step] before:absolute before:left-0 before:top-2 before:font-bold before:text-accent before:content-[counter(step,decimal-leading-zero)]"
              >
                {line}
              </li>
            ))}
          </ol>
        </div>
      </div>
      {statBand && (
        <div className="mt-10 flex flex-col gap-2 bg-bg-dark px-6 py-4 text-text-light sm:flex-row sm:items-center sm:justify-between">
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
}: {
  number: string;
  title: string;
  lede: string;
  services: { tag: string; name: string }[];
}) {
  return (
    <SlideShell accentBar>
      <Eyebrow>{`Silo ${number}`}</Eyebrow>
      <h1 className="font-heading text-[clamp(3rem,8vw,5.5rem)] font-semibold leading-[1.02] tracking-tight text-text-dark">
        {title}
      </h1>
      <AccentRule />
      <p className="lead-text max-w-[55ch] text-text-body">{lede}</p>
      <div className="mt-12 flex flex-col gap-8 sm:flex-row sm:gap-12">
        {services.map((s) => (
          <div key={s.name} className="relative pt-5">
            <span className="absolute left-0 top-0 block h-[3px] w-8 bg-accent" aria-hidden />
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.28em] text-accent">{s.tag}</p>
            <p className="mt-1.5 font-heading text-2xl font-medium text-text-dark">{s.name}</p>
          </div>
        ))}
      </div>
    </SlideShell>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Individual slides (27)
// ─────────────────────────────────────────────────────────────────────────────

function SlideCover() {
  return (
    <SlideShell accentBar>
      <Eyebrow>Capabilities Overview</Eyebrow>
      <h1 className="font-heading text-[clamp(3rem,8vw,6rem)] font-semibold leading-[1.02] tracking-tight text-text-dark">
        Marketing assets
        <br />
        that move homes.
      </h1>
      <AccentRule />
      <p className="lead-text max-w-[60ch] text-text-body">
        Trusted by homebuilders across 28 markets.
      </p>
    </SlideShell>
  );
}

function SlideDifference() {
  return (
    <SlideShell>
      <Eyebrow>The DIG Difference</Eyebrow>
      <h1 className="font-heading text-[clamp(2.5rem,5.5vw,4.5rem)] font-semibold leading-[1.05] tracking-tight text-text-dark">
        Stop creating content.
        <br />
        Start building assets.
      </h1>
      <p className="lead-text mt-8 max-w-[70ch] text-text-body">
        Most builder marketing teams invest in photography that lives in one place. DIG builds
        assets designed for website conversion, paid media, sales centers, email, and listing
        refreshes.
      </p>
      <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        {["Website", "Paid Media", "Sales Center", "Email", "Listing Refreshes"].map((c) => (
          <ChannelChip key={c}>{c}</ChannelChip>
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
    },
    {
      tag: "02",
      name: "Listings",
      items: ["Listing Photography", "Virtual Video", "Virtual Staging"],
    },
    {
      tag: "03",
      name: "Community Content",
      items: ["Video Production", "Amenity Photography"],
    },
  ];
  return (
    <SlideShell>
      <Eyebrow>Full Range of Services</Eyebrow>
      <h1 className="font-heading text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.05] tracking-tight text-text-dark">
        Everything your marketing team needs.
        <br />
        One platform to order it.
      </h1>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {silos.map((s) => (
          <div
            key={s.tag}
            className="relative border border-border-light bg-white px-6 py-7"
          >
            <span className="absolute inset-x-0 top-0 h-1 bg-accent" aria-hidden />
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.28em] text-accent">{s.tag}</p>
            <h3 className="mt-2 font-heading text-xl font-medium text-text-dark">{s.name}</h3>
            <ul className="mt-5 space-y-1">
              {s.items.map((line) => (
                <li key={line} className="relative pl-5 text-sm text-text-body">
                  <span className="absolute left-0 top-2.5 h-px w-3 bg-accent" aria-hidden />
                  {line}
                </li>
              ))}
            </ul>
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
      placeholder={{
        variant: "image",
        label: "Premium Photography",
        caption: "Sample work appears here",
      }}
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
      placeholder={{
        variant: "video",
        label: "Model Home Video",
        caption: "Sample work appears here",
      }}
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
      placeholder={{
        variant: "3d",
        label: "Matterport Scan",
        caption: "Sample 3D tour appears here",
      }}
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
      placeholder={{
        variant: "image",
        label: "Listing Photography",
        caption: "Sample work appears here",
      }}
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
      placeholder={{
        variant: "video",
        label: "Virtual Video",
        caption: "Sample video appears here",
      }}
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
    <ServiceShow
      eyebrow="Listings / Virtual Staging"
      title={
        <>
          Virtual
          <br />
          Staging.
        </>
      }
      positioning="ModelMatch staging that actually looks like your homes. Brand-matched, not generic furniture."
      chips={["MLS", "Website", "Paid Media", "Email", "Agent Kits", "Brochures"]}
      placeholder={{
        variant: "image",
        label: "Vacant to Staged",
        caption: "Before and after pair appears here",
      }}
    />
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
  const stats = [
    { num: "$600", label: "Flat Price", sub: "All home sizes. Same price every time." },
    { num: "72", label: "Hours", sub: "Shoot to published assets." },
    { num: "$220", label: "Saved", sub: "Vs. ordering services à la carte." },
  ];
  return (
    <SlideShell>
      <Eyebrow>Best Value in Homebuilding</Eyebrow>
      <h1 className="font-heading text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.05] tracking-tight text-text-dark">
        Photography. Virtual staging.
        <br />
        Virtual video. One $600 order.
      </h1>
      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-accent">
            What&apos;s included
          </p>
          <ul className="mt-5 space-y-1">
            {[
              "25 MLS-ready listing images",
              "8 ModelMatch virtually staged images",
              "1 wide virtual listing video",
              "72-hour delivery after photography",
              "Ordered via digDesk",
            ].map((line) => (
              <li key={line} className="relative pl-6 text-[0.95rem] text-text-body">
                <span className="absolute left-0 top-3 h-px w-3.5 bg-accent" aria-hidden />
                {line}
              </li>
            ))}
          </ul>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center gap-3 bg-bg-dark px-4 py-6 text-center"
            >
              <span className="font-heading text-3xl font-semibold tracking-tight text-accent-dark-hover">
                {s.num}
              </span>
              <span className="block h-0.5 w-7 bg-accent" aria-hidden />
              <span className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-text-light">
                {s.label}
              </span>
              <span className="text-xs italic leading-snug text-text-light-muted">{s.sub}</span>
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
      placeholder={{
        variant: "video",
        label: "Community Video",
        caption: "Sample video appears here",
      }}
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
      placeholder={{
        variant: "image",
        label: "Amenity Photography",
        caption: "Sample work appears here",
      }}
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
      <h1 className="font-heading text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.05] tracking-tight text-text-dark">
        One portal for your
        <br />
        entire visual pipeline.
      </h1>
      <p className="lead-text mt-6 max-w-[70ch] text-text-body">
        Order every service, track every job, manage your ModelMatch brand library, and download
        finished assets, all from a single dashboard. Built for lean homebuilder marketing teams.
      </p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {modules.map((m) => (
          <div
            key={m.num}
            className="relative border border-border-light bg-white px-5 py-6"
          >
            <span className="absolute inset-x-0 top-0 h-1 bg-accent" aria-hidden />
            <p className="font-heading text-2xl font-semibold text-accent">{m.num}</p>
            <span className="mt-3 block h-0.5 w-6 bg-accent" aria-hidden />
            <h3 className="mt-4 font-heading text-lg font-medium text-text-dark">{m.title}</h3>
            <p className="mt-2 text-sm text-text-body">{m.body}</p>
          </div>
        ))}
      </div>
    </SlideShell>
  );
}

function SlideMarkets() {
  return (
    <SlideShell>
      <Eyebrow>Our Markets</Eyebrow>
      <h2 className="font-heading text-[clamp(1.8rem,4vw,3rem)] font-medium leading-[1.1] tracking-tight text-text-dark">
        One standard across every market.
      </h2>
      <p className="lead-text mt-2 max-w-[70ch] text-text-body">
        28 markets across four U.S. regions. Offices in Sacramento, Dallas, and Guadalajara.
      </p>
      <div className="mt-6 flex-1 overflow-hidden border border-border-light bg-white">
        <div className="h-full min-h-[360px]">
          <RegionMap />
        </div>
      </div>
    </SlideShell>
  );
}

function SlideRegionalPartnership() {
  return (
    <SlideShell>
      <Eyebrow>For National and Regional Builders</Eyebrow>
      <h1 className="font-heading text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.05] tracking-tight text-text-dark">
        Dedicated capacity.
        <br />
        Volume pricing.
        <br />
        One account team.
      </h1>
      <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-12">
        <p className="text-[1.0625rem] leading-relaxed text-text-body">
          For builders running multiple launches simultaneously, DIG&apos;s Regional Partnerships
          program provides dedicated production capacity, volume pricing, and a single account team
          across all four U.S. regions. Same process, same quality checks, same delivery standard in
          every market.
        </p>
        <div className="bg-bg-dark p-8 text-text-light">
          <h4 className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-accent-dark-hover">
            What partnership unlocks
          </h4>
          <ul className="mt-5 space-y-2">
            {[
              "Reserved production capacity for launch windows",
              "Volume pricing across photography, staging, and video",
              "One account team coordinating every market",
              "Regional dashboards in digDesk for cross-market visibility",
            ].map((line) => (
              <li
                key={line}
                className="relative pl-6 text-[0.95rem] leading-[1.55] text-text-light-muted"
              >
                <span className="absolute left-0 top-3 h-px w-3.5 bg-accent" aria-hidden />
                {line}
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
    <SlideShell dark accentBar>
      <Eyebrow dark>Ready?</Eyebrow>
      <h1 className="font-heading text-[clamp(3rem,7.5vw,5.5rem)] font-semibold leading-[1.02] tracking-tight text-text-light">
        Let&apos;s build assets
        <br />
        that move homes.
      </h1>
      <AccentRule dark />
      <p className="lead-text mt-2 max-w-[60ch] text-text-light-muted">
        If your content isn&apos;t driving momentum, it&apos;s time to rethink the strategy.
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-6">
        <Link
          href="/contact"
          className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-dark-hover"
        >
          Book a Strategy Call
        </Link>
        <Link
          href="/programs/spec-plus"
          className="border-b border-accent pb-1 text-sm font-bold uppercase tracking-[0.22em] text-accent-dark-hover transition-colors hover:text-text-light"
        >
          Explore Spec+
        </Link>
        <Link
          href="/"
          className="border-b border-accent pb-1 text-sm font-bold uppercase tracking-[0.22em] text-accent-dark-hover transition-colors hover:text-text-light"
        >
          daviesimaging.com
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
