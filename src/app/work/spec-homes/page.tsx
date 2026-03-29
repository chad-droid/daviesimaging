import type { Metadata } from "next";
import Link from "next/link";
import { DynamicGallery } from "@/components/DynamicGallery";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";

export const metadata: Metadata = {
  title: "Spec Homes | Davies Imaging Group",
  description: "Fast-turn photography, virtual staging, and virtual video for spec homes and standing inventory. Built to move homes faster.",
};

export default function SpecHomesPage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-6 py-24">
        <DynamicGallery
          pageSlug="/work/spec-homes"
          heading="Spec Homes"
          description="Standing inventory needs to move fast. Our Spec+ packages deliver photography, virtual staging, and virtual video in one streamlined order."
        />
      </div>

      <section className="flex min-h-[60vh] items-center bg-bg-dark py-24 text-text-light">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <Eyebrow>Spec+</Eyebrow>
            <h2 className="text-text-light">
              One order. Listing photo, staging, and video{" "}
              <strong>delivered</strong>.
            </h2>
            <p className="mt-5 text-text-muted">
              Spec+ bundles everything your listing needs into a single order
              through FrameFlow. Stop managing multiple vendors. Start moving
              homes faster.
            </p>
            <Link
              href="/offerings/spec-plus"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-text-light transition-colors hover:text-accent-dark-hover"
            >
              Learn about Spec+ <span aria-hidden="true">&rarr;</span>
            </Link>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
