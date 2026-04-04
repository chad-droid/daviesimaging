"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const ADMIN_KEY = "dig-admin-auth";

interface ParallaxBackgroundProps {
  slotId: string;
  overlayOpacity?: number;
  speed?: number;
  children: React.ReactNode;
  className?: string;
}

// Cache for site_assets
let assetCache: Record<string, { image_url: string; thumb_url: string }> | null = null;

async function loadAssetCache() {
  if (assetCache) return;
  try {
    const res = await fetch("/api/site-assets");
    const data = await res.json();
    const map: Record<string, { image_url: string; thumb_url: string }> = {};
    for (const a of data.assets || []) map[a.slot_id] = a;
    assetCache = map;
  } catch {
    assetCache = {};
  }
}

export function ParallaxBackground({
  slotId,
  overlayOpacity = 0.55,
  speed = 0.3,
  children,
  className = "",
}: ParallaxBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { scrollYProgress } = useScroll({
    target: mounted ? ref : undefined,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [`-${speed * 100}%`, `${speed * 100}%`]);

  useEffect(() => {
    loadAssetCache().then(() => {
      if (assetCache?.[slotId]) {
        setImageUrl(assetCache[slotId].image_url || assetCache[slotId].thumb_url);
      }
    });
    setIsAdmin(sessionStorage.getItem(ADMIN_KEY) === "true");
  }, [slotId]);

  return (
    <div ref={ref} data-slot={slotId} className={`relative overflow-hidden ${className}`}>
      {/* Parallax background image */}
      {imageUrl && (
        <>
          <motion.div className="absolute inset-0" style={{ y }}>
            <div className="absolute inset-[-20%]">
              <Image
                src={imageUrl}
                alt=""
                fill
                className="object-cover"
                sizes="100vw"
                quality={90}
              />
            </div>
          </motion.div>
          <div
            className="absolute inset-0"
            style={{ backgroundColor: `rgba(18, 18, 18, ${overlayOpacity})` }}
          />
        </>
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Admin hint when no image */}
      {!imageUrl && isAdmin && (
        <div className="absolute bottom-2 right-2 z-20 rounded bg-[#6A5ACD]/80 px-2 py-1 text-[9px] text-white">
          Edit Images → click to add background
        </div>
      )}
    </div>
  );
}
