// /api/client-showcase  (all admin-only; adminKey checked against ADMIN_PASSWORD)
//   POST   {action:"list"}                      -> every deck
//   POST   {action:"scrape", website}            -> builder name + logo candidates
//   POST   {action:"create", deck}               -> new deck with a fresh id
//   POST   {action:"update", id, deck}           -> edit an existing deck
//   POST   {action:"delete", id}                 -> remove a deck
//
// Everything goes through POST so the admin key travels in the body, never a URL.

import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import {
  checkAdminKey,
  cleanAttendees,
  createDeck,
  deleteDeck,
  getDeck,
  isDeckId,
  listDecks,
  makeDeckId,
  updateDeck,
  type DeckInput,
} from "@/lib/clientShowcase";
import { fetchLogo, normalizeWebsite, scrapeBrand } from "@/lib/brandScrape";

export const maxDuration = 30;

type Body = {
  action?: string;
  adminKey?: string;
  website?: string;
  id?: string;
  deck?: Partial<DeckInput> & { logo_source_url?: string | null };
};

function str(v: unknown, max: number): string | null {
  if (typeof v !== "string") return null;
  const s = v.trim().slice(0, max);
  return s || null;
}

// Re-host the chosen logo in Blob unless it already lives there.
async function hostLogo(sourceUrl: string | null | undefined, deckId: string): Promise<string | null> {
  if (!sourceUrl) return null;
  if (/\.public\.blob\.vercel-storage\.com\//.test(sourceUrl)) return sourceUrl;
  const logo = await fetchLogo(sourceUrl);
  let body = logo.body;
  if (logo.ext === "svg") {
    // Strip anything executable before we serve the SVG from our own storage.
    body = Buffer.from(
      body
        .toString("utf8")
        .replace(/<script[\s\S]*?<\/script>/gi, "")
        .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*')/gi, ""),
    );
  }
  const blob = await put(`client-showcase/logos/${deckId}-${Date.now()}.${logo.ext}`, body, {
    access: "public",
    contentType: logo.contentType,
  });
  return blob.url;
}

async function toInput(raw: Body["deck"], deckId: string): Promise<DeckInput> {
  const builder_name = str(raw?.builder_name, 80);
  if (!builder_name) throw new Error("Builder name is required");
  let website: string | null = null;
  if (str(raw?.website, 300)) website = normalizeWebsite(raw!.website as string);
  return {
    builder_name,
    website,
    logo_url: await hostLogo(raw?.logo_source_url ?? raw?.logo_url ?? null, deckId),
    logo_bg: raw?.logo_bg === "dark" ? "dark" : "light",
    attendees: cleanAttendees(raw?.attendees),
    meeting_date: str(raw?.meeting_date, 40),
    opening_line: str(raw?.opening_line, 240),
    prepared_by: str(raw?.prepared_by, 120),
  };
}

export async function POST(req: NextRequest) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Admin auth not configured" }, { status: 503 });
  }
  if (!checkAdminKey(body.adminKey)) {
    await new Promise((r) => setTimeout(r, 400));
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    switch (body.action) {
      case "list":
        return NextResponse.json({ decks: await listDecks() });

      case "scrape": {
        if (!str(body.website, 300)) return NextResponse.json({ error: "Website is required" }, { status: 400 });
        return NextResponse.json(await scrapeBrand(body.website!));
      }

      case "create": {
        const name = str(body.deck?.builder_name, 80) ?? "deck";
        const id = makeDeckId(name);
        const deck = await createDeck(id, await toInput(body.deck, id));
        return NextResponse.json({ deck });
      }

      case "update": {
        if (!isDeckId(body.id)) return NextResponse.json({ error: "Bad id" }, { status: 400 });
        const existing = await getDeck(body.id);
        if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
        const deck = await updateDeck(body.id, await toInput(body.deck, body.id));
        return NextResponse.json({ deck });
      }

      case "delete": {
        if (!isDeckId(body.id)) return NextResponse.json({ error: "Bad id" }, { status: 400 });
        await deleteDeck(body.id);
        return NextResponse.json({ ok: true });
      }

      default:
        return NextResponse.json({ error: "Unknown action" }, { status: 400 });
    }
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : String(e) }, { status: 500 });
  }
}
