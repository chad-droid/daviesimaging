import type { Metadata } from "next";
import { DynamicGallery } from "@/components/DynamicGallery";

export const metadata: Metadata = {
  title: "Premium Photo | Davies Imaging Group",
  description: "Full-service lifestyle and model home photography for major builder launches. Browse our work by region.",
};

export default function PremiumPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-24">
      <DynamicGallery
        pageSlug="/services/premium"
        heading="Premium Photo"
        description="Full-service lifestyle and model home photography across markets nationwide. Built for builders who demand the best."
      />
    </div>
  );
}
