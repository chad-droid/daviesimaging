import type { Metadata } from "next";
import Link from "next/link";
import { DynamicGallery } from "@/components/DynamicGallery";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";

export const metadata: Metadata = {
  title: "Amenities | Davies Imaging Group",
  description: "Community amenity photography that showcases pools, clubhouses, trails, and lifestyle spaces builders invest in.",
};

const otherWork = [
  { label: "Model Homes", href: "/gallery/model-homes" },
  { label: "Spec Homes", href: "/gallery/spec-homes" },
  { label: "Lifestyle", href: "/gallery/lifestyle" },
];

export default function AmenitiesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-bg-dark py-28 text-text-light">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <Eyebrow dark>Gallery / Amenities</Eyebrow>
            <h1 className="text-text-light">
              Buyers choose communities. Give them a reason to choose <strong>yours</strong>.
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-text-muted">
              Pools, clubhouses, fitness centers, trails, and parks. DIG captures every amenity the way it deserves: with context, with light, and with buyers in mind.
            </p>

          </RevealOnScroll>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <RevealOnScroll>
            <DynamicGallery
              pageSlug="/gallery/amenities"
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
                <Eyebrow>Community Infrastructure</Eyebrow>
                <h2 className="mt-3">
                  The amenity is the <strong>differentiator</strong>.
                </h2>
              </div>
              <div className="space-y-4 text-[1.0625rem] leading-relaxed text-text-body">
                <p>
                  In a competitive market, two homes at the same price point are often separated by one thing: the community around them. A pool, a clubhouse, a trail system. DIG captures these spaces at their best so buyers can imagine themselves in them before the first visit.
                </p>
                <p>
                  Amenity photography is planned around the best light, the right weather window, and the features that matter most to your target buyer. The result goes directly into your website, digital ads, and email campaigns, where it does the work of making buyers choose your community first.
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
            <Eyebrow dark>Book an Amenity Shoot</Eyebrow>
            <h2 className="text-text-light">
              Ready to showcase what makes your community <strong>worth choosing</strong>?
            </h2>
            <p className="mt-5 text-text-muted">
              Amenity photography is part of DIG Premium. Coordinate it alongside your model home shoot or book it as a standalone engagement.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
              >
                Request a Quote
              </Link>
              <Link
                href="/services/premium"
                className="text-sm font-medium text-text-muted transition-colors hover:text-text-light"
              >
                See how Premium works &rarr;
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
