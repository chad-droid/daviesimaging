import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// Describe a single image
async function describeImage(
  imageUrl: string,
  dealContext: {
    name: string;
    builder: string;
    city: string;
    state: string;
    modelName: string;
    deliverables: string;
  },
): Promise<string> {
  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 200,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image",
            source: { type: "url", url: imageUrl },
          },
          {
            type: "text",
            text: `Write a concise, SEO-optimized alt text description for this real estate photography image. Use 1-2 sentences max.

Context:
- Project: ${dealContext.name}
- Builder: ${dealContext.builder}
- Location: ${dealContext.city}, ${dealContext.state}
- Model: ${dealContext.modelName || "N/A"}

Guidelines:
- Describe what's visible: room type, design features, materials, lighting, views
- Include the builder name and location naturally
- Use homebuyer-focused language (spacious, open-concept, natural light, etc.)
- No filler words, no "this image shows"
- Optimized for Google Image Search`,
          },
        ],
      },
    ],
  });

  const textBlock = response.content.find((b) => b.type === "text");
  return textBlock ? textBlock.text : "";
}

// POST: describe one or all images for a deal
export async function POST(req: NextRequest) {
  try {
    const { dealId, fileId, all } = (await req.json()) as {
      dealId: string;
      fileId?: number;
      all?: boolean;
    };

    if (!dealId) return NextResponse.json({ error: "dealId required" }, { status: 400 });

    // Get deal context
    const dealResult = await sql`SELECT * FROM deals WHERE id = ${dealId}`;
    if (dealResult.rows.length === 0) return NextResponse.json({ error: "Deal not found" }, { status: 404 });
    const deal = dealResult.rows[0];

    const context = {
      name: deal.name || "",
      builder: deal.builder || "",
      city: deal.city || "",
      state: deal.state || "",
      modelName: deal.model_name || "",
      deliverables: deal.deliverables || "",
    };

    // Get files to describe
    let files;
    if (fileId) {
      files = await sql`SELECT * FROM media_files WHERE id = ${fileId} AND deal_id = ${dealId}`;
    } else if (all) {
      files = await sql`SELECT * FROM media_files WHERE deal_id = ${dealId} AND (description IS NULL OR description = '')`;
    } else {
      return NextResponse.json({ error: "Provide fileId or set all: true" }, { status: 400 });
    }

    const results: { id: number; filename: string; description: string }[] = [];
    const errors: string[] = [];

    for (const file of files.rows) {
      try {
        const description = await describeImage(file.url, context);
        await sql`UPDATE media_files SET description = ${description} WHERE id = ${file.id}`;
        results.push({ id: file.id, filename: file.filename, description });
      } catch (e) {
        errors.push(`${file.filename}: ${e}`);
      }
    }

    return NextResponse.json({
      described: results.length,
      failed: errors.length,
      results,
      errors,
    });
  } catch (e) {
    return NextResponse.json({ error: `Description failed: ${e}` }, { status: 500 });
  }
}
