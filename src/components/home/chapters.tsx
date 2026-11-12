import Link from "next/link";
import { Eyebrow } from "@/components/Eyebrow";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { FlowFilms, ScrollWipe, GlideStrip, ScrubFilm } from "./scroll";
import { getTestimonials, type Testimonial } from "@/data/testimonials";
import { QuoteText } from "@/components/QuoteText";

const BLOB = "https://6pcw74e8rdx0ig2m.public.blob.vercel-storage.com";

const primaryBtn =
  "rounded-full bg-accent px-8 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-accent-hover";

/* ── Stage header: the giant word that opens Lead, Launch and List. ─────── */
export function StageHeader({
  n,
  stage,
  body,
  products,
  dark = false,
}: {
  n: string;
  stage: string;
  body: string;
  products: { label: string; href: string }[];
  dark?: boolean;
}) {
  return (
    <div className={dark ? "border-t border-white/10 bg-bg-dark text-text-light" : "border-t border-border-light bg-bg-surface"}>
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-20 lg:grid-cols-[auto_1fr] lg:items-end lg:gap-20 lg:py-28">
        <RevealOnScroll>
          <p className={`text-xs font-bold uppercase tracking-[0.15em] ${dark ? "text-accent-dark-hover" : "text-accent"}`}>
            Stage {n}
          </p>
          <p
            className={`mt-2 text-[5.5rem] leading-[0.85] tracking-tight lg:text-[11rem] ${dark ? "text-text-light" : "text-text-dark"}`}
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {stage}
            <span className="text-accent">.</span>
          </p>
        </RevealOnScroll>
        <RevealOnScroll>
          <p className={`max-w-2xl text-xl leading-relaxed lg:text-[1.4rem] ${dark ? "text-white/80" : "text-text-body"}`}>{body}</p>
          <div className="mt-7 flex flex-wrap gap-2">
            {products.map((p) => (
              <Link
                key={p.label}
                href={p.href}
                className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                  dark
                    ? "border-white/20 text-white/85 hover:border-white hover:text-white"
                    : "border-border-light text-text-dark hover:border-accent hover:text-accent"
                }`}
              >
                {p.label}
              </Link>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}

/* ── ModelMatch: the hands-on moment. Drag vacant to staged. ─────────────── */
export function ModelMatchChapter() {
  return (
    <section id="modelmatch" className="scroll-mt-28 bg-bg-surface py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <RevealOnScroll>
          <div className="lg:grid lg:grid-cols-[3fr_2fr] lg:items-end lg:gap-16">
            <div>
              <Eyebrow>ModelMatch</Eyebrow>
              <h2 className="lg:text-[3rem] lg:leading-[1.08]">
                Virtual staging that looks like <strong>your homes</strong>.
              </h2>
            </div>
            <p className="mt-6 text-lg leading-relaxed text-text-body lg:mt-0 lg:pb-2">
              Build a brand-approved catalog from your own model homes, then apply that furniture and
              palette to every spec you stage.
            </p>
          </div>
        </RevealOnScroll>

        <div className="mt-12 lg:mt-16">
          <ScrollWipe before="/mm/vacant-great-room.jpg" after="/mm/result-1-great-room.jpg" />
          <p className="mt-4 text-center text-xs font-bold uppercase tracking-[0.15em] text-text-muted">
            Scroll or drag to compare
          </p>
        </div>

        <div className="mt-14 grid gap-10 border-t border-border-light pt-10 lg:grid-cols-[2fr_3fr] lg:items-center lg:gap-16">
          <div>
            <p className="text-[2.75rem] leading-[1.05] text-text-dark lg:text-[3.5rem]" style={{ fontFamily: "var(--font-heading)" }}>
              357 days listed.
              <br />
              <strong className="text-accent">Under contract in 14.</strong>
            </p>
            <p className="mt-4 text-sm leading-relaxed text-text-muted">
              One Rockwall, TX home after ModelMatch entered its marketing. Sequence, not causation.
              Verified from MLS history.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6 lg:justify-end">
            <div className="sm:text-right">
              <p className="font-semibold text-text-dark">Try it on one of your specs.</p>
              <p className="text-sm text-text-body">Eight staged photos, free.</p>
            </div>
            <Link href="/modelmatch-datalibrary" className={primaryBtn}>
              Start My Free Trial
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Launch films: CineFlow and ActFlow from your model photography. ────── */
export function FilmChapter() {
  return (
    <section id="film" className="scroll-mt-28 overflow-hidden bg-bg-dark pt-24 text-text-light lg:pt-32">
      <div className="mx-auto max-w-7xl px-6">
        <RevealOnScroll>
          <div className="lg:grid lg:grid-cols-[3fr_2fr] lg:items-end lg:gap-16">
            <div>
              <Eyebrow dark>CineFlow and ActFlow</Eyebrow>
              <h2 className="text-text-light lg:text-[3rem] lg:leading-[1.08]">
                Turn your model photography into <strong>film</strong>.
              </h2>
            </div>
            <p className="mt-6 text-lg leading-relaxed text-white/80 lg:mt-0 lg:pb-2">
              CineFlow relights each space and adds new angles for cinematic sequences. ActFlow
              introduces virtual talent, so buyers can picture life in your homes and amenities.
            </p>
          </div>
        </RevealOnScroll>
      </div>
      <FlowFilms />
    </section>
  );
}

/* ── PlanMatch: the scroll is the playhead, from floor plan to photograph. ─ */
export function PlanMatchChapter() {
  return (
    <section id="planmatch" className="scroll-mt-28 bg-bg-dark text-text-light">
      <ScrubFilm
        scrubSrc="/showcase/planmatch-scrub.mp4"
        loopSrc="/showcase/planmatch-01.mp4"
        poster="/showcase/planmatch-01.jpg"
      >
        <Eyebrow dark>PlanMatch</Eyebrow>
        <h2 className="text-text-light lg:text-[3rem] lg:leading-[1.08]">
          The home sells before it <strong>is built</strong>.
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-white/80">
          Photography made from the plans, brand approved and ready the day pre-sales open.
        </p>
        <Link
          href="/services/showcase#planmatch"
          className="mt-5 inline-block text-sm font-medium text-white/70 transition-colors hover:text-white"
        >
          See PlanMatch &rarr;
        </Link>
      </ScrubFilm>
    </section>
  );
}

/* ── Premium: photography carries it. A strip you can scroll sideways. ───── */
const PREMIUM = [
  { src: `${BLOB}/site-assets/shawood-aspen-v2-8.webp`, label: "Model homes", wide: true },
  { src: `${BLOB}/site-assets/regency_amenity_back-exterior_1.webp`, label: "Amenities", wide: false },
  { src: `${BLOB}/site-assets/ashbourne-merrick-web-15.webp`, label: "Model homes", wide: false },
  { src: `${BLOB}/site-assets/heronbay_clubhouse_aerial.webp`, label: "Aerials", wide: true },
  { src: `${BLOB}/site-assets/santa-rita-ranch-aerials-web-1.webp`, label: "Communities", wide: false },
];
const REGIONS = ["West", "Mountain", "Central", "East"];

export function PremiumChapter() {
  return (
    <section id="premium" className="scroll-mt-28 bg-bg-light py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <RevealOnScroll>
          <div className="lg:grid lg:grid-cols-[3fr_2fr] lg:items-end lg:gap-16">
            <div>
              <Eyebrow>Premium Photography</Eyebrow>
              <h2 className="lg:text-[3rem] lg:leading-[1.08]">
                Built for builders who <strong>demand the best</strong>.
              </h2>
            </div>
            <p className="mt-6 text-lg leading-relaxed text-text-body lg:mt-0 lg:pb-2">
              Model homes, amenities and lifestyle, photographed across 28 markets.
            </p>
          </div>
        </RevealOnScroll>
      </div>

      <GlideStrip items={PREMIUM} />

      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-5 px-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-2 text-xs font-bold uppercase tracking-[0.12em] text-text-muted">Browse by region</span>
          {REGIONS.map((r) => (
            <Link
              key={r}
              href={`/gallery/models?region=${r}`}
              className="rounded-full border border-border-light bg-bg-surface px-4 py-1.5 text-sm text-text-dark transition-colors hover:border-accent hover:text-accent"
            >
              {r}
            </Link>
          ))}
        </div>
        <Link href="/gallery" className="text-sm font-medium text-text-dark transition-colors hover:text-accent">
          Explore the gallery &rarr;
        </Link>
      </div>
    </section>
  );
}

/* ── digDesk: the real product, not a drawing of it. ─────────────────────── */
export function DigDeskChapter() {
  return (
    <section id="digdesk" className="scroll-mt-28 overflow-hidden bg-bg-dark pt-24 text-text-light lg:pt-32">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <RevealOnScroll>
          <Eyebrow dark>digDesk</Eyebrow>
          <h2 className="text-text-light lg:text-[3rem] lg:leading-[1.08]">
            One portal for your <strong>entire visual pipeline</strong>.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
            Order every service, track every job, and download every finished asset from one dashboard.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            <Link href="/get-started" className={primaryBtn}>
              Get Started
            </Link>
            <Link href="/programs/digdesk" className="text-sm font-medium text-white/70 transition-colors hover:text-white">
              See how digDesk works &rarr;
            </Link>
          </div>
        </RevealOnScroll>
      </div>
      {/* Browser frame, cropped by the section edge so the product runs off the page. */}
      <div className="mx-auto mt-16 max-w-6xl px-6">
        <div className="overflow-hidden rounded-t-2xl bg-bg-dark-surface ring-1 ring-white/15">
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="ml-3 rounded-md bg-white/5 px-3 py-1 text-[0.7rem] text-white/45">desk.daviesimaging.com</span>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${BLOB}/site-assets/digdesk-screenshot.webp`}
            alt="The digDesk dashboard"
            loading="lazy"
            className="block max-h-[38rem] w-full object-cover object-top"
          />
        </div>
      </div>
    </section>
  );
}

/* ── Proof: builders, in their own words. Quotes come from the library. ──── */
export function ProofChapter() {
  const [lead] = getTestimonials(["kim-skeptic"]);
  const rest = getTestimonials(["jaime-pilot", "bradley-resale", "sarah-know"]);
  if (!lead) return null;
  const who = (t: Testimonial) => [t.title, t.company].filter(Boolean).join(", ");

  return (
    <section id="results" className="scroll-mt-28 bg-bg-light py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <RevealOnScroll>
          <Eyebrow>In their words</Eyebrow>
          <blockquote>
            <p className="max-w-5xl text-[1.75rem] leading-[1.2] text-text-dark lg:text-[2.75rem]" style={{ fontFamily: "var(--font-heading)" }}>
              <QuoteText t={lead} />
            </p>
            <footer className="mt-6">
              <p className="text-sm font-semibold text-text-dark">{lead.name}</p>
              <p className="mt-0.5 text-sm text-text-muted">{who(lead)}</p>
            </footer>
          </blockquote>
        </RevealOnScroll>
        <RevealOnScroll stagger={120}>
          <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border-light bg-border-light lg:grid-cols-3">
            {rest.map((t) => (
              <blockquote key={t.id} className="flex flex-col bg-bg-surface p-8">
                <p className="flex-1 leading-relaxed text-text-dark"><QuoteText t={t} /></p>
                <footer className="mt-6">
                  <p className="text-sm font-semibold text-text-dark">{t.name}</p>
                  <p className="mt-0.5 text-xs text-text-muted">{who(t)}</p>
                </footer>
              </blockquote>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

/* ── Compare: which one fits. ────────────────────────────────────────────── */
const PLANS = [
  {
    name: "Listing Photography",
    href: "/services/listing",
    rows: ["Listings that need photography only", "HDR listing photos, MLS-ready", "Within 48 hours of the shoot", "Quoted by market"],
  },
  {
    name: "Spec+",
    tag: "Best value",
    href: "/programs/spec-plus",
    rows: ["Spec homes and standing inventory", "25 photos, 8 staged images, 1 video", "72 hours after photography", "$600 flat, all home sizes"],
    featured: true,
  },
  {
    name: "Premium Photography",
    href: "/services/premium",
    rows: ["Model homes, amenities and lifestyle", "A planned shoot with DIG's most experienced photographers", "Scheduled per project", "Quoted per project"],
  },
];
const ROW_LABELS = ["Best for", "You get", "Turnaround", "Price"];

export function CompareChapter() {
  return (
    <section id="compare" className="scroll-mt-28 bg-bg-surface py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <RevealOnScroll>
          <Eyebrow>Production</Eyebrow>
          <h2 className="lg:text-[3rem] lg:leading-[1.08]">Compare Photography Services</h2>
        </RevealOnScroll>
        <RevealOnScroll stagger={120}>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {PLANS.map((p) => (
              <div
                key={p.name}
                className={`flex flex-col rounded-3xl p-8 ${
                  p.featured ? "bg-bg-dark text-text-light" : "border border-border-light bg-bg-light"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className={`text-[1.75rem] ${p.featured ? "text-text-light" : ""}`}>{p.name}</h3>
                  {p.tag && (
                    <span className="rounded-full bg-accent px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-white">
                      {p.tag}
                    </span>
                  )}
                </div>
                <dl className="mt-6 flex-1">
                  {p.rows.map((value, i) => (
                    <div key={ROW_LABELS[i]} className={`border-t py-4 ${p.featured ? "border-white/10" : "border-border-light"}`}>
                      <dt className={`text-[0.65rem] font-bold uppercase tracking-[0.15em] ${p.featured ? "text-white/45" : "text-text-muted"}`}>
                        {ROW_LABELS[i]}
                      </dt>
                      <dd className={`mt-1.5 leading-snug ${p.featured ? "text-text-light" : "text-text-dark"}`}>{value}</dd>
                    </div>
                  ))}
                </dl>
                <Link
                  href={p.href}
                  className={
                    p.featured
                      ? `${primaryBtn} mt-6`
                      : "mt-6 rounded-full border border-text-dark/20 px-8 py-3 text-center text-sm font-semibold text-text-dark transition-colors hover:border-accent hover:text-accent"
                  }
                >
                  Explore {p.name}
                </Link>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
