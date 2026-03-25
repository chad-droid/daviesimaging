import type { Metadata } from "next";
import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";

export const metadata: Metadata = {
  title: "Markets by Role | Davies Imaging Group",
  description: "DIG serves marketing directors, sales leaders, and regional builders. Find the page built for your role.",
};

const roles = [
  {
    title: "Marketing Directors",
    description: "Consistent, multi-channel assets across every community.",
    href: "/markets/by-role/marketing-directors",
  },
  {
    title: "Sales Leaders",
    description: "Photography, staging, and video built to support the close.",
    href: "/markets/by-role/sales-leaders",
  },
  {
    title: "Regional & National Builders",
    description: "One partner, every market, zero inconsistency.",
    href: "/markets/by-role/regional-builders",
  },
];

export default function ByRolePage() {
  return (
    <section className="flex min-h-screen items-center bg-white py-24">
      <div className="mx-auto max-w-4xl px-6">
        <RevealOnScroll>
          <div className="text-center">
            <Eyebrow>By Role</Eyebrow>
            <h1>
              Built for the people who move <strong>homes</strong>.
            </h1>
            <p className="mt-5 text-zinc-600">
              Every role has different pressures. We built pages that speak
              directly to yours.
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll stagger={150}>
          {roles.map((role) => (
            <Link
              key={role.href}
              href={role.href}
              className="mt-6 block first:mt-14 rounded-xl border border-zinc-200 p-8 transition-colors hover:border-zinc-400"
            >
              <h3>{role.title}</h3>
              <p className="mt-2 text-zinc-600">{role.description}</p>
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
