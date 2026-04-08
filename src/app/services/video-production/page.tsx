import type { Metadata } from "next";
import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { DynamicImage } from "@/components/DynamicImage";
import { EditableHero } from "@/components/EditableHero";
import { EditableTextContent } from "@/components/EditableTextContent";
import { DarkSection } from "@/components/DarkSection";

export const metadata: Metadata = {
  title: "Video Production | Davies Imaging Group",
  description: "On-site, crew-based video production for homebuilder marketing. Community walkthroughs, lifestyle video, and brand films.",
};

const useCases = [
  {
    title: "Community Walkthroughs",
    body: "Guided tours of your community, amenities, and model homes. Built for website hero sections, sales center displays, and digital ads.",
  },
  {
    title: "Lifestyle Video",
    body: "Talent-driven, story-led video that connects buyers emotionally to your community. Lifestyle video is a primary output of DIG Premium Video.",
  },
  {
    title: "Amenity Showcases",
    body: "Dedicated video for pools, fitness centers, parks, and clubhouses. Gives buyers a reason to choose your community over the competition.",
  },
  {
    title: "Brand Films",
    body: "Longer-form storytelling for builder websites, sales presentations, and investor materials. Crafted to reflect the quality of the homes you build.",
  },
];

export default function VideoProductionPage() {
  return (
    <>
      {/* Hero */}
      <DarkSection className="min-h-[60vh] py-28 text-text-light">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <EditableHero
              slotId="services-video-production-hero"
              eyebrowDefault="Solutions / Video Production"
              headlineDefault="Video that moves buyers to <strong>action</strong>."
              subheadDefault="On-site, crew-based video production for community walkthroughs, lifestyle campaigns, and builder brand films. DIG's highest-craft video output."
            />
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/contact"
                className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
              >
                Book a Strategy Call
              </Link>
              <Link
                href="/gallery/lifestyle"
                className="text-sm font-medium text-text-muted transition-colors hover:text-text-light"
              >
                See lifestyle work &rarr;
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
                  slotId="services-video-production-what-it-is"
                  eyebrowDefault="Premium Video"
                  headlineDefault="One shoot. Every <strong>platform</strong>."
                  bodyDefault="DIG video production delivers assets formatted for website hero loops, social media cuts, email embeds, and sales center displays. One production day, multiple outputs across every channel your team uses."
                />
                <p className="mt-4 text-text-body">
                  This is DIG&apos;s full-crew, high-craft video service. For fast-turn listing video without a crew, see virtual video.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
                  >
                    Request a quote
                  </Link>
                  <Link
                    href="/services/virtual-video"
                    className="rounded-full border border-border-light px-5 py-2 text-sm font-medium text-text-body transition-colors hover:border-accent hover:text-accent"
                  >
                    Need listing video?
                  </Link>
                </div>
              </div>
              <div className="relative aspect-video overflow-hidden rounded-2xl bg-bg-light">
                <DynamicImage
                  slotId="services-video-production-img"
                  className="h-full w-full object-cover"
                  fallbackClass="h-full w-full"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-bg-surface to-border-light [&:has(img)]:hidden">
                  <span className="text-xs font-medium uppercase tracking-widest text-text-muted">Video Production</span>
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
                slotId="services-video-production-use-cases"
                eyebrowDefault="Use Cases"
                headlineDefault="Four ways builders use <strong>DIG video</strong>."
                bodyDefault=""
              />
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {useCases.map((item, i) => (
                <div key={i} className="rounded-xl border border-border-light bg-bg-surface p-6">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="font-mono text-[10px] text-text-muted">0{i + 1}</span>
                    <h4 className="text-base font-semibold text-text-dark">{item.title}</h4>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-text-body">{item.body}</p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Vs virtual video */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <div className="text-center">
              <EditableTextContent
                slotId="services-video-production-which-video"
                eyebrowDefault="Which Video Is Right?"
                headlineDefault="Know which service <strong>fits your need</strong>."
                bodyDefault=""
              />
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border-2 border-accent p-6">
                <div className="mb-2 inline-flex rounded-full bg-accent/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-accent">This Page</div>
                <h4 className="text-base font-semibold text-text-dark">Video Production</h4>
                <p className="mt-2 text-sm text-text-body">On-site crew. Lifestyle talent. Community tours. High-craft brand films. Custom quote based on scope.</p>
                <p className="mt-3 text-xs text-text-muted">Best for: model home launches, lifestyle campaigns, brand storytelling</p>
                <Link href="/contact" className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline">
                  Get a quote &rarr;
                </Link>
              </div>
              <div className="rounded-xl border border-border-light p-6">
                <h4 className="text-base font-semibold text-text-dark">Virtual Video</h4>
                <p className="mt-2 text-sm text-text-body">Digital production from existing photos. No shoot day, no crew. Priced per property, delivered fast through FrameFlow.</p>
                <p className="mt-3 text-xs text-text-muted">Best for: spec home listings, standing inventory, MLS video at scale</p>
                <Link href="/services/virtual-video" className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline">
                  See virtual video &rarr;
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
              slotId="services-video-production-cta"
              headlineDefault="Ready to build video that <strong>earns attention</strong>?"
              bodyDefault="Video production is custom-quoted based on scope, location, and deliverables. Start with a strategy call."
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
                href="/gallery/lifestyle"
                className="text-sm font-medium text-text-muted transition-colors hover:text-text-light"
              >
                View lifestyle work &rarr;
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </DarkSection>
    </>
  );
}
