"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { EventImage } from "@/app/shoresummitphotos2026/galleries";

// Full-screen lightbox for the event galleries. Keyboard (Esc / arrows), swipe on
// touch, prev/next controls, an image counter, and a real download (fetches the
// 2400px version and saves it with a filename). Lightweight and mobile-first.

export function EventLightbox({
  images,
  startIndex,
  onClose,
}: {
  images: EventImage[];
  startIndex: number;
  onClose: () => void;
}) {
  const [i, setI] = useState(startIndex);
  const [downloading, setDownloading] = useState(false);
  const touchX = useRef<number | null>(null);

  const prev = useCallback(() => setI((n) => (n - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setI((n) => (n + 1) % images.length), [images.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, prev, next]);

  const img = images[i];

  async function download() {
    if (!img || downloading) return;
    setDownloading(true);
    const name = (img.filename || `shore-summit-${img.id}`).replace(/\.[^.]+$/, "") + ".webp";
    try {
      const res = await fetch(img.download_url);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      // Fallback: open the file so the user can save it manually.
      window.open(img.download_url, "_blank", "noopener");
    } finally {
      setDownloading(false);
    }
  }

  if (!img) return null;

  const iconBtn: React.CSSProperties = {
    background: "rgba(255,255,255,0.12)",
    border: "none",
    borderRadius: 999,
    width: 48,
    height: 48,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: "#fff",
    flexShrink: 0,
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(10,10,12,0.96)", display: "flex", flexDirection: "column" }}
      onClick={onClose}
    >
      {/* Top bar: counter + download + close */}
      <div
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", gap: 12 }}
        onClick={(e) => e.stopPropagation()}
      >
        <span style={{ color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 600, letterSpacing: "0.04em" }}>
          {i + 1} / {images.length}
        </span>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={download} disabled={downloading} title="Download" style={{ ...iconBtn, opacity: downloading ? 0.5 : 1 }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 3v9M6 8.5l4 4 4-4M4 16h12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button onClick={onClose} title="Close" style={iconBtn}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Image stage */}
      <div
        style={{ flex: 1, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 8px 16px", minHeight: 0 }}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 45) (dx > 0 ? prev : next)();
          touchX.current = null;
        }}
      >
        {images.length > 1 && (
          <button onClick={prev} aria-label="Previous" style={{ ...iconBtn, position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", width: 52, height: 52, background: "rgba(255,255,255,0.14)" }}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M14 4l-7 7 7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img.display_url}
          alt={img.filename || "Shore Summit photo"}
          style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", borderRadius: 6, userSelect: "none" }}
          draggable={false}
        />
        {images.length > 1 && (
          <button onClick={next} aria-label="Next" style={{ ...iconBtn, position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", width: 52, height: 52, background: "rgba(255,255,255,0.14)" }}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M8 4l7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        )}
      </div>
    </div>
  );
}
