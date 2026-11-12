// Server-side admin authentication for API routes.
//
// The /admin UI gate is client-only (a sessionStorage flag), so every route
// that writes data or returns admin-only data must check the admin password
// itself. The credential is the ADMIN_PASSWORD env var, sent by the client
// either in the `x-admin-key` request header (see src/lib/adminClient.ts) or,
// on older routes, as an `adminKey` body field.
//
// Fails closed: with ADMIN_PASSWORD unset, nothing authenticates.

import { timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";

export const ADMIN_KEY_HEADER = "x-admin-key";

export function checkAdminKey(key: unknown): boolean {
  const expected = process.env.ADMIN_PASSWORD ?? "";
  if (!expected || typeof key !== "string" || !key) return false;
  const a = Buffer.from(key);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

/**
 * Gate a route handler on the admin key header. Returns a response to send
 * back when the request is not allowed, or null when it may proceed:
 *
 *   const denied = requireAdmin(req);
 *   if (denied) return denied;
 */
export function requireAdmin(req: Request): NextResponse | null {
  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Admin auth not configured" }, { status: 503 });
  }
  if (!checkAdminKey(req.headers.get(ADMIN_KEY_HEADER))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
