import type { Metadata } from "next";
import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";
import { SpecFaq } from "@/components/SpecFaq";
import { DarkSection } from "@/components/DarkSection";

export const metadata: Metadata = {
  title: "FAQ | Davies Imaging Group",
  description: "Answers to common questions about Spec+, virtual staging, virtual video, delivery, and how DIG works.",
};

const categories = [
  { label: "Spec+", href: "#spec-plus" },
  { label: "Virtual Staging", href: "/services/virtual-staging" },
  { label: "Virtual Video", href: "/services/virtual-video" },
  { label: "Ordering", href: "/programs/frameflow" },
];

export default function FaqPage() {
  return (
    <>
      {/* Hero */}
      <DarkSection className="py-24 text-text-light">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <Eyebrow dark>Help Center</Eyebrow>
            <h1 className="text-text-light">
              Frequently asked <strong>questions</strong>.
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg text-text-muted">
              Everything you need to know about Spec+, virtual staging, video, and how DIG delivers.
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

      {/* Still have questions */}
      <section className="bg-bg-light py-20">
        <div className="mx-auto max-w-3xl px-6">
          <RevealOnScroll>
            <div className="rounded-2xl border border-border-light bg-bg-surface p-8 text-center lg:p-12">
              <Eyebrow>Still Have Questions?</Eyebrow>
              <h2 className="mt-2">
                We&apos;re easy to <strong>reach</strong>.
              </h2>
              <p className="mx-auto mt-4 max-w-md text-text-body">
                If your question is not covered above, reach out directly. We respond quickly and are happy to walk through anything before you order.
              </p>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
                >
                  Contact Us
                </Link>
                <Link
                  href="/programs/frameflow"
                  className="rounded-full border border-border-light px-8 py-3 text-sm font-semibold text-text-body transition-colors hover:border-accent hover:text-accent"
                >
                  Explore FrameFlow Studio
                </Link>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Quick links */}
      <section className="py-16">
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
    </>
  );
}
