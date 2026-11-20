import { servePresentation } from "@/lib/blobPresentation";

/**
 * /modelmatchdemo2027: the two ModelMatch slides from the 2027 builder presentation (ModelMatch
 * and a staged sample), with every builder name removed. Open link, no password (Chad, 20 Nov 2026).
 * Not the same as /modelmatch-demo, the password-gated showcase app.
 * Files are in Vercel Blob (scripts/upload-modelmatch-2027.mjs prints MODELMATCH_2027_BASE).
 */
export const dynamic = "force-dynamic";

export function GET() {
  return servePresentation(process.env.MODELMATCH_2027_BASE);
}
