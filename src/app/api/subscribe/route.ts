import { NextRequest, NextResponse } from "next/server";
import { checkBotId } from "botid/server";

// Newsletter signup. Public on purpose (the footer and the email modal post
// here), so it defends itself instead of using requireAdmin.
//
// The forms used to post straight to Mailchimp's public list-manage URL, which
// any script could hit. Now the signup comes through here and has to pass the
// invisible captcha (Vercel BotID) before it reaches the Mailchimp API.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: NextRequest) {
  // Layer 1: invisible captcha. The browser solves a challenge in the
  // background (see instrumentation-client.ts) and attaches the result to this
  // request. Scripts that post here directly have nothing to attach.
  const verification = await checkBotId();
  if (verification.isBot) {
    return NextResponse.json({ error: "Access denied" }, { status: 403 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { email, firstName, hp, elapsedMs, source } = body;

  // Layer 2: honeypot. `hp` is a field no person ever sees. Fake a success so
  // the bot moves on.
  if (typeof hp === "string" && hp.trim() !== "") {
    return NextResponse.json({ success: true });
  }

  // Layer 3: nobody types an email address and submits in under 1.5 seconds.
  if (typeof elapsedMs === "number" && elapsedMs >= 0 && elapsedMs < 1500) {
    return NextResponse.json({ success: true });
  }

  if (typeof email !== "string" || email.length > 254 || !EMAIL_RE.test(email.trim())) {
    return NextResponse.json({ error: "Enter a valid email address" }, { status: 400 });
  }

  const mcKey = process.env.MAILCHIMP_API_KEY;
  const mcList = process.env.MAILCHIMP_LIST_ID;
  const mcServer = process.env.MAILCHIMP_SERVER;
  if (!mcKey || !mcList || !mcServer) {
    console.error("[subscribe] Mailchimp env vars missing");
    return NextResponse.json({ error: "Signup unavailable" }, { status: 503 });
  }

  const fname = typeof firstName === "string" ? firstName.trim().slice(0, 80) : "";
  const tag = source === "modal" ? "newsletter-modal" : "newsletter-footer";

  try {
    const res = await fetch(
      `https://${mcServer}.api.mailchimp.com/3.0/lists/${mcList}/members`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from(`anystring:${mcKey}`).toString("base64")}`,
        },
        body: JSON.stringify({
          email_address: email.trim(),
          status: "subscribed",
          merge_fields: fname ? { FNAME: fname } : {},
          tags: [tag],
        }),
      }
    );
    if (res.ok) return NextResponse.json({ success: true });

    const data = await res.json().catch(() => ({}));
    // Already on the list: that is a success as far as the visitor is concerned.
    if (res.status === 400 && data?.title === "Member Exists") {
      return NextResponse.json({ success: true });
    }
    console.error("[subscribe] Mailchimp rejected signup", res.status, data?.title, data?.detail);
    return NextResponse.json({ error: "Signup failed" }, { status: 502 });
  } catch (err) {
    console.error("[subscribe] Mailchimp request failed", err);
    return NextResponse.json({ error: "Signup failed" }, { status: 502 });
  }
}
