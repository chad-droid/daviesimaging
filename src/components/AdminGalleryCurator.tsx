"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface MediaFile {
  id: number;
  url: string;
  thumb_url: string;
  filename: string;
  description: string | null;
}

interface CuratorProps {
  dealId: string;
  dealName: string;
  pageSlug: string;
  onClose: () => void;
}

export function AdminGalleryCurator({ dealId, dealName, pageSlug, onClose }: CuratorProps) {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [coverId, setCoverId] = useState<number | null>(null);
  const [hiddenIds, setHiddenIds] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`/api/gallery/curate?dealId=${dealId}&page=${encodeURIComponent(pageSlug)}`)
      .then((r) => r.json())
      .then((data) => {
        setFiles(data.files || []);
        setCoverId(data.coverId || null);
        setHiddenIds(new Set(data.hiddenIds || []));
        setLoading(false);
      });
  }, [dealId, pageSlug]);

  async function save() {
    setSaving(true);
    await fetch("/api/gallery/curate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pageSlug,
        dealId,
        coverId,
        hiddenIds: Array.from(hiddenIds),
      }),
    });
    setSaving(false);
    onClose();
  }

  function toggleHidden(id: number) {
    setHiddenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const visibleCount = files.filter((f) => !hiddenIds.has(f.id)).length;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4">
      <div className="flex h-[85vh] w-full max-w-5xl flex-col overflow-hidden rounded-lg bg-[#1E1E1E] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#2C2C2C] px-6 py-4">
          <div>
            <p className="text-sm font-semibold text-[#F5F5F5]">Curate Gallery: {dealName}</p>
            <p className="text-xs text-text-muted">
              {visibleCount} of {files.length} images visible | Page: {pageSlug}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={save}
              disabled={saving}
              className="rounded-full bg-[#6A5ACD] px-5 py-2 text-xs font-semibold text-white hover:bg-[#5848B5] disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <button onClick={onClose} className="text-[#999] hover:text-[#F5F5F5]">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div className="border-b border-[#2C2C2C] bg-[#121212] px-6 py-3">
          <p className="text-xs text-text-muted">
            <span className="text-[#6A5ACD]">Click star</span> to set cover image (shown on gallery page).{" "}
            <span className="text-[#E57373]">Click eye</span> to hide/show images from the gallery.
          </p>
        </div>

        {/* Image grid */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading && <p className="py-10 text-center text-sm text-[#999]">Loading images...</p>}

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {files.map((file) => {
              const isCover = coverId === file.id;
              const isHidden = hiddenIds.has(file.id);

              return (
                <div
                  key={file.id}
                  className={`group relative overflow-hidden rounded-lg ${
                    isHidden ? "opacity-30" : ""
                  } ${isCover ? "ring-2 ring-[#6A5ACD] ring-offset-2 ring-offset-[#1E1E1E]" : ""}`}
                >
                  <div className="relative aspect-[4/3] bg-[#2C2C2C]">
                    <Image
                      src={file.thumb_url || file.url}
                      alt={file.description || file.filename}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 50vw, 20vw"
                    />

                    {/* Cover badge */}
                    {isCover && (
                      <div className="absolute left-1.5 top-1.5 rounded bg-[#6A5ACD] px-2 py-0.5 text-[9px] font-bold text-white">
                        COVER
                      </div>
                    )}

                    {/* Hidden badge */}
                    {isHidden && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <span className="text-xs font-semibold text-white">HIDDEN</span>
                      </div>
                    )}

                    {/* Action buttons */}
                    <div className="absolute right-1.5 top-1.5 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                      {/* Set as cover */}
                      <button
                        onClick={() => setCoverId(isCover ? null : file.id)}
                        className={`rounded-full p-1.5 backdrop-blur-sm transition-colors ${
                          isCover ? "bg-[#6A5ACD] text-white" : "bg-black/50 text-white/70 hover:bg-[#6A5ACD] hover:text-white"
                        }`}
                        title={isCover ? "Remove as cover" : "Set as cover image"}
                      >
                        <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      </button>

                      {/* Toggle visibility */}
                      <button
                        onClick={() => toggleHidden(file.id)}
                        className={`rounded-full p-1.5 backdrop-blur-sm transition-colors ${
                          isHidden ? "bg-[#E57373] text-white" : "bg-black/50 text-white/70 hover:bg-[#E57373] hover:text-white"
                        }`}
                        title={isHidden ? "Show in gallery" : "Hide from gallery"}
                      >
                        {isHidden ? (
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                          </svg>
                        ) : (
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Filename */}
                  <p className="truncate px-1.5 py-1 text-[10px] text-[#999]">{file.filename}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
