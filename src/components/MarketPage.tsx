import Link from "next/link";
import { BuilderLogoStrip } from "@/components/BuilderLogoStrip";
import { ShowcaseChapterNav } from "@/components/ShowcaseChapterNav";
import { FinalCta } from "@/components/sections/FinalCta";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";
import { ImageBand } from "@/components/ImageBand";
import { SpecFaq } from "@/components/SpecFaq";
import { MarketDirectory } from "@/components/MarketDirectory";
import { GoogleReviews } from "@/components/GoogleReviews";
import { JsonLd } from "@/components/JsonLd";
import { HomeHero } from "@/components/home/HomeHero";
import { SpecPlusPinned } from "@/components/home/SpecPlusPinned";
import {
  StageHeader,
  ModelMatchChapter,
  FilmChapter,
  PlanMatchChapter,
  PremiumChapter,
  DigDeskChapter,
  ProofChapter,
} from "@/components/home/chapters";
import { SITE_URL, buildServiceSchema, buildBreadcrumbSchema, buildFaqSchema } from "@/lib/seo";
import { inName, REGION_LABELS, type Market } from "@/lib/markets";

const CHAPTERS = [
  { id: "coverage", label: "Coverage" },
  { id: "lead", label: "Lead" },
  { id: "launch", label: "Launch" },
  { id: "list", label: "List" },
];

/** "A, B and C" */
const list = (xs: string[]) =>
  xs.length < 2 ? xs.join("") : `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`;

/** Questions a builder in this market asks. Also emitted as FAQ schema. */
export function marketFaqs(m: Market) {
  const place = inName(m);
  return [
    {
      q: `Does DIG photograph new homes in ${place}?`,
      a: `Yes. ${m.name} is one of the 26 U.S. markets DIG shoots in, covering ${list(m.areas)} and the communities around them.`,
    },
    {
      q: `Which services can I order in ${m.name}?`,
      a: `All of them. Model home, amenity and lifestyle photography, Premium Video, Listing Photography and Spec+ are shot on site in ${place}. ModelMatch, PlanMatch, Moments, FrameFlow, CineFlow and ActFlow are made from your photos or plans, so they need no shoot at all.`,
    },
    {
      q: `How fast can a spec home in ${m.name} be photographed and listed?`,
      a: "A Spec+ order is 25 listing photos, 8 ModelMatch staged images and 1 FrameFlow video, delivered together within 72 hours of the shoot.",
    },
    {
      q: `How do I book a shoot in ${m.name}?`,
      a: "Order in digDesk. Give us the address, the homesite details and any access instructions, and we coordinate with your sales team. You do not need to be on site.",
    },
  ];
}

/**
 * One page per market, at /markets/{slug}. It is the homepage told for one
 * metro: the same film hero and the same Lead, Launch, List chapters, with a
 * local opening, a coverage section, local questions and local schema.
 */
export function MarketPage({ market: m }: { market: Market }) {
  const place = inName(m);
  const path = `/markets/${m.slug}`;
  const faqs = marketFaqs(m);

  return (
    <>
      <JsonLd
        data={buildServiceSchema({
          name: `Home builder photography in ${m.name}, ${m.state}`,
          description: `Model home photography, listing photography, virtual staging and video for home builders in ${place}.`,
          path,
          serviceType: "Home builder photography",
          city: { name: m.name, state: m.stateName },
        })}
      />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Our Markets", path: "/markets/region" },
          { name: m.name, path },
        ])}
      />
      <JsonLd data={buildFaqSchema(faqs, `${SITE_URL}${path}`)} />

      <HomeHero
        compactHeadline
        eyebrow={`${REGION_LABELS[m.region]} region · ${m.name}, ${m.state}`}
        headline={`Home builder photography in <strong>${place}</strong>.`}
        subhead={`Model homes, spec homes and amenities, photographed, staged and filmed for home builders across ${list(m.areas.slice(0, 3))}.`}
      />
      <BuilderLogoStrip />
      <ShowcaseChapterNav chapters={CHAPTERS} ctaHref="/modelmatch-datalibrary" ctaLabel="Start My Free Trial" />

      {/* Coverage: the part of the page that is only about this market */}
      <section id="coverage" className="scroll-mt-28 bg-bg-surface py-24">
        <div className="mx-auto max-w-6xl px-6">
          <RevealOnScroll>
            <div className="grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
              <div>
                <Eyebrow>Markets / {m.name}</Eyebrow>
                <h2>
                  Where we shoot in <strong>{place}</strong>.
                </h2>
              </div>
              <div className="space-y-5 text-[1.0625rem] leading-relaxed text-text-body">
                <p>{m.blurb}</p>
                <p>
                  Our photographers work new home communities in {list(m.areas)}, and the neighborhoods between them. You get the same process and the same delivery standard here as in every other DIG market.
                </p>
                {m.isOffice && (
                  <p>
                    DIG has an office in {m.city}, so your account team and your photographers are in the same market you build in.
                  </p>
                )}
                <ul className="flex flex-wrap gap-2 pt-1">
                  {m.areas.map((a) => (
                    <li key={a} className="rounded-full border border-border-light px-3.5 py-1 text-sm text-text-body">
                      {a}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-x-6 gap-y-2 pt-3">
                  <Link href="/contact?intent=strategy" className="text-sm font-medium text-accent hover:underline">
                    Book a strategy call &rarr;
                  </Link>
                  <Link href="/gallery/models" className="text-sm font-medium text-accent hover:underline">
                    See model home photography &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Local photography. Hidden until an image from this market is assigned in admin. */}
      <ImageBand slotId={`markets-${m.slug}-hero-img`} alt={`New home photographed by DIG in ${m.name}, ${m.state}`} />

      <div id="lead" className="scroll-mt-28">
        <StageHeader
          dark
          n="01"
          stage="Lead"
          body={`Before your ${m.name} communities are ever built, you can have photorealistic photographs and video of every plan, modeled or not, so your prospects understand the neighborhood you are bringing into their lives.`}
        />
        <PlanMatchChapter />
      </div>

      <div id="launch" className="scroll-mt-28">
        <StageHeader
          n="02"
          stage="Launch"
          body={`When your model homes open in ${place}, you get highly trained photographers and the best model home photography, video and Matterport available to the industry.`}
        />
        <PremiumChapter />
        <FilmChapter />
      </div>

      <div id="list" className="scroll-mt-28">
        <StageHeader
          n="03"
          stage="List"
          body={`Once you are ready to sell, every spec home in ${place} can be listed looking its absolute best, while your team focuses on marketing rather than coordination and retouching.`}
        />
        <SpecPlusPinned />
        <ModelMatchChapter />
      </div>

      <DigDeskChapter />
      <ProofChapter />
      <GoogleReviews />

      {/* Local questions */}
      <section className="bg-bg-light py-24">
        <div className="mx-auto max-w-3xl px-6">
          <RevealOnScroll>
            <Eyebrow>{m.name} questions</Eyebrow>
            <h2 className="mb-6 mt-2">
              Working with DIG in <strong>{place}</strong>.
            </h2>
            <SpecFaq items={faqs} idPrefix={`market-${m.slug}`} />
            <p className="mt-6 text-sm text-text-body">
              More answers on the <Link href="/faq" className="text-accent hover:underline">FAQ page</Link>.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Every other market */}
      <section className="bg-bg-surface py-24">
        <div className="mx-auto max-w-6xl px-6">
          <RevealOnScroll>
            <Eyebrow>Our Markets</Eyebrow>
            <h2 className="mb-10 mt-2">
              The same quality in <strong>26 markets</strong>.
            </h2>
            <MarketDirectory current={m.slug} />
          </RevealOnScroll>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
