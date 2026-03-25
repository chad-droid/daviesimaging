import type { Metadata } from "next";
import { GalleryGrid } from "@/components/GalleryGrid";
import type { GalleryItem } from "@/components/GalleryGrid";

export const metadata: Metadata = {
  title: "Amenities | Davies Imaging Group",
  description:
    "Community amenity photography that showcases pools, clubhouses, trails, and lifestyle spaces builders invest in.",
};

const items: GalleryItem[] = [
  { id: "am-1", title: "Resort Pool Complex", region: "West", tags: ["Lifestyle"] },
  { id: "am-2", title: "Community Clubhouse", region: "Central", tags: ["Premium"] },
  { id: "am-3", title: "Fitness Center", region: "East", tags: ["Lifestyle"] },
  { id: "am-4", title: "Trail System & Parks", region: "Mountain", tags: ["Aerial"] },
  { id: "am-5", title: "Splash Pad & Play Areas", region: "Central", tags: ["Lifestyle"] },
  { id: "am-6", title: "Golf Course Pavilion", region: "East", tags: ["Premium"] },
  { id: "am-7", title: "Lake & Dock Access", region: "Mountain", tags: ["Aerial", "Lifestyle"] },
  { id: "am-8", title: "Outdoor Kitchen Village", region: "West", tags: ["Premium"] },
  { id: "am-9", title: "Dog Park & Commons", region: "Central", tags: ["Lifestyle"] },
];

export default function AmenitiesPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-24">
      <GalleryGrid
        heading="Amenities"
        description="Community amenities are a builder's biggest differentiator. We capture them in a way that drives buyer connection."
        items={items}
      />
    </div>
  );
}
