#!/usr/bin/env node
/**
 * Upload the K. Hovnanian presentation folder to Vercel Blob for
 * /khov-partnership-2027 (see src/app/khov-partnership-2027/route.ts).
 *
 *   BLOB_READ_WRITE_TOKEN=... node scripts/upload-khov-2027.mjs "/path/to/K. Hovnanian meeting site" [--clean]
 *
 * Only the publish list goes up: index.html, data.js, fonts/, img/, map/,
 * photos/, video/. Source photos, _to_delete/ and the preview image stay local.
 * Everything lands under one random prefix. Set KHOV_2027_BASE in Vercel to the
 * printed value. Re-running uploads to a new prefix; --clean removes old ones.
 */
import { del, list, put } from "@vercel/blob";
import { randomBytes } from "crypto";
import { readdir, readFile, stat } from "fs/promises";
import path from "path";

const root = process.argv[2];
if (!root || !process.env.BLOB_READ_WRITE_TOKEN) {
  console.error('Usage: BLOB_READ_WRITE_TOKEN=... node scripts/upload-khov-2027.mjs "<presentation folder>"');
  process.exit(1);
}
const FILES = ["index.html", "data.js"];
const DIRS = ["fonts", "img", "map", "photos", "video"];
const SKIP = /(^|\/)\./;
const prefix = `khov-2027-${randomBytes(12).toString("hex")}`;

async function walk(dir, rel) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const r = `${rel}/${e.name}`;
    if (SKIP.test(r)) continue;
    if (e.isDirectory()) out.push(...(await walk(path.join(dir, e.name), r)));
    else out.push(r);
  }
  return out;
}

if (process.argv.includes("--clean")) {
  let cursor, removed = 0;
  do {
    const page = await list({ prefix: "khov-2027-", cursor, limit: 1000 });
    if (page.blobs.length) { await del(page.blobs.map((b) => b.url)); removed += page.blobs.length; }
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);
  console.log(`Removed ${removed} files from earlier uploads`);
}

const files = [...FILES];
for (const d of DIRS) files.push(...(await walk(path.join(root, d), d)));

const types = { ".html": "text/html", ".js": "text/javascript", ".jpg": "image/jpeg", ".webp": "image/webp", ".png": "image/png", ".svg": "image/svg+xml", ".mp4": "video/mp4", ".woff2": "font/woff2" };
let done = 0, bytes = 0, base = "";

async function upload(rel) {
  const full = path.join(root, rel);
  const size = (await stat(full)).size;
  const page = rel === "index.html" || rel === "data.js";
  const blob = await put(`${prefix}/${rel}`, await readFile(full), {
    access: "public",
    addRandomSuffix: false,
    contentType: types[path.extname(rel).toLowerCase()],
    multipart: size > 20 * 1024 * 1024,
    cacheControlMaxAge: page ? 60 : 60 * 60 * 24 * 30,
  });
  base = blob.url.slice(0, blob.url.length - rel.length);
  done++; bytes += size;
  if (done % 25 === 0 || done === files.length) console.log(`${done}/${files.length} files, ${(bytes / 1e6).toFixed(0)} MB`);
}

const queue = [...files];
await Promise.all(Array.from({ length: 6 }, async () => { while (queue.length) await upload(queue.shift()); }));

console.log("\nAdd this to Vercel (Settings > Environment Variables, Production and Preview):");
console.log(`KHOV_2027_BASE=${base}`);
