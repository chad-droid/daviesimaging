import type { Metadata } from "next";
import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { DarkSection } from "@/components/DarkSection";
import { Eyebrow } from "@/components/Eyebrow";
import { ModelMatchDemo } from "@/components/ModelMatchDemo";
import { BuilderLogoStrip } from "@/components/BuilderLogoStrip";

export const metadata: Metadata = {
  title: "ModelMatch for Just Make It Pretty Listeners | Davies Imaging Group",
  description:
    "Branded virtual staging, built for homebuilders. If you heard Chad Davies on Just Make It Pretty with Sarah Haynes, start here.",
  robots: { index: false, follow: false },
};

// ── Static content blocks ─────────────────────────────────────────────────────

const pillars = [
  {
    num: "01",
    title: "Your brand promise breaks at the listing",
    body:
      "You spend serious money on model home merchandising. The layout, the palette, the way light hits the kitchen island. Then a spec lists with random furniture from a stock catalog and the whole promise fractures online.",
  },
  {
    num: "02",
    title: "Generic AI is the commodity trap",
    body:
      "When every vendor uses the same free AI staging tool, every listing starts to look the same. You just paid zero dollars to look identical to your competitor two communities over.",
  },
  {
    num: "03",
    title: "The touchpoint nobody audits",
    body:
      "Builders audit signage, sales centers, model home merchandising, website copy. The listing photo slips through. That is the first moment a buyer sees your brand. ModelMatch makes it curated.",
  },
];

const howItWorks = [
  {
    num: "01",
    title: "Reference",
    body:
      "Upload your model home imagery once. We catalog the furniture, palette, fixtures, and finishes into your brand library.",
  },
  {
    num: "02",
    title: "Vacant",
    body:
      "Send any listing photo through digDesk. Standard HDR. No special shoot required.",
  },
  {
    num: "03",
    title: "Match",
    body:
      "The staged result pulls from your library. Consistent with your model. Delivered within one business day.",
  },
];

const included = [
  "Reference-based staging pulled from your own model home imagery",
  "Brand-consistent results across every community and region",
  "24-hour turnaround on standard orders",
  "Unlimited reuse of your ModelMatch reference library",
  "Your brand library stays yours if you ever leave",
];

const stats = [
  { value: "28 days", label: "Avg. DOM reduction with DIG assets" },
  { value: "72 hrs", label: "Delivery turnaround via digDesk" },
  { value: "28", label: "National markets, same standard everywhere" },
  { value: "10 yrs", label: "In the homebuilder space" },
];

const faqs = [
  {
    q: "AI staging tools are everywhere now. Why pay for this?",
    a: "Go try the free ones. Stage a room, put the result next to your model home photos, see what happens. What you will find is catalog furniture, mismatched lighting, and nothing that relates to your brand. You are not competing with a staging app. You are competing with every other builder on Zillow using that same staging app. Generic is exactly what you are already looking like.",
  },
  {
    q: "Zillow gives staging away for free now. Why not use that?",
    a: "When the platform hands every builder the same free tool, every listing starts to look the same. Also, platform-native staging lives on the platform. Your brand does not. We give you assets you own outright and can deploy anywhere, including your own website, email, paid ads, and MLS.",
  },
  {
    q: "Our marketing team could just stage homes with an app in-house.",
    a: "They could. Stage one. Count the hours. Then multiply by 500 homes a year across 12 markets with three product lines and brand standards that have to hold. That is not an app problem. That is an operation problem. DIG is the operation.",
  },
  {
    q: "Do you work with builders who already have a marketing agency?",
    a: "Yes. Most of our clients do. DIG is not an agency. We do not write strategy, run media, or touch CRM. We are the production studio that makes your agency's strategy work visually. If you have a marketing partner you trust, ModelMatch plugs into their workflow. If you are the in-house team, it plugs into yours.",
  },
  {
    q: "What if our model home photography is not amazing?",
    a: "We can usually work with what you have. If the model imagery is current and high-resolution, we catalog the palette, furniture, and finishes from what exists. If you are due for a refresh, we can shoot it.",
  },
  {
    q: "Who owns the reference library?",
    a: "You do. It lives in your digDesk account. If you stop working with DIG, the assets stay with you.",
  },
  {
    q: "What happens on the 20-minute call?",
    a: "Chad walks through your current staging workflow and stages one sample room on us so you can see your brand in action before committing. No pressure. If ModelMatch fits, he will tell you. If it does not, he will tell you what does.",
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function SarahPodcastPage() {
  return (
    <>
      {/* Podcast welcome strip */}
      <div className="bg-accent text-white">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-1 px-6 py-3 text-center text-sm sm:flex-row sm:justify-center sm:gap-2">
          <span className="font-semibold">Pretty isn&rsquo;t enough. It has to be yours.</span>
          <span className="hidden text-white/75 sm:inline">·</span>
          <span className="text-white/90">
            Heard Chad on <em>Just Make It Pretty</em> with Sarah? This is the 20-minute version.
          </span>
        </div>
      </div>

      {/* Hero */}
      <DarkSection className="py-28 text-text-light">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <Eyebrow dark>Listeners of Just Make It Pretty / Welcome</Eyebrow>
            <h1 className="text-text-light">
              Branded Virtual Staging, built for <strong>Homebuilders</strong>.
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-white/80">
              Every spec home listing is a brand moment. ModelMatch is how you
              make sure that moment works. We use your actual model home
              photography as the design reference, so every staged spec online
              looks like it belongs to you.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/contact?intent=sarah-podcast"
                className="rounded-full bg-accent px-8 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
              >
                Book a Call with Chad
              </Link>
              <Link
                href="#see-it"
                className="text-sm font-medium text-white/80 transition-colors hover:text-white"
              >
                See ModelMatch in action &darr;
              </Link>
            </div>
            <p className="mt-10 max-w-2xl text-sm italic leading-relaxed text-white/65">
              Chad Davies started shooting homes in 2009, at 17, during the
              housing crash. Seventeen years, 28 markets, and one platform
              later, DIG is how homebuilders ship brand-consistent listing
              media at scale.
            </p>
          </RevealOnScroll>
        </div>
      </DarkSection>

      {/* Section 1 — The commodity trap / Three pillars */}
      <section className="bg-bg-light py-24">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll>
            <div className="mb-14 max-w-3xl">
              <Eyebrow>Why this matters</Eyebrow>
              <h2>
                When every vendor uses the same AI tools, every listing{" "}
                <strong>looks the same</strong>.
              </h2>
              <p className="mt-5 text-text-body">
                You already invested in your brand at the model home. ModelMatch
                extends that investment to every vacant spec you list. Not
                better staging. Protecting the brand investment you already
                made.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              {pillars.map((p) => (
                <div
                  key={p.num}
                  className="rounded-xl border border-border-light bg-bg-surface p-6"
                >
                  <span className="font-mono text-xs font-bold tracking-widest text-accent/70">
                    {p.num}
                  </span>
                  <h4 className="mt-3 text-text-dark">{p.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-text-body">
                    {p.body}
                  </p>
                </div>
              ))}
            </div>

            {/* Chad's pull quote */}
            <figure className="mt-14 border-l-4 border-accent pl-6">
              <blockquote
                className="text-2xl font-medium leading-snug text-text-dark sm:text-3xl"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                &ldquo;Agents will take basically anything. Builders will send
                it back.&rdquo;
              </blockquote>
              <figcaption className="mt-3 text-xs font-semibold uppercase tracking-widest text-text-muted">
                Chad Davies, Founder, Davies Imaging Group
              </figcaption>
            </figure>
          </RevealOnScroll>
        </div>
      </section>

      {/* Section 2 — How it works */}
      <section className="bg-bg-surface py-24">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll>
            <div className="mb-14 max-w-3xl">
              <Eyebrow>How it works</Eyebrow>
              <h2>
                You give us your model home photos. We match your virtual
                staging <strong>to them</strong>.
              </h2>
              <p className="mt-5 text-text-body">
                Your model home is where everything is perfect. The furniture
                is right. The lighting is dialed in. The whole thing looks
                exactly like your brand. We use those photos as the template.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              {howItWorks.map((step) => (
                <div key={step.num} className="relative">
                  <span className="font-mono text-xs font-bold tracking-widest text-accent">
                    {step.num}
                  </span>
                  <h4 className="mt-3 text-text-dark">{step.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-text-body">
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* See it — ModelMatch Demo */}
      <section id="see-it" className="bg-bg-light py-24">
        <div className="mx-auto max-w-6xl px-6">
          <RevealOnScroll>
            <div className="mb-10 max-w-3xl">
              <Eyebrow>See it</Eyebrow>
              <h2>
                Three rooms. <strong>Three stages</strong>.
              </h2>
              <p className="mt-5 text-text-body">
                Each room below shows the three-stage ModelMatch process:
                source reference imagery, the vacant listing photo, and the
                finished staged output. Tap any panel to expand.
              </p>
            </div>
          </RevealOnScroll>
          <RevealOnScroll>
            <ModelMatchDemo />
          </RevealOnScroll>
        </div>
      </section>

      {/* Section 3 — Why it matters / Photography has two jobs */}
      <section className="bg-bg-surface py-24">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <div className="max-w-3xl">
              <Eyebrow>Why it matters</Eyebrow>
              <h2>
                Photography has <strong>two jobs</strong>.
              </h2>
              <p className="mt-5 text-text-body">
                One: get a buyer to the community. Two: become that buyer&rsquo;s
                memory of being there.
              </p>
              <p className="mt-4 text-text-body">
                When a buyer eventually walks a model home, they should feel
                like they have been there before. Because the online photos
                that brought them already looked like your brand. That is not a
                nice-to-have. That is the sale.
              </p>
            </div>
            <figure className="mt-12 border-l-4 border-accent pl-6">
              <blockquote
                className="text-2xl font-medium leading-snug text-text-dark sm:text-3xl"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                &ldquo;Buyers see 20 homes on their phone before they visit 8
                in person. Your listing photos aren&rsquo;t marketing.
                They&rsquo;re the audition.&rdquo;
              </blockquote>
              <figcaption className="mt-3 text-xs font-semibold uppercase tracking-widest text-text-muted">
                NAR buyer search data / Chad Davies
              </figcaption>
            </figure>
          </RevealOnScroll>
        </div>
      </section>

      {/* Offer block */}
      <section className="bg-bg-light py-24">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll>
            <div className="mb-12 max-w-3xl">
              <Eyebrow>The offer</Eyebrow>
              <h2>
                ModelMatch virtual staging, starting at{" "}
                <strong>$25 an image</strong>.
              </h2>
            </div>
            <div className="grid gap-10 lg:grid-cols-5">
              {/* Left: What you get */}
              <div className="lg:col-span-3">
                <p className="text-xs font-bold uppercase tracking-widest text-text-muted">
                  What you get
                </p>
                <ul className="mt-5 space-y-3">
                  {included.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-text-body"
                    >
                      <span className="mt-1 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-accent/10">
                        <svg
                          viewBox="0 0 10 10"
                          className="h-2.5 w-2.5 text-accent"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            d="M2 5l2 2.5 4-4.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <span className="text-[0.95rem] leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: Price card */}
              <aside className="lg:col-span-2">
                <div className="rounded-2xl border border-accent/30 bg-accent/[0.04] p-7">
                  <span className="inline-flex rounded-full bg-accent/15 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-accent">
                    Podcast Listener Offer
                  </span>
                  <p
                    className="mt-5 text-5xl font-semibold tracking-tight text-text-dark"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    $25 <span className="text-2xl text-text-muted">/ image</span>
                  </p>
                  <p className="mt-2 text-sm text-text-body">
                    Standalone virtual staging. No minimums. No contracts.
                  </p>
                  <p className="mt-4 text-xs leading-relaxed text-text-muted">
                    For context: physical staging averages $1,500 per room.
                    ModelMatch stages a whole home for less.
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-text-muted">
                    Bundled free inside the $600 Spec+ package (25 listing
                    photos + 8 staged images + 1 virtual video, 72-hour
                    delivery).
                  </p>
                  <Link
                    href="/contact?intent=sarah-podcast"
                    className="mt-6 block rounded-full bg-accent px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
                  >
                    Book a Call with Chad
                  </Link>
                  <p className="mt-3 text-center text-xs leading-relaxed text-text-muted">
                    20 minutes. Bring a listing. Leave with one room staged on
                    us.
                  </p>
                </div>
              </aside>
            </div>

            {/* Inline stats */}
            <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-border-light bg-bg-surface p-5"
                >
                  <p
                    className="text-2xl font-semibold tracking-tight text-text-dark"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {s.value}
                  </p>
                  <p className="mt-1 text-xs leading-snug text-text-muted">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Builder logo strip */}
      <BuilderLogoStrip />

      {/* FAQ */}
      <section className="bg-bg-light py-24">
        <div className="mx-auto max-w-3xl px-6">
          <RevealOnScroll>
            <div className="mb-12">
              <Eyebrow>Objections, honestly addressed</Eyebrow>
              <h2>
                Questions a podcast listener <strong>actually asks</strong>.
              </h2>
            </div>
            <div className="divide-y divide-border-light">
              {faqs.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                    <h4 className="text-text-dark">{f.q}</h4>
                    <span
                      aria-hidden="true"
                      className="mt-1 text-text-muted transition-transform group-open:rotate-45"
                    >
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          d="M8 3v10M3 8h10"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </summary>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-text-body">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Final CTA */}
      <DarkSection className="py-24 text-text-light">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <Eyebrow dark>Ready?</Eyebrow>
            <h2 className="text-text-light">
              If you&rsquo;ve ever cringed at your own spec home listings,{" "}
              <strong>start here</strong>.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-white/80">
              Twenty minutes with Chad Davies. Bring one listing photo and a
              couple of model home references. Leave with a free sample room
              staged in your brand.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/contact?intent=sarah-podcast"
                className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
              >
                Book a Strategy Call
              </Link>
              <Link
                href="/services/virtual-staging"
                className="text-sm font-medium text-white/80 transition-colors hover:text-white"
              >
                Explore ModelMatch on your own &rarr;
              </Link>
            </div>
            <p className="mt-6 text-xs text-white/65">
              Mention Sarah&rsquo;s podcast on the call. We&rsquo;ll stage your
              sample room first.
            </p>
          </RevealOnScroll>
        </div>
      </DarkSection>
    </>
  );
}
