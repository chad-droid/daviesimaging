"use client";

import { useEffect, useRef, useState } from "react";

interface ShowcaseFilmProps {
  src: string;
  poster: string;
  /** Names the film for screen readers, e.g. "Cinematic film of a model home". */
  label: string;
  /** The file carries a soundtrack, so offer a sound toggle. */
  sound?: boolean;
  className?: string;
}

/**
 * A film that plays itself, with the site's own controls instead of the
 * browser's grey bar.
 *
 * Plays muted on a loop while it is on screen and pauses when it scrolls away,
 * so only the film being watched is decoding. Visitors who ask for reduced
 * motion get the poster and a play button instead of autoplay.
 */
export function ShowcaseFilm({ src, poster, label, sound = false, className = "" }: ShowcaseFilmProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  // Once the visitor pauses by hand, scrolling back must not restart it.
  const userPaused = useRef(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onVolume = () => setMuted(v.muted);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    v.addEventListener("volumechange", onVolume);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!reduceMotion && !userPaused.current) v.play().catch(() => {});
        } else {
          v.pause();
          // Never keep a soundtrack running for a film nobody can see.
          v.muted = true;
        }
      },
      { threshold: 0.35 },
    );
    io.observe(v);

    return () => {
      io.disconnect();
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("volumechange", onVolume);
    };
  }, []);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      userPaused.current = false;
      v.play().catch(() => {});
    } else {
      userPaused.current = true;
      v.pause();
    }
  };

  const toggleSound = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    if (v.paused) {
      userPaused.current = false;
      v.play().catch(() => {});
    }
  };

  const pill =
    "rounded-full bg-black/55 text-white/90 backdrop-blur transition-colors hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

  return (
    <div className={`relative bg-black ${className}`}>
      <video
        ref={ref}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={label}
        className="aspect-video w-full object-cover"
      />
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4 sm:p-6">
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause film" : "Play film"}
          className={`${pill} flex h-11 w-11 items-center justify-center`}
        >
          {playing ? (
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
              <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="ml-0.5 h-4 w-4" fill="currentColor" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
        {sound && (
          <button
            type="button"
            onClick={toggleSound}
            aria-pressed={!muted}
            className={`${pill} px-4 py-2.5 text-[0.65rem] font-bold uppercase tracking-[0.18em]`}
          >
            {muted ? "Sound on" : "Sound off"}
          </button>
        )}
      </div>
    </div>
  );
}
