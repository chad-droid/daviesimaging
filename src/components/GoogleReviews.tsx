import { DarkSection } from "@/components/DarkSection";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";
import { googleReviews, GOOGLE_PROFILE_URL, GOOGLE_RATING, GOOGLE_REVIEW_COUNT } from "@/lib/reviews";

function Stars({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex gap-0.5 text-[#F5B942] ${className}`} role="img" aria-label="5 out of 5 stars">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden="true">
          <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
        </svg>
      ))}
    </span>
  );
}

/**
 * DIG's Google reviews, word for word, with the rating and a link to the
 * profile. No review schema on purpose: Google does not show stars for reviews
 * a business publishes about itself.
 */
export function GoogleReviews() {
  return (
    <DarkSection className="py-24 text-text-light lg:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <RevealOnScroll>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Eyebrow dark>Google reviews</Eyebrow>
              <h2 className="text-text-light">
                Rated <strong>{GOOGLE_RATING}</strong> on Google.
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <Stars />
              <span className="text-sm text-text-muted">{GOOGLE_REVIEW_COUNT} reviews</span>
              <a
                href={GOOGLE_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-text-light underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white"
              >
                Read them on Google
              </a>
            </div>
          </div>
        </RevealOnScroll>
        <RevealOnScroll stagger={100}>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {googleReviews.map((r) => (
              <blockquote key={r.name} className="flex flex-col rounded-xl border border-white/10 bg-white/5 p-7">
                <Stars />
                <p className="mt-4 flex-1 leading-relaxed text-white/85">{r.text}</p>
                <footer className="mt-6 text-sm font-semibold text-text-light">{r.name}</footer>
              </blockquote>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </DarkSection>
  );
}
