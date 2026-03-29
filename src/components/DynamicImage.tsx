"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface DynamicImageProps {
  slotId: string;
  fallbackClass?: string;
  className?: string;
  aspectRatio?: string;
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

  const hasBefore = !!asset.before_url;
  const displayUrl = showBefore && asset.before_url ? asset.before_url : asset.image_url;
  const displayThumb = showBefore && asset.before_thumb_url ? asset.before_thumb_url : asset.thumb_url;

  return (
    <div
      data-slot={slotId}
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio }}
    >
      <Image
        src={displayThumb || displayUrl}
        alt={asset.alt_text || ""}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />

      {/* Before/After toggle */}
      {hasBefore && (
        <div className="absolute bottom-3 left-3 z-10 flex rounded-full border border-white/20 bg-black/50 text-[10px] font-semibold backdrop-blur-sm">
          <button
            onClick={() => setShowBefore(false)}
            className={`rounded-full px-3 py-1 transition-colors ${!showBefore ? "bg-[#4CAF50] text-white" : "text-white/60"}`}
          >
            After
          </button>
          <button
            onClick={() => setShowBefore(true)}
            className={`rounded-full px-3 py-1 transition-colors ${showBefore ? "bg-[#E57373] text-white" : "text-white/60"}`}
          >
            Before
          </button>
        </div>
      )}
    </div>
  );
}
