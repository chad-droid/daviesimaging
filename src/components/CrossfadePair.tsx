"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface CrossfadePairProps {
  first: string;
  second: string;
  /** Describes the pair as a whole. The second frame is decorative. */
  alt: string;
  /** How long each frame sits fully visible. */
  holdMs?: number;
  /** How long the dissolve between them takes. */
  fadeMs?: number;
  sizes?: string;
}

/**
 * Two frames of the same room, dissolving back and forth on a loop.
 *
 * Holds the wide shot, dissolves slowly to the detail, holds, dissolves back.
 * The interval is hold + fade so each frame is genuinely still for `holdMs`
 * rather than starting to leave the moment it arrives.
 *
 * Both frames are stacked and always mounted, so the browser has decoded the
 * second one long before it is needed and the dissolve never hitches.
 */
export function CrossfadePair({
  first,
  second,
  alt,
  holdMs = 2000,
  fadeMs = 1200,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
}: CrossfadePairProps) {
  const [showSecond, setShowSecond] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setShowSecond((s) => !s), holdMs + fadeMs);
    return () => clearInterval(id);
  }, [holdMs, fadeMs]);

  const frame = "absolute inset-0 h-full w-full object-cover";
  const dissolve = { transition: `opacity ${fadeMs}ms ease-in-out` };

  return (
    <div className="relative h-full w-full overflow-hidden">
      <Image
        src={first}
        alt={alt}
        fill
        sizes={sizes}
        className={frame}
        style={{ ...dissolve, opacity: showSecond ? 0 : 1 }}
      />
      <Image
        src={second}
        alt=""
        aria-hidden
        fill
        sizes={sizes}
        className={frame}
        style={{ ...dissolve, opacity: showSecond ? 1 : 0 }}
      />
    </div>
  );
}
