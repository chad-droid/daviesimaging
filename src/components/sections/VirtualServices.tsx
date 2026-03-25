import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";

export function VirtualServices() {
  return (
    <section className="min-h-[70vh] bg-bg-surface py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 lg:grid-cols-2">
        {/* Copy side */}
        <RevealOnScroll>
          <Eyebrow>Virtual Staging + Virtual Video</Eyebrow>
          <h2>
            Already have photos? We can work with <strong>that</strong>.
          </h2>
          <p className="mt-5 text-text-body">
            DIG&rsquo;s virtual staging and virtual video services are available
            without photography. No shoot required, fast turnaround, assets
            ready to deploy.
          </p>
          <Link
            href="/offerings/frameflow"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-text-dark transition-colors hover:text-accent"
          >
            Get started in FrameFlow <span aria-hidden="true">&rarr;</span>
          </Link>
        </RevealOnScroll>

        {/* Image-dominant side */}
        <RevealOnScroll>
          <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-border-light to-accent-secondary/40" />
        </RevealOnScroll>
      </div>
    </section>
  );
}
