"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface MediaFile {
  id: number;
  deal_id: string;
  url: string;
  thumb_url: string;
  filename: string;
  description: string | null;
}

interface PickerProps {
  slotId: string;
  onClose: () => void;
  onSave: () => void;
}

export function AdminMediaPicker({ slotId, onClose, onSave }: PickerProps) {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState<"single" | "before-after">("single");
  const [selectedImage, setSelectedImage] = useState<MediaFile | null>(null);
  const [selectedBefore, setSelectedBefore] = useState<MediaFile | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Load all media files from the database
    fetch("/api/media/metadata?dealId=all")
      .then((r) => r.json())
      .then((data) => {
        setFiles(data.files || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = search
    ? files.filter(
        (f) =>
          f.filename.toLowerCase().includes(search.toLowerCase()) ||
          (f.description || "").toLowerCase().includes(search.toLowerCase()),
      )
    : files;

  async function handleSave() {
    if (mode === "single" && !selectedImage) return;
    if (mode === "before-after" && (!selectedImage || !selectedBefore)) return;

    setSaving(true);
    await fetch("/api/site-assets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slotId,
        imageUrl: selectedImage?.url,
        thumbUrl: selectedImage?.thumb_url,
        altText: selectedImage?.description,
        dealId: selectedImage?.deal_id,
        beforeUrl: selectedBefore?.url || null,
        beforeThumbUrl: selectedBefore?.thumb_url || null,
      }),
    });
    setSaving(false);
    onSave();
    onClose();
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4">
      <div className="flex h-[85vh] w-full max-w-4xl flex-col overflow-hidden rounded-lg bg-[#1E1E1E] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#2C2C2C] px-6 py-4">
          <div>
            <p className="text-sm font-semibold text-[#F5F5F5]">Select Image</p>
            <p className="text-xs text-[#A8A2D0]">Slot: {slotId}</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Mode toggle */}
            <div className="flex rounded-full border border-[#2C2C2C]">
              <button
                onClick={() => { setMode("single"); setSelectedBefore(null); }}
                className={`rounded-full px-3 py-1 text-[10px] font-semibold transition-colors ${mode === "single" ? "bg-[#6A5ACD] text-white" : "text-[#666]"}`}
              >
                Single Image
              </button>
              <button
                onClick={() => setMode("before-after")}
                className={`rounded-full px-3 py-1 text-[10px] font-semibold transition-colors ${mode === "before-after" ? "bg-[#6A5ACD] text-white" : "text-[#666]"}`}
              >
                Before & After
              </button>
            </div>
            <button onClick={onClose} className="text-[#666] hover:text-[#F5F5F5]">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Selection preview */}
        {(selectedImage || selectedBefore) && (
          <div className="flex items-center gap-4 border-b border-[#2C2C2C] bg-[#121212] px-6 py-3">
            {mode === "before-after" && selectedBefore && (
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase text-[#E57373]">Before</span>
                <div className="relative h-12 w-16 overflow-hidden rounded bg-[#2C2C2C]">
                  <Image src={selectedBefore.thumb_url || selectedBefore.url} alt="" fill className="object-cover" sizes="64px" />
                </div>
              </div>
            )}
            {selectedImage && (
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase text-[#4CAF50]">{mode === "before-after" ? "After" : "Selected"}</span>
                <div className="relative h-12 w-16 overflow-hidden rounded bg-[#2C2C2C]">
                  <Image src={selectedImage.thumb_url || selectedImage.url} alt="" fill className="object-cover" sizes="64px" />
                </div>
              </div>
            )}
            <button
              onClick={handleSave}
              disabled={saving || !selectedImage}
              className="ml-auto rounded-full bg-[#6A5ACD] px-5 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#5848B5] disabled:opacity-30"
            >
              {saving ? "Saving..." : "Apply"}
            </button>
          </div>
        )}

        {/* Search */}
        <div className="border-b border-[#2C2C2C] px-6 py-3">
          <input
            type="text"
            placeholder="Search by filename or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
            className="w-full rounded-lg border border-[#2C2C2C] bg-[#121212] px-4 py-2 text-sm text-[#F5F5F5] outline-none placeholder:text-[#666] focus:border-[#6A5ACD]"
          />
          {mode === "before-after" && (
            <p className="mt-2 text-[10px] text-[#A8A2D0]">
              {!selectedBefore ? "Step 1: Select the BEFORE image (original photo)" : "Step 2: Select the AFTER image (finished asset)"}
            </p>
          )}
        </div>

        {/* Image grid */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading && <p className="py-10 text-center text-sm text-[#666]">Loading media library...</p>}
          {!loading && filtered.length === 0 && (
            <p className="py-10 text-center text-sm text-[#666]">
              {search ? "No images match your search." : "No images in the media library yet. Import some from the Asset Manager."}
            </p>
          )}
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
            {filtered.map((file) => {
              const isSelected = selectedImage?.id === file.id;
              const isBefore = selectedBefore?.id === file.id;
              return (
                <button
                  key={file.id}
                  onClick={() => {
                    if (mode === "before-after" && !selectedBefore) {
                      setSelectedBefore(file);
                    } else {
                      setSelectedImage(file);
                    }
                  }}
                  className={`group relative aspect-[4/3] overflow-hidden rounded-lg bg-[#2C2C2C] ring-2 transition-all ${
                    isSelected
                      ? "ring-[#4CAF50]"
                      : isBefore
                        ? "ring-[#E57373]"
                        : "ring-transparent hover:ring-[#6A5ACD]/50"
                  }`}
                >
                  <Image
                    src={file.thumb_url || file.url}
                    alt={file.description || file.filename}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 33vw, 20vw"
                  />
                  {/* Label */}
                  {(isSelected || isBefore) && (
                    <div className={`absolute left-1 top-1 rounded px-1.5 py-0.5 text-[9px] font-bold uppercase text-white ${isSelected ? "bg-[#4CAF50]" : "bg-[#E57373]"}`}>
                      {isSelected ? (mode === "before-after" ? "After" : "Selected") : "Before"}
                    </div>
                  )}
                  {/* Filename on hover */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-1.5 opacity-0 transition-opacity group-hover:opacity-100">
                    <p className="truncate text-[9px] text-white">{file.filename}</p>
                    {file.description && <p className="truncate text-[8px] text-white/60">{file.description}</p>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
