import type { Metadata } from "next";
import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";

export const metadata: Metadata = {
  title: "Markets by Type | Davies Imaging Group",
  description: "DIG serves production builders, custom builders, developers, and multifamily teams.",
};

const types = [
  {
    title: "Production Builders",
    description: "Scalable asset packages for builders doing 300+ homes annually.",
    href: "/markets/by-role/regional-builders",
  },
  {
    title: "Custom Builders",
    description: "Premium lifestyle photography that matches the caliber of the build.",
    href: "/services/premium",
  },
  {
    title: "Developers",
    description: "Community-level amenity and aerial photography for land and master-plan projects.",
    href: "/work/amenities",
  },
  {
    title: "Multifamily",
    description: "Virtual staging and video for lease-up marketing across apartment communities.",
    href: "/services/virtual-staging",
  },
];

export default function ByTypePage() {
  return (
    <section className="flex min-h-screen items-center bg-white py-24">
      <div className="mx-auto max-w-4xl px-6">
        <RevealOnScroll>
          <div className="text-center">
            <Eyebrow>By Type</Eyebrow>
            <h1>
              Every builder type has a different <strong>need</strong>.
            </h1>
            <p className="mt-5 text-zinc-600">
              Production, custom, developer, or multifamily. We build asset
              strategies tailored to how you operate.
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll stagger={150}>
          {types.map((type) => (
            <Link
              key={type.href}
              href={type.href}
              className="mt-6 block first:mt-14 rounded-xl border border-zinc-200 p-8 transition-colors hover:border-zinc-400"
            >
              <h3>{type.title}</h3>
              <p className="mt-2 text-zinc-600">{type.description}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-900">
                Learn more <span aria-hidden="true">&rarr;</span>
              </span>
            </Link>
          ))}
        </RevealOnScroll>
      </div>
    </section>
  );
}
