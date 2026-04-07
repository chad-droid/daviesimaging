"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface BlobFile {
  url: string;
  pathname: string;
  size: number;
  uploadedAt: string;
}

interface MediaFile {
  id: number;
  deal_id: string;
  url: string;
  thumb_url: string;
  filename: string;
  description: string | null;
  size_bytes: number;
  width: number;
  height: number;
}

interface DealMeta {
  id: string;
  name: string;
  builder: string;
  city: string;
  state: string;
  pipeline: string;
  model_name: string;
  location_name: string;
  project_type: string;
  scope: string;
  deliverables: string;
  address: string;
  amount: number;
  production_date: string;
  client_assets: string;
  internal_assets: string;
  matterport: string;
  youtube: string;
  project_website: string;
}

interface ProjectGroup {
  builder: string;
  deal: string;
  path: string;
  dealId: string;
  images: BlobFile[];
  thumbs: BlobFile[];
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + " KB";
  return (bytes / 1024 / 1024).toFixed(1) + " MB";
}

function MetadataPanel({ dealId, onClose }: { dealId: string; onClose: () => void }) {
  const [deal, setDeal] = useState<DealMeta | null>(null);
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [editing, setEditing] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [describing, setDescribing] = useState(false);
  const [describeResult, setDescribeResult] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/media/metadata?dealId=${dealId}`)
      .then((r) => r.json())
      .then((data) => {
        setDeal(data.deal);
        setFiles(data.files || []);
      });
  }, [dealId]);

  async function saveFields() {
    if (Object.keys(editing).length === 0) return;
    setSaving(true);
    await fetch("/api/media/metadata", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dealId, fields: editing }),
    });
    setSaving(false);
    setEditing({});
    // Refresh
    const res = await fetch(`/api/media/metadata?dealId=${dealId}`);
    const data = await res.json();
    setDeal(data.deal);
  }

  async function describeAll() {
    setDescribing(true);
    setDescribeResult(null);
    try {
      const res = await fetch("/api/media/describe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dealId, all: true }),
      });
      const data = await res.json();
      setDescribeResult(`${data.described} images described${data.failed > 0 ? `, ${data.failed} failed` : ""}`);
      // Refresh files
      const meta = await fetch(`/api/media/metadata?dealId=${dealId}`);
      const metaData = await meta.json();
      setFiles(metaData.files || []);
    } catch (e) {
      setDescribeResult(`Error: ${e}`);
    }
    setDescribing(false);
  }

  if (!deal) return <div className="p-8 text-center text-sm text-[#666]">Loading...</div>;

  const editableFields = [
    { key: "name", label: "Deal Name" },
    { key: "builder", label: "Builder" },
    { key: "city", label: "City" },
    { key: "state", label: "State" },
    { key: "model_name", label: "Model Name" },
    { key: "location_name", label: "Location" },
    { key: "project_type", label: "Project Type" },
    { key: "address", label: "Address" },
    { key: "deliverables", label: "Deliverables" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />

      {/* Panel */}
      <div className="relative ml-auto h-full w-full max-w-2xl overflow-y-auto bg-[#1E1E1E] shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#2C2C2C] bg-[#1E1E1E] px-6 py-4">
          <div>
            <h2 className="text-sm font-semibold text-[#F5F5F5]" style={{ fontSize: "1rem", fontFamily: "inherit" }}>
              {deal.name}
            </h2>
            <p className="text-xs text-[#A8A2D0]">{deal.builder} | {deal.city}, {deal.state}</p>
          </div>
          <button onClick={onClose} className="text-[#666] hover:text-[#F5F5F5]">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          {/* Deal metadata */}
          <div className="mb-6">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#A8A2D0]">Project Info</p>
              {Object.keys(editing).length > 0 && (
                <button
                  onClick={saveFields}
                  disabled={saving}
                  className="rounded-full bg-[#6A5ACD] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#5848B5] disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              )}
            </div>
            <div className="space-y-3">
              {editableFields.map((field) => (
                <div key={field.key}>
                  <label className="mb-1 block text-[10px] uppercase tracking-widest text-[#666]">
                    {field.label}
                  </label>
                  <input
                    type="text"
                    value={editing[field.key] ?? (deal as unknown as Record<string, string>)[field.key] ?? ""}
                    onChange={(e) => setEditing({ ...editing, [field.key]: e.target.value })}
                    className="w-full rounded border border-[#2C2C2C] bg-[#121212] px-3 py-2 text-sm text-[#F5F5F5] outline-none focus:border-[#6A5ACD]"
                  />
                </div>
              ))}
            </div>

            {/* Read-only fields */}
            <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
              {deal.pipeline && <div><span className="text-[#666]">Pipeline:</span> <span className="text-[#F5F5F5]">{deal.pipeline}</span></div>}
              {deal.production_date && <div><span className="text-[#666]">Produced:</span> <span className="text-[#F5F5F5]">{deal.production_date}</span></div>}
              {deal.amount > 0 && <div><span className="text-[#666]">Amount:</span> <span className="text-[#F5F5F5]">${Number(deal.amount).toLocaleString()}</span></div>}
            </div>

            {/* Links */}
            <div className="mt-4 flex flex-wrap gap-3">
              {deal.client_assets && <a href={deal.client_assets} target="_blank" rel="noopener noreferrer" className="text-xs text-[#6A5ACD] hover:underline">Client Assets &rarr;</a>}
              {deal.internal_assets && <a href={deal.internal_assets} target="_blank" rel="noopener noreferrer" className="text-xs text-[#A8A2D0] hover:underline">Internal &rarr;</a>}
              {deal.matterport && <a href={deal.matterport} target="_blank" rel="noopener noreferrer" className="text-xs text-[#4CAF50] hover:underline">Matterport &rarr;</a>}
              {deal.project_website && <a href={deal.project_website} target="_blank" rel="noopener noreferrer" className="text-xs text-[#A8A2D0] hover:underline">Website &rarr;</a>}
            </div>
          </div>

          {/* AI Descriptions */}
          <div className="mb-6 border-t border-[#2C2C2C] pt-6">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#A8A2D0]">
                Image Descriptions ({files.filter((f) => f.description).length}/{files.length} done)
              </p>
              <button
                onClick={describeAll}
                disabled={describing}
                className="rounded-full bg-[#6A5ACD] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#5848B5] disabled:opacity-50"
              >
                {describing ? "Analyzing images..." : "Generate AI Descriptions"}
              </button>
            </div>
            {describeResult && (
              <p className={`mb-3 text-xs ${describeResult.startsWith("Error") ? "text-[#E57373]" : "text-[#4CAF50]"}`}>
                {describeResult}
              </p>
            )}
          </div>

          {/* File list with descriptions */}
          <div className="space-y-3">
            {files.map((file) => (
              <div key={file.id} className="flex gap-3 rounded-lg border border-[#2C2C2C] bg-[#121212] p-3">
                <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded bg-[#2C2C2C]">
                  <Image
                    src={file.thumb_url || file.url}
                    alt={file.description || file.filename}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium text-[#F5F5F5]">{file.filename}</p>
                  <p className="text-[10px] text-[#666]">
                    {file.width}x{file.height} | {formatSize(file.size_bytes)}
                  </p>
                  {file.description ? (
                    <p className="mt-1 text-xs leading-relaxed text-[#A8A2D0]">{file.description}</p>
                  ) : (
                    <p className="mt-1 text-[10px] italic text-[#666]">No description yet</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function OriginalDownloadButton({ projectPath }: { projectPath: string }) {
  const [url, setUrl] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const [, dealSlug] = projectPath.split("/");
    const searchTerm = dealSlug.replace(/-/g, " ");
    fetch(`/api/deals/status?search=${encodeURIComponent(searchTerm)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.deals?.[0]) {
          const d = data.deals[0];
          setUrl(d.client_assets || d.internal_assets || null);
        }
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, [projectPath]);

  if (!loaded || !url) return null;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className="rounded-full border border-[#4CAF50]/50 px-3 py-1.5 text-[10px] font-semibold text-[#4CAF50] transition-colors hover:bg-[#4CAF50] hover:text-white"
      title="Open original hi-res files for social media use"
    >
      Download Originals
    </a>
  );
}

export default function AdminMediaPage() {
  const [files, setFiles] = useState<BlobFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);
  const [metadataPanel, setMetadataPanel] = useState<string | null>(null);
  const [search, setSearch] = useState("");
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
  const [deleting, setDeleting] = useState<string | null>(null); // dealId being deleted

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

  async function deleteProject(dealId: string, pathPrefix: string, projectName: string, imageCount: number) {
    if (!confirm(`Delete all ${imageCount} images for "${projectName}"? This removes them from Vercel Blob and the media library and cannot be undone.`)) return;
    const key = dealId || pathPrefix;
    setDeleting(key);
    try {
      const body: Record<string, string> = {};
      if (dealId) body.dealId = dealId;
      if (pathPrefix) body.pathPrefix = `gallery/${pathPrefix}`;
      const res = await fetch("/api/media/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      await fetchFiles(); // refresh list
    } catch (e) {
      alert("Delete failed: " + String(e));
    } finally {
      setDeleting(null);
    }
  }

  // Group files by project
  const projects: ProjectGroup[] = (() => {
    const groups: Record<string, ProjectGroup> = {};
    for (const f of files) {
      const parts = f.pathname.split("/");
      if (parts.length < 4) continue;
      const builder = parts[1];
      const deal = parts[2];
      const key = `${builder}/${deal}`;
      if (!groups[key]) {
        groups[key] = { builder, deal, path: key, dealId: "", images: [], thumbs: [] };
      }
      if (parts[3] === "thumbs") {
        groups[key].thumbs.push(f);
      } else {
        groups[key].images.push(f);
      }
    }
    return Object.values(groups).sort((a, b) => a.builder.localeCompare(b.builder));
  })();

  // Filter by search
  const filteredProjects = search
    ? projects.filter(
        (p) =>
          p.builder.toLowerCase().includes(search.toLowerCase()) ||
          p.deal.toLowerCase().includes(search.toLowerCase()),
      )
    : projects;

  const totalSize = files.reduce((s, f) => s + f.size, 0);
  const imageCount = files.filter((f) => !f.pathname.includes("/thumbs/")).length;

  return (
    <div className="min-h-screen bg-[#121212] text-[#F5F5F5]">
      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-[#2C2C2C] bg-[#1E1E1E] px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-[#F5F5F5]" style={{ fontSize: "1.125rem" }}>
              DIG Media Library
            </h1>
            <p className="text-xs text-[#A8A2D0]">
              {filteredProjects.length} projects | {imageCount} images | {formatSize(totalSize)} total
            </p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setShowUpload(!showUpload)} className="rounded-full bg-[#6A5ACD] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#5848B5]">
              {showUpload ? "Close Upload" : "Upload Images"}
            </button>
            <button onClick={fetchFiles} className="rounded-full border border-[#2C2C2C] px-4 py-2 text-xs font-semibold text-[#A8A2D0] transition-colors hover:border-[#6A5ACD] hover:text-[#6A5ACD]">
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Search bar */}
      <div className="border-b border-[#2C2C2C] bg-[#1E1E1E] px-6 py-3">
        <div className="mx-auto max-w-7xl">
          <input
            type="text"
            placeholder="Search projects by builder or deal name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-[#2C2C2C] bg-[#121212] px-4 py-2.5 text-sm text-[#F5F5F5] outline-none placeholder:text-[#666] focus:border-[#6A5ACD]"
          />
        </div>
      </div>

      {/* Upload Panel */}
      {showUpload && (
        <div className="border-b border-[#2C2C2C] bg-[#1E1E1E] px-6 py-6">
          <div className="mx-auto max-w-7xl">
            <div className="mb-4">
              <label className="mb-1.5 block text-xs text-[#666]">Folder path</label>
              <input
                type="text"
                value={uploadFolder}
                onChange={(e) => setUploadFolder(e.target.value)}
                placeholder="gallery/builder-name/deal-name"
                className="w-full rounded-lg border border-[#2C2C2C] bg-[#121212] px-4 py-2.5 text-sm text-[#F5F5F5] outline-none focus:border-[#6A5ACD]"
              />
            </div>
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={async (e) => {
                e.preventDefault();
                setDragOver(false);
                if (uploading) return;
                const droppedFiles = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith("image/"));
                if (!droppedFiles.length) return;
                setUploading(true);
                setUploadResult(null);
                const fd = new FormData();
                fd.set("folder", uploadFolder);
                droppedFiles.forEach((f) => fd.append("files", f));
                try {
                  const res = await fetch("/api/media/upload", { method: "POST", body: fd });
                  setUploadResult(await res.json());
                  fetchFiles();
                } catch (err) {
                  setUploadResult({ imported: 0, savings: "0%", totalOriginalMB: "0", totalOptimizedMB: "0", errors: [String(err)] });
                }
                setUploading(false);
              }}
              className={`rounded-lg border-2 border-dashed p-10 text-center transition-colors ${dragOver ? "border-[#6A5ACD] bg-[#6A5ACD]/10" : "border-[#2C2C2C] hover:border-[#6A5ACD]/50"}`}
            >
              {uploading ? (
                <p className="text-sm text-[#A8A2D0]">Optimizing and uploading...</p>
              ) : (
                <>
                  <p className="text-sm text-[#A8A2D0]">Drag and drop images here</p>
                  <p className="mt-1 text-xs text-[#666]">Auto-optimized to WebP (max 2400px, 82% quality)</p>
                </>
              )}
            </div>
            {uploadResult && (
              <p className="mt-3 text-xs text-[#4CAF50]">
                Imported {uploadResult.imported} | {uploadResult.totalOriginalMB}MB &rarr; {uploadResult.totalOptimizedMB}MB ({uploadResult.savings} smaller)
              </p>
            )}
          </div>
        </div>
      )}

      {/* Project list */}
      <div className="mx-auto max-w-7xl px-6 py-6">
        {loading && <p className="py-20 text-center text-sm text-[#666]">Loading media...</p>}
        {error && <p className="py-20 text-center text-sm text-[#E57373]">{error}</p>}

        {!loading && filteredProjects.length === 0 && (
          <p className="py-20 text-center text-sm text-[#666]">
            {search ? "No projects match your search." : "No images imported yet."}
          </p>
        )}

        <div className="space-y-3">
          {filteredProjects.map((project) => {
            const isExpanded = selectedProject === project.path;
            return (
              <div key={project.path} className="rounded-lg border border-[#2C2C2C] bg-[#1E1E1E]">
                <div className="flex items-center justify-between px-5 py-4">
                  <button
                    onClick={() => setSelectedProject(isExpanded ? null : project.path)}
                    className="flex flex-1 items-center gap-4 text-left"
                  >
                    <div>
                      <p className="text-sm font-medium text-[#F5F5F5]">{project.deal.replace(/-/g, " ")}</p>
                      <p className="mt-0.5 text-xs text-[#A8A2D0]">
                        {project.builder.replace(/-/g, " ")} | {project.images.length} images | {formatSize(project.images.reduce((s, f) => s + f.size, 0))}
                      </p>
                    </div>
                  </button>
                  <div className="flex items-center gap-2">
                    {/* Preview thumbs */}
                    <div className="hidden gap-1 sm:flex">
                      {(project.thumbs.length > 0 ? project.thumbs : project.images).slice(0, 4).map((f) => (
                        <div key={f.pathname} className="relative h-10 w-14 overflow-hidden rounded bg-[#2C2C2C]">
                          <Image src={f.url} alt="" fill className="object-cover" sizes="56px" />
                        </div>
                      ))}
                      {project.images.length > 4 && (
                        <div className="flex h-10 w-14 items-center justify-center rounded bg-[#2C2C2C] text-[10px] text-[#666]">+{project.images.length - 4}</div>
                      )}
                    </div>
                    {/* Download originals for social */}
                    <OriginalDownloadButton projectPath={project.path} />
                    {/* Metadata button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setMetadataPanel(project.path);
                      }}
                      className="rounded-full border border-[#2C2C2C] px-3 py-1.5 text-[10px] font-semibold text-[#A8A2D0] transition-colors hover:border-[#6A5ACD] hover:text-[#6A5ACD]"
                    >
                      Metadata
                    </button>
                    {/* Delete project */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteProject(project.dealId, project.path, project.deal.replace(/-/g, " "), project.images.length);
                      }}
                      disabled={deleting === (project.dealId || project.path)}
                      className="rounded-full border border-[#2C2C2C] px-3 py-1.5 text-[10px] font-semibold text-[#666] transition-colors hover:border-[#E57373] hover:text-[#E57373] disabled:opacity-40"
                    >
                      {deleting === (project.dealId || project.path) ? "Deleting…" : "Delete"}
                    </button>
                    <svg
                      className={`h-4 w-4 text-[#666] transition-transform ${isExpanded ? "rotate-180" : ""}`}
                      fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </div>

                {isExpanded && (
                  <div className="border-t border-[#2C2C2C] px-5 py-5">
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                      {project.images.map((img) => {
                        const thumb = project.thumbs.find((t) => t.pathname.endsWith(img.pathname.split("/").pop() || ""));
                        return (
                          <button
                            key={img.pathname}
                            onClick={() => setLightboxUrl(img.url)}
                            className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-[#2C2C2C]"
                          >
                            <Image
                              src={thumb?.url || img.url}
                              alt=""
                              fill
                              className="object-cover transition-transform group-hover:scale-105"
                              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                            />
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 transition-opacity group-hover:opacity-100">
                              <p className="truncate text-[10px] text-white">{img.pathname.split("/").pop()}</p>
                              <p className="text-[9px] text-white/60">{formatSize(img.size)}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4" onClick={() => setLightboxUrl(null)}>
          <button onClick={() => setLightboxUrl(null)} className="absolute right-4 top-4 text-white/60 hover:text-white">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <Image src={lightboxUrl} alt="Full size" width={2400} height={1600} className="max-h-[90vh] w-auto rounded-lg object-contain" quality={95} />
        </div>
      )}

      {/* Metadata Panel */}
      {metadataPanel && (
        <MetadataPanelLoader
          projectPath={metadataPanel}
          onClose={() => setMetadataPanel(null)}
        />
      )}
    </div>
  );
}

// Resolves project path to deal ID, then opens MetadataPanel
function MetadataPanelLoader({ projectPath, onClose }: { projectPath: string; onClose: () => void }) {
  const [dealId, setDealId] = useState<string | null>(null);

  useEffect(() => {
    // Search for the deal by matching builder and deal name slugs
    const [builderSlug, dealSlug] = projectPath.split("/");
    const searchTerm = dealSlug.replace(/-/g, " ");
    fetch(`/api/deals/status?search=${encodeURIComponent(searchTerm)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.deals && data.deals.length > 0) {
          setDealId(data.deals[0].id);
        }
      });
  }, [projectPath]);

  if (!dealId) return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"><p className="text-sm text-[#A8A2D0]">Finding deal...</p></div>;

  return <MetadataPanel dealId={dealId} onClose={onClose} />;
}
