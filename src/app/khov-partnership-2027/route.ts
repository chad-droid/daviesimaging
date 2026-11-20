import { servePresentation } from "@/lib/blobPresentation";

/**
 * /khov-partnership-2027: the K. Hovnanian meeting presentation. Open link, no password
 * (Chad, 18 Nov 2026). Files are in Vercel Blob (scripts/upload-khov-2027.mjs prints
 * KHOV_2027_BASE). See src/lib/blobPresentation.ts.
 */
export const dynamic = "force-dynamic";

export function GET() {
  return servePresentation(process.env.KHOV_2027_BASE);
}
