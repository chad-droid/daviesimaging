import { NextRequest, NextResponse } from "next/server";
import { PATH, config, cookieName, isSignedIn, passwordMatches, passwordPage, privateHeaders, token } from "@/lib/tollPartnership";

// Password-gated client presentation. See src/lib/tollPartnership.ts.
export const dynamic = "force-dynamic";

const html = (body: string, status = 200) =>
  new NextResponse(body, { status, headers: { ...privateHeaders, "Content-Type": "text/html; charset=utf-8" } });

export async function GET(req: NextRequest) {
  const cfg = config();
  if (!cfg || !isSignedIn(req)) return html(passwordPage(cfg?.mediaBase ?? null, false), cfg ? 200 : 503);

  const res = await fetch(cfg.privateBase + "index.html", { cache: "no-store" });
  if (!res.ok) return html("<p>The presentation is not available right now.</p>", 502);
  let page = await res.text();
  // Photos, video, fonts and the map load from Blob through <base>; data.js comes back
  // through this route. It needs the full origin, because <base> would otherwise send
  // a root-relative path to Blob as well.
  page = page
    .replace("<head>", `<head>\n<base href="${cfg.mediaBase}">`)
    .replace(/<script src="data\.js[^"]*"><\/script>/, `<script src="${req.nextUrl.origin}${PATH}/data.js"></script>`);
  return html(page);
}

export async function POST(req: NextRequest) {
  const cfg = config();
  const form = await req.formData().catch(() => null);
  const input = String(form?.get("password") ?? "");
  if (!cfg || !passwordMatches(input)) return html(passwordPage(cfg?.mediaBase ?? null, true), 401);

  const res = NextResponse.redirect(new URL(PATH, req.url), 303);
  res.cookies.set(cookieName, token(cfg.password), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: PATH,
    maxAge: 60 * 60 * 24 * 60, // 60 days
  });
  return res;
}
