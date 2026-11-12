"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface ShowcaseChapterNavProps {
  chapters: { id: string; label: string }[];
  ctaHref: string;
  ctaLabel: string;
}

/**
 * Chapter bar for /services/showcase. Sticks under the site nav, marks the
 * chapter on screen, and keeps the one ask within reach for the whole page.
 */
export function ShowcaseChapterNav({ chapters, ctaHref, ctaLabel }: ShowcaseChapterNavProps) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = chapters
      .map((c) => document.getElementById(c.id))
      .filter((el): el is HTMLElement => el !== null);
    // A chapter is "on screen" while it crosses a band just below the two bars.
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
          // Scrolled past the last chapter (or above the first): mark none.
          else setActive((cur) => (cur === e.target.id ? null : cur));
        });
      },
      { rootMargin: "-25% 0px -65% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [chapters]);

  return (
    <nav
      aria-label="Showcase chapters"
      className="sticky top-16 z-30 border-y border-white/10 bg-bg-dark/85 backdrop-blur"
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-6">
        <ul className="flex items-center gap-6 overflow-x-auto sm:gap-8">
          {chapters.map((c, i) => (
            <li key={c.id} className="shrink-0">
              <a
                href={`#${c.id}`}
                aria-current={active === c.id ? "true" : undefined}
                className={`flex items-baseline gap-2 text-sm font-medium transition-colors ${
                  active === c.id ? "text-text-light" : "text-white/50 hover:text-text-light"
                }`}
              >
                <span
                  className={`text-[0.65rem] font-bold tracking-[0.15em] ${
                    active === c.id ? "text-accent-dark-hover" : "text-white/30"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                {c.label}
              </a>
            </li>
          ))}
        </ul>
        <Link
          href={ctaHref}
          className="hidden shrink-0 rounded-full bg-accent px-5 py-2 text-xs font-semibold text-white transition-colors hover:bg-accent-hover sm:inline-flex"
        >
          {ctaLabel}
        </Link>
      </div>
    </nav>
  );
}
