"use client";

import { useEffect, useRef, useState } from "react";
import { CrossfadePair } from "./CrossfadePair";

interface MomentPair {
  key: string;
  alt: string;
}

interface MomentsStripProps {
  pairs: MomentPair[];
}

/**
 * A row of vertical Moments sized to the same 16:9 footprint as the films in
 * the sections around it, so all three showcase sections share one height.
 *
 * Each card fills the frame's height at 9/16, which fits three across; the
 * rest scroll in. Arrows cover mouse users, who cannot swipe sideways.
 */
export function MomentsStrip({ pairs }: MomentsStripProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [canBack, setCanBack] = useState(false);
  const [canForward, setCanForward] = useState(true);

  const update = () => {
    const row = rowRef.current;
    if (!row) return;
    setCanBack(row.scrollLeft > 4);
    setCanForward(row.scrollLeft + row.clientWidth < row.scrollWidth - 4);
  };

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const step = (dir: 1 | -1) => {
    const row = rowRef.current;
    const card = row?.firstElementChild as HTMLElement | null;
    if (!row || !card) return;
    row.scrollBy({ left: dir * (card.offsetWidth + 12), behavior: "smooth" });
  };

  const arrow =
    "absolute top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-lg text-text-dark shadow-md transition-opacity hover:bg-white disabled:pointer-events-none disabled:opacity-0";

  return (
    <div className="relative aspect-4/3 w-full min-w-0 lg:aspect-video">
      <div
        ref={rowRef}
        onScroll={update}
        className="flex h-full snap-x snap-mandatory gap-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {pairs.map((pair) => (
          <div
            key={pair.key}
            className="relative aspect-9/16 h-full shrink-0 snap-start overflow-hidden rounded-xl border border-border-light bg-bg-light"
          >
            <CrossfadePair
              first={`/showcase/moments-${pair.key}-1.webp`}
              second={`/showcase/moments-${pair.key}-2.webp`}
              alt={pair.alt}
              sizes="(max-width: 1024px) 40vw, 180px"
            />
          </div>
        ))}
      </div>
      <button
        type="button"
        aria-label="Previous moment"
        onClick={() => step(-1)}
        disabled={!canBack}
        className={`${arrow} left-2`}
      >
        &larr;
      </button>
      <button
        type="button"
        aria-label="Next moment"
        onClick={() => step(1)}
        disabled={!canForward}
        className={`${arrow} right-2`}
      >
        &rarr;
      </button>
    </div>
  );
}
