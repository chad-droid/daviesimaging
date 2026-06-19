"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Eyebrow } from "@/components/Eyebrow";
import { CASE_STUDIES, type CaseStudy } from "./caseStudies";

const IMG = (f: string) => `/mm-library/${f}`;
const TRIAL_URL = "https://desk.daviesimaging.com/trial";

/** One consistent trial button used everywhere on the page. */
function TrialButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={TRIAL_URL}
      className={`inline-flex items-center justify-center rounded-full bg-accent px-7 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-accent-hover ${className}`}
    >
      Start your free trial
    </a>
  );
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/** Fires once when the element scrolls into view, with a safety fallback so
 *  content can never stay hidden (fast loads, jump-scrolls, IO no-shows). */
function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let done = false;
    const reveal = () => {
      if (done) return;
      done = true;
      setInView(true);
    };
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          reveal();
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    const t = window.setTimeout(reveal, 1600);
    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, [threshold]);
  return { ref, inView };
}

/** Eased count-up that runs when `active` becomes true. */
function useCountUp(target: number, active: boolean, duration = 1200) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    if (prefersReducedMotion()) {
      setN(target);
      return;
    }
    let raf = 0;
    let startTs = 0;
    const tick = (ts: number) => {
      if (!startTs) startTs = ts;
      const p = Math.min(1, (ts - startTs) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration]);
  return n;
}

function afterText(c: CaseStudy, n: number) {
  return c.afterApprox ? `~${n}` : `${n}`;
}

function statusLabel(c: CaseStudy) {
  return c.closed ? "Sold" : "Under contract";
}

export function DataLibrary() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const open = openSlug ? CASE_STUDIES.find((c) => c.slug === openSlug) ?? null : null;

  const featured = CASE_STUDIES[0];
  const rest = CASE_STUDIES.slice(1);

  useEffect(() => {
    const slug = window.location.hash.slice(1);
    if (slug && CASE_STUDIES.some((c) => c.slug === slug)) setOpenSlug(slug);
  }, []);

  const openStudy = useCallback((slug: string) => {
    setOpenSlug(slug);
    window.history.replaceState(null, "", `#${slug}`);
  }, []);

  const closeStudy = useCallback(() => {
    setOpenSlug(null);
    window.history.replaceState(null, "", window.location.pathname);
  }, []);

  return (
    <div className="flex min-h-[100dvh] flex-col bg-bg-light text-text-body">
      {/* Header */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border-light/70 bg-bg-light/85 px-6 py-3.5 backdrop-blur-md sm:px-10">
        <Link href="/" aria-label="Davies Imaging Group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/dig-logo-dark.png" alt="Davies Imaging Group" className="h-7 w-auto" />
        </Link>
        <TrialButton className="px-6 py-2.5" />
      </header>

      {/* Hero + featured spread */}
      <section className="relative overflow-hidden px-6 pt-14 sm:px-10 sm:pt-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 right-[-10%] h-[520px] w-[520px] rounded-full bg-accent/10 blur-[130px]"
        />
        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[1fr_1.08fr] lg:gap-16">
          <div>
            <Eyebrow>ModelMatch / Win Library</Eyebrow>
            <h1 className="mt-4 font-heading text-[clamp(2.6rem,5.5vw,4.5rem)] font-semibold leading-[1.04] tracking-tight text-text-dark">
              Stuck for months.
              <br />
              <span className="text-accent">In contract after weeks.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-text-body">
              On-brand virtual staging that puts aging inventory back in motion. Real homes, real
              timelines, below.
            </p>
            <div className="mt-9">
              <TrialButton />
            </div>
          </div>

          <FeatureCard c={featured} onOpen={() => openStudy(featured.slug)} />
        </div>
      </section>

      {/* Library grid */}
      <section className="mx-auto w-full max-w-7xl flex-1 px-6 pb-24 pt-16 sm:px-10 sm:pt-24">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-4 border-b border-border-light pb-5">
          <h2 className="font-heading text-3xl font-medium tracking-tight text-text-dark sm:text-4xl">
            Some of our latest wins
          </h2>
          <p className="max-w-xs text-sm leading-relaxed text-text-muted">
            Real homes that found a buyer after ModelMatch staging.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((c, i) => (
            <EditorialCard key={c.slug} c={c} i={i} onOpen={() => openStudy(c.slug)} />
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="relative overflow-hidden bg-bg-dark px-6 py-24 text-center text-text-light sm:px-10">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-[150px]"
        />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="font-heading text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-tight tracking-tight text-text-light">
            Get your aging inventory
            <br />
            <span className="text-accent-dark-hover">back on track.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-white/70">
            Try ModelMatch on your first listing, free.
          </p>
          <TrialButton className="mt-9 px-8 py-3.5 text-base" />
        </div>
      </section>

      {open && <StudyModal c={open} onClose={closeStudy} />}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Featured spread — large always-visible photo with the stat overlaid.
// ─────────────────────────────────────────────────────────────────────────────

function contextLine(c: CaseStudy) {
  return c.story === "rescue" ? `After ${c.unstaged} days on the market` : "Brand-new listing";
}

function FeatureCard({ c, onOpen }: { c: CaseStudy; onOpen: () => void }) {
  const { ref, inView } = useInView<HTMLButtonElement>(0.1);
  const days = useCountUp(c.after, inView, 1400);
  return (
    <button
      ref={ref}
      type="button"
      onClick={onOpen}
      className="group relative block w-full overflow-hidden rounded-2xl text-left shadow-[0_30px_60px_-25px_rgba(0,0,0,0.45)] ring-1 ring-black/5"
    >
      <div className="relative aspect-[4/3] sm:aspect-[3/2]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={IMG(c.images[0])}
          alt={`${c.addr} staged by ModelMatch`}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
          loading="eager"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.72) 30%, rgba(0,0,0,0.3) 58%, transparent 82%)",
          }}
        />

        <div className="absolute inset-x-0 bottom-0 p-6 text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.7)] sm:p-8">
          <p className="text-[0.66rem] font-bold uppercase tracking-[0.16em] text-white/85">
            {statusLabel(c)} &middot; after ModelMatch
          </p>
          <p className="mt-1.5 flex items-baseline gap-2">
            <span className="font-heading text-[3.5rem] font-semibold leading-none text-accent-dark-hover sm:text-[4.75rem]">
              {afterText(c, days)}
            </span>
            <span className="font-heading text-2xl font-medium text-white/80 sm:text-3xl">days</span>
          </p>
          <p className="mt-3 text-sm font-medium text-white/90">{contextLine(c)}</p>
          <p className="mt-4 font-heading text-2xl font-medium leading-tight text-white sm:text-3xl">
            {c.addr}
          </p>
          <p className="mt-0.5 text-sm text-white/80">{c.city}</p>
        </div>
      </div>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Editorial card — light listing card, photo always visible, one clear stat.
// ─────────────────────────────────────────────────────────────────────────────

function EditorialCard({ c, i, onOpen }: { c: CaseStudy; i: number; onOpen: () => void }) {
  const { ref, inView } = useInView<HTMLButtonElement>(0.15);
  const days = useCountUp(c.after, inView, 1300);
  return (
    <button
      ref={ref}
      type="button"
      onClick={onOpen}
      style={{ transitionDelay: `${Math.min(i, 6) * 70}ms` }}
      className={`group flex flex-col overflow-hidden rounded-xl bg-bg-surface text-left ring-1 ring-border-light/70 transition-[opacity,transform,box-shadow] duration-700 ease-out hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-24px_rgba(0,0,0,0.4)] ${
        inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={IMG(c.images[0])}
          alt={`${c.addr} staged by ModelMatch`}
          className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[0.6rem] font-bold uppercase tracking-[0.16em] text-text-muted">
          {statusLabel(c)} &middot; after ModelMatch
        </p>
        <p className="mt-1.5 flex items-baseline gap-1.5">
          <span className="font-heading text-[3rem] font-semibold leading-none text-accent">
            {afterText(c, days)}
          </span>
          <span className="font-heading text-xl font-medium text-text-muted">days</span>
        </p>
        <p className="mt-2 text-sm text-text-muted">{contextLine(c)}</p>
        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <div>
            <p className="font-heading text-lg font-medium leading-tight text-text-dark">{c.addr}</p>
            <p className="mt-0.5 text-sm text-text-muted">{c.city}</p>
          </div>
          <span className="mb-0.5 text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            &rarr;
          </span>
        </div>
      </div>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Detail modal — clock + verification + staged-image gallery.
// ─────────────────────────────────────────────────────────────────────────────

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-3 first:pt-0 last:pb-0">
      <dt className="shrink-0 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-text-muted">
        {label}
      </dt>
      <dd className="text-right text-sm font-medium text-text-dark">{value}</dd>
    </div>
  );
}

function StudyModal({ c, onClose }: { c: CaseStudy; onClose: () => void }) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightbox !== null) setLightbox(null);
        else onClose();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, lightbox]);

  const afterDisp = afterText(c, c.after);

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm sm:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl bg-bg-light shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-bg-dark/80 text-white transition-colors hover:bg-accent"
        >
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
          </svg>
        </button>

        <div className="flex-1 overflow-y-auto">
          {/* Header */}
          <div className="border-b border-border-light px-6 pb-6 pt-7 sm:px-10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-bg-surface px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.12em] text-text-muted ring-1 ring-border-light">
                {c.story === "rescue" ? "Rescue" : "Fresh listing"}
              </span>
              <span
                className={`rounded-full px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.12em] ${
                  c.closed ? "bg-accent text-white" : "bg-accent/10 text-accent"
                }`}
              >
                {statusLabel(c)}
              </span>
              {c.noCut && (
                <span className="rounded-full bg-bg-surface px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.12em] text-text-muted ring-1 ring-border-light">
                  No price cut
                </span>
              )}
            </div>
            <h2 className="mt-3 font-heading text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-tight tracking-tight text-text-dark">
              {c.addr}, {c.city}
            </h2>
            <p className="mt-1 text-sm text-text-muted">{c.builder}</p>

            <div className="mt-6 flex items-baseline gap-2">
              <span className="font-heading text-5xl font-semibold text-accent sm:text-6xl">
                {afterDisp}
              </span>
              <span className="font-heading text-xl font-medium text-text-muted">days</span>
            </div>
            <p className="mt-1 text-sm text-text-muted">
              {statusLabel(c).toLowerCase()} after ModelMatch
              {c.story === "rescue" ? `, after ${c.unstaged} days on the market` : ""}
            </p>
            <p className="mt-5 max-w-2xl font-heading text-xl font-medium italic leading-snug text-text-dark">
              {c.subhead}
            </p>
          </div>

          {/* Body */}
          <div className="grid gap-8 px-6 py-7 sm:px-10 lg:grid-cols-[1.5fr_1fr] lg:gap-12">
            <div>
              <h3 className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-accent">
                The clock
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-body">{c.clock}</p>
              <ul className="mt-6 space-y-4">
                {c.events.map((e, i) => (
                  <li key={i} className="flex gap-3">
                    <span
                      className={`mt-1.5 h-2.5 w-2.5 flex-shrink-0 rounded-full ${
                        e.cls === "mm"
                          ? "bg-accent ring-4 ring-accent/15"
                          : e.cls === "end"
                            ? "bg-text-dark"
                            : "bg-border-light"
                      }`}
                    />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                        {e.d}
                      </p>
                      <p className="text-sm leading-snug text-text-body">{e.t}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="h-fit rounded-xl bg-bg-surface p-6 ring-1 ring-border-light">
              <dl className="divide-y divide-border-light/70 text-sm">
                <Fact label="Result" value={c.result} />
                <Fact label="Durability" value={c.durability} />
                <Fact label="Builder" value={c.builder} />
                {c.price && <Fact label="Price" value={c.price} />}
              </dl>
            </div>
          </div>

          {/* Staged gallery */}
          <div className="border-t border-border-light px-6 py-7 sm:px-10">
            <h3 className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-accent">
              Staged by ModelMatch
            </h3>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {c.images.map((img, i) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setLightbox(i)}
                  className="group relative aspect-[4/3] overflow-hidden rounded-lg ring-1 ring-border-light"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={IMG(img)}
                    alt={`${c.addr} staged room ${i + 1}`}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center justify-between gap-4 border-t border-border-light bg-bg-light px-6 py-4 sm:px-10">
          <p className="hidden text-sm text-text-muted sm:block">
            See it on your own listing, free.
          </p>
          <TrialButton className="w-full text-center sm:w-auto" />
        </div>
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightbox(null)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={IMG(c.images[lightbox])}
            alt={`${c.addr} staged, enlarged`}
            className="max-h-[90vh] max-w-[92vw] rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            onClick={() => setLightbox(null)}
            aria-label="Close image"
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25"
          >
            <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      )}
    </div>,
    document.body,
  );
}
