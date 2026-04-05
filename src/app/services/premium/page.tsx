import type { Metadata } from "next";
import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";
import { DynamicImage } from "@/components/DynamicImage";
import { EditableHero } from "@/components/EditableHero";
import { EditableTextContent } from "@/components/EditableTextContent";
import { DarkSection } from "@/components/DarkSection";

export const metadata: Metadata = {
  title: "Premium Photography | Davies Imaging Group",
  description: "Full-service model home, amenity, and lifestyle photography for homebuilders. DIG's signature service across 28 U.S. markets.",
};

const shootTypes = [
  {
    number: "01",
    title: "Model Home Photography",
    detail: "Room-by-room coverage of furnished interiors, architectural detail, twilight exteriors, and detail and finish work. Planned in advance, executed at launch, delivered as a complete publish-ready package.",
    gallery: { label: "See Model Home Work", href: "/gallery/models" },
  },
  {
    number: "02",
    title: "Amenity Photography",
    detail: "Pools, clubhouses, fitness centers, trails, and parks photographed to show buyers the life waiting for them. Scheduled independently from model home shoots — amenities deserve their own day.",
    gallery: { label: "See Amenity Work", href: "/gallery/amenities" },
  },
  {
    number: "03",
    title: "Lifestyle Photography",
    detail: "Talent-driven photography that shows buyers how they'll live in the community, not just what it looks like. Casting, styling, and art direction handled by DIG's production team.",
    gallery: { label: "See Lifestyle Work", href: "/gallery/lifestyle" },
  },
];

const useCases = [
  {
    number: "01",
    title: "Model home grand opening",
    body: "The first photos of your model set the standard for every spec and listing that follows. Premium ensures that opening looks like a launch.",
  },
  {
    number: "02",
    title: "Amenity and community reveals",
    body: "Pools, clubhouses, and green spaces deserve their own shoot. Premium amenity photography gives buyers a reason to choose the community, not just the floor plan.",
  },
  {
    number: "03",
    title: "Lifestyle campaigns",
    body: "Talent, styling, and real-moment storytelling for buyers who want to see themselves in the community. Lifestyle is a primary output of every Premium engagement.",
  },
  {
    number: "04",
    title: "Regional rollouts and brand photography",
    body: "Launching multiple communities across markets? DIG coordinates Premium shoots across all four U.S. regions under one brief and one account team.",
  },
];

const galleryLinks = [
  { label: "Model Homes", href: "/gallery/models" },
  { label: "Amenities", href: "/gallery/amenities" },
  { label: "Lifestyle", href: "/gallery/lifestyle" },
];

export default function PremiumPage() {
  return (
    <>
      {/* Hero */}
      <DarkSection className="min-h-[60vh] py-28 text-text-light">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <Eyebrow dark>Solutions / Premium Photography</Eyebrow>
            <EditableHero
              slotId="services-premium-hero"
              headlineDefault="Full-service photography for builders who demand the <strong>best</strong>."
              subheadDefault="Slow, methodical, full-setup photography for model homes, amenity spaces, and lifestyle shoots. DIG's signature service across 28 markets nationwide."
            />
            <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:gap-8">
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
                <Eyebrow>Signature Service</Eyebrow>
                <EditableTextContent
                  slotId="services-premium-signature"
                  headlineDefault="Every detail, every <strong>angle</strong>."
                  bodyDefault="Premium Photography is DIG's umbrella for high-craft, full-service shoots. It covers three distinct engagement types: model home photography, amenity photography, and lifestyle photography. Builders order each as a separate shoot, not as a single combined package."
                />
                <p className="mt-4 text-text-body">
                  This is not fast-turn listing photography. Every Premium shoot is planned in advance, executed by DIG&apos;s most experienced photographers, and delivered as a complete, publish-ready asset package built for launches, community reveals, and builder brands that need imagery that earns attention everywhere it appears.
                </p>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-bg-light">
                <DynamicImage
                  slotId="services-premium-img"
                  className="h-full w-full object-cover"
                  fallbackClass="h-full w-full"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-bg-surface to-border-light [&:has(img)]:hidden">
                  <span className="text-xs font-medium uppercase tracking-widest text-text-muted">Premium Example</span>
                </div>
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
              <Eyebrow>What You&apos;re Booking</Eyebrow>
              <EditableTextContent
                slotId="services-premium-shoot-types"
                headlineDefault="Three shoot types. <strong>One standard of quality</strong>."
                bodyDefault="Premium Photography is an umbrella. Builders order model home, amenity, and lifestyle shoots as separate engagements — each scoped and scheduled for its specific subject."
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
              <Eyebrow>How Builders Use It</Eyebrow>
              <EditableTextContent
                slotId="services-premium-use-cases"
                headlineDefault="From model home launches to <strong>community reveals</strong>."
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
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-bg-surface">
                <DynamicImage
                  slotId="services-premium-amenities-img"
                  className="h-full w-full object-cover"
                  fallbackClass="h-full w-full"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-border-light to-bg-light [&:has(img)]:hidden">
                  <span className="text-xs font-medium uppercase tracking-widest text-text-muted">Amenity Photography</span>
                </div>
              </div>
              {/* Copy */}
              <div>
                <Eyebrow>Amenity Photography</Eyebrow>
                <EditableTextContent
                  slotId="services-premium-amenities"
                  headlineDefault="The amenity is the <strong>differentiator</strong>."
                  bodyDefault="In a competitive market, buyers choose communities as much as they choose floor plans. The pool deck, the clubhouse, the trail system, the fitness center: these are the assets that close the gap between interest and decision."
                />
                <p className="mt-4 text-text-body">
                  DIG Premium amenity photography is planned, lit, and executed with the same care as model home interiors. The result is gallery-quality imagery that works across your website, paid social, and sales center displays.
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
              <Eyebrow>Lifestyle Photography</Eyebrow>
              <EditableTextContent
                slotId="services-premium-lifestyle"
                headlineDefault="Buyers buy feelings. <strong>Premium delivers them</strong>."
                bodyDefault="Lifestyle photography is a primary output of DIG Premium. Talent, styling, and real-moment storytelling that connects buyers emotionally to your community before they ever visit. This is the work that makes your brand stand apart on Instagram, on your website hero, and in the sales center."
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
                <Eyebrow dark>Regional Coverage</Eyebrow>
                <EditableTextContent
                  slotId="services-premium-regional"
                  headlineDefault="One standard across every <strong>market</strong>."
                  bodyDefault=""
                  dark={true}
                />
              </div>
              <div className="space-y-5 text-[1.0625rem] leading-relaxed text-text-muted">
                <p>
                  DIG Premium delivers consistent quality whether you&apos;re launching in California, Texas, Florida, or Colorado. We operate across 28 U.S. markets with the same process, the same quality checks, and the same delivery standard in every one.
                </p>
                <p>
                  For national and regional builders running multiple launches simultaneously, DIG&apos;s Regional Partnerships program provides dedicated capacity, volume pricing, and a single account team across all four U.S. regions.
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

      {/* Final CTA */}
      <DarkSection className="py-24 text-text-light">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <div className="text-center">
              <Eyebrow dark>Browse the Work</Eyebrow>
              <EditableTextContent
                slotId="services-premium-cta"
                headlineDefault="See what Premium looks like <strong>in the field</strong>."
                bodyDefault="Browse gallery examples across all four Premium output types, then book a call to scope your shoot."
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
                    {g.label} gallery &rarr;
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
