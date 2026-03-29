"use client";

import { useState, useMemo } from "react";
import dealsData from "@/data/deals.json";

interface Deal {
  id: string;
  name: string;
  builder: string;
  city: string;
  state: string;
  pipeline: string;
  stage: string;
  productionDate: string;
  closingDate: string;
  modelName: string;
  locationName: string;
  projectType: string;
  scope: string;
  deliverables: string;
  assetCount: string;
  qtyImages: string;
  clientAssets: string;
  internalAssets: string;
  matterport: string;
  youtube: string;
  gif: string;
  projectWebsite: string;
  googleMaps: string;
  address: string;
  approved: boolean;
}

const allDeals = dealsData as Deal[];

// Extract unique values for filters
const builders = [...new Set(allDeals.map((d) => d.builder).filter(Boolean))].sort();
const states = [...new Set(allDeals.map((d) => d.state).filter(Boolean))].sort();
const pipelines = [...new Set(allDeals.map((d) => d.pipeline).filter(Boolean))].sort();

function extractYoutubeId(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^&?\s]+)/);
  return match ? match[1] : null;
}

function getDriveFolderId(url: string): string | null {
  const match = url.match(/folders\/([^?/]+)/);
  return match ? match[1] : null;
}

export default function AdminAssetsPage() {
  const [approvals, setApprovals] = useState<Record<string, boolean>>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("dig-asset-approvals");
      return saved ? JSON.parse(saved) : {};
    }
    return {};
  });
  const [search, setSearch] = useState("");
  const [filterBuilder, setFilterBuilder] = useState("");
  const [filterState, setFilterState] = useState("");
  const [filterPipeline, setFilterPipeline] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "approved" | "denied">("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return allDeals.filter((d) => {
      if (search && !`${d.name} ${d.builder} ${d.city} ${d.address}`.toLowerCase().includes(search.toLowerCase())) return false;
      if (filterBuilder && d.builder !== filterBuilder) return false;
      if (filterState && d.state !== filterState) return false;
      if (filterPipeline && d.pipeline !== filterPipeline) return false;
      if (filterStatus === "approved" && !approvals[d.id]) return false;
      if (filterStatus === "denied" && approvals[d.id] !== false) return false;
      return true;
    });
  }, [search, filterBuilder, filterState, filterPipeline, filterStatus, approvals]);

  function toggleApproval(id: string, value: boolean) {
    const next = { ...approvals, [id]: value };
    setApprovals(next);
    localStorage.setItem("dig-asset-approvals", JSON.stringify(next));
  }

  function exportApproved() {
    const approved = allDeals
      .filter((d) => approvals[d.id] === true)
      .map((d) => ({
        id: d.id,
        name: d.name,
        builder: d.builder,
        city: d.city,
        state: d.state,
        pipeline: d.pipeline,
        address: d.address,
        modelName: d.modelName,
        locationName: d.locationName,
        projectType: d.projectType,
        deliverables: d.deliverables,
        assetCount: d.assetCount,
        qtyImages: d.qtyImages,
        clientAssets: d.clientAssets,
        matterport: d.matterport,
        youtube: d.youtube,
        gif: d.gif,
        projectWebsite: d.projectWebsite,
        googleMaps: d.googleMaps,
      }));
    const blob = new Blob([JSON.stringify(approved, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `dig-approved-assets-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const approvedCount = Object.values(approvals).filter((v) => v === true).length;

  return (
    <div className="min-h-screen bg-[#121212] text-[#F5F5F5]">
      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-[#2C2C2C] bg-[#1E1E1E] px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-[#F5F5F5]" style={{ fontSize: "1.125rem" }}>
              DIG Asset Manager
            </h1>
            <p className="text-xs text-[#A8A2D0]">
              {filtered.length} of {allDeals.length} deals shown | {approvedCount} approved
            </p>
          </div>
          <button
            onClick={exportApproved}
            disabled={approvedCount === 0}
            className="rounded-full bg-[#6A5ACD] px-5 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#5848B5] disabled:opacity-30"
          >
            Export {approvedCount} Approved
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="border-b border-[#2C2C2C] bg-[#1E1E1E] px-6 py-3">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3">
          <input
            type="text"
            placeholder="Search deals, builders, cities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 rounded-lg border border-[#2C2C2C] bg-[#121212] px-4 py-2 text-sm text-[#F5F5F5] outline-none placeholder:text-[#666] focus:border-[#6A5ACD]"
          />
          <select value={filterBuilder} onChange={(e) => setFilterBuilder(e.target.value)} className="rounded-lg border border-[#2C2C2C] bg-[#121212] px-3 py-2 text-sm text-[#F5F5F5]">
            <option value="">All Builders</option>
            {builders.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
          <select value={filterState} onChange={(e) => setFilterState(e.target.value)} className="rounded-lg border border-[#2C2C2C] bg-[#121212] px-3 py-2 text-sm text-[#F5F5F5]">
            <option value="">All States</option>
            {states.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={filterPipeline} onChange={(e) => setFilterPipeline(e.target.value)} className="rounded-lg border border-[#2C2C2C] bg-[#121212] px-3 py-2 text-sm text-[#F5F5F5]">
            <option value="">All Pipelines</option>
            {pipelines.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as "all" | "approved" | "denied")} className="rounded-lg border border-[#2C2C2C] bg-[#121212] px-3 py-2 text-sm text-[#F5F5F5]">
            <option value="all">All Status</option>
            <option value="approved">Approved</option>
            <option value="denied">Not Approved</option>
          </select>
        </div>
      </div>

      {/* Deal List */}
      <div className="mx-auto max-w-7xl px-6 py-6">
        <div className="space-y-3">
          {filtered.map((deal) => {
            const isApproved = approvals[deal.id] === true;
            const isExpanded = expandedId === deal.id;
            const ytId = deal.youtube ? extractYoutubeId(deal.youtube) : null;
            const driveFolderId = deal.clientAssets ? getDriveFolderId(deal.clientAssets) : null;

            return (
              <div
                key={deal.id}
                className={`rounded-lg border transition-colors ${
                  isApproved
                    ? "border-[#6A5ACD]/50 bg-[#6A5ACD]/5"
                    : "border-[#2C2C2C] bg-[#1E1E1E]"
                }`}
              >
                {/* Row */}
                <div className="flex items-center gap-4 px-5 py-4">
                  {/* Approve/Deny */}
                  <div className="flex shrink-0 gap-1.5">
                    <button
                      onClick={() => toggleApproval(deal.id, true)}
                      className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                        isApproved
                          ? "bg-[#6A5ACD] text-white"
                          : "border border-[#2C2C2C] text-[#666] hover:border-[#6A5ACD] hover:text-[#6A5ACD]"
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => toggleApproval(deal.id, false)}
                      className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                        approvals[deal.id] === false
                          ? "bg-[#E57373]/20 text-[#E57373]"
                          : "border border-[#2C2C2C] text-[#666] hover:border-[#E57373] hover:text-[#E57373]"
                      }`}
                    >
                      No
                    </button>
                  </div>

                  {/* Info */}
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : deal.id)}
                    className="flex flex-1 items-center gap-4 text-left"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-[#F5F5F5]">
                        {deal.name}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-[#A8A2D0]">
                        {deal.builder} | {deal.address || "No address"} | {deal.pipeline}
                      </p>
                    </div>

                    {/* Badges */}
                    <div className="flex shrink-0 gap-1.5">
                      {deal.clientAssets && (
                        <span className="rounded bg-[#6A5ACD]/15 px-2 py-0.5 text-[10px] font-medium text-[#A8A2D0]">
                          Photos
                        </span>
                      )}
                      {deal.youtube && (
                        <span className="rounded bg-[#E57373]/15 px-2 py-0.5 text-[10px] font-medium text-[#E57373]">
                          Video
                        </span>
                      )}
                      {deal.matterport && (
                        <span className="rounded bg-[#4CAF50]/15 px-2 py-0.5 text-[10px] font-medium text-[#4CAF50]">
                          3D Tour
                        </span>
                      )}
                    </div>

                    {/* Chevron */}
                    <svg
                      className={`h-4 w-4 shrink-0 text-[#666] transition-transform ${isExpanded ? "rotate-180" : ""}`}
                      fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="border-t border-[#2C2C2C] px-5 py-5">
                    {/* Meta */}
                    <div className="mb-4 grid grid-cols-2 gap-x-8 gap-y-2 text-xs sm:grid-cols-4">
                      {deal.productionDate && <div><span className="text-[#666]">Produced:</span> {deal.productionDate}</div>}
                      {deal.modelName && <div><span className="text-[#666]">Model:</span> {deal.modelName}</div>}
                      {deal.qtyImages && <div><span className="text-[#666]">Images:</span> {deal.qtyImages}</div>}
                      {deal.assetCount && <div><span className="text-[#666]">Assets:</span> {deal.assetCount}</div>}
                      {deal.deliverables && <div className="col-span-2"><span className="text-[#666]">Deliverables:</span> {deal.deliverables}</div>}
                    </div>

                    {/* Links */}
                    <div className="mb-4 flex flex-wrap gap-3">
                      {deal.clientAssets && (
                        <a href={deal.clientAssets} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-[#6A5ACD] hover:underline">
                          Open Client Assets &rarr;
                        </a>
                      )}
                      {deal.internalAssets && (
                        <a href={deal.internalAssets} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-[#A8A2D0] hover:underline">
                          Internal Assets &rarr;
                        </a>
                      )}
                      {deal.matterport && (
                        <a href={deal.matterport} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-[#4CAF50] hover:underline">
                          Matterport Tour &rarr;
                        </a>
                      )}
                      {deal.projectWebsite && (
                        <a href={deal.projectWebsite} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-[#A8A2D0] hover:underline">
                          Project Website &rarr;
                        </a>
                      )}
                      {deal.googleMaps && (
                        <a href={deal.googleMaps} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-[#A8A2D0] hover:underline">
                          Google Maps &rarr;
                        </a>
                      )}
                    </div>

                    {/* YouTube embed */}
                    {ytId && (
                      <div className="mb-4">
                        <p className="mb-2 text-xs font-medium text-[#666]">Video Preview</p>
                        <div className="aspect-video overflow-hidden rounded-lg">
                          <iframe
                            src={`https://www.youtube.com/embed/${ytId}`}
                            className="h-full w-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      </div>
                    )}

                    {/* Drive folder embed */}
                    {driveFolderId && (
                      <div>
                        <p className="mb-2 text-xs font-medium text-[#666]">Photo Folder Preview</p>
                        <div className="aspect-[16/9] overflow-hidden rounded-lg border border-[#2C2C2C]">
                          <iframe
                            src={`https://drive.google.com/embeddedfolderview?id=${driveFolderId}#grid`}
                            className="h-full w-full"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <p className="py-20 text-center text-sm text-[#666]">No deals match your filters.</p>
        )}
      </div>
    </div>
  );
}
