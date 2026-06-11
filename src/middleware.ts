import { NextRequest, NextResponse } from "next/server";

// HTTP Basic Auth gate for the ModelMatch showcase (static app in public/modelmatch).
// Username is "dig"; password comes from MODELMATCH_PASSWORD (Vercel env + .env.local).
// Fails closed: if the env var is missing, the route stays locked.
export const config = {
  matcher: ["/modelmatch", "/modelmatch/:path*"],
};

export function middleware(req: NextRequest) {
  const password = process.env.MODELMATCH_PASSWORD;
  if (password) {
    const expected = "Basic " + btoa(`dig:${password}`);
    if (req.headers.get("authorization") === expected) {
      return NextResponse.next();
    }
  }
  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="ModelMatch Showcase"' },
  });
}
