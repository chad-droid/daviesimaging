/**
 * Customer testimonials: the single source every page quotes from.
 *
 * Each quote is a contiguous excerpt from a recorded customer interview
 * (Builder Photo customer stories, Nov 2026), cleaned up for reading only.
 * Do not reword, splice or extend a quote here. To use a different line, add
 * a new entry taken verbatim from the approved post.
 *
 * `approved: false` keeps an entry out of every page without deleting it.
 * `video` is reserved for the short testimonial cuts (YouTube id or a
 * self-hosted file) once they exist.
 */
export type TestimonialTopic =
  | "spec-plus"
  | "modelmatch"
  | "listing"
  | "premium"
  | "video"
  | "digdesk"
  | "markets"
  | "partnership"
  | "cost"
  | "switching";

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  /** Job title. Omitted where it has not been confirmed. */
  title?: string;
  company: string;
  topics: TestimonialTopic[];
  approved: boolean;
  video?: { youtubeId?: string; src?: string; poster?: string };
}

const PEOPLE = {
  alexandra: { name: "Alexandra Cormack", title: "Marketing Manager", company: "Coventry Homes" },
  jordan: { name: "Jordan Brown", title: "Director of Sales and Marketing", company: "Graham Hart Home Builder" },
  kim: { name: "Kim Swan", title: "VP of Operational Marketing and Creative", company: "Perry Homes" },
  angela: { name: "Angela Kissling", title: "Marketing Manager", company: "Bloomfield Homes" },
  bradley: { name: "Bradley Davis", title: "Marketing Director", company: "Woodbridge Pacific Group" },
  carrie: { name: "Carrie Davis", company: "Ladera Living" },
  linnea: { name: "Linnea Chapman", title: "Corporate VP of Marketing", company: "TrueMark Homes" },
} as const;

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "kim-skeptic",
    ...PEOPLE.kim,
    quote:
      "Can this really be done? Is it really as easy as they say it's going to be? And can it really look as good as they portray that it can be? And it's all the above. It really has been a great experience.",
    topics: ["switching", "partnership"],
    approved: true,
  },
  {
    id: "kim-modelmatch",
    ...PEOPLE.kim,
    quote:
      "They've actually taken the furniture and decor from our model homes and built a library they use when virtually staging our inventory homes. So instead of using generic furniture or guessing what our style should look like, they're using furnishings that reflect what our buyers actually see when they walk into one of our models.",
    topics: ["modelmatch"],
    approved: true,
  },
  {
    id: "kim-one-partner",
    ...PEOPLE.kim,
    quote:
      "One of the biggest differences is having so many services handled by one partner, rather than our team having to manage multiple steps in the process. DIG takes ownership of those deliverables.",
    topics: ["partnership", "switching"],
    approved: true,
  },
  {
    id: "kim-markets",
    ...PEOPLE.kim,
    quote: "That's why I'm so happy that we have introduced DIG to other markets in other states.",
    topics: ["markets"],
    approved: true,
  },
  {
    id: "jordan-easy",
    ...PEOPLE.jordan,
    quote:
      "The level of customer service, there's no comparison. It's just the easy button when it comes to communication.",
    topics: ["spec-plus", "partnership"],
    approved: true,
  },
  {
    id: "jordan-cost",
    ...PEOPLE.jordan,
    quote:
      "Yes, it's an expenditure on the front end, but you definitely see the results on the back end when it comes to sales and also feedback from your prospects in the field.",
    topics: ["cost", "spec-plus"],
    approved: true,
  },
  {
    id: "bradley-resale",
    ...PEOPLE.bradley,
    quote:
      "You have to think you're competing against a resale agent who maybe has one or two listings, and that's it. And they are going to put all of their resources and all of their focus into making sure that their one or two homes are going to be amazing and have as much content as possible. That's what we're competing against.",
    topics: ["listing"],
    approved: true,
  },
  {
    id: "bradley-portal",
    ...PEOPLE.bradley,
    quote:
      "The process of ordering the photography could not be easier. The online portal is amazing. It allows us to really pick and choose what we need for each home or each neighborhood, as well as add or subtract services.",
    topics: ["digdesk"],
    approved: true,
  },
  {
    id: "angela-hooked",
    ...PEOPLE.angela,
    quote:
      "I'd say try it once and you'll be hooked. You'll want to spend the extra money. It's worth the extra money. You're really getting what you pay for.",
    topics: ["premium", "cost"],
    approved: true,
  },
  {
    id: "alexandra-partner",
    ...PEOPLE.alexandra,
    quote:
      "They feel more like a partner than just a photography vendor. They understand our business, our expectations, and how important these assets are to our marketing team.",
    topics: ["premium", "partnership"],
    approved: true,
  },
  {
    id: "alexandra-micromanage",
    ...PEOPLE.alexandra,
    quote:
      "As marketers, we're juggling a million projects at once, and it's really important to work with a photographer that understands that. And we're not having to micromanage the photography process.",
    topics: ["partnership"],
    approved: true,
  },
  {
    id: "carrie-videos",
    ...PEOPLE.carrie,
    quote:
      "The sales team and the sales managers really love the videography and the FrameFlow videos and all the things that we get. If we have a house that doesn't have it yet, they're like, when are we going to get the video? When do the videos come?",
    topics: ["video"],
    approved: true,
  },
  {
    id: "carrie-staging",
    ...PEOPLE.carrie,
    quote:
      "I love the virtual staging. I think it's actually the best virtual staging that we've done, and we've used everything from AI to other companies who will remain nameless.",
    topics: ["modelmatch"],
    approved: true,
  },
  {
    id: "carrie-portal",
    ...PEOPLE.carrie,
    quote:
      "There's the portal. I just let them know what we need, and they get into the portal, order what we want, and get it coordinated and on our schedule.",
    topics: ["digdesk"],
    approved: true,
  },
  {
    id: "linnea-reach",
    ...PEOPLE.linnea,
    quote:
      "I think the reach you guys have is incredible. I'm always amazed with how quick you guys are able to get to markets that we need photography done in. And your turnaround is very, very quick.",
    topics: ["markets"],
    approved: true,
  },
  {
    id: "linnea-onsite",
    ...PEOPLE.linnea,
    quote:
      "The fact that my team doesn't need to be out on site, and the streamlining of communication, it just allows us to move so much faster.",
    topics: ["partnership", "markets"],
    approved: true,
  },
];

/** Approved testimonials by id, in the order asked for. Unknown or unapproved ids are dropped. */
export function getTestimonials(ids: string[]): Testimonial[] {
  return ids
    .map((id) => TESTIMONIALS.find((t) => t.id === id))
    .filter((t): t is Testimonial => !!t && t.approved);
}

/** "Name, Title, Company" for components that take a single attribution line. */
export function attributionLine(t: Testimonial): string {
  return [t.name, t.title, t.company].filter(Boolean).join(", ");
}
