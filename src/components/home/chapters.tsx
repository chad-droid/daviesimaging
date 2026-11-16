import Link from "next/link";
import { Eyebrow } from "@/components/Eyebrow";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { FlowFilms, ScrollWipe, GlideStrip, ScrubFilm } from "./scroll";
import { StageWord, StageBody } from "./StageWord";
import { SwipeRow } from "./swipe";
import { getTestimonials, type Testimonial } from "@/data/testimonials";
import { QuoteText } from "@/components/QuoteText";

const BLOB = "https://6pcw74e8rdx0ig2m.public.blob.vercel-storage.com";

// A row that swipes sideways below lg and sits in the page column from lg up.
const swipeRow =
  "-mx-6 flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mx-0 lg:overflow-visible lg:px-0 lg:pb-0";
const swipeCard = "w-[84%] shrink-0 snap-start sm:w-[46%] lg:w-auto";

const primaryBtn =
  "rounded-full bg-accent px-8 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-accent-hover";

/* ── Stage header: the giant word that opens Lead, Launch and List. ─────── */
export function StageHeader({
  n,
  stage,
  body,
  short,
  dark = false,
}: {
  n: string;
  stage: string;
  body: string;
  /** A one-line version of `body`, shown below lg in its place. */
  short?: string;
  dark?: boolean;
}) {
  return (
    <div className={dark ? "border-t border-white/10 bg-bg-dark text-text-light" : "border-t border-border-light bg-bg-surface"}>
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-44">
        <p className={`text-xs font-bold uppercase tracking-[0.15em] ${dark ? "text-accent-dark-hover" : "text-accent"}`}>
          Stage {n}
        </p>
        <StageWord word={stage} dark={dark} />
        <StageBody>
          <p className={`mt-8 max-w-[44rem] text-lg leading-[1.45] lg:mt-14 lg:text-[1.3125rem] lg:leading-[1.4] ${dark ? "text-white/80" : "text-text-body"}`}>
            {short ? (
              <>
                <span className="lg:hidden">{short}</span>
                <span className="hidden lg:inline">{body}</span>
              </>
            ) : (
              body
            )}
          </p>
        </StageBody>
      </div>
    </div>
  );
}

/* ── Chapter header: eyebrow, headline, then the body beneath it. Stacked,
      with the headline held to about three quarters of the column and the
      body to a comfortable reading width, so each has room around it. ───── */
function ChapterHeader({
  eyebrow,
  children,
  body,
  dark = false,
  after,
}: {
  eyebrow: string;
  children: React.ReactNode;
  body?: React.ReactNode;
  dark?: boolean;
  after?: React.ReactNode;
}) {
  return (
    <RevealOnScroll>
      <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
      <h2 className={`max-w-[52rem] lg:text-[3rem] lg:leading-[1.08] ${dark ? "text-text-light" : ""}`}>{children}</h2>
      {body && (
        <p className={`mt-5 max-w-[44rem] text-lg leading-[1.45] lg:mt-6 lg:text-[1.3125rem] lg:leading-[1.4] ${dark ? "text-white/75" : "text-text-body"}`}>{body}</p>
      )}
      {after}
    </RevealOnScroll>
  );
}

/* ── ModelMatch: the hands-on moment. Drag vacant to staged. ─────────────── */
/** `body` lets a market page say the same thing in its own words. */
export function ModelMatchChapter({ body }: { body?: string } = {}) {
  return (
    <section id="modelmatch" className="scroll-mt-28 bg-bg-surface py-16 lg:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <ChapterHeader
          eyebrow="ModelMatch"
          body={body ?? "Your model home merchandising becomes bespoke furniture and accessory galleries you can reuse across your vacant inventory."}
        >
          Extend the investment you&rsquo;ve made in your <strong>model homes</strong>.
        </ChapterHeader>

        <div className="mt-14 lg:mt-20">
          <ScrollWipe before="/mm/vacant-great-room.jpg" after="/mm/result-1-great-room.jpg" />
          <p className="mt-4 text-center text-xs font-bold uppercase tracking-[0.15em] text-text-muted">
            Scroll or drag to compare
          </p>
        </div>

        <div className="mt-20 grid gap-10 border-t border-border-light pt-14 lg:mt-28 lg:grid-cols-[3fr_2fr] lg:items-end lg:gap-16">
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
    <section id="film" className="scroll-mt-28 overflow-hidden bg-bg-dark pt-16 text-text-light lg:pt-36">
      <div className="mx-auto max-w-7xl px-6">
        <ChapterHeader dark eyebrow="CineFlow and ActFlow">
          Need video from the assets you <strong>already have</strong>?
        </ChapterHeader>
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
        seqDir="/showcase/planmatch-seq"
        seqCount={72}
      >
        <Eyebrow dark>PlanMatch</Eyebrow>
        <h2 className="text-text-light lg:text-[3rem] lg:leading-[1.08]">
          Don&apos;t call it <strong>rendering</strong>.
        </h2>
        {/* Wide screens only: on a phone the Lead intro just above has said this. */}
        <p className="mt-5 hidden text-lg leading-relaxed text-white/80 lg:block">
          Before your community is ever built, you can have photorealistic images of all of your
          model home plans and your unmodeled plans. Better, faster, and less expensive than ever.
        </p>
        <Link
          href="/services/planmatch"
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

export function PremiumChapter({ body }: { body?: string } = {}) {
  return (
    <section id="premium" className="scroll-mt-28 bg-bg-light py-16 lg:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <ChapterHeader
          eyebrow="Premium Photography"
          body={body ?? "You get the best model home photography, video, and Matterport services available to the industry, in 29 markets across the United States."}
        >
          Built for builders who <strong>demand the best</strong>.
        </ChapterHeader>
      </div>

      <GlideStrip items={PREMIUM} />

      <div className="mx-auto mt-14 flex max-w-7xl flex-col gap-5 px-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
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
        <Link href="/gallery/models" className="text-sm font-medium text-text-dark transition-colors hover:text-accent">
          Explore the gallery &rarr;
        </Link>
      </div>
    </section>
  );
}

/* ── Service lines: the other way to sort the same products. ─────────────── */
const LINES = [
  {
    name: "Production",
    body: "You get a national network of highly trained professional photographers, for your listings and your Premium shoots.",
    products: [
      { label: "Premium Photography", href: "/services/premium" },
      { label: "Premium Video", href: "/services/video-production" },
      { label: "Listing Photography", href: "/services/listing" },
      { label: "Spec+", href: "/programs/spec-plus" },
    ],
  },
  {
    name: "Flow",
    body: "Your static images, converted into dynamic video.",
    products: [
      { label: "FrameFlow", href: "/services/virtual-video" },
      { label: "CineFlow", href: "/services/cineflow" },
      { label: "ActFlow", href: "/services/actflow" },
    ],
  },
  {
    name: "Match",
    body: "Your virtual assets look and feel like the real thing, because they are built off your existing model home identity.",
    products: [
      { label: "ModelMatch", href: "/services/virtual-staging" },
      { label: "PlanMatch", href: "/services/planmatch" },
      { label: "Moments", href: "/services/moments" },
    ],
  },
];

export function ServiceLinesChapter() {
  return (
    <section id="lines" className="scroll-mt-28 border-t border-border-light bg-bg-surface py-16 lg:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <RevealOnScroll>
          <h2 className="text-[2.5rem] leading-[1.08] lg:text-[3.5rem]">Service Lines</h2>
        </RevealOnScroll>
        {/* One card per line, each clearly under the section heading: a small
            numbered label, the line's name a step down from the h2, then its products. */}
        <RevealOnScroll stagger={120}>
          <SwipeRow className={`mt-10 lg:mt-12 lg:grid lg:grid-cols-3 lg:gap-5 ${swipeRow}`}>
            {LINES.map((l, i) => (
              <div key={l.name} className={`flex flex-col rounded-3xl border border-border-light bg-bg-light p-7 lg:p-8 ${swipeCard}`}>
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-accent">
                  Service line 0{i + 1}
                </p>
                <h3 className="mt-3 text-[1.75rem] leading-tight">{l.name}</h3>
                <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-text-body">{l.body}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {l.products.map((pr) => (
                    <li key={pr.label}>
                      <Link
                        href={pr.href}
                        className="inline-block rounded-full border border-border-light bg-bg-surface px-4 py-1.5 text-sm font-medium text-text-dark transition-colors hover:border-accent hover:text-accent"
                      >
                        {pr.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </SwipeRow>
        </RevealOnScroll>
      </div>
    </section>
  );
}

/* ── digDesk: the real product, not a drawing of it. ─────────────────────── */
export function DigDeskChapter() {
  return (
    <section id="digdesk" className="scroll-mt-28 overflow-hidden bg-bg-dark pt-16 text-text-light lg:pt-36">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <RevealOnScroll>
          <Eyebrow dark>digDesk</Eyebrow>
          <h2 className="text-text-light lg:text-[3rem] lg:leading-[1.08]">
            Everything you need in <strong>one place</strong>.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
            The single point of entry to order, track, revise, and pay for all of your marketing
            assets.
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
export function ProofChapter({
  leadId = "kim-skeptic",
  restIds = ["jaime-pilot", "bradley-resale", "sarah-know"],
}: { leadId?: string; restIds?: string[] } = {}) {
  const [lead] = getTestimonials([leadId]);
  const rest = getTestimonials(restIds);
  if (!lead) return null;
  const who = (t: Testimonial) => [t.title, t.company].filter(Boolean).join(", ");

  return (
    <section id="results" className="scroll-mt-28 bg-bg-light py-16 lg:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <RevealOnScroll>
          <Eyebrow>In their words</Eyebrow>
          {/* From lg up the lead quote stands alone. Below lg it is the first card in the row. */}
          <blockquote className="hidden lg:block">
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
          <SwipeRow
            className={`mt-2 lg:mt-16 lg:grid lg:grid-cols-3 lg:gap-px lg:!overflow-hidden lg:rounded-2xl lg:border lg:border-border-light lg:bg-border-light ${swipeRow}`}
          >
            {[lead, ...rest].map((t, i) => (
              <blockquote
                key={t.id}
                className={`flex-col rounded-2xl border border-border-light bg-bg-surface p-7 lg:rounded-none lg:border-0 lg:p-8 ${swipeCard} ${
                  i === 0 ? "flex lg:hidden" : "flex"
                }`}
              >
                <p className="flex-1 leading-relaxed text-text-dark"><QuoteText t={t} /></p>
                <footer className="mt-6">
                  <p className="text-sm font-semibold text-text-dark">{t.name}</p>
                  <p className="mt-0.5 text-xs text-text-muted">{who(t)}</p>
                </footer>
              </blockquote>
            ))}
          </SwipeRow>
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
    <section id="compare" className="scroll-mt-28 bg-bg-surface py-16 lg:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <RevealOnScroll>
          <Eyebrow>Production</Eyebrow>
          <h2 className="lg:text-[3rem] lg:leading-[1.08]">Compare Photography Services</h2>
        </RevealOnScroll>
        <RevealOnScroll stagger={120}>
          <SwipeRow className={`mt-10 lg:mt-12 lg:grid lg:grid-cols-3 lg:gap-5 ${swipeRow}`}>
            {PLANS.map((p) => (
              <div
                key={p.name}
                className={`flex flex-col rounded-3xl p-7 lg:p-8 ${swipeCard} ${
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
          </SwipeRow>
        </RevealOnScroll>
      </div>
    </section>
  );
}
