"use client";

import { useState } from "react";
import type { EventImage } from "@/app/shoresummitphotos2026/galleries";
import { EventLightbox } from "./EventLightbox";

// Responsive, lightweight thumbnail grid. Uses plain lazy <img> on the already
// optimized ~600px webp thumbnails (no per-request image optimization needed),
// so a few hundred photos stay fast on mobile. Click a tile to open the lightbox.

export function EventGalleryGrid({ images }: { images: EventImage[] }) {
  const [open, setOpen] = useState<number | null>(null);

  if (!images.length) {
    return (
      <p style={{ textAlign: "center", color: "var(--text-muted)", fontFamily: "var(--font-body)", padding: "60px 0" }}>
        Photos from this gallery are coming soon.
      </p>
    );
  }

  return (
    <>
      <style>{`
        .shore-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
        }
        @media (max-width: 900px) { .shore-grid { grid-template-columns: repeat(3, 1fr); gap: 8px; } }
        @media (max-width: 560px) { .shore-grid { grid-template-columns: repeat(2, 1fr); gap: 6px; } }
      `}</style>
      <div className="shore-grid">
        {images.map((img, idx) => (
          <button
            key={img.id}
            onClick={() => setOpen(idx)}
            style={{
              padding: 0,
              border: "none",
              cursor: "pointer",
              borderRadius: 8,
              overflow: "hidden",
              background: "#eceae7",
              aspectRatio: "1 / 1",
              display: "block",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.thumb_url}
              alt={img.filename || "Shore Summit photo"}
              loading="lazy"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </button>
        ))}
      </div>
      {open !== null && (
        <EventLightbox images={images} startIndex={open} onClose={() => setOpen(null)} />
      )}
    </>
  );
}
