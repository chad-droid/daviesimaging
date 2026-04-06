import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { randomUUID } from "crypto";

// POST: create a manual gallery project (no Zoho deal required)
export async function POST(req: NextRequest) {
  try {
    const { name, builder, city, state, pipeline, youtube } = (await req.json()) as {
      name: string;
      builder: string;
      city?: string;
      state?: string;
      pipeline?: string;
      youtube?: string;
    };

    if (!name || !builder) {
      return NextResponse.json({ error: "name and builder are required" }, { status: 400 });
    }

    const id = randomUUID();

    // Insert into deals table — status approved + imported so it shows in gallery admin
    await sql`
      INSERT INTO deals (
        id, name, builder, city, state, pipeline, youtube,
        status, imported, imported_at, source
      ) VALUES (
        ${id}, ${name}, ${builder},
        ${city || ""}, ${state || ""},
        ${pipeline || "Premium"},
        ${youtube || ""},
        'approved', true, NOW(), 'manual'
      )
    `;

    return NextResponse.json({ success: true, dealId: id });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
