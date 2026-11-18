"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";

interface Props {
  beforeSrc: string;
  afterSrc: string;
  width: number;
  height: number;
  beforeLabel: string;
  afterLabel: string;
  alt: string;
}

const clamp = (n: number) => Math.min(100, Math.max(0, n));

// Before on the left of the handle, after on the right. The after image sits on
// top and is clipped from the left, so dragging the handle left reveals more of
// the staged room. Pointer events cover mouse and touch (touch-action pan-y
// keeps vertical page scroll working on iPhone); a range input carries the
// keyboard and screen reader control.
export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  width,
  height,
  beforeLabel,
  afterLabel,
  alt,
}: Props) {
  const [pos, setPos] = useState(50);
  const frame = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const moveTo = useCallback((clientX: number) => {
    const rect = frame.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    setPos(clamp(((clientX - rect.left) / rect.width) * 100));
  }, []);

  return (
    <div
      ref={frame}
      className="relative cursor-ew-resize select-none overflow-hidden rounded-lg bg-bg-light"
      style={{ aspectRatio: `${width} / ${height}`, touchAction: "pan-y" }}
      onPointerDown={(e) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        moveTo(e.clientX);
      }}
      onPointerMove={(e) => {
        if (dragging.current) moveTo(e.clientX);
      }}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      <Image
        src={beforeSrc}
        alt={`${beforeLabel}: ${alt}`}
        fill
        draggable={false}
        className="pointer-events-none object-cover"
        sizes="(max-width: 768px) 100vw, 768px"
      />
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
      >
        <Image
          src={afterSrc}
          alt={`${afterLabel}: ${alt}`}
          fill
          draggable={false}
          className="pointer-events-none object-cover"
          sizes="(max-width: 768px) 100vw, 768px"
        />
      </div>

      <span
        className="pointer-events-none absolute left-3 top-3 z-10 rounded-full px-3 py-1 text-xs font-medium text-white"
        style={{ backgroundColor: "rgba(18, 18, 18, 0.72)" }}
      >
        {beforeLabel}
      </span>
      <span
        className="pointer-events-none absolute right-3 top-3 z-10 rounded-full px-3 py-1 text-xs font-medium text-white"
        style={{ backgroundColor: "#6A5ACD" }}
      >
        {afterLabel}
      </span>

      <div
        className="pointer-events-none absolute inset-y-0 w-1 -translate-x-1/2"
        style={{ left: `${pos}%`, backgroundColor: "#6A5ACD" }}
        aria-hidden="true"
      >
        <span
          className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white text-white shadow-lg"
          style={{ backgroundColor: "#6A5ACD" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
          </svg>
        </span>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={Math.round(pos)}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label={`Compare ${beforeLabel.toLowerCase()} and ${afterLabel.toLowerCase()}`}
        aria-valuetext={`${Math.round(100 - pos)}% ${afterLabel}`}
        className="peer absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        style={{ pointerEvents: "none" }}
      />
      <div className="pointer-events-none absolute inset-0 rounded-lg ring-accent ring-offset-2 peer-focus-visible:ring-2" />
    </div>
  );
}
