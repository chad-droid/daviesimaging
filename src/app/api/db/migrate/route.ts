import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST() {
  try {
    // Add missing columns safely (IF NOT EXISTS)
    await sql`ALTER TABLE media_files ADD COLUMN IF NOT EXISTS description TEXT`;
    await sql`ALTER TABLE deals ADD COLUMN IF NOT EXISTS scope TEXT`;

    return NextResponse.json({ success: true, message: "Migrations applied" });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
