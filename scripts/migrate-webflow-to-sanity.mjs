/**
 * Migration script: Webflow Blog Posts -> Sanity CMS
 *
 * Converts 24 blog posts from webflow-blog-posts.json into Sanity documents.
 * Handles HTML-to-PortableText conversion and image uploads.
 *
 * Usage: node scripts/migrate-webflow-to-sanity.mjs
 *
 * Requires: SANITY_AUTH_TOKEN env var (create at sanity.io/manage > API > Tokens)
 */

import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { randomUUID } from "crypto";

const PROJECT_ID = "5xi4v6mr";
const DATASET = "production";

const token = process.env.SANITY_AUTH_TOKEN;
if (!token) {
  console.error(
    "Missing SANITY_AUTH_TOKEN. Create one at sanity.io/manage > API > Tokens (Editor role)."
  );
  process.exit(1);
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

// ── HTML to Portable Text conversion ──

function htmlToPortableText(html) {
  if (!html) return [];

  const blocks = [];
  // Split on block-level elements
  const parts = html.split(
    /(<h[1-6][^>]*>.*?<\/h[1-6]>|<p[^>]*>.*?<\/p>|<blockquote[^>]*>.*?<\/blockquote>|<figure[^>]*>.*?<\/figure>|<ul[^>]*>.*?<\/ul>|<ol[^>]*>.*?<\/ol>)/gs
  );

  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;

    // Skip empty paragraphs (Webflow uses <p>‍</p> as spacers)
    if (/^<p[^>]*>\s*(‍|\s|&nbsp;)*\s*<\/p>$/i.test(trimmed)) continue;

    // Images in figures
    const figureMatch = trimmed.match(/<img[^>]+src="([^"]+)"[^>]*alt="([^"]*)"[^>]*>/i);
    if (figureMatch) {
      blocks.push({
        _type: "image",
        _sanityAsset: `image@${figureMatch[1]}`,
        alt: figureMatch[2] === "__wf_reserved_inherit" ? "" : figureMatch[2],
      });
      continue;
    }

    // Headings
    const headingMatch = trimmed.match(/^<(h[1-6])[^>]*>(.*?)<\/\1>$/is);
    if (headingMatch) {
      const level = headingMatch[1]; // h1, h2, h3, etc.
      const style = level === "h1" ? "h2" : level; // map h1 -> h2 for blog context
      blocks.push(makeTextBlock(headingMatch[2], style));
      continue;
    }

    // Paragraphs
    const pMatch = trimmed.match(/^<p[^>]*>(.*?)<\/p>$/is);
    if (pMatch) {
      const content = pMatch[1].trim();
      if (!content || content === "‍") continue;
      blocks.push(makeTextBlock(content, "normal"));
      continue;
    }

    // Blockquotes
    const bqMatch = trimmed.match(/^<blockquote[^>]*>(.*?)<\/blockquote>$/is);
    if (bqMatch) {
      blocks.push(makeTextBlock(bqMatch[1], "blockquote"));
      continue;
    }

    // Lists
    const ulMatch = trimmed.match(/^<ul[^>]*>(.*?)<\/ul>$/is);
    if (ulMatch) {
      const items = ulMatch[1].match(/<li[^>]*>(.*?)<\/li>/gis) || [];
      for (const li of items) {
        const liContent = li.replace(/<\/?li[^>]*>/gi, "").trim();
        blocks.push(makeTextBlock(liContent, "normal", "bullet"));
      }
      continue;
    }

    const olMatch = trimmed.match(/^<ol[^>]*>(.*?)<\/ol>$/is);
    if (olMatch) {
      const items = olMatch[1].match(/<li[^>]*>(.*?)<\/li>/gis) || [];
      for (const li of items) {
        const liContent = li.replace(/<\/?li[^>]*>/gi, "").trim();
        blocks.push(makeTextBlock(liContent, "normal", "number"));
      }
      continue;
    }

    // Fallback: treat as paragraph
    if (trimmed.length > 1 && !trimmed.startsWith("<")) {
      blocks.push(makeTextBlock(trimmed, "normal"));
    }
  }

  return blocks;
}

function makeTextBlock(html, style = "normal", listItem = null) {
  const key = randomUUID().slice(0, 8);
  const { children, markDefs } = parseInlineHtml(html);

  const block = {
    _type: "block",
    _key: key,
    style,
    children,
    markDefs,
  };

  if (listItem) {
    block.listItem = listItem;
    block.level = 1;
  }

  return block;
}

function parseInlineHtml(html) {
  const children = [];
  const markDefs = [];

  // Handle <br> as line breaks by converting to newlines
  let processed = html.replace(/<br\s*\/?>/gi, "\n");
  // Strip remaining block-level tags that might be nested
  processed = processed.replace(/<\/?(p|div|span)[^>]*>/gi, "");

  // Regex to find inline elements: <strong>, <em>, <a>
  const inlineRegex =
    /<(strong|b|em|i|a)(\s[^>]*)?>(((?!<\1[\s>])[\s\S])*?)<\/\1>/gi;

  let lastIndex = 0;
  let match;

  // Use a simpler approach: strip tags and preserve marks
  const segments = splitInlineSegments(processed);

  for (const seg of segments) {
    children.push({
      _type: "span",
      _key: randomUUID().slice(0, 8),
      text: seg.text,
      marks: seg.marks || [],
    });

    if (seg.markDef) {
      markDefs.push(seg.markDef);
    }
  }

  // If no children were created, add an empty span
  if (children.length === 0) {
    children.push({
      _type: "span",
      _key: randomUUID().slice(0, 8),
      text: "",
      marks: [],
    });
  }

  return { children, markDefs };
}

function splitInlineSegments(html) {
  const segments = [];

  // Simple parser: find bold, italic, and link tags
  let remaining = html;

  while (remaining.length > 0) {
    // Find the next inline tag
    const tagMatch = remaining.match(
      /<(strong|b|em|i|a)(\s[^>]*)?>(((?!<\/\1>)[\s\S])*?)<\/\1>/i
    );

    if (!tagMatch) {
      // No more tags, add remaining as plain text
      const text = stripTags(remaining).trim();
      if (text) {
        segments.push({ text, marks: [] });
      }
      break;
    }

    // Add text before the tag
    const before = stripTags(remaining.slice(0, tagMatch.index)).trim();
    if (before) {
      segments.push({ text: before, marks: [] });
    }

    const tagName = tagMatch[1].toLowerCase();
    const attrs = tagMatch[2] || "";
    const innerHtml = tagMatch[3];
    const innerText = stripTags(innerHtml).trim();

    if (tagName === "a") {
      const hrefMatch = attrs.match(/href="([^"]*)"/i);
      if (hrefMatch && innerText) {
        const markKey = randomUUID().slice(0, 8);
        segments.push({
          text: innerText,
          marks: ["link-" + markKey],
          markDef: {
            _type: "link",
            _key: "link-" + markKey,
            href: hrefMatch[1],
          },
        });
      }
    } else if (tagName === "strong" || tagName === "b") {
      if (innerText) {
        segments.push({ text: innerText, marks: ["strong"] });
      }
    } else if (tagName === "em" || tagName === "i") {
      if (innerText) {
        segments.push({ text: innerText, marks: ["em"] });
      }
    }

    remaining = remaining.slice(tagMatch.index + tagMatch[0].length);
  }

  return segments.length > 0
    ? segments
    : [{ text: stripTags(html).trim() || "", marks: [] }];
}

function stripTags(html) {
  return html.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
}

// ── Main migration ──

async function migrate() {
  const raw = readFileSync(
    new URL("../webflow-blog-posts.json", import.meta.url),
    "utf-8"
  );
  const posts = JSON.parse(raw);

  console.log(`Found ${posts.length} posts to migrate.\n`);

  let success = 0;
  let failed = 0;

  for (const post of posts) {
    const fd = post.fieldData;
    const title = fd.name;
    const slug = fd.slug;

    try {
      console.log(`Migrating: "${title}"...`);

      // Convert HTML body to Portable Text
      const body = htmlToPortableText(fd["post-body"] || "");

      // Build the Sanity document
      const doc = {
        _type: "post",
        _id: `webflow-${slug}`,
        title,
        slug: { _type: "slug", current: slug },
        publishedAt: fd["article-date2"],
        author: "DIG Team",
        excerpt: stripTags(fd["post-body"] || "")
          .replace(/\s+/g, " ")
          .trim()
          .slice(0, 200),
        body,
      };

      // Handle cover image - upload from Webflow CDN
      if (fd["main-image"]?.url) {
        try {
          const imgUrl = fd["main-image"].url;
          console.log(`  Uploading cover image...`);
          const imgResponse = await fetch(imgUrl);
          const imgBuffer = Buffer.from(await imgResponse.arrayBuffer());
          const asset = await client.assets.upload("image", imgBuffer, {
            filename: `${slug}-cover.jpg`,
          });
          doc.coverImage = {
            _type: "image",
            asset: { _type: "reference", _ref: asset._id },
          };
          console.log(`  Cover image uploaded.`);
        } catch (imgErr) {
          console.warn(`  Warning: Failed to upload cover image: ${imgErr.message}`);
        }
      }

      // Upload inline images from body
      for (let i = 0; i < body.length; i++) {
        if (body[i]._type === "image" && body[i]._sanityAsset) {
          const assetUrl = body[i]._sanityAsset.replace("image@", "");
          try {
            console.log(`  Uploading inline image ${i + 1}...`);
            const imgResponse = await fetch(assetUrl);
            const imgBuffer = Buffer.from(await imgResponse.arrayBuffer());
            const asset = await client.assets.upload("image", imgBuffer, {
              filename: `${slug}-inline-${i}.jpg`,
            });
            body[i] = {
              _type: "image",
              _key: randomUUID().slice(0, 8),
              asset: { _type: "reference", _ref: asset._id },
              alt: body[i].alt || "",
            };
          } catch (imgErr) {
            console.warn(`  Warning: Failed to upload inline image: ${imgErr.message}`);
            // Remove failed image from body
            body.splice(i, 1);
            i--;
          }
        }
      }

      // Create or replace the document
      await client.createOrReplace(doc);
      console.log(`  Done.\n`);
      success++;
    } catch (err) {
      console.error(`  FAILED: ${err.message}\n`);
      failed++;
    }
  }

  console.log(`\nMigration complete: ${success} succeeded, ${failed} failed.`);
}

migrate().catch((err) => {
  console.error("Migration error:", err);
  process.exit(1);
});
