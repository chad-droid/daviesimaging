import { defineField, defineType } from "sanity";
import { youTubeId } from "../youtube";

// Body blocks for blog posts. Both are optional additions to the `post` body
// array, so existing documents are unaffected.

export const beforeAfter = defineType({
  name: "beforeAfter",
  title: "Before / After Slider",
  type: "object",
  fields: [
    defineField({
      name: "before",
      title: "Before image",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "after",
      title: "After image",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "beforeLabel",
      title: "Before label",
      type: "string",
      initialValue: "Empty",
    }),
    defineField({
      name: "afterLabel",
      title: "After label",
      type: "string",
      initialValue: "Staged with ModelMatch",
    }),
    defineField({
      name: "alt",
      title: "Alt text",
      type: "string",
      description: "Describes the room. Screen readers hear it with the before and after labels.",
    }),
    defineField({ name: "caption", title: "Caption", type: "string" }),
  ],
  preview: {
    select: { media: "after", caption: "caption", alt: "alt" },
    prepare: ({ media, caption, alt }) => ({
      title: caption || alt || "Before / After",
      subtitle: "Before / After slider",
      media,
    }),
  },
});

export const youtube = defineType({
  name: "youtube",
  title: "YouTube Video",
  type: "object",
  fields: [
    defineField({
      name: "url",
      title: "YouTube URL",
      type: "url",
      description: "youtube.com/watch?v=, youtu.be/ or /shorts/ links all work.",
      validation: (rule) =>
        rule.required().custom((value) =>
          !value || youTubeId(value) ? true : "That doesn't look like a YouTube video link.",
        ),
    }),
    defineField({ name: "caption", title: "Caption", type: "string" }),
    defineField({
      name: "start",
      title: "Start at (seconds)",
      type: "number",
      validation: (rule) => rule.min(0).integer(),
    }),
  ],
  preview: {
    select: { url: "url", caption: "caption" },
    prepare: ({ url, caption }) => {
      const id = url ? youTubeId(url) : null;
      return {
        title: caption || url || "YouTube video",
        subtitle: "YouTube",
        imageUrl: id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : undefined,
      };
    },
  },
});
