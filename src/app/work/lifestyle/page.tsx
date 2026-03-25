import type { Metadata } from "next";
import { GalleryGrid } from "@/components/GalleryGrid";
import type { GalleryItem } from "@/components/GalleryGrid";

export const metadata: Metadata = {
  title: "Lifestyle | Davies Imaging Group",
  description:
    "Lifestyle photography that captures how buyers actually live in a home. Talent, styling, and storytelling built for builder marketing.",
};

const items: GalleryItem[] = [
  { id: "ls-1", title: "Family Kitchen Morning", region: "Central", tags: ["Premium", "Talent"] },
  { id: "ls-2", title: "Backyard Entertaining", region: "West", tags: ["Lifestyle", "Talent"] },
  { id: "ls-3", title: "Master Suite Retreat", region: "East", tags: ["Premium"] },
  { id: "ls-4", title: "Outdoor Living Room", region: "Mountain", tags: ["Lifestyle"] },
  { id: "ls-5", title: "Morning Coffee on Patio", region: "Central", tags: ["Talent"] },
  { id: "ls-6", title: "Kids Playroom Story", region: "East", tags: ["Lifestyle", "Talent"] },
  { id: "ls-7", title: "Home Office Lifestyle", region: "West", tags: ["Premium"] },
  { id: "ls-8", title: "Firepit Gathering", region: "Mountain", tags: ["Lifestyle", "Talent"] },
  { id: "ls-9", title: "Holiday Entertaining", region: "Central", tags: ["Premium", "Talent"] },
];

export default function LifestylePage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-24">
      <GalleryGrid
        heading="Lifestyle"
        description="Lifestyle photography brings homes to life. Real moments, real emotion, built for builder marketing teams that want buyers to feel something."
        items={items}
      />
    </div>
  );
}
