"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ProjectLightbox } from "./ProjectLightbox";

const regions = ["All", "West", "Mountain", "Central", "East"] as const;
type Region = (typeof regions)[number];

const stateToRegion: Record<string, string> = {
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
  const [lightbox, setLightbox] = useState<{ dealId: string; imageIndex: number } | null>(null);

  useEffect(() => {
    fetch(`/api/gallery?action=assignments&page=${encodeURIComponent(pageSlug)}`)
      .then((r) => r.json())
      .then(async (data) => {
        const assignments = data.assignments || [];
        if (assignments.length === 0) {
          setLoading(false);
          return;
        }

        // Fetch media files for each assigned project
        const projectsWithImages: GalleryProject[] = [];
        for (const a of assignments) {
          try {
            const res = await fetch(`/api/media/metadata?dealId=${a.deal_id}`);
            const meta = await res.json();
            projectsWithImages.push({
              deal_id: a.deal_id,
              deal_name: a.deal_name || meta.deal?.name || "",
              builder: a.builder || meta.deal?.builder || "",
              city: a.city || meta.deal?.city || "",
              state: a.state || meta.deal?.state || "",
              pipeline: a.pipeline || meta.deal?.pipeline || "",
              images: meta.files || [],
            });
          } catch { /* skip failed fetches */ }
        }
        setProjects(projectsWithImages);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [pageSlug]);

  // One cover image per project (first image as representative)
  const projectCovers = projects
    .filter((p) => p.images.length > 0)
    .map((p) => ({
      ...p.images[0],
      dealId: p.deal_id,
      project: p.deal_name,
      builder: p.builder,
      region: stateToRegion[p.state] || "Unknown",
      city: p.city,
      state: p.state,
      imageCount: p.images.length,
    }));

  const filtered =
    active === "All"
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
      {/* Header + filters */}
      <div className="text-center">
        <h1>{heading}</h1>
        {description && (
          <p className="mx-auto mt-4 max-w-2xl text-text-body">{description}</p>
        )}

        {hasData && (
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

      {/* Loading state */}
      {loading && (
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="aspect-[4/3] animate-pulse rounded-lg bg-border-light/50" />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && !hasData && (
        <div className="mt-12 text-center">
          <p className="text-text-body">
            No projects assigned to this gallery yet.
          </p>
          <p className="mt-1 text-xs text-text-body/60">
            Use the admin toolbar to add projects.
          </p>
        </div>
      )}

      {/* Project grid — one cover image per project */}
      {!loading && hasData && (
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((cover) => (
            <button
              key={cover.dealId}
              onClick={() => setLightbox({ dealId: cover.dealId, imageIndex: 0 })}
              className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-bg-dark"
            >
              <Image
                src={cover.thumb_url || cover.url}
                alt={cover.description || `${cover.project} - ${cover.builder}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 flex flex-col items-start justify-end bg-gradient-to-t from-[#121212]/60 to-transparent p-5 opacity-0 transition-opacity group-hover:opacity-100">
                <span className="text-sm font-semibold text-text-light">
                  {cover.project}
                </span>
                <span className="mt-0.5 text-xs text-text-muted">
                  {cover.builder} | {cover.city}{cover.state ? `, ${cover.state}` : ""}
                </span>
              </div>
              <div className="absolute right-3 top-3 flex gap-1.5">
                <span className="rounded-full bg-bg-surface/90 px-3 py-1 text-xs font-medium text-text-body">
                  {cover.region}
                </span>
                {cover.imageCount > 1 && (
                  <span className="rounded-full bg-[#121212]/70 px-2.5 py-1 text-xs font-medium text-text-light backdrop-blur-sm">
                    {cover.imageCount} photos
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      {!loading && hasData && filtered.length === 0 && (
        <p className="mt-12 text-center text-text-body">
          No projects in this region yet.
        </p>
      )}

      {/* Project Lightbox */}
      {lightbox && (
        <ProjectLightbox
          dealId={lightbox.dealId}
          initialImageIndex={lightbox.imageIndex}
          onClose={() => setLightbox(null)}
        />
      )}
    </div>
  );
}
