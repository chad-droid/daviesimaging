import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";

export function VirtualServices() {
  return (
    <section className="min-h-[70vh] bg-white py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 lg:grid-cols-2">
        {/* Copy side */}
        <RevealOnScroll>
          <Eyebrow>Virtual Staging + Virtual Video</Eyebrow>
          <h2>
            Already have photos? We can work with <strong>that</strong>.
          </h2>
          <p className="mt-5 text-zinc-600">
            DIG&rsquo;s virtual staging and virtual video services are available
            without photography. No shoot required, fast turnaround, assets
            ready to deploy.
          </p>
          <Link
            href="/services/frameflow"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-900 transition-colors hover:text-zinc-600"
          >
            Get started in FrameFlow <span aria-hidden="true">&rarr;</span>
          </Link>
        </RevealOnScroll>

        {/* Image-dominant side */}
        <RevealOnScroll>
          <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-zinc-300 to-zinc-400" />
        </RevealOnScroll>
      </div>
    </section>
  );
}
