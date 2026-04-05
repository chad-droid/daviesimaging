import type { Metadata } from "next";
import Link from "next/link";
import { DynamicGallery } from "@/components/DynamicGallery";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";
import { EditableContent } from "@/components/EditableContent";
import { DynamicImage } from "@/components/DynamicImage";

export const metadata: Metadata = {
  title: "Lifestyle | Davies Imaging Group",
  description: "Lifestyle photography that captures how buyers actually live in a home. Talent, styling, and storytelling built for builder marketing.",
};

const otherWork = [
  { label: "Model Homes", href: "/gallery/models" },
  { label: "Amenities", href: "/gallery/amenities" },
  { label: "Spec Homes", href: "/gallery/listings" },
];

export default function LifestylePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-bg-dark py-28 text-text-light">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <Eyebrow dark>Gallery / Lifestyle</Eyebrow>
            <EditableContent
              slotId="gallery-lifestyle-hero"
              fields={[
                { key: "headline", label: "Headline", type: "textarea" as const, defaultValue: "Buyers buy feelings. <strong>Give them something to feel</strong>." },
                { key: "subhead", label: "Subhead", type: "textarea" as const, defaultValue: "Lifestyle photography brings homes to life. Real moments, real emotion, built for builder marketing teams that want buyers to feel something before the first visit." },
              ]}
            >
              {(v) => (
                <>
                  <h1 className="text-text-light" dangerouslySetInnerHTML={{ __html: v.headline }} />
                  <p className="mt-6 max-w-2xl text-xl leading-relaxed text-text-muted">{v.subhead}</p>
                </>
              )}
            </EditableContent>
          </RevealOnScroll>
          <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-2xl bg-bg-light">
            <DynamicImage
              slotId="gallery-lifestyle-hero-img"
              className="h-full w-full object-cover"
              fallbackClass="h-full w-full"
            />
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <RevealOnScroll>
            <DynamicGallery
              pageSlug="/gallery/lifestyle"
              heading=""
              description=""
            />
          </RevealOnScroll>
        </div>
      </section>

      {/* Context section */}
      <section className="bg-bg-light py-24">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
              <div className="pt-1">
                <Eyebrow>Photo + Video</Eyebrow>
                <h2 className="mt-3">
                  Lifestyle covers both <strong>photo and video</strong>.
                </h2>
              </div>
              <div className="space-y-4 text-[1.0625rem] leading-relaxed text-text-body">
                <p>
                  Lifestyle is a primary output of two DIG services: Premium photography and Video Production. Both appear in this gallery because both serve the same purpose: connecting buyers emotionally to a community before a physical visit ever happens.
                </p>
                <p>
                  Lifestyle shoots involve talent, styling, and real-moment direction. The goal is not staged perfection. It is authentic energy that communicates what it actually feels like to live in a home. That distinction is what makes lifestyle content outperform architecture-only photography in paid media and website conversion.
                </p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* CTA section */}
      <section className="bg-bg-dark py-24 text-text-light">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <Eyebrow dark>Lifestyle and Video</Eyebrow>
            <h2 className="text-text-light">
              DIG Premium includes lifestyle photography. DIG Video Production captures the full community <strong>story on film</strong>.
            </h2>
            <p className="mt-5 text-text-muted">
              Both are delivered to your marketing team, ready to deploy across website, paid media, email, and sales center.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/services/video-production"
                className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
              >
                Explore Video Production
              </Link>
              <Link
                href="/services/premium"
                className="rounded-full border border-white/20 px-8 py-3 text-sm font-semibold text-text-muted transition-colors hover:border-accent hover:text-accent"
              >
                Explore Premium Photo
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium text-text-muted transition-colors hover:text-text-light"
              >
                Book a strategy call &rarr;
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
