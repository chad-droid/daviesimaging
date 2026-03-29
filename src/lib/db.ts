import { sql } from "@vercel/postgres";

// ── Schema setup ──

export async function setupDatabase() {
  await sql`
    CREATE TABLE IF NOT EXISTS deals (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      builder TEXT,
      city TEXT,
      state TEXT,
      pipeline TEXT,
      stage TEXT,
      production_date TEXT,
      closing_date TEXT,
      model_name TEXT,
      location_name TEXT,
      project_type TEXT,
      scope TEXT,
      deliverables TEXT,
      asset_count TEXT,
      qty_images TEXT,
      client_assets TEXT,
      internal_assets TEXT,
      matterport TEXT,
      youtube TEXT,
      gif TEXT,
      project_website TEXT,
      google_maps TEXT,
      address TEXT,
      amount NUMERIC DEFAULT 0,
      status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'denied', 'archived')),
      imported BOOLEAN DEFAULT false,
      imported_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS media_files (
      id SERIAL PRIMARY KEY,
      deal_id TEXT REFERENCES deals(id),
      url TEXT NOT NULL,
      thumb_url TEXT,
      filename TEXT,
      size_bytes INTEGER,
      width INTEGER,
      height INTEGER,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS sync_log (
      id SERIAL PRIMARY KEY,
      source TEXT NOT NULL,
      deals_synced INTEGER DEFAULT 0,
      deals_new INTEGER DEFAULT 0,
      deals_updated INTEGER DEFAULT 0,
      synced_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  return { success: true };
}

// ── Deal queries ──

export async function getDeals(filters?: {
  status?: string;
  builder?: string;
  state?: string;
  pipeline?: string;
  search?: string;
  imported?: boolean;
}) {
  let query = `SELECT * FROM deals WHERE 1=1`;
  const params: (string | boolean)[] = [];
  let i = 1;

  if (filters?.status) {
    query += ` AND status = $${i++}`;
    params.push(filters.status);
  }
  if (filters?.builder) {
    query += ` AND builder = $${i++}`;
    params.push(filters.builder);
  }
  if (filters?.state) {
    query += ` AND state = $${i++}`;
    params.push(filters.state);
  }
  if (filters?.pipeline) {
    query += ` AND pipeline = $${i++}`;
    params.push(filters.pipeline);
  }
  if (filters?.search) {
    query += ` AND (name ILIKE $${i} OR builder ILIKE $${i} OR city ILIKE $${i} OR address ILIKE $${i})`;
    params.push(`%${filters.search}%`);
    i++;
  }
  if (filters?.imported !== undefined) {
    query += ` AND imported = $${i++}`;
    params.push(filters.imported);
  }

  query += ` ORDER BY amount DESC NULLS LAST`;

  const result = await sql.query(query, params);
  return result.rows;
}

export async function updateDealStatus(
  id: string,
  status: "pending" | "approved" | "denied" | "archived",
) {
  await sql`
    UPDATE deals
    SET status = ${status}, updated_at = NOW()
    WHERE id = ${id}
  `;
}

export async function updateDealImported(id: string, imported: boolean) {
  await sql`
    UPDATE deals
    SET imported = ${imported}, imported_at = ${imported ? new Date().toISOString() : null}, updated_at = NOW()
    WHERE id = ${id}
  `;
}

export async function bulkUpdateStatus(
  ids: string[],
  status: "pending" | "approved" | "denied" | "archived",
) {
  for (const id of ids) {
    await updateDealStatus(id, status);
  }
}

export async function getDealStats() {
  const result = await sql`
    SELECT
      COUNT(*) as total,
      COUNT(*) FILTER (WHERE status = 'approved') as approved,
      COUNT(*) FILTER (WHERE status = 'denied') as denied,
      COUNT(*) FILTER (WHERE status = 'archived') as archived,
      COUNT(*) FILTER (WHERE status = 'pending') as pending,
      COUNT(*) FILTER (WHERE imported = true) as imported
    FROM deals
  `;
  return result.rows[0];
}

export async function getLastSync() {
  const result = await sql`
    SELECT * FROM sync_log ORDER BY synced_at DESC LIMIT 1
  `;
  return result.rows[0] || null;
}

export async function getUniqueValues() {
  const builders = await sql`SELECT DISTINCT builder FROM deals WHERE builder IS NOT NULL ORDER BY builder`;
  const states = await sql`SELECT DISTINCT state FROM deals WHERE state IS NOT NULL ORDER BY state`;
  const pipelines = await sql`SELECT DISTINCT pipeline FROM deals WHERE pipeline IS NOT NULL ORDER BY pipeline`;
  return {
    builders: builders.rows.map((r) => r.builder),
    states: states.rows.map((r) => r.state),
    pipelines: pipelines.rows.map((r) => r.pipeline),
  };
}
