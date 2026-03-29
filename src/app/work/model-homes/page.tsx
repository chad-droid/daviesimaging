import type { Metadata } from "next";
import { DynamicGallery } from "@/components/DynamicGallery";

export const metadata: Metadata = {
  title: "Model Homes | Davies Imaging Group",
  description: "Full-service model home photography across markets nationwide. Lifestyle, staging, and architectural visuals built to sell.",
};

export default function ModelHomesPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-24">
      <DynamicGallery
        pageSlug="/work/model-homes"
        heading="Model Homes"
        description="Lifestyle and architectural photography that tells the story of every model home, from grand opening to lasting impression."
      />
    </div>
  );
}
