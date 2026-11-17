import { NextRequest, NextResponse } from "next/server";
import { config, isSignedIn, privateHeaders } from "@/lib/tollPartnership";

// The presentation's data (markets, notes, pricing). Signed-in viewers only.
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const cfg = config();
  if (!cfg || !isSignedIn(req)) return new NextResponse("Not found", { status: 404, headers: privateHeaders });
  const res = await fetch(cfg.privateBase + "data.js", { cache: "no-store" });
  if (!res.ok) return new NextResponse("Not available", { status: 502, headers: privateHeaders });
  return new NextResponse(await res.text(), {
    headers: { ...privateHeaders, "Content-Type": "text/javascript; charset=utf-8" },
  });
}
