import type { Metadata } from "next";
import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";
import { DynamicImage } from "@/components/DynamicImage";

export const metadata: Metadata = {
  title: "Matterport 3D Tours | Davies Imaging Group",
  description: "Matterport 3D virtual tours for model homes and communities. Immersive buyer experiences for out-of-market buyers.",
};

const useCases = [
  {
    title: "Model home showcase",
    body: "Give out-of-market buyers the confidence to move forward without a visit. A complete, navigable 3D tour of your model home embedded directly on your website.",
  },
  {
    title: "Sales center display",
    body: "Display Matterport tours on sales center screens so buyers can walk through homes that are already sold or not yet open for touring.",
  },
  {
    title: "Remote buyer tool",
    body: "Buyers relocating from other markets can experience your homes in detail before they travel. Reduces hesitation and accelerates the decision timeline.",
  },
  {
    title: "Email and digital campaigns",
    body: "Share a Matterport link in your email campaigns to drive engagement from buyers who are not ready to visit in person.",
  },
];

export default function MatterportPage() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-[60vh] bg-bg-dark py-28 text-text-light">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <RevealOnScroll>
            <Eyebrow dark>Matterport 3D Tours</Eyebrow>
            <h1 className="text-text-light">
              Let buyers walk through before they <strong>visit</strong>.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-text-muted">
              Matterport 3D virtual tours give buyers an immersive, room-by-room experience of your model homes. Built for remote buyers, sales centers, and digital campaigns.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
              >
                Book a Strategy Call
              </Link>
              <Link
                href="/work/model-homes"
                className="text-sm font-medium text-text-muted transition-colors hover:text-text-light"
              >
                See model home work &rarr;
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* What it is */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll>
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <Eyebrow>The Experience</Eyebrow>
                <h2>
                  The next best thing to being <strong>there</strong>.
                </h2>
                <p className="mt-4 text-text-body">
                  Matterport captures the complete geometry of a space and delivers an interactive 3D model buyers can navigate room by room. It&apos;s the immersive experience that photography alone can&apos;t provide.
                </p>
                <p className="mt-4 text-text-body">
                  Embed it on your website, share it in emails, or display it in your sales center. One scan, multiple deployment channels.
                </p>
                <div className="mt-8">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
                  >
                    Schedule a Matterport shoot &rarr;
                  </Link>
                </div>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-bg-light">
                <DynamicImage
                  slotId="services-matterport-img"
                  className="h-full w-full object-cover"
                  fallbackClass="h-full w-full"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-bg-surface to-border-light [&:has(img)]:hidden">
                  <span className="text-xs font-medium uppercase tracking-widest text-text-muted">3D Tour Preview</span>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Use cases */}
      <section className="bg-bg-light py-24">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll>
            <div className="mb-12 text-center">
              <Eyebrow>How Builders Use It</Eyebrow>
              <h2>
                Four ways Matterport earns its <strong>keep</strong>.
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {useCases.map((item, i) => (
                <div key={i} className="rounded-xl border border-border-light bg-bg-surface p-6">
                  <h4 className="text-base font-semibold text-text-dark">{item.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-text-body">{item.body}</p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Matterport vs FrameFlow */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <div className="rounded-2xl border border-border-light bg-bg-light p-8">
              <Eyebrow>Matterport vs. FrameFlow</Eyebrow>
              <h2 className="mt-3">
                Different tools for different <strong>needs</strong>.
              </h2>
              <p className="mt-4 text-text-body">
                Matterport and FrameFlow are not competitors. They serve different purposes, and many builders use both.
              </p>
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <div>
                  <h4 className="text-sm font-semibold text-text-dark">Matterport</h4>
                  <p className="mt-2 text-sm text-text-body">
                    Immersive 3D scan of a physical space. Buyers navigate room by room. Captured on-site by a DIG technician. Best for model homes and communities where the &quot;feel&quot; of the space matters.
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-text-dark">FrameFlow</h4>
                  <p className="mt-2 text-sm text-text-body">
                    Digital ordering platform for virtual staging and virtual video. Produces 2D marketing assets from existing photos. Fast, scalable, no on-site scan required. Best for spec homes and standing inventory.
                  </p>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/offerings/frameflow" className="text-sm font-medium text-accent hover:underline">
                  Learn about FrameFlow &rarr;
                </Link>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-bg-dark py-24 text-text-light">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <h2 className="text-text-light">
              Give remote buyers a reason to <strong>commit</strong>.
            </h2>
            <p className="mt-5 text-text-muted">
              Matterport is custom-quoted based on property size and number of spaces. Start with a strategy call.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
              >
                Book a Strategy Call
              </Link>
              <Link
                href="/services/virtual-video"
                className="text-sm font-medium text-text-muted transition-colors hover:text-text-light"
              >
                Need listing video instead? &rarr;
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
