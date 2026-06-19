"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Eyebrow } from "@/components/Eyebrow";
import { AGGREGATE, CASE_STUDIES, type CaseStudy } from "./caseStudies";

const IMG = (f: string) => `/mm-library/${f}`;
const TRIAL_URL = "https://desk.daviesimaging.com/trial";

/** One consistent trial button used everywhere on the page. */
function TrialButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={TRIAL_URL}
      className={`inline-block rounded-full bg-accent px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-dark-hover ${className}`}
    >
      Start your free trial
    </a>
  );
}

export function DataLibrary() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const open = openSlug ? CASE_STUDIES.find((c) => c.slug === openSlug) ?? null : null;

  // Deep-link: open a study from the URL hash on mount; keep hash in sync.
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
    <div className="bg-bg-light">
      {/* Minimal landing header — logo + single conversion action */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border-light bg-bg-light/90 px-6 py-3.5 backdrop-blur sm:px-10">
        <Link href="/" aria-label="Davies Imaging Group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/dig-logo-dark.png" alt="Davies Imaging Group" className="h-7 w-auto" />
        </Link>
        <TrialButton />
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pb-10 pt-12 sm:px-10 sm:pt-16">
        <Eyebrow>ModelMatch / Data Library</Eyebrow>
        <h1 className="font-heading text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.08] tracking-tight text-text-dark">
          Stuck for months.
          <br />
          <strong>In contract after weeks.</strong>
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-text-body">
          Explore the power of on-brand virtual staging, and how it is moving the needle for aging
          inventory for builders everywhere.
        </p>
        <TrialButton className="mt-7" />
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-7xl px-6 pb-20 sm:px-10">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CASE_STUDIES.map((c) => (
            <TileCard key={c.slug} c={c} onOpen={() => openStudy(c.slug)} />
          ))}
        </div>
        <p className="mt-10 text-xs leading-relaxed text-text-muted">{AGGREGATE.disclaimer}</p>
      </section>

      {/* Closing CTA (page has no footer) */}
      <section className="bg-bg-dark px-6 py-20 text-center text-text-light sm:px-10">
        <h2 className="mx-auto max-w-2xl font-heading text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-tight tracking-tight text-text-light">
          Put your stuck inventory <strong>back in motion.</strong>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-white/70">
          Try ModelMatch on your own listing, free. See the staged result before you commit.
        </p>
        <TrialButton className="mt-8" />
      </section>

      {open && <StudyModal c={open} onClose={closeStudy} />}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Tile — data-forward card; hover reveals a staged photo.
// ─────────────────────────────────────────────────────────────────────────────

function TileCard({ c, onOpen }: { c: CaseStudy; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative flex aspect-[4/3] w-full flex-col justify-end overflow-hidden rounded-2xl bg-bg-dark p-6 text-left text-text-light"
    >
      {/* Staged photo. On touch (no hover) it's shown by default; on desktop
          it stays hidden and reveals on hover. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={IMG(c.images[0])}
        alt={`${c.addr} staged by ModelMatch`}
        className="absolute inset-0 h-full w-full object-cover opacity-100 transition-all duration-500 ease-out sm:scale-105 sm:opacity-0 sm:group-hover:scale-100 sm:group-hover:opacity-100"
        loading="lazy"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10 opacity-100 transition-opacity duration-500 sm:via-black/25 sm:to-transparent sm:opacity-0 sm:group-hover:opacity-100" />

      {/* The contrast: long stuck (big) → fast after staging (small) */}
      <div className="relative z-[1]">
        <div className="flex items-baseline gap-2.5">
          <span className="origin-bottom-left font-heading text-[3.5rem] font-semibold leading-none text-white/55 transition-transform duration-500 ease-out group-hover:scale-[0.72] sm:text-[4.25rem]">
            {c.unstaged}
          </span>
          <span className="font-heading text-2xl font-medium text-white/30">&rarr;</span>
          <span className="origin-bottom-left font-heading text-[2.75rem] font-semibold leading-none text-accent-dark-hover transition-transform duration-500 ease-out group-hover:scale-[1.28] sm:text-[3.5rem]">
            {c.after}
          </span>
        </div>
        <p className="mt-3 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white/45">
          Days on market &middot; after ModelMatch
        </p>
        <p className="mt-3 text-sm text-white/80">
          {c.addr}, {c.city}
        </p>
      </div>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Detail modal — full timeline + staged-image gallery.
// ─────────────────────────────────────────────────────────────────────────────

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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm sm:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-bg-light shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
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

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          {/* Header */}
          <div className="border-b border-border-light px-6 pb-6 pt-7 sm:px-10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-bg-surface px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.12em] text-text-muted">
                {c.market}
              </span>
              <span
                className={`rounded-full px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.12em] ${
                  c.status === "sold" ? "bg-accent text-white" : "bg-accent/10 text-accent"
                }`}
              >
                {c.statusNote}
              </span>
            </div>
            <h2 className="mt-3 font-heading text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-tight tracking-tight text-text-dark">
              {c.addr}, {c.city}
            </h2>
            <p className="mt-1 text-sm text-text-muted">
              {c.builder} &middot; {c.product}
            </p>

            {/* Big stat */}
            <div className="mt-6 flex flex-wrap items-baseline gap-x-2 gap-y-1 sm:gap-x-3">
              <span className="font-heading text-4xl font-semibold text-text-muted sm:text-5xl">
                {c.unstaged}
              </span>
              <span className="text-text-muted">&rarr;</span>
              <span className="font-heading text-sm font-semibold uppercase tracking-wide text-accent sm:text-base">
                MM
              </span>
              <span className="text-text-muted">&rarr;</span>
              <span className="font-heading text-4xl font-semibold text-accent sm:text-5xl">{c.after}</span>
              <span className="w-full text-sm text-text-muted sm:ml-1 sm:w-auto">{c.afterLabel}</span>
            </div>
            <p className="mt-2 text-sm text-text-muted">
              {c.listed} &middot; {c.pricePath}
            </p>
          </div>

          {/* Body */}
          <div className="grid gap-8 px-6 py-7 sm:px-10 lg:grid-cols-2">
            {/* Timeline */}
            <div>
              <h3 className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-accent">Timeline</h3>
              <ul className="mt-4 space-y-4">
                {c.events.map((e, i) => (
                  <li key={i} className="flex gap-3">
                    <span
                      className={`mt-1.5 h-2.5 w-2.5 flex-shrink-0 rounded-full ${
                        e.cls === "mm"
                          ? "bg-accent ring-4 ring-accent/15"
                          : e.cls === "end"
                            ? "bg-text-dark"
                            : e.cls === "fail"
                              ? "bg-border-light"
                              : "bg-border-light"
                      }`}
                    />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">{e.d}</p>
                      <p
                        className="text-sm leading-snug text-text-body [&_span]:font-semibold [&_span]:text-text-dark"
                        dangerouslySetInnerHTML={{ __html: e.t }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Criteria + cohort + quote */}
            <div className="space-y-5">
              <blockquote className="border-l-2 border-accent pl-4 font-heading text-xl font-medium italic leading-snug text-text-dark">
                {c.quote}
              </blockquote>
              <div>
                <h3 className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-text-muted">
                  Criteria applied
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-body">{c.criteria}</p>
              </div>
              <div>
                <h3 className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-text-muted">
                  Cohort context
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-body">{c.cohort}</p>
              </div>
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
                  className="group relative aspect-[4/3] overflow-hidden rounded-xl"
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
          {/* end scrollable content */}
        </div>

        {/* Persistent CTA footer — always visible while the study is open */}
        <div className="flex shrink-0 items-center justify-between gap-4 border-t border-border-light bg-bg-light px-6 py-4 sm:px-10">
          <p className="hidden text-sm text-text-muted sm:block">
            See it on your own listing, free.
          </p>
          <TrialButton className="w-full text-center sm:w-auto" />
        </div>
      </div>

      {/* Lightbox */}
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
    </div>
  );
}
