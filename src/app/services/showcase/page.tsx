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
  { key: "hood", alt: "Kitchen at 821 Oleander, wide frame and its stainless hood, walnut cabinets and herringbone backsplash" },
  { key: "faucet", alt: "Kitchen at 13377 Shinnecock Dr, wide frame and its faucet, sink and stone counter at the window" },
  { key: "fridge", alt: "Kitchen at 13377 Shinnecock Dr, wide frame and its built-in refrigerator, wall ovens and cabinetry" },
  { key: "fireplace", alt: "Living room at 821 Oleander, wide frame and its stacked stone fireplace and mantel" },
  { key: "bath", alt: "Primary suite at 821 Oleander, wide frame and its freestanding tub through the double doors" },
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

/**
 * PlanMatch, Moments and Cinematic share one desktop height. Moments sets it:
 * a stacked header over five vertical cards runs about 50rem, so the two film
 * sections give their film the wider column and center in the same box.
 */
const SHOWCASE_SECTION = "lg:flex lg:min-h-[51rem] lg:flex-col lg:justify-center";

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
 * The box is 9/16, matching the vertical frames builders post to social.
 * Moments are vertical only, so nothing is cropped.
 */
function ExampleCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative aspect-9/16 w-full overflow-hidden rounded-xl border border-border-light bg-bg-light">
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
      <section className={`bg-bg-surface py-24 ${SHOWCASE_SECTION}`}>
        <div className="mx-auto w-full max-w-6xl px-6">
          <RevealOnScroll>
            <div className="grid gap-10 lg:grid-cols-[2fr_3fr] lg:items-center lg:gap-16">
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
                {/* Scaled 2% inside the clipped frame: planmatch-02 carries a
                    thin dark line baked into its top and bottom edges. */}
                <SequentialVideo
                  clips={PLANMATCH_CLIPS}
                  className="aspect-video w-full scale-[1.02] object-cover"
                />
              </FeatureFrame>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Moments — cream. Stacked header, three examples, then the ask. */}
      <section className={`bg-bg-light py-24 ${SHOWCASE_SECTION}`}>
        <div className="mx-auto w-full max-w-6xl px-6">
          <RevealOnScroll>
            <div className="max-w-3xl">
              <ShowcaseSectionHeader
                slotId="services-showcase-moments"
                eyebrowDefault="Moments"
                headlineDefault="The details a wide listing shot <strong>misses</strong>."
                leadDefault="Vertical close ups of what is built into the home: cabinetry, stone, fixtures and appliances. Made for social."
              />
            </div>
          </RevealOnScroll>
          <RevealOnScroll>
            {/* Five verticals: a swipeable row below lg, one row of five from lg up. */}
            <div className="-mx-6 mt-12 flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 pb-2 lg:mx-0 lg:grid lg:max-w-[60rem] lg:grid-cols-5 lg:overflow-visible lg:px-0 lg:pb-0">
              {MOMENTS_PAIRS.map((pair) => (
                <div key={pair.key} className="w-[62%] shrink-0 snap-start sm:w-[30%] lg:w-auto">
                  <ExampleCard>
                    <CrossfadePair
                      first={`/showcase/moments-${pair.key}-1.webp`}
                      second={`/showcase/moments-${pair.key}-2.webp`}
                      alt={pair.alt}
                      sizes="(max-width: 640px) 62vw, (max-width: 1024px) 30vw, 220px"
                    />
                  </ExampleCard>
                </div>
              ))}
            </div>
            <AskButton />
          </RevealOnScroll>
        </div>
      </section>

      {/* Cinematic — white. PlanMatch inverted: large film left, text right. */}
      <section className={`bg-bg-surface py-24 ${SHOWCASE_SECTION}`}>
        <div className="mx-auto w-full max-w-6xl px-6">
          <RevealOnScroll>
            <div className="grid gap-10 lg:grid-cols-[3fr_2fr] lg:items-center lg:gap-16">
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
