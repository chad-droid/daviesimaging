"use client";

import { useState } from "react";

const regions = ["All", "West", "Mountain", "Central", "East"] as const;
type Region = (typeof regions)[number];

export interface GalleryItem {
  id: string;
  title: string;
  region: Exclude<Region, "All">;
  tags?: string[];
}

interface GalleryGridProps {
  items: GalleryItem[];
  heading: string;
  description?: string;
}

export function GalleryGrid({ items, heading, description }: GalleryGridProps) {
  const [active, setActive] = useState<Region>("All");

  const filtered =
    active === "All" ? items : items.filter((item) => item.region === active);

  return (
    <div>
      {/* Header + filters */}
      <div className="text-center">
        <h1>{heading}</h1>
        {description && (
          <p className="mx-auto mt-4 max-w-2xl text-text-body">{description}</p>
        )}

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {regions.map((region) => (
            <button
              key={region}
              type="button"
              onClick={() => setActive(region)}
              className={`cta-button rounded-full px-5 py-2 transition-colors ${
                active === region
                  ? "bg-bg-dark text-text-light"
                  : "border border-border-light text-text-body hover:border-accent-secondary"
              }`}
            >
              {region}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-gradient-to-br from-bg-light to-border-light"
          >
            {/* Replace with <Image> when real assets are ready */}
            <div className="absolute inset-0 flex flex-col items-start justify-end bg-gradient-to-t from-[#121212]/50 to-transparent p-6 opacity-0 transition-opacity group-hover:opacity-100">
              <span className="text-sm font-semibold text-text-light">
                {item.title}
              </span>
              {item.tags && (
                <div className="mt-1.5 flex gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-bg-surface/20 px-2.5 py-0.5 text-xs text-text-light"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            {/* Always-visible region badge */}
            <div className="absolute right-3 top-3">
              <span className="meta-text rounded-full bg-bg-surface/90 px-3 py-1 text-xs">
                {item.region}
              </span>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-accent-secondary">
          No projects in this region yet. Check back soon.
        </p>
      )}
    </div>
  );
}
