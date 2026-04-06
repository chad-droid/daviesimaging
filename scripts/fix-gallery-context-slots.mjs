// fix-gallery-context-slots.mjs
// Updates the 4 gallery context section slots to have correct eyebrow + body content.
// Run once: node scripts/fix-gallery-context-slots.mjs

import { neon } from "@neondatabase/serverless";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read DATABASE_URL from .env.local
const envPath = join(__dirname, "../.env.local");
const envContent = readFileSync(envPath, "utf-8");
const dbUrlMatch = envContent.match(/DATABASE_URL="([^"]+)"/);
if (!dbUrlMatch) throw new Error("DATABASE_URL not found in .env.local");
const DATABASE_URL = dbUrlMatch[1];

const sql = neon(DATABASE_URL);

const slots = [
  {
    slotId: "gallery-listings-context",
    content: {
      eyebrow: "Spec+ Output",
      headline: "What a <strong>Spec+ delivery</strong> looks like.",
      body: "Every image and video in this gallery came from a Spec+ order: listing photography, virtually staged interiors, and a digital video walkthrough, all delivered in one package within 72 hours of the shoot.<br><br>The virtual staging uses ModelMatch, which means the furniture and finishes are pulled from your builder's own model home photography. Every staged room looks like it belongs to your community, not a generic staging catalog. That specificity is what makes these images perform on MLS, paid ads, and your website.",
    },
  },
  {
    slotId: "gallery-amenities-context",
    content: {
      eyebrow: "Perception Drives Value",
      headline: "Value is established before the <strong>first visit</strong>.",
      body: "Perceived value is established before a buyer ever steps on site. What they see online sets the tone, defining what feels premium, considered, and worth pursuing.<br><br>DIG captures your amenities as high-impact visual assets, crafted to elevate perception, create excitement, and position your community as the clear choice early in the process.",
    },
  },
  {
    slotId: "gallery-models-context",
    content: {
      eyebrow: "Premium Photography",
      headline: "What goes into a <strong>model home shoot</strong>.",
      body: "Every model home shoot starts before the photographer arrives. Pre-shoot planning covers room-by-room angles, exterior timing, and lifestyle staging context so the day runs efficiently and nothing gets missed.<br><br>On-site, DIG captures architectural detail, interior spaces, twilight exteriors, and lifestyle moments. Post-production handles retouching, sky replacement, and color correction. The result is a complete asset package ready for your website, paid ads, email, and sales center, delivered within the agreed window.",
    },
  },
  {
    slotId: "gallery-lifestyle-context",
    content: {
      eyebrow: "Photo + Video",
      headline: "Lifestyle covers both <strong>photo and video</strong>.",
      body: "Lifestyle is a primary output of two DIG services: Premium photography and Video Production. Both appear in this gallery because both serve the same purpose: connecting buyers emotionally to a community before a physical visit ever happens.<br><br>Lifestyle shoots involve talent, styling, and real-moment direction. The goal is not staged perfection. It is authentic energy that communicates what it actually feels like to live in a home. That distinction is what makes lifestyle content outperform architecture-only photography in paid media and website conversion.",
    },
  },
];

for (const { slotId, content } of slots) {
  const contentJson = JSON.stringify(content);
  const existing = await sql`SELECT id FROM site_content WHERE slot_id = ${slotId}`;
  if (existing.length > 0) {
    await sql`UPDATE site_content SET content = ${contentJson}::jsonb, updated_at = NOW() WHERE slot_id = ${slotId}`;
    console.log(`✅ Updated: ${slotId}`);
  } else {
    await sql`INSERT INTO site_content (slot_id, content) VALUES (${slotId}, ${contentJson}::jsonb)`;
    console.log(`✅ Inserted: ${slotId}`);
  }
}

console.log("\nDone. All 4 gallery context slots are updated.");
