"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface DynamicImageProps {
  slotId: string;
  fallbackClass?: string;
  className?: string;
  aspectRatio?: string;
  disableLightbox?: boolean;
  disableBeforeAfter?: boolean;
  objectFit?: "cover" | "contain";
}

// Cache site assets to avoid refetching per component
let cachedAssets: Record<string, { image_url: string; thumb_url: string; alt_text: string; before_url: string; before_thumb_url: string }> | null = null;
let fetchPromise: Promise<void> | null = null;

async function loadAssets() {
  if (cachedAssets) return;
  if (fetchPromise) { await fetchPromise; return; }
  fetchPromise = fetch("/api/site-assets")
    .then((r) => r.json())
    .then((data) => {
      const map: typeof cachedAssets = {};
      for (const a of data.assets || []) {
        map[a.slot_id] = a;
      }
      cachedAssets = map;
    })
    .catch(() => { cachedAssets = {}; });
  await fetchPromise;
}

export function DynamicImage({
  slotId,
  fallbackClass = "bg-gradient-to-br from-bg-light to-border-light",
  className = "",
  aspectRatio = "4/3",
  disableLightbox = false,
  disableBeforeAfter = false,
  objectFit = "cover",
}: DynamicImageProps) {
  const [asset, setAsset] = useState<{
    image_url: string;
    thumb_url: string;
    alt_text: string;
    before_url?: string;
    before_thumb_url?: string;
  } | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [showBefore, setShowBefore] = useState(false);
  const [lightbox, setLightbox] = useState(false);

  useEffect(() => {
    loadAssets().then(() => {
      if (cachedAssets && cachedAssets[slotId]) {
        setAsset(cachedAssets[slotId]);
      }
      setLoaded(true);
    });
  }, [slotId]);

  if (!loaded) {
    return (
      <div
        data-slot={slotId}
        className={`${fallbackClass} ${className} animate-pulse`}
        style={{ aspectRatio }}
      />
    );
  }

  if (!asset?.image_url) {
    return (
      <div
        data-slot={slotId}
        className={`${fallbackClass} ${className}`}
        style={{ aspectRatio }}
      />
    );
  }

  const hasBefore = !disableBeforeAfter && !!asset.before_url;
  const afterUrl = asset.thumb_url || asset.image_url;
  const beforeUrl = asset.before_thumb_url || asset.before_url || "";

  return (
    <>
      <div
        data-slot={slotId}
        className={`relative overflow-hidden ${disableLightbox ? "" : "cursor-zoom-in"} ${className}`}
        style={{ aspectRatio }}
        onClick={disableLightbox ? undefined : () => setLightbox(true)}
        onMouseEnter={() => hasBefore && setShowBefore(true)}
        onMouseLeave={() => hasBefore && setShowBefore(false)}
      >
        <Image
          src={showBefore ? beforeUrl : afterUrl}
          alt={asset.alt_text || ""}
          fill
          className={`${objectFit === "contain" ? "object-contain" : "object-cover"} transition-opacity duration-300`}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
          quality={90}
        />
        {hasBefore && (
          <div className="absolute bottom-3 left-3 z-10">
            <span className="rounded-full bg-[#6A5ACD] px-3 py-1.5 text-[10px] font-semibold text-white shadow-lg">
              {showBefore ? "Before" : "After"}
            </span>
          </div>
        )}
      </div>

      {/* Fullscreen lightbox */}
      {lightbox && !disableLightbox && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightbox(false)}
        >
          <img
            src={asset.image_url}
            alt={asset.alt_text || ""}
            className="max-h-full max-w-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            onClick={() => setLightbox(false)}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
