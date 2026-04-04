import type { Metadata } from "next";
import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";

export const metadata: Metadata = {
  title: "Services | Davies Imaging Group",
  description: "Photography, video, virtual staging, and 3D tours. Explore the full range of DIG services for homebuilder marketing teams.",
};

const photography = [
  {
    title: "Premium Photo",
    href: "/services/premium",
    tag: "Flagship",
    description: "Slow, methodical, full-setup photography for model homes and lifestyle shoots. DIG&apos;s highest-craft output. For launches, lifestyle campaigns, and builder brands that need imagery that earns attention.",
    cta: "Explore Premium",
  },
  {
    title: "Listing Photo",
    href: "/services/listing",
    tag: null,
    description: "HDR photography for spec homes and standing inventory. Fast-turn, MLS-ready, delivered within 48 hours of the shoot.",
    cta: "Explore Listing Photo",
  },
];

const video = [
  {
    title: "Video Production",
    href: "/services/video-production",
    tag: "Full Crew",
    description: "On-site, crew-based video for community walkthroughs, lifestyle campaigns, amenity showcases, and brand films. DIG&apos;s highest-craft video output.",
    cta: "Explore Video Production",
  },
  {
    title: "Virtual Video",
    href: "/services/virtual-video",
    tag: "No Shoot",
    description: "Digital listing video built from existing photography. No shoot day, no crew. Fast delivery through FrameFlow Studio. The listing video solution for spec and standing inventory.",
    cta: "Explore Virtual Video",
  },
];

const digital = [
  {
    title: "Virtual Staging",
    href: "/services/virtual-staging",
    tag: "ModelMatch",
    description: "Reference-based virtual staging using your builder&apos;s own model home photography as the design reference. Branded results, not generic furniture swaps.",
    cta: "Explore Virtual Staging",
  },
  {
    title: "Matterport",
    href: "/services/matterport",
    tag: "3D Tours",
    description: "Immersive 3D virtual tours for model homes and communities. Room-by-room navigation for remote buyers, sales centers, and digital campaigns.",
    cta: "Explore Matterport",
  },
];

function ServiceCard({ svc }: { svc: typeof photography[0] }) {
  return (
    <Link
      href={svc.href}
      className="group flex flex-col rounded-xl border border-border-light bg-bg-surface p-6 transition-all hover:border-accent hover:shadow-sm"
    >
      <div className="mb-4 flex items-center gap-2">
        <h3 className="text-xl font-semibold text-text-dark transition-colors group-hover:text-accent">
          {svc.title}
        </h3>
        {svc.tag && (
          <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent">
            {svc.tag}
          </span>
        )}
      </div>
      <p
        className="flex-1 text-sm leading-relaxed text-text-body"
        dangerouslySetInnerHTML={{ __html: svc.description }}
      />
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-text-dark transition-colors group-hover:text-accent">
        {svc.cta} <span aria-hidden="true">&rarr;</span>
      </span>
    </Link>
  );
}

export default function ServicesIndex() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-[55vh] bg-bg-dark py-28 text-text-light">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <RevealOnScroll>
            <Eyebrow dark>Services</Eyebrow>
            <h1 className="text-text-light">How DIG does the <strong>work</strong>.</h1>
            <p className="mx-auto mt-5 max-w-xl text-lg text-text-muted">
              Seven services across photography, video, and digital production. Each one built for homebuilder marketing teams that need results, not just assets.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Photography */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll>
            <div className="mb-10">
              <Eyebrow>Photography</Eyebrow>
              <h2>Two tiers. Every need <strong>covered</strong>.</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {photography.map((svc) => (
                <ServiceCard key={svc.href} svc={svc} />
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Video */}
      <section className="bg-bg-light py-24">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll>
            <div className="mb-10">
              <Eyebrow>Video</Eyebrow>
              <h2>Full crew or <strong>no crew</strong>. Your choice.</h2>
              <p className="mt-3 max-w-xl text-text-body">
                DIG does not create listing video with a real camera crew. Virtual Video is the fast, consistent solution for spec and standing inventory. Video Production is for high-craft lifestyle and community storytelling.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {video.map((svc) => (
                <ServiceCard key={svc.href} svc={svc} />
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Digital */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <RevealOnScroll>
            <div className="mb-10">
              <Eyebrow>Digital</Eyebrow>
              <h2>No shoot required. <strong>Just results</strong>.</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {digital.map((svc) => (
                <ServiceCard key={svc.href} svc={svc} />
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Regional partnerships callout */}
      <section className="bg-bg-dark py-24 text-text-light">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center lg:p-12">
              <Eyebrow dark>Scale</Eyebrow>
              <h2 className="mt-2 text-text-light">Building across multiple <strong>markets</strong>?</h2>
              <p className="mx-auto mt-4 max-w-xl text-text-muted">
                DIG&apos;s Regional Partnerships program offers volume pricing, dedicated capacity, and one point of contact across all four U.S. regions. Built for builders doing 300 or more homes annually.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/programs/regional-partnerships"
                  className="rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
                >
                  Explore Regional Partnerships
                </Link>
                <Link
                  href="/contact"
                  className="text-sm font-medium text-text-muted transition-colors hover:text-text-light"
                >
                  Book a strategy call &rarr;
                </Link>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
