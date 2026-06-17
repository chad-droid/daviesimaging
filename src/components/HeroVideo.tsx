"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { EditableContent } from "./EditableContent";

const heroFields = [
  { key: "headline1", label: "Headline (line 1)", type: "text" as const, defaultValue: "Slow sales? Update your presentation." },
  { key: "headline2", label: "Headline (line 2 — optional)", type: "text" as const, defaultValue: "" },
  { key: "subheadline", label: "Subheadline", type: "textarea" as const, defaultValue: "Stop cutting price, and give your new homes a second chance at success." },
  { key: "cta1Text", label: "Primary CTA Text", type: "text" as const, defaultValue: "Get Your Spec Marketing Plan" },
  { key: "cta1Url", label: "Primary CTA URL", type: "url" as const, defaultValue: "/contact" },
  { key: "cta2Text", label: "Secondary CTA Text", type: "text" as const, defaultValue: "" },
  { key: "cta2Url", label: "Secondary CTA URL", type: "url" as const, defaultValue: "" },
  { key: "videoUrl", label: "Background Video (YouTube URL)", type: "url" as const, defaultValue: "" },
];

function extractYoutubeId(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^&?\s]+)/);
  return match ? match[1] : null;
}

// Still frame from the hero video (its own first frame). Paints instantly and
// stays on top of the iframe until the video has had time to start playing, so
// the viewer never sees YouTube's loading poster or play button.
const POSTER = "/hero-poster.jpg";

export function HeroVideo() {
  // Ref lives on the outermost div (renders synchronously, not inside async EditableContent)
  const containerRef = useRef<HTMLDivElement>(null);
  // Once the embed has loaded + a short buffer, fade the poster out to reveal
  // the already-playing video.
  const [revealVideo, setRevealVideo] = useState(false);
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
              {/* Video layer (behind the poster) */}
              {ytId && (
                <div className="absolute inset-0 overflow-hidden">
                  <iframe
                    src={`https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}&controls=0&showinfo=0&modestbranding=1&playsinline=1&rel=0`}
                    className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{ width: "177.78vh", height: "56.25vw", minWidth: "100vw", minHeight: "100vh" }}
                    allow="autoplay; encrypted-media"
                    tabIndex={-1}
                    onLoad={() => window.setTimeout(() => setRevealVideo(true), 1600)}
                  />
                </div>
              )}

              {/* Poster: instant still frame, parallaxed. Sits on top of the
                  video and fades out once the video is playing. With no video
                  configured it simply stays as the background. */}
              <motion.div
                className="absolute inset-0 overflow-hidden"
                style={{ y: gridY, scale: gridScale }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={POSTER}
                  alt=""
                  aria-hidden
                  className={`h-full w-full object-cover transition-opacity duration-1000 ease-out ${
                    ytId && revealVideo ? "opacity-0" : "opacity-100"
                  }`}
                />
              </motion.div>

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
                  <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                    {v.subheadline}
                  </p>
                  <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:items-center">
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
