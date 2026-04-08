import type { Metadata } from "next";
import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { DynamicImage } from "@/components/DynamicImage";
import { EditableHero } from "@/components/EditableHero";
import { EditableTextContent } from "@/components/EditableTextContent";
import { DarkSection } from "@/components/DarkSection";

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
      <DarkSection className="min-h-[60vh] py-28 text-text-light">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <EditableHero
              slotId="services-matterport-hero"
              eyebrowDefault="Solutions / Matterport"
              headlineDefault="Let buyers walk through before they <strong>visit</strong>."
              subheadDefault="Matterport 3D virtual tours give buyers an immersive, room-by-room experience of your model homes. Built for remote buyers, sales centers, and digital campaigns."
            />
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/contact"
                className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
              >
                Book a Strategy Call
              </Link>
              <Link
                href="/gallery/models"
                className="text-sm font-medium text-text-muted transition-colors hover:text-text-light"
              >
                See model home work &rarr;
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </DarkSection>

      {/* What it is */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll>
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <EditableTextContent
                  slotId="services-matterport-experience"
                  eyebrowDefault="The Experience"
                  headlineDefault="The next best thing to being <strong>there</strong>."
                  bodyDefault="Matterport captures the complete geometry of a space and delivers an interactive 3D model buyers can navigate room by room. It's the immersive experience that photography alone can't provide."
                />
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
              <EditableTextContent
                slotId="services-matterport-use-cases"
                eyebrowDefault="How Builders Use It"
                headlineDefault="Four ways Matterport earns its <strong>keep</strong>."
                bodyDefault=""
              />
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
              <EditableTextContent
                slotId="services-matterport-vs-frameflow"
                eyebrowDefault="Matterport vs. FrameFlow"
                headlineDefault="Different tools for different <strong>needs</strong>."
                bodyDefault="Matterport and FrameFlow are not competitors. They serve different purposes, and many builders use both."
              />
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
                <Link href="/programs/frameflow" className="text-sm font-medium text-accent hover:underline">
                  Learn about FrameFlow &rarr;
                </Link>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Final CTA */}
      <DarkSection className="py-24 text-text-light">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <EditableTextContent
              slotId="services-matterport-cta"
              headlineDefault="Give remote buyers a reason to <strong>commit</strong>."
              bodyDefault="Matterport is custom-quoted based on property size and number of spaces. Start with a strategy call."
              dark={true}
            />
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
      </DarkSection>
    </>
  );
}
