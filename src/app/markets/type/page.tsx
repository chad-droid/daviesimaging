import type { Metadata } from "next";
import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";
import { DarkSection } from "@/components/DarkSection";

export const metadata: Metadata = {
  alternates: { canonical: "/markets/type" },
  title: "Markets by Type",
  description: "Detached, attached, luxury, build-to-rent, and multifamily: see which DIG services fit what you build.",
};

const types = [
  {
    title: "Detached",
    description: "Single-family production and custom homes. Use Spec+ for your standing inventory and Premium for your model home launches.",
    services: ["Premium Photo", "Listing Photo", "Spec+"],
    href: "/gallery/models",
    cta: "See model home work",
  },
  {
    title: "Attached",
    description: "Townhomes and duplexes. ModelMatch lets you show your unit variations without multiple shoots.",
    services: ["Listing Photography", "ModelMatch", "FrameFlow"],
    href: "/gallery/listings",
    cta: "See listing work",
  },
  {
    title: "Luxury",
    description: "High-end custom and estate homes. You get Premium photography and video that match the caliber of what you build.",
    services: ["Premium Photography", "Premium Video", "Matterport"],
    href: "/services/premium",
    cta: "Explore Premium Photography",
  },
  {
    title: "BTR",
    description: "Build-to-rent communities. Photography of your pools, clubhouses, fitness centers, and outdoor spaces, plus ModelMatch staging for your lease-up marketing.",
    services: ["Premium Photography", "ModelMatch", "Amenity Shoots"],
    href: "/gallery/amenities",
    cta: "See amenity work",
  },
  {
    title: "Multifamily",
    description: "Apartment and condo communities. ModelMatch staging and FrameFlow video for your lease-up and pre-sale campaigns, ordered through digDesk without a shoot for every unit.",
    services: ["ModelMatch", "FrameFlow", "digDesk"],
    href: "/services/virtual-staging",
    cta: "Explore ModelMatch",
  },
];

export default function ByTypePage() {
  return (
    <>
      {/* Hero */}
      <DarkSection className="py-28 text-text-light">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <Eyebrow dark>Markets / By Type</Eyebrow>
            <h1 className="text-text-light">
              Services for what <strong>you build</strong>.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-text-muted">
              Detached, attached, luxury, BTR, or multifamily. See which services fit what you build and what your buyers need to see.
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
              A 15-minute strategy call is the fastest way to get a recommendation for your communities, your volume, and your marketing goals.
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
