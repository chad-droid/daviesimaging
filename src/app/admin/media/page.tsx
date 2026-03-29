"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface BlobFile {
  url: string;
  pathname: string;
  size: number;
  uploadedAt: string;
}

interface ProjectGroup {
  builder: string;
  deal: string;
  path: string;
  images: BlobFile[];
  thumbs: BlobFile[];
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + " KB";
  return (bytes / 1024 / 1024).toFixed(1) + " MB";
}

export default function AdminMediaPage() {
  const [files, setFiles] = useState<BlobFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const [uploadFolder, setUploadFolder] = useState("gallery/");
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<{
    imported: number;
    savings: string;
    totalOriginalMB: string;
    totalOptimizedMB: string;
    errors: string[];
  } | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const fetchFiles = useCallback(async () => {
    setLoading(true);
    setError(null);
    const allFiles: BlobFile[] = [];
    let cursor: string | undefined;

    try {
      do {
        const params = new URLSearchParams({ prefix: "gallery/" });
        if (cursor) params.set("cursor", cursor);
        const res = await fetch(`/api/media/list?${params}`);
        if (!res.ok) throw new Error("Failed to load media");
        const data = await res.json();
        allFiles.push(...data.blobs);
        cursor = data.hasMore ? data.cursor : undefined;
      } while (cursor);

      setFiles(allFiles);
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  // Group files by project (builder/deal)
  const projects: ProjectGroup[] = (() => {
    const groups: Record<string, ProjectGroup> = {};
    for (const f of files) {
      // pathname: gallery/builder-name/deal-name/file.webp or .../thumbs/file.webp
      const parts = f.pathname.split("/");
      if (parts.length < 4) continue;
      const builder = parts[1];
      const deal = parts[2];
      const key = `${builder}/${deal}`;
      if (!groups[key]) {
        groups[key] = { builder, deal, path: key, images: [], thumbs: [] };
      }
      if (parts[3] === "thumbs") {
        groups[key].thumbs.push(f);
      } else {
        groups[key].images.push(f);
      }
    }
    return Object.values(groups).sort((a, b) => a.builder.localeCompare(b.builder));
  })();

  const totalSize = files.reduce((s, f) => s + f.size, 0);
  const imageCount = files.filter((f) => !f.pathname.includes("/thumbs/")).length;

  return (
    <div className="min-h-screen bg-[#121212] text-[#F5F5F5]">
      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-[#2C2C2C] bg-[#1E1E1E] px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <h1
              className="text-lg font-semibold text-[#F5F5F5]"
              style={{ fontSize: "1.125rem" }}
            >
              DIG Media Library
            </h1>
            <p className="text-xs text-[#A8A2D0]">
              {projects.length} projects | {imageCount} images |{" "}
              {formatSize(totalSize)} total
            </p>
          </div>
          <div className="flex gap-2">
            <a
              href="/admin/assets"
              className="rounded-full border border-[#2C2C2C] px-4 py-2 text-xs font-semibold text-[#A8A2D0] transition-colors hover:border-[#6A5ACD] hover:text-[#6A5ACD]"
            >
              Asset Manager
            </a>
            <button
              onClick={() => setShowUpload(!showUpload)}
              className="rounded-full bg-[#6A5ACD] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#5848B5]"
            >
              {showUpload ? "Close Upload" : "Upload Images"}
            </button>
            <button
              onClick={fetchFiles}
              className="rounded-full border border-[#2C2C2C] px-4 py-2 text-xs font-semibold text-[#A8A2D0] transition-colors hover:border-[#6A5ACD] hover:text-[#6A5ACD]"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Upload Panel */}
      {showUpload && (
        <div className="border-b border-[#2C2C2C] bg-[#1E1E1E] px-6 py-6">
          <div className="mx-auto max-w-7xl">
            <div className="mb-4 flex items-end gap-4">
              <div className="flex-1">
                <label className="mb-1.5 block text-xs text-[#666]">
                  Folder path (e.g. gallery/builder-name/deal-name)
                </label>
                <input
                  type="text"
                  value={uploadFolder}
                  onChange={(e) => setUploadFolder(e.target.value)}
                  placeholder="gallery/builder-name/deal-name"
                  className="w-full rounded-lg border border-[#2C2C2C] bg-[#121212] px-4 py-2.5 text-sm text-[#F5F5F5] outline-none focus:border-[#6A5ACD]"
                />
              </div>
            </div>

            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={async (e) => {
                e.preventDefault();
                setDragOver(false);
                if (uploading) return;
                const droppedFiles = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith("image/"));
                if (!droppedFiles.length) return;

                setUploading(true);
                setUploadResult(null);
                const fd = new FormData();
                fd.set("folder", uploadFolder);
                droppedFiles.forEach(f => fd.append("files", f));

                try {
                  const res = await fetch("/api/media/upload", { method: "POST", body: fd });
                  const data = await res.json();
                  setUploadResult(data);
                  fetchFiles();
                } catch (err) {
                  setUploadResult({ imported: 0, savings: "0%", totalOriginalMB: "0", totalOptimizedMB: "0", errors: [String(err)] });
                } finally {
                  setUploading(false);
                }
              }}
              className={`rounded-lg border-2 border-dashed p-10 text-center transition-colors ${
                dragOver
                  ? "border-[#6A5ACD] bg-[#6A5ACD]/10"
                  : "border-[#2C2C2C] hover:border-[#6A5ACD]/50"
              }`}
            >
              {uploading ? (
                <p className="text-sm text-[#A8A2D0]">Optimizing and uploading...</p>
              ) : (
                <>
                  <p className="text-sm text-[#A8A2D0]">
                    Drag and drop images here
                  </p>
                  <p className="mt-1 text-xs text-[#666]">
                    Images auto-optimized to WebP (max 2400px, 82% quality) with thumbnails generated
                  </p>
                  <label className="mt-4 inline-block cursor-pointer rounded-full border border-[#6A5ACD] px-5 py-2 text-xs font-semibold text-[#6A5ACD] transition-colors hover:bg-[#6A5ACD] hover:text-white">
                    Or browse files
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const selectedFiles = Array.from(e.target.files || []);
                        if (!selectedFiles.length || uploading) return;

                        setUploading(true);
                        setUploadResult(null);
                        const fd = new FormData();
                        fd.set("folder", uploadFolder);
                        selectedFiles.forEach(f => fd.append("files", f));

                        try {
                          const res = await fetch("/api/media/upload", { method: "POST", body: fd });
                          const data = await res.json();
                          setUploadResult(data);
                          fetchFiles();
                        } catch (err) {
                          setUploadResult({ imported: 0, savings: "0%", totalOriginalMB: "0", totalOptimizedMB: "0", errors: [String(err)] });
                        } finally {
                          setUploading(false);
                        }
                      }}
                    />
                  </label>
                </>
              )}
            </div>

            {uploadResult && (
              <div className="mt-4 rounded-lg border border-[#2C2C2C] bg-[#121212] p-4 text-xs">
                <p className="text-[#F5F5F5]">
                  Imported {uploadResult.imported} images | {uploadResult.totalOriginalMB}MB &rarr; {uploadResult.totalOptimizedMB}MB ({uploadResult.savings} smaller)
                </p>
                {uploadResult.errors.length > 0 && (
                  <div className="mt-2 text-[#E57373]">
                    {uploadResult.errors.map((err, i) => <p key={i}>{err}</p>)}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-6 py-6">
        {loading && (
          <p className="py-20 text-center text-sm text-[#666]">
            Loading media...
          </p>
        )}
        {error && (
          <p className="py-20 text-center text-sm text-[#E57373]">{error}</p>
        )}

        {!loading && projects.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-sm text-[#666]">
              No images imported yet. Go to the{" "}
              <a
                href="/admin/assets"
                className="text-[#6A5ACD] hover:underline"
              >
                Asset Manager
              </a>{" "}
              to approve and import projects.
            </p>
          </div>
        )}

        {/* Project grid */}
        {!loading && projects.length > 0 && (
          <div className="space-y-3">
            {projects.map((project) => {
              const isExpanded = selectedProject === project.path;
              return (
                <div
                  key={project.path}
                  className="rounded-lg border border-[#2C2C2C] bg-[#1E1E1E]"
                >
                  <button
                    onClick={() =>
                      setSelectedProject(isExpanded ? null : project.path)
                    }
                    className="flex w-full items-center justify-between px-5 py-4 text-left"
                  >
                    <div>
                      <p className="text-sm font-medium text-[#F5F5F5]">
                        {project.deal.replace(/-/g, " ")}
                      </p>
                      <p className="mt-0.5 text-xs text-[#A8A2D0]">
                        {project.builder.replace(/-/g, " ")} |{" "}
                        {project.images.length} images |{" "}
                        {formatSize(
                          project.images.reduce((s, f) => s + f.size, 0),
                        )}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      {/* Preview thumbnails */}
                      <div className="hidden gap-1 sm:flex">
                        {(project.thumbs.length > 0
                          ? project.thumbs
                          : project.images
                        )
                          .slice(0, 4)
                          .map((f) => (
                            <div
                              key={f.pathname}
                              className="relative h-10 w-14 overflow-hidden rounded bg-[#2C2C2C]"
                            >
                              <Image
                                src={f.url}
                                alt=""
                                fill
                                className="object-cover"
                                sizes="56px"
                              />
                            </div>
                          ))}
                        {project.images.length > 4 && (
                          <div className="flex h-10 w-14 items-center justify-center rounded bg-[#2C2C2C] text-[10px] text-[#666]">
                            +{project.images.length - 4}
                          </div>
                        )}
                      </div>
                      <svg
                        className={`h-4 w-4 text-[#666] transition-transform ${isExpanded ? "rotate-180" : ""}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="border-t border-[#2C2C2C] px-5 py-5">
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                        {project.images.map((img) => {
                          const thumb = project.thumbs.find((t) =>
                            t.pathname.endsWith(
                              img.pathname.split("/").pop() || "",
                            ),
                          );
                          return (
                            <button
                              key={img.pathname}
                              onClick={() => setLightboxUrl(img.url)}
                              className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-[#2C2C2C]"
                            >
                              <Image
                                src={thumb?.url || img.url}
                                alt={img.pathname.split("/").pop() || ""}
                                fill
                                className="object-cover transition-transform group-hover:scale-105"
                                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                              />
                              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 transition-opacity group-hover:opacity-100">
                                <p className="truncate text-[10px] text-white">
                                  {img.pathname.split("/").pop()}
                                </p>
                                <p className="text-[9px] text-white/60">
                                  {formatSize(img.size)}
                                </p>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {/* Copy URL helper */}
                      <div className="mt-4 flex items-center gap-2">
                        <p className="text-xs text-[#666]">
                          Blob path: <code className="text-[#A8A2D0]">{project.path}/</code>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightboxUrl(null)}
        >
          <button
            onClick={() => setLightboxUrl(null)}
            className="absolute right-4 top-4 text-white/60 transition-colors hover:text-white"
          >
            <svg
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="relative max-h-[90vh] max-w-[90vw]">
            <Image
              src={lightboxUrl}
              alt="Full size preview"
              width={2400}
              height={1600}
              className="max-h-[90vh] w-auto rounded-lg object-contain"
              quality={95}
            />
          </div>
        </div>
      )}
    </div>
  );
}
