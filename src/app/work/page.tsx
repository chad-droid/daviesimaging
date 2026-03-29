"use client";

import { DynamicGallery } from "@/components/DynamicGallery";

export default function WorkPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-24">
      <DynamicGallery
        pageSlug="/work"
        heading="Our Work"
        description="Browse our full portfolio across every category and region. Each project is built to drive results for builder marketing teams."
      />
    </div>
  );
}
