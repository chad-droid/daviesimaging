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
import { marketCopy, marketFaqs, marketTestimonialIds } from "@/lib/marketCopy";

const CHAPTERS = [
  { id: "coverage", label: "Coverage" },
  { id: "lead", label: "Lead" },
  { id: "launch", label: "Launch" },
  { id: "list", label: "List" },
];

/**
 * One page per market, at /markets/{slug}. It is the homepage told for one
 * metro: the same film hero and the same Lead, Launch, List chapters, with a
 * local opening, a coverage section, local questions and local schema. The
 * wording comes from src/lib/marketCopy.ts, which varies it by market.
 */
export function MarketPage({ market: m }: { market: Market }) {
  const place = inName(m);
  const path = `/markets/${m.slug}`;
  const faqs = marketFaqs(m);
  const copy = marketCopy(m);
  const proof = marketTestimonialIds(m);

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
        subhead={copy.heroSubhead}
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
                <h2 dangerouslySetInnerHTML={{ __html: copy.coverageHeadline }} />
              </div>
              <div className="space-y-5 text-[1.0625rem] leading-relaxed text-text-body">
                <p>{m.blurb}</p>
                <p>{copy.coverageBody}</p>
                {m.isOffice && (
                  <p>{copy.officeBody}</p>
                )}
                <ul className="flex flex-wrap gap-2 pt-1">
                  {m.areas.map((a) => (
                    <li key={a} className="rounded-full border border-border-light px-3.5 py-1 text-sm text-text-body">
                      {a}
                    </li>
                  ))}
                </ul>
                {copy.neighbors.length > 0 && (
                  <p className="pt-1 text-sm text-text-body">
                    Also building elsewhere in the {REGION_LABELS[m.region]} region? We shoot in{" "}
                    {copy.neighbors.map((n, i) => (
                      <span key={n.slug}>
                        {i > 0 && (i === copy.neighbors.length - 1 ? " and " : ", ")}
                        <Link href={`/markets/${n.slug}`} className="text-accent hover:underline">
                          {n.name}
                        </Link>
                      </span>
                    ))}
                    {" "}too.
                  </p>
                )}
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
          body={copy.leadBody}
        />
        <PlanMatchChapter />
      </div>

      <div id="launch" className="scroll-mt-28">
        <StageHeader
          n="02"
          stage="Launch"
          body={copy.launchBody}
        />
        <PremiumChapter body={copy.premiumBody} />
        <FilmChapter />
      </div>

      <div id="list" className="scroll-mt-28">
        <StageHeader
          n="03"
          stage="List"
          body={copy.listBody}
        />
        <SpecPlusPinned />
        <ModelMatchChapter body={copy.modelMatchBody} />
      </div>

      <DigDeskChapter />
      <ProofChapter leadId={proof.lead} restIds={proof.rest} />
      <GoogleReviews />

      {/* Local questions */}
      <section className="bg-bg-light py-24">
        <div className="mx-auto max-w-3xl px-6">
          <RevealOnScroll>
            <Eyebrow>{m.name} questions</Eyebrow>
            <h2 className="mb-6 mt-2" dangerouslySetInnerHTML={{ __html: copy.faqHeadline }} />
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
            <h2 className="mb-10 mt-2" dangerouslySetInnerHTML={{ __html: copy.directoryHeadline }} />
            <MarketDirectory current={m.slug} />
          </RevealOnScroll>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
