import type { Metadata } from "next";
import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";
import { EditableHero } from "@/components/EditableHero";
import { DynamicImage } from "@/components/DynamicImage";

export const metadata: Metadata = {
  title: "How We Do It | Davies Imaging Group",
  description: "DIG's specialization model: why the traditional solo-photographer approach breaks at scale, and how a team of specialists delivers better work, faster.",
};

const specialists = [
  {
    role: "Photographers",
    description: "Focused entirely on capturing exceptional imagery on-site. Not account managers, not editors, not video producers. Photographers who photograph.",
  },
  {
    role: "Photo Editors",
    description: "Dedicated post-production specialists whose only job is retouching, color correction, and sky replacement. Focused work produces faster, more consistent results.",
  },
  {
    role: "Virtual Staging Artists",
    description: "Digital production specialists trained in ModelMatch reference-based staging. Every staged image matches the builder's design palette because the people doing it know exactly what that means.",
  },
  {
    role: "Video Production",
    description: "From on-site community walkthroughs to digitally produced listing video. A separate discipline handled by a separate team, built for speed and quality.",
  },
];

const proofPoints = [
  { value: "95%", label: "First-delivery success rate", detail: "95% of deliveries are ready to publish without any changes." },
  { value: "5-Star", label: "Client reviews", detail: "Seamless because every person on the team is focused on what they do best." },
  { value: "One team", label: "Every specialty", detail: "Photography, video, virtual staging, and 3D under one roof. One point of contact." },
  { value: "28 markets", label: "Same standard", detail: "Specialization scales. The model works in Sacramento the same way it works in Dallas." },
];

export default function HowWeDoItPage() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-[65vh] bg-bg-dark py-28 text-text-light">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <Eyebrow dark>About / How We Do It</Eyebrow>
            <EditableHero
              slotId="about-how-we-do-it-hero"
              headlineDefault="The traditional approach to builder photography <strong>is broken</strong>."
              subheadDefault="We believe specialization is the answer. And it is why working with DIG feels different."
            />
          </RevealOnScroll>
          <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-2xl bg-bg-light">
            <DynamicImage
              slotId="about-how-we-do-it-hero-img"
              className="h-full w-full object-cover"
              fallbackClass="h-full w-full"
            />
          </div>
        </div>
      </section>

      {/* The problem */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <div className="grid gap-14 lg:grid-cols-[1fr_2fr]">
              <div className="pt-1">
                <Eyebrow>The Problem</Eyebrow>
                <h2 className="mt-3">
                  One person cannot carry the whole <strong>weight</strong>.
                </h2>
              </div>
              <div className="space-y-5 text-[1.0625rem] leading-relaxed text-text-body">
                <p>
                  Photography is often treated like a solo sport, with one talented artist expected to carry the full weight of a brand&apos;s visual identity. But when you need photography executed at scale, that model falls apart.
                </p>
                <p>
                  As photographers get busier, prices go up, availability goes down, and attention to detail can suffer. That is not a reflection of effort. It is simply the reality that one person can only do so much.
                </p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-border-light" />

      {/* The answer */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <div className="grid gap-14 lg:grid-cols-[1fr_2fr]">
              <div className="pt-1">
                <Eyebrow>The Answer</Eyebrow>
                <h2 className="mt-3">
                  Specialization at <strong>every level</strong>.
                </h2>
              </div>
              <div className="space-y-5 text-[1.0625rem] leading-relaxed text-text-body">
                <p>
                  Our photographers focus on photography. They are not account managers, professional retouchers, 3D artists, or video production experts. Those are separate disciplines, and we treat them that way.
                </p>
                <p>
                  By building a team of specialists, we create better work, faster turnaround times, and a smoother client experience.
                </p>
                <p>
                  That is also why we have so many five-star reviews. Working with DIG feels seamless because every person on our team is focused on what they do best.
                </p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Specialist grid */}
      <section className="bg-bg-dark py-24 text-text-light">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll>
            <div className="mb-12 text-center">
              <Eyebrow dark>The Team</Eyebrow>
              <h2 className="text-text-light">
                Four disciplines. <strong>One roof</strong>.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-text-muted">
                Photography, editing, virtual staging, and video production are separate disciplines staffed by separate specialists.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {specialists.map((s, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-white/14 hover:bg-white/[0.055]"
                >
                  <div className="mb-1 flex items-center gap-2">
                    <span className="font-mono text-[10px] text-white/25">0{i + 1}</span>
                    <h4 className="text-base font-semibold text-text-light">
                      {s.role}
                    </h4>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">{s.description}</p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Builder advantage */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <div className="grid gap-14 lg:grid-cols-[1fr_2fr]">
              <div className="pt-1">
                <Eyebrow>Your Advantage</Eyebrow>
                <h2 className="mt-3">
                  One team. Every <strong>specialty</strong>.
                </h2>
              </div>
              <div className="space-y-5 text-[1.0625rem] leading-relaxed text-text-body">
                <p>
                  Instead of managing multiple vendors across multiple processes just to get a finished set of marketing assets, you work with one team that knows how to bring it all together.
                </p>
                <p>
                  We combine distinct specialties to deliver fast, on-brand results with award-winning quality and white-glove service.
                </p>
                <p>
                  You feel taken care of because communication is fast, scheduling is easy, and assets are delivered right the first time. 95% of our deliveries are ready to post without any changes needed.
                </p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Proof points */}
      <section className="bg-bg-light py-24">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {proofPoints.map((p, i) => (
                <div key={i} className="rounded-xl border border-border-light bg-bg-surface p-6 text-center">
                  <p className="font-serif text-3xl font-semibold text-text-dark">{p.value}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-accent">{p.label}</p>
                  <p className="mt-3 text-sm leading-relaxed text-text-muted">{p.detail}</p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Closing statement */}
      <section className="bg-bg-dark py-24 text-text-light">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <Eyebrow dark>Home Building Experts</Eyebrow>
            <h2 className="mt-4 text-text-light">
              We understand your standards. We know your expectations. <strong>We help you raise the bar.</strong>
            </h2>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
              >
                Book a Strategy Call
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium text-white/60 transition-colors hover:text-white"
              >
                Our story &rarr;
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
