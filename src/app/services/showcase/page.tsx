import type { Metadata } from "next";
import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { DynamicImage } from "@/components/DynamicImage";
import { EditableHero } from "@/components/EditableHero";
import { EditableTextContent } from "@/components/EditableTextContent";
import { EditableParagraph } from "@/components/EditableParagraph";
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
      "Short silent vignettes of a finished space, cut for listing pages, paid social and email. Five per home, vertical and horizontal.",
  },
  {
    slug: "cinematic",
    name: "Cinematic",
    serviceType: "Video Production",
    description:
      "A short editorial film of the home, cut to a music narrative rather than a walkthrough, with a vertical version for social.",
  },
];

/**
 * Example card. Every card on the page is the documented light card: white on
 * the border-light hairline, so the sections separate without borders.
 */
function ExampleCard({
  label,
  caption,
  children,
}: {
  label: string;
  caption: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="overflow-hidden rounded-xl border border-border-light bg-bg-surface">
      {children}
      <figcaption className="flex items-baseline justify-between gap-3 px-4 py-3">
        <span className="text-sm font-semibold text-text-dark">{label}</span>
        <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-text-muted">
          {caption}
        </span>
      </figcaption>
    </figure>
  );
}

/** Silent autoplay loop. No controls and no audio track, so nothing competes with the work. */
function LoopCard({ src, poster, label }: { src: string; poster: string; label: string }) {
  return (
    <ExampleCard label={label} caption="Silent loop">
      <div className="relative aspect-video bg-bg-light">
        <video
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={label + ", silent looping example"}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </ExampleCard>
  );
}

/**
 * Placeholder example. Wired to a DynamicImage slot so the final Moments and
 * Cinematic media can be assigned from /admin without a code change.
 */
function SlotCard({
  slotId,
  label,
  caption,
  aspectRatio,
}: {
  slotId: string;
  label: string;
  caption: string;
  aspectRatio: string;
}) {
  return (
    <ExampleCard label={label} caption={caption}>
      <DynamicImage
        slotId={slotId}
        className="w-full"
        fallbackClass="w-full bg-gradient-to-br from-bg-light to-border-light"
        aspectRatio={aspectRatio}
        disableLightbox
        disableBeforeAfter
      />
    </ExampleCard>
  );
}

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

      {/* PlanMatch — white */}
      <section className="bg-bg-surface py-24">
        <div className="mx-auto max-w-6xl px-6">
          <RevealOnScroll>
            <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-16">
              <EditableTextContent
                slotId="services-showcase-planmatch"
                eyebrowDefault="PlanMatch"
                headlineDefault="The home sells before it <strong>is built</strong>."
                bodyDefault=""
              />
              <div>
                <EditableParagraph
                  slotId="services-showcase-planmatch-body"
                  bodyDefault="Photography made from the plans, brand approved and ready the day pre-sales open. Every elevation held to the standard of the finished model, without waiting on a slab."
                />
                <AskButton />
              </div>
            </div>
          </RevealOnScroll>
          <RevealOnScroll>
            <div className="mt-14 grid gap-6 sm:grid-cols-2">
              <LoopCard
                src="/showcase/planmatch-01.mp4"
                poster="/showcase/planmatch-01.jpg"
                label="PlanMatch 01"
              />
              <LoopCard
                src="/showcase/planmatch-02.mp4"
                poster="/showcase/planmatch-02.jpg"
                label="PlanMatch 02"
              />
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Moments — cream */}
      <section className="bg-bg-light py-24">
        <div className="mx-auto max-w-6xl px-6">
          <RevealOnScroll>
            <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-16">
              <EditableTextContent
                slotId="services-showcase-moments"
                eyebrowDefault="Moments"
                headlineDefault="The details a wide listing shot <strong>misses</strong>."
                bodyDefault=""
              />
              <div>
                <EditableParagraph
                  slotId="services-showcase-moments-body"
                  bodyDefault="Short vignettes of a finished space, silent by design, cut for listing pages, paid social and email. Five per home, vertical and horizontal."
                />
                <AskButton />
              </div>
            </div>
          </RevealOnScroll>
          <RevealOnScroll>
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {[1, 2, 3, 4, 5].map((n) => (
                <SlotCard
                  key={n}
                  slotId={"services-showcase-moments-0" + n + "-img"}
                  label={"Moments 0" + n}
                  caption="Silent loop"
                  aspectRatio="4/5"
                />
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Cinematic — white */}
      <section className="bg-bg-surface py-24">
        <div className="mx-auto max-w-6xl px-6">
          <RevealOnScroll>
            <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-16">
              <EditableTextContent
                slotId="services-showcase-cinematic"
                eyebrowDefault="Cinematic"
                headlineDefault="A home told as a story, <strong>not a tour</strong>."
                bodyDefault=""
              />
              <div>
                <EditableParagraph
                  slotId="services-showcase-cinematic-body"
                  bodyDefault="A short editorial film cut to a music narrative, with a vertical version for social and stills pulled from the same set."
                />
                <AskButton />
              </div>
            </div>
          </RevealOnScroll>
          <RevealOnScroll>
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((n) => (
                <SlotCard
                  key={n}
                  slotId={"services-showcase-cinematic-0" + n + "-img"}
                  label={"Cinematic 0" + n}
                  caption="Sound on play"
                  aspectRatio="16/9"
                />
              ))}
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
