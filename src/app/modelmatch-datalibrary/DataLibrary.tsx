"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Eyebrow } from "@/components/Eyebrow";
import { AGGREGATE, CASE_STUDIES, type CaseStudy } from "./caseStudies";

const IMG = (f: string) => `/mm-library/${f}`;

export function DataLibrary() {
  const [market, setMarket] = useState<string>("All");
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const markets = useMemo(() => {
    const set = Array.from(new Set(CASE_STUDIES.map((c) => c.market)));
    return ["All", ...set];
  }, []);

  const filtered = useMemo(
    () => (market === "All" ? CASE_STUDIES : CASE_STUDIES.filter((c) => c.market === market)),
    [market],
  );

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
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pb-10 pt-16 sm:px-10 sm:pt-20">
        <Eyebrow>ModelMatch / Data Library</Eyebrow>
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <h1 className="font-heading text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.05] tracking-tight text-text-dark">
              Stuck for months. <strong>In contract after weeks.</strong>
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-text-body">
              Every ModelMatch listing that has transacted since launch, with its verified MLS
              timeline. {AGGREGATE.line}
            </p>
          </div>
          {/* Aggregate stat */}
          <div className="flex items-center gap-4 sm:gap-6">
            <div>
              <p className="font-heading text-[clamp(2.5rem,6vw,4rem)] font-semibold leading-none text-text-muted">
                {AGGREGATE.unstaged}
              </p>
              <p className="mt-1 text-[0.6rem] font-bold uppercase tracking-[0.15em] text-text-muted">
                Avg days unstaged
              </p>
            </div>
            <span className="font-heading text-2xl text-text-muted sm:text-4xl">&rarr;</span>
            <div>
              <p className="font-heading text-[clamp(2.5rem,6vw,4rem)] font-semibold leading-none text-accent">
                {AGGREGATE.after}
              </p>
              <p className="mt-1 text-[0.6rem] font-bold uppercase tracking-[0.15em] text-accent">
                After ModelMatch
              </p>
            </div>
          </div>
        </div>

        {/* Market filter */}
        <div className="mt-10 flex flex-wrap items-center gap-2">
          {markets.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMarket(m)}
              className={`rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] transition-colors ${
                market === m
                  ? "border-accent bg-accent text-white"
                  : "border-border-light text-text-muted hover:border-accent hover:text-accent"
              }`}
            >
              {m}
            </button>
          ))}
          <span className="ml-1 text-xs text-text-muted">
            {filtered.length} {filtered.length === 1 ? "listing" : "listings"}
          </span>
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-7xl px-6 pb-20 sm:px-10">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => (
            <TileCard key={c.slug} c={c} onOpen={() => openStudy(c.slug)} />
          ))}
        </div>
        <p className="mt-10 max-w-3xl text-xs leading-relaxed text-text-muted">{AGGREGATE.disclaimer}</p>
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
      className="group relative flex aspect-[4/3] w-full flex-col justify-between overflow-hidden rounded-2xl bg-bg-dark p-6 text-left text-text-light"
    >
      {/* Staged photo revealed on hover */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={IMG(c.images[0])}
        alt={`${c.addr} staged by ModelMatch`}
        className="absolute inset-0 h-full w-full scale-105 object-cover opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100"
        loading="lazy"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Top row: market + status */}
      <div className="relative z-[1] flex items-center justify-between">
        <span className="rounded-full bg-white/10 px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.12em] text-white/80 backdrop-blur-sm">
          {c.market}
        </span>
        <span
          className={`rounded-full px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.12em] ${
            c.status === "sold" ? "bg-accent text-white" : "bg-white/10 text-white/80 backdrop-blur-sm"
          }`}
        >
          {c.status}
        </span>
      </div>

      {/* Bottom: the DOM hook + address */}
      <div className="relative z-[1]">
        <div className="flex items-baseline gap-2">
          <span className="font-heading text-3xl font-semibold text-white/55 sm:text-4xl">
            {c.unstaged}
          </span>
          <span className="text-sm font-semibold uppercase tracking-wide text-accent-dark-hover">MM</span>
          <span className="font-heading text-3xl font-semibold text-accent-dark-hover sm:text-4xl">
            {c.after}
          </span>
          <span className="text-xs text-white/60">days</span>
        </div>
        <p className="mt-2 font-heading text-lg font-medium leading-tight text-white">{c.addr}</p>
        <p className="text-sm text-white/65">{c.city}</p>
        <span className="mt-3 inline-block text-[0.7rem] font-bold uppercase tracking-[0.15em] text-white/0 transition-colors duration-300 group-hover:text-accent-dark-hover">
          View case study &rarr;
        </span>
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
      className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="flex min-h-full items-start justify-center p-4 sm:p-8">
        <div
          className="relative w-full max-w-4xl rounded-2xl bg-bg-light shadow-2xl"
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
            <div className="mt-6 flex items-baseline gap-2 sm:gap-3">
              <span className="font-heading text-4xl font-semibold text-text-muted sm:text-5xl">
                {c.unstaged}
              </span>
              <span className="text-text-muted">&rarr;</span>
              <span className="font-heading text-sm font-semibold uppercase tracking-wide text-accent sm:text-base">
                MM
              </span>
              <span className="text-text-muted">&rarr;</span>
              <span className="font-heading text-4xl font-semibold text-accent sm:text-5xl">{c.after}</span>
              <span className="ml-1 text-sm text-text-muted">{c.afterLabel}</span>
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
                &ldquo;{c.quote}&rdquo;
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

          {/* CTA */}
          <div className="border-t border-border-light px-6 py-6 text-center sm:px-10">
            <Link
              href="/contact"
              className="inline-block rounded-full bg-accent px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-dark-hover"
            >
              Get this for your inventory
            </Link>
          </div>
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
