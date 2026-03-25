import type { Metadata } from "next";
import { GalleryGrid } from "@/components/GalleryGrid";
import type { GalleryItem } from "@/components/GalleryGrid";

export const metadata: Metadata = {
  title: "Spec Homes | Davies Imaging Group",
  description:
    "Fast-turn photography, virtual staging, and virtual video for spec homes and standing inventory. Built to move homes faster.",
};

const items: GalleryItem[] = [
  { id: "sp-1", title: "Quick Move-In Colonial", region: "East", tags: ["Spec+", "Virtual Staging"] },
  { id: "sp-2", title: "Standing Inventory Ranch", region: "Central", tags: ["Spec+"] },
  { id: "sp-3", title: "Move-In Ready Modern", region: "West", tags: ["Virtual Video"] },
  { id: "sp-4", title: "Inventory Townhome", region: "Mountain", tags: ["Spec+", "Virtual Staging"] },
  { id: "sp-5", title: "QMI Close Kit Package", region: "Central", tags: ["Spec+"] },
  { id: "sp-6", title: "Spec Home Refresh", region: "East", tags: ["Virtual Staging"] },
  { id: "sp-7", title: "Desert Spec Listing", region: "West", tags: ["Spec+", "Virtual Video"] },
  { id: "sp-8", title: "Mountain View Inventory", region: "Mountain", tags: ["Spec+"] },
  { id: "sp-9", title: "Lakefront QMI", region: "Central", tags: ["Virtual Staging", "Virtual Video"] },
];

export default function SpecHomesPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-24">
      <GalleryGrid
        heading="Spec Homes"
        description="Standing inventory needs to move fast. Our Spec+ packages deliver photography, virtual staging, and virtual video in one streamlined order."
        items={items}
      />
    </div>
  );
}
