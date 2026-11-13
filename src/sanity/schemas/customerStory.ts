import { defineArrayMember, defineField, defineType } from "sanity";
// Relative import on purpose: the Sanity CLI builds with Vite, which does not
// know the "@/" alias.
import { markets } from "../../lib/markets";

/** What a story or a single quote is about. Pages pull quotes by these. */
const TOPICS = [
  { title: "Spec+", value: "spec-plus" },
  { title: "ModelMatch", value: "modelmatch" },
  { title: "PlanMatch", value: "planmatch" },
  { title: "Moments", value: "moments" },
  { title: "FrameFlow", value: "frameflow" },
  { title: "CineFlow", value: "cineflow" },
  { title: "ActFlow", value: "actflow" },
  { title: "Listing Photography", value: "listing" },
  { title: "Premium Photography", value: "premium" },
  { title: "Premium Video", value: "video" },
  { title: "digDesk", value: "digdesk" },
  { title: "Markets and coverage", value: "markets" },
  { title: "Partnership and service", value: "partnership" },
  { title: "Cost", value: "cost" },
  { title: "Switching to DIG", value: "switching" },
];

/**
 * One customer and their interview: who they are, the video, the questions
 * and answers, and the pull quotes pages may show. Nothing appears on the
 * site until "Approved for the site" is switched on.
 */
export const customerStory = defineType({
  name: "customerStory",
  title: "Customer Story",
  type: "document",
  groups: [
    { name: "person", title: "Person", default: true },
    { name: "story", title: "Story" },
    { name: "video", title: "Video" },
    { name: "interview", title: "Interview" },
    { name: "quotes", title: "Pull quotes" },
  ],
  fields: [
    defineField({
      name: "approved",
      title: "Approved for the site",
      type: "boolean",
      group: "person",
      initialValue: false,
      description: "Leave off until the customer has approved their words. Off means the story and its quotes show nowhere.",
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      group: "person",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "person",
      options: { source: (doc) => `${doc.name ?? ""} ${doc.company ?? ""}`, maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "jobTitle",
      title: "Job title",
      type: "string",
      group: "person",
      description: "Leave empty if it has not been confirmed.",
    }),
    defineField({
      name: "company",
      title: "Builder",
      type: "string",
      group: "person",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "headshot",
      title: "Headshot",
      type: "image",
      group: "person",
      options: { hotspot: true },
    }),
    defineField({
      name: "companyLogo",
      title: "Builder logo",
      type: "image",
      group: "person",
    }),
    defineField({
      name: "market",
      title: "Market",
      type: "string",
      group: "person",
      description: "The DIG market this customer builds in. Their quotes can then appear on that market page.",
      options: { list: markets.map((m) => ({ title: `${m.name}, ${m.state}`, value: m.slug })) },
    }),
    defineField({
      name: "topics",
      title: "Services and topics",
      type: "array",
      group: "person",
      of: [defineArrayMember({ type: "string" })],
      options: { list: TOPICS },
      description: "Everything this customer uses or talks about.",
    }),

    defineField({
      name: "headline",
      title: "Story headline",
      type: "string",
      group: "story",
      description: "One line for the story page and cards, in plain words.",
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      group: "story",
      description: "Two or three sentences: who they are, what they needed, what changed. Also used as the search description.",
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      group: "story",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
    }),
    defineField({
      name: "interviewDate",
      title: "Interview date",
      type: "date",
      group: "story",
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      group: "story",
      description: "Sets the order stories appear in.",
    }),

    defineField({
      name: "video",
      title: "Video",
      type: "object",
      group: "video",
      fields: [
        defineField({
          name: "youtubeId",
          title: "YouTube video ID",
          type: "string",
          description: "The part after v= in the YouTube address, for example dQw4w9WgXcQ.",
          validation: (rule) =>
            rule.regex(/^[A-Za-z0-9_-]{11}$/, { name: "YouTube ID" }).warning("A YouTube ID is 11 characters."),
        }),
        defineField({ name: "poster", title: "Poster image", type: "image", options: { hotspot: true } }),
        defineField({ name: "duration", title: "Length", type: "string", description: "For example 2:14." }),
        defineField({
          name: "shortCuts",
          title: "Short cuts",
          type: "array",
          description: "Shorter clips cut from the interview, for service and market pages.",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                { name: "label", type: "string", title: "Label" },
                { name: "youtubeId", type: "string", title: "YouTube video ID" },
                { name: "topics", type: "array", title: "Topics", of: [{ type: "string" }], options: { list: TOPICS } },
              ],
              preview: { select: { title: "label", subtitle: "youtubeId" } },
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: "interview",
      title: "Interview questions and answers",
      type: "array",
      group: "interview",
      description: "In the order they should read on the story page. Answers are the customer's own words.",
      of: [
        defineArrayMember({
          type: "object",
          name: "qa",
          title: "Question and answer",
          fields: [
            defineField({
              name: "question",
              title: "Question",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "answer",
              title: "Answer",
              type: "text",
              rows: 6,
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "timestamp",
              title: "Video timestamp",
              type: "string",
              description: "Optional. Where this answer starts in the video, for example 1:05.",
            }),
          ],
          preview: { select: { title: "question", subtitle: "answer" } },
        }),
      ],
    }),

    defineField({
      name: "quotes",
      title: "Pull quotes",
      type: "array",
      group: "quotes",
      description:
        "Short excerpts pages may show. Each must be one unbroken passage from the interview, word for word. Do not reword, splice or extend.",
      of: [
        defineArrayMember({
          type: "object",
          name: "pullQuote",
          title: "Pull quote",
          fields: [
            defineField({
              name: "quoteId",
              title: "Quote ID",
              type: "slug",
              description: "A short stable name pages use to ask for this quote, for example kim-skeptic.",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "quote",
              title: "Quote",
              type: "text",
              rows: 4,
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "emphasis",
              title: "Phrase to set in bold",
              type: "string",
              description: "Optional. Must match a phrase inside the quote exactly.",
              validation: (rule) =>
                rule.custom((value, context) => {
                  const quote = (context.parent as { quote?: string } | undefined)?.quote ?? "";
                  return !value || quote.includes(value) ? true : "This phrase is not in the quote.";
                }),
            }),
            defineField({
              name: "topics",
              title: "Topics",
              type: "array",
              of: [defineArrayMember({ type: "string" })],
              options: { list: TOPICS },
            }),
            defineField({
              name: "hold",
              title: "Hold back",
              type: "boolean",
              initialValue: false,
              description: "Keeps this one quote off the site while the rest of the story stays live.",
            }),
          ],
          preview: {
            select: { title: "quote", subtitle: "quoteId.current", hold: "hold" },
            prepare: ({ title, subtitle, hold }) => ({ title, subtitle: `${hold ? "HELD · " : ""}${subtitle ?? ""}` }),
          },
        }),
      ],
    }),
  ],
  orderings: [
    { title: "Published, newest", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] },
    { title: "Builder A to Z", name: "companyAsc", by: [{ field: "company", direction: "asc" }] },
  ],
  preview: {
    select: { name: "name", company: "company", approved: "approved", media: "headshot" },
    prepare: ({ name, company, approved, media }) => ({
      title: name,
      subtitle: `${company ?? ""}${approved ? "" : " · not approved"}`,
      media,
    }),
  },
});
