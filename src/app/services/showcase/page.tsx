import type { Metadata } from "next";
import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { EditableHero } from "@/components/EditableHero";
import { EditableTextContent } from "@/components/EditableTextContent";
import { ShowcaseSectionHeader } from "@/components/ShowcaseSectionHeader";
import { SequentialVideo } from "@/components/SequentialVideo";
import { CrossfadePair } from "@/components/CrossfadePair";
import { DarkSection } from "@/components/DarkSection";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL, buildServiceSchema, buildBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/services/showcase" },
  title: "PlanMatch, Moments and Cinematic",
  description:
    "Three ways to show a home that has to move. Photography made from the plans, short silent vignettes, and a short editorial film, built for the website, paid media, the sales center and the listing refresh.",
};

/** One ask per section. Interest is a signal for DIG to follow up, not an order. */
const ASK_HREF = "/contact?intent=strategy";
const ASK_LABEL = "Show me this on my house";

/** The two PlanMatch films, played back to back in one frame. */
const PLANMATCH_CLIPS = [
  { src: "/showcase/planmatch-01.mp4", poster: "/showcase/planmatch-01.jpg" },
  { src: "/showcase/planmatch-02.mp4", poster: "/showcase/planmatch-02.jpg" },
];

/**
 * Moments: one room per card, shown as the wide frame dissolving to the detail
 * a wide frame misses. 821 Oleander.
 */
const MOMENTS_PAIRS = [
  { key: "a", alt: "Playroom at 821 Oleander, wide frame and the embroidered detail within it" },
  { key: "b", alt: "Bedroom at 821 Oleander, wide frame and its framed detail" },
  { key: "c", alt: "Kitchen at 821 Oleander, wide frame and its counter detail" },
];

/**
 * The three services share this page's path, so each gets its own @id
 * fragment. Three Service nodes on one URL is correct here: the page is the
 * showcase, and none of the three has a page of its own on the public site.
 */
const SERVICES = [
  {
    slug: "planmatch",
    name: "PlanMatch",
    serviceType: "Architectural Visualization",
    description:
      "Photography of a home before it is built, made from the plans, brand approved and ready the day pre-sales open.",
  },
  {
    slug: "moments",
    name: "Moments",
    serviceType: "Video Production",
    description:
      "Detailed close ups of a finished space, perfect for listing pages, paid social and email.",
  },
  {
    slug: "cinematic",
    name: "Cinematic",
    serviceType: "Video Production",
    description:
      "A short editorial film of the home, cut to a music narrative rather than a walkthrough, with a vertical version for social.",
  },
];

function AskButton() {
  return (
    <Link
      href={ASK_HREF}
      className="mt-8 inline-flex rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
    >
      {ASK_LABEL}
    </Link>
  );
}

/** The single large frame used by PlanMatch and Cinematic. No caption bar. */
function FeatureFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border-light bg-bg-light">
      {children}
    </div>
  );
}

/**
 * Example card: the frames alone, no caption bar. The work carries the section.
 *
 * The box is 3/2, matching the source frames, so nothing is cropped.
 */
function ExampleCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative aspect-3/2 w-full overflow-hidden rounded-xl border border-border-light bg-bg-light">
      {children}
    </div>
  );
}

export default function ShowcasePage() {
  return (
    <>
      {SERVICES.map((s) => (
        <JsonLd
          key={s.slug}
          data={{
            ...buildServiceSchema({
              name: s.name,
              description: s.description,
              path: "/services/showcase",
              serviceType: s.serviceType,
            }),
            "@id": SITE_URL + "/services/showcase#" + s.slug,
          }}
        />
      ))}
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Solutions", path: "/services" },
          { name: "Showcase", path: "/services/showcase" },
        ])}
      />

      {/* Hero — dark, left justified, one headline with one bolded payoff */}
      <DarkSection className="min-h-[60vh] py-28 text-text-light">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <EditableHero
              slotId="services-showcase-hero"
              eyebrowDefault="Solutions / Showcase"
              headlineDefault="Three ways to show a home that <strong>has to move</strong>."
              subheadDefault="Photography, vignettes and film built for where a home actually sells: the website, paid media, the sales center and the listing refresh."
            />
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/contact?intent=strategy"
                className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
              >
                Book a Strategy Call
              </Link>
              <Link
                href="/gallery"
                className="text-sm font-medium text-white/60 transition-colors hover:text-text-light"
              >
                See the work &rarr;
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </DarkSection>

      {/* PlanMatch — white. Text left, one large film right. */}
      <section className="bg-bg-surface py-24">
        <div className="mx-auto max-w-6xl px-6">
          <RevealOnScroll>
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
              <div>
                <ShowcaseSectionHeader
                  slotId="services-showcase-planmatch"
                  eyebrowDefault="PlanMatch"
                  headlineDefault="The home sells before it <strong>is built</strong>."
                  leadDefault="Photography made from the plans, brand approved and ready the day pre-sales open."
                  tailDefault="Every elevation held to the standard of the finished model, without waiting on a slab."
                />
                <AskButton />
              </div>
              <FeatureFrame>
                <SequentialVideo
                  clips={PLANMATCH_CLIPS}
                  className="aspect-video w-full object-cover"
                />
              </FeatureFrame>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Moments — cream. Stacked header, three examples, then the ask. */}
      <section className="bg-bg-light py-24">
        <div className="mx-auto max-w-6xl px-6">
          <RevealOnScroll>
            <div className="max-w-3xl">
              <ShowcaseSectionHeader
                slotId="services-showcase-moments"
                eyebrowDefault="Moments"
                headlineDefault="The details a wide listing shot <strong>misses</strong>."
                leadDefault="Detailed close ups of a finished space, perfect for listing pages, paid social and email."
              />
            </div>
          </RevealOnScroll>
          <RevealOnScroll>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {MOMENTS_PAIRS.map((pair) => (
                <ExampleCard key={pair.key}>
                  <CrossfadePair
                    first={`/showcase/moments-${pair.key}-1.webp`}
                    second={`/showcase/moments-${pair.key}-2.webp`}
                    alt={pair.alt}
                  />
                </ExampleCard>
              ))}
            </div>
            <AskButton />
          </RevealOnScroll>
        </div>
      </section>

      {/* Cinematic — white. PlanMatch inverted: large film left, text right. */}
      <section className="bg-bg-surface py-24">
        <div className="mx-auto max-w-6xl px-6">
          <RevealOnScroll>
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
              {/* Text leads on mobile, sits right of the film from lg up. */}
              <div className="order-2 lg:order-1">
                <FeatureFrame>
                  {/* Sound on play: the film carries a control and stays
                      silent until it is pressed, unlike the loops above. */}
                  <video
                    src="/showcase/cinematic.mp4"
                    poster="/showcase/cinematic.jpg"
                    controls
                    playsInline
                    preload="metadata"
                    className="aspect-video w-full object-cover"
                  />
                </FeatureFrame>
              </div>
              <div className="order-1 lg:order-2">
                {/* Single sentence in the source copy, broken at its comma so
                    this section carries the same two-step body as the others. */}
                <ShowcaseSectionHeader
                  slotId="services-showcase-cinematic"
                  eyebrowDefault="Cinematic"
                  headlineDefault="A home told as a story, <strong>not a tour</strong>."
                  leadDefault="A short editorial film cut to a music narrative."
                  tailDefault="With a vertical version for social and stills pulled from the same set."
                />
                <AskButton />
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Next step — dark bookend, the one place centered text is right */}
      <DarkSection className="py-24 text-text-light">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <EditableTextContent
              slotId="services-showcase-cta"
              eyebrowDefault="Next Step"
              headlineDefault="See these on your own <strong>homes</strong>."
              bodyDefault="Tell us the community and we will show all three on a plan you are selling now."
              dark={true}
            />
            <div className="mt-8 flex justify-center">
              <Link
                href="/contact?intent=strategy"
                className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
              >
                Book a Strategy Call
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </DarkSection>
    </>
  );
}
