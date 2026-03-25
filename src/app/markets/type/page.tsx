import type { Metadata } from "next";
import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";

export const metadata: Metadata = {
  title: "Markets by Type | Davies Imaging Group",
  description: "DIG serves detached, attached, luxury, build-to-rent, and multifamily builders.",
};

const types = [
  {
    title: "Detached",
    description: "Single-family production and custom homes. Photography, staging, and video for every price point.",
    href: "/work/model-homes",
  },
  {
    title: "Attached",
    description: "Townhomes and duplexes. Consistent asset packages across high-volume attached communities.",
    href: "/work/spec-homes",
  },
  {
    title: "Luxury",
    description: "High-end custom and estate homes. Premium photography and lifestyle video that matches the caliber of the build.",
    href: "/services/premium",
  },
  {
    title: "BTR",
    description: "Build-to-rent communities. Amenity-forward photography and virtual staging for lease-up marketing.",
    href: "/work/amenities",
  },
  {
    title: "Multifamily",
    description: "Apartment and condo communities. Virtual staging and video for lease-up and pre-sale campaigns.",
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
              Detached, attached, luxury, BTR, or multifamily. We build asset
              strategies tailored to how you operate.
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll stagger={150}>
          {types.map((type) => (
            <Link
              key={type.title}
              href={type.href}
              className="mt-6 block first:mt-14 rounded-lg border border-zinc-200 p-8 transition-colors hover:border-zinc-400"
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
