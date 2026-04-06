"use client";

import { useState, useEffect, useCallback } from "react";

interface Transaction {
  id: string;
  transaction_id: string;
  project_name: string;
  account: string;
  contact: string;
  contact_email: string;
  transaction_type: string;
  selected_services: string[];
  status: string;
  project_address: string;
  project_city_state: string;
  community_name: string;
  job_number: string;
  num_resource_files: number;
  total_points: number;
  resource_files_url: string;
  final_assets_url: string;
  client_assets_url: string;
  production_folder: string;
  project_url: string;
  target_completion: string;
  date_created: string;
  date_delivered: string;
  job_notes: string;
  additional_services: string;
  approval_status: string;
  imported: boolean;
  imported_at: string | null;
}

type TabView = "pending" | "approved" | "imported" | "archived";

export default function AdminDigitalPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<string | null>(null);
  const [stats, setStats] = useState<Record<string, number>>({});
  const [lastSync, setLastSync] = useState<{ synced_at: string } | null>(null);
  const [filters, setFilters] = useState<{ accounts: string[]; statuses: string[]; services: string[] }>({ accounts: [], statuses: [], services: [] });

  const [tab, setTab] = useState<TabView>("pending");
  const [search, setSearch] = useState("");
  const [filterAccount, setFilterAccount] = useState("");
  const [filterService, setFilterService] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [batchImporting, setBatchImporting] = useState(false);
  const [batchProgress, setBatchProgress] = useState<{ current: number; total: number; currentName: string } | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (tab !== "imported") params.set("approval_status", tab === "archived" ? "denied" : tab);
    if (tab === "imported") params.set("imported", "true");
    if (search) params.set("search", search);
    if (filterAccount) params.set("account", filterAccount);
    if (filterService) params.set("service", filterService);

    const res = await fetch(`/api/digital/status?${params}`);
    const data = await res.json();
    setTransactions(data.transactions || []);
    setLoading(false);
  }, [tab, search, filterAccount, filterService]);

  const fetchStats = useCallback(async () => {
    const res = await fetch("/api/digital/status?action=stats");
    const data = await res.json();
    setStats(data.stats || {});
    setLastSync(data.lastSync || null);
  }, []);

  const fetchFilters = useCallback(async () => {
    const res = await fetch("/api/digital/status?action=filters");
    setFilters(await res.json());
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);
  useEffect(() => { fetchStats(); fetchFilters(); }, [fetchStats, fetchFilters]);

  async function setTxStatus(id: string, status: string) {
    setSaving(true);
    await fetch("/api/digital/status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    setSaving(false);
    fetchData();
    fetchStats();
  }

  async function syncFromZoho() {
    setSyncing(true);
    setSyncResult(null);
    try {
      const res = await fetch("/api/digital/sync", { method: "POST" });
      const data = await res.json();
      setSyncResult(data.error ? `Error: ${data.error}` : `Synced! ${data.new} new, ${data.updated} updated.`);
      fetchData();
      fetchStats();
    } catch (e) {
      setSyncResult(`Failed: ${e}`);
    }
    setSyncing(false);
  }

  function toggleSelected(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  function selectAllVisible() {
    const importable = transactions.filter((t) => t.approval_status === "approved" && !t.imported && (t.final_assets_url || t.client_assets_url));
    if (selected.size === importable.length) setSelected(new Set());
    else setSelected(new Set(importable.map((t) => t.id)));
  }

  async function batchImport() {
    const ids = Array.from(selected);
    if (!ids.length || !confirm(`Import ${ids.length} digital projects to Media Library?`)) return;
    setBatchImporting(true);
    setBatchProgress({ current: 0, total: ids.length, currentName: "" });
    for (let i = 0; i < ids.length; i++) {
      const tx = transactions.find((t) => t.id === ids[i]);
      setBatchProgress({ current: i + 1, total: ids.length, currentName: tx?.project_name || "" });
      try {
        await fetch("/api/media/import", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ dealId: ids[i] }),
        });
      } catch { /* continue */ }
    }
    setBatchImporting(false);
    setBatchProgress(null);
    setSelected(new Set());
    fetchData();
    fetchStats();
  }

  const tabs: { key: TabView; label: string; count: string }[] = [
    { key: "pending", label: "Pending", count: String(stats.pending || 0) },
    { key: "approved", label: "Media Pending", count: String(stats.approved || 0) },
    { key: "imported", label: "In Library", count: String(stats.imported || 0) },
    { key: "archived", label: "Archive", count: String(stats.denied || 0) },
  ];

  const serviceBadgeColor: Record<string, string> = {
    Staging: "bg-[#6A5ACD]/15 text-[#A8A2D0]",
    "Video Wide": "bg-[#E57373]/15 text-[#E57373]",
    "Video Social": "bg-[#4CAF50]/15 text-[#4CAF50]",
  };

  return (
    <div className="min-h-screen bg-[#121212] text-[#F5F5F5]">
      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-[#2C2C2C] bg-[#1E1E1E] px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-[#F5F5F5]" style={{ fontSize: "1.125rem" }}>
              Digital Pipeline
            </h1>
            <p className="text-xs text-[#A8A2D0]">
              {stats.total || 0} transactions | {saving ? "saving..." : `${stats.approved || 0} approved, ${stats.imported || 0} imported`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {lastSync && (
              <span className="hidden text-[10px] text-[#666] sm:block">
                Last sync: {new Date(lastSync.synced_at).toLocaleDateString()} {new Date(lastSync.synced_at).toLocaleTimeString()}
              </span>
            )}
            <button onClick={syncFromZoho} disabled={syncing} className="rounded-full border border-[#4CAF50] px-4 py-2 text-xs font-semibold text-[#4CAF50] transition-colors hover:bg-[#4CAF50] hover:text-white disabled:opacity-50">
              {syncing ? "Syncing..." : "Pull from Zoho"}
            </button>
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
            <button key={t.key} onClick={() => setTab(t.key)} className={`px-5 py-3 text-xs font-medium transition-colors ${tab === t.key ? "border-b-2 border-[#6A5ACD] text-[#F5F5F5]" : "text-[#666] hover:text-[#A8A2D0]"}`}>
              {t.label} <span className="ml-1 text-[#666]">{t.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="border-b border-[#2C2C2C] bg-[#1E1E1E] px-6 py-3">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3">
          <input type="text" placeholder="Search projects, accounts..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="flex-1 rounded-lg border border-[#2C2C2C] bg-[#121212] px-4 py-2 text-sm text-[#F5F5F5] outline-none placeholder:text-[#666] focus:border-[#6A5ACD]" />
          <select value={filterAccount} onChange={(e) => setFilterAccount(e.target.value)} className="rounded-lg border border-[#2C2C2C] bg-[#121212] px-3 py-2 text-sm text-[#F5F5F5]">
            <option value="">All Accounts</option>
            {filters.accounts.map((a) => <option key={a} value={a}>{a}</option>)}
          </select>
          <select value={filterService} onChange={(e) => setFilterService(e.target.value)} className="rounded-lg border border-[#2C2C2C] bg-[#121212] px-3 py-2 text-sm text-[#F5F5F5]">
            <option value="">All Services</option>
            {filters.services.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          {tab === "approved" && (
            <div className="flex items-center gap-2">
              <button onClick={selectAllVisible} className="rounded-full border border-[#2C2C2C] px-4 py-2 text-xs font-semibold text-[#A8A2D0] hover:border-[#6A5ACD] hover:text-[#6A5ACD]">
                {selected.size > 0 ? "Deselect All" : "Select All"}
              </button>
              <button onClick={batchImport} disabled={selected.size === 0 || batchImporting}
                className="rounded-full bg-[#4CAF50] px-4 py-2 text-xs font-semibold text-white hover:bg-[#388E3C] disabled:opacity-30">
                {batchImporting ? `Importing ${batchProgress?.current}/${batchProgress?.total}...` : `Send ${selected.size} to Media`}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* List */}
      <div className="mx-auto max-w-7xl px-6 py-6">
        {batchImporting && batchProgress && (
          <div className="mb-4 rounded-lg border border-[#4CAF50]/30 bg-[#4CAF50]/5 p-4">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#4CAF50]">Importing {batchProgress.current} of {batchProgress.total}: {batchProgress.currentName}</span>
              <span className="text-[#666]">{Math.round((batchProgress.current / batchProgress.total) * 100)}%</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#2C2C2C]">
              <div className="h-full rounded-full bg-[#4CAF50] transition-all duration-500" style={{ width: `${(batchProgress.current / batchProgress.total) * 100}%` }} />
            </div>
          </div>
        )}

        {loading && <p className="py-20 text-center text-sm text-[#666]">Loading...</p>}
        {!loading && transactions.length === 0 && (
          <p className="py-20 text-center text-sm text-[#666]">
            {tab === "pending" ? "No pending transactions. Pull from Zoho." : "No transactions in this tab."}
          </p>
        )}

        <div className="space-y-3">
          {transactions.map((tx) => {
            const isExpanded = expandedId === tx.id;
            return (
              <div key={tx.id} className={`rounded-lg border transition-colors ${
                tx.imported ? "border-[#4CAF50]/40 bg-[#4CAF50]/5"
                : tx.approval_status === "approved" ? "border-[#6A5ACD]/40 bg-[#6A5ACD]/5"
                : "border-[#2C2C2C] bg-[#1E1E1E]"
              }`}>
                <div className="flex items-center gap-4 px-5 py-4">
                  {tab === "approved" && !tx.imported && (tx.final_assets_url || tx.client_assets_url) && (
                    <input type="checkbox" checked={selected.has(tx.id)} onChange={() => toggleSelected(tx.id)} className="h-4 w-4 shrink-0 cursor-pointer accent-[#6A5ACD]" />
                  )}
                  <div className="flex shrink-0 gap-1.5">
                    {tab !== "imported" && (
                      <>
                        <button onClick={() => setTxStatus(tx.id, "approved")} className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${tx.approval_status === "approved" ? "bg-[#6A5ACD] text-white" : "border border-[#2C2C2C] text-[#666] hover:border-[#6A5ACD] hover:text-[#6A5ACD]"}`}>Yes</button>
                        <button onClick={() => setTxStatus(tx.id, "denied")} className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${tx.approval_status === "denied" ? "bg-[#E57373]/20 text-[#E57373]" : "border border-[#2C2C2C] text-[#666] hover:border-[#E57373] hover:text-[#E57373]"}`}>No</button>
                      </>
                    )}
                  </div>
                  <button onClick={() => setExpandedId(isExpanded ? null : tx.id)} className="flex flex-1 items-center gap-4 text-left">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-[#F5F5F5]">
                        #{tx.transaction_id} {tx.project_name}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-[#A8A2D0]">
                        {tx.account} | {tx.project_city_state || "No location"} | {tx.status || "No status"}
                        {tx.date_delivered && ` | Delivered ${new Date(tx.date_delivered).toLocaleDateString()}`}
                      </p>
                    </div>
                    <div className="flex shrink-0 gap-1.5">
                      {tx.imported && <span className="rounded bg-[#4CAF50]/15 px-2 py-0.5 text-[10px] font-medium text-[#4CAF50]">In Library</span>}
                      {(tx.selected_services || []).map((svc) => (
                        <span key={svc} className={`rounded px-2 py-0.5 text-[10px] font-medium ${serviceBadgeColor[svc] || "bg-[#2C2C2C] text-[#666]"}`}>{svc}</span>
                      ))}
                    </div>
                    <svg className={`h-4 w-4 shrink-0 text-[#666] transition-transform ${isExpanded ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>
                </div>

                {isExpanded && (
                  <div className="border-t border-[#2C2C2C] px-5 py-5">
                    <div className="mb-4 grid grid-cols-2 gap-x-8 gap-y-2 text-xs sm:grid-cols-4">
                      {tx.contact && <div><span className="text-[#666]">Contact:</span> {tx.contact}</div>}
                      {tx.contact_email && <div><span className="text-[#666]">Email:</span> {tx.contact_email}</div>}
                      {tx.community_name && <div><span className="text-[#666]">Community:</span> {tx.community_name}</div>}
                      {tx.job_number && <div><span className="text-[#666]">Job #:</span> {tx.job_number}</div>}
                      {tx.num_resource_files > 0 && <div><span className="text-[#666]">Resource Files:</span> {tx.num_resource_files}</div>}
                      {tx.total_points !== 0 && <div><span className="text-[#666]">Points:</span> {tx.total_points}</div>}
                      {tx.date_created && <div><span className="text-[#666]">Created:</span> {new Date(tx.date_created).toLocaleDateString()}</div>}
                      {tx.date_delivered && <div><span className="text-[#666]">Delivered:</span> {new Date(tx.date_delivered).toLocaleDateString()}</div>}
                      {tx.target_completion && <div><span className="text-[#666]">Target:</span> {tx.target_completion}</div>}
                      {tx.job_notes && <div className="col-span-2"><span className="text-[#666]">Notes:</span> {tx.job_notes}</div>}
                      {tx.additional_services && <div className="col-span-2"><span className="text-[#666]">Additional:</span> {tx.additional_services}</div>}
                    </div>
                    {/* Before & After links */}
                    {(tx.resource_files_url || tx.client_assets_url) && (
                      <div className="mb-4 grid grid-cols-2 gap-3">
                        {tx.resource_files_url && (
                          <a href={tx.resource_files_url} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-3 rounded-lg border border-[#E57373]/30 bg-[#E57373]/5 px-4 py-3 transition-colors hover:border-[#E57373]/60">
                            <div>
                              <p className="text-[10px] font-bold uppercase tracking-widest text-[#E57373]">Before</p>
                              <p className="text-xs text-[#A8A2D0]">Original photos ({tx.num_resource_files} files)</p>
                            </div>
                            <span className="ml-auto text-xs text-[#E57373]">&rarr;</span>
                          </a>
                        )}
                        {tx.client_assets_url && (
                          <a href={tx.client_assets_url} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-3 rounded-lg border border-[#4CAF50]/30 bg-[#4CAF50]/5 px-4 py-3 transition-colors hover:border-[#4CAF50]/60">
                            <div>
                              <p className="text-[10px] font-bold uppercase tracking-widest text-[#4CAF50]">After</p>
                              <p className="text-xs text-[#A8A2D0]">Finished assets</p>
                            </div>
                            <span className="ml-auto text-xs text-[#4CAF50]">&rarr;</span>
                          </a>
                        )}
                      </div>
                    )}

                    {/* Other links */}
                    <div className="flex flex-wrap gap-3">
                      {tx.final_assets_url && <a href={tx.final_assets_url} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-[#A8A2D0] hover:underline">Internal Assets &rarr;</a>}
                      {tx.production_folder && <a href={tx.production_folder} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-[#A8A2D0] hover:underline">Production &rarr;</a>}
                      {tx.project_url && <a href={tx.project_url} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-[#A8A2D0] hover:underline">Zoho Project &rarr;</a>}
                    </div>
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
