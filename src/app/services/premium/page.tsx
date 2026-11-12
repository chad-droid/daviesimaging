import type { Metadata } from "next";
import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { DynamicImage } from "@/components/DynamicImage";
import { EditableHero } from "@/components/EditableHero";
import { EditableTextContent } from "@/components/EditableTextContent";
import { DarkSection } from "@/components/DarkSection";
import { JsonLd } from "@/components/JsonLd";
import { buildServiceSchema, buildBreadcrumbSchema } from "@/lib/seo";
import { TestimonialBand } from "@/components/TestimonialBand";
import { ProductTags } from "@/components/ProductTags";

export const metadata: Metadata = {
  alternates: { canonical: "/services/premium" },
  title: "Premium Photography",
  description: "Model home, amenity, and lifestyle photography for homebuilders, from a national network of highly trained photographers in 28 U.S. markets.",
};

const shootTypes = [
  {
    number: "01",
    title: "Model Home Photography",
    detail: "Room-by-room coverage of your furnished interiors, architectural detail, twilight exteriors, and finish work, planned in advance and shot when your model opens.",
    gallery: { label: "See Model Home Work", href: "/gallery/models" },
  },
  {
    number: "02",
    title: "Amenity Photography",
    detail: "Your pools, clubhouses, fitness centers, trails, and parks, scheduled independently from your model home shoots.",
    gallery: { label: "See Amenity Work", href: "/gallery/amenities" },
  },
  {
    number: "03",
    title: "Lifestyle Photography",
    detail: "Talent-driven photography that shows your buyers how they'll live in the community. Our production team handles casting, styling, and art direction.",
    gallery: { label: "See Lifestyle Work", href: "/gallery/lifestyle" },
  },
];

const useCases = [
  {
    number: "01",
    title: "Model home grand opening",
    body: "The first photos of your model set the standard for every spec and listing that follows.",
  },
  {
    number: "02",
    title: "Amenity and community reveals",
    body: "Your pools, clubhouses, and green spaces get their own shoot, so your buyers see the community as well as the floor plan.",
  },
  {
    number: "03",
    title: "Lifestyle campaigns",
    body: "Talent and styling for buyers who want to see themselves in your community.",
  },
  {
    number: "04",
    title: "Regional rollouts and brand photography",
    body: "Launching multiple communities across markets? We coordinate your Premium shoots across all four U.S. regions with one account team.",
  },
];

const galleryLinks = [
  { label: "Model Gallery", href: "/gallery/models" },
  { label: "Amenities Gallery", href: "/gallery/amenities" },
  { label: "Lifestyle Gallery", href: "/gallery/lifestyle" },
];

export default function PremiumPage() {
  return (
    <>
      <JsonLd
        data={buildServiceSchema({
          name: "Premium Photography",
          description:
            "Model home, amenity, and lifestyle photography for homebuilders, from a national network of highly trained photographers in 28 U.S. markets.",
          path: "/services/premium",
          serviceType: "Photography",
        })}
      />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Solutions", path: "/services" },
          { name: "Premium Photography", path: "/services/premium" },
        ])}
      />
      {/* Hero */}
      <DarkSection className="min-h-[60vh] py-28 text-text-light">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <EditableHero
              slotId="services-premium-hero"
              eyebrowDefault="Solutions / Premium Photography"
              headlineDefault="Showcase your new model park at its <strong>best</strong>."
              subheadDefault="You get a national network of highly trained professional photographers, and the best model home photography, video, and Matterport services available to the industry."
            />
            <ProductTags line="Production" stage="Launch" />
            <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
              <Link
                href="/contact"
                className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
              >
                Book a Strategy Call
              </Link>
              {/* Gallery browse pills */}
              <div className="flex flex-wrap gap-2">
                {galleryLinks.map((g) => (
                  <Link
                    key={g.href}
                    href={g.href}
                    className="rounded-full border border-white/20 px-3.5 py-1 text-xs font-medium text-white/70 transition-colors hover:border-white/60 hover:text-white"
                  >
                    {g.label} &rarr;
                  </Link>
                ))}
              </div>
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
                  slotId="services-premium-signature"
                  eyebrowDefault="Signature Service"
                  headlineDefault="Your model is a <strong>sales tool</strong>."
                  bodyDefault="A model home is a big investment in merchandising and design. The photography is how most of your buyers see that investment first, and it should help them picture living there."
                />
                <p className="mt-4 text-text-body">
                  Every Premium shoot is planned in advance and coordinated with your on-site construction and sales teams, so your marketing team does not need to be at the shoot.
                </p>
              </div>
              <div className="overflow-hidden rounded-2xl bg-bg-light">
                <DynamicImage
                  slotId="services-premium-img"
                  className="h-full w-full"
                  fallbackClass="h-full w-full bg-gradient-to-br from-bg-surface to-border-light"
                  aspectRatio="4/3"
                />
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Shoot Types */}
      <section className="bg-bg-light py-24">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll>
            <div className="mb-12 text-center">
              <EditableTextContent
                slotId="services-premium-shoot-types"
                eyebrowDefault="What You're Booking"
                headlineDefault="Order the shoot you <strong>need</strong>."
                bodyDefault="You order model home, amenity, and lifestyle shoots separately, each scoped and scheduled for its subject."
              />
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {shootTypes.map((type) => (
                <div key={type.number} className="flex flex-col rounded-xl border border-border-light bg-bg-surface p-6">
                  <span className="font-mono text-[10px] text-text-muted">{type.number}</span>
                  <h4 className="mt-2 text-base font-semibold text-text-dark">{type.title}</h4>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-text-body">{type.detail}</p>
                  <Link
                    href={type.gallery.href}
                    className="mt-5 inline-flex items-center gap-1 text-xs font-medium text-accent transition-colors hover:underline"
                  >
                    {type.gallery.label} &rarr;
                  </Link>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Use cases */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll>
            <div className="mb-12 text-center">
              <EditableTextContent
                slotId="services-premium-use-cases"
                eyebrowDefault="How Builders Use It"
                headlineDefault="When builders order <strong>Premium</strong>."
                bodyDefault=""
              />
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {useCases.map((item) => (
                <div key={item.number} className="rounded-xl border border-border-light bg-bg-surface p-6">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="font-mono text-[10px] text-text-muted">{item.number}</span>
                    <h4 className="text-base font-semibold text-text-dark">{item.title}</h4>
                  </div>
                  <p className="text-sm leading-relaxed text-text-body">{item.body}</p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Amenities callout */}
      <section className="bg-bg-light py-24">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll>
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              {/* Image placeholder */}
              <div className="overflow-hidden rounded-2xl bg-bg-surface">
                <DynamicImage
                  slotId="services-premium-amenities-img"
                  className="h-full w-full"
                  fallbackClass="h-full w-full bg-gradient-to-br from-border-light to-bg-light"
                  aspectRatio="4/3"
                />
              </div>
              {/* Copy */}
              <div>
                <EditableTextContent
                  slotId="services-premium-amenities"
                  eyebrowDefault="Amenity Photography"
                  headlineDefault="Your amenities get their <strong>own shoot</strong>."
                  bodyDefault="Your buyers choose a community as much as they choose a floor plan. The pool deck, the clubhouse, the trail system, and the fitness center are part of what they are buying."
                />
                <p className="mt-4 text-text-body">
                  We plan and light your amenities with the same care as your model home interiors, for images you can use on your website, in paid social, and in your sales center.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/gallery/amenities"
                    className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
                  >
                    See amenity work
                  </Link>
                  <Link
                    href="/contact"
                    className="rounded-full border border-border-light px-5 py-2 text-sm font-medium text-text-body transition-colors hover:border-accent hover:text-accent"
                  >
                    Plan your shoot
                  </Link>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Lifestyle callout */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <div className="rounded-2xl border border-border-light bg-bg-surface p-8 lg:p-12">
              <EditableTextContent
                slotId="services-premium-lifestyle"
                eyebrowDefault="Lifestyle Photography"
                headlineDefault="Show your buyers what life looks like in <strong>your community</strong>."
                bodyDefault="Lifestyle photography uses talent and styling to connect your buyers to your community before they ever visit. Use it on your website, on social, and in your sales center."
              />
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/gallery/lifestyle"
                  className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
                >
                  See lifestyle gallery
                </Link>
                <Link
                  href="/services/video-production"
                  className="rounded-full border border-border-light px-5 py-2 text-sm font-medium text-text-body transition-colors hover:border-accent hover:text-accent"
                >
                  Add lifestyle video
                </Link>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Regional coverage */}
      <DarkSection className="py-24 text-text-light">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
              <div className="pt-1">
                <EditableTextContent
                  slotId="services-premium-regional"
                  eyebrowDefault="Regional Coverage"
                  headlineDefault="The same quality in every market <strong>you build in</strong>."
                  bodyDefault=""
                  dark={true}
                />
              </div>
              <div className="space-y-5 text-[1.0625rem] leading-relaxed text-text-muted">
                <p>
                  You get the same process and the same delivery standard whether you&apos;re launching in California, Texas, Florida, or Colorado. Our photographers are already operating in 28 U.S. markets. If you build in a smaller market, we will onboard a qualified professional trained on our standards in weeks.
                </p>
                <p>
                  Running multiple launches at once? Regional Partnerships give you dedicated capacity, volume pricing, and a single account team across all four U.S. regions.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <Link
                    href="/programs/regional-partnerships"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
                  >
                    Explore Regional Partnerships &rarr;
                  </Link>
                  <Link
                    href="/markets/region"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-text-muted transition-colors hover:text-text-light"
                  >
                    See all 28 markets &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </DarkSection>

      {/* Customer proof */}
      <TestimonialBand ids={["sarah-handoff", "angela-hooked"]} />

      {/* Final CTA */}
      <DarkSection className="py-24 text-text-light">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <div className="text-center">
              <EditableTextContent
                slotId="services-premium-cta"
                eyebrowDefault="Browse the Work"
                headlineDefault="Model home photography starts at <strong>$4,000</strong>."
                bodyDefault="Against $60k to $100k in merchandising, that's 5% to 10% to make sure your investment is properly communicated everywhere it shows up."
                dark={true}
              />
              {/* Gallery pill links */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                {galleryLinks.map((g) => (
                  <Link
                    key={g.href}
                    href={g.href}
                    className="rounded-full border border-white/20 px-5 py-2 text-sm font-medium text-white/70 transition-colors hover:border-white/60 hover:text-white"
                  >
                    {g.label} &rarr;
                  </Link>
                ))}
              </div>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
                >
                  Book a Strategy Call
                </Link>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </DarkSection>
    </>
  );
}
