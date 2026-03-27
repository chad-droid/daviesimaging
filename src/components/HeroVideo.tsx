"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

const placeholderTiles = [
  { label: "Lifestyle", gradient: "from-bg-dark to-bg-dark-surface" },
  { label: "FrameFlow", gradient: "from-bg-dark-surface to-accent-secondary/30" },
  { label: "Model Home", gradient: "from-bg-dark to-bg-dark-surface" },
  { label: "Community", gradient: "from-bg-dark-surface to-accent-secondary/40" },
  { label: "Aerial", gradient: "from-bg-dark to-accent-secondary/30" },
  { label: "Staging", gradient: "from-bg-dark-surface to-bg-dark" },
];

export function HeroVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const gridScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [0.55, 0.85]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-bg-dark"
    >
      {/* Video tile grid — parallax on scroll */}
      <motion.div
        className="absolute inset-0 grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3"
        style={{ y: gridY, scale: gridScale }}
      >
        {placeholderTiles.map((tile) => (
          <div
            key={tile.label}
            className={`bg-gradient-to-br ${tile.gradient} flex items-center justify-center`}
          >
            {/* Replace with <video> elements when footage is ready */}
            <span className="text-xs font-medium uppercase tracking-widest text-accent-secondary/30">
              {tile.label}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Dark overlay — deepens on scroll */}
      <motion.div
        className="absolute inset-0 bg-black"
        style={{ opacity: overlayOpacity }}
      />

      {/* Hero content — scrolls away with fade */}
      <motion.div
        className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className="mx-auto max-w-3xl">
          <h1 className="text-text-light lg:text-[4rem] lg:leading-[1.05]">
            Homebuilder media that wins
            <br />
            <strong>hearts</strong> and earns <strong>clicks</strong>.
          </h1>
          <p
            className="lead-text mx-auto mt-6 max-w-2xl text-text-muted"
            style={{ fontStyle: "italic" }}
          >
            One shoot. Multiple outcomes. Photography, staging, and video
            designed to convert across every channel.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/offerings/frameflow"
              className="rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-text-light transition-colors hover:bg-accent-hover"
            >
              See FrameFlow in Action
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-text-light/25 px-6 py-2.5 text-sm font-medium text-text-light transition-colors hover:border-text-light/50 hover:bg-text-light/5"
            >
              Book a 15 Minute Plan
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
