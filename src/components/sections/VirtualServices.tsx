import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";

export function VirtualServices() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2">
        <RevealOnScroll>
          <h4>Virtual Staging + Virtual Video</h4>
          <h2 className="mt-3">
            Already have photos? We can work with that.
          </h2>
          <p className="mt-4 text-zinc-600">
            DIG&rsquo;s virtual staging and virtual video services are available
            without photography. Order staging, video, or both through the
            FrameFlow app.
          </p>
          <p className="mt-4 text-zinc-600">
            No shoot required. Fast turnaround. Assets ready to deploy.
          </p>
          <Link
            href="/services/frameflow"
            className="cta-button mt-8 inline-block rounded-full bg-zinc-900 px-6 py-3 text-white transition-colors hover:bg-zinc-700"
          >
            Get Started in FrameFlow
          </Link>
        </RevealOnScroll>

        <RevealOnScroll>
          {/* Visual placeholder */}
          <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-zinc-200 to-zinc-300 flex items-center justify-center">
            <span className="text-sm uppercase tracking-widest text-zinc-400">
              Virtual Staging Visual
            </span>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
