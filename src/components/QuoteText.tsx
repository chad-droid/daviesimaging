import type { Testimonial } from "@/data/testimonials";

/**
 * A testimonial's quote in curly quotes, with its `emphasis` phrase (if any)
 * in bold. The words never change; only the weight does.
 */
export function QuoteText({ t }: { t: Testimonial }) {
  const i = t.emphasis ? t.quote.indexOf(t.emphasis) : -1;
  if (!t.emphasis || i < 0) return <>&ldquo;{t.quote}&rdquo;</>;
  return (
    <>
      &ldquo;{t.quote.slice(0, i)}
      <strong>{t.emphasis}</strong>
      {t.quote.slice(i + t.emphasis.length)}&rdquo;
    </>
  );
}
