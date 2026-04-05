import type { Metadata } from "next";
import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";
import { DarkSection } from "@/components/DarkSection";

export const metadata: Metadata = {
  title: "Markets by Type | Davies Imaging Group",
  description: "DIG serves detached, attached, luxury, build-to-rent, and multifamily builders. Find the asset strategy built for how you operate.",
};

const types = [
  {
    title: "Detached",
    description: "Single-family production and custom homes. Photography, staging, and video for every price point. Spec+ is the primary tool for standing inventory. Premium for model home launches.",
    services: ["Premium Photo", "Listing Photo", "Spec+"],
    href: "/gallery/models",
    cta: "See model home work",
  },
  {
    title: "Attached",
    description: "Townhomes and duplexes. Consistent asset packages across high-volume attached communities where every unit looks as good as the last. Virtual staging is especially effective for showing unit variations without multiple shoots.",
    services: ["Listing Photo", "Virtual Staging", "Virtual Video"],
    href: "/gallery/listings",
    cta: "See spec home work",
  },
  {
    title: "Luxury",
    description: "High-end custom and estate homes. Premium photography and lifestyle video that matches the caliber of the build. DIG&apos;s most methodical, detail-driven service tier for communities where every image makes a statement.",
    services: ["Premium Photo", "Video Production", "Matterport"],
    href: "/services/premium",
    cta: "Explore Premium Photo",
  },
  {
    title: "BTR",
    description: "Build-to-rent communities. Amenity-forward photography and virtual staging for lease-up marketing. DIG captures the community infrastructure that drives BTR leasing decisions: pools, clubhouses, fitness centers, and outdoor spaces.",
    services: ["Premium Photo", "Virtual Staging", "Amenity Shoots"],
    href: "/gallery/amenities",
    cta: "See amenity work",
  },
  {
    title: "Multifamily",
    description: "Apartment and condo communities. Virtual staging and video for lease-up and pre-sale campaigns. FrameFlow Studio handles digital production at scale without a shoot day for every unit.",
    services: ["Virtual Staging", "Virtual Video", "FrameFlow Studio"],
    href: "/services/virtual-staging",
    cta: "Explore Virtual Staging",
  },
];

export default function ByTypePage() {
  return (
    <>
      {/* Hero */}
      <DarkSection className="min-h-[55vh] py-28 text-text-light">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <Eyebrow dark>Markets / By Type</Eyebrow>
            <h1 className="text-text-light">
              Every builder type has a different <strong>need</strong>.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-text-muted">
              Detached, attached, luxury, BTR, or multifamily. We build asset strategies tailored to how you operate and what your buyers actually need to see.
            </p>
          </RevealOnScroll>
        </div>
      </DarkSection>

      {/* Types */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll>
            <div className="space-y-4">
              {types.map((type, i) => (
                <div key={type.title} className={`rounded-xl border border-border-light p-6 lg:p-8 ${i % 2 === 0 ? "bg-bg-surface" : "bg-bg-light"}`}>
                  <div className="grid gap-6 lg:grid-cols-[1fr_2fr_auto]">
                    <div>
                      <h3 className="text-xl font-semibold text-text-dark">{type.title}</h3>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {type.services.map((s) => (
                          <span key={s} className="rounded-full bg-accent/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p
                      className="text-sm leading-relaxed text-text-body"
                      dangerouslySetInnerHTML={{ __html: type.description }}
                    />
                    <div className="flex items-center lg:justify-end">
                      <Link
                        href={type.href}
                        className="whitespace-nowrap rounded-full border border-border-light px-4 py-2 text-sm font-medium text-text-body transition-colors hover:border-accent hover:text-accent"
                      >
                        {type.cta} &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* CTA */}
      <DarkSection className="py-24 text-text-light">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <h2 className="text-text-light">
              Not sure which services fit your <strong>build type</strong>?
            </h2>
            <p className="mt-5 text-text-muted">
              A 15-minute strategy call is the fastest way to get a recommendation tailored to your specific communities, volume, and marketing goals.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
              >
                Book a Strategy Call
              </Link>
              <Link
                href="/programs/spec-plus"
                className="text-sm font-medium text-text-muted transition-colors hover:text-text-light"
              >
                See Spec+ pricing &rarr;
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </DarkSection>
    </>
  );
}
