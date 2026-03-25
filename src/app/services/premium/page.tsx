import type { Metadata } from "next";
import { GalleryGrid } from "@/components/GalleryGrid";
import type { GalleryItem } from "@/components/GalleryGrid";

export const metadata: Metadata = {
  title: "Premium Photo | Davies Imaging Group",
  description:
    "Full-service lifestyle and model home photography for major builder launches. Browse our work by region.",
};

const items: GalleryItem[] = [
  { id: "pr-1", title: "Grand Opening Shoot", region: "Central", tags: ["Model Home", "Lifestyle"] },
  { id: "pr-2", title: "Coastal Modern Collection", region: "West", tags: ["Model Home"] },
  { id: "pr-3", title: "Mountain Lodge Series", region: "Mountain", tags: ["Lifestyle", "Amenities"] },
  { id: "pr-4", title: "Southern Estate Feature", region: "East", tags: ["Model Home", "Lifestyle"] },
  { id: "pr-5", title: "Hill Country Showcase", region: "Central", tags: ["Model Home"] },
  { id: "pr-6", title: "Pacific Northwest Launch", region: "West", tags: ["Lifestyle"] },
  { id: "pr-7", title: "Ski Community Resort", region: "Mountain", tags: ["Amenities"] },
  { id: "pr-8", title: "Lowcountry Living Feature", region: "East", tags: ["Lifestyle", "Model Home"] },
  { id: "pr-9", title: "Ranch Collection", region: "Central", tags: ["Model Home", "Lifestyle"] },
  { id: "pr-10", title: "Desert Contemporary", region: "West", tags: ["Model Home"] },
  { id: "pr-11", title: "Rocky Mountain Modern", region: "Mountain", tags: ["Lifestyle"] },
  { id: "pr-12", title: "Chesapeake Bay Series", region: "East", tags: ["Model Home", "Amenities"] },
];

export default function PremiumPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-24">
      <GalleryGrid
        heading="Premium Photo"
        description="Full-service lifestyle and model home photography across markets nationwide. Built for builders who demand the best."
        items={items}
      />
    </div>
  );
}
