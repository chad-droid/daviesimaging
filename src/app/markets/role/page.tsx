import type { Metadata } from "next";
import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";

export const metadata: Metadata = {
  title: "Markets by Role | Davies Imaging Group",
  description: "DIG serves coordinators, directors, executives, and C-suite leaders at homebuilders.",
};

const roles = [
  {
    title: "Coordinators",
    description: "Day-to-day scheduling, ordering, and asset management. FrameFlow makes your workflow faster.",
    href: "/markets/role/coordinators",
  },
  {
    title: "Directors",
    description: "Brand consistency, multi-community rollouts, and marketing performance. Assets that work across channels.",
    href: "/markets/role/directors",
  },
  {
    title: "Executive",
    description: "VP-level oversight. Regional coverage, vendor consolidation, and scalable asset partnerships.",
    href: "/markets/role/executive",
  },
  {
    title: "C-Suite",
    description: "Strategic growth, cost efficiency, and competitive advantage through visual marketing.",
    href: "/markets/role/c-suite",
  },
];

export default function ByRolePage() {
  return (
    <section className="flex min-h-screen items-center bg-bg-surface py-24">
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
              className="mt-6 block first:mt-14 rounded-lg border border-zinc-200 p-8 transition-colors hover:border-accent-secondary"
            >
              <h3>{role.title}</h3>
              <p className="mt-2 text-zinc-600">{role.description}</p>
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
