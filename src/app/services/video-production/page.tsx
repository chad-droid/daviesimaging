import type { Metadata } from "next";
import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { DynamicImage } from "@/components/DynamicImage";
import { EditableHero } from "@/components/EditableHero";
import { EditableTextContent } from "@/components/EditableTextContent";
import { DarkSection } from "@/components/DarkSection";
import { JsonLd } from "@/components/JsonLd";
import { buildServiceSchema, buildBreadcrumbSchema } from "@/lib/seo";
import { ProductTags } from "@/components/ProductTags";

export const metadata: Metadata = {
  alternates: { canonical: "/services/video-production" },
  title: "Model Home and Community Video for Home Builders",
  description: "On-site, crew-based video of your model homes, amenities, and communities: community walkthroughs, lifestyle video, and brand films.",
};

const useCases = [
  {
    title: "Community Walkthroughs",
    body: "Guided tours of your community, amenities, and model homes for your website, sales center displays, and digital ads.",
  },
  {
    title: "Lifestyle Video",
    body: "Talent-driven video that connects your buyers to your community.",
  },
  {
    title: "Amenity Showcases",
    body: "Dedicated video for your pools, fitness centers, parks, and clubhouses.",
  },
  {
    title: "Brand Films",
    body: "Longer-form video for your website, sales presentations, and investor materials.",
  },
];

export default function VideoProductionPage() {
  return (
    <>
      <JsonLd
        data={buildServiceSchema({
          name: "Premium Video",
          description:
            "Crew-based video for homebuilders: community walkthroughs, lifestyle films, amenity showcases, and brand films.",
          path: "/services/video-production",
          serviceType: "Video Production",
        })}
      />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Solutions", path: "/services" },
          { name: "Video Production", path: "/services/video-production" },
        ])}
      />
      {/* Hero */}
      <DarkSection className="py-28 text-text-light">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <EditableHero
              slotId="services-video-production-hero"
              eyebrowDefault="Solutions / Premium Video"
              headlineDefault="Show your buyers what it feels like to <strong>live there</strong>."
              subheadDefault="On-site, crew-based video of your model homes, amenities, and communities, from the same team that photographs them."
            />
            <ProductTags line="Production" stage="Launch" />
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/contact"
                className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
              >
                Book a Strategy Call
              </Link>
              <Link
                href="/gallery/lifestyle"
                className="text-sm font-medium text-text-muted transition-colors hover:text-text-light"
              >
                See lifestyle work &rarr;
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </DarkSection>

      {/* What it is */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll>
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <EditableTextContent
                  slotId="services-video-production-what-it-is"
                  eyebrowDefault="Premium Video"
                  headlineDefault="One production day, for every channel <strong>you use</strong>."
                  bodyDefault="From one production day you get video formatted for your website, social media, email, and sales center displays."
                />
                <p className="mt-4 text-text-body">
                  This is our crew-based video service. For video of your spec homes and listings, see FrameFlow.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
                  >
                    Request a quote
                  </Link>
                  <Link
                    href="/services/virtual-video"
                    className="rounded-full border border-border-light px-5 py-2 text-sm font-medium text-text-body transition-colors hover:border-accent hover:text-accent"
                  >
                    Need listing video?
                  </Link>
                </div>
              </div>
              <div className="overflow-hidden rounded-2xl bg-bg-light">
                <DynamicImage
                  slotId="services-video-production-img"
                  className="h-full w-full"
                  fallbackClass="h-full w-full bg-gradient-to-br from-bg-surface to-border-light"
                  aspectRatio="16/9"
                />
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Use cases */}
      <section className="bg-bg-light py-24">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll>
            <div className="mb-12 text-center">
              <EditableTextContent
                slotId="services-video-production-use-cases"
                eyebrowDefault="Use Cases"
                headlineDefault="How builders use <strong>Premium Video</strong>."
                bodyDefault=""
              />
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {useCases.map((item, i) => (
                <div key={i} className="rounded-xl border border-border-light bg-bg-surface p-6">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="font-mono text-[10px] text-text-muted">0{i + 1}</span>
                    <h4 className="text-base font-semibold text-text-dark">{item.title}</h4>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-text-body">{item.body}</p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Vs virtual video */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <div className="text-center">
              <EditableTextContent
                slotId="services-video-production-which-video"
                eyebrowDefault="Premium Video or FrameFlow"
                headlineDefault="Which video do you <strong>need</strong>?"
                bodyDefault=""
              />
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border-2 border-accent p-6">
                <div className="mb-2 inline-flex rounded-full bg-accent/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-accent">This Page</div>
                <h4 className="text-base font-semibold text-text-dark">Premium Video</h4>
                <p className="mt-2 text-sm text-text-body">An on-site crew films your model homes, amenities, and community. Quoted by scope.</p>
                <p className="mt-3 text-xs text-text-muted">Best for: model home launches, lifestyle campaigns, brand films</p>
                <Link href="/contact" className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline">
                  Get a quote &rarr;
                </Link>
              </div>
              <div className="rounded-xl border border-border-light p-6">
                <h4 className="text-base font-semibold text-text-dark">FrameFlow</h4>
                <p className="mt-2 text-sm text-text-body">Video made from the photos you already have, ordered through digDesk.</p>
                <p className="mt-3 text-xs text-text-muted">Best for: spec homes, listings, and standing inventory</p>
                <Link href="/services/virtual-video" className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline">
                  See FrameFlow &rarr;
                </Link>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Final CTA */}
      <DarkSection className="py-24 text-text-light">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <EditableTextContent
              slotId="services-video-production-cta"
              headlineDefault="Ready to film your <strong>next community</strong>?"
              bodyDefault="Premium Video is quoted by scope, location, and deliverables. Start with a strategy call."
              dark={true}
            />
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
              >
                Book a Strategy Call
              </Link>
              <Link
                href="/gallery/lifestyle"
                className="text-sm font-medium text-text-muted transition-colors hover:text-text-light"
              >
                View lifestyle work &rarr;
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </DarkSection>
    </>
  );
}
