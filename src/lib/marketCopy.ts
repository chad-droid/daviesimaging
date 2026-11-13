// Wording for the market pages at /markets/{slug}.
//
// All 27 pages are built from one component, so without this they read almost
// word for word alike. Each line below has a few phrasings that say the same
// thing, and a market picks one by its slug, so the choice never changes
// between builds and neighbouring pages differ. Nothing here adds a claim: a
// variant may only reword what the first one says.
//
// This is a bridge. What makes a market page rank is content only that market
// has: photos shot there, builder and community names, a local testimonial.
import { inName, marketsInRegion, type Market } from "@/lib/markets";
import { TESTIMONIALS, type Testimonial } from "@/data/testimonials";

/** "A, B and C" */
export const list = (xs: string[]) =>
  xs.length < 2 ? xs.join("") : `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`;

/** Stable number from a string, so a market always gets the same pick. */
function hash(s: string) {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
  return h;
}

/** Pick one option for this market. `key` keeps the lines independent of each other. */
function pick<T>(m: Market, key: string, options: T[]): T {
  return options[hash(`${m.slug}:${key}`) % options.length];
}

export interface MarketFaq {
  q: string;
  a: string;
}

/** Questions a builder in this market asks. Also emitted as FAQ schema. */
export function marketFaqs(m: Market): MarketFaq[] {
  const place = inName(m);
  const areas = list(m.areas);
  return [
    pick<MarketFaq>(m, "faq-coverage", [
      {
        q: `Does DIG photograph new homes in ${place}?`,
        a: `Yes. ${m.name} is one of the 27 U.S. markets DIG shoots in, covering ${areas} and the communities around them.`,
      },
      {
        q: `Is ${m.name} one of DIG's markets?`,
        a: `Yes. We shoot in ${areas} and the communities nearby. ${m.name} is one of 27 U.S. markets DIG covers.`,
      },
      {
        q: `Do you work with home builders in ${place}?`,
        a: `Yes. DIG photographers work across ${areas}, and ${m.name} is one of our 27 U.S. markets.`,
      },
    ]),
    pick<MarketFaq>(m, "faq-services", [
      {
        q: `Which services can I order in ${m.name}?`,
        a: `All of them. Model home, amenity and lifestyle photography, Premium Video, Listing Photography and Spec+ are shot on site in ${place}. ModelMatch, PlanMatch, Moments, FrameFlow, CineFlow and ActFlow are made from your photos or plans, so they need no shoot at all.`,
      },
      {
        q: `What can DIG do for my communities in ${place}?`,
        a: `On site in ${place}, we shoot model home, amenity and lifestyle photography, Premium Video, Listing Photography and Spec+. ModelMatch, PlanMatch, Moments, FrameFlow, CineFlow and ActFlow are made from your photos or plans, so they need no shoot at all.`,
      },
      {
        q: `Is every DIG service available in ${place}?`,
        a: `Yes. Photography and video are shot on site in ${place}: model homes, amenities, lifestyle, Premium Video, listings and Spec+. ModelMatch, PlanMatch, Moments, FrameFlow, CineFlow and ActFlow are produced from your photos or plans, with no shoot needed.`,
      },
    ]),
    pick<MarketFaq>(m, "faq-speed", [
      {
        q: `How fast can a spec home in ${m.name} be photographed and listed?`,
        a: "A Spec+ order is 25 listing photos, 8 ModelMatch staged images and 1 FrameFlow video, delivered together within 72 hours of the shoot.",
      },
      {
        q: `What is the turnaround on a Spec+ order in ${m.name}?`,
        a: "Within 72 hours of the shoot you get all of it together: 25 listing photos, 8 ModelMatch staged images and 1 FrameFlow video.",
      },
      {
        q: `How quickly will my ${m.name} spec home be ready to list?`,
        a: "Spec+ is delivered within 72 hours of the shoot. One order includes 25 listing photos, 8 ModelMatch staged images and 1 FrameFlow video.",
      },
    ]),
    pick<MarketFaq>(m, "faq-booking", [
      {
        q: `How do I book a shoot in ${m.name}?`,
        a: "Order in digDesk. Give us the address, the homesite details and any access instructions, and we coordinate with your sales team. You do not need to be on site.",
      },
      {
        q: `How do I order photography in ${place}?`,
        a: "Through digDesk. Enter the address, the homesite details and any access instructions, and we schedule with your sales team. You do not need to be on site.",
      },
      {
        q: `What do you need from me to schedule a ${m.name} shoot?`,
        a: "The address, the homesite details and any access instructions, entered in digDesk. We coordinate with your sales team from there, and you do not need to be on site.",
      },
    ]),
  ];
}

/** Every market-specific line on the page. Headlines may carry <strong>. */
export function marketCopy(m: Market) {
  const place = inName(m);
  const areas = list(m.areas);
  const first3 = list(m.areas.slice(0, 3));

  // Up to three other markets in the same region, starting at a different
  // point for each market so the links differ from page to page.
  const others = marketsInRegion(m.region).filter((o) => o.slug !== m.slug);
  const start = others.length ? hash(m.slug) % others.length : 0;
  const neighbors = others.slice(start).concat(others.slice(0, start)).slice(0, 3);

  return {
    heroSubhead: pick(m, "hero", [
      `Model homes, spec homes and amenities, photographed, staged and filmed for home builders across ${first3}.`,
      `Photography, virtual staging and video for your new home communities in ${first3}.`,
      `Your model homes, spec homes and amenities in ${first3}, photographed, staged and filmed by one team.`,
      `Model home photography, listing photography, virtual staging and video for home builders in ${first3}.`,
    ]),
    coverageHeadline: pick(m, "coverage-h", [
      `Where we shoot in <strong>${place}</strong>.`,
      `Our coverage in <strong>${place}</strong>.`,
      `The communities we photograph in <strong>${place}</strong>.`,
    ]),
    coverageBody: pick(m, "coverage", [
      `Our photographers work new home communities in ${areas}, and the neighborhoods between them. You get the same process and the same delivery standard here as in every other DIG market.`,
      `You can book DIG for communities in ${areas} and the areas around them. The process and the delivery times are the same ones we hold in all 27 markets.`,
      `DIG shoots model homes, spec homes and amenities throughout ${areas}. Your ${m.name} communities get the same process and the same delivery standard as every other market we serve.`,
      `If you build in ${areas}, or anywhere nearby, we can photograph it. What you receive in ${m.name} matches what our builders receive in every other DIG market.`,
    ]),
    officeBody: pick(m, "office", [
      `DIG has an office in ${m.city}, so your account team and your photographers are in the same market you build in.`,
      `${m.city} is home to a DIG office. Your account team and your photographers work in the market you build in.`,
    ]),
    neighbors,
    leadBody: pick(m, "lead", [
      `Before your ${m.name} communities are ever built, you can have photorealistic photographs and video of every plan, modeled or not, so your prospects understand the neighborhood you are bringing into their lives.`,
      `Your next community in ${place} can be marketed before it exists. You get photorealistic images and video of every plan, whether or not you model it.`,
      `Pre-selling in ${place}? Every plan can have photorealistic images and video before the first home is built, including the plans you never model.`,
      `Long before a model opens in ${place}, your prospects can see every plan in photorealistic images and video, so they understand the neighborhood you are building.`,
    ]),
    launchBody: pick(m, "launch", [
      `When your model homes open in ${place}, you get highly trained photographers and the best model home photography, video and Matterport available to the industry.`,
      `Opening a model park in ${place}? You get highly trained photographers, plus model home video and Matterport, from one team.`,
      `Your ${m.name} model homes are a big investment. When they open, you get the best model home photography, video and Matterport available to the industry.`,
      `When a new model opens in ${place}, the shoot is planned in advance with your sales and construction teams, and you get photography, video and Matterport from highly trained photographers.`,
    ]),
    listBody: pick(m, "list", [
      `Once you are ready to sell, every spec home in ${place} can be listed looking its absolute best, while your team focuses on marketing rather than coordination and retouching.`,
      `Your spec homes in ${place} can go to market with listing photography, ModelMatch staging and a FrameFlow video, all from one order.`,
      `When a spec home in ${place} is ready to sell, one order gets you photos, staged images and a video, and your team stays out of coordination and retouching.`,
      `Standing inventory in ${place}? Each home can be photographed, staged and given a video, so it is listed looking its absolute best.`,
    ]),
    premiumBody: pick(m, "premium", [
      `You get the best model home photography, video, and Matterport services available to the industry, in ${place} and 25 other markets across the United States.`,
      `In ${place}, as in all 27 DIG markets, you get the best model home photography, video, and Matterport services available to the industry.`,
      `You get the best model home photography, video, and Matterport services available to the industry, from photographers who work in ${place}.`,
    ]),
    modelMatchBody: pick(m, "modelmatch", [
      `Your model home merchandising becomes bespoke furniture and accessory galleries you can reuse across your vacant inventory in ${place}.`,
      `The merchandising in your ${m.name} model homes becomes bespoke furniture and accessory galleries you can reuse across your vacant inventory.`,
      `Your ${m.name} models are already merchandised. That design becomes bespoke furniture and accessory galleries for every vacant home you list.`,
    ]),
    faqHeadline: pick(m, "faq-h", [
      `Working with DIG in <strong>${place}</strong>.`,
      `Questions from builders in <strong>${place}</strong>.`,
      `What builders in <strong>${place}</strong> ask us.`,
    ]),
    directoryHeadline: pick(m, "directory-h", [
      `The same quality in <strong>27 markets</strong>.`,
      `${m.name} is one of <strong>27 markets</strong>.`,
      `Building somewhere else too? We shoot in <strong>27 markets</strong>.`,
    ]),
  };
}

/**
 * Four customer quotes for this market, each from a different person: the
 * first leads, the other three sit beneath it. The quotes themselves are never
 * reworded; only which ones a page shows changes.
 */
export function marketTestimonialIds(m: Market): { lead: string; rest: string[] } {
  const byPerson = new Map<string, Testimonial[]>();
  for (const t of TESTIMONIALS) {
    if (!t.approved) continue;
    byPerson.set(t.name, [...(byPerson.get(t.name) ?? []), t]);
  }
  const people = [...byPerson.values()];
  const h = hash(`${m.slug}:proof`);
  const chosen = Array.from({ length: Math.min(4, people.length) }, (_, i) => {
    const quotes = people[(h + i) % people.length];
    return quotes[(h + i) % quotes.length];
  });
  // The lead is set in large type, so give that spot to the shortest quote.
  const lead = chosen.reduce((a, b) => (b.quote.length < a.quote.length ? b : a));
  return { lead: lead.id, rest: chosen.filter((t) => t !== lead).map((t) => t.id) };
}
