import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";
import { DynamicImage } from "@/components/DynamicImage";
import { EditableHero } from "@/components/EditableHero";
import { EditableTextContent } from "@/components/EditableTextContent";
import { DarkSection } from "@/components/DarkSection";
import { JsonLd } from "@/components/JsonLd";
import { ProductTags } from "@/components/ProductTags";
import { ShowcaseFilm } from "@/components/ShowcaseFilm";
import { buildServiceSchema, buildBreadcrumbSchema } from "@/lib/seo";

export interface ProductFilm {
  src: string;
  poster: string;
  label: string;
  sound?: boolean;
}

export interface ProductSlot {
  /** Suffix only. The slot id becomes `services-{slug}-{id}-img`. */
  id: string;
  /** Local image shown until one is assigned in admin. Omit for an empty slot. */
  defaultSrc?: string;
  alt?: string;
}

export interface ProductPageConfig {
  slug: string;
  name: string;
  line: string;
  stage: string;
  schemaDescription: string;
  serviceType: string;
  hero: { headline: string; subhead: string };
  /** The film that opens the page, full width under the hero. */
  leadFilm?: ProductFilm;
  intro: { eyebrow: string; headline: string; body: string };
  points: { title: string; body: string }[];
  /** More films, two across. */
  films?: ProductFilm[];
  /** Still images. Landscape sits three across, vertical five across. */
  gallery?: { eyebrow: string; headline: string; shape: "landscape" | "vertical"; slots: ProductSlot[] };
  related: { label: string; href: string; body: string }[];
  cta: { headline: string; body: string };
}

/**
 * One layout for the products that used to live only as chapters on the
 * showcase: PlanMatch, Moments, CineFlow, ActFlow. Server component: pages
 * pass a plain config object and every editable or image slot derives its id
 * from the slug.
 */
export function ProductPage({ config: c }: { config: ProductPageConfig }) {
  const path = `/services/${c.slug}`;
  const slot = (id: string) => `services-${c.slug}-${id}`;

  return (
    <>
      <JsonLd
        data={buildServiceSchema({
          name: c.name,
          description: c.schemaDescription,
          path,
          serviceType: c.serviceType,
        })}
      />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Solutions", path: "/services" },
          { name: c.name, path },
        ])}
      />

      {/* Hero */}
      <DarkSection className="min-h-[60vh] py-28 text-text-light">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <EditableHero
              slotId={slot("hero")}
              eyebrowDefault={`Solutions / ${c.name}`}
              headlineDefault={c.hero.headline}
              subheadDefault={c.hero.subhead}
            />
            <ProductTags line={c.line} stage={c.stage} />
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/contact?intent=demo"
                className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
              >
                Schedule Demo
              </Link>
              <Link
                href="/services/showcase"
                className="text-sm font-medium text-text-muted transition-colors hover:text-text-light"
              >
                See the showcase &rarr;
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </DarkSection>

      {/* Lead film, edge to edge on the dark */}
      {c.leadFilm && (
        <section className="bg-bg-dark pb-24">
          <div className="mx-auto max-w-6xl px-6">
            <RevealOnScroll>
              <ShowcaseFilm {...c.leadFilm} className="overflow-hidden rounded-2xl ring-1 ring-white/10" />
            </RevealOnScroll>
          </div>
        </section>
      )}

      {/* What it is */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <RevealOnScroll>
            <div className="max-w-3xl">
              <EditableTextContent
                slotId={slot("intro")}
                eyebrowDefault={c.intro.eyebrow}
                headlineDefault={c.intro.headline}
                bodyDefault={c.intro.body}
              />
            </div>
          </RevealOnScroll>
          <RevealOnScroll stagger={120}>
            <div className="mt-14 grid gap-10 border-t border-border-light pt-10 lg:grid-cols-3">
              {c.points.map((p, i) => (
                <div key={p.title}>
                  <p className="text-xs font-bold tracking-[0.15em] text-text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3">{p.title}</h3>
                  <p className="mt-3 leading-relaxed text-text-body">{p.body}</p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* More films */}
      {c.films && c.films.length > 0 && (
        <DarkSection className="py-24 text-text-light">
          <div className="mx-auto max-w-6xl px-6">
            <RevealOnScroll stagger={120}>
              <div className="grid gap-6 lg:grid-cols-2">
                {c.films.map((f) => (
                  <ShowcaseFilm key={f.src} {...f} className="overflow-hidden rounded-2xl ring-1 ring-white/10" />
                ))}
              </div>
            </RevealOnScroll>
          </div>
        </DarkSection>
      )}

      {/* Stills */}
      {c.gallery && (
        // Hidden until at least one slot has an image, so visitors never see a
        // heading over an empty grid. Admins see the empty slots and can fill them.
        <section className="bg-bg-light py-24 lg:py-32 [&:not(:has([data-slot]))]:hidden">
          <div className="mx-auto max-w-6xl px-6">
            <RevealOnScroll>
              <Eyebrow>{c.gallery.eyebrow}</Eyebrow>
              <h2 dangerouslySetInnerHTML={{ __html: c.gallery.headline }} />
            </RevealOnScroll>
            <RevealOnScroll>
              {c.gallery.shape === "vertical" ? (
                <div className="-mx-6 mt-12 flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 pb-2 lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0">
                  {c.gallery.slots.map((s) => (
                    <div key={s.id} className="w-[62%] shrink-0 snap-start empty:hidden sm:w-[34%] lg:w-auto">
                      <DynamicImage
                        slotId={slot(`${s.id}-img`)}
                        defaultSrc={s.defaultSrc}
                        defaultAlt={s.alt}
                        hideWhenEmpty
                        aspectRatio="9/16"
                        className="rounded-[1.5rem]"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
                  {c.gallery.slots.map((s) => (
                    <DynamicImage
                      key={s.id}
                      slotId={slot(`${s.id}-img`)}
                      defaultSrc={s.defaultSrc}
                      defaultAlt={s.alt}
                      hideWhenEmpty
                      aspectRatio="3/2"
                      className="rounded-xl"
                    />
                  ))}
                </div>
              )}
            </RevealOnScroll>
          </div>
        </section>
      )}

      {/* Goes with */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <RevealOnScroll>
            <Eyebrow>Goes with</Eyebrow>
          </RevealOnScroll>
          <RevealOnScroll stagger={120}>
            <div className="mt-6 grid gap-6 lg:grid-cols-3">
              {c.related.map((r) => (
                <Link
                  key={r.href}
                  href={r.href}
                  className="group rounded-2xl border border-border-light bg-bg-surface p-8 transition-colors hover:border-accent"
                >
                  <h3>{r.label}</h3>
                  <p className="mt-3 leading-relaxed text-text-body">{r.body}</p>
                  <span className="mt-5 inline-block text-sm font-medium text-text-dark transition-colors group-hover:text-accent">
                    See {r.label} &rarr;
                  </span>
                </Link>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Final CTA */}
      <DarkSection className="py-24 text-text-light">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <EditableTextContent
              slotId={slot("cta")}
              headlineDefault={c.cta.headline}
              bodyDefault={c.cta.body}
              dark={true}
            />
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/contact?intent=demo"
                className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
              >
                Schedule Demo
              </Link>
              <Link
                href="/contact?intent=other"
                className="text-sm font-medium text-text-muted transition-colors hover:text-text-light"
              >
                Ask a question &rarr;
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </DarkSection>
    </>
  );
}
