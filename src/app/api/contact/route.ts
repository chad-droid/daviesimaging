import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { firstName, lastName, email, company, message, intent } = body;

  if (!email || !firstName) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const name = [firstName, lastName].filter(Boolean).join(" ");
  const results: Record<string, string> = {};

  // 1. Slack notification
  const slackUrl = process.env.SLACK_WEBHOOK_URL;
  if (slackUrl) {
    try {
      const res = await fetch(slackUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          blocks: [
            {
              type: "header",
              text: { type: "plain_text", text: "New contact form submission" },
            },
            {
              type: "section",
              fields: [
                { type: "mrkdwn", text: `*Name:*\n${name}` },
                { type: "mrkdwn", text: `*Email:*\n${email}` },
                { type: "mrkdwn", text: `*Company:*\n${company || "Not provided"}` },
                { type: "mrkdwn", text: `*Intent:*\n${intent || "Not specified"}` },
              ],
            },
            ...(message
              ? [
                  {
                    type: "section",
                    text: { type: "mrkdwn", text: `*Message:*\n${message}` },
                  },
                ]
              : []),
          ],
        }),
      });
      results.slack = res.ok ? "ok" : "failed";
    } catch {
      results.slack = "error";
    }
  }

  // 2. Email notification via Resend
  const resendKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.NOTIFICATION_EMAIL;
  if (resendKey && notifyEmail) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from: "DIG Website <notifications@daviesimaging.com>",
          to: notifyEmail,
          subject: `New contact: ${name} — ${intent || "General inquiry"}`,
          html: `
            <h2 style="font-family:sans-serif">New Contact Form Submission</h2>
            <table style="font-family:sans-serif;border-collapse:collapse;width:100%">
              <tr><td style="padding:8px 0;font-weight:bold">Name</td><td>${name}</td></tr>
              <tr><td style="padding:8px 0;font-weight:bold">Email</td><td><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding:8px 0;font-weight:bold">Company</td><td>${company || "Not provided"}</td></tr>
              <tr><td style="padding:8px 0;font-weight:bold">Intent</td><td>${intent || "Not specified"}</td></tr>
              <tr><td style="padding:8px 0;font-weight:bold;vertical-align:top">Message</td><td>${message?.replace(/\n/g, "<br>") || "Not provided"}</td></tr>
            </table>
          `,
        }),
      });
      results.email = res.ok ? "ok" : "failed";
    } catch {
      results.email = "error";
    }
  } else {
    results.email = "skipped (no RESEND_API_KEY)";
  }

  // 3. Mailchimp subscribe
  const mcKey = process.env.MAILCHIMP_API_KEY;
  const mcList = process.env.MAILCHIMP_LIST_ID;
  const mcServer = process.env.MAILCHIMP_SERVER;
  if (mcKey && mcList && mcServer) {
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
            email_address: email,
            status: "subscribed",
            merge_fields: {
              FNAME: firstName,
              LNAME: lastName || "",
              COMPANY: company || "",
            },
            tags: [intent || "contact-form"],
          }),
        }
      );
      // 400 with "Member Exists" is still a success
      results.mailchimp = res.ok || res.status === 400 ? "ok" : "failed";
    } catch {
      results.mailchimp = "error";
    }
  }

  return NextResponse.json({ success: true, results });
}
