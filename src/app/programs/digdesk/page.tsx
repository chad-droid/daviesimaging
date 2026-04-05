import type { Metadata } from "next";
import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";
import { DynamicImage } from "@/components/DynamicImage";
import { EditableContent } from "@/components/EditableContent";

export const metadata: Metadata = {
  title: "digDesk | Davies Imaging Group",
  description: "digDesk is the DIG client portal. Order every service, track every job, and manage every asset from a single dashboard.",
};

const modules = [
  {
    number: "01",
    title: "FrameFlow Studio",
    body: "The digital production module inside digDesk. Upload listing photography and receive ModelMatch virtual staging and virtual video without scheduling a new shoot. Order standalone or bundle as Spec+.",
    href: "/programs/frameflow",
    linkLabel: "Explore FrameFlow Studio",
  },
  {
    number: "02",
    title: "Listing Photography",
    body: "Schedule spec home and QMI photography orders directly through your portal. Select market, provide property details, and coordinate access — all from a single order form.",
    href: "/services/listing",
    linkLabel: "See Listing Photography",
  },
  {
    number: "03",
    title: "Premium Photography",
    body: "Request model home and lifestyle shoot projects, upload pre-shoot briefs, and track production progress from submission to final delivery.",
    href: "/services/premium",
    linkLabel: "See Premium Photography",
  },
  {
    number: "04",
    title: "ModelMatch Gallery",
    body: "Build and manage your builder's reference image library. Upload approved model home photography once. Every future virtual staging order draws from it automatically.",
    href: "/services/virtual-staging",
    linkLabel: "How ModelMatch works",
  },
];

const reasons = [
  {
    title: "One place for everything",
    body: "Photography orders, virtual staging, virtual video, asset downloads, and revision requests all live in digDesk. No emails, no separate portals, no confusion about order status.",
  },
  {
    title: "Order and track in real time",
    body: "Every order shows its current status from submission through production to delivery. Your team always knows where things stand without having to ask.",
  },
  {
    title: "Assets delivered directly",
    body: "Finished photography, staged images, and virtual video are delivered to your digDesk portal. Preview, download individual files, or use Download All. Each order includes a shareable delivery link with no login required.",
  },
  {
    title: "Built for lean marketing teams",
    body: "digDesk is designed for builder marketing coordinators and directors who need to move fast. Low friction ordering, clear status tracking, and a clean interface that does not get in the way.",
  },
];

export default function DigDeskPage() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-[60vh] bg-bg-dark py-28 text-text-light">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <RevealOnScroll>
            <Eyebrow dark>Programs / digDesk</Eyebrow>
            <EditableContent
              slotId="programs-digdesk-hero"
              fields={[
                { key: "headline", label: "Headline", type: "textarea" as const, defaultValue: "One portal for your <strong>entire visual pipeline</strong>." },
                { key: "subhead", label: "Subhead", type: "textarea" as const, defaultValue: "digDesk is the DIG client portal. Order every service, track every job, manage your ModelMatch brand library, and download finished assets from a single dashboard." },
              ]}
            >
              {(v) => (
                <>
                  <h1 className="text-text-light" dangerouslySetInnerHTML={{ __html: v.headline }} />
                  <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-text-muted">{v.subhead}</p>
                </>
              )}
            </EditableContent>
            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
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
      </section>

      {/* What it is */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll>
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <Eyebrow>The DIG Client Portal</Eyebrow>
                <h2>
                  Every DIG service. <strong>One dashboard</strong>.
                </h2>
                <p className="mt-4 text-text-body">
                  digDesk replaces the back-and-forth of email-based ordering. From your portal, you can place new orders, upload shoot details, choose your ModelMatch reference gallery, track production, and download finished assets — all without a single email to your account team.
                </p>
                <p className="mt-4 text-text-body">
                  Every order type DIG offers runs through digDesk. Listing photography, virtual staging, virtual video, Spec+ bundles, and Premium photography requests all start and finish in the same place.
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
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-bg-dark">
                <DynamicImage
                  slotId="offerings-digdesk-portal"
                  className="h-full w-full object-cover"
                  fallbackClass="h-full w-full"
                />
                {/* CSS mockup fallback */}
                <div className="absolute inset-0 [&:has(img)]:hidden">
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
                        <span className="text-[10px] text-white/30">digDesk — Grand Homes</span>
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
                            { name: "Virtual Staging", price: "From $25/img", active: false },
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
      <section className="bg-bg-dark py-24 text-text-light">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll>
            <div className="mb-14 text-center">
              <Eyebrow dark>What's Inside</Eyebrow>
              <h2 className="text-text-light">
                Four modules. <strong>Every DIG service covered</strong>.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-text-muted">
                digDesk is organized around the services your team actually uses. Each module has its own ordering flow, tracking view, and delivery destination.
              </p>
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
      </section>

      {/* Why digDesk */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll>
            <div className="mb-12 text-center">
              <Eyebrow>Why It Matters</Eyebrow>
              <h2>
                Less coordination. <strong>More velocity</strong>.
              </h2>
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
                <Eyebrow>Existing DIG Clients</Eyebrow>
                <h3 className="mt-3">
                  Already working <strong>with DIG</strong>?
                </h3>
                <p className="mt-3 text-text-body text-sm leading-relaxed">
                  If your team already orders photography or digital services through DIG, your digDesk account is either active or ready to be set up. Log in with your existing credentials or reach out and we will get your account activated.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
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
                <Eyebrow>New to DIG</Eyebrow>
                <h3 className="mt-3">
                  Ready to get <strong>started</strong>?
                </h3>
                <p className="mt-3 text-text-body text-sm leading-relaxed">
                  New accounts are reviewed by our team and activated within one business day. Start with a 15-minute demo to see digDesk in action, or submit your account request directly and start ordering right away.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
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

      {/* Final CTA */}
      <section className="bg-bg-dark py-24 text-text-light">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <h2 className="text-text-light">
              The portal your marketing team <strong>has been missing</strong>.
            </h2>
            <p className="mt-5 text-text-muted">
              Order photography, virtual staging, and video. Track every job. Download every asset. All from one place built specifically for homebuilder marketing teams.
            </p>
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
      </section>
    </>
  );
}
