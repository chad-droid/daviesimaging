"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { DarkSectionBg } from "@/components/DarkSectionBg";
import {
  ACTFLOW_FILMS,
  CINEFLOW_FILMS,
  DIGDESK_SHOT,
  LINEUP,
  LISTING_STILLS,
  PLANMATCH_BUILDERS,
  SPEC_HOMES,
  type Film,
  type Still,
} from "./showcaseContent";

/**
 * /for/[id] — client product showcase. Full-screen deck in the same shell as
 * /modelmatch-deck (arrow keys, swipe, #n deep links), personalized per client
 * with their name, logo, and the people it was prepared for.
 *
 * Brand rules applied: ink + paper + one violet; builder logos keep their own
 * colors and sit on a white tile (or an ink tile when the admin picks a
 * reversed logo); staged images are labeled as virtual staging.
 */

export type ShowcaseClient = {
  builderName: string;
  logoUrl: string | null;
  logoBg: "light" | "dark";
  attendees: { name: string; title?: string }[];
  meetingDate: string | null;
  openingLine: string | null;
  preparedBy: string | null;
};

type Lightbox = { stills: Still[]; index: number } | null;

type SlideCtx = {
  client: ShowcaseClient;
  active: boolean;
  go: (n: number) => void;
  openLightbox: (stills: Still[], index: number) => void;
};

type SlideDef = { dark: boolean; render: (ctx: SlideCtx) => React.ReactNode };

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function ShowcaseDeck({ client }: { client: ShowcaseClient }) {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState<Lightbox>(null);
  const [showHint, setShowHint] = useState(false);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const total = SLIDES.length;

  const show = useCallback(
    (n: number) => {
      const clamped = Math.max(0, Math.min(total - 1, n));
      setCurrent(clamped);
      const hash = `#${clamped + 1}`;
      if (window.location.hash !== hash) window.history.replaceState(null, "", hash);
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
      if (lightbox) {
        if (e.key === "Escape") setLightbox(null);
        else if (e.key === "ArrowRight")
          setLightbox((lb) => lb && { ...lb, index: (lb.index + 1) % lb.stills.length });
        else if (e.key === "ArrowLeft")
          setLightbox((lb) => lb && { ...lb, index: (lb.index - 1 + lb.stills.length) % lb.stills.length });
        return;
      }
      if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        show(current + 1);
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        show(current - 1);
      } else if (e.key === "Home") show(0);
      else if (e.key === "End") show(total - 1);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [current, show, total, lightbox]);

  useEffect(() => {
    let x: number | null = null;
    function onStart(e: TouchEvent) {
      x = e.changedTouches[0].clientX;
    }
    function onEnd(e: TouchEvent) {
      if (x === null) return;
      const dx = e.changedTouches[0].clientX - x;
      x = null;
      if (Math.abs(dx) < 60) return;
      if (lightbox) {
        setLightbox((lb) =>
          lb && { ...lb, index: (lb.index + (dx < 0 ? 1 : -1) + lb.stills.length) % lb.stills.length },
        );
      } else show(current + (dx < 0 ? 1 : -1));
    }
    document.addEventListener("touchstart", onStart);
    document.addEventListener("touchend", onEnd);
    return () => {
      document.removeEventListener("touchstart", onStart);
      document.removeEventListener("touchend", onEnd);
    };
  }, [current, show, lightbox]);

  useEffect(() => {
    const n = parseInt(window.location.hash.slice(1), 10);
    if (!isNaN(n)) show(n - 1);
    const t1 = window.setTimeout(() => setShowHint(true), 900);
    const t2 = window.setTimeout(() => setShowHint(false), 5200);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDark = SLIDES[current].dark;
  const openLightbox = useCallback((stills: Still[], index: number) => setLightbox({ stills, index }), []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-bg-dark text-text-body">
      <header className="pointer-events-none fixed inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-5 sm:px-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={onDark ? "/dig-logo-light.png" : "/dig-logo-dark.png"}
          alt="DIG"
          className="h-6 w-auto transition-opacity"
        />
        <span
          className={`text-[0.65rem] font-medium uppercase tracking-[0.25em] tabular-nums transition-colors ${
            onDark ? "text-white/60" : "text-text-muted"
          }`}
        >
          {pad(current + 1)} / {pad(total)}
        </span>
      </header>
      <div
        className={`pointer-events-none fixed inset-x-6 top-[3.6rem] z-[19] h-px transition-colors sm:inset-x-10 ${
          onDark ? "bg-white/15" : "bg-border-light"
        }`}
      />

      <main className="relative h-full w-full">
        {SLIDES.map((s, i) => (
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
            {s.render({ client, active: i === current, go: show, openLightbox })}
          </div>
        ))}
      </main>

      <footer
        className={`fixed inset-x-0 bottom-0 z-20 flex items-center gap-4 px-6 py-4 sm:px-10 ${
          onDark ? "text-white" : "text-text-body"
        }`}
      >
        <NavButton dark={onDark} disabled={current === 0} onClick={() => show(current - 1)} label="Previous slide">
          &larr; Prev
        </NavButton>
        <div className={`relative h-px flex-1 overflow-hidden ${onDark ? "bg-white/20" : "bg-border-light"}`}>
          <div
            className="absolute inset-y-0 left-0 bg-accent transition-[width] duration-500 ease-out"
            style={{ width: `${((current + 1) / total) * 100}%` }}
          />
        </div>
        <NavButton dark={onDark} disabled={current === total - 1} onClick={() => show(current + 1)} label="Next slide">
          Next &rarr;
        </NavButton>
      </footer>

      <div
        className={`pointer-events-none fixed bottom-20 left-1/2 z-30 hidden -translate-x-1/2 rounded bg-bg-dark/85 px-3 py-2 text-[0.7rem] font-medium uppercase tracking-[0.15em] text-text-light transition-opacity duration-500 sm:block ${
          showHint ? "opacity-100" : "opacity-0"
        }`}
      >
        Use <kbd className="mx-0.5 rounded bg-accent px-1.5 py-0.5 text-[0.65rem] text-white">&larr;</kbd>{" "}
        <kbd className="mx-0.5 rounded bg-accent px-1.5 py-0.5 text-[0.65rem] text-white">&rarr;</kbd> to navigate
      </div>

      {lightbox && <LightboxView lb={lightbox} setLb={setLightbox} />}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Building blocks
// ─────────────────────────────────────────────────────────────────────────────

function NavButton({
  dark,
  disabled,
  onClick,
  label,
  children,
}: {
  dark: boolean;
  disabled: boolean;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={`rounded-full border px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.18em] transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${
        dark
          ? "border-white/30 text-white/90 enabled:hover:border-accent-dark-hover enabled:hover:text-accent-dark-hover"
          : "border-border-light text-text-body enabled:hover:border-accent enabled:hover:text-accent"
      }`}
    >
      {children}
    </button>
  );
}

function Shell({ dark, children, wide }: { dark?: boolean; children: React.ReactNode; wide?: boolean }) {
  return (
    <div
      className={`relative min-h-full px-6 pb-24 pt-24 sm:px-12 sm:pt-24 ${
        dark ? "bg-bg-dark text-text-light" : "bg-bg-light text-text-body"
      }`}
    >
      {dark && <DarkSectionBg glowIntensity={12} />}
      <div
        className={`relative z-[1] mx-auto flex min-h-[calc(100vh-12rem)] flex-col justify-center ${
          wide ? "max-w-7xl" : "max-w-6xl"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function Kicker({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p
      className={`mb-3 text-xs font-bold uppercase tracking-[0.15em] ${
        dark ? "text-accent-dark-hover" : "text-accent"
      }`}
    >
      {children}
    </p>
  );
}

function ProductHead({
  n,
  name,
  sub,
  dark,
  children,
}: {
  n: string;
  name: string;
  sub: string;
  dark?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em]">
        <span className={dark ? "text-white/35" : "text-text-muted"}>{n} of 05</span>
        <span className={dark ? "text-white/20" : "text-border-light"}> / </span>
        <span className={dark ? "text-accent-dark-hover" : "text-accent"}>{name}</span>
      </p>
      <h2
        className={`font-heading text-[clamp(2.4rem,5vw,4.25rem)] font-medium leading-[1.02] tracking-tight ${
          dark ? "text-text-light" : "text-text-dark"
        }`}
      >
        {name}
      </h2>
      <p
        className={`mt-4 text-[1.05rem] font-semibold leading-snug sm:text-lg ${
          dark ? "text-text-light" : "text-text-dark"
        }`}
      >
        {sub}
      </p>
      {children && (
        <div className={`mt-3 max-w-[46ch] text-[0.95rem] leading-relaxed ${dark ? "text-white/65" : "text-text-muted"}`}>
          {children}
        </div>
      )}
    </div>
  );
}

function BuilderLogo({ client, size = "md" }: { client: ShowcaseClient; size?: "md" | "lg" }) {
  if (!client.logoUrl) return null;
  // A reversed (white) logo sits directly on the ink slides with no tile or
  // border. A standard logo keeps its own colors on a white tile.
  const tile = client.logoBg === "dark" ? "" : "rounded-xl bg-white px-6 py-4 shadow-sm";
  const h = size === "lg" ? "h-14 sm:h-16" : "h-10 sm:h-12";
  return (
    <div className={`inline-flex items-center justify-center ${tile}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={client.logoUrl} alt={`${client.builderName} logo`} className={`${h} w-auto max-w-[220px] object-contain`} />
    </div>
  );
}

function formatDate(s: string | null): string | null {
  if (!s) return null;
  const d = /^\d{4}-\d{2}-\d{2}$/.test(s) ? new Date(`${s}T12:00:00`) : new Date(s);
  if (isNaN(d.getTime())) return s;
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

/** Autoplays muted while its slide is showing; pauses when it isn't. */
function FilmPlayer({ film, active, className = "" }: { film: Film; active: boolean; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const sync = () => setMuted(v.muted);
    v.addEventListener("volumechange", sync);
    if (active) {
      v.play().catch(() => {});
    } else {
      v.pause();
      v.muted = true;
    }
    return () => v.removeEventListener("volumechange", sync);
  }, [active, film.video]);

  return (
    <div className={`group relative overflow-hidden rounded-2xl bg-black shadow-2xl ring-1 ring-white/10 ${className}`}>
      <video
        ref={ref}
        key={film.video}
        src={film.video}
        poster={film.poster}
        muted
        loop
        playsInline
        preload={active ? "auto" : "none"}
        className="aspect-video h-full w-full object-cover"
      />
      <button
        type="button"
        onClick={() => {
          const v = ref.current;
          if (!v) return;
          v.muted = !v.muted;
          if (v.paused) v.play().catch(() => {});
        }}
        className="absolute bottom-3 right-3 rounded-full bg-black/55 px-3 py-1.5 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-white/90 backdrop-blur transition-colors hover:bg-accent"
        aria-label={muted ? "Turn sound on" : "Turn sound off"}
      >
        {muted ? "Sound on" : "Sound off"}
      </button>
    </div>
  );
}

function Tabs({
  items,
  value,
  onChange,
  dark,
}: {
  items: string[];
  value: number;
  onChange: (i: number) => void;
  dark?: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((label, i) => (
        <button
          key={label}
          type="button"
          onClick={() => onChange(i)}
          className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${
            i === value
              ? "border-accent bg-accent text-white"
              : dark
                ? "border-white/20 text-white/70 hover:border-white/50 hover:text-white"
                : "border-border-light text-text-muted hover:border-accent hover:text-accent"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

function StillGrid({
  stills,
  onOpen,
  cols = 3,
  label,
}: {
  stills: Still[];
  onOpen: (i: number) => void;
  cols?: 3 | 4;
  label?: string;
}) {
  return (
    <div className={`grid grid-cols-2 gap-2 sm:gap-3 ${cols === 4 ? "md:grid-cols-4" : "md:grid-cols-3"}`}>
      {stills.map((s, i) => (
        <button
          key={s.src}
          type="button"
          onClick={() => onOpen(i)}
          className="group relative overflow-hidden rounded-xl bg-black/5"
          aria-label={`Enlarge: ${s.alt}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={s.thumb}
            alt={s.alt}
            loading="lazy"
            className="aspect-[3/2] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          {label && (
            <span className="absolute left-2 top-2 rounded-full bg-black/55 px-2 py-0.5 text-[0.55rem] font-bold uppercase tracking-[0.15em] text-white/90 backdrop-blur">
              {label}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

function LightboxView({ lb, setLb }: { lb: NonNullable<Lightbox>; setLb: (l: Lightbox) => void }) {
  const s = lb.stills[lb.index];
  const step = (d: number) => setLb({ ...lb, index: (lb.index + d + lb.stills.length) % lb.stills.length });
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 p-4 sm:p-10"
      onClick={() => setLb(null)}
      role="dialog"
      aria-label="Image viewer"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={s.src}
        alt={s.alt}
        className="max-h-full max-w-full rounded-lg object-contain shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          step(-1);
        }}
        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-4 py-3 text-white hover:bg-accent sm:left-6"
        aria-label="Previous image"
      >
        &larr;
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          step(1);
        }}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-4 py-3 text-white hover:bg-accent sm:right-6"
        aria-label="Next image"
      >
        &rarr;
      </button>
      <button
        type="button"
        onClick={() => setLb(null)}
        className="absolute right-4 top-4 rounded-full bg-white/10 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white hover:bg-accent"
      >
        Close
      </button>
      <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs text-white/60">
        {s.alt} &middot; {lb.index + 1} / {lb.stills.length}
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Slides
// ─────────────────────────────────────────────────────────────────────────────

function CoverSlide({ client }: SlideCtx) {
  const date = formatDate(client.meetingDate);
  const names = client.attendees.map((a) => a.name);
  return (
    <div className="relative min-h-full overflow-hidden bg-bg-dark px-6 pb-28 pt-24 text-text-light sm:px-12">
      <DarkSectionBg glowIntensity={16} />
      <div className="relative z-[1] mx-auto flex min-h-[calc(100vh-13rem)] max-w-6xl flex-col justify-center">
        <div className="mb-10">
          <BuilderLogo client={client} size="lg" />
        </div>
        <p className="mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.15em] text-accent-dark-hover">
          <span className="h-px w-10 bg-accent-dark-hover" />
          Davies Imaging Group &middot; {client.builderName}
        </p>
        <h1 className="max-w-[16ch] font-heading text-[clamp(2.8rem,7vw,5.75rem)] font-medium leading-[1.02] tracking-[-0.01em] text-text-light">
          Marketing assets that <strong className="font-semibold">move homes.</strong>
        </h1>
        <p className="lead-text mt-6 max-w-[48ch] text-white/75">
          {client.openingLine || `A look at what else DIG can take on for ${client.builderName}.`}
        </p>
        {(names.length > 0 || date || client.preparedBy) && (
          <div className="mt-14 grid max-w-3xl gap-6 border-t border-white/10 pt-6 text-sm sm:grid-cols-[1fr_auto]">
            {names.length > 0 && (
              <div>
                <p className="mb-2 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white/40">Prepared for</p>
                <ul className="flex flex-wrap gap-x-6 gap-y-1.5">
                  {client.attendees.map((a) => (
                    <li key={a.name} className="text-white/85">
                      {a.name}
                      {a.title && <span className="text-white/45"> &middot; {a.title}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {(date || client.preparedBy) && (
              <div className="sm:text-right">
                <p className="mb-2 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white/40">
                  {date ? "Date" : "From"}
                </p>
                <p className="text-white/85">{[date, client.preparedBy].filter(Boolean).join(" · ")}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function LineupSlide({ go }: SlideCtx) {
  return (
    <Shell wide>
      <Kicker>The lineup</Kicker>
      <h2 className="max-w-[20ch] font-heading text-[clamp(2.2rem,4.5vw,3.75rem)] font-medium leading-[1.05] tracking-tight text-text-dark">
        One shoot. <strong className="font-semibold">Multiple outcomes.</strong>
      </h2>
      <p className="mt-4 max-w-[60ch] text-text-muted">
        Five services, each one built from the work DIG already does for you. Every one of them orders in digDesk.
      </p>
      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {LINEUP.map((p, i) => (
          <button
            key={p.name}
            type="button"
            onClick={() => go(i + 2)}
            className="group flex flex-col rounded-2xl border border-border-light bg-white p-5 text-left transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-lg"
          >
            <span className="font-heading text-2xl italic text-accent">{p.n}</span>
            <span className="mt-3 font-heading text-[1.9rem] font-medium leading-none text-text-dark">{p.name}</span>
            <span className="mt-2 text-[0.6rem] font-bold uppercase tracking-[0.16em] text-text-muted">{p.kind}</span>
            <span className="mt-3 flex-1 text-sm leading-relaxed text-text-body">{p.line}</span>
            <span className="mt-4 text-xs font-bold text-accent opacity-0 transition-opacity group-hover:opacity-100">
              See it &rarr;
            </span>
          </button>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 border-t border-border-light pt-5 text-sm text-text-muted">
        <span>
          <strong className="mr-2 text-text-dark">Flow</strong>video made from still images
        </span>
        <span>
          <strong className="mr-2 text-text-dark">Match</strong>3D tools that make spaces look their best
        </span>
        <span>
          <strong className="mr-2 text-text-dark">+</strong>production and digital together
        </span>
      </div>
    </Shell>
  );
}

function CineFlowSlide({ active }: SlideCtx) {
  const [i, setI] = useState(0);
  return (
    <Shell dark wide>
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,8fr)]">
        <div>
          <ProductHead n="01" name="CineFlow" sub="An add-on to the model photography DIG already does for you" dark>
            A cinematic film of your model home, built from the same shoot. No film crew and no second visit. Ready
            for your website, social, and the sales center screen.
          </ProductHead>
          <div className="mt-8">
            <Tabs items={CINEFLOW_FILMS.map((f) => f.label)} value={i} onChange={setI} dark />
          </div>
        </div>
        <FilmPlayer film={CINEFLOW_FILMS[i]} active={active} />
      </div>
    </Shell>
  );
}

function ActFlowSlide({ active }: SlideCtx) {
  const [i, setI] = useState(0);
  return (
    <Shell dark wide>
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,8fr)]">
        <div>
          <ProductHead n="02" name="ActFlow" sub="The upgrade to CineFlow" dark>
            ActFlow brings people into the scenes, so buyers see your home being lived in, not just looked at. Same
            photos, same film, more life.
          </ProductHead>
          <div className="mt-8">
            <Tabs items={ACTFLOW_FILMS.map((f) => f.label)} value={i} onChange={setI} dark />
          </div>
        </div>
        <FilmPlayer film={ACTFLOW_FILMS[i]} active={active} />
      </div>
    </Shell>
  );
}

function ListingSlide({ openLightbox }: SlideCtx) {
  return (
    <Shell wide>
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
        <ProductHead n="03" name="Listing" sub="Spec and community photography">
          A DIG photographer shoots your spec homes and communities. DIG edits and delivers MLS-ready photos through
          digDesk.
        </ProductHead>
        <StillGrid stills={LISTING_STILLS} onOpen={(i) => openLightbox(LISTING_STILLS, i)} />
      </div>
    </Shell>
  );
}

function SpecPlusSlide({ active, openLightbox }: SlideCtx) {
  const [h, setH] = useState(0);
  const home = SPEC_HOMES[h];
  return (
    <Shell dark wide>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:items-start">
        <div className="lg:pt-6">
          <ProductHead n="04" name="Spec+" sub="Listing, plus ModelMatch, plus FrameFlow" dark />
          <ul className="mt-5 space-y-3 text-[0.95rem] leading-relaxed text-white/70">
            <li>
              <strong className="text-text-light">Listing:</strong> photos of the spec home
            </li>
            <li>
              <strong className="text-text-light">ModelMatch:</strong> the vacant rooms virtually staged from your
              own model home photos
            </li>
            <li>
              <strong className="text-text-light">FrameFlow:</strong> a video made from the photos
            </li>
          </ul>
          <div className="mt-8">
            <Tabs items={SPEC_HOMES.map((x) => x.label)} value={h} onChange={setH} dark />
          </div>
        </div>
        <div className="space-y-3">
          <FilmPlayer film={home.film} active={active} />
          <StillGrid
            stills={home.stills}
            onOpen={(i) => openLightbox(home.stills, i)}
            label="Virtually staged"
          />
        </div>
      </div>
    </Shell>
  );
}

function PlanMatchSlide({ openLightbox }: SlideCtx) {
  const [b, setB] = useState(0);
  const [p, setP] = useState(0);
  const builder = PLANMATCH_BUILDERS[b];
  const plan = builder.plans[Math.min(p, builder.plans.length - 1)];
  return (
    <Shell wide>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:items-center">
        <div>
          <ProductHead n="05" name="PlanMatch" sub="Images for the plans that have no model">
            DIG builds the plan in 3D from your floor plan and delivers finished exterior and interior images, so you
            can market a plan before a model exists.
          </ProductHead>
          <div className="mt-8">
            <Tabs
              items={PLANMATCH_BUILDERS.map((x) => x.label)}
              value={b}
              onChange={(n) => {
                setB(n);
                setP(0);
              }}
            />
          </div>
          {builder.note && <p className="mt-4 max-w-[42ch] text-sm text-text-muted">{builder.note}</p>}
        </div>
        <div className="space-y-4">
          {builder.plans.length > 1 && (
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold">
              {builder.plans.map((x, i) => (
                <button
                  key={x.label}
                  type="button"
                  onClick={() => setP(i)}
                  className={`border-b-2 pb-1 transition-colors ${
                    i === p ? "border-accent text-text-dark" : "border-transparent text-text-muted hover:text-accent"
                  }`}
                >
                  {x.label}
                </button>
              ))}
            </div>
          )}
          <StillGrid stills={plan.stills} cols={4} onOpen={(i) => openLightbox(plan.stills, i)} />
        </div>
      </div>
    </Shell>
  );
}

function CloseSlide({ client }: SlideCtx) {
  const first = client.attendees.map((a) => a.name.split(/\s+/)[0]).filter(Boolean);
  const who =
    first.length === 0
      ? `Your team`
      : first.length === 1
        ? first[0]
        : `${first.slice(0, -1).join(", ")} and ${first[first.length - 1]}`;
  return (
    <div className="relative min-h-full overflow-hidden bg-bg-dark px-6 pb-28 pt-24 text-text-light sm:px-12">
      <DarkSectionBg glowIntensity={16} />
      <div className="relative z-[1] mx-auto grid min-h-[calc(100vh-13rem)] max-w-6xl items-center gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]">
        <div>
          <Kicker dark>digDesk</Kicker>
          <h2 className="font-heading text-[clamp(2.6rem,6vw,5rem)] font-medium leading-[1.02] tracking-tight text-text-light">
            It all orders in <strong className="font-semibold">one place.</strong>
          </h2>
          <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-white/70">
            {who} can order every service here in digDesk, track each job, and download the finished assets.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="/get-started"
              className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-dark-hover"
            >
              Next step: start a trial
            </a>
            <a href="/contact" className="text-sm font-medium text-white/60 transition-colors hover:text-white">
              Talk to DIG &rarr;
            </a>
          </div>
          {client.logoUrl && (
            <div className="mt-14 flex items-center gap-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/dig-logo-light.png" alt="DIG" className="h-8 w-auto opacity-90" />
              <span className="text-white/30">&times;</span>
              <BuilderLogo client={client} />
            </div>
          )}
        </div>
        <div className="overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={DIGDESK_SHOT} alt="The digDesk dashboard" className="w-full" />
        </div>
      </div>
    </div>
  );
}

const SLIDES: SlideDef[] = [
  { dark: true, render: (c) => <CoverSlide {...c} /> },
  { dark: false, render: (c) => <LineupSlide {...c} /> },
  { dark: true, render: (c) => <CineFlowSlide {...c} /> },
  { dark: true, render: (c) => <ActFlowSlide {...c} /> },
  { dark: false, render: (c) => <ListingSlide {...c} /> },
  { dark: true, render: (c) => <SpecPlusSlide {...c} /> },
  { dark: false, render: (c) => <PlanMatchSlide {...c} /> },
  { dark: true, render: (c) => <CloseSlide {...c} /> },
];
