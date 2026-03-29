"use client";

import { useState, useMemo, useEffect } from "react";
import dealsData from "@/data/deals.json";
import recommendedIds from "@/data/recommended-projects.json";

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
const recommendedSet = new Set(recommendedIds as string[]);

// Preferred builders (Chad's selections)
const preferredBuilders = new Set([
  "Lewis Group Of Companies",
  "Beazer Homes, Northern California",
  "Beazer Homes, Arizona",
  "Beazer Homes, Southern California",
  "Beazer Homes, Las Vegas NV",
  "Beazer Homes, San Antonio TX",
  "Beazer Homes, Corporate",
  "Sekisui House, Northern California",
  "Sekisui House U.S. - SoCal",
  "K. Hovnanian",
  "K. Hovnanian - Southern California",
  "K. Hovnanian - Northern California",
  "The New Home Company Inc.",
  "Coventry Homes - Houston",
  "Coventry Homes - Dallas",
  "Coventry Homes: Austin, TX",
  "Coventry Homes - San Antonio",
  "Tricon Residential",
  "CBC Home",
  "Ladera Living",
  "Get Community",
  "Risewell Homes",
  "Thrive Companies",
  "Grand Homes Inc",
  "Van Daele Development Corporation",
  "Cadence Homes",
  "Cresleigh Homes",
  "Bloomfield Homes",
  "Rurka Homes",
  "Landsea Homes - NorCal",
  "DR Horton: Bay Area CA",
  "DR Horton: Bay Area, CA",
  "DR Horton: Northern CA",
  "Woodbridge Pacific Group",
  "Classic Homes",
  "City Ventures",
  "Trumark Homes",
  "Melia Homes",
  "Shaddock Homes",
  "Toll Brothers: Raleigh, NC",
  "Toll Brothers: Dallas, TX",
  "Toll Brothers: West FL",
  "Toll Brothers: CO & CO Springs",
  "Toll Brothers: Central FL",
  "Toll Brothers: North FL",
  "Toll Brothers: Houston, TX",
  "Toll Brothers: Austin, TX",
  "Toll Brothers: San Antonio, TX",
  "Toll Brothers: South FL",
  "Toll Brothers: Atlanta, GA",
  "Toll Brothers: Charlotte, NC",
  "Toll Brothers Inc.",
  "Toll Brothers - California",
  "Dream Finders Homes - Atlanta",
  "Dream Finders Homes",
]);

function isPreferred(builder: string): boolean {
  return preferredBuilders.has(builder);
}

// Extract unique values for filters — preferred builders first
const builders = [...new Set(allDeals.map((d) => d.builder).filter(Boolean))].sort((a, b) => {
  const ap = isPreferred(a) ? 0 : 1;
  const bp = isPreferred(b) ? 0 : 1;
  if (ap !== bp) return ap - bp;
  return a.localeCompare(b);
});
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

interface DealStatusEntry {
  approved: boolean | null;
  imported: boolean;
  importedAt?: string;
  updatedAt: string;
}

export default function AdminAssetsPage() {
  const [statuses, setStatuses] = useState<Record<string, DealStatusEntry>>({});
  const [statusLoaded, setStatusLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [filterBuilder, setFilterBuilder] = useState("");
  const [filterState, setFilterState] = useState("");
  const [filterPipeline, setFilterPipeline] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "approved" | "denied" | "recommended" | "preferred" | "imported">("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Load statuses from server on mount
  useEffect(() => {
    fetch("/api/deals/status")
      .then((r) => r.json())
      .then((data) => {
        setStatuses(data);
        setStatusLoaded(true);
      })
      .catch(() => setStatusLoaded(true));
  }, []);

  // Helper to check approval
  const isApprovedDeal = (id: string) => statuses[id]?.approved === true;
  const isDeniedDeal = (id: string) => statuses[id]?.approved === false;
  const isImported = (id: string) => statuses[id]?.imported === true;

  const filtered = useMemo(() => {
    return allDeals.filter((d) => {
      if (search && !`${d.name} ${d.builder} ${d.city} ${d.address}`.toLowerCase().includes(search.toLowerCase())) return false;
      if (filterBuilder && d.builder !== filterBuilder) return false;
      if (filterState && d.state !== filterState) return false;
      if (filterPipeline && d.pipeline !== filterPipeline) return false;
      if (filterStatus === "approved" && !isApprovedDeal(d.id)) return false;
      if (filterStatus === "denied" && !isDeniedDeal(d.id)) return false;
      if (filterStatus === "recommended" && !recommendedSet.has(d.id)) return false;
      if (filterStatus === "preferred" && !isPreferred(d.builder)) return false;
      if (filterStatus === "imported" && !isImported(d.id)) return false;
      return true;
    });
  }, [search, filterBuilder, filterState, filterPipeline, filterStatus, statuses]);

  async function toggleApproval(id: string, value: boolean) {
    const next = { ...statuses };
    if (!next[id]) next[id] = { approved: null, imported: false, updatedAt: "" };
    next[id] = { ...next[id], approved: value, updatedAt: new Date().toISOString() };
    setStatuses(next);

    // Persist to server
    setSaving(true);
    try {
      await fetch("/api/deals/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [id]: { approved: value } }),
      });
    } catch { /* silent fail, state is in memory */ }
    setSaving(false);
  }

  function exportApproved() {
    const approved = allDeals
      .filter((d) => isApprovedDeal(d.id))
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

  const approvedCount = Object.values(statuses).filter((v) => v.approved === true).length;
  const importedCount = Object.values(statuses).filter((v) => v.imported === true).length;

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
              {filtered.length} of {allDeals.length} deals shown | {approvedCount} approved | {importedCount} imported{saving ? " | saving..." : ""}
            </p>
          </div>
          <div className="flex gap-2">
            <a
              href="/admin/media"
              className="rounded-full border border-[#2C2C2C] px-4 py-2 text-xs font-semibold text-[#A8A2D0] transition-colors hover:border-[#6A5ACD] hover:text-[#6A5ACD]"
            >
              Media Library
            </a>
            <button
              onClick={async () => {
                const updates: Record<string, { approved: boolean }> = {};
                const next = { ...statuses };
                const now = new Date().toISOString();
                recommendedIds.forEach((id: string) => {
                  updates[id] = { approved: true };
                  if (!next[id]) next[id] = { approved: null, imported: false, updatedAt: "" };
                  next[id] = { ...next[id], approved: true, updatedAt: now };
                });
                setStatuses(next);
                setSaving(true);
                try {
                  await fetch("/api/deals/status", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updates),
                  });
                } catch {}
                setSaving(false);
              }}
              className="rounded-full border border-[#6A5ACD] px-4 py-2 text-xs font-semibold text-[#6A5ACD] transition-colors hover:bg-[#6A5ACD] hover:text-white"
            >
              Approve All Recommended
            </button>
            <button
              onClick={exportApproved}
              disabled={approvedCount === 0}
              className="rounded-full bg-[#6A5ACD] px-5 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#5848B5] disabled:opacity-30"
            >
              Export {approvedCount} Approved
            </button>
          </div>
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
            {builders.map((b) => <option key={b} value={b}>{isPreferred(b) ? "★ " : ""}{b}</option>)}
          </select>
          <select value={filterState} onChange={(e) => setFilterState(e.target.value)} className="rounded-lg border border-[#2C2C2C] bg-[#121212] px-3 py-2 text-sm text-[#F5F5F5]">
            <option value="">All States</option>
            {states.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={filterPipeline} onChange={(e) => setFilterPipeline(e.target.value)} className="rounded-lg border border-[#2C2C2C] bg-[#121212] px-3 py-2 text-sm text-[#F5F5F5]">
            <option value="">All Pipelines</option>
            {pipelines.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as "all" | "approved" | "denied" | "recommended" | "preferred")} className="rounded-lg border border-[#2C2C2C] bg-[#121212] px-3 py-2 text-sm text-[#F5F5F5]">
            <option value="all">All Status</option>
            <option value="preferred">Preferred Builders</option>
            <option value="recommended">Recommended (60)</option>
            <option value="approved">Approved</option>
            <option value="denied">Not Approved</option>
            <option value="imported">Imported to Library</option>
          </select>
        </div>
      </div>

      {/* Deal List */}
      <div className="mx-auto max-w-7xl px-6 py-6">
        <div className="space-y-3">
          {filtered.map((deal) => {
            const isApproved = isApprovedDeal(deal.id);
            const hasMedia = isImported(deal.id);
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
                        isDeniedDeal(deal.id)
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
                        {recommendedSet.has(deal.id) && <span className="mr-1.5 text-[#6A5ACD]" title="Recommended">&#9733;</span>}
                        {deal.name}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-[#A8A2D0]">
                        {isPreferred(deal.builder) && <span className="mr-1 rounded bg-[#6A5ACD]/20 px-1.5 py-0.5 text-[9px] font-semibold text-[#6A5ACD]">PREFERRED</span>}
                        {deal.builder} | {deal.address || "No address"} | {deal.pipeline}
                      </p>
                    </div>

                    {/* Badges */}
                    <div className="flex shrink-0 gap-1.5">
                      {hasMedia && (
                        <span className="rounded bg-[#4CAF50]/15 px-2 py-0.5 text-[10px] font-medium text-[#4CAF50]">
                          In Library
                        </span>
                      )}
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

                    {/* Import note */}
                    {isApproved && deal.clientAssets && (
                      <div className="mt-4 rounded-lg border border-[#6A5ACD]/30 bg-[#6A5ACD]/5 px-4 py-3">
                        <p className="text-xs text-[#A8A2D0]">
                          To import: open the client assets link above, select the images you want, download them, then drag and drop into the Media Library upload tool.
                        </p>
                        <a
                          href="/admin/media"
                          className="mt-2 inline-block text-xs font-medium text-[#6A5ACD] hover:underline"
                        >
                          Open Media Library &rarr;
                        </a>
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
