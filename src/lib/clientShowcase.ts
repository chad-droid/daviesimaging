// Client showcase decks: one row per builder meeting. Each deck renders the
// same DIG product showcase at /for/[id], personalized with the builder's
// name, logo, and the people it was prepared for.
//
// The table is created lazily on first use so no migration step is needed.

import { sql } from "@vercel/postgres";
import { randomBytes } from "crypto";

export type Attendee = { name: string; title?: string };

export type ClientDeck = {
  id: string;
  builder_name: string;
  website: string | null;
  logo_url: string | null;
  logo_bg: "light" | "dark";
  attendees: Attendee[];
  meeting_date: string | null;
  opening_line: string | null;
  prepared_by: string | null;
  views: number;
  last_viewed_at: string | null;
  created_at: string;
};

let tableReady: Promise<void> | null = null;

export function ensureShowcaseTable(): Promise<void> {
  if (!tableReady) {
    tableReady = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS client_showcase_decks (
          id TEXT PRIMARY KEY,
          builder_name TEXT NOT NULL,
          website TEXT,
          logo_url TEXT,
          logo_bg TEXT DEFAULT 'light',
          attendees JSONB DEFAULT '[]',
          meeting_date TEXT,
          opening_line TEXT,
          prepared_by TEXT,
          views INT DEFAULT 0,
          last_viewed_at TIMESTAMPTZ,
          created_at TIMESTAMPTZ DEFAULT NOW()
        )
      `;
    })().catch((e) => {
      tableReady = null;
      throw e;
    });
  }
  return tableReady;
}

// "Drees Homes" -> "drees-homes-k7qm2x". The random suffix makes links
// unguessable; the slug keeps them readable when pasted into an email.
export function makeDeckId(builderName: string): string {
  const slug = builderName
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 32) || "deck";
  const alphabet = "abcdefghjkmnpqrstuvwxyz23456789";
  const bytes = randomBytes(6);
  let suffix = "";
  for (const b of bytes) suffix += alphabet[b % alphabet.length];
  return `${slug}-${suffix}`;
}

export function isDeckId(id: unknown): id is string {
  return typeof id === "string" && /^[a-z0-9-]{3,48}$/.test(id);
}

function rowToDeck(r: Record<string, unknown>): ClientDeck {
  return {
    id: String(r.id),
    builder_name: String(r.builder_name),
    website: (r.website as string) ?? null,
    logo_url: (r.logo_url as string) ?? null,
    logo_bg: r.logo_bg === "dark" ? "dark" : "light",
    attendees: Array.isArray(r.attendees) ? (r.attendees as Attendee[]) : [],
    meeting_date: (r.meeting_date as string) ?? null,
    opening_line: (r.opening_line as string) ?? null,
    prepared_by: (r.prepared_by as string) ?? null,
    views: Number(r.views ?? 0),
    last_viewed_at: r.last_viewed_at ? new Date(r.last_viewed_at as string).toISOString() : null,
    created_at: new Date(r.created_at as string).toISOString(),
  };
}

export async function getDeck(id: string): Promise<ClientDeck | null> {
  if (!isDeckId(id)) return null;
  await ensureShowcaseTable();
  const { rows } = await sql`SELECT * FROM client_showcase_decks WHERE id = ${id}`;
  return rows[0] ? rowToDeck(rows[0]) : null;
}

export async function listDecks(): Promise<ClientDeck[]> {
  await ensureShowcaseTable();
  const { rows } = await sql`SELECT * FROM client_showcase_decks ORDER BY created_at DESC`;
  return rows.map(rowToDeck);
}

export type DeckInput = {
  builder_name: string;
  website?: string | null;
  logo_url?: string | null;
  logo_bg?: "light" | "dark";
  attendees?: Attendee[];
  meeting_date?: string | null;
  opening_line?: string | null;
  prepared_by?: string | null;
};

export function cleanAttendees(input: unknown): Attendee[] {
  if (!Array.isArray(input)) return [];
  return input
    .map((a) => ({
      name: String((a as Attendee)?.name ?? "").trim().slice(0, 80),
      title: String((a as Attendee)?.title ?? "").trim().slice(0, 80) || undefined,
    }))
    .filter((a) => a.name)
    .slice(0, 20);
}

export async function createDeck(id: string, d: DeckInput): Promise<ClientDeck> {
  await ensureShowcaseTable();
  const { rows } = await sql`
    INSERT INTO client_showcase_decks
      (id, builder_name, website, logo_url, logo_bg, attendees, meeting_date, opening_line, prepared_by)
    VALUES (
      ${id}, ${d.builder_name}, ${d.website ?? null}, ${d.logo_url ?? null},
      ${d.logo_bg ?? "light"}, ${JSON.stringify(d.attendees ?? [])}::jsonb,
      ${d.meeting_date ?? null}, ${d.opening_line ?? null}, ${d.prepared_by ?? null}
    )
    RETURNING *
  `;
  return rowToDeck(rows[0]);
}

export async function updateDeck(id: string, d: DeckInput): Promise<ClientDeck | null> {
  await ensureShowcaseTable();
  const { rows } = await sql`
    UPDATE client_showcase_decks SET
      builder_name = ${d.builder_name},
      website = ${d.website ?? null},
      logo_url = ${d.logo_url ?? null},
      logo_bg = ${d.logo_bg ?? "light"},
      attendees = ${JSON.stringify(d.attendees ?? [])}::jsonb,
      meeting_date = ${d.meeting_date ?? null},
      opening_line = ${d.opening_line ?? null},
      prepared_by = ${d.prepared_by ?? null}
    WHERE id = ${id}
    RETURNING *
  `;
  return rows[0] ? rowToDeck(rows[0]) : null;
}

export async function deleteDeck(id: string): Promise<void> {
  await ensureShowcaseTable();
  await sql`DELETE FROM client_showcase_decks WHERE id = ${id}`;
}

export async function recordDeckView(id: string): Promise<void> {
  await ensureShowcaseTable();
  await sql`
    UPDATE client_showcase_decks
    SET views = views + 1, last_viewed_at = NOW()
    WHERE id = ${id}
  `;
}

export function checkAdminKey(key: unknown): boolean {
  const expected = process.env.ADMIN_PASSWORD ?? "";
  return !!expected && typeof key === "string" && key === expected;
}
