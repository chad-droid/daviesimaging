import type { Metadata } from "next";
import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";

export const metadata: Metadata = {
  title: "Virtual Staging | Davies Imaging Group",
  description: "Virtual staging for builders who need furnished visuals without physical staging. No shoot required.",
};

export default function VirtualStagingPage() {
  return (
    <>
      <section className="flex min-h-screen items-center bg-zinc-900 py-28 text-white">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <Eyebrow>Virtual Staging</Eyebrow>
            <h1>
              Furnished visuals without the <strong>furniture</strong>.
            </h1>
            <p className="lead-text mt-6 text-zinc-300" style={{ fontStyle: "italic" }}>
              Transform empty rooms into styled spaces. No physical staging, no
              shoot required, fast turnaround.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="min-h-[70vh] bg-white py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 lg:grid-cols-2">
          <RevealOnScroll>
            <Eyebrow>No Shoot Required</Eyebrow>
            <h2>
              Already have photos? We handle the <strong>rest</strong>.
            </h2>
            <p className="mt-5 text-zinc-600">
              Send us your existing photography and we&rsquo;ll deliver
              virtually staged images ready for MLS, website, and marketing
              deployment.
            </p>
            <Link
              href="/services/frameflow"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-900 transition-colors hover:text-zinc-600"
            >
              Order via FrameFlow <span aria-hidden="true">&rarr;</span>
            </Link>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-zinc-200 to-zinc-300" />
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
