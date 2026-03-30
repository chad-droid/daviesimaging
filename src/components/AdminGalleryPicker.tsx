"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { AdminGalleryCurator } from "./AdminGalleryCurator";

interface Project {
  id: string;
  name: string;
  builder: string;
  city: string;
  state: string;
  pipeline: string;
  image_count: number;
  source: string;
}

interface Assignment {
  id: number;
  deal_id: string;
  deal_name: string;
  builder: string;
  city: string;
  state: string;
  image_count: number;
}

interface MediaFile {
  id: number;
  url: string;
  thumb_url: string;
  filename: string;
  description: string | null;
}

export function AdminGalleryPicker({
  pageSlug,
  onClose,
}: {
  pageSlug: string;
  onClose: () => void;
}) {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [previewDealId, setPreviewDealId] = useState<string | null>(null);
  const [previewFiles, setPreviewFiles] = useState<MediaFile[]>([]);
  const [curateDeal, setCurateDeal] = useState<{ id: string; name: string } | null>(null);

  function fetchAssignments() {
    fetch(`/api/gallery?action=assignments&page=${encodeURIComponent(pageSlug)}`)
      .then((r) => r.json())
      .then((data) => setAssignments(data.assignments || []));
  }

  function fetchProjects() {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    fetch(`/api/gallery?${params}`)
      .then((r) => r.json())
      .then((data) => {
        setProjects(data.projects || []);
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchAssignments();
    fetchProjects();
  }, []);

  useEffect(() => {
    const timer = setTimeout(fetchProjects, 300);
    return () => clearTimeout(timer);
  }, [search]);

  async function addProject(dealId: string) {
    await fetch("/api/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pageSlug, dealId }),
    });
    fetchAssignments();
  }

  async function removeProject(dealId: string) {
    await fetch("/api/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pageSlug, dealId, action: "remove" }),
    });
    fetchAssignments();
  }

  async function previewProject(dealId: string) {
    setPreviewDealId(dealId);
    const res = await fetch(`/api/media/metadata?dealId=${dealId}`);
    const data = await res.json();
    setPreviewFiles(data.files || []);
  }

  const assignedIds = new Set(assignments.map((a) => a.deal_id));

  return (
    <div className="fixed inset-0 z-[100] flex">
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />

      <div className="relative ml-auto flex h-full w-full max-w-5xl">
        {/* Main panel */}
        <div className="flex flex-1 flex-col overflow-hidden bg-[#1E1E1E]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#2C2C2C] px-6 py-4">
            <div>
              <p className="text-sm font-semibold text-[#F5F5F5]">Manage Gallery</p>
              <p className="text-xs text-[#A8A2D0]">Page: {pageSlug} | {assignments.length} projects assigned</p>
            </div>
            <button onClick={onClose} className="text-[#666] hover:text-[#F5F5F5]">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Current assignments */}
          {assignments.length > 0 && (
            <div className="border-b border-[#2C2C2C] px-6 py-4">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.15em] text-[#4CAF50]">
                Currently on this page
              </p>
              <div className="flex flex-wrap gap-2">
                {assignments.map((a) => (
                  <div
                    key={a.deal_id}
                    className="flex items-center gap-2 rounded-full border border-[#4CAF50]/30 bg-[#4CAF50]/5 px-3 py-1.5"
                  >
                    <span className="text-xs text-[#F5F5F5]">{a.deal_name || a.deal_id}</span>
                    <span className="text-xs text-[#999]">{a.image_count} imgs</span>
                    <button
                      onClick={() => setCurateDeal({ id: a.deal_id, name: a.deal_name || a.deal_id })}
                      className="text-[#6A5ACD] hover:text-[#857AE0]"
                      title="Curate images"
                    >
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => removeProject(a.deal_id)}
                      className="text-[#E57373] hover:text-[#F44336]"
                      title="Remove from gallery"
                    >
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Search */}
          <div className="border-b border-[#2C2C2C] px-6 py-3">
            <input
              type="text"
              placeholder="Search projects by name, builder, city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
              className="w-full rounded-lg border border-[#2C2C2C] bg-[#121212] px-4 py-2.5 text-sm text-[#F5F5F5] outline-none placeholder:text-[#666] focus:border-[#6A5ACD]"
            />
          </div>

          {/* Available projects */}
          <div className="flex-1 overflow-y-auto p-6">
            {loading && <p className="py-10 text-center text-sm text-[#666]">Loading projects...</p>}

            <div className="space-y-2">
              {projects.map((p) => {
                const isAssigned = assignedIds.has(p.id);
                return (
                  <div
                    key={p.id}
                    className={`flex items-center gap-4 rounded-lg border px-4 py-3 transition-colors ${
                      isAssigned
                        ? "border-[#4CAF50]/30 bg-[#4CAF50]/5"
                        : "border-[#2C2C2C] bg-[#121212] hover:border-[#6A5ACD]/50"
                    }`}
                  >
                    <button
                      onClick={() => (isAssigned ? removeProject(p.id) : addProject(p.id))}
                      className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                        isAssigned
                          ? "bg-[#4CAF50] text-white"
                          : "border border-[#6A5ACD] text-[#6A5ACD] hover:bg-[#6A5ACD] hover:text-white"
                      }`}
                    >
                      {isAssigned ? "Added" : "Add"}
                    </button>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-[#F5F5F5]">{p.name}</p>
                      <p className="truncate text-xs text-[#A8A2D0]">
                        {p.builder} | {p.city}{p.state ? `, ${p.state}` : ""} | {p.image_count} images
                        {p.source === "digital" && (
                          <span className="ml-1 rounded bg-[#6A5ACD]/15 px-1.5 py-0.5 text-[9px] text-[#A8A2D0]">Digital</span>
                        )}
                      </p>
                    </div>

                    <button
                      onClick={() => previewProject(p.id)}
                      className="shrink-0 text-xs text-[#A8A2D0] transition-colors hover:text-[#6A5ACD]"
                    >
                      Preview
                    </button>
                  </div>
                );
              })}
            </div>

            {!loading && projects.length === 0 && (
              <p className="py-10 text-center text-sm text-[#666]">
                {search ? "No projects match your search." : "No projects with imported media yet."}
              </p>
            )}
          </div>
        </div>

        {/* Preview sidebar */}
        {previewDealId && (
          <div className="w-72 overflow-y-auto border-l border-[#2C2C2C] bg-[#121212]">
            <div className="flex items-center justify-between border-b border-[#2C2C2C] px-4 py-3">
              <p className="text-xs font-semibold text-[#F5F5F5]">Preview</p>
              <button onClick={() => { setPreviewDealId(null); setPreviewFiles([]); }} className="text-[#666] hover:text-[#F5F5F5]">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-1 p-2">
              {previewFiles.map((f) => (
                <div key={f.id} className="relative aspect-[4/3] overflow-hidden rounded bg-[#2C2C2C]">
                  <Image
                    src={f.thumb_url || f.url}
                    alt={f.description || f.filename}
                    fill
                    className="object-cover"
                    sizes="140px"
                  />
                </div>
              ))}
              {previewFiles.length === 0 && (
                <p className="col-span-2 py-10 text-center text-[10px] text-[#666]">Loading...</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Gallery Curator Modal */}
      {curateDeal && (
        <AdminGalleryCurator
          dealId={curateDeal.id}
          dealName={curateDeal.name}
          pageSlug={pageSlug}
          onClose={() => { setCurateDeal(null); fetchAssignments(); }}
        />
      )}
    </div>
  );
}
