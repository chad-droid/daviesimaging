import type { Metadata } from "next";
import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";
import { SpecFaq } from "@/components/SpecFaq";
import { specFaqs } from "@/lib/faq-data";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL, SITE_NAME, buildFaqSchema, buildBreadcrumbSchema } from "@/lib/seo";
import { DarkSection } from "@/components/DarkSection";

export const metadata: Metadata = {
  title: { absolute: `Builder Photography FAQ | ${SITE_NAME}` },
  description:
    "What Spec+ includes, how ModelMatch virtual staging works, delivery times, revisions, and the 28 markets DIG covers.",
  alternates: { canonical: "/faq" },
};

const categories = [
  { label: "Spec+", href: "#spec-plus" },
  { label: "ModelMatch", href: "/services/virtual-staging" },
  { label: "FrameFlow", href: "/services/virtual-video" },
  { label: "Ordering", href: "/programs/digdesk" },
];

export default function FaqPage() {
  return (
    <div className="theme-dark">
      <JsonLd data={buildFaqSchema(specFaqs, `${SITE_URL}/faq`)} />
      <JsonLd data={buildBreadcrumbSchema([{ name: "FAQ", path: "/faq" }])} />

      {/* Hero */}
      <DarkSection className="py-28 text-text-light">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <Eyebrow dark>Help Center</Eyebrow>
            <h1 className="text-text-light">
              Frequently asked <strong>questions</strong>.
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-text-muted">
              Your questions about Spec+, ModelMatch staging, FrameFlow video, and how we deliver.
            </p>
          </RevealOnScroll>
        </div>
      </DarkSection>

      {/* FAQ body */}
      <section className="bg-bg-surface py-20">
        <div className="mx-auto max-w-3xl px-6">
          <RevealOnScroll>
            <div id="spec-plus" className="mb-6">
              <Eyebrow>Spec+ and Ordering</Eyebrow>
              <h2 className="mt-2">
                Before you <strong>order</strong>.
              </h2>
            </div>
            <SpecFaq />
          </RevealOnScroll>
        </div>
      </section>

      {/* Quick links */}
      <section className="bg-bg-light py-16">
        <div className="mx-auto max-w-3xl px-6">
          <RevealOnScroll>
            <p className="mb-5 text-center text-sm text-text-body">Explore related pages:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  className="rounded-full border border-border-light px-5 py-2 text-sm font-medium text-text-body transition-colors hover:border-accent hover:text-accent"
                >
                  {c.label}
                </Link>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Still have questions */}
      <DarkSection className="py-24 text-text-light">
        <div className="mx-auto max-w-3xl px-6">
          <RevealOnScroll>
            <div className="text-center">
              <Eyebrow dark>Still Have Questions?</Eyebrow>
              <h2 className="text-text-light">
                We&apos;re easy to <strong>reach</strong>.
              </h2>
              <p className="mx-auto mt-4 max-w-md text-text-muted">
                If your question is not covered above, reach out. We are happy to walk you through anything before you order.
              </p>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
                >
                  Contact Us
                </Link>
                <Link
                  href="/programs/digdesk"
                  className="rounded-full border border-white/30 px-8 py-3 text-sm font-semibold text-text-light transition-colors hover:border-white/60"
                >
                  Explore digDesk
                </Link>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </DarkSection>
    </div>
  );
}
