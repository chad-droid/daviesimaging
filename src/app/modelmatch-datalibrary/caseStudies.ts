// ModelMatch Win Library — micro-case studies.
//
// Each entry is one verified win: a home that found a buyer after modelMatch
// entered its marketing. Two story shapes:
//   - "rescue": sat unstaged for a long time, then found a buyer N days after
//     modelMatch. Tile shows the days-on-market contrast (big -> small).
//   - "fresh": brand-new listing that went under contract N days after the
//     modelMatch photos went live. Tile shows the single fast number.
//
// CLAIM RULES (from the June 19 2026 Win-Library source sheet — non-optional):
//   - Sequence, not causation. "found a buyer after modelMatch", never "sold it".
//   - Texas is a non-disclosure state: TX claims lead with DAYS, never price.
//     TX dollar figures are internal-only and are NOT rendered here. Non-TX
//     homes (e.g. PA) may show price.
//   - Banned words: stunning, transform, proven, guaranteed.
//   - No comparison/"comp" claims. Story stays home-vs-its-own-history.
//
// Gallery images are genuine modelMatch virtually-staged interiors (the
// disclaimer-watermarked deliverables), never the vacant MLS shots. Optimized
// to webp under /public/mm-library. To add a property: append an object and
// drop its {slug}-{n}.webp images in that folder.

export type TimelineEvent = {
  /** Date or duration label, e.g. "May 19, 2026" or "357 days". */
  d: string;
  /** Event text (trusted static content). */
  t: string;
  /** "mm" = modelMatch event, "end" = transaction, "fail" = fell through. */
  cls?: "mm" | "end" | "fail" | "";
};

export type CaseStudy = {
  slug: string;
  addr: string;
  city: string;
  builder: string;
  story: "rescue" | "fresh";
  /** Days unstaged on market before modelMatch (rescue only). */
  unstaged?: number;
  /** Days to a buyer / contract after modelMatch. */
  after: number;
  /** Render the after number as "~N" (approximate). */
  afterApprox?: boolean;
  /** Win closed (sold), vs. under contract / pending. */
  closed?: boolean;
  /** Short result line for the detail view. */
  result: string;
  /** Durability note (option window cleared, closed, etc.). */
  durability: string;
  /** Audit-approved one-line subhead. */
  subhead: string;
  /** Audit-approved microcopy (verification + sequence-not-cause). */
  micro: string;
  /** Verification source label. */
  verification: string;
  /** "The clock" narrative. */
  clock: string;
  events: TimelineEvent[];
  /** Disclosure required by the source sheet, if any. */
  disclosure?: string;
  /** Public price — non-TX homes only (TX is non-disclosure). */
  price?: string;
  /** Sold/contracted at full list with no price cut. */
  noCut?: boolean;
  /** Staged image filenames under /public/mm-library. First is the tile. */
  images: string[];
};

export const META = {
  disclaimer:
    "Every home here found a buyer after modelMatch entered its marketing. Sequence, not causation. Texas is a non-disclosure state, so Texas claims lead with days on market, not price. MLS and portal histories verified June 2026.",
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "3737-selborne-dr",
    addr: "3737 Selborne Dr",
    city: "Rockwall, TX",
    builder: "Grand Homes",
    story: "rescue",
    unstaged: 357,
    after: 14,
    result: "Under contract Apr 27, 2026",
    durability: "Durable — cleared the option window",
    subhead:
      "3737 Selborne sat 357 days through two dead contracts. A buyer came 14 days after modelMatch.",
    micro: "PropStream-verified, Rockwall TX. Re-opened demand: we report the sequence, not causation.",
    verification: "PropStream day-level",
    clock:
      "357 days and two failed contracts before modelMatch, then under contract 14 days after.",
    events: [
      { d: "Listed", t: "On market, Rockwall TX" },
      { d: "357 days", t: "Two contracts fell through", cls: "fail" },
      { d: "Apr 13, 2026", t: "modelMatch staging", cls: "mm" },
      { d: "Apr 27, 2026", t: "Under contract", cls: "end" },
    ],
    disclosure: "Two prior failed contracts — part of the stuck story.",
    images: [
      "3737-selborne-dr-3.webp",
      "3737-selborne-dr-1.webp",
      "3737-selborne-dr-2.webp",
      "3737-selborne-dr-4.webp",
      "3737-selborne-dr-5.webp",
      "3737-selborne-dr-6.webp",
      "3737-selborne-dr-7.webp",
      "3737-selborne-dr-8.webp",
    ],
  },
  {
    slug: "3511-riley-st",
    addr: "3511 Riley St",
    city: "Rockwall, TX",
    builder: "Perry Homes",
    story: "fresh",
    after: 3,
    result: "Under contract Jun 4, 2026",
    durability: "Durable — held past the option window",
    subhead:
      "3511 Riley found a buyer 3 days after modelMatch photos went live, and the contract held.",
    micro: "PropStream-verified, Rockwall TX. Fastest fresh contract in the set.",
    verification: "PropStream day-level",
    clock:
      "Photos live June 1, then under contract 3 days later (June 4); held past the option window.",
    events: [
      { d: "Jun 1, 2026", t: "modelMatch photos go live", cls: "mm" },
      { d: "3 days", t: "Under contract", cls: "end" },
      { d: "~Jun 14, 2026", t: "Held past the option window" },
    ],
    disclosure: "Pre-photos price history is record-only.",
    images: [
      "3511-riley-st-1.webp",
      "3511-riley-st-2.webp",
      "3511-riley-st-3.webp",
      "3511-riley-st-4.webp",
      "3511-riley-st-5.webp",
      "3511-riley-st-6.webp",
      "3511-riley-st-7.webp",
      "3511-riley-st-8.webp",
    ],
  },
  {
    slug: "2634-shadybrook-dr",
    addr: "2634 Shadybrook Dr",
    city: "Celina, TX",
    builder: "Grand Homes",
    story: "rescue",
    unstaged: 309,
    after: 43,
    result: "Under contract Jun 3, 2026",
    durability: "Durable — cleared the option window",
    subhead:
      "2634 Shadybrook took nine price cuts over 309 days. A buyer came 43 days after modelMatch, no further cut.",
    micro: "PropStream-verified, Celina TX. The cuts are the stuck story, not the cause of the sale.",
    verification: "PropStream day-level",
    clock:
      "309 days and nine price cuts, then under contract 43 days after modelMatch; final price flat since before staging.",
    events: [
      { d: "Listed", t: "On market, Celina TX" },
      { d: "309 days", t: "Nine price cuts, still no buyer", cls: "fail" },
      { d: "Apr 22, 2026", t: "modelMatch staging", cls: "mm" },
      { d: "Jun 3, 2026", t: "Under contract", cls: "end" },
    ],
    disclosure: "Nine prior price cuts (the stuck history); price flat through the staging window.",
    images: [
      "2634-shadybrook-dr-1.webp",
      "2634-shadybrook-dr-2.webp",
      "2634-shadybrook-dr-3.webp",
      "2634-shadybrook-dr-4.webp",
      "2634-shadybrook-dr-5.webp",
      "2634-shadybrook-dr-6.webp",
      "2634-shadybrook-dr-7.webp",
      "2634-shadybrook-dr-8.webp",
    ],
  },
  {
    slug: "10433-wyatts-run-rd",
    addr: "10433 Wyatts Run Rd",
    city: "Fort Worth, TX",
    builder: "Perry Homes",
    story: "fresh",
    after: 11,
    result: "Under contract May 30, 2026",
    durability: "Durable — cleared the option window",
    subhead: "10433 Wyatts Run found a buyer 11 days after modelMatch photos went live.",
    micro: "PropStream-verified, Fort Worth TX. The clock starts at photos-live.",
    verification: "PropStream day-level",
    clock: "modelMatch photos went live May 19, then under contract 11 days later (May 30).",
    events: [
      { d: "May 19, 2026", t: "modelMatch photos go live", cls: "mm" },
      { d: "11 days", t: "Under contract", cls: "end" },
      { d: "~Jun 9, 2026", t: "Cleared the option window" },
    ],
    disclosure: "Pre-photos price history is record-only (a cut 35 days before photos).",
    images: [
      "10433-wyatts-run-rd-1.webp",
      "10433-wyatts-run-rd-2.webp",
      "10433-wyatts-run-rd-3.webp",
      "10433-wyatts-run-rd-4.webp",
      "10433-wyatts-run-rd-5.webp",
      "10433-wyatts-run-rd-6.webp",
      "10433-wyatts-run-rd-7.webp",
      "10433-wyatts-run-rd-8.webp",
    ],
  },
  {
    slug: "511-san-angelo-dr",
    addr: "511 San Angelo Dr",
    city: "Forney, TX",
    builder: "Grand Homes",
    story: "rescue",
    unstaged: 368,
    after: 18,
    result: "Under contract May 4, 2026 (builder site shows Sold)",
    durability: "Durable — cleared the option window",
    subhead: "511 San Angelo held flat for 65 days, then found a buyer 18 days after modelMatch.",
    micro: "PropStream-verified, Forney TX. The cleanest of the original five: no price move during the window.",
    verification: "PropStream day-level",
    clock:
      "368 days, price held flat the final 65 days, then under contract 18 days after modelMatch.",
    events: [
      { d: "Listed", t: "On market, Forney TX" },
      { d: "368 days", t: "65 days price-flat before staging" },
      { d: "Apr 16, 2026", t: "modelMatch staging — only variable changed", cls: "mm" },
      { d: "May 4, 2026", t: "Under contract", cls: "end" },
    ],
    images: [
      "511-san-angelo-dr-1.webp",
      "511-san-angelo-dr-2.webp",
      "511-san-angelo-dr-3.webp",
      "511-san-angelo-dr-4.webp",
      "511-san-angelo-dr-5.webp",
      "511-san-angelo-dr-6.webp",
      "511-san-angelo-dr-7.webp",
    ],
  },
  {
    slug: "104-enclave-dr",
    addr: "104 Enclave Dr",
    city: "Lakewood Village, TX",
    builder: "Perry Homes",
    story: "fresh",
    after: 12,
    afterApprox: true,
    closed: true,
    result: "Sold / closed Jun 17, 2026",
    durability: "Closed — held through the option window",
    subhead:
      "104 Enclave went from modelMatch photos to a closed sale in about 12 days, with the price moving up, not down.",
    micro: "NTREIS-verified, Lakewood Village TX. Newest win, closed June 17.",
    verification: "Day-level NTREIS",
    clock:
      "Photos live June 5, under contract about June 12, then closed June 17. No cut at contract — the last move was a price raise.",
    noCut: true,
    events: [
      { d: "Jun 5, 2026", t: "modelMatch photos go live", cls: "mm" },
      { d: "~Jun 12, 2026", t: "Under contract" },
      { d: "Jun 17, 2026", t: "Sold / closed", cls: "end" },
    ],
    images: [
      "104-enclave-dr-1.webp",
      "104-enclave-dr-2.webp",
      "104-enclave-dr-3.webp",
      "104-enclave-dr-4.webp",
      "104-enclave-dr-5.webp",
      "104-enclave-dr-6.webp",
      "104-enclave-dr-7.webp",
      "104-enclave-dr-8.webp",
    ],
  },
  {
    slug: "215-prairie-clover-way",
    addr: "215 Prairie Clover Way",
    city: "Wylie, TX",
    builder: "Grand Homes",
    story: "rescue",
    unstaged: 193,
    after: 56,
    result: "Under contract Jun 4, 2026",
    durability: "Durable — cleared the option window",
    subhead:
      "215 Prairie Clover sat 193 days. A buyer came 56 days after modelMatch, at a price unchanged since before staging.",
    micro: "PropStream-verified, Wylie TX. Re-opened demand.",
    verification: "PropStream day-level",
    clock:
      "193 days unstaged, then under contract 56 days after modelMatch; price flat since February, before staging.",
    events: [
      { d: "Listed", t: "On market, Wylie TX" },
      { d: "193 days", t: "On market unstaged" },
      { d: "Apr 10, 2026", t: "modelMatch staging", cls: "mm" },
      { d: "Jun 4, 2026", t: "Under contract", cls: "end" },
    ],
    images: [
      "215-prairie-clover-way-1.webp",
      "215-prairie-clover-way-2.webp",
      "215-prairie-clover-way-3.webp",
      "215-prairie-clover-way-4.webp",
      "215-prairie-clover-way-5.webp",
      "215-prairie-clover-way-6.webp",
      "215-prairie-clover-way-7.webp",
      "215-prairie-clover-way-8.webp",
    ],
  },
  {
    slug: "712-country-club-dr",
    addr: "712 Country Club Dr",
    city: "Bloomsburg, PA",
    builder: "Berks Homes",
    story: "fresh",
    after: 15,
    result: "Under contract Jun 3, 2026 — $409,990",
    durability: "Confirming durability",
    subhead: "712 Country Club found a buyer 15 days after modelMatch photos went live.",
    micro: "Portal-verified, Bloomsburg PA. Re-opened demand.",
    verification: "Portal (Zillow / Berks Home Realty)",
    clock:
      "Photos live May 19, then under contract 15 days later (June 3). The one price cut, May 13, was before photos.",
    price: "$409,990",
    events: [
      { d: "May 19, 2026", t: "modelMatch photos go live", cls: "mm" },
      { d: "15 days", t: "Under contract — $409,990", cls: "end" },
    ],
    disclosure: "The one price cut (May 13) was before photos — clean separation.",
    images: [
      "712-country-club-dr-1.webp",
      "712-country-club-dr-2.webp",
      "712-country-club-dr-3.webp",
      "712-country-club-dr-4.webp",
      "712-country-club-dr-5.webp",
      "712-country-club-dr-6.webp",
      "712-country-club-dr-7.webp",
    ],
  },
  {
    slug: "3067-miller-farm-ct",
    addr: "3067 Miller Farm Ct",
    city: "Goochland, VA",
    builder: "Mungo Homes",
    story: "rescue",
    unstaged: 483,
    after: 28,
    result: "Under contract May 14, 2026 — $649,000",
    durability: "Durable",
    subhead:
      "3067 Miller Farm sat 483 days through a dead contract and a withdrawal. A buyer came 28 days after modelMatch.",
    micro: "PropStream-verified, Goochland VA. The longest sit in the library.",
    verification: "PropStream day-level",
    clock:
      "On market since January 2025 — a prior failed contract and a withdrawal, 483 days — then under contract 28 days after modelMatch.",
    price: "$649,000 (list $653,706)",
    events: [
      { d: "Jan 2025", t: "Listed, Goochland VA" },
      { d: "483 days", t: "A failed contract and a withdrawal", cls: "fail" },
      { d: "Apr 2026", t: "modelMatch staging", cls: "mm" },
      { d: "May 14, 2026", t: "Under contract — $649,000", cls: "end" },
    ],
    disclosure: "Prior failed contract and a withdrawal — the stuck story.",
    images: [
      "3067-miller-farm-ct-1.webp",
      "3067-miller-farm-ct-2.webp",
      "3067-miller-farm-ct-3.webp",
      "3067-miller-farm-ct-4.webp",
      "3067-miller-farm-ct-5.webp",
    ],
  },
  {
    slug: "1100-mazzini-rd",
    addr: "1100 Mazzini Rd",
    city: "Paso Robles, CA",
    builder: "K. Hovnanian Homes",
    story: "fresh",
    after: 16,
    closed: true,
    result: "Sold / closed Jun 8, 2026 — $892,991",
    durability: "Closed",
    subhead:
      "After a contract fell through, 1100 Mazzini found a new buyer 16 days after modelMatch, and closed at $892,991.",
    micro: "Portal-verified, Paso Robles CA. We disclose the earlier failed contract.",
    verification: "Portal (Zillow / CRMLS)",
    clock:
      "A January contract collapsed; the home was relisted; modelMatch applied May 4, then under contract 16 days later, then closed June 8 at $892,991.",
    price: "$892,991 (closed)",
    events: [
      { d: "Jan 19, 2026", t: "Prior contract collapsed", cls: "fail" },
      { d: "Relisted", t: "Back on market, Paso Robles CA" },
      { d: "May 4, 2026", t: "modelMatch staging", cls: "mm" },
      { d: "16 days", t: "Under contract" },
      { d: "Jun 8, 2026", t: "Sold / closed — $892,991", cls: "end" },
    ],
    disclosure: "Prior failed contract (January) — disclosed.",
    images: [
      "1100-mazzini-rd-1.webp",
      "1100-mazzini-rd-2.webp",
      "1100-mazzini-rd-3.webp",
      "1100-mazzini-rd-4.webp",
      "1100-mazzini-rd-5.webp",
    ],
  },
  {
    slug: "282-laurel-hike",
    addr: "282 Laurel Hike",
    city: "San Antonio, TX",
    builder: "Beazer Homes",
    story: "rescue",
    unstaged: 196,
    after: 43,
    closed: true,
    result: "Sold May 20, 2026",
    durability: "Closed sale",
    subhead: "282 Laurel Hike sat about 196 days. A buyer showed up roughly 43 days after modelMatch.",
    micro: "Verified, San Antonio TX. Sequence, not cause: modelMatch re-opened demand; we don't claim it sold the home.",
    verification: "Portal / broker (Homes.com / SABOR)",
    clock:
      "Sat about 196 days unstaged, then found a buyer about 43 days after modelMatch entered the marketing process.",
    events: [
      { d: "Listed", t: "On market, San Antonio TX" },
      { d: "~196 days", t: "On market unstaged, no buyer" },
      { d: "Apr 2026", t: "modelMatch enters the marketing process", cls: "mm" },
      { d: "May 20, 2026", t: "Sold", cls: "end" },
    ],
    images: ["282-laurel-hike-1.webp", "282-laurel-hike-2.webp"],
  },
];
