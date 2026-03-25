"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

const placeholderTiles = [
  { label: "Lifestyle", gradient: "from-zinc-800 to-zinc-600" },
  { label: "FrameFlow", gradient: "from-zinc-700 to-zinc-500" },
  { label: "Model Home", gradient: "from-zinc-900 to-zinc-700" },
  { label: "Community", gradient: "from-zinc-600 to-zinc-400" },
  { label: "Aerial", gradient: "from-zinc-800 to-zinc-500" },
  { label: "Staging", gradient: "from-zinc-700 to-zinc-600" },
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
      className="relative min-h-screen overflow-hidden bg-zinc-900"
    >
      {/* Video tile grid — parallax on scroll */}
      <motion.div
        className="absolute inset-0 grid grid-cols-2 gap-1 sm:grid-cols-3"
        style={{ y: gridY, scale: gridScale }}
      >
        {placeholderTiles.map((tile) => (
          <div
            key={tile.label}
            className={`bg-gradient-to-br ${tile.gradient} flex items-center justify-center`}
          >
            {/* Replace with <video> elements when footage is ready */}
            <span className="text-xs font-medium uppercase tracking-widest text-white/20">
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
          <h1 className="text-white">
            Builder assets that win <strong>hearts</strong> and earn{" "}
            <strong>clicks</strong>.
          </h1>
          <p
            className="lead-text mx-auto mt-6 max-w-2xl text-zinc-300"
            style={{ fontStyle: "italic" }}
          >
            One shoot. Multiple outcomes. Photography, staging, and video
            designed to convert across every channel.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/frameflow-sell-faster-challenge-0210"
              className="cta-button rounded-full bg-white px-8 py-3.5 text-zinc-900 transition-colors hover:bg-zinc-200"
            >
              Try the FrameFlow Challenge Risk Free
            </Link>
            <Link
              href="/contact-page"
              className="cta-button rounded-full border border-white/30 px-8 py-3.5 text-white transition-colors hover:border-white/60"
            >
              Book a Strategy Call
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
