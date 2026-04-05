import type { Metadata } from "next";
import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";
import { EditableContent } from "@/components/EditableContent";
import { DynamicImage } from "@/components/DynamicImage";

export const metadata: Metadata = {
  title: "About Us | Davies Imaging Group",
  description:
    "Davies Imaging Group was built inside the homebuilding industry. We think like marketers, sales leaders, and partners.",
};

const pillars = [
  {
    title: "We think like marketers",
    body: "Beautiful photography that never gets used is just expensive. We build assets designed to perform on every channel your team deploys: website, paid media, email, and sales center.",
  },
  {
    title: "We think like sales leaders",
    body: "Days on market matter. Carry costs are real. Every asset DIG delivers is built with one goal: helping your sales team close faster with better tools.",
  },
  {
    title: "We think about what happens after the shoot",
    body: "Most photographers leave when the camera bag goes back in the car. DIG stays involved through delivery, ensuring every image, video, and staged room is deployed correctly.",
  },
];

const stats = [
  { value: "28", label: "Markets nationwide" },
  { value: "95%", label: "First-delivery success rate" },
  { value: "72 hrs", label: "Spec+ delivery after shoot" },
  { value: "5-Star", label: "Client reviews" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-[65vh] bg-bg-dark py-28 text-text-light">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <Eyebrow dark>About / Why We Exist</Eyebrow>
            <EditableContent
              slotId="about-main-hero"
              fields={[
                { key: "headline", label: "Headline", type: "textarea" as const, defaultValue: "We don't just capture homes. We help builders <strong>win</strong>." },
                { key: "subhead", label: "Subhead", type: "textarea" as const, defaultValue: "Davies Imaging Group was built inside the homebuilding industry, not outside of it. That distinction changes everything about how we work." },
              ]}
            >
              {(v) => (
                <>
                  <h1 className="text-text-light" dangerouslySetInnerHTML={{ __html: v.headline }} />
                  <p className="mt-6 max-w-2xl text-xl leading-relaxed text-text-muted">{v.subhead}</p>
                </>
              )}
            </EditableContent>
          </RevealOnScroll>
          <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-2xl bg-bg-light">
            <DynamicImage
              slotId="about-main-hero-img"
              className="h-full w-full object-cover"
              fallbackClass="h-full w-full"
            />
          </div>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <div className="grid gap-14 lg:grid-cols-[1fr_2fr]">
              <div className="pt-1">
                <Eyebrow>Origin</Eyebrow>
                <h2 className="mt-3">
                  Founded on a clear <strong>conviction</strong>.
                </h2>
              </div>
              <div className="space-y-5 text-[1.0625rem] leading-relaxed text-text-body">
                <p>
                  Chad Davies founded DIG with a simple conviction: homebuilder marketing deserves better. Better storytelling. Better strategy. Better alignment between creative work and the sales outcomes it&apos;s supposed to drive.
                </p>
                <p>
                  Under his leadership, DIG grew from a production-focused studio into a strategic partner that serves some of the most respected builders in the country. That growth happened because we stayed focused on what the industry actually needs, not just what looks impressive in a portfolio.
                </p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-bg-light py-16">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              {stats.map((s, i) => (
                <div key={i} className="rounded-xl border border-border-light bg-bg-surface p-6 text-center">
                  <p className="text-3xl font-semibold text-text-dark" style={{ fontFamily: "var(--font-heading)" }}>{s.value}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-accent">{s.label}</p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* We Understand */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <div className="grid gap-14 lg:grid-cols-[1fr_2fr]">
              <div className="pt-1">
                <Eyebrow>Perspective</Eyebrow>
                <h2 className="mt-3">
                  We understand your world <strong>from the inside</strong>.
                </h2>
              </div>
              <div className="space-y-5 text-[1.0625rem] leading-relaxed text-text-body">
                <p>
                  Launch timelines. Spec pressure. Marketing budgets. Sales alignment. Community rollouts. These aren&apos;t abstract concepts at DIG. They are the context in which we do every shoot, every digital order, and every delivery.
                </p>
                <p>
                  We&apos;ve worked alongside national and regional builders across 28 markets. That experience shapes how we plan, how we execute, and how we communicate. It is why working with DIG feels different from working with a traditional photography vendor.
                </p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* How we think */}
      <section className="bg-bg-dark py-24 text-text-light">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll>
            <div className="mb-12 text-center">
              <Eyebrow dark>Our Approach</Eyebrow>
              <h2 className="text-text-light">
                Three things we think about that most photographers <strong>don&apos;t</strong>.
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              {pillars.map((p, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-white/14"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <span className="font-mono text-[10px] text-white/25">0{i + 1}</span>
                  </div>
                  <h4 className="text-base font-semibold text-text-light">{p.title}</h4>
                  <p className="mt-3 text-sm leading-relaxed text-text-muted">{p.body}</p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Five-Step Strategy */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <div className="grid gap-14 lg:grid-cols-[1fr_2fr]">
              <div className="pt-1">
                <Eyebrow>How We Work</Eyebrow>
                <h2 className="mt-3">
                  From alignment to <strong>delivery</strong>.
                </h2>
              </div>
              <div className="space-y-5 text-[1.0625rem] leading-relaxed text-text-body">
                <p>
                  Our proven five-step asset strategy reduces the time it takes to plan, produce, and deploy marketing visuals that actually perform. From pre-shoot alignment to final asset delivery, every step supports your marketing team and your sales goals.
                </p>
                <p>
                  We don&apos;t just show up with a camera. We arrive with a plan, execute with specialists, and deliver assets that are ready to publish without additional work on your team&apos;s side. 95% of our deliveries are approved without a single change request.
                </p>
                <div className="pt-2">
                  <Link
                    href="/about/how-we-do-it"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
                  >
                    How we do it &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-bg-dark py-24 text-text-light">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <Eyebrow dark>Let&apos;s Work Together</Eyebrow>
            <h2 className="text-text-light">
              Let&apos;s build assets that move <strong>homes</strong>.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-text-muted">
              If you&apos;re looking for a vendor, there are plenty. If you&apos;re looking for a partner who understands how builder marketing actually works, let&apos;s talk.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
              >
                Book a Strategy Call
              </Link>
              <Link
                href="/programs/frameflow"
                className="text-sm font-medium text-text-muted transition-colors hover:text-text-light"
              >
                Explore FrameFlow Studio &rarr;
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
