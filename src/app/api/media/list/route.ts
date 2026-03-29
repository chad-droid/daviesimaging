import { NextRequest, NextResponse } from "next/server";
import { list } from "@vercel/blob";

export async function GET(req: NextRequest) {
  const prefix = req.nextUrl.searchParams.get("prefix") || "gallery/";
  const cursor = req.nextUrl.searchParams.get("cursor") || undefined;

  try {
    const result = await list({
      prefix,
      cursor,
      limit: 100,
    });

    return NextResponse.json({
      blobs: result.blobs.map((b) => ({
        url: b.url,
        pathname: b.pathname,
        size: b.size,
        uploadedAt: b.uploadedAt,
      })),
      hasMore: result.hasMore,
      cursor: result.cursor,
    });
  } catch (e) {
    return NextResponse.json({ error: `List failed: ${e}` }, { status: 500 });
  }
}
