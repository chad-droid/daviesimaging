import type { Metadata } from "next";
import { DynamicGallery } from "@/components/DynamicGallery";

export const metadata: Metadata = {
  title: "Lifestyle | Davies Imaging Group",
  description: "Lifestyle photography that captures how buyers actually live in a home. Talent, styling, and storytelling built for builder marketing.",
};

export default function LifestylePage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-24">
      <DynamicGallery
        pageSlug="/work/lifestyle"
        heading="Lifestyle"
        description="Lifestyle photography brings homes to life. Real moments, real emotion, built for builder marketing teams that want buyers to feel something."
      />
    </div>
  );
}
