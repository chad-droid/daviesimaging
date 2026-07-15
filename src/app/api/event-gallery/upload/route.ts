// /api/event-gallery/upload — mints a signed token for a client-side
// direct-to-Blob upload (bypasses the 4.5MB serverless body limit). Gated: the
// client passes the admin password as clientPayload, validated here before a
// token is issued, so only the admin can upload. The raw blob is then optimized
// and finalized by POST /api/event-gallery.

import { NextRequest, NextResponse } from "next/server";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = (await req.json()) as HandleUploadBody;
  try {
    const result = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async (_pathname, clientPayload) => {
        const expected = process.env.ADMIN_PASSWORD ?? "";
        if (!expected || clientPayload !== expected) {
          throw new Error("Unauthorized");
        }
        return {
          allowedContentTypes: ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/tiff", "image/heic", "image/heif"],
          maximumSizeInBytes: 100 * 1024 * 1024,
          addRandomSuffix: true,
          allowOverwrite: true,
        };
      },
      onUploadCompleted: async () => {
        // Optimization + DB insert happen in POST /api/event-gallery.
      },
    });
    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 401 });
  }
}
