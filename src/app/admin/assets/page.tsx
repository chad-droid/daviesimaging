"use client";

import { useState, useEffect, useCallback } from "react";
import recommendedIds from "@/data/recommended-projects.json";

interface Deal {
  id: string;
  name: string;
  builder: string;
  city: string;
  state: string;
  pipeline: string;
  stage: string;
  production_date: string;
  closing_date: string;
  model_name: string;
  deliverables: string;
  asset_count: string;
  qty_images: string;
  client_assets: string;
  internal_assets: string;
  matterport: string;
  youtube: string;
  project_website: string;
  google_maps: string;
  address: string;
  amount: number;
  status: "pending" | "approved" | "denied" | "archived";
  imported: boolean;
  imported_at: string | null;
}

const recommendedSet = new Set(recommendedIds as string[]);

// Preferred builders
const preferredBuilders = new Set([
  "Lewis Group Of Companies", "Beazer Homes, Northern California", "Beazer Homes, Arizona",
  "Beazer Homes, Southern California", "Beazer Homes, Las Vegas NV", "Beazer Homes, San Antonio TX",
  "Sekisui House, Northern California", "Sekisui House U.S. - SoCal",
  "K. Hovnanian", "K. Hovnanian - Southern California", "K. Hovnanian - Northern California",
  "The New Home Company Inc.", "Coventry Homes - Houston", "Coventry Homes - Dallas",
  "Coventry Homes: Austin, TX", "Coventry Homes - San Antonio", "Tricon Residential",
  "CBC Home", "Ladera Living", "Get Community", "Risewell Homes", "Thrive Companies",
  "Grand Homes Inc", "Van Daele Development Corporation", "Cadence Homes", "Cresleigh Homes",
  "Bloomfield Homes", "Rurka Homes", "Landsea Homes - NorCal",
  "DR Horton: Bay Area CA", "DR Horton: Bay Area, CA", "DR Horton: Northern CA",
  "Woodbridge Pacific Group", "Classic Homes", "City Ventures", "Trumark Homes",
  "Melia Homes", "Shaddock Homes",
  "Toll Brothers: Raleigh, NC", "Toll Brothers: Dallas, TX", "Toll Brothers: West FL",
  "Toll Brothers: CO & CO Springs", "Toll Brothers: Central FL", "Toll Brothers: North FL",
  "Toll Brothers: Houston, TX", "Toll Brothers: Austin, TX", "Toll Brothers: San Antonio, TX",
  "Toll Brothers: South FL", "Toll Brothers: Atlanta, GA", "Toll Brothers: Charlotte, NC",
  "Toll Brothers Inc.", "Toll Brothers - California",
  "Dream Finders Homes - Atlanta", "Dream Finders Homes",
]);

function extractYoutubeId(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^&?\s]+)/);
  return match ? match[1] : null;
}

function getDriveFolderId(url: string): string | null {
  const match = url.match(/folders\/([^?/]+)/);
  return match ? match[1] : null;
}

function ImportButton({ dealId, dealName, onComplete }: { dealId: string; dealName: string; onComplete: () => void }) {
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState<{ imported: number; savings: string; originalMB: string; optimizedMB: string; errors: string[] } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [overrideUrl, setOverrideUrl] = useState("");
  const [showOverride, setShowOverride] = useState(false);

  async function handleImport(url?: string) {
    setImporting(true);
    setError(null);
    setResult(null);
    try {
      const body: Record<string, string | number> = { dealId };
      if (url) body.overrideUrl = url;
      const res = await fetch("/api/media/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
        setShowOverride(true);
      } else {
        setResult(data);
        if (data.imported > 0) onComplete();
        else { setShowOverride(true); setError(`Found 0 images in folder.`); }
      }
    } catch (e) {
      setError(String(e));
      setShowOverride(true);
    }
    setImporting(false);
  }

  return (
    <div className="rounded-lg border border-[#6A5ACD]/30 bg-[#6A5ACD]/5 px-4 py-3">
      {!result && !showOverride && (
        <>
          <p className="text-xs text-[#A8A2D0]">
            Ready to import. Images will be pulled, optimized, and uploaded to the media library.
          </p>
          <button
            onClick={() => handleImport()}
            disabled={importing}
            className="mt-2 rounded-full bg-[#6A5ACD] px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#5848B5] disabled:opacity-50"
          >
            {importing ? "Importing..." : "Send to Media"}
          </button>
        </>
      )}
      {result && result.imported > 0 && (
        <p className="text-xs text-[#4CAF50]">
          Imported {result.imported} images | {result.originalMB}MB &rarr; {result.optimizedMB}MB ({result.savings} smaller)
          {result.errors.length > 0 && <span className="text-[#E57373]"> | {result.errors.length} failed</span>}
        </p>
      )}
      {showOverride && (
        <div>
          {error && <p className="mb-2 text-xs text-[#E57373]">{error}</p>}
          <p className="mb-2 text-xs text-[#A8A2D0]">
            Paste a direct WorkDrive or Google Drive folder URL to retry:
          </p>
          <div className="flex gap-2">
            <input
              type="url"
              value={overrideUrl}
              onChange={(e) => setOverrideUrl(e.target.value)}
              placeholder="https://workdrive.zoho.com/folder/... or Google Drive URL"
              className="flex-1 rounded border border-[#2C2C2C] bg-[#121212] px-3 py-1.5 text-xs text-[#F5F5F5] outline-none focus:border-[#6A5ACD]"
            />
            <button
              onClick={() => handleImport(overrideUrl)}
              disabled={importing || !overrideUrl}
              className="shrink-0 rounded-full bg-[#6A5ACD] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#5848B5] disabled:opacity-50"
            >
              {importing ? "Importing..." : "Retry"}
            </button>
          </div>
          <button
            onClick={() => { setShowOverride(false); setError(null); }}
            className="mt-2 text-[10px] text-[#666] hover:text-[#A8A2D0]"
          >
            Try auto-detect again
          </button>
        </div>
      )}
    </div>
  );
}

type TabView = "pending" | "approved" | "archived" | "imported";

export default function AdminAssetsPage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<string | null>(null);
  const [stats, setStats] = useState<Record<string, number>>({});
  const [lastSync, setLastSync] = useState<{ synced_at: string; deals_new: number } | null>(null);
  const [filters, setFilters] = useState<{ builders: string[]; states: string[]; pipelines: string[] }>({ builders: [], states: [], pipelines: [] });

  const [tab, setTab] = useState<TabView>("pending");
  const [search, setSearch] = useState("");
  const [filterBuilder, setFilterBuilder] = useState("");
  const [filterState, setFilterState] = useState("");
  const [filterPipeline, setFilterPipeline] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [batchImporting, setBatchImporting] = useState(false);
  const [batchProgress, setBatchProgress] = useState<{ current: number; total: number; currentName: string } | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchDeals = useCallback(async () => {
    setLoading(true);
    const statusMap: Record<TabView, string> = {
      pending: "pending",
      approved: "approved",
      archived: "denied",
      imported: "",
    };

    const params = new URLSearchParams();
    if (tab !== "imported") params.set("status", statusMap[tab]);
    if (tab === "approved") params.set("imported", "false");
    if (tab === "imported") params.set("imported", "true");
    if (search) params.set("search", search);
    if (filterBuilder) params.set("builder", filterBuilder);
    if (filterState) params.set("state", filterState);
    if (filterPipeline) params.set("pipeline", filterPipeline);

    const res = await fetch(`/api/deals/status?${params}`);
    const data = await res.json();
    setDeals(data.deals || []);
    setLoading(false);
  }, [tab, search, filterBuilder, filterState, filterPipeline]);

  const fetchStats = useCallback(async () => {
    const res = await fetch("/api/deals/status?action=stats");
    const data = await res.json();
    setStats(data.stats || {});
    setLastSync(data.lastSync || null);
  }, []);

  const fetchFilters = useCallback(async () => {
    const res = await fetch("/api/deals/status?action=filters");
    const data = await res.json();
    setFilters(data);
  }, []);

  useEffect(() => {
    fetchDeals();
  }, [fetchDeals]);

  useEffect(() => {
    fetchStats();
    fetchFilters();
  }, [fetchStats, fetchFilters]);

  async function setDealStatus(id: string, status: "approved" | "denied" | "pending") {
    setSaving(true);
    await fetch("/api/deals/status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    setSaving(false);
    fetchDeals();
    fetchStats();
  }

  async function bulkApproveRecommended() {
    setSaving(true);
    const ids = deals.filter((d) => recommendedSet.has(d.id)).map((d) => d.id);
    await fetch("/api/deals/status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "bulk", ids, status: "approved" }),
    });
    setSaving(false);
    fetchDeals();
    fetchStats();
  }

  function toggleSelected(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function selectAllVisible() {
    const importable = deals.filter((d) => d.status === "approved" && !d.imported && d.client_assets);
    if (selected.size === importable.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(importable.map((d) => d.id)));
    }
  }

  async function batchImport() {
    const ids = Array.from(selected);
    if (ids.length === 0) return;
    if (!confirm(`Import ${ids.length} projects to Media Library? This may take several minutes.`)) return;

    setBatchImporting(true);
    setBatchProgress({ current: 0, total: ids.length, currentName: "" });

    for (let i = 0; i < ids.length; i++) {
      const deal = deals.find((d) => d.id === ids[i]);
      setBatchProgress({ current: i + 1, total: ids.length, currentName: deal?.name || "" });
      try {
        await fetch("/api/media/import", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ dealId: ids[i] }),
        });
      } catch {
        // Continue with next deal even if one fails
      }
    }

    setBatchImporting(false);
    setBatchProgress(null);
    setSelected(new Set());
    fetchDeals();
    fetchStats();
  }

  async function syncFromZoho() {
    setSyncing(true);
    setSyncResult(null);
    try {
      const res = await fetch("/api/deals/sync", { method: "POST" });
      const data = await res.json();
      if (data.error) {
        setSyncResult(`Error: ${data.error}`);
      } else {
        setSyncResult(`Synced! ${data.new} new, ${data.updated} updated.`);
        fetchDeals();
        fetchStats();
      }
    } catch (e) {
      setSyncResult(`Failed: ${e}`);
    }
    setSyncing(false);
  }

  const tabs: { key: TabView; label: string; count: string }[] = [
    { key: "pending", label: "Pending", count: String(stats.pending || 0) },
    { key: "approved", label: "Media Pending", count: String(stats.approved || 0) },
    { key: "imported", label: "In Library", count: String(stats.imported || 0) },
    { key: "archived", label: "Archive", count: String(stats.denied || 0) },
  ];

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
              {stats.total || 0} deals | {saving ? "saving..." : `${stats.approved || 0} approved, ${stats.imported || 0} imported`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {lastSync && (
              <span className="hidden text-[10px] text-[#666] sm:block">
                Last sync: {new Date(lastSync.synced_at).toLocaleDateString()} {new Date(lastSync.synced_at).toLocaleTimeString()}
              </span>
            )}
            <button
              onClick={syncFromZoho}
              disabled={syncing}
              className="rounded-full border border-[#4CAF50] px-4 py-2 text-xs font-semibold text-[#4CAF50] transition-colors hover:bg-[#4CAF50] hover:text-white disabled:opacity-50"
            >
              {syncing ? "Syncing..." : "Pull from Zoho"}
            </button>
            <a
              href="/admin/digital"
              className="rounded-full border border-[#2C2C2C] px-4 py-2 text-xs font-semibold text-[#A8A2D0] transition-colors hover:border-[#6A5ACD] hover:text-[#6A5ACD]"
            >
              Digital
            </a>
            <a
              href="/admin/media"
              className="rounded-full border border-[#2C2C2C] px-4 py-2 text-xs font-semibold text-[#A8A2D0] transition-colors hover:border-[#6A5ACD] hover:text-[#6A5ACD]"
            >
              Media Library
            </a>
          </div>
        </div>
        {syncResult && (
          <p className={`mx-auto mt-2 max-w-7xl text-xs ${syncResult.startsWith("Error") || syncResult.startsWith("Failed") ? "text-[#E57373]" : "text-[#4CAF50]"}`}>
            {syncResult}
          </p>
        )}
      </div>

      {/* Tabs */}
      <div className="border-b border-[#2C2C2C] bg-[#1E1E1E]">
        <div className="mx-auto flex max-w-7xl">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-5 py-3 text-xs font-medium transition-colors ${
                tab === t.key
                  ? "border-b-2 border-[#6A5ACD] text-[#F5F5F5]"
                  : "text-[#666] hover:text-[#A8A2D0]"
              }`}
            >
              {t.label} <span className="ml-1 text-[#666]">{t.count}</span>
            </button>
          ))}
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
            {filters.builders.map((b) => (
              <option key={b} value={b}>{preferredBuilders.has(b) ? "★ " : ""}{b}</option>
            ))}
          </select>
          <select value={filterState} onChange={(e) => setFilterState(e.target.value)} className="rounded-lg border border-[#2C2C2C] bg-[#121212] px-3 py-2 text-sm text-[#F5F5F5]">
            <option value="">All States</option>
            {filters.states.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={filterPipeline} onChange={(e) => setFilterPipeline(e.target.value)} className="rounded-lg border border-[#2C2C2C] bg-[#121212] px-3 py-2 text-sm text-[#F5F5F5]">
            <option value="">All Pipelines</option>
            {filters.pipelines.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
          {tab === "pending" && (
            <button
              onClick={bulkApproveRecommended}
              disabled={saving}
              className="rounded-full border border-[#6A5ACD] px-4 py-2 text-xs font-semibold text-[#6A5ACD] transition-colors hover:bg-[#6A5ACD] hover:text-white disabled:opacity-50"
            >
              Approve Recommended
            </button>
          )}
          {tab === "approved" && (
            <div className="flex items-center gap-2">
              <button
                onClick={selectAllVisible}
                className="rounded-full border border-[#2C2C2C] px-4 py-2 text-xs font-semibold text-[#A8A2D0] transition-colors hover:border-[#6A5ACD] hover:text-[#6A5ACD]"
              >
                {selected.size > 0 ? `Deselect All` : `Select All`}
              </button>
              <button
                onClick={batchImport}
                disabled={selected.size === 0 || batchImporting}
                className="rounded-full bg-[#4CAF50] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#388E3C] disabled:opacity-30"
              >
                {batchImporting
                  ? `Importing ${batchProgress?.current}/${batchProgress?.total}...`
                  : `Send ${selected.size} to Media`}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Deal List */}
      <div className="mx-auto max-w-7xl px-6 py-6">
        {batchImporting && batchProgress && (
          <div className="mb-4 rounded-lg border border-[#4CAF50]/30 bg-[#4CAF50]/5 p-4">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#4CAF50]">
                Importing {batchProgress.current} of {batchProgress.total}: {batchProgress.currentName}
              </span>
              <span className="text-[#666]">{Math.round((batchProgress.current / batchProgress.total) * 100)}%</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#2C2C2C]">
              <div
                className="h-full rounded-full bg-[#4CAF50] transition-all duration-500"
                style={{ width: `${(batchProgress.current / batchProgress.total) * 100}%` }}
              />
            </div>
          </div>
        )}

        {loading && <p className="py-20 text-center text-sm text-[#666]">Loading...</p>}

        {!loading && deals.length === 0 && (
          <p className="py-20 text-center text-sm text-[#666]">
            {tab === "pending" ? "No pending deals. Pull from Zoho or check other tabs." :
             tab === "approved" ? "No approved deals awaiting media import." :
             tab === "imported" ? "No deals imported to library yet." :
             "Archive is empty."}
          </p>
        )}

        <div className="space-y-3">
          {deals.map((deal) => {
            const isExpanded = expandedId === deal.id;
            const isRecommended = recommendedSet.has(deal.id);
            const isPreferred = preferredBuilders.has(deal.builder);
            const ytId = deal.youtube ? extractYoutubeId(deal.youtube) : null;
            const driveFolderId = deal.client_assets ? getDriveFolderId(deal.client_assets) : null;

            return (
              <div
                key={deal.id}
                className={`rounded-lg border transition-colors ${
                  deal.imported
                    ? "border-[#4CAF50]/40 bg-[#4CAF50]/5"
                    : deal.status === "approved"
                      ? "border-[#6A5ACD]/40 bg-[#6A5ACD]/5"
                      : "border-[#2C2C2C] bg-[#1E1E1E]"
                }`}
              >
                <div className="flex items-center gap-4 px-5 py-4">
                  {/* Batch select checkbox */}
                  {tab === "approved" && !deal.imported && deal.client_assets && (
                    <input
                      type="checkbox"
                      checked={selected.has(deal.id)}
                      onChange={() => toggleSelected(deal.id)}
                      className="h-4 w-4 shrink-0 cursor-pointer accent-[#6A5ACD]"
                    />
                  )}
                  {/* Actions */}
                  <div className="flex shrink-0 gap-1.5">
                    {tab !== "imported" && (
                      <>
                        <button
                          onClick={() => setDealStatus(deal.id, "approved")}
                          className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                            deal.status === "approved"
                              ? "bg-[#6A5ACD] text-white"
                              : "border border-[#2C2C2C] text-[#666] hover:border-[#6A5ACD] hover:text-[#6A5ACD]"
                          }`}
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => setDealStatus(deal.id, "denied")}
                          className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                            deal.status === "denied"
                              ? "bg-[#E57373]/20 text-[#E57373]"
                              : "border border-[#2C2C2C] text-[#666] hover:border-[#E57373] hover:text-[#E57373]"
                          }`}
                        >
                          No
                        </button>
                      </>
                    )}
                  </div>

                  {/* Info */}
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : deal.id)}
                    className="flex flex-1 items-center gap-4 text-left"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-[#F5F5F5]">
                        {isRecommended && <span className="mr-1.5 text-[#6A5ACD]">&#9733;</span>}
                        {deal.name}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-[#A8A2D0]">
                        {isPreferred && <span className="mr-1 rounded bg-[#6A5ACD]/20 px-1.5 py-0.5 text-[9px] font-semibold text-[#6A5ACD]">PREFERRED</span>}
                        {deal.builder} | {deal.address || deal.city || "No address"} | {deal.pipeline}
                        {deal.production_date && ` | ${deal.production_date}`}
                        {deal.amount > 0 && ` | $${Number(deal.amount).toLocaleString()}`}
                      </p>
                    </div>

                    <div className="flex shrink-0 gap-1.5">
                      {deal.imported && (
                        <span className="rounded bg-[#4CAF50]/15 px-2 py-0.5 text-[10px] font-medium text-[#4CAF50]">In Library</span>
                      )}
                      {deal.client_assets && (
                        <span className="rounded bg-[#6A5ACD]/15 px-2 py-0.5 text-[10px] font-medium text-[#A8A2D0]">Photos</span>
                      )}
                      {deal.youtube && (
                        <span className="rounded bg-[#E57373]/15 px-2 py-0.5 text-[10px] font-medium text-[#E57373]">Video</span>
                      )}
                      {deal.matterport && (
                        <span className="rounded bg-[#4CAF50]/15 px-2 py-0.5 text-[10px] font-medium text-[#4CAF50]">3D</span>
                      )}
                    </div>

                    <svg
                      className={`h-4 w-4 shrink-0 text-[#666] transition-transform ${isExpanded ? "rotate-180" : ""}`}
                      fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>
                </div>

                {isExpanded && (
                  <div className="border-t border-[#2C2C2C] px-5 py-5">
                    <div className="mb-4 grid grid-cols-2 gap-x-8 gap-y-2 text-xs sm:grid-cols-4">
                      {deal.production_date && <div><span className="text-[#666]">Produced:</span> {deal.production_date}</div>}
                      {deal.model_name && <div><span className="text-[#666]">Model:</span> {deal.model_name}</div>}
                      {deal.qty_images && <div><span className="text-[#666]">Images:</span> {deal.qty_images}</div>}
                      {deal.asset_count && <div><span className="text-[#666]">Assets:</span> {deal.asset_count}</div>}
                      {deal.deliverables && <div className="col-span-2"><span className="text-[#666]">Deliverables:</span> {deal.deliverables}</div>}
                    </div>

                    <div className="mb-4 flex flex-wrap gap-3">
                      {deal.client_assets && <a href={deal.client_assets} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-[#6A5ACD] hover:underline">Client Assets &rarr;</a>}
                      {deal.internal_assets && <a href={deal.internal_assets} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-[#A8A2D0] hover:underline">Internal Assets &rarr;</a>}
                      {deal.matterport && <a href={deal.matterport} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-[#4CAF50] hover:underline">Matterport &rarr;</a>}
                      {deal.project_website && <a href={deal.project_website} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-[#A8A2D0] hover:underline">Website &rarr;</a>}
                    </div>

                    {ytId && (
                      <div className="mb-4">
                        <p className="mb-2 text-xs font-medium text-[#666]">Video</p>
                        <div className="aspect-video overflow-hidden rounded-lg">
                          <iframe src={`https://www.youtube.com/embed/${ytId}`} className="h-full w-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                        </div>
                      </div>
                    )}

                    {driveFolderId && (
                      <div className="mb-4">
                        <p className="mb-2 text-xs font-medium text-[#666]">Photos</p>
                        <div className="aspect-[16/9] overflow-hidden rounded-lg border border-[#2C2C2C]">
                          <iframe src={`https://drive.google.com/embeddedfolderview?id=${driveFolderId}#grid`} className="h-full w-full" />
                        </div>
                      </div>
                    )}

                    {deal.status === "approved" && !deal.imported && deal.client_assets && (
                      <ImportButton dealId={deal.id} dealName={deal.name} onComplete={() => { fetchDeals(); fetchStats(); }} />
                    )}

                    {deal.imported && (
                      <div className="rounded-lg border border-[#4CAF50]/30 bg-[#4CAF50]/5 px-4 py-3">
                        <p className="text-xs text-[#4CAF50]">
                          Imported to Media Library{deal.imported_at ? ` on ${new Date(deal.imported_at).toLocaleDateString()}` : ""}.
                        </p>
                        <a href="/admin/media" className="mt-2 inline-block text-xs font-medium text-[#4CAF50] hover:underline">
                          View in Media Library &rarr;
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
