import type { Metadata } from "next";
import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { DynamicImage } from "@/components/DynamicImage";
import { EditableHero } from "@/components/EditableHero";
import { EditableTextContent } from "@/components/EditableTextContent";
import { DarkSection } from "@/components/DarkSection";
import { TestimonialBand } from "@/components/TestimonialBand";

export const metadata: Metadata = {
  alternates: { canonical: "/programs/digdesk" },
  title: "digDesk",
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
      {/* Hero */}
      <DarkSection className="min-h-[60vh] py-28 text-text-light">
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
              <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-bg-dark">
                <DynamicImage
                  slotId="offerings-digdesk-portal"
                  className="h-full w-full object-cover object-left-top"
                  fallbackClass="h-full w-full"
                />
                {/* CSS mockup fallback */}
                <div className="absolute inset-0 group-has-[img]:hidden">
                  <div className="flex h-full flex-col">
                    {/* Window chrome */}
                    <div className="flex items-center justify-between border-b border-white/8 bg-black/30 px-5 py-3">
                      <div className="flex gap-1.5">
                        <div className="h-2.5 w-2.5 rounded-full bg-white/15" />
                        <div className="h-2.5 w-2.5 rounded-full bg-white/15" />
                        <div className="h-2.5 w-2.5 rounded-full bg-white/15" />
                      </div>
                      <div className="flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1">
                        <div className="h-1.5 w-1.5 rounded-full bg-accent/60" />
                        <span className="text-[10px] text-white/30">digDesk · Grand Homes</span>
                      </div>
                      <div className="w-10" />
                    </div>
                    {/* App layout */}
                    <div className="flex flex-1">
                      {/* Sidebar */}
                      <div className="w-40 border-r border-white/6 bg-black/10 p-3">
                        <div className="mb-4 flex items-center gap-2 px-2">
                          <div className="h-6 w-6 rounded-full bg-accent/20" />
                          <div className="h-2 w-16 rounded bg-white/15" />
                        </div>
                        {[
                          { label: "Dashboard", active: false },
                          { label: "New Order", active: true },
                          { label: "My Jobs", active: false },
                          { label: "ModelMatch", active: false },
                          { label: "Assets", active: false },
                        ].map((item) => (
                          <div
                            key={item.label}
                            className={`mb-0.5 flex items-center gap-2 rounded-lg px-2 py-1.5 ${
                              item.active ? "bg-accent/15 text-accent" : "text-white/30"
                            }`}
                          >
                            <div className={`h-1.5 w-1.5 rounded-full ${item.active ? "bg-accent" : "bg-white/20"}`} />
                            <span className="text-[10px]">{item.label}</span>
                          </div>
                        ))}
                      </div>
                      {/* Main */}
                      <div className="flex-1 p-5">
                        <div className="mb-4">
                          <div className="text-[11px] font-semibold text-white/70">New Order</div>
                          <div className="mt-0.5 text-[9px] text-white/30">Select a service to begin</div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { name: "Spec+", price: "$600 flat", active: true },
                            { name: "Listing Photo", price: "From $400", active: false },
                            { name: "ModelMatch", price: "From $25/img", active: false },
                            { name: "Premium Photo", price: "Custom", active: false },
                          ].map((card) => (
                            <div
                              key={card.name}
                              className={`rounded-xl p-3 ${
                                card.active
                                  ? "border border-accent/40 bg-accent/10"
                                  : "border border-white/6 bg-white/3"
                              }`}
                            >
                              <span className="text-[10px] font-medium text-white/70">{card.name}</span>
                              <div className="mt-1 text-[11px] font-semibold text-white/50">{card.price}</div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 flex justify-end">
                          <div className="rounded-full bg-accent px-4 py-1.5 text-[10px] font-semibold text-white">
                            Continue &rarr;
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
                  <span className="font-mono text-2xl font-bold text-accent/50">{m.number}</span>
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
                  bodyDefault="If your team already orders photography or digital services through DIG, your digDesk account is either active or ready to be set up. Log in with your existing credentials or reach out and we will get your account activated."
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
                  bodyDefault="New accounts are reviewed by our team and activated within one business day. Start with a 15-minute demo, or create your account and start ordering."
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
              headlineDefault="Has a listing been <strong>sitting</strong>?"
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
