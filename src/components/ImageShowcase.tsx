"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface ShowcaseProps {
  slotPrefix: string;
  layout: "trio" | "duo" | "masonry" | "filmstrip";
  className?: string;
}

// Cache
let assetCache: Record<string, { image_url: string; thumb_url: string; alt_text: string }> | null = null;

async function loadAssets() {
  if (assetCache) return;
  try {
    const res = await fetch("/api/site-assets");
    const data = await res.json();
    const map: Record<string, { image_url: string; thumb_url: string; alt_text: string }> = {};
    for (const a of data.assets || []) map[a.slot_id] = a;
    assetCache = map;
  } catch {
    assetCache = {};
  }
}

export function ImageShowcase({ slotPrefix, layout, className = "" }: ShowcaseProps) {
  const [loaded, setLoaded] = useState(false);
  const [assets, setAssets] = useState<Record<string, { image_url: string; alt_text: string }>>({});

  useEffect(() => {
    loadAssets().then(() => {
      const relevant: typeof assets = {};
      if (assetCache) {
        for (const [key, val] of Object.entries(assetCache)) {
          if (key.startsWith(slotPrefix)) relevant[key] = val;
        }
      }
      setAssets(relevant);
      setLoaded(true);
    });
  }, [slotPrefix]);

  const slots = layout === "trio" ? 3 : layout === "duo" ? 2 : layout === "masonry" ? 4 : 5;
  const slotIds = Array.from({ length: slots }, (_, i) => `${slotPrefix}-${i}`);

  if (!loaded) return null;

  if (layout === "trio") {
    return (
      <div className={`grid grid-cols-1 gap-3 sm:grid-cols-3 ${className}`}>
        {slotIds.map((id) => {
          const asset = assets[id];
          return (
            <div key={id} data-slot={id} className="relative aspect-[4/3] overflow-hidden rounded-lg bg-border-light/30">
              {asset?.image_url && (
                <Image src={asset.image_url} alt={asset.alt_text || ""} fill className="object-cover" sizes="33vw" />
              )}
            </div>
          );
        })}
      </div>
    );
  }

  if (layout === "duo") {
    return (
      <div className={`grid grid-cols-1 gap-3 sm:grid-cols-2 ${className}`}>
        {slotIds.map((id) => {
          const asset = assets[id];
          return (
            <div key={id} data-slot={id} className="relative aspect-[16/10] overflow-hidden rounded-lg bg-border-light/30">
              {asset?.image_url && (
                <Image src={asset.image_url} alt={asset.alt_text || ""} fill className="object-cover" sizes="50vw" />
              )}
            </div>
          );
        })}
      </div>
    );
  }

  if (layout === "masonry") {
    return (
      <div className={`grid grid-cols-2 gap-3 ${className}`}>
        <div className="space-y-3">
          {slotIds.slice(0, 2).map((id, i) => {
            const asset = assets[id];
            return (
              <div key={id} data-slot={id} className={`relative overflow-hidden rounded-lg bg-border-light/30 ${i === 0 ? "aspect-[4/5]" : "aspect-[4/3]"}`}>
                {asset?.image_url && (
                  <Image src={asset.image_url} alt={asset.alt_text || ""} fill className="object-cover" sizes="50vw" />
                )}
              </div>
            );
          })}
        </div>
        <div className="space-y-3">
          {slotIds.slice(2, 4).map((id, i) => {
            const asset = assets[id];
            return (
              <div key={id} data-slot={id} className={`relative overflow-hidden rounded-lg bg-border-light/30 ${i === 0 ? "aspect-[4/3]" : "aspect-[4/5]"}`}>
                {asset?.image_url && (
                  <Image src={asset.image_url} alt={asset.alt_text || ""} fill className="object-cover" sizes="50vw" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // filmstrip
  return (
    <div className={`flex gap-3 overflow-x-auto pb-2 ${className}`}>
      {slotIds.map((id) => {
        const asset = assets[id];
        return (
          <div key={id} data-slot={id} className="relative aspect-[3/2] w-80 shrink-0 overflow-hidden rounded-lg bg-border-light/30">
            {asset?.image_url && (
              <Image src={asset.image_url} alt={asset.alt_text || ""} fill className="object-cover" sizes="320px" />
            )}
          </div>
        );
      })}
    </div>
  );
}
