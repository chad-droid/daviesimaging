import type { Metadata } from "next";
import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { EditableHero } from "@/components/EditableHero";
import { EditableTextContent } from "@/components/EditableTextContent";
import { ShowcaseSectionHeader } from "@/components/ShowcaseSectionHeader";
import Image from "next/image";
import { SequentialVideo } from "@/components/SequentialVideo";
import { ShowcaseFilm } from "@/components/ShowcaseFilm";
import { ShowcaseChapterNav } from "@/components/ShowcaseChapterNav";
import { CrossfadePair } from "@/components/CrossfadePair";
import { DarkSection } from "@/components/DarkSection";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL, buildServiceSchema, buildBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/services/showcase" },
  title: "PlanMatch, Moments and CineFlow",
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
    slug: "cineflow",
    name: "CineFlow",
    serviceType: "Video Production",
    description:
      "A short editorial film of the home, cut to a music narrative rather than a walkthrough, with a vertical version for social.",
  },
];

/** Finished PlanMatch photography, shown under the plan-to-photo film. */
const PLANMATCH_STILLS = [
  { file: "planmatch-coventry-ext-twilight", alt: "PlanMatch front exterior at twilight" },
  { file: "planmatch-04-living-dining-kitchen", alt: "PlanMatch living, dining and kitchen" },
  { file: "planmatch-04-kitchen", alt: "PlanMatch kitchen" },
  { file: "planmatch-05-master-bedroom", alt: "PlanMatch primary bedroom" },
];

/** Chapter order. Drives the sticky chapter bar and the section ids. */
const CHAPTERS = SERVICES.map((s) => ({ id: s.slug, label: s.name }));

/**
 * Three plain facts per chapter. Every value restates copy already approved
 * for this page; nothing here is a new claim, price or turnaround.
 */
const FACTS: Record<string, { label: string; value: string }[]> = {
  planmatch: [
    { label: "Made from", value: "Your plans and brand standards" },
    { label: "You get", value: "Photography of every elevation and room" },
    { label: "Ready for", value: "The day pre-sales open" },
  ],
  moments: [
    { label: "Format", value: "Vertical close ups, silent" },
    { label: "Shows", value: "Cabinetry, stone, fixtures and appliances" },
    { label: "Built for", value: "Listing pages, paid social and email" },
  ],
  cineflow: [
    { label: "Format", value: "Short editorial film, cut to music" },
    { label: "Also included", value: "A vertical cut and stills from the same set" },
    { label: "Built for", value: "The website and the sales center" },
  ],
};

function AskButton() {
  return (
    <Link
      href={ASK_HREF}
      className="inline-flex rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
    >
      {ASK_LABEL}
    </Link>
  );
}

/** Facts on the left, the one ask on the right, under a hairline. */
function ChapterFooter({ slug }: { slug: string }) {
  return (
    <div className="mx-auto mt-12 max-w-6xl px-6">
      <dl className="grid border-y border-white/10 sm:grid-cols-3 sm:divide-x sm:divide-white/10">
        {FACTS[slug].map((f, i) => (
          <div
            key={f.label}
            className={`py-5 sm:py-6 ${i > 0 ? "border-t border-white/10 sm:border-t-0 sm:pl-6" : ""} sm:pr-6`}
          >
            <dt className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-white/45">{f.label}</dt>
            <dd className="mt-2 text-base leading-snug text-text-light">{f.value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-10">
        <AskButton />
      </div>
    </div>
  );
}

/**
 * The film frame. Runs edge to edge on phones and tablets, and sits inside a
 * wide rounded frame from lg up, so the work is the largest thing on screen.
 */
function Stage({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto mt-12 max-w-[100rem] lg:mt-16 lg:px-6">
      <div className="overflow-hidden bg-black lg:rounded-2xl lg:ring-1 lg:ring-white/10">{children}</div>
    </div>
  );
}

const CHAPTER = "scroll-mt-28 border-t border-white/10 py-24 lg:py-32";

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

      {/* Hero: dark, left justified, one headline with one bolded payoff */}
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
              <a
                href="#planmatch"
                className="text-sm font-medium text-white/60 transition-colors hover:text-text-light"
              >
                See the work &darr;
              </a>
            </div>
          </RevealOnScroll>
        </div>
      </DarkSection>

      {/* The whole page stays dark below the hero: the films are the light. */}
      <div className="bg-bg-dark text-text-light">
        <ShowcaseChapterNav chapters={CHAPTERS} ctaHref={ASK_HREF} ctaLabel={ASK_LABEL} />

        {/* 01 PlanMatch: the plan-to-photo film, then the finished photography */}
        <section id="planmatch" className={`${CHAPTER} border-t-0`}>
          <div className="mx-auto max-w-6xl px-6">
            <RevealOnScroll>
              <ShowcaseSectionHeader
                slotId="services-showcase-planmatch"
                index="01"
                eyebrowDefault="PlanMatch"
                headlineDefault="The home sells before it <strong>is built</strong>."
                leadDefault="Photography made from the plans, brand approved and ready the day pre-sales open."
                tailDefault="Every elevation held to the standard of the finished model, without waiting on a slab."
              />
            </RevealOnScroll>
          </div>
          <Stage>
            {/* Scaled 2% inside the clipped frame: planmatch-02 carries a thin
                dark line baked into its top and bottom edges. */}
            <SequentialVideo clips={PLANMATCH_CLIPS} className="aspect-video w-full scale-[1.02] object-cover" />
          </Stage>
          <div className="mx-auto mt-3 max-w-[100rem] lg:px-6">
            <div className="grid grid-cols-2 gap-3 px-3 lg:grid-cols-4 lg:px-0">
              {PLANMATCH_STILLS.map((s) => (
                <div
                  key={s.file}
                  className="relative aspect-[3/2] overflow-hidden rounded-lg bg-bg-dark-surface ring-1 ring-white/10 lg:rounded-xl"
                >
                  <Image
                    src={`/client-showcase/${s.file}.webp`}
                    alt={s.alt}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          <ChapterFooter slug="planmatch" />
        </section>

        {/* 02 Moments: five verticals at phone proportions */}
        <section id="moments" className={CHAPTER}>
          <div className="mx-auto max-w-6xl px-6">
            <RevealOnScroll>
              <ShowcaseSectionHeader
                slotId="services-showcase-moments"
                index="02"
                eyebrowDefault="Moments"
                headlineDefault="The details a wide listing shot <strong>misses</strong>."
                leadDefault="Vertical close ups of what is built into the home: cabinetry, stone, fixtures and appliances. Made for social."
              />
            </RevealOnScroll>
          </div>
          {/* A swipeable row below lg, one row of five from lg up. */}
          <div className="mx-auto mt-12 max-w-6xl lg:mt-16 lg:px-6">
            <div className="flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 pb-2 lg:grid lg:grid-cols-5 lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0">
              {MOMENTS_PAIRS.map((pair) => (
                <div key={pair.key} className="w-[62%] shrink-0 snap-start sm:w-[34%] lg:w-auto">
                  <div className="relative aspect-9/16 w-full overflow-hidden rounded-[1.5rem] bg-bg-dark-surface ring-1 ring-white/10">
                    <CrossfadePair
                      first={`/showcase/moments-${pair.key}-1.webp`}
                      second={`/showcase/moments-${pair.key}-2.webp`}
                      alt={pair.alt}
                      sizes="(max-width: 640px) 62vw, (max-width: 1024px) 34vw, 220px"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <ChapterFooter slug="moments" />
        </section>

        {/* 03 CineFlow: the film, playing, with sound one tap away */}
        <section id="cineflow" className={CHAPTER}>
          <div className="mx-auto max-w-6xl px-6">
            <RevealOnScroll>
              <ShowcaseSectionHeader
                slotId="services-showcase-cinematic"
                index="03"
                eyebrowDefault="CineFlow"
                headlineDefault="A home told as a story, <strong>not a tour</strong>."
                leadDefault="A short editorial film cut to a music narrative."
                tailDefault="With a vertical version for social and stills pulled from the same set."
              />
            </RevealOnScroll>
          </div>
          <Stage>
            <ShowcaseFilm
              src="/showcase/cinematic.mp4"
              poster="/showcase/cinematic.jpg"
              label="CineFlow film of a model home"
              sound
            />
          </Stage>
          <ChapterFooter slug="cineflow" />
        </section>
      </div>

      {/* Next step: dark bookend, the one place centered text is right */}
      <DarkSection className="border-t border-white/10 py-24 text-text-light">
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
