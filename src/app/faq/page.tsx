import type { Metadata } from "next";
import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";
import { SpecFaq } from "@/components/SpecFaq";
import { faqGroups, allFaqs } from "@/lib/faq-data";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL, SITE_NAME, buildFaqSchema, buildBreadcrumbSchema } from "@/lib/seo";
import { DarkSection } from "@/components/DarkSection";

export const metadata: Metadata = {
  title: { absolute: `FAQ: digDesk and DIG Services | ${SITE_NAME}` },
  description:
    "How digDesk works and what every DIG service includes: photography, video, ModelMatch, PlanMatch, Moments, FrameFlow, CineFlow, ActFlow and Spec+.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <div className="theme-dark">
      <JsonLd data={buildFaqSchema(allFaqs, `${SITE_URL}/faq`)} />
      <JsonLd data={buildBreadcrumbSchema([{ name: "FAQ", path: "/faq" }])} />

      {/* Hero */}
      <DarkSection fadeBottom className="pb-20 pt-28 text-text-light">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <Eyebrow dark>Help Center</Eyebrow>
            <h1 className="text-text-light">
              Frequently asked <strong>questions</strong>.
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-text-muted">
              How digDesk works, what each service includes, and how we deliver.
            </p>
            <nav aria-label="FAQ sections" className="mt-8 flex flex-wrap gap-2.5">
              {faqGroups.map((g) => (
                <a
                  key={g.id}
                  href={`#${g.id}`}
                  className="rounded-full border border-white/20 px-4 py-1.5 text-sm font-medium text-text-light transition-colors hover:border-accent hover:text-accent"
                >
                  {g.label}
                </a>
              ))}
            </nav>
          </RevealOnScroll>
        </div>
      </DarkSection>

      {/* FAQ body: one block per topic */}
      <section className="bg-bg-surface pb-24 pt-4">
        <div className="mx-auto max-w-3xl space-y-16 px-6">
          {faqGroups.map((g) => (
            <RevealOnScroll key={g.id}>
              <div id={g.id} className="scroll-mt-28">
                <Eyebrow>{g.label}</Eyebrow>
                <h2 className="mb-6 mt-2" dangerouslySetInnerHTML={{ __html: g.heading }} />
                <SpecFaq items={g.items} idPrefix={g.id} />
              </div>
            </RevealOnScroll>
          ))}
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
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
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
