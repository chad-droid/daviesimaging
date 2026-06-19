// ModelMatch Data Library — micro-case studies.
//
// Each entry is one transacted ModelMatch listing with its verified MLS
// timeline plus a selection of virtually staged images. Designed to grow to
// dozens of studies across markets: add objects to CASE_STUDIES and drop the
// matching images into /public/mm-library.
//
// DOM / timeline data is the DIG Proof Library set (data as of June 7, 2026).
// NOTE: the staged images currently attached are builder-matched stand-ins
// from the showcase library (real DIG staging, different address) until each
// project's own finished photos are loaded. Swap `images` per study as the
// real assets arrive.

export type TimelineEvent = {
  /** Date or duration label, e.g. "Sep 23, 2025" or "196 days". */
  d: string;
  /** Event text. May contain a <span> for emphasis (trusted static content). */
  t: string;
  /** "mm" = ModelMatch event, "end" = transaction, "fail" = fell through. */
  cls?: "mm" | "end" | "fail" | "";
};

export type CaseStudy = {
  slug: string;
  addr: string;
  city: string;
  market: string;
  builder: string;
  status: "sold" | "pending";
  statusNote: string;
  /** Days unstaged on market before ModelMatch. */
  unstaged: number;
  /** Days to a buyer / contract after ModelMatch. */
  after: number;
  afterLabel: string;
  listed: string;
  pricePath: string;
  quote: string;
  product: string;
  events: TimelineEvent[];
  criteria: string;
  cohort: string;
  /** Staged image filenames under /public/mm-library. First is the tile preview. */
  images: string[];
};

export const AGGREGATE = {
  unstaged: 285,
  after: 35,
  line: "Five homes. Four metros. $400K to $1.1M. Every ModelMatch listing that has transacted since launch, no omissions.",
  cap: "No transacted home took longer than 56 days after staging.",
  disclaimer:
    "MLS histories pulled June 2026 · Sequence, not causation · Texas non-disclosure: claims ride on days, not price.",
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "282-laurel-hike",
    addr: "282 Laurel Hike",
    city: "San Antonio, TX",
    market: "San Antonio",
    builder: "Beazer Homes",
    status: "sold",
    statusNote: "Sold · the only one already closed",
    unstaged: 196,
    after: 43,
    afterLabel: "days to a buyer after ModelMatch",
    listed: "Listed Sep 23, 2025 · $399,999",
    pricePath: "196 days unstaged · no buyer",
    quote: "Six and a half months of silence. A buyer 43 days after staging.",
    product: "ModelMatch + Cinematic",
    events: [
      { d: "Sep 23, 2025", t: "Listed — <span>$399,999</span>" },
      { d: "196 days", t: "On market unstaged, no buyer", cls: "" },
      { d: "Apr 7, 2026", t: "ModelMatch staging", cls: "mm" },
      { d: "May 20, 2026", t: "SOLD", cls: "end" },
    ],
    criteria:
      "Comp pull is a broker item, the street is too new for PropStream's index. Subject dates portal-sourced; broker verification open.",
    cohort: "Texas is a non-disclosure state, this claim rides on days, not dollars.",
    images: [
      "282-laurel-hike-1.jpg",
      "282-laurel-hike-2.jpg",
      "282-laurel-hike-3.jpg",
      "282-laurel-hike-4.jpg",
      "282-laurel-hike-5.jpg",
      "282-laurel-hike-6.jpg",
    ],
  },
  {
    slug: "3737-selborne-dr",
    addr: "3737 Selborne Dr",
    city: "Rockwall, TX",
    market: "Dallas–Fort Worth",
    builder: "Grand Homes",
    status: "pending",
    statusNote: "Pending · verified to the day",
    unstaged: 357,
    after: 14,
    afterLabel: "days to contract after ModelMatch",
    listed: "Listed Apr 21, 2025 · $854,319",
    pricePath: "≈10 price cuts → $599,865",
    quote: "Two buyers walked before staging. None after.",
    product: "ModelMatch + Cinematic",
    events: [
      { d: "Apr 21, 2025", t: "Listed — <span>$854,319, ~10 cuts to $599,865</span>" },
      { d: "Nov 14, 2025", t: "Contract fell through", cls: "fail" },
      { d: "Jan 20, 2026", t: "Second contract fell through", cls: "fail" },
      { d: "Apr 13, 2026", t: "ModelMatch staging", cls: "mm" },
      { d: "Apr 27, 2026", t: "PENDING", cls: "end" },
    ],
    criteria:
      "Comp pull: 14 returned · 1 qualified · under the 3-comp floor → no comparison claim. The final price cut landed 14 days before staging; price shares the credit here.",
    cohort:
      "Same-window neighbors that sold unstaged took 157–272 days. At any price, the spring-2025 vintage took 130–440.",
    images: [
      "3737-selborne-dr-1.jpg",
      "3737-selborne-dr-2.jpg",
      "3737-selborne-dr-3.jpg",
      "3737-selborne-dr-4.jpg",
      "3737-selborne-dr-5.jpg",
      "3737-selborne-dr-6.jpg",
    ],
  },
  {
    slug: "511-san-angelo-dr",
    addr: "511 San Angelo Dr",
    city: "Forney, TX",
    market: "Dallas–Fort Worth",
    builder: "Grand Homes",
    status: "pending",
    statusNote: "Pending · cleanest attribution",
    unstaged: 368,
    after: 18,
    afterLabel: "days to contract after ModelMatch",
    listed: "Listed Apr 13, 2025 · $671,273",
    pricePath: "stepped → $644,273 · last move Feb 10",
    quote: "83 days of nothing. One change. 18 days.",
    product: "ModelMatch",
    events: [
      { d: "Apr 13, 2025", t: "Listed — <span>$671,273, stepped to $644,273</span>" },
      { d: "Feb 10, 2026", t: "Last price move, then 83 days of nothing", cls: "" },
      { d: "Apr 16, 2026", t: "ModelMatch staging, only variable changed", cls: "mm" },
      { d: "May 4, 2026", t: "PENDING", cls: "end" },
    ],
    criteria:
      "Comp pull: 7 returned · 1 qualified · under floor → no comparison claim. The one qualifier sits directly across the street: 305 days on market, unstaged.",
    cohort:
      "In-window neighbors at lower price points needed 183–344 days unstaged. The cleanest attribution of the five, no price change in the final 83 days.",
    images: [
      "511-san-angelo-dr-1.jpg",
      "511-san-angelo-dr-2.jpg",
      "511-san-angelo-dr-3.jpg",
      "511-san-angelo-dr-4.jpg",
      "511-san-angelo-dr-5.jpg",
    ],
  },
  {
    slug: "215-prairie-clover-way",
    addr: "215 Prairie Clover Way",
    city: "Wylie, TX",
    market: "Dallas–Fort Worth",
    builder: "Grand Homes",
    status: "pending",
    statusNote: "Pending · portal-dated",
    unstaged: 193,
    after: 56,
    afterLabel: "days to contract after ModelMatch",
    listed: "Listed Sep 29, 2025 · $914,252",
    pricePath: "cuts → $818,557 · last cut 63 days pre-staging",
    quote: "The honest page. The comp that outran us is on it.",
    product: "ModelMatch",
    events: [
      { d: "Sep 29, 2025", t: "Listed — <span>$914,252, cut to $818,557</span>" },
      { d: "~Feb 6, 2026", t: "Last price cut, 63 days before staging", cls: "" },
      { d: "Apr 10, 2026", t: "ModelMatch staging", cls: "mm" },
      { d: "Jun 5, 2026", t: "PENDING", cls: "end" },
    ],
    criteria:
      "Comp pull: 5 returned · 1 qualified · under floor → no comparison claim. The qualifier sold in 58 days unstaged, faster than our subject. It's printed anyway.",
    cohort:
      "Fresh 2026 listings nearby now pend in 31–86 days, the market warmed this spring. Logged against us.",
    images: [
      "215-prairie-clover-way-1.jpg",
      "215-prairie-clover-way-2.jpg",
      "215-prairie-clover-way-3.jpg",
      "215-prairie-clover-way-4.jpg",
      "215-prairie-clover-way-5.jpg",
      "215-prairie-clover-way-6.jpg",
    ],
  },
  {
    slug: "2634-shadybrook-dr",
    addr: "2634 Shadybrook Dr",
    city: "Prosper, TX",
    market: "Dallas–Fort Worth",
    builder: "Grand Homes",
    status: "pending",
    statusNote: "Pending · portal-dated",
    unstaged: 309,
    after: 43,
    afterLabel: "days to contract after ModelMatch",
    listed: "Listed Jun 17, 2025 · $1,148,647",
    pricePath: "nine cuts → $998,647",
    quote: "Nine price cuts couldn't move it. One staging did, in six weeks.",
    product: "ModelMatch",
    events: [
      { d: "Jun 17, 2025", t: "Listed — <span>$1,148,647 · nine cuts to $998,647</span>" },
      { d: "309 days", t: "On market unstaged", cls: "" },
      { d: "Apr 22, 2026", t: "ModelMatch staging", cls: "mm" },
      { d: "~Jun 4, 2026", t: "PENDING", cls: "end" },
    ],
    criteria:
      "Comp pull: 15 returned · 0 qualified · empty box → no comparison claim. Filters were not loosened.",
    cohort:
      "The $900K+ vintage listed early-to-mid 2025 took 130–240 days unstaged. Even the million-dollar cohort was frozen.",
    images: [
      "2634-shadybrook-dr-1.jpg",
      "2634-shadybrook-dr-2.jpg",
      "2634-shadybrook-dr-3.jpg",
      "2634-shadybrook-dr-4.jpg",
      "2634-shadybrook-dr-5.jpg",
    ],
  },
];
