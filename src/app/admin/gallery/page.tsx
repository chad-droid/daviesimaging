"use client";

/**
 * Admin Gallery Curation
 * - Assign projects to gallery pages
 * - Set cover image per project
 * - Hide/show individual images
 * - Drag-to-reorder projects within a gallery
 */

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

const GALLERY_PAGES = [
  { label: "Listings",  slug: "/gallery/listings"  },
  { label: "Models",    slug: "/gallery/models"     },
  { label: "Amenities", slug: "/gallery/amenities"  },
  { label: "Lifestyle", slug: "/gallery/lifestyle"  },
];

interface AssignedProject {
  deal_id: string;
  deal_name: string;
  builder: string;
  city: string;
  state: string;
  pipeline: string;
  sort_order: number;
  cover_image_id: number | null;
  hidden_image_ids: number[];
}

interface CurationImage {
  id: number;
  url: string;
  thumb_url: string;
  filename: string;
  description: string | null;
}

interface AvailableProject {
  id: string;
  name: string;
  builder: string;
  city: string;
  state: string;
  pipeline: string;
  image_count: number;
}

// ── Image curation panel for one project ─────────────────────────────────────
function ImageCurationPanel({
  dealId,
  pageSlug,
  coverId,
  hiddenIds,
  onUpdate,
}: {
  dealId: string;
  pageSlug: string;
  coverId: number | null;
  hiddenIds: number[];
  onUpdate: (coverId: number | null, hiddenIds: number[]) => void;
}) {
  const [images, setImages] = useState<CurationImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<string | null>(null);
  const [fileDropOver, setFileDropOver] = useState(false);
  const [localCover, setLocalCover] = useState<number | null>(coverId);
  const [localHidden, setLocalHidden] = useState<Set<number>>(new Set(hiddenIds));
  const [orderChanged, setOrderChanged] = useState(false);

  // Drag-to-reorder state
  const dragIdx = useRef<number | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);

  useEffect(() => {
    setLocalCover(coverId);
    setLocalHidden(new Set(hiddenIds));
  }, [coverId, hiddenIds]);

  const loadImages = useCallback(() => {
    setLoading(true);
    fetch(`/api/gallery/curate?dealId=${dealId}&page=${encodeURIComponent(pageSlug)}`)
      .then((r) => r.json())
      .then((data) => {
        setImages(data.files || []);
        setOrderChanged(false);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [dealId, pageSlug]);

  useEffect(() => { loadImages(); }, [loadImages]);

  // ── File upload ──────────────────────────────────────────────────────────────
  async function handleUpload(files: FileList | File[]) {
    const imageFiles = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (!imageFiles.length) return;
    setUploading(true);
    setUploadResult(null);
    const fd = new FormData();
    fd.set("dealId", dealId);
    imageFiles.forEach((f) => fd.append("files", f));
    try {
      const res = await fetch("/api/media/upload", { method: "POST", body: fd });
      const data = await res.json();
      const count = data.imported || 0;
      setUploadResult(count > 0 ? `${count} image${count !== 1 ? "s" : ""} uploaded` : "Upload failed");
      if (count > 0) loadImages();
    } catch {
      setUploadResult("Upload error");
    }
    setUploading(false);
  }

  // ── Image drag-to-reorder handlers ──────────────────────────────────────────
  function handleImageDragStart(e: React.DragEvent, i: number) {
    dragIdx.current = i;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", String(i)); // marks as internal sort drag
  }

  function handleImageDragEnter(i: number) {
    if (dragIdx.current !== null) setDragOverIdx(i);
  }

  function handleImageDrop(e: React.DragEvent, targetIdx: number) {
    e.preventDefault();
    const from = dragIdx.current;
    if (from === null || from === targetIdx) { setDragOverIdx(null); return; }
    const reordered = [...images];
    const [moved] = reordered.splice(from, 1);
    reordered.splice(targetIdx, 0, moved);
    setImages(reordered);
    setOrderChanged(true);
    setDragOverIdx(null);
    dragIdx.current = null;
  }

  function handleImageDragEnd() {
    setDragOverIdx(null);
    dragIdx.current = null;
  }

  // ── Save ─────────────────────────────────────────────────────────────────────
  async function save() {
    setSaving(true);
    await fetch("/api/gallery/curate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pageSlug,
        dealId,
        coverId: localCover,
        hiddenIds: Array.from(localHidden),
        imageOrder: images.map((img) => img.id),
      }),
    });
    setSaving(false);
    setOrderChanged(false);
    onUpdate(localCover, Array.from(localHidden));
  }

  function toggleHide(id: number) {
    setLocalHidden((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const hasChanges =
    orderChanged ||
    localCover !== coverId ||
    JSON.stringify(Array.from(localHidden).sort()) !== JSON.stringify([...hiddenIds].sort());

  return (
    <div className="border-t border-[#2C2C2C] bg-[#0f0f0f] px-5 py-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#A8A2D0]">
          Image Curation — {images.length} images
        </p>
        <div className="flex items-center gap-3">
          <p className="text-[10px] text-[#555]">drag to reorder &nbsp;·&nbsp; ★ cover &nbsp;·&nbsp; 👁 show/hide</p>
          {hasChanges && (
            <button
              onClick={save}
              disabled={saving}
              className="rounded-full bg-[#6A5ACD] px-4 py-1.5 text-[10px] font-semibold text-white hover:bg-[#5848B5] disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save changes"}
            </button>
          )}
        </div>
      </div>

      {/* File upload zone — only responds to external file drops, not sort drags */}
      <div
        onDragOver={(e) => {
          // Only highlight for external file drops
          if (dragIdx.current === null && e.dataTransfer.types.includes("Files")) {
            e.preventDefault();
            setFileDropOver(true);
          }
        }}
        onDragLeave={() => setFileDropOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setFileDropOver(false);
          if (dragIdx.current === null && e.dataTransfer.files.length > 0) {
            handleUpload(e.dataTransfer.files);
          }
        }}
        onClick={() => {
          const input = document.createElement("input");
          input.type = "file";
          input.accept = "image/*";
          input.multiple = true;
          input.onchange = () => { if (input.files) handleUpload(input.files); };
          input.click();
        }}
        className={`mb-3 cursor-pointer rounded-lg border-2 border-dashed p-3 text-center transition-colors ${
          fileDropOver ? "border-[#6A5ACD] bg-[#6A5ACD]/10" : "border-[#2C2C2C] hover:border-[#6A5ACD]/50"
        }`}
      >
        {uploading ? (
          <p className="text-[11px] text-[#A8A2D0]">Uploading and optimizing...</p>
        ) : (
          <p className="text-[11px] text-[#555]">
            {images.length === 0 ? "Drop images here or click to upload" : "Upload more images"}
          </p>
        )}
        {uploadResult && (
          <p className={`mt-1 text-[10px] ${uploadResult.includes("uploaded") ? "text-[#4CAF50]" : "text-[#E57373]"}`}>
            {uploadResult}
          </p>
        )}
      </div>

      {loading ? (
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-8">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="aspect-[4/3] animate-pulse rounded bg-[#2C2C2C]" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-8">
          {images.map((img, i) => {
            const isCover = localCover === img.id;
            const isHidden = localHidden.has(img.id);
            const isDragTarget = dragOverIdx === i;
            return (
              <div
                key={img.id}
                draggable
                onDragStart={(e) => handleImageDragStart(e, i)}
                onDragEnter={() => handleImageDragEnter(i)}
                onDragOver={(e) => { e.preventDefault(); }}
                onDrop={(e) => handleImageDrop(e, i)}
                onDragEnd={handleImageDragEnd}
                className={`group relative aspect-[4/3] cursor-grab overflow-hidden rounded transition-all active:cursor-grabbing active:opacity-50 ${
                  isHidden ? "opacity-30" : ""
                } ${isCover ? "ring-2 ring-[#6A5ACD] ring-offset-1 ring-offset-[#0f0f0f]" : ""}
                ${isDragTarget ? "ring-2 ring-[#F9A825] ring-offset-1 ring-offset-[#0f0f0f]" : ""}`}
              >
                <Image
                  src={img.thumb_url || img.url}
                  alt={img.description || img.filename}
                  fill
                  className="pointer-events-none object-cover"
                  sizes="80px"
                />

                {/* Position badge — visible at rest, hidden on hover */}
                <span className="absolute bottom-1 right-1 rounded bg-black/60 px-1 py-0.5 text-[8px] font-bold text-white/70 group-hover:hidden">
                  {i + 1}
                </span>

                {/* Controls overlay — hover only */}
                <div className="absolute inset-0 flex items-center justify-center gap-1 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    onClick={(e) => { e.stopPropagation(); setLocalCover(isCover ? null : img.id); }}
                    title={isCover ? "Remove cover" : "Set as cover"}
                    className={`rounded p-1.5 text-xs transition-colors ${
                      isCover ? "bg-[#6A5ACD] text-white" : "bg-black/70 text-white/70 hover:text-white"
                    }`}
                  >
                    ★
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleHide(img.id); }}
                    title={isHidden ? "Show image" : "Hide image"}
                    className="rounded bg-black/70 p-1.5 text-xs text-white/70 transition-colors hover:text-white"
                  >
                    {isHidden ? "👁‍🗨" : "👁"}
                  </button>
                </div>

                {isCover && (
                  <span className="absolute left-1 top-1 rounded bg-[#6A5ACD] px-1.5 py-0.5 text-[9px] font-bold text-white">
                    COVER
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── Create manual project modal ───────────────────────────────────────────────
function CreateManualProjectModal({
  pageSlug,
  onCreated,
  onClose,
}: {
  pageSlug: string;
  onCreated: (project: AvailableProject) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState({ name: "", builder: "", city: "", state: "", pipeline: "Premium", youtube: "" });
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const PIPELINES = ["Premium", "Listing", "Video Production", "Virtual Staging", "Virtual Video", "Matterport", "Spec+"];

  async function create() {
    if (!form.name.trim() || !form.builder.trim()) { setError("Project name and builder are required."); return; }
    setCreating(true);
    setError(null);
    try {
      // 1. Create the deal
      const res = await fetch("/api/gallery/manual", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.error) { setError(data.error); setCreating(false); return; }

      // 2. Assign to the current gallery page
      await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pageSlug, dealId: data.dealId }),
      });

      onCreated({ id: data.dealId, name: form.name, builder: form.builder, city: form.city, state: form.state, pipeline: form.pipeline, image_count: 0 });
    } catch (e) {
      setError(String(e));
    }
    setCreating(false);
  }

  function field(key: keyof typeof form, label: string, placeholder?: string) {
    return (
      <div>
        <label className="mb-1 block text-[10px] uppercase tracking-widest text-[#666]">{label}</label>
        <input
          type="text"
          value={form[key]}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          placeholder={placeholder}
          className="w-full rounded border border-[#2C2C2C] bg-[#121212] px-3 py-2 text-sm text-[#F5F5F5] outline-none focus:border-[#6A5ACD]"
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/80 p-4 pt-16" onClick={onClose}>
      <div className="w-full max-w-md rounded-lg bg-[#1E1E1E] shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-[#2C2C2C] px-6 py-4">
          <div>
            <p className="text-sm font-semibold text-[#F5F5F5]">Create Manual Project</p>
            <p className="mt-0.5 text-[10px] text-[#555]">No Zoho deal required. Upload images after creating.</p>
          </div>
          <button onClick={onClose} className="text-[#666] hover:text-[#F5F5F5]">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="space-y-4 p-6">
          {field("name", "Project Name *", "e.g. Highland Reserve Model Home")}
          {field("builder", "Builder *", "e.g. Toll Brothers")}
          <div className="grid grid-cols-2 gap-3">
            {field("city", "City", "e.g. Denver")}
            {field("state", "State", "CO")}
          </div>
          <div>
            <label className="mb-1 block text-[10px] uppercase tracking-widest text-[#666]">Service Type</label>
            <select
              value={form.pipeline}
              onChange={(e) => setForm({ ...form, pipeline: e.target.value })}
              className="w-full rounded border border-[#2C2C2C] bg-[#121212] px-3 py-2 text-sm text-[#F5F5F5] outline-none focus:border-[#6A5ACD]"
            >
              {PIPELINES.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          {field("youtube", "YouTube URL (optional)", "https://youtu.be/...")}

          {error && <p className="text-xs text-[#E57373]">{error}</p>}

          <p className="text-[10px] leading-relaxed text-[#555]">
            After creating, use the Media Library to upload images to this project, then use &quot;Curate Images&quot; to set the cover.
          </p>
        </div>
        <div className="flex justify-end gap-2 border-t border-[#2C2C2C] px-6 py-4">
          <button onClick={onClose} className="rounded-full border border-[#2C2C2C] px-4 py-2 text-xs font-semibold text-[#A8A2D0]">Cancel</button>
          <button
            onClick={create}
            disabled={creating}
            className="rounded-full bg-[#6A5ACD] px-5 py-2 text-xs font-semibold text-white hover:bg-[#5848B5] disabled:opacity-50"
          >
            {creating ? "Creating..." : "Create Project"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Edit project modal ────────────────────────────────────────────────────────
function EditProjectModal({
  project,
  onSaved,
  onClose,
}: {
  project: AssignedProject;
  onSaved: (updated: Partial<AssignedProject>) => void;
  onClose: () => void;
}) {
  const PIPELINES = ["Premium", "Listing", "Video Production", "Virtual Staging", "Virtual Video", "Matterport", "Spec+", "Lifestyle", "Amenity"];
  const [form, setForm] = useState({
    name: project.deal_name,
    builder: project.builder,
    city: project.city,
    state: project.state,
    pipeline: project.pipeline,
    youtube: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function save() {
    if (!form.name.trim() || !form.builder.trim()) { setError("Name and builder are required."); return; }
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/gallery/manual", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dealId: project.deal_id, ...form }),
      });
      const data = await res.json();
      if (data.error) { setError(data.error); setSaving(false); return; }
      onSaved({ deal_name: form.name, builder: form.builder, city: form.city, state: form.state, pipeline: form.pipeline });
    } catch (e) {
      setError(String(e));
    }
    setSaving(false);
  }

  function field(key: keyof typeof form, label: string, placeholder?: string) {
    return (
      <div>
        <label className="mb-1 block text-[10px] uppercase tracking-widest text-[#666]">{label}</label>
        <input
          type="text"
          value={form[key]}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          placeholder={placeholder}
          className="w-full rounded border border-[#2C2C2C] bg-[#121212] px-3 py-2 text-sm text-[#F5F5F5] outline-none focus:border-[#6A5ACD]"
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/80 p-4 pt-16" onClick={onClose}>
      <div className="w-full max-w-md rounded-lg bg-[#1E1E1E] shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-[#2C2C2C] px-6 py-4">
          <div>
            <p className="text-sm font-semibold text-[#F5F5F5]">Edit Project</p>
            <p className="mt-0.5 text-[10px] text-[#555]">Updates name, builder, location, service, and region tag.</p>
          </div>
          <button onClick={onClose} className="text-[#666] hover:text-[#F5F5F5]">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="space-y-4 p-6">
          {field("name", "Project Name *")}
          {field("builder", "Builder *")}
          <div className="grid grid-cols-2 gap-3">
            {field("city", "City")}
            {field("state", "State (2-letter)", "TX")}
          </div>
          <div>
            <label className="mb-1 block text-[10px] uppercase tracking-widest text-[#666]">Service / Region Tag</label>
            <select
              value={form.pipeline}
              onChange={(e) => setForm({ ...form, pipeline: e.target.value })}
              className="w-full rounded border border-[#2C2C2C] bg-[#121212] px-3 py-2 text-sm text-[#F5F5F5] outline-none focus:border-[#6A5ACD]"
            >
              {PIPELINES.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          {field("youtube", "YouTube URL (optional)", "https://youtu.be/...")}
          <p className="text-[10px] leading-relaxed text-[#555]">
            The State field controls which region filter this project appears under (e.g. TX = Central, CA = West, FL = East, CO = Mountain).
          </p>
          {error && <p className="text-xs text-[#E57373]">{error}</p>}
        </div>
        <div className="flex justify-end gap-2 border-t border-[#2C2C2C] px-6 py-4">
          <button onClick={onClose} className="rounded-full border border-[#2C2C2C] px-4 py-2 text-xs font-semibold text-[#A8A2D0]">Cancel</button>
          <button
            onClick={save}
            disabled={saving}
            className="rounded-full bg-[#6A5ACD] px-5 py-2 text-xs font-semibold text-white hover:bg-[#5848B5] disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Add project modal ─────────────────────────────────────────────────────────
function AddProjectModal({
  pageSlug,
  assignedIds,
  onAdd,
  onClose,
}: {
  pageSlug: string;
  assignedIds: Set<string>;
  onAdd: (project: AvailableProject) => void;
  onClose: () => void;
}) {
  const [projects, setProjects] = useState<AvailableProject[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const url = search
      ? `/api/gallery?search=${encodeURIComponent(search)}`
      : `/api/gallery`;
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        setProjects(data.projects || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [search]);

  async function addProject(p: AvailableProject) {
    setAdding(p.id);
    await fetch("/api/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pageSlug, dealId: p.id }),
    });
    setAdding(null);
    onAdd(p);
  }

  const available = projects.filter((p) => !assignedIds.has(p.id));

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/80 p-4 pt-16"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-lg bg-[#1E1E1E] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#2C2C2C] px-6 py-4">
          <p className="text-sm font-semibold text-[#F5F5F5]">Add Projects to Gallery</p>
          <button onClick={onClose} className="text-[#666] hover:text-[#F5F5F5]">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-4">
          <input
            type="text"
            placeholder="Search by builder, project, or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
            className="mb-4 w-full rounded border border-[#2C2C2C] bg-[#121212] px-3 py-2 text-sm text-[#F5F5F5] outline-none placeholder:text-[#555] focus:border-[#6A5ACD]"
          />
          <div className="max-h-[50vh] space-y-1.5 overflow-y-auto">
            {loading && (
              <p className="py-8 text-center text-xs text-[#666]">Loading projects...</p>
            )}
            {!loading && available.length === 0 && (
              <p className="py-8 text-center text-xs text-[#666]">
                {search ? "No matching projects." : "All projects already assigned."}
              </p>
            )}
            {!loading && available.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between rounded border border-[#2C2C2C] bg-[#121212] px-4 py-2.5"
              >
                <div>
                  <p className="text-sm text-[#F5F5F5]">{p.name}</p>
                  <p className="text-[10px] text-[#666]">
                    {p.builder} | {p.city}{p.state ? `, ${p.state}` : ""} | {p.image_count} images
                  </p>
                </div>
                <button
                  onClick={() => addProject(p)}
                  disabled={adding === p.id}
                  className="ml-4 shrink-0 rounded-full bg-[#6A5ACD] px-3 py-1.5 text-[10px] font-semibold text-white hover:bg-[#5848B5] disabled:opacity-50"
                >
                  {adding === p.id ? "Adding..." : "Add"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function AdminGalleryPage() {
  const [activeSlug, setActiveSlug] = useState(GALLERY_PAGES[0].slug);
  const [projects, setProjects] = useState<AssignedProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingProject, setEditingProject] = useState<AssignedProject | null>(null);
  const [saving, setSaving] = useState(false);

  // Drag state
  const dragIndex = useRef<number | null>(null);
  const [dragOver, setDragOver] = useState<number | null>(null);

  const fetchAssignments = useCallback(async () => {
    setLoading(true);
    setExpandedId(null);
    try {
      const res = await fetch(`/api/gallery?action=assignments&page=${encodeURIComponent(activeSlug)}`);
      const data = await res.json();
      setProjects(
        (data.assignments || []).map((a: AssignedProject) => ({
          ...a,
          hidden_image_ids: a.hidden_image_ids || [],
        }))
      );
    } catch {
      setProjects([]);
    }
    setLoading(false);
  }, [activeSlug]);

  useEffect(() => { fetchAssignments(); }, [fetchAssignments]);

  async function removeProject(dealId: string) {
    await fetch("/api/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pageSlug: activeSlug, dealId, action: "remove" }),
    });
    setProjects((prev) => prev.filter((p) => p.deal_id !== dealId));
    if (expandedId === dealId) setExpandedId(null);
  }

  async function saveOrder(ordered: AssignedProject[]) {
    setSaving(true);
    await fetch("/api/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pageSlug: activeSlug,
        action: "reorder",
        order: ordered.map((p) => p.deal_id),
      }),
    });
    setSaving(false);
  }

  // Drag handlers
  function handleDragStart(i: number) {
    dragIndex.current = i;
  }

  function handleDragEnter(i: number) {
    setDragOver(i);
  }

  function handleDrop(targetIndex: number) {
    const from = dragIndex.current;
    if (from === null || from === targetIndex) { setDragOver(null); return; }
    const reordered = [...projects];
    const [moved] = reordered.splice(from, 1);
    reordered.splice(targetIndex, 0, moved);
    setProjects(reordered);
    setDragOver(null);
    dragIndex.current = null;
    saveOrder(reordered);
  }

  function handleCurationUpdate(dealId: string, coverId: number | null, hiddenIds: number[]) {
    setProjects((prev) =>
      prev.map((p) =>
        p.deal_id === dealId ? { ...p, cover_image_id: coverId, hidden_image_ids: hiddenIds } : p
      )
    );
  }

  const assignedIds = new Set(projects.map((p) => p.deal_id));

  return (
    <div className="min-h-screen bg-[#121212] text-[#F5F5F5]">
      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-[#2C2C2C] bg-[#1E1E1E] px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-[#F5F5F5]" style={{ fontSize: "1.125rem" }}>
              Gallery Curation
            </h1>
            <p className="text-xs text-[#A8A2D0]">
              Assign projects, set covers, hide images, drag to reorder
            </p>
          </div>
        </div>
      </div>

      {/* Gallery tabs */}
      <div className="border-b border-[#2C2C2C] bg-[#1E1E1E] px-6">
        <div className="mx-auto flex max-w-6xl gap-1">
          {GALLERY_PAGES.map((page) => (
            <button
              key={page.slug}
              onClick={() => setActiveSlug(page.slug)}
              className={`border-b-2 px-5 py-3 text-xs font-semibold transition-colors ${
                activeSlug === page.slug
                  ? "border-[#6A5ACD] text-[#F5F5F5]"
                  : "border-transparent text-[#666] hover:text-[#A8A2D0]"
              }`}
            >
              {page.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-6 py-6">
        {/* Toolbar */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-xs text-[#666]">
            {projects.length} project{projects.length !== 1 ? "s" : ""}
            {saving && <span className="ml-2 text-[#A8A2D0]">Saving order...</span>}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setShowCreateModal(true)}
              className="rounded-full border border-[#2C2C2C] px-4 py-2 text-xs font-semibold text-[#A8A2D0] transition-colors hover:border-[#6A5ACD] hover:text-[#6A5ACD]"
            >
              + Create Manual Project
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="rounded-full bg-[#6A5ACD] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#5848B5]"
            >
              + Add Project
            </button>
          </div>
        </div>

        {loading && (
          <div className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-16 animate-pulse rounded-lg bg-[#1E1E1E]" />
            ))}
          </div>
        )}

        {!loading && projects.length === 0 && (
          <div className="rounded-lg border border-dashed border-[#2C2C2C] py-20 text-center">
            <p className="text-sm text-[#666]">No projects assigned to this gallery.</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="mt-3 rounded-full bg-[#6A5ACD] px-5 py-2 text-xs font-semibold text-white hover:bg-[#5848B5]"
            >
              Add your first project
            </button>
          </div>
        )}

        {/* Project list */}
        <div className="space-y-1">
          {projects.map((project, i) => {
            const isExpanded = expandedId === project.deal_id;
            const isDragTarget = dragOver === i;
            return (
              <div
                key={project.deal_id}
                draggable
                onDragStart={() => handleDragStart(i)}
                onDragEnter={() => handleDragEnter(i)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(i)}
                onDragEnd={() => { setDragOver(null); dragIndex.current = null; }}
                className={`rounded-lg border transition-all ${
                  isDragTarget
                    ? "border-[#6A5ACD] bg-[#6A5ACD]/10"
                    : "border-[#2C2C2C] bg-[#1E1E1E]"
                }`}
              >
                {/* Row */}
                <div className="flex items-center gap-3 px-4 py-3">
                  {/* Drag handle */}
                  <div className="cursor-grab text-[#444] active:cursor-grabbing">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M7 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
                    </svg>
                  </div>

                  {/* Order badge */}
                  <span className="w-6 text-center text-[10px] font-bold text-[#555]">{i + 1}</span>

                  {/* Project info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#F5F5F5] truncate">{project.deal_name}</p>
                    <p className="text-[10px] text-[#666]">
                      {project.builder}
                      {project.city ? ` | ${project.city}` : ""}
                      {project.state ? `, ${project.state}` : ""}
                      {project.pipeline ? ` | ${project.pipeline}` : ""}
                    </p>
                  </div>

                  {/* Curation badges */}
                  <div className="flex items-center gap-2 shrink-0">
                    {project.cover_image_id && (
                      <span className="rounded-full bg-[#6A5ACD]/20 px-2 py-0.5 text-[9px] font-semibold text-[#A8A2D0]">
                        ★ Cover set
                      </span>
                    )}
                    {project.hidden_image_ids.length > 0 && (
                      <span className="rounded-full bg-[#E57373]/10 px-2 py-0.5 text-[9px] font-semibold text-[#E57373]">
                        {project.hidden_image_ids.length} hidden
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : project.deal_id)}
                    className={`rounded-full px-3 py-1.5 text-[10px] font-semibold transition-colors ${
                      isExpanded
                        ? "bg-[#6A5ACD] text-white"
                        : "border border-[#2C2C2C] text-[#A8A2D0] hover:border-[#6A5ACD] hover:text-[#6A5ACD]"
                    }`}
                  >
                    {isExpanded ? "Close" : "Curate Images"}
                  </button>
                  {/* Edit metadata */}
                  <button
                    onClick={() => setEditingProject(project)}
                    title="Edit project metadata"
                    className="rounded p-1.5 text-[#555] transition-colors hover:text-[#A8A2D0]"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
                    </svg>
                  </button>
                  <button
                    onClick={() => removeProject(project.deal_id)}
                    title="Remove from gallery"
                    className="rounded p-1.5 text-[#555] transition-colors hover:text-[#E57373]"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Image curation panel */}
                {isExpanded && (
                  <ImageCurationPanel
                    dealId={project.deal_id}
                    pageSlug={activeSlug}
                    coverId={project.cover_image_id}
                    hiddenIds={project.hidden_image_ids}
                    onUpdate={(coverId, hiddenIds) =>
                      handleCurationUpdate(project.deal_id, coverId, hiddenIds)
                    }
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Create manual project modal */}
      {showCreateModal && (
        <CreateManualProjectModal
          pageSlug={activeSlug}
          onCreated={(p) => {
            setProjects((prev) => [
              ...prev,
              {
                deal_id: p.id,
                deal_name: p.name,
                builder: p.builder,
                city: p.city,
                state: p.state,
                pipeline: p.pipeline,
                sort_order: prev.length + 1,
                cover_image_id: null,
                hidden_image_ids: [],
              },
            ]);
            setShowCreateModal(false);
          }}
          onClose={() => setShowCreateModal(false)}
        />
      )}

      {/* Edit project modal */}
      {editingProject && (
        <EditProjectModal
          project={editingProject}
          onSaved={(updated) => {
            setProjects((prev) =>
              prev.map((p) =>
                p.deal_id === editingProject.deal_id ? { ...p, ...updated } : p
              )
            );
            setEditingProject(null);
          }}
          onClose={() => setEditingProject(null)}
        />
      )}

      {/* Add project modal */}
      {showAddModal && (
        <AddProjectModal
          pageSlug={activeSlug}
          assignedIds={assignedIds}
          onAdd={(p) => {
            setProjects((prev) => [
              ...prev,
              {
                deal_id: p.id,
                deal_name: p.name,
                builder: p.builder,
                city: p.city,
                state: p.state,
                pipeline: p.pipeline,
                sort_order: prev.length + 1,
                cover_image_id: null,
                hidden_image_ids: [],
              },
            ]);
          }}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </div>
  );
}
