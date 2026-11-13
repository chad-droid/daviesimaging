import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Eyebrow } from "@/components/Eyebrow";
import { EditableHero } from "@/components/EditableHero";
import { DarkSection } from "@/components/DarkSection";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL, buildServiceSchema, buildBreadcrumbSchema, buildFaqSchema } from "@/lib/seo";

// Source: DIG Homebuilder Rates 2026 (rate sheet from Chad, 13 Nov 2026).
// Every figure on this page comes from that sheet. Change them together.

export const metadata: Metadata = {
  alternates: { canonical: "/pricing" },
  title: "Model Home Photography Cost: 2026 Home Builder Rates",
  description:
    "What home builder photography costs in 2026. Model home photography from $4,000 per home, spec home listing photography $350 flat, Spec+ $600, virtual staging from $25 per image.",
};

const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

const atAGlance = [
  { service: "Model home photography", price: "From $4,000 per home", delivery: "7 days", href: "#model-homes" },
  { service: "Model home video", price: "From $2,000 per home", delivery: "7 days", href: "#model-homes" },
  { service: "Sales center photography", price: "$2,500", delivery: "", href: "#community" },
  { service: "Clubhouse and amenity photography", price: "$6,000", delivery: "", href: "#community" },
  { service: "Spec home listing photography", price: "$350 flat, any home size", delivery: "24 hours", href: "#spec-homes" },
  { service: "Spec+ (photography, staging and video)", price: "$600 flat, any home size", delivery: "48 hours", href: "#spec-homes" },
  { service: "ModelMatch virtual staging", price: "From $25 per image", delivery: "", href: "#digital" },
  { service: "FrameFlow listing video", price: "From $150 per video", delivery: "", href: "#digital" },
  { service: "Matterport 3D tour", price: "From $400 per home", delivery: "", href: "#tours" },
];

const modelHomes = [
  { size: "Up to 2,999 sq ft", photo: 4000, video: 2000 },
  { size: "3,000 to 3,999 sq ft", photo: 4750, video: 2500 },
  { size: "4,000 to 4,999 sq ft", photo: 5500, video: 3000 },
];

const modelShotList = [
  "1 front elevation",
  "1 backyard",
  "3 primary suite",
  "2 kitchen",
  "3 great room",
  "1 secondary bedroom",
  "1 secondary bathroom",
  "1 office",
];

const community = [
  { service: "Sales center", images: "6", photo: "$2,500", video: "$2,000" },
  { service: "Clubhouse and amenities", images: "15", photo: "$6,000", video: "$3,000 and up" },
  { service: "Homesite view photos", images: "15", photo: "$2,000", video: "Not offered" },
];

const listingShotList = [
  "2 front elevation",
  "2 backyard",
  "4 primary suite",
  "4 kitchen",
  "4 great room",
  "1 loft",
  "3 secondary bedroom",
  "3 secondary bathroom",
  "1 office",
  "1 laundry",
];

const tours = [
  { size: "Up to 2,999 sq ft", mpModel: 500, mpSpec: 400, zModel: 450, zSpec: 350 },
  { size: "3,000 to 3,999 sq ft", mpModel: 600, mpSpec: 500, zModel: 550, zSpec: 450 },
  { size: "4,000 to 4,999 sq ft", mpModel: 700, mpSpec: 600, zModel: 650, zSpec: 550 },
];

const addOns = [
  { service: "Drone, ordered alone", deliverable: "15 images", rate: "$2,000" },
  { service: "Drone, added to a shoot", deliverable: "15 images", rate: "$1,000" },
  { service: "Twilight image", deliverable: "1 image", rate: "$500" },
  { service: "FrameFlow video, added to a model home shoot", deliverable: "1 video", rate: "$300" },
];

const digital = [
  { service: "ModelMatch virtual staging", note: "Per image", credit: "$25", payg: "$30", href: "/services/virtual-staging" },
  { service: "FrameFlow social video", note: "9:16, 4K, spec homes", credit: "$150", payg: "$180", href: "/services/virtual-video" },
  { service: "FrameFlow wide video", note: "16:9, 4K, spec homes", credit: "$150", payg: "$180", href: "/services/virtual-video" },
  { service: "FrameFlow social and wide video", note: "Both formats, 4K, spec homes", credit: "$250", payg: "$360", href: "/services/virtual-video" },
  { service: "CineFlow", note: "From your vacant images and model home gallery. 2 day delivery", credit: "$1,500", payg: "$1,500", href: "/services/cineflow" },
  { service: "PlanMatch, 10 vacant interiors", note: "From construction plans and model home gallery. 3 day delivery", credit: "$2,000", payg: "$2,000", href: "/services/planmatch" },
  { service: "PlanMatch, 10 vacant and 10 ModelMatch staged", note: "From construction plans and model home gallery. 3 day delivery", credit: "$2,400", payg: "$2,400", href: "/services/planmatch" },
];

const reloads = [
  { pay: 250, bonus: "No bonus", adds: 250 },
  { pay: 750, bonus: "No bonus", adds: 750 },
  { pay: 1500, bonus: "+ $75 (5%)", adds: 1575 },
  { pay: 4000, bonus: "+ $400 (10%)", adds: 4400 },
  { pay: 10000, bonus: "+ $2,000 (20%)", adds: 12000 },
];

const faqs = [
  {
    q: "How much does model home photography cost?",
    a: "DIG charges $4,000 for a model home under 3,000 square feet, $4,750 for 3,000 to 3,999 square feet, and $5,500 for 4,000 to 4,999 square feet. A model home under 3,000 square feet typically gets 15 finished images. The price includes 7 day delivery, unlimited retouching, digital fence removal and sky replacements. Homes of 5,000 square feet and larger are quoted.",
  },
  {
    q: "How much does spec home listing photography cost?",
    a: "Listing photography is $350 flat for any home size. You get 25 MLS-ready images within 24 hours, with blue tape and construction retouching, marketing signage removal and sky replacements included.",
  },
  {
    q: "What does Spec+ cost and what is in it?",
    a: "Spec+ is $600 flat per home, any size. It includes 25 MLS-ready images, 8 ModelMatch virtual staging images and 1 wide FrameFlow video in 4K, delivered within 48 hours.",
  },
  {
    q: "How much does virtual staging cost for home builders?",
    a: "ModelMatch virtual staging is $25 per image on a credit balance or $30 per image pay as you go. It is ordered in digDesk from photos you already have, so there is no shoot to schedule.",
  },
  {
    q: "How much does model home video cost?",
    a: "Model home video is $2,000 for a home under 3,000 square feet, $2,500 for 3,000 to 3,999 square feet, and $3,000 for 4,000 to 4,999 square feet. A FrameFlow video can be added to a model home shoot for $300.",
  },
  {
    q: "What is a credit balance?",
    a: "A credit balance is money you load into digDesk to pay for digital services at the lower credit rate. Reloads of $1,500 add a 5% bonus, $4,000 adds 10% and $10,000 adds 20%. The balance never expires and applies to digital services only.",
  },
  {
    q: "How much does a Matterport tour cost?",
    a: "A Matterport 3D tour is $500 to $700 for a model home and $400 to $600 for a spec home, depending on square footage. A sales center is $1,500 and a clubhouse or amenity starts at $1,500.",
  },
];

function Th({ children, right }: { children: ReactNode; right?: boolean }) {
  return (
    <th
      scope="col"
      className={`border-b border-text-dark/70 pb-3 text-[11px] font-bold uppercase tracking-[0.1em] text-text-muted ${right ? "text-right" : "text-left"}`}
    >
      {children}
    </th>
  );
}

function Td({ children, right, strong }: { children: ReactNode; right?: boolean; strong?: boolean }) {
  return (
    <td
      className={`border-b border-border-light py-3.5 align-top ${right ? "text-right" : "text-left"} ${
        strong ? "font-serif text-xl text-text-dark" : "text-[0.9375rem] text-text-body"
      }`}
    >
      {children}
    </td>
  );
}

function SectionHead({ id, eyebrow, title, meta }: { id: string; eyebrow: string; title: ReactNode; meta?: string }) {
  return (
    <div id={id} className="scroll-mt-28">
      <Eyebrow>{eyebrow}</Eyebrow>
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <h2>{title}</h2>
        {meta && <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-text-muted">{meta}</p>}
      </div>
    </div>
  );
}

function Included({ items }: { items: string[] }) {
  return (
    <div>
      <h3 className="font-sans text-[11px] font-bold uppercase tracking-[0.1em] text-text-dark">Included in the price</h3>
      <ul className="mt-3 space-y-1.5 text-[0.9375rem] text-text-body">
        {items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </div>
  );
}

function ShotList({ label, note, items }: { label: string; note: string; items: string[] }) {
  return (
    <div>
      <h3 className="font-sans text-[11px] font-bold uppercase tracking-[0.1em] text-text-dark">
        {label} <span className="font-normal normal-case tracking-normal text-text-muted">{note}</span>
      </h3>
      <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1.5 text-[0.9375rem] text-text-body">
        {items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </div>
  );
}

export default function PricingPage() {
  return (
    <>
      <JsonLd
        data={buildServiceSchema({
          name: "Home builder photography, virtual staging and video",
          description:
            "Published 2026 rates for model home photography, spec home listing photography, 3D tours, virtual staging and video for home builders.",
          path: "/pricing",
          serviceType: "Photography",
          offers: [
            { name: "Model home photography", price: 4000, unit: "per home", from: true },
            { name: "Model home video", price: 2000, unit: "per home", from: true },
            { name: "Spec home listing photography, any home size", price: 350 },
            { name: "Spec+, any home size", price: 600 },
            { name: "ModelMatch virtual staging", price: 25, unit: "per image", from: true },
            { name: "FrameFlow listing video", price: 150, unit: "per video", from: true },
            { name: "Matterport 3D tour", price: 400, unit: "per home", from: true },
          ],
        })}
      />
      <JsonLd data={buildBreadcrumbSchema([{ name: "Pricing", path: "/pricing" }])} />
      <JsonLd data={buildFaqSchema(faqs, `${SITE_URL}/pricing`)} />

      {/* Hero */}
      <DarkSection className="py-28 text-text-light">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <EditableHero
              slotId="pricing-hero"
              eyebrowDefault="Pricing"
              headlineDefault="What model home photography <strong>costs</strong>."
              subheadDefault="These are DIG's published 2026 rates for home builders. Model home photography starts at $4,000 a home, spec home listing photography is $350 flat, and virtual staging starts at $25 an image."
            />
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/get-started"
                className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
              >
                Get Started
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium text-text-muted transition-colors hover:text-text-light"
              >
                Ask for a quote &rarr;
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </DarkSection>

      {/* At a glance */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <Eyebrow>At a Glance</Eyebrow>
            <h2>
              Home builder photography <strong>pricing</strong>.
            </h2>
            <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-text-body">
              There is no subscription and no minimum. You pay per home, per location or per image, and the same rates apply to every order.
            </p>
            <div className="mt-8 overflow-x-auto">
              <table className="w-full min-w-[34rem] border-collapse">
                <thead>
                  <tr>
                    <Th>Service</Th>
                    <Th right>Price</Th>
                    <Th right>Delivery</Th>
                  </tr>
                </thead>
                <tbody>
                  {atAGlance.map((r) => (
                    <tr key={r.service}>
                      <Td>
                        <a href={r.href} className="text-text-dark underline-offset-4 hover:text-accent hover:underline">
                          {r.service}
                        </a>
                      </Td>
                      <Td right>{r.price}</Td>
                      <Td right>{r.delivery || " "}</Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Model homes */}
      <section className="bg-bg-light py-20">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <SectionHead
              id="model-homes"
              eyebrow="On-Site Capture"
              title={
                <>
                  Model home photography and <strong>video</strong>.
                </>
              }
              meta="Per home · 7 day delivery"
            />
            <div className="mt-8 overflow-x-auto">
              <table className="w-full min-w-[30rem] border-collapse">
                <thead>
                  <tr>
                    <Th>Home size</Th>
                    <Th right>Photography</Th>
                    <Th right>Video</Th>
                  </tr>
                </thead>
                <tbody>
                  {modelHomes.map((r) => (
                    <tr key={r.size}>
                      <Td>{r.size}</Td>
                      <Td right strong>{usd(r.photo)}</Td>
                      <Td right strong>{usd(r.video)}</Td>
                    </tr>
                  ))}
                  <tr>
                    <Td>5,000 to 6,999 sq ft</Td>
                    <td colSpan={2} className="border-b border-border-light py-3.5 text-right">
                      <Link href="/contact" className="text-sm font-semibold text-accent hover:underline">
                        Call for a quote
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-10 grid gap-10 sm:grid-cols-[3fr_2fr]">
              <ShotList label="15 total images" note="Typical for model homes under 3,000 sq ft" items={modelShotList} />
              <Included items={["7 day delivery", "Unlimited retouching", "Digital fence removal", "Sky replacements"]} />
            </div>
            <p className="mt-8 text-sm text-text-muted">
              <Link href="/services/premium" className="text-accent hover:underline">
                How model home photography works
              </Link>{" "}
              and{" "}
              <Link href="/gallery/models" className="text-accent hover:underline">
                examples of the work
              </Link>
              .
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Community and amenity */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <SectionHead
              id="community"
              eyebrow="On-Site Capture"
              title={
                <>
                  Community and amenity <strong>photography</strong>.
                </>
              }
              meta="Per location"
            />
            <div className="mt-8 overflow-x-auto">
              <table className="w-full min-w-[32rem] border-collapse">
                <thead>
                  <tr>
                    <Th>Service</Th>
                    <Th right>Images</Th>
                    <Th right>Photography</Th>
                    <Th right>Video</Th>
                  </tr>
                </thead>
                <tbody>
                  {community.map((r) => (
                    <tr key={r.service}>
                      <Td>{r.service}</Td>
                      <Td right>{r.images}</Td>
                      <Td right strong>{r.photo}</Td>
                      <Td right strong={r.video.startsWith("$")}>{r.video}</Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-6 text-sm text-text-muted">
              Matterport for sales centers and amenities is listed under{" "}
              <a href="#tours" className="text-accent hover:underline">
                3D tours
              </a>
              .
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Spec homes */}
      <section className="bg-bg-light py-20">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <SectionHead
              id="spec-homes"
              eyebrow="Spec Homes and QMI"
              title={
                <>
                  Spec home listing <strong>photography</strong>.
                </>
              }
              meta="Per home · 24 hour delivery"
            />
            <div className="mt-8 flex items-baseline justify-between gap-6 border-y border-border-light py-5">
              <p className="text-[1.0625rem] text-text-dark">All home sizes, 25 MLS-ready images</p>
              <p className="whitespace-nowrap font-serif text-4xl text-text-dark">
                $350 <span className="font-sans text-[11px] font-bold uppercase tracking-[0.1em] text-text-muted">flat</span>
              </p>
            </div>
            <div className="mt-10 grid gap-10 sm:grid-cols-[3fr_2fr]">
              <ShotList label="25 total images" note="Typical for homes under 3,000 sq ft" items={listingShotList} />
              <Included
                items={[
                  "24 hour delivery",
                  "Blue tape and construction retouching",
                  "Marketing signage removal",
                  "Sky replacements",
                ]}
              />
            </div>

            {/* Spec+ */}
            <div className="theme-dark mt-14 rounded-2xl bg-bg-dark p-8 text-text-light sm:p-10">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-accent">Bundled services for builders</p>
                  <h3 className="mt-2 text-4xl text-text-light">Spec+</h3>
                </div>
                <div className="sm:text-right">
                  <p className="font-serif text-6xl leading-none text-text-light">$600</p>
                  <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.1em] text-accent">Per home · all sizes</p>
                </div>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  { n: "25", label: "MLS-ready images" },
                  { n: "8", label: "ModelMatch virtual staging images" },
                  { n: "1", label: "Wide FrameFlow video, 16:9, 4K" },
                ].map((c) => (
                  <div key={c.label} className="rounded-xl border border-white/10 bg-white/5 p-5">
                    <p className="font-serif text-4xl text-text-light">{c.n}</p>
                    <p className="mt-1 text-sm text-text-muted">{c.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 border-t border-white/10 pt-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-text-light">Included in the price</p>
                <p className="mt-2 text-[0.9375rem] text-text-muted">
                  48 hour delivery, blue tape and construction retouching, marketing signage removal, and sky replacements.
                </p>
                <p className="mt-4 text-sm text-text-muted">
                  Spec+ uses the same 25-image shot list as listing photography. 3D tours, drone and virtual landscaping are available for an additional fee.
                </p>
                <Link href="/programs/spec-plus" className="mt-6 inline-block text-sm font-semibold text-accent hover:underline">
                  See Spec+ details &rarr;
                </Link>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* 3D tours and add-ons */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <SectionHead
              id="tours"
              eyebrow="On-Site Capture"
              title={
                <>
                  3D tours and <strong>add-ons</strong>.
                </>
              }
              meta="Per home"
            />
            <div className="mt-8 overflow-x-auto">
              <table className="w-full min-w-[36rem] border-collapse">
                <thead>
                  <tr>
                    <Th>Home size</Th>
                    <Th right>Matterport, model</Th>
                    <Th right>Matterport, spec</Th>
                    <Th right>Zillow 3D, model</Th>
                    <Th right>Zillow 3D, spec</Th>
                  </tr>
                </thead>
                <tbody>
                  {tours.map((r) => (
                    <tr key={r.size}>
                      <Td>{r.size}</Td>
                      <Td right strong>{usd(r.mpModel)}</Td>
                      <Td right strong>{usd(r.mpSpec)}</Td>
                      <Td right strong>{usd(r.zModel)}</Td>
                      <Td right strong>{usd(r.zSpec)}</Td>
                    </tr>
                  ))}
                  <tr>
                    <Td>5,000 to 6,999 sq ft</Td>
                    <td colSpan={4} className="border-b border-border-light py-3.5 text-right">
                      <Link href="/contact" className="text-sm font-semibold text-accent hover:underline">
                        Call for a quote
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <Td>Sales center</Td>
                    <Td right strong>$1,500</Td>
                    <Td right>{" "}</Td>
                    <Td right>{" "}</Td>
                    <Td right>{" "}</Td>
                  </tr>
                  <tr>
                    <Td>Clubhouse and amenities</Td>
                    <Td right strong>$1,500 and up</Td>
                    <Td right>{" "}</Td>
                    <Td right>{" "}</Td>
                    <Td right>{" "}</Td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="mt-14">Add-ons</h3>
            <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.1em] text-text-muted">Added to any shoot</p>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[30rem] border-collapse">
                <thead>
                  <tr>
                    <Th>Service</Th>
                    <Th right>Deliverable</Th>
                    <Th right>Rate</Th>
                  </tr>
                </thead>
                <tbody>
                  {addOns.map((r) => (
                    <tr key={r.service}>
                      <Td>{r.service}</Td>
                      <Td right>{r.deliverable}</Td>
                      <Td right strong>{r.rate}</Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Digital services */}
      <section className="bg-bg-light py-20">
        <div className="mx-auto max-w-4xl px-6">
          <RevealOnScroll>
            <SectionHead
              id="digital"
              eyebrow="No Shoot Required"
              title={
                <>
                  Virtual staging and video <strong>pricing</strong>.
                </>
              }
              meta="Ordered in digDesk"
            />
            <div className="mt-8 overflow-x-auto">
              <table className="w-full min-w-[34rem] border-collapse">
                <thead>
                  <tr>
                    <Th>Service</Th>
                    <Th right>Credit balance</Th>
                    <Th right>Pay as you go</Th>
                  </tr>
                </thead>
                <tbody>
                  {digital.map((r) => (
                    <tr key={r.service}>
                      <Td>
                        <Link href={r.href} className="text-text-dark underline-offset-4 hover:text-accent hover:underline">
                          {r.service}
                        </Link>
                        <span className="mt-0.5 block text-sm text-text-muted">{r.note}</span>
                      </Td>
                      <Td right strong>
                        <span className={r.credit !== r.payg ? "text-accent" : undefined}>{r.credit}</span>
                      </Td>
                      <Td right strong>{r.payg}</Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-6 text-sm text-text-muted">
              CineFlow and PlanMatch are the same price on a credit balance or pay as you go.
            </p>

            <h3 className="mt-14">Credit balance reloads</h3>
            <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.1em] text-text-muted">Never expires · digital services only</p>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
              {reloads.map((r) => (
                <div key={r.pay} className="rounded-xl border border-border-light bg-bg-surface p-4 text-center">
                  <p className="font-serif text-2xl text-text-dark">{usd(r.pay)}</p>
                  <p className={`mt-1 text-xs ${r.bonus.startsWith("+") ? "font-semibold text-accent" : "text-text-muted"}`}>{r.bonus}</p>
                  <p className="mt-3 border-t border-border-light pt-3 text-sm text-text-body">
                    Adds <strong>{usd(r.adds)}</strong>
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-[0.9375rem] text-text-body">
              Every account includes unlimited ModelMatch galleries and unlimited digDesk user seats.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6">
          <RevealOnScroll>
            <Eyebrow>Questions</Eyebrow>
            <h2>
              What builders ask about <strong>cost</strong>.
            </h2>
            <dl className="mt-10 divide-y divide-border-light border-y border-border-light">
              {faqs.map((f) => (
                <div key={f.q} className="py-6">
                  <dt>
                    <h3 className="font-sans text-[1.0625rem] font-semibold text-text-dark">{f.q}</h3>
                  </dt>
                  <dd className="mt-2 text-[1.0625rem] leading-relaxed text-text-body">{f.a}</dd>
                </div>
              ))}
            </dl>
          </RevealOnScroll>
        </div>
      </section>

      {/* Final CTA */}
      <DarkSection className="py-24 text-text-light">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <RevealOnScroll>
            <Eyebrow dark>Ready to Order</Eyebrow>
            <h2 className="text-text-light">
              Order at these rates in <strong>digDesk</strong>.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-text-muted">
              Request an account and start ordering, or book a 15-minute walkthrough with the DIG team first.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/get-started"
                className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
              >
                Get Started
              </Link>
              <Link href="/contact" className="text-sm font-medium text-text-muted transition-colors hover:text-text-light">
                Book a Strategy Call &rarr;
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </DarkSection>
    </>
  );
}
