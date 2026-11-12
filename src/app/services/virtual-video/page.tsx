import type { Metadata } from "next";
import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";
import { DynamicImage } from "@/components/DynamicImage";
import { EditableHero } from "@/components/EditableHero";
import { EditableTextContent } from "@/components/EditableTextContent";
import { DarkSection } from "@/components/DarkSection";
import { JsonLd } from "@/components/JsonLd";
import { buildServiceSchema, buildBreadcrumbSchema } from "@/lib/seo";
import { TestimonialBand } from "@/components/TestimonialBand";
import { ProductTags } from "@/components/ProductTags";

export const metadata: Metadata = {
  alternates: { canonical: "/services/virtual-video" },
  title: "FrameFlow Video",
  description: "FrameFlow converts your images, whether they are interiors, exteriors, or amenities, into lifelike video sequences. Ordered on demand through digDesk.",
};

const differentiators = [
  {
    title: "No shoot day required",
    body: "We build the video from photography you already have, so there is no shoot to schedule.",
  },
  {
    title: "Vertical and horizontal",
    body: "Order both versions so you can use the video in different formats, from your website to social.",
  },
  {
    title: "Consistent from listing to listing",
    body: "The same pacing and the same quality on every property.",
  },
  {
    title: "Pairs with ModelMatch",
    body: "Order ModelMatch and FrameFlow together and we build your video from the staged images.",
  },
];

export default function VirtualVideoPage() {
  return (
    <>
      <JsonLd
        data={buildServiceSchema({
          name: "Virtual Video",
          description:
            "Digital video built from existing photos or staging output. No shoot, no crew. Also DIG's listing video solution for spec and inventory homes.",
          path: "/services/virtual-video",
          serviceType: "Video Production",
        })}
      />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Solutions", path: "/services" },
          { name: "Virtual Video", path: "/services/virtual-video" },
        ])}
      />
      {/* Hero */}
      <DarkSection className="min-h-[60vh] py-28 text-text-light">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <EditableHero
              slotId="services-virtual-video-hero"
              eyebrowDefault="Solutions / FrameFlow"
              headlineDefault="Need video from the photos you <strong>already have</strong>?"
              subheadDefault="FrameFlow converts your images, whether they're interiors, exteriors, or amenities, into lifelike video sequences. This works with virtual images, model home images, and amenity photographs."
            />
            <ProductTags line="Flow" stage="List" />
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
                  headlineDefault="Your static images, converted into <strong>dynamic video</strong>."
                  bodyDefault="If you have a large library of assets but need video to help elevate your website presence or create more dynamic social media content, you can order FrameFlow videos on demand."
                />
                <p className="mt-4 text-text-body">
                  FrameFlow is how DIG produces video for spec homes and listings. For crew-based film of your model homes and communities, see Premium Video.
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
              <div className="overflow-hidden rounded-2xl bg-bg-light">
                <DynamicImage
                  slotId="services-virtual-video-img"
                  className="h-full w-full"
                  fallbackClass="h-full w-full bg-gradient-to-br from-bg-surface to-border-light"
                  aspectRatio="16/9"
                />
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
                headlineDefault="Why builders use <strong>FrameFlow</strong>."
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
                bodyDefault="Order FrameFlow by itself through digDesk, or bundle it with listing photography and ModelMatch staging inside Spec+."
              />
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border border-border-light p-6">
                <h4 className="text-base font-semibold text-text-dark">Standalone Virtual Video</h4>
                <p className="mt-2 text-sm text-text-body">
                  Already have photos? Upload them through digDesk and receive a finished FrameFlow video.
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
                  Listing photography, 8 ModelMatch staged images and a FrameFlow video in one $600 order, delivered within 72 hours of the shoot.
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

      {/* Customer proof */}
      <TestimonialBand ids={["carrie-videos"]} />

      {/* The rest of Flow: CineFlow and ActFlow */}
      <section id="actflow" className="scroll-mt-24 bg-bg-light py-24">
        <div className="mx-auto max-w-6xl px-6">
          <RevealOnScroll>
            <Eyebrow>More from Flow</Eyebrow>
            <h2>
              CineFlow and <strong>ActFlow</strong>.
            </h2>
          </RevealOnScroll>
          <RevealOnScroll stagger={120}>
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-border-light bg-bg-surface p-8">
                <h3>CineFlow</h3>
                <p className="mt-3 leading-relaxed text-text-body">
                  CineFlow takes this even further by relighting each space, adding new angles, and providing
                  lifelike cinematic sequences without a real photo shoot.
                </p>
                <Link
                  href="/services/showcase#cineflow"
                  className="mt-5 inline-block text-sm font-medium text-text-dark transition-colors hover:text-accent"
                >
                  See CineFlow &rarr;
                </Link>
              </div>
              <div className="rounded-2xl border border-border-light bg-bg-surface p-8">
                <h3>ActFlow</h3>
                <p className="mt-3 leading-relaxed text-text-body">
                  ActFlow introduces virtual talent to your spaces so buyers can envision what life looks like
                  in your homes and amenities.
                </p>
                <Link
                  href="/contact?intent=strategy"
                  className="mt-5 inline-block text-sm font-medium text-text-dark transition-colors hover:text-accent"
                >
                  Ask about ActFlow &rarr;
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
              headlineDefault="Need to refresh old assets with a <strong>new video</strong>?"
              bodyDefault="Create your digDesk account and order FrameFlow for your inventory today."
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
