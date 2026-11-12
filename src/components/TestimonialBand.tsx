import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";
import { getTestimonials, type Testimonial } from "@/data/testimonials";

interface TestimonialBandProps {
  /** One or two ids from src/data/testimonials.ts. One renders large; two sit side by side. */
  ids: string[];
  eyebrow?: string;
}

function Attribution({ t }: { t: Testimonial }) {
  return (
    <footer className="mt-6">
      <p className="text-sm font-semibold text-text-dark">{t.name}</p>
      <p className="mt-0.5 text-sm text-text-muted">{[t.title, t.company].filter(Boolean).join(", ")}</p>
    </footer>
  );
}

/**
 * A customer, in their own words, placed where the page's main doubt comes up
 * (normally just above the final CTA). Renders nothing if none of the ids are
 * approved, so a page never shows an empty band.
 */
export function TestimonialBand({ ids, eyebrow = "In their words" }: TestimonialBandProps) {
  const items = getTestimonials(ids).slice(0, 2);
  if (items.length === 0) return null;

  return (
    <section className="bg-bg-light py-24">
      <div className={`mx-auto px-6 ${items.length === 1 ? "max-w-4xl" : "max-w-6xl"}`}>
        <RevealOnScroll>
          <Eyebrow>{eyebrow}</Eyebrow>
          {items.length === 1 ? (
            <blockquote>
              <p
                className="text-[1.75rem] leading-[1.25] text-text-dark lg:text-[2.5rem] lg:leading-[1.2]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                &ldquo;{items[0].quote}&rdquo;
              </p>
              <Attribution t={items[0]} />
            </blockquote>
          ) : (
            <div className="mt-2 grid gap-10 lg:grid-cols-2 lg:gap-16">
              {items.map((t) => (
                <blockquote key={t.id} className="border-l-2 border-accent pl-6">
                  <p
                    className="text-[1.5rem] leading-[1.3] text-text-dark lg:text-[1.75rem]"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <Attribution t={t} />
                </blockquote>
              ))}
            </div>
          )}
        </RevealOnScroll>
      </div>
    </section>
  );
}
