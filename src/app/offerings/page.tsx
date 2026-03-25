import type { Metadata } from "next";
import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";

export const metadata: Metadata = {
  title: "Offerings | Davies Imaging Group",
  description: "FrameFlow, Spec+, and Regional Partnerships. How builders purchase DIG services.",
};

const offerings = [
  { title: "FrameFlow", href: "/offerings/frameflow", description: "Digital ordering platform. Entry point for virtual staging, virtual video, and Spec+ orders." },
  { title: "Spec+", href: "/offerings/spec-plus", description: "All-in-one package: listing photography, virtual staging, and virtual video in one order." },
  { title: "Regional Partnerships", href: "/offerings/regional-partnerships", description: "Volume commitment program with price discounts and dedicated capacity across regions." },
];

export default function OfferingsIndex() {
  return (
    <section className="flex min-h-screen items-center bg-bg-surface py-24">
      <div className="mx-auto max-w-4xl px-6">
        <RevealOnScroll>
          <div className="text-center">
            <Eyebrow>Offerings</Eyebrow>
            <h1>How builders <strong>purchase</strong>.</h1>
            <p className="mt-5 text-text-body">
              Streamlined packages and platforms designed for how builder marketing teams actually buy.
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll stagger={150}>
          {offerings.map((off) => (
            <Link
              key={off.href}
              href={off.href}
              className="mt-6 block first:mt-14 rounded-lg border border-border-light p-8 transition-colors hover:border-accent-secondary"
            >
              <h3>{off.title}</h3>
              <p className="mt-2 text-text-body">{off.description}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-text-dark">
                Learn more <span aria-hidden="true">&rarr;</span>
              </span>
            </Link>
          ))}
        </RevealOnScroll>
      </div>
    </section>
  );
}
