#!/usr/bin/env node
/**
 * Upload the Toll Brothers presentation folder to Vercel Blob for
 * /tollbrothers-partnership-2027 (see src/lib/tollPartnership.ts).
 *
 *   BLOB_READ_WRITE_TOKEN=... node scripts/upload-toll-2027.mjs "/path/to/Toll Brothers meeting site" [--clean]
 *
 * index.html and data.js go under one random prefix that only the route knows
 * (TOLL_2027_PRIVATE_BASE). Everything else (photos, video, fonts, map, logos)
 * goes under a second random prefix that the browser loads from
 * (TOLL_2027_MEDIA_BASE). Re-running uploads to new prefixes; old ones stay
 * until deleted in the Vercel dashboard.
 */
import { del, list, put } from "@vercel/blob";
import { randomBytes } from "crypto";
import { readdir, readFile, stat } from "fs/promises";
import path from "path";

const root = process.argv[2];
if (!root || !process.env.BLOB_READ_WRITE_TOKEN) {
  console.error('Usage: BLOB_READ_WRITE_TOKEN=... node scripts/upload-toll-2027.mjs "<presentation folder>"');
  process.exit(1);
}
const PRIVATE = new Set(["index.html", "data.js"]);
const SKIP = /(^|\/)\.|\.DS_Store$/;
const rand = () => randomBytes(12).toString("hex");
const privatePrefix = `toll-2027-p-${rand()}`;
const mediaPrefix = `toll-2027-m-${rand()}`;

async function walk(dir, rel = "") {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const r = rel ? `${rel}/${e.name}` : e.name;
    if (SKIP.test(r)) continue;
    if (e.isDirectory()) out.push(...(await walk(path.join(dir, e.name), r)));
    else out.push(r);
  }
  return out;
}

// --clean: remove earlier uploads of this presentation (every toll-2027-* prefix) first
if (process.argv.includes("--clean")) {
  let cursor, removed = 0;
  do {
    const page = await list({ prefix: "toll-2027-", cursor, limit: 1000 });
    if (page.blobs.length) { await del(page.blobs.map((b) => b.url)); removed += page.blobs.length; }
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);
  console.log(`Removed ${removed} files from earlier uploads`);
}

const files = await walk(root);
const types = { ".html": "text/html", ".js": "text/javascript", ".jpg": "image/jpeg", ".webp": "image/webp", ".png": "image/png", ".mp4": "video/mp4", ".woff2": "font/woff2" };
let done = 0, bytes = 0, privateBase = "", mediaBase = "";

async function upload(rel) {
  const full = path.join(root, rel);
  const isPrivate = PRIVATE.has(rel);
  const size = (await stat(full)).size;
  const pathname = `${isPrivate ? privatePrefix : mediaPrefix}/${rel}`;
  const blob = await put(pathname, await readFile(full), {
    access: "public",
    addRandomSuffix: false,
    contentType: types[path.extname(rel).toLowerCase()],
    multipart: size > 20 * 1024 * 1024,
    cacheControlMaxAge: isPrivate ? 60 : 60 * 60 * 24 * 30,
  });
  const base = blob.url.slice(0, blob.url.length - rel.length);
  if (isPrivate) privateBase = base; else mediaBase = base;
  done++; bytes += size;
  if (done % 50 === 0 || done === files.length) console.log(`${done}/${files.length} files, ${(bytes / 1e6).toFixed(0)} MB`);
}

// Small pool so 2,000 files do not open 2,000 connections
const queue = [...files];
await Promise.all(Array.from({ length: 8 }, async () => { while (queue.length) await upload(queue.shift()); }));

console.log("\nAdd these to Vercel (Settings > Environment Variables, Production and Preview):");
console.log(`TOLL_2027_PRIVATE_BASE=${privateBase}`);
console.log(`TOLL_2027_MEDIA_BASE=${mediaBase}`);
console.log("TOLL_2027_PASSWORD=<the password>");
