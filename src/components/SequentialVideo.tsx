"use client";

import { useEffect, useRef, useState } from "react";

interface SequentialVideoProps {
  /** Clips played back to back, in order. Wraps to the first when the last ends. */
  clips: { src: string; poster: string }[];
  className?: string;
}

/**
 * One player, several clips, played back to back on a loop.
 *
 * A single <video> that advances to the next clip on `ended` rather than
 * looping itself, so two PlanMatch films read as one continuous piece of work
 * in a single frame. Silent and uncontrolled, like every other loop on the
 * page: autoplay only survives in browsers while the video stays muted.
 */
export function SequentialVideo({ clips, className = "" }: SequentialVideoProps) {
  const [index, setIndex] = useState(0);
  const ref = useRef<HTMLVideoElement>(null);

  // Swapping src alone does not restart playback, so load and play on change.
  // Skips the first render: the `autoPlay` attribute already covers that, and
  // calling play() before the element has a source throws in Safari.
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    const video = ref.current;
    if (!video) return;
    video.load();
    // Rejects when the tab is backgrounded or autoplay is blocked. Neither is
    // recoverable here and neither should surface as an unhandled rejection.
    video.play().catch(() => {});
  }, [index]);

  const clip = clips[index];

  return (
    <video
      ref={ref}
      src={clip.src}
      poster={clip.poster}
      autoPlay
      muted
      playsInline
      preload="auto"
      onEnded={() => setIndex((i) => (i + 1) % clips.length)}
      className={className}
    />
  );
}
