import type { Metadata } from "next";
import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";
import { DynamicGallery } from "@/components/DynamicGallery";

export const metadata: Metadata = {
  title: "Our Work | Davies Imaging Group",
  description: "Browse the full DIG portfolio across model homes, amenities, spec homes, and lifestyle photography and video.",
};

const categories = [
  {
    title: "Model Homes",
    href: "/work/model-homes",
    description: "Furnished interiors, architectural detail, and finished spaces. DIG&apos;s highest-craft output.",
  },
  {
    title: "Amenities",
    href: "/work/amenities",
    description: "Pools, clubhouses, fitness centers, and parks. The community infrastructure that drives buyer decisions.",
  },
  {
    title: "Spec Homes",
    href: "/work/spec-homes",
    description: "Move-in ready homes. Listing photography, virtual staging, and virtual video output.",
  },
  {
    title: "Lifestyle",
    href: "/work/lifestyle",
    description: "Talent-driven photography and video that connects buyers emotionally to a community.",
  },
];

export default function WorkPage() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-[55vh] bg-bg-dark py-28 text-text-light">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <RevealOnScroll>
            <Eyebrow dark>Our Work</Eyebrow>
            <h1 className="text-text-light">
              Assets built to move <strong>homes</strong>.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-text-muted">
              Browse the full DIG portfolio across every category. Photography, staging, and video built for homebuilder marketing teams that need results, not just visuals.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Category nav */}
      <section className="bg-bg-light py-16">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {categories.map((cat) => (
                <Link
                  key={cat.href}
                  href={cat.href}
                  className="group rounded-xl border border-border-light bg-bg-surface p-6 transition-all hover:border-accent hover:shadow-sm"
                >
                  <h4 className="text-base font-semibold text-text-dark transition-colors group-hover:text-accent">
                    {cat.title}
                  </h4>
                  <p
                    className="mt-2 text-sm leading-relaxed text-text-body"
                    dangerouslySetInnerHTML={{ __html: cat.description }}
                  />
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-text-muted transition-colors group-hover:text-accent">
                    Browse &rarr;
                  </span>
                </Link>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Full gallery */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <RevealOnScroll>
            <DynamicGallery
              pageSlug="/work"
              heading="Full Portfolio"
              description="Every project, every category, every region."
            />
          </RevealOnScroll>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-bg-dark py-24 text-text-light">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <Eyebrow dark>Ready to Work Together?</Eyebrow>
            <h2 className="text-text-light">
              Let&apos;s build assets that move <strong>your homes</strong>.
            </h2>
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
      </section>
    </>
  );
}
