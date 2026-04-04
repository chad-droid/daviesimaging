import type { Metadata } from "next";
import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";
import { DynamicImage } from "@/components/DynamicImage";

export const metadata: Metadata = {
  title: "Premium Photography | Davies Imaging Group",
  description: "Full-service model home, amenity, and lifestyle photography for homebuilders. DIG's signature service across 28 U.S. markets.",
};

const deliverables = [
  {
    title: "Model home interiors",
    detail: "Room-by-room coverage capturing architecture, design details, and finishes at their best.",
  },
  {
    title: "Amenity and community spaces",
    detail: "Pool decks, clubhouses, fitness centers, trails, and parks photographed to show buyers the life waiting for them.",
  },
  {
    title: "Lifestyle photography",
    detail: "Talent-driven photography that shows buyers how they'll live in the community, not just what it looks like.",
  },
  {
    title: "Twilight and exterior",
    detail: "Dramatic exterior images timed to golden hour and blue hour. The shots that stop the scroll.",
  },
  {
    title: "Detail and finish work",
    detail: "Kitchens, baths, and architectural moments that earn attention in paid ads and on listing pages.",
  },
  {
    title: "Sky replacement and editing",
    detail: "Every exterior polished in post, ready to deploy without additional retouching on your end.",
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
  { label: "Model Homes", href: "/gallery/model-homes" },
  { label: "Amenities", href: "/gallery/amenities" },
  { label: "Lifestyle", href: "/gallery/lifestyle" },
];

export default function PremiumPage() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-[65vh] bg-bg-dark py-28 text-text-light">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <Eyebrow dark>Premium Photography</Eyebrow>
            <h1 className="text-text-light">
              Full-service photography for builders who demand the <strong>best</strong>.
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-text-muted">
              Slow, methodical, full-setup photography for model homes, amenity spaces, and lifestyle shoots. DIG&apos;s signature service across 28 markets nationwide.
            </p>
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
      </section>

      {/* What it is */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll>
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <Eyebrow>Signature Service</Eyebrow>
                <h2>
                  Every detail, every <strong>angle</strong>.
                </h2>
                <p className="mt-4 text-text-body">
                  Premium photography captures the full story of a builder&apos;s community: model home interiors, amenity spaces, lifestyle moments, and twilight exteriors. Each shoot is planned in advance, executed by DIG&apos;s most experienced photographers, and delivered as a complete, publish-ready marketing asset package.
                </p>
                <p className="mt-4 text-text-body">
                  This is not fast-turn listing photography. Premium is DIG&apos;s highest-craft output, reserved for launches, community reveals, lifestyle campaigns, and builder brands that need imagery that earns attention in every channel it appears.
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

      {/* Deliverables */}
      <section className="bg-bg-light py-24">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll>
            <div className="mb-12 text-center">
              <Eyebrow>What You Get</Eyebrow>
              <h2>
                A complete asset package, not just <strong>photos</strong>.
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {deliverables.map((item, i) => (
                <div key={i} className="rounded-xl border border-border-light bg-bg-surface p-6">
                  <h4 className="text-sm font-semibold text-text-dark">{item.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-text-body">{item.detail}</p>
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
              <h2>
                From model home launches to <strong>community reveals</strong>.
              </h2>
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
                <h2>
                  The amenity is the <strong>differentiator</strong>.
                </h2>
                <p className="mt-4 text-text-body">
                  In a competitive market, buyers choose communities as much as they choose floor plans. The pool deck, the clubhouse, the trail system, the fitness center: these are the assets that close the gap between interest and decision.
                </p>
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
              <h2 className="mt-3">
                Buyers buy feelings. <strong>Premium delivers them</strong>.
              </h2>
              <p className="mt-4 text-text-body">
                Lifestyle photography is a primary output of DIG Premium. Talent, styling, and real-moment storytelling that connects buyers emotionally to your community before they ever visit. This is the work that makes your brand stand apart on Instagram, on your website hero, and in the sales center.
              </p>
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
      <section className="bg-bg-dark py-24 text-text-light">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
              <div className="pt-1">
                <Eyebrow dark>Regional Coverage</Eyebrow>
                <h2 className="mt-3 text-text-light">
                  One standard across every <strong>market</strong>.
                </h2>
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
      </section>

      {/* Final CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <div className="text-center">
              <Eyebrow>Browse the Work</Eyebrow>
              <h2>
                See what Premium looks like <strong>in the field</strong>.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-text-body">
                Browse gallery examples across all four Premium output types, then book a call to scope your shoot.
              </p>
              {/* Gallery pill links */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                {galleryLinks.map((g) => (
                  <Link
                    key={g.href}
                    href={g.href}
                    className="rounded-full border border-border-light px-5 py-2 text-sm font-medium text-text-body transition-colors hover:border-accent hover:text-accent"
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
      </section>
    </>
  );
}
