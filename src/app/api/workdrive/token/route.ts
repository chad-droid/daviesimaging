import { NextResponse } from "next/server";

const ZOHO_ACCOUNTS_URL = "https://accounts.zoho.com/oauth/v2/token";

// Returns a fresh Zoho access token for use by the admin batch import flow.
// Called once before a batch — the client passes the token with each import request
// so the server never needs to fetch its own token during a batch.
export async function GET() {
  try {
    const res = await fetch(ZOHO_ACCOUNTS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        refresh_token: process.env.ZOHO_REFRESH_TOKEN || "",
        client_id: process.env.ZOHO_CLIENT_ID || "",
        client_secret: process.env.ZOHO_CLIENT_SECRET || "",
        grant_type: "refresh_token",
      }),
    });
    const data = await res.json();
    if (!data.access_token) {
      return NextResponse.json({ error: `Zoho auth failed: ${JSON.stringify(data)}` }, { status: 500 });
    }
    return NextResponse.json({ token: data.access_token });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
