import type { Metadata } from "next";
import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";

export const metadata: Metadata = {
  title: "Regional Partnerships | Davies Imaging Group",
  description: "One visual partner across every market. Volume pricing, brand consistency, and FrameFlow ordering for national builders.",
};

export default function RegionalPartnershipsPage() {
  return (
    <>
      <section className="flex min-h-screen items-center bg-bg-dark py-28 text-text-light">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <Eyebrow>Regional Partnerships</Eyebrow>
            <h1 className="text-text-light">
              One partner, every <strong>market</strong>.
            </h1>
            <p className="lead-text mt-6 text-text-muted" style={{ fontStyle: "italic" }}>
              DIG&rsquo;s regional partnership model gives national builders a
              single point of contact for photography, staging, and video
              across all four U.S. regions.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="min-h-[70vh] bg-bg-surface py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 lg:grid-cols-2">
          <RevealOnScroll>
            <Eyebrow>Scale</Eyebrow>
            <h2>
              Volume pricing without quality <strong>compromise</strong>.
            </h2>
            <p className="mt-5 text-text-body">
              Multi-market commitments unlock volume pricing, dedicated account
              management, and brand guidelines enforced across every shoot in
              every region.
            </p>
            <Link
              href="/markets/region"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-text-dark transition-colors hover:text-accent"
            >
              See our regions <span aria-hidden="true">&rarr;</span>
            </Link>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-bg-light to-border-light" />
          </RevealOnScroll>
        </div>
      </section>

      <section className="flex min-h-[60vh] items-center bg-bg-light py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <Eyebrow>FrameFlow Powered</Eyebrow>
            <h2>
              Centralized ordering across every <strong>region</strong>.
            </h2>
            <p className="mt-5 text-text-body">
              Your marketing team orders through FrameFlow regardless of
              market. One platform, one process, consistent delivery from West
              to East.
            </p>
            <Link
              href="/contact-page"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-text-dark transition-colors hover:text-accent"
            >
              Start a partnership conversation <span aria-hidden="true">&rarr;</span>
            </Link>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
