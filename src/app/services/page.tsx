import type { Metadata } from "next";
import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";

export const metadata: Metadata = {
  title: "Services | Davies Imaging Group",
  description: "Photography, video, virtual staging, and 3D tours. Explore the full range of DIG services.",
};

const services = [
  { title: "Premium Photo", href: "/services/premium", description: "Full-service lifestyle and model home photography. DIG's signature service." },
  { title: "Listing Photo", href: "/services/listing", description: "HDR photography for spec homes and active inventory. Fast-turn, MLS-ready." },
  { title: "Video Production", href: "/services/video-production", description: "On-site, crew-based video. Community walkthroughs, lifestyle, brand films." },
  { title: "Virtual Staging", href: "/services/virtual-staging", description: "Reference-based virtual staging. No shoot required." },
  { title: "Virtual Video", href: "/services/virtual-video", description: "Digital video from existing photos. No crew, fast delivery." },
  { title: "Matterport", href: "/services/matterport", description: "3D virtual tour scanning for immersive buyer experiences." },
];

export default function ServicesIndex() {
  return (
    <section className="flex min-h-screen items-center bg-bg-surface py-24">
      <div className="mx-auto max-w-4xl px-6">
        <RevealOnScroll>
          <div className="text-center">
            <Eyebrow>Services</Eyebrow>
            <h1>How DIG does the <strong>work</strong>.</h1>
            <p className="mt-5 text-text-body">
              Quality tiers and methods across photography, video, and digital services.
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll stagger={120}>
          {services.map((svc) => (
            <Link
              key={svc.href}
              href={svc.href}
              className="mt-6 block first:mt-14 rounded-lg border border-border-light p-8 transition-colors hover:border-accent-secondary"
            >
              <h3>{svc.title}</h3>
              <p className="mt-2 text-text-body">{svc.description}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-text-dark">
                Learn more <span aria-hidden="true">&rarr;</span>
              </span>
            </Link>
          ))}
        </RevealOnScroll>

        <RevealOnScroll>
          <div className="mt-14 rounded-lg border border-border-light bg-bg-light p-8 text-center">
            <Eyebrow>Scale</Eyebrow>
            <h3>Building in multiple <strong>markets</strong>?</h3>
            <p className="mt-3 text-text-body">
              DIG&rsquo;s Regional Partnerships program offers volume pricing, dedicated capacity, and one point of contact across all four U.S. regions.
            </p>
            <Link
              href="/offerings/regional-partnerships"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-text-dark transition-colors hover:text-accent"
            >
              Explore Regional Partnerships <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
