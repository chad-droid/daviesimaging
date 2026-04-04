"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { EditableContent } from "./EditableContent";

const heroFields = [
  { key: "headline1", label: "Headline (line 1)", type: "text" as const, defaultValue: "Homebuilder media that wins" },
  { key: "headline2", label: "Headline (line 2)", type: "text" as const, defaultValue: "hearts and earns clicks." },
  { key: "subheadline", label: "Subheadline", type: "textarea" as const, defaultValue: "One shoot. Multiple outcomes. Photography, staging, and video designed to convert across every channel." },
  { key: "cta1Text", label: "Primary CTA Text", type: "text" as const, defaultValue: "See FrameFlow in Action" },
  { key: "cta1Url", label: "Primary CTA URL", type: "url" as const, defaultValue: "/offerings/frameflow" },
  { key: "cta2Text", label: "Secondary CTA Text", type: "text" as const, defaultValue: "Book a 15 Minute Plan" },
  { key: "cta2Url", label: "Secondary CTA URL", type: "url" as const, defaultValue: "/contact" },
  { key: "videoUrl", label: "Background Video (YouTube URL)", type: "url" as const, defaultValue: "" },
];

function extractYoutubeId(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^&?\s]+)/);
  return match ? match[1] : null;
}

const placeholderTiles = [
  { label: "Lifestyle", gradient: "from-bg-dark to-bg-dark-surface" },
  { label: "FrameFlow", gradient: "from-bg-dark-surface to-accent-secondary/30" },
  { label: "Model Home", gradient: "from-bg-dark to-bg-dark-surface" },
  { label: "Community", gradient: "from-bg-dark-surface to-accent-secondary/40" },
  { label: "Aerial", gradient: "from-bg-dark to-accent-secondary/30" },
  { label: "Staging", gradient: "from-bg-dark-surface to-bg-dark" },
];

export function HeroVideo() {
  // Ref lives on the outermost div (renders synchronously, not inside async EditableContent)
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const gridScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [0.45, 0.8]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    // Ref is here — renders immediately, never blocked by async content loading
    <div ref={containerRef} className="relative -mt-16 min-h-screen overflow-hidden bg-bg-dark">
      <EditableContent slotId="hero-main" fields={heroFields}>
        {(v) => {
          const ytId = v.videoUrl ? extractYoutubeId(v.videoUrl) : null;

          return (
            <>
              {/* Background: YouTube video or placeholder tiles */}
              {ytId ? (
                <div className="absolute inset-0 overflow-hidden">
                  <iframe
                    src={`https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}&controls=0&showinfo=0&modestbranding=1&playsinline=1`}
                    className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{ width: "177.78vh", height: "56.25vw", minWidth: "100vw", minHeight: "100vh" }}
                    allow="autoplay; encrypted-media"
                    tabIndex={-1}
                  />
                </div>
              ) : (
                <motion.div
                  className="absolute inset-0 grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3"
                  style={{ y: gridY, scale: gridScale }}
                >
                  {placeholderTiles.map((tile) => (
                    <div
                      key={tile.label}
                      className={`bg-gradient-to-br ${tile.gradient} flex items-center justify-center`}
                    >
                      <span className="text-xs font-medium uppercase tracking-widest text-accent-secondary/30">
                        {tile.label}
                      </span>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* Dark overlay */}
              <motion.div
                className="absolute inset-0 bg-black"
                style={{ opacity: overlayOpacity }}
              />

              {/* Content */}
              <motion.div
                className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center"
                style={{ y: contentY, opacity: contentOpacity }}
              >
                <div className="mx-auto max-w-4xl">
                  <h1 className="text-text-light lg:text-[4rem] lg:leading-[1.05]">
                    {v.headline1}
                    <br />
                    {v.headline2}
                  </h1>
                  <p
                    className="lead-text mx-auto mt-6 max-w-2xl text-text-muted"
                    style={{ fontStyle: "italic" }}
                  >
                    {v.subheadline}
                  </p>
                  <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
                    {v.cta1Text && (
                      <Link
                        href={v.cta1Url || "/"}
                        className="rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-text-light transition-colors hover:bg-accent-hover"
                      >
                        {v.cta1Text}
                      </Link>
                    )}
                    {v.cta2Text && (
                      <Link
                        href={v.cta2Url || "/"}
                        className="rounded-full border border-text-light/25 px-6 py-2.5 text-sm font-medium text-text-light transition-colors hover:border-text-light/50 hover:bg-text-light/5"
                      >
                        {v.cta2Text}
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            </>
          );
        }}
      </EditableContent>
    </div>
  );
}
