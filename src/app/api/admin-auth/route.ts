import { NextRequest, NextResponse } from "next/server";

// Password lives in env — never shipped to the client bundle.
// Set ADMIN_PASSWORD in .env.local and in Vercel environment variables.
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "";

export async function POST(req: NextRequest) {
  if (!ADMIN_PASSWORD) {
    return NextResponse.json({ success: false, error: "Admin not configured" }, { status: 503 });
  }

  const { password } = await req.json().catch(() => ({ password: "" }));

  if (!password || typeof password !== "string") {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  if (password === ADMIN_PASSWORD) {
    return NextResponse.json({ success: true });
  }

  // Brief delay to slow brute-force attempts
  await new Promise((r) => setTimeout(r, 400));
  return NextResponse.json({ success: false }, { status: 401 });
}
