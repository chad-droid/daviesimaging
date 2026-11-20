#!/usr/bin/env node
/**
 * Upload the ModelMatch demo folder to Vercel Blob for /modelmatchdemo2027
 * (see src/app/modelmatchdemo2027/route.ts).
 *
 *   BLOB_READ_WRITE_TOKEN=... node scripts/upload-modelmatch-2027.mjs "/path/to/ModelMatch demo 2027" [--clean]
 *
 * Uploads index.html, fonts/, img/ and photos/ under one random prefix. Set
 * MODELMATCH_2027_BASE in Vercel to the printed value. --clean removes earlier uploads.
 */
import { del, list, put } from "@vercel/blob";
import { randomBytes } from "crypto";
import { readdir, readFile } from "fs/promises";
import path from "path";

const root = process.argv[2];
if (!root || !process.env.BLOB_READ_WRITE_TOKEN) {
  console.error('Usage: BLOB_READ_WRITE_TOKEN=... node scripts/upload-modelmatch-2027.mjs "<folder>"');
  process.exit(1);
}
const prefix = `modelmatch-2027-${randomBytes(12).toString("hex")}`;

async function walk(dir, rel) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    if (e.name.startsWith(".")) continue;
    const r = `${rel}/${e.name}`;
    if (e.isDirectory()) out.push(...(await walk(path.join(dir, e.name), r)));
    else out.push(r);
  }
  return out;
}

if (process.argv.includes("--clean")) {
  let cursor, removed = 0;
  do {
    const page = await list({ prefix: "modelmatch-2027-", cursor, limit: 1000 });
    if (page.blobs.length) { await del(page.blobs.map((b) => b.url)); removed += page.blobs.length; }
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);
  console.log(`Removed ${removed} files from earlier uploads`);
}

const files = ["index.html"];
for (const d of ["fonts", "img", "photos"]) files.push(...(await walk(path.join(root, d), d)));
const types = { ".html": "text/html", ".jpg": "image/jpeg", ".png": "image/png", ".woff2": "font/woff2" };
let base = "";
const queue = [...files];
await Promise.all(Array.from({ length: 6 }, async () => {
  while (queue.length) {
    const rel = queue.shift();
    const blob = await put(`${prefix}/${rel}`, await readFile(path.join(root, rel)), {
      access: "public",
      addRandomSuffix: false,
      contentType: types[path.extname(rel).toLowerCase()],
      cacheControlMaxAge: rel === "index.html" ? 60 : 60 * 60 * 24 * 30,
    });
    base = blob.url.slice(0, blob.url.length - rel.length);
  }
}));
console.log(`${files.length} files uploaded.\n\nAdd this to Vercel (Production and Preview):`);
console.log(`MODELMATCH_2027_BASE=${base}`);
