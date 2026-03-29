import type { Metadata } from "next";
import { DynamicGallery } from "@/components/DynamicGallery";

export const metadata: Metadata = {
  title: "Amenities | Davies Imaging Group",
  description: "Community amenity photography that showcases pools, clubhouses, trails, and lifestyle spaces builders invest in.",
};

export default function AmenitiesPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-24">
      <DynamicGallery
        pageSlug="/work/amenities"
        heading="Amenities"
        description="Community amenities are a builder's biggest differentiator. We capture them in a way that drives buyer connection."
      />
    </div>
  );
}
