import type { Metadata } from "next";
import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";

export const metadata: Metadata = {
  title: "Campaigns | Davies Imaging Group",
  description: "Active DIG campaigns, challenges, and demos for builder marketing teams.",
};

const campaigns = [
  { title: "FrameFlow Sell Faster Challenge", href: "/campaigns/frameflow-sell-faster", description: "See how strategic visual sequencing increases engagement. Risk-free, one community." },
  { title: "Beazer x FrameFlow", href: "/campaigns/beazer-frameflow", description: "How Beazer Homes uses FrameFlow to scale marketing assets across markets." },
  { title: "FrameFlow Demo", href: "/campaigns/frameflow-demo", description: "See the FrameFlow platform in action before you commit." },
];

export default function CampaignsIndex() {
  return (
    <section className="flex min-h-screen items-center bg-bg-surface py-24">
      <div className="mx-auto max-w-4xl px-6">
        <RevealOnScroll>
          <div className="text-center">
            <Eyebrow>Campaigns</Eyebrow>
            <h1>See DIG in <strong>action</strong>.</h1>
            <p className="mt-5 text-text-body">
              Active challenges, client showcases, and platform demos.
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll stagger={150}>
          {campaigns.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="mt-6 block first:mt-14 rounded-lg border border-border-light p-8 transition-colors hover:border-accent-secondary"
            >
              <h3>{c.title}</h3>
              <p className="mt-2 text-text-body">{c.description}</p>
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
