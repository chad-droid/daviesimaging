import type { Metadata } from "next";
import { GalleryGrid } from "@/components/GalleryGrid";
import type { GalleryItem } from "@/components/GalleryGrid";

export const metadata: Metadata = {
  title: "Model Homes | Davies Imaging Group",
  description:
    "Full-service model home photography across markets nationwide. Lifestyle, staging, and architectural visuals built to sell.",
};

const items: GalleryItem[] = [
  { id: "mh-1", title: "Lakewood Reserve Model", region: "Central", tags: ["Lifestyle", "Premium"] },
  { id: "mh-2", title: "Coastal Bluff Showpiece", region: "West", tags: ["Premium"] },
  { id: "mh-3", title: "Summit Ridge Grand", region: "Mountain", tags: ["Lifestyle"] },
  { id: "mh-4", title: "Magnolia Estates Model", region: "East", tags: ["Premium", "Staging"] },
  { id: "mh-5", title: "Desert View Collection", region: "West", tags: ["Lifestyle"] },
  { id: "mh-6", title: "Brookhaven Manor", region: "Central", tags: ["Premium"] },
  { id: "mh-7", title: "Aspen Highlands Model", region: "Mountain", tags: ["Staging"] },
  { id: "mh-8", title: "Heritage Oaks Showcase", region: "East", tags: ["Lifestyle", "Premium"] },
  { id: "mh-9", title: "Canyon Creek Estate", region: "West", tags: ["Premium"] },
];

export default function ModelHomesPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-24">
      <GalleryGrid
        heading="Model Homes"
        description="Lifestyle and architectural photography that tells the story of every model home, from grand opening to lasting impression."
        items={items}
      />
    </div>
  );
}
