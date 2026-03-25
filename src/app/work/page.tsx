"use client";

import { useState } from "react";

const regions = ["All", "West", "Mountain", "Central", "East"] as const;
const categories = ["All", "Model Homes", "Amenities", "Spec Homes", "Lifestyle", "Premium"] as const;

type Region = (typeof regions)[number];
type Category = (typeof categories)[number];

interface PortfolioItem {
  id: string;
  title: string;
  region: Exclude<Region, "All">;
  category: Exclude<Category, "All">;
  tags?: string[];
}

const items: PortfolioItem[] = [
  // Model Homes
  { id: "mh-1", title: "Lakewood Reserve Model", region: "Central", category: "Model Homes", tags: ["Lifestyle", "Premium"] },
  { id: "mh-2", title: "Coastal Bluff Showpiece", region: "West", category: "Model Homes", tags: ["Premium"] },
  { id: "mh-3", title: "Summit Ridge Grand", region: "Mountain", category: "Model Homes", tags: ["Lifestyle"] },
  { id: "mh-4", title: "Magnolia Estates Model", region: "East", category: "Model Homes", tags: ["Premium", "Staging"] },
  { id: "mh-5", title: "Desert View Collection", region: "West", category: "Model Homes", tags: ["Lifestyle"] },
  { id: "mh-6", title: "Brookhaven Manor", region: "Central", category: "Model Homes", tags: ["Premium"] },
  // Amenities
  { id: "am-1", title: "Resort Pool Complex", region: "West", category: "Amenities", tags: ["Lifestyle"] },
  { id: "am-2", title: "Community Clubhouse", region: "Central", category: "Amenities", tags: ["Premium"] },
  { id: "am-3", title: "Fitness Center", region: "East", category: "Amenities", tags: ["Lifestyle"] },
  { id: "am-4", title: "Trail System & Parks", region: "Mountain", category: "Amenities", tags: ["Aerial"] },
  { id: "am-5", title: "Splash Pad & Play Areas", region: "Central", category: "Amenities", tags: ["Lifestyle"] },
  { id: "am-6", title: "Outdoor Kitchen Village", region: "West", category: "Amenities", tags: ["Premium"] },
  // Spec Homes
  { id: "sp-1", title: "Quick Move-In Colonial", region: "East", category: "Spec Homes", tags: ["Spec+", "Virtual Staging"] },
  { id: "sp-2", title: "Standing Inventory Ranch", region: "Central", category: "Spec Homes", tags: ["Spec+"] },
  { id: "sp-3", title: "Move-In Ready Modern", region: "West", category: "Spec Homes", tags: ["Virtual Video"] },
  { id: "sp-4", title: "Inventory Townhome", region: "Mountain", category: "Spec Homes", tags: ["Spec+", "Virtual Staging"] },
  { id: "sp-5", title: "QMI Close Kit Package", region: "Central", category: "Spec Homes", tags: ["Spec+"] },
  { id: "sp-6", title: "Desert Spec Listing", region: "West", category: "Spec Homes", tags: ["Spec+", "Virtual Video"] },
  // Lifestyle
  { id: "ls-1", title: "Family Kitchen Morning", region: "Central", category: "Lifestyle", tags: ["Premium", "Talent"] },
  { id: "ls-2", title: "Backyard Entertaining", region: "West", category: "Lifestyle", tags: ["Lifestyle", "Talent"] },
  { id: "ls-3", title: "Master Suite Retreat", region: "East", category: "Lifestyle", tags: ["Premium"] },
  { id: "ls-4", title: "Outdoor Living Room", region: "Mountain", category: "Lifestyle", tags: ["Lifestyle"] },
  { id: "ls-5", title: "Morning Coffee on Patio", region: "Central", category: "Lifestyle", tags: ["Talent"] },
  { id: "ls-6", title: "Firepit Gathering", region: "Mountain", category: "Lifestyle", tags: ["Lifestyle", "Talent"] },
  // Premium
  { id: "pr-1", title: "Grand Opening Shoot", region: "Central", category: "Premium", tags: ["Model Home", "Lifestyle"] },
  { id: "pr-2", title: "Coastal Modern Collection", region: "West", category: "Premium", tags: ["Model Home"] },
  { id: "pr-3", title: "Mountain Lodge Series", region: "Mountain", category: "Premium", tags: ["Lifestyle", "Amenities"] },
  { id: "pr-4", title: "Southern Estate Feature", region: "East", category: "Premium", tags: ["Model Home", "Lifestyle"] },
  { id: "pr-5", title: "Hill Country Showcase", region: "Central", category: "Premium", tags: ["Model Home"] },
  { id: "pr-6", title: "Pacific Northwest Launch", region: "West", category: "Premium", tags: ["Lifestyle"] },
];

export default function WorkPage() {
  const [activeRegion, setActiveRegion] = useState<Region>("All");
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filtered = items.filter((item) => {
    const regionMatch = activeRegion === "All" || item.region === activeRegion;
    const categoryMatch = activeCategory === "All" || item.category === activeCategory;
    return regionMatch && categoryMatch;
  });

  return (
    <div className="mx-auto max-w-7xl px-6 py-24">
      <div className="text-center">
        <h1>Our Work</h1>
        <p className="mx-auto mt-4 max-w-2xl text-zinc-600">
          Browse our full portfolio across every category and region. Each
          project is built to drive results for builder marketing teams.
        </p>
      </div>

      {/* Filters */}
      <div className="mt-10 space-y-4">
        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`cta-button rounded-full px-5 py-2 transition-colors ${
                activeCategory === cat
                  ? "bg-zinc-900 text-white"
                  : "border border-zinc-200 text-zinc-600 hover:border-zinc-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Region filter */}
        <div className="flex flex-wrap justify-center gap-2">
          {regions.map((region) => (
            <button
              key={region}
              type="button"
              onClick={() => setActiveRegion(region)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-widest transition-colors ${
                activeRegion === region
                  ? "bg-zinc-700 text-white"
                  : "border border-zinc-200 text-zinc-500 hover:border-zinc-400"
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
            className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-gradient-to-br from-zinc-200 to-zinc-300"
          >
            <div className="absolute inset-0 flex flex-col items-start justify-end bg-gradient-to-t from-black/50 to-transparent p-6 opacity-0 transition-opacity group-hover:opacity-100">
              <span className="text-sm font-semibold text-white">
                {item.title}
              </span>
              {item.tags && (
                <div className="mt-1.5 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/20 px-2.5 py-0.5 text-xs text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            {/* Badges */}
            <div className="absolute right-3 top-3 flex gap-1.5">
              <span className="meta-text rounded-full bg-white/90 px-3 py-1 text-xs">
                {item.region}
              </span>
              <span className="meta-text rounded-full bg-zinc-900/80 px-3 py-1 text-xs text-white">
                {item.category}
              </span>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-zinc-400">
          No projects match these filters. Try a different combination.
        </p>
      )}
    </div>
  );
}
