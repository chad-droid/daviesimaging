"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SHORE_GALLERIES, type EventImage } from "@/app/shoresummitphotos2026/galleries";

// Admin: upload and manage the Shore Summit event galleries. Auto-gated by the
// /admin AdminAuth wall. Writes additionally send the admin password (stored in
// sessionStorage), which the API routes verify server-side.

const KEY_STORAGE = "dig-event-key";

type UploadState = { name: string; status: string };

export default function EventGalleryAdmin() {
  const [gallery, setGallery] = useState<string>(SHORE_GALLERIES[0].slug);
  const [adminKey, setAdminKey] = useState("");
  const [images, setImages] = useState<EventImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState(false);
  const [uploads, setUploads] = useState<UploadState[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const dragFrom = useRef<number | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setAdminKey(sessionStorage.getItem(KEY_STORAGE) || "");
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/event-gallery?gallery=${gallery}`);
      const data = await res.json();
      setImages(data.images || []);
    } catch {
      setImages([]);
    }
    setLoading(false);
  }, [gallery]);

  useEffect(() => {
    load();
  }, [load]);

  function saveKey(k: string) {
    setAdminKey(k);
    try { sessionStorage.setItem(KEY_STORAGE, k); } catch {}
  }

  async function handleFiles(files: FileList | File[]) {
    if (!adminKey) { alert("Enter the admin password first."); return; }
    const arr = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (!arr.length) return;
    setBusy(true);
    const { upload } = await import("@vercel/blob/client");
    for (const file of arr) {
      setUploads((u) => [...u, { name: file.name, status: "uploading" }]);
      try {
        const blob = await upload(`shore-temp/${gallery}/${file.name}`, file, {
          access: "public",
          handleUploadUrl: "/api/event-gallery/upload",
          clientPayload: adminKey,
        });
        setUploads((u) => u.map((x) => (x.name === file.name ? { ...x, status: "optimizing" } : x)));
        const res = await fetch("/api/event-gallery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ gallery, blobUrl: blob.url, filename: file.name, adminKey }),
        });
        if (!res.ok) throw new Error((await res.json()).error || "process failed");
        setUploads((u) => u.map((x) => (x.name === file.name ? { ...x, status: "done" } : x)));
      } catch (e) {
        setUploads((u) => u.map((x) => (x.name === file.name ? { ...x, status: `error: ${e}` } : x)));
      }
    }
    await load();
    setBusy(false);
    setTimeout(() => setUploads([]), 4000);
  }

  async function remove(id: number) {
    if (!confirm("Delete this photo permanently?")) return;
    const res = await fetch("/api/event-gallery", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, adminKey }),
    });
    if (res.ok) setImages((imgs) => imgs.filter((i) => i.id !== id));
    else alert("Delete failed: " + ((await res.json()).error || res.status));
  }

  async function persistOrder(newImages: EventImage[]) {
    setImages(newImages);
    await fetch("/api/event-gallery", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderedIds: newImages.map((i) => i.id), adminKey }),
    });
  }

  function onDropReorder(to: number) {
    const from = dragFrom.current;
    dragFrom.current = null;
    if (from === null || from === to) return;
    const arr = [...images];
    const [moved] = arr.splice(from, 1);
    arr.splice(to, 0, moved);
    persistOrder(arr);
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="mb-1 text-2xl font-bold text-text-dark">Shore Summit Event Galleries</h1>
      <p className="mb-6 text-sm text-text-muted">
        Upload and arrange photos for each gallery. Images are optimized on upload (full-res is never stored).
      </p>

      {/* Admin key */}
      <div className="mb-6 rounded-lg border border-border-light bg-bg-light p-4">
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-muted">
          Admin password (enables upload / edit)
        </label>
        <input
          type="password"
          value={adminKey}
          onChange={(e) => saveKey(e.target.value)}
          placeholder="Enter admin password"
          className="w-full max-w-sm rounded-md border border-border-light px-3 py-2 text-sm outline-none focus:border-accent"
        />
      </div>

      {/* Gallery tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {SHORE_GALLERIES.map((g) => (
          <button
            key={g.slug}
            onClick={() => setGallery(g.slug)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              gallery === g.slug ? "bg-accent text-white" : "bg-bg-light text-text-dark hover:bg-border-light"
            }`}
          >
            {g.title}
          </button>
        ))}
      </div>

      {/* Dropzone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
        onClick={() => fileInput.current?.click()}
        className={`mb-4 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-10 text-center transition-colors ${
          dragOver ? "border-accent bg-accent/5" : "border-border-light bg-bg-light"
        }`}
      >
        <p className="text-sm font-semibold text-text-dark">Drag photos here, or click to choose</p>
        <p className="mt-1 text-xs text-text-muted">JPG, PNG, HEIC, or WebP. Multiple at once is fine.</p>
        <input
          ref={fileInput}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => { if (e.target.files) handleFiles(e.target.files); e.target.value = ""; }}
        />
      </div>

      {/* Upload progress */}
      {uploads.length > 0 && (
        <div className="mb-6 space-y-1 rounded-lg border border-border-light bg-bg-light p-3 text-xs">
          {uploads.map((u, i) => (
            <div key={i} className="flex justify-between">
              <span className="truncate text-text-dark">{u.name}</span>
              <span className={u.status.startsWith("error") ? "text-red-600" : u.status === "done" ? "text-green-600" : "text-text-muted"}>
                {u.status}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Current images */}
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-text-muted">
          {images.length} photo{images.length === 1 ? "" : "s"} {busy && "· working…"}
        </h2>
        {images.length > 1 && <span className="text-xs text-text-muted">Drag to reorder</span>}
      </div>

      {loading ? (
        <p className="py-10 text-center text-sm text-text-muted">Loading…</p>
      ) : (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
          {images.map((img, idx) => (
            <div
              key={img.id}
              draggable
              onDragStart={() => (dragFrom.current = idx)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => onDropReorder(idx)}
              className="group relative aspect-square overflow-hidden rounded-lg border border-border-light bg-bg-light"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.thumb_url} alt={img.filename || ""} className="h-full w-full cursor-move object-cover" />
              <button
                onClick={() => remove(img.id)}
                className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity hover:bg-red-600 group-hover:opacity-100"
                title="Delete"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M4 4l6 6M10 4l-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
              </button>
              <span className="absolute bottom-1 left-1 rounded bg-black/50 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                {idx + 1}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
