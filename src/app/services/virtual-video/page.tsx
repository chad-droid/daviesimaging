import type { Metadata } from "next";
import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { DynamicImage } from "@/components/DynamicImage";
import { EditableHero } from "@/components/EditableHero";
import { EditableTextContent } from "@/components/EditableTextContent";
import { DarkSection } from "@/components/DarkSection";

export const metadata: Metadata = {
  title: "Virtual Video | Davies Imaging Group",
  description: "Digital listing video built from your existing photography. No shoot day, no crew. Fast delivery through digDesk.",
};

const differentiators = [
  {
    title: "No shoot day required",
    body: "We build the video from photography you already have. No scheduling, no crew, no weather delays. Send the photos, receive the video.",
  },
  {
    title: "MLS, website, and social ready",
    body: "Each video is exported in the formats and aspect ratios your team actually needs: landscape for web, vertical for social, and a clean MLS-ready cut.",
  },
  {
    title: "Consistent from listing to listing",
    body: "Same pacing, same brand feel, same quality standard across every property. No production day variability. Every video looks like the last.",
  },
  {
    title: "Pairs with virtual staging",
    body: "Order virtual staging and virtual video together and we build your video from the staged images, not empty rooms. Every listing looks move-in ready.",
  },
];

export default function VirtualVideoPage() {
  return (
    <>
      {/* Hero */}
      <DarkSection className="min-h-[60vh] py-28 text-text-light">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <EditableHero
              slotId="services-virtual-video-hero"
              eyebrowDefault="Solutions / Virtual Video"
              headlineDefault="Listing video without the <strong>crew</strong>."
              subheadDefault="DIG virtual video transforms existing photography into smooth, cinematic walkthroughs. No shoot day, no scheduling overhead, fast delivery through digDesk."
            />
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="https://desk.daviesimaging.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
              >
                Order via digDesk
              </a>
              <Link
                href="/gallery/lifestyle"
                className="text-sm font-medium text-text-muted transition-colors hover:text-text-light"
              >
                See video examples &rarr;
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
                  slotId="services-virtual-video-what-it-is"
                  eyebrowDefault="From Photos to Video"
                  headlineDefault="Turn stills into buyer <strong>experience</strong>."
                  bodyDefault="Virtual video is DIG's digital production service for listing and spec home video. We take your existing photography, apply professional motion and transitions, and deliver a finished walkthrough video ready for MLS and social."
                />
                <p className="mt-4 text-text-body">
                  DIG does not create listing video with a real camera crew. Virtual video is the fast, consistent solution for builders who need video on every listing without a full production day for each.
                </p>
                <div className="mt-8 flex gap-4">
                  <Link
                    href="/programs/spec-plus"
                    className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
                  >
                    Bundle in Spec+
                  </Link>
                  <Link
                    href="/contact"
                    className="rounded-full border border-border-light px-5 py-2 text-sm font-medium text-text-body transition-colors hover:border-accent hover:text-accent"
                  >
                    Ask a question
                  </Link>
                </div>
              </div>
              <div className="relative aspect-video overflow-hidden rounded-2xl bg-bg-light">
                <DynamicImage
                  slotId="services-virtual-video-img"
                  className="h-full w-full object-cover"
                  fallbackClass="h-full w-full"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-bg-surface to-border-light [&:has(img)]:hidden">
                  <span className="text-xs font-medium uppercase tracking-widest text-text-muted">Video Example</span>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Differentiators */}
      <section className="bg-bg-light py-24">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll>
            <div className="mb-12 text-center">
              <EditableTextContent
                slotId="services-virtual-video-why"
                eyebrowDefault="Why It Works"
                headlineDefault="Fast video for every listing. <strong>No exceptions</strong>."
                bodyDefault=""
              />
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {differentiators.map((item, i) => (
                <div key={i} className="rounded-xl border border-border-light bg-bg-surface p-6">
                  <h4 className="text-base font-semibold text-text-dark">{item.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-text-body">{item.body}</p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* How to order + pricing */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <div className="text-center">
              <EditableTextContent
                slotId="services-virtual-video-how-to-order"
                eyebrowDefault="How to Order"
                headlineDefault="Standalone or <strong>bundled in Spec+</strong>."
                bodyDefault="Order virtual video by itself through digDesk, or bundle it with listing photography and virtual staging inside a Spec+ package."
              />
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border border-border-light p-6">
                <h4 className="text-base font-semibold text-text-dark">Standalone Virtual Video</h4>
                <p className="mt-2 text-sm text-text-body">
                  Already have photos? Upload them through digDesk and receive a finished walkthrough video. No shoot required.
                </p>
                <p className="mt-4 font-serif text-2xl font-semibold text-text-dark">
                  Starting at $150
                  <span className="ml-1 text-sm font-sans font-normal text-text-muted">/ video</span>
                </p>
                <a
                  href="https://desk.daviesimaging.com/register"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
                >
                  Create an account to order &rarr;
                </a>
              </div>
              <div className="rounded-xl border-2 border-accent p-6">
                <div className="mb-2 inline-flex rounded-full bg-accent/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-accent">Best Value</div>
                <h4 className="text-base font-semibold text-text-dark">Spec+ Bundle</h4>
                <p className="mt-2 text-sm text-text-body">
                  Photography + 8 staged images + virtual video in one $600 order. 72-hour delivery after the shoot.
                </p>
                <Link
                  href="/programs/spec-plus"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
                >
                  Learn about Spec+ &rarr;
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
              slotId="services-virtual-video-cta"
              headlineDefault="Every listing deserves <strong>a video</strong>."
              bodyDefault="Create your digDesk account and start ordering virtual video for your inventory today."
              dark={true}
            />
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="https://desk.daviesimaging.com/register"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
              >
                Create Your Account
              </a>
              <Link
                href="/programs/spec-plus"
                className="text-sm font-medium text-text-muted transition-colors hover:text-text-light"
              >
                See the Spec+ bundle &rarr;
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </DarkSection>
    </>
  );
}
