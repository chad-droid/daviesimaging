import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// Generates /robots.txt at build time.
//
// AI crawlers are explicitly allowed: DIG wants blog content surfaced in
// ChatGPT, Claude, Perplexity, and Google AI Overviews. Several of these bots
// (Google-Extended, Applebot-Extended) only control AI training/grounding and
// have no effect on normal search ranking, so allowing them is additive.
//
// NOTE: robots.txt is advisory only. Vercel's Bot Management / firewall can
// block these crawlers at the edge regardless of what this file says — check
// the Vercel project settings if AI crawlers are not reaching the site.

// Paths that should never be crawled. Password-gated routes (401) are omitted
// on purpose: listing them here would advertise them in a public file.
const PRIVATE_PATHS = [
  "/admin",
  "/admin/",
  "/api/",
  "/studio",
  "/studio/",
  "/modelmatch-demo",
  "/modelmatch-demo/",
];

// Crawlers that feed AI answer engines and assistants.
const AI_CRAWLERS = [
  "GPTBot", // OpenAI — training + ChatGPT grounding
  "OAI-SearchBot", // OpenAI — ChatGPT Search index
  "ChatGPT-User", // OpenAI — user-initiated page fetches
  "ClaudeBot", // Anthropic — crawling
  "Claude-User", // Anthropic — user-initiated page fetches
  "Claude-SearchBot", // Anthropic — search indexing
  "anthropic-ai",
  "PerplexityBot", // Perplexity — index
  "Perplexity-User", // Perplexity — user-initiated fetches
  "Google-Extended", // Gemini + AI Overviews grounding
  "Applebot-Extended", // Apple Intelligence
  "Amazonbot",
  "Meta-ExternalAgent",
  "DuckAssistBot",
  "cohere-ai",
  "CCBot", // Common Crawl — feeds many downstream models
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: PRIVATE_PATHS,
      },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: PRIVATE_PATHS,
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
