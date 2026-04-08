"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ProjectLightbox } from "./ProjectLightbox";

const regions = ["All", "West", "Mountain", "Central", "East"] as const;
type Region = (typeof regions)[number];

const stateToRegion: Record<string, string> = {
  // Direct region tags (set via Media Library region picker)
  West: "West", Mountain: "Mountain", Central: "Central", East: "East",
  // State codes
  WA: "West", OR: "West", CA: "West", NV: "West", HI: "West",
  MT: "Mountain", ID: "Mountain", WY: "Mountain", UT: "Mountain", CO: "Mountain", AZ: "Mountain", NM: "Mountain",
  TX: "Central", OK: "Central", KS: "Central", MO: "Central", MN: "Central", IA: "Central", WI: "Central", IL: "Central", AR: "Central", LA: "Central", MS: "Central", AL: "Central", TN: "Central",
  FL: "East", GA: "East", SC: "East", NC: "East", VA: "East", MD: "East", PA: "East", NY: "East", NJ: "East", OH: "East", IN: "East", MI: "East", KY: "East",
};

interface GalleryProject {
  deal_id: string;
  deal_name: string;
  builder: string;
  city: string;
  state: string;
  pipeline: string;
  youtube?: string;
  images: {
    id: number;
    url: string;
    thumb_url: string;
    filename: string;
    description: string | null;
  }[];
}

interface DynamicGalleryProps {
  pageSlug: string;
  heading: string;
  description?: string;
}

export function DynamicGallery({ pageSlug, heading, description }: DynamicGalleryProps) {
  const [projects, setProjects] = useState<GalleryProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<Region>("All");
  const showRegionFilter = pageSlug === "/gallery/models";
  const [lightbox, setLightbox] = useState<{ dealId: string; imageIndex: number } | null>(null);

  useEffect(() => {
    // Single batch request — 2 DB queries server-side instead of N×2 client waterfalls
    fetch(`/api/gallery/batch?page=${encodeURIComponent(pageSlug)}`)
      .then((r) => r.json())
      .then((data) => {
        setProjects(data.projects || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [pageSlug]);

  function extractYoutubeId(url: string): string | null {
    const match = url?.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^&?\s]+)/);
    return match ? match[1] : null;
  }

  // One cover image per project (first image as representative)
  const projectCovers = projects
    .filter((p) => p.images.length > 0 || !!p.youtube)
    .map((p) => {
      const youtubeId = extractYoutubeId(p.youtube || "");
      const firstImage = p.images[0];
      return {
        ...(firstImage || { id: 0, url: "", thumb_url: "", filename: "", description: null }),
        dealId: p.deal_id,
        project: p.deal_name,
        builder: p.builder,
        region: stateToRegion[p.state] || "Unknown",
        city: p.city,
        state: p.state,
        imageCount: p.images.length,
        youtubeId,
      };
    });

  const filtered =
    !showRegionFilter || active === "All"
      ? projectCovers
      : projectCovers.filter((p) => p.region === active);

  // Count per region for badges
  const regionCounts: Record<string, number> = {};
  projectCovers.forEach((p) => {
    regionCounts[p.region] = (regionCounts[p.region] || 0) + 1;
  });

  const hasData = projects.length > 0;

  return (
    <div>
      {/* Header + filters — contained */}
      {(heading || hasData) && (
        <div className="mx-auto max-w-7xl px-6 text-center">
          {heading && <h1>{heading}</h1>}
          {description && (
            <p className="mx-auto mt-4 max-w-2xl text-text-body">{description}</p>
          )}

          {hasData && showRegionFilter && (
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {regions.map((region) => (
                <button
                  key={region}
                  type="button"
                  onClick={() => setActive(region)}
                  className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                    active === region
                      ? "bg-accent text-text-light"
                      : "border border-border-light text-text-body hover:border-accent"
                  }`}
                >
                  {region}
                  {region !== "All" && regionCounts[region] && (
                    <span className="ml-1.5 text-xs opacity-60">{regionCounts[region]}</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Loading state — full bleed */}
      {loading && (
        <div className="mt-8 grid grid-cols-2 gap-0.5 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="aspect-[4/3] animate-pulse bg-border-light/50" />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && !hasData && (
        <div className="mt-12 text-center">
          <p className="text-text-body">No projects assigned to this gallery yet.</p>
          <p className="mt-1 text-xs text-text-body/60">Use the admin toolbar to add projects.</p>
        </div>
      )}

      {/* Project grid — full bleed, no gap, tiles flush edge-to-edge */}
      {!loading && hasData && (
        <div className="mt-8 grid grid-cols-2 gap-0.5 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((cover) => (
            <button
              key={cover.dealId}
              onClick={() => setLightbox({ dealId: cover.dealId, imageIndex: 0 })}
              className="group relative aspect-[4/3] overflow-hidden bg-bg-dark"
            >
              {/* Cover image or YouTube thumbnail */}
              {cover.youtubeId && !cover.url ? (
                <Image
                  src={`https://img.youtube.com/vi/${cover.youtubeId}/maxresdefault.jpg`}
                  alt={`${cover.project} video`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              ) : cover.url ? (
                <Image
                  src={cover.thumb_url || cover.url}
                  alt={cover.description || `${cover.project} - ${cover.builder}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              ) : null}

              {/* Play icon for video projects */}
              {cover.youtubeId && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black/60 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                    <svg className="ml-1 h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              )}

              <div className="absolute inset-0 flex flex-col items-start justify-end bg-gradient-to-t from-[#121212]/70 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="text-sm font-semibold text-text-light leading-snug">
                  {cover.project}
                </span>
                <span className="mt-0.5 text-xs text-text-muted">
                  {cover.builder} | {cover.city}{cover.state ? `, ${cover.state}` : ""}
                </span>
              </div>
              <div className="absolute right-2 top-2 flex gap-1">
                <span className="rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-medium text-white/80 backdrop-blur-sm">
                  {cover.region}
                </span>
                {cover.imageCount > 1 && (
                  <span className="rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-medium text-white/80 backdrop-blur-sm">
                    {cover.imageCount}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      {!loading && hasData && filtered.length === 0 && (
        <p className="mt-12 text-center text-text-body">No projects in this region yet.</p>
      )}

      {/* Project Lightbox */}
      {lightbox && (
        <ProjectLightbox
          dealId={lightbox.dealId}
          pageSlug={pageSlug}
          initialImageIndex={lightbox.imageIndex}
          onClose={() => setLightbox(null)}
        />
      )}
    </div>
  );
}
