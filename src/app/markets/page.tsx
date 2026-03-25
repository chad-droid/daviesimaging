import type { Metadata } from "next";
import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";

export const metadata: Metadata = {
  title: "Markets | Davies Imaging Group",
  description: "DIG serves builders by type, role, and region. Find the page built for you.",
};

const dimensions = [
  { title: "By Type", href: "/markets/type", description: "Detached, Attached, Luxury, BTR, Multifamily." },
  { title: "By Role", href: "/markets/role", description: "Coordinators, Directors, Executive, C-Suite." },
  { title: "By Region", href: "/markets/region", description: "West, Mountain, Central, East. Interactive map with 24+ markets." },
];

export default function MarketsIndex() {
  return (
    <section className="flex min-h-screen items-center bg-bg-surface py-24">
      <div className="mx-auto max-w-4xl px-6">
        <RevealOnScroll>
          <div className="text-center">
            <Eyebrow>Markets</Eyebrow>
            <h1>Who DIG <strong>serves</strong>.</h1>
            <p className="mt-5 text-text-body">
              Three ways to find the right fit: by what you build, who you are, or where you operate.
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll stagger={150}>
          {dimensions.map((dim) => (
            <Link
              key={dim.href}
              href={dim.href}
              className="mt-6 block first:mt-14 rounded-lg border border-border-light p-8 transition-colors hover:border-accent-secondary"
            >
              <h3>{dim.title}</h3>
              <p className="mt-2 text-text-body">{dim.description}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-text-dark">
                Explore <span aria-hidden="true">&rarr;</span>
              </span>
            </Link>
          ))}
        </RevealOnScroll>
      </div>
    </section>
  );
}
