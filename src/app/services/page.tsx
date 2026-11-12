import type { Metadata } from "next";
import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";
import { DarkSection } from "@/components/DarkSection";

export const metadata: Metadata = {
  alternates: { canonical: "/services" },
  title: "Services",
  description: "Photography, video, ModelMatch staging, and Flow video for home builder marketing teams, from lead to launch to list.",
};

const photography = [
  {
    title: "Premium Photography",
    href: "/services/premium",
    tag: "Flagship",
    description: "Model home, amenity, and lifestyle photography from our national network of highly trained photographers.",
    cta: "Explore Premium",
  },
  {
    title: "Listing Photography",
    href: "/services/listing",
    tag: null,
    description: "HDR photography for your spec homes and standing inventory, delivered within 48 hours of the shoot.",
    cta: "Explore Listing Photography",
  },
];

const video = [
  {
    title: "Premium Video",
    href: "/services/video-production",
    tag: "Full Crew",
    description: "On-site, crew-based video of your model homes, amenities, and communities.",
    cta: "Explore Premium Video",
  },
  {
    title: "FrameFlow",
    href: "/services/virtual-video",
    tag: "No Shoot",
    description: "Lifelike video from the photos you already have. Also how we produce video for your spec homes and listings.",
    cta: "Explore FrameFlow",
  },
];

const digital = [
  {
    title: "ModelMatch",
    href: "/services/virtual-staging",
    tag: "Virtual Staging",
    description: "Virtual staging built from your own model home merchandising, so your listings match your models.",
    cta: "Explore ModelMatch",
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
      <DarkSection className="py-28 text-text-light">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <Eyebrow dark>Services</Eyebrow>
            <h1 className="text-text-light">Everything you need, from lead to launch <strong>to list</strong>.</h1>
            <p className="mx-auto mt-5 max-w-xl text-lg text-text-muted">
              Photography, video, and digital production for your marketing team, from lead to launch to list.
            </p>
          </RevealOnScroll>
        </div>
      </DarkSection>

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
                FrameFlow is how we produce video for your spec homes and listings. Premium Video is crew-based film of your model homes and communities.
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
      <DarkSection className="py-24 text-text-light">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center lg:p-12">
              <Eyebrow dark>Scale</Eyebrow>
              <h2 className="mt-2 text-text-light">Building across multiple <strong>markets</strong>?</h2>
              <p className="mx-auto mt-4 max-w-xl text-text-muted">
                Regional Partnerships give you volume pricing, dedicated capacity, and one point of contact across all four U.S. regions. For builders doing 300 or more homes a year.
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
      </DarkSection>
    </>
  );
}
