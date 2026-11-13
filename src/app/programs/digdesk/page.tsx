import type { Metadata } from "next";
import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { DynamicImage } from "@/components/DynamicImage";
import { ImageBand } from "@/components/ImageBand";
import { EditableHero } from "@/components/EditableHero";
import { EditableTextContent } from "@/components/EditableTextContent";
import { DarkSection } from "@/components/DarkSection";
import { JsonLd } from "@/components/JsonLd";
import { buildServiceSchema, buildBreadcrumbSchema } from "@/lib/seo";
import { TestimonialBand } from "@/components/TestimonialBand";

export const metadata: Metadata = {
  alternates: { canonical: "/programs/digdesk" },
  title: "digDesk: Order and Track Home Builder Photography Online",
  description: "digDesk is the single point of entry to order, track, revise, and pay for all of your marketing assets.",
};

const modules = [
  {
    number: "01",
    title: "FrameFlow Studio",
    body: "Upload your listing photography and get ModelMatch virtual staging and FrameFlow video without scheduling a new shoot. Order them by themselves or bundled as Spec+.",
    href: "/programs/frameflow",
    linkLabel: "Explore FrameFlow Studio",
  },
  {
    number: "02",
    title: "Listing Photography",
    body: "Schedule your spec home and QMI photography directly through your portal. Select your market, add the property details, and coordinate access from a single order form.",
    href: "/services/listing",
    linkLabel: "See Listing Photography",
  },
  {
    number: "03",
    title: "Premium Photography",
    body: "Request your model home and lifestyle shoots, upload your pre-shoot briefs, and track production from submission to final delivery.",
    href: "/services/premium",
    linkLabel: "See Premium Photography",
  },
  {
    number: "04",
    title: "ModelMatch Gallery",
    body: "Build and manage your reference image library. Upload your approved model home photography once, and every future ModelMatch order draws from it.",
    href: "/services/virtual-staging",
    linkLabel: "How ModelMatch works",
  },
];

const reasons = [
  {
    title: "One place for everything",
    body: "Your photography orders, ModelMatch staging, FrameFlow video, asset downloads, and revision requests all live in digDesk.",
  },
  {
    title: "Order and track in real time",
    body: "Every order shows its status from submission through production to delivery, so your team always knows where things stand.",
  },
  {
    title: "Assets delivered directly",
    body: "Your finished photography, staged images, and video are delivered to your digDesk portal. Preview, download individual files, or use Download All. Each order includes a shareable delivery link with no login required.",
  },
  {
    title: "Built for lean marketing teams",
    body: "Our services minimize the time to order everything you need, saving lean marketing teams days of valuable listing time.",
  },
];

export default function DigDeskPage() {
  return (
    <>
      <JsonLd
        data={buildServiceSchema({
          name: "digDesk",
          description:
            "The DIG client portal: one place to order, track, revise and pay for photography, virtual staging and video.",
          path: "/programs/digdesk",
          serviceType: "Client Portal",
        })}
      />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Programs", path: "/programs" },
          { name: "digDesk", path: "/programs/digdesk" },
        ])}
      />
      {/* Hero */}
      <DarkSection className="py-28 text-text-light">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <EditableHero
              slotId="programs-digdesk-hero"
              eyebrowDefault="Programs / digDesk"
              headlineDefault="Everything you need in <strong>one place</strong>."
              subheadDefault="The single point of entry to order, track, revise, and pay for all of your marketing assets."
            />
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/get-started"
                className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
              >
                Get Access to digDesk
              </Link>
              <a
                href="https://desk.daviesimaging.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-text-muted transition-colors hover:text-text-light"
              >
                Already a client? Log in &rarr;
              </a>
            </div>
          </RevealOnScroll>
        </div>
      </DarkSection>

      {/* The dashboard, full width under the hero */}
      <ImageBand
        slotId="programs-digdesk-hero-img"
        defaultSrc="/mm-deck/digdesk-dashboard.jpg"
        alt="The digDesk dashboard, showing recent orders and their status"
        aspectRatio="16/9"
        dark
      />

      {/* What it is */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll>
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <EditableTextContent
                  slotId="programs-digdesk-portal"
                  eyebrowDefault="The DIG Client Portal"
                  headlineDefault="The only end-to-end marketing solution built for <strong>home builders</strong>."
                  bodyDefault="From your portal you can place new orders, upload shoot details, choose your ModelMatch gallery, track production, and download your finished assets."
                />
                <p className="mt-4 text-text-body">
                  Every order runs through digDesk. Your listing photography, ModelMatch staging, FrameFlow video, Spec+, and Premium photography requests all start and finish in the same place.
                </p>
                <div className="mt-8">
                  <Link
                    href="/get-started"
                    className="rounded-full border border-border-light px-5 py-2 text-sm font-medium text-text-body transition-colors hover:border-accent hover:text-accent"
                  >
                    Schedule a demo to see it live
                  </Link>
                </div>
              </div>
              <DynamicImage
                slotId="offerings-digdesk-portal"
                defaultSrc="/mm-deck/digdesk-gallery.jpg"
                defaultAlt="The ModelMatch gallery inside digDesk"
                aspectRatio="16/9"
                className="rounded-2xl ring-1 ring-border-light"
              />
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Four modules */}
      <DarkSection className="py-24 text-text-light">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll>
            <div className="mb-14 text-center">
              <EditableTextContent
                slotId="programs-digdesk-modules"
                eyebrowDefault="What's Inside"
                headlineDefault="What you can order in <strong>digDesk</strong>."
                bodyDefault="digDesk is organized around the services your team uses. Each one has its own ordering flow, tracking view, and delivery."
                dark={true}
              />
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {modules.map((m) => (
                <div key={m.number} className="rounded-xl border border-white/10 bg-white/5 p-6">
                  <span className="font-mono text-2xl font-bold text-accent-dark-hover">{m.number}</span>
                  <h4 className="mt-3 text-base font-semibold text-text-light">{m.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">{m.body}</p>
                  <Link
                    href={m.href}
                    className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-accent transition-colors hover:underline"
                  >
                    {m.linkLabel} &rarr;
                  </Link>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </DarkSection>

      {/* Why digDesk */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll>
            <div className="mb-12 text-center">
              <EditableTextContent
                slotId="programs-digdesk-why"
                eyebrowDefault="Why It Matters"
                headlineDefault="Why builders use <strong>digDesk</strong>."
                bodyDefault=""
              />
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {reasons.map((r, i) => (
                <div key={i} className="rounded-xl border border-border-light bg-bg-surface p-6">
                  <h4 className="text-base font-semibold text-text-dark">{r.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-text-body">{r.body}</p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Access model */}
      <section className="bg-bg-light py-24">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <div className="grid gap-10 lg:grid-cols-2">
              <div className="rounded-xl border border-border-light bg-bg-surface p-8">
                <EditableTextContent
                  slotId="programs-digdesk-existing-clients"
                  eyebrowDefault="Existing DIG Clients"
                  headlineDefault="Already working <strong>with DIG</strong>?"
                  bodyDefault="Log in, or reach out and we will activate your account."
                  headingLevel="h3"
                />
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <a
                    href="https://desk.daviesimaging.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
                  >
                    Log in to digDesk
                  </a>
                  <Link
                    href="/contact"
                    className="rounded-full border border-border-light px-5 py-2 text-sm font-medium text-text-body transition-colors hover:border-accent hover:text-accent"
                  >
                    Get account help
                  </Link>
                </div>
              </div>
              <div className="rounded-xl border border-border-light bg-bg-surface p-8">
                <EditableTextContent
                  slotId="programs-digdesk-new-clients"
                  eyebrowDefault="New to DIG"
                  headlineDefault="Ready to get <strong>started</strong>?"
                  bodyDefault="Your account is active within one business day."
                  headingLevel="h3"
                />
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link
                    href="/get-started"
                    className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
                  >
                    Get Started
                  </Link>
                  <Link
                    href="/contact?intent=demo"
                    className="rounded-full border border-border-light px-5 py-2 text-sm font-medium text-text-body transition-colors hover:border-accent hover:text-accent"
                  >
                    Book a demo first
                  </Link>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Customer proof */}
      <TestimonialBand ids={["bradley-portal", "jaime-refresh"]} />

      {/* Final CTA */}
      <DarkSection className="py-24 text-text-light">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <EditableTextContent
              slotId="programs-digdesk-cta"
              headlineDefault="Have your listings been <strong>sitting</strong>?"
              bodyDefault="Go into digDesk and request new virtual staging or a different video, and refresh your listing with new assets."
              dark={true}
            />
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/get-started"
                className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
              >
                Get Access to digDesk
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
      </DarkSection>
    </>
  );
}
