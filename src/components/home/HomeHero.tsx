"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { LoopVideo } from "./LoopVideo";

/**
 * Full-viewport film hero. Self-hosted loop (no YouTube chrome), left
 * justified, one headline, the trial as the primary action.
 *
 * Parallax: as the hero scrolls away the film drifts down and pushes in
 * slightly, the scrim deepens, and the copy rises and fades, so the film
 * reads as sitting behind the page rather than on it.
 */
export function HomeHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const filmY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const filmScale = useTransform(scrollYProgress, [0, 1], [1, 1.14]);
  const scrim = useTransform(scrollYProgress, [0, 1], [0, 0.55]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "-45%"]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <section ref={ref} className="relative -mt-16 flex min-h-screen items-end overflow-hidden bg-bg-dark text-text-light">
      <motion.div className="absolute inset-0" style={{ y: filmY, scale: filmScale }}>
        <LoopVideo
          src="/client-showcase/cineflow-wildrose.mp4"
          poster="/client-showcase/cineflow-wildrose-poster.webp"
          className="h-full w-full object-cover"
        />
      </motion.div>
      {/* Darken the lower left, where the copy sits, and leave the film clear above. */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/55 to-transparent" />
      <motion.div className="absolute inset-0 bg-black" style={{ opacity: scrim }} />

      <motion.div
        className="relative mx-auto w-full max-w-7xl px-6 pb-20 pt-40 lg:pb-28"
        style={{ y: copyY, opacity: copyOpacity }}
      >
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-white/60">
          Davies Imaging Group
        </p>
        <h1 className="max-w-4xl text-text-light lg:text-[4.5rem] lg:leading-[1.02] xl:text-[5.25rem]">
          Slow sales? Update your <strong>presentation</strong>.
        </h1>
        <p className="mt-6 max-w-2xl text-xl leading-relaxed text-white/80">
          Stop cutting price, and give your new homes a second chance at success.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <Link
            href="/modelmatch-datalibrary"
            className="rounded-full bg-accent px-8 py-3.5 text-center text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
          >
            Start My Free Trial
          </Link>
          <a
            href="#film"
            className="group inline-flex items-center gap-3 text-sm font-medium text-white/85 transition-colors hover:text-white"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 transition-colors group-hover:border-white group-hover:bg-white/10">
              <svg viewBox="0 0 24 24" className="ml-0.5 h-3.5 w-3.5" fill="currentColor" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            Watch the film
          </a>
        </div>
      </motion.div>
    </section>
  );
}
