"use client";

// /admin/showcase — build a personalized product showcase link per client.
// Type the builder's website, pull their logo, add who the meeting is with,
// and get a /for/<id> link to paste into email, Slack, or a calendar invite.
//
// Writes are verified server-side with the admin password (sent as adminKey),
// because AdminAuth only gates the UI.

import { useCallback, useEffect, useState } from "react";

const KEY_STORAGE = "dig-showcase-key";

type Attendee = { name: string; title?: string };
type Deck = {
  id: string;
  builder_name: string;
  website: string | null;
  logo_url: string | null;
  logo_bg: "light" | "dark";
  attendees: Attendee[];
  meeting_date: string | null;
  opening_line: string | null;
  prepared_by: string | null;
  views: number;
  last_viewed_at: string | null;
  created_at: string;
};
type Candidate = { url: string; source: string; score: number; reversed: boolean };

type Form = {
  builder_name: string;
  website: string;
  logo_source_url: string | null;
  logo_bg: "light" | "dark";
  attendees: Attendee[];
  meeting_date: string;
  opening_line: string;
  prepared_by: string;
};

const EMPTY: Form = {
  builder_name: "",
  website: "",
  logo_source_url: null,
  logo_bg: "light",
  attendees: [{ name: "", title: "" }],
  meeting_date: new Date().toISOString().slice(0, 10),
  opening_line: "",
  prepared_by: "",
};

const input =
  "w-full rounded-lg border border-[#2C2C2C] bg-[#141414] px-3 py-2 text-sm text-white placeholder:text-[#555] focus:border-[#6A5ACD] focus:outline-none";
const label = "mb-1.5 block text-[10px] font-bold uppercase tracking-[0.15em] text-[#888]";

function deckUrl(id: string) {
  return `${window.location.origin}/for/${id}`;
}

export default function ShowcaseAdminPage() {
  const [adminKey, setAdminKey] = useState("");
  const [decks, setDecks] = useState<Deck[]>([]);
  const [form, setForm] = useState<Form>(EMPTY);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [busy, setBusy] = useState<"" | "scrape" | "save" | "list">("");
  const [error, setError] = useState("");
  const [created, setCreated] = useState<Deck | null>(null);
  const [copied, setCopied] = useState("");
  const [manualLogo, setManualLogo] = useState("");

  const api = useCallback(
    async (payload: Record<string, unknown>) => {
      const res = await fetch("/api/client-showcase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, adminKey }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
      return data;
    },
    [adminKey],
  );

  const refresh = useCallback(async () => {
    if (!adminKey) return;
    setBusy("list");
    try {
      const data = await api({ action: "list" });
      setDecks(data.decks);
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy("");
    }
  }, [api, adminKey]);

  useEffect(() => {
    setAdminKey(sessionStorage.getItem(KEY_STORAGE) || "");
  }, []);
  useEffect(() => {
    refresh();
  }, [refresh]);

  function saveKey(k: string) {
    setAdminKey(k);
    try {
      sessionStorage.setItem(KEY_STORAGE, k);
    } catch {}
  }

  async function pullBranding() {
    if (!form.website.trim()) return setError("Enter the builder's website first.");
    setBusy("scrape");
    setError("");
    try {
      const data = await api({ action: "scrape", website: form.website });
      setCandidates(data.candidates);
      setForm((f) => ({
        ...f,
        website: data.website,
        builder_name: f.builder_name || data.name || "",
        logo_source_url: data.candidates[0]?.url ?? f.logo_source_url,
        logo_bg: data.candidates[0] ? (data.candidates[0].reversed ? "dark" : "light") : f.logo_bg,
      }));
      if (!data.candidates.length) setError("No logo found on that page. Paste a logo URL below instead.");
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy("");
    }
  }

  async function save() {
    if (!form.builder_name.trim()) return setError("Builder name is required.");
    setBusy("save");
    setError("");
    try {
      const deck = {
        ...form,
        attendees: form.attendees.filter((a) => a.name.trim()),
      };
      const data = editingId
        ? await api({ action: "update", id: editingId, deck })
        : await api({ action: "create", deck });
      setCreated(data.deck);
      setForm(EMPTY);
      setCandidates([]);
      setEditingId(null);
      setManualLogo("");
      await refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy("");
    }
  }

  async function remove(d: Deck) {
    if (!confirm(`Delete the ${d.builder_name} deck? Its link will stop working.`)) return;
    try {
      await api({ action: "delete", id: d.id });
      await refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }

  function edit(d: Deck) {
    setEditingId(d.id);
    setCreated(null);
    setCandidates([]);
    setForm({
      builder_name: d.builder_name,
      website: d.website ?? "",
      logo_source_url: d.logo_url,
      logo_bg: d.logo_bg,
      attendees: d.attendees.length ? d.attendees : [{ name: "", title: "" }],
      meeting_date: d.meeting_date ?? "",
      opening_line: d.opening_line ?? "",
      prepared_by: d.prepared_by ?? "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function copy(id: string) {
    await navigator.clipboard.writeText(deckUrl(id));
    setCopied(id);
    window.setTimeout(() => setCopied(""), 1600);
  }

  const setAtt = (i: number, patch: Partial<Attendee>) =>
    setForm((f) => ({ ...f, attendees: f.attendees.map((a, j) => (j === i ? { ...a, ...patch } : a)) }));

  const logoPreviewBg = form.logo_bg === "dark" ? "bg-[#121212] border border-white/10" : "bg-white";

  return (
    <div className="min-h-screen bg-[#0d0d0d] px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#A8A2D0]">Client Decks</p>
            <h1 className="mt-1 font-heading text-4xl font-medium">Product showcase links</h1>
            <p className="mt-2 max-w-xl text-sm text-[#888]">
              One link per meeting. The deck shows CineFlow, ActFlow, Listing, Spec+, and PlanMatch, branded with the
              builder&apos;s logo and the people you&apos;re meeting.{" "}
              <a href="/for/sample" target="_blank" className="text-[#A8A2D0] hover:underline">
                See the unbranded sample
              </a>
              .
            </p>
          </div>
          <div className="w-64">
            <label className={label}>Admin password</label>
            <input
              type="password"
              className={input}
              value={adminKey}
              onChange={(e) => saveKey(e.target.value)}
              placeholder="Needed to save decks"
            />
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</div>
        )}

        {created && (
          <div className="mb-6 rounded-xl border border-[#6A5ACD]/50 bg-[#6A5ACD]/10 p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#A8A2D0]">
              Deck ready for {created.builder_name}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <code className="rounded bg-black/40 px-3 py-2 text-sm text-white">{deckUrl(created.id)}</code>
              <button
                onClick={() => copy(created.id)}
                className="rounded-full bg-[#6A5ACD] px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] hover:bg-[#857AE0]"
              >
                {copied === created.id ? "Copied" : "Copy link"}
              </button>
              <a
                href={`/for/${created.id}?preview=1`}
                target="_blank"
                className="text-xs font-semibold text-[#A8A2D0] hover:underline"
              >
                Preview &rarr;
              </a>
            </div>
          </div>
        )}

        {/* ── Form ── */}
        <section className="rounded-2xl border border-[#2C2C2C] bg-[#111] p-6">
          <h2 className="mb-5 text-sm font-semibold">
            {editingId ? `Editing ${form.builder_name || editingId}` : "New deck"}
          </h2>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-5">
              <div>
                <label className={label}>Builder website</label>
                <div className="flex gap-2">
                  <input
                    className={input}
                    value={form.website}
                    onChange={(e) => setForm({ ...form, website: e.target.value })}
                    placeholder="dreeshomes.com"
                    onKeyDown={(e) => e.key === "Enter" && pullBranding()}
                  />
                  <button
                    onClick={pullBranding}
                    disabled={busy === "scrape"}
                    className="shrink-0 rounded-lg bg-[#6A5ACD] px-4 text-xs font-bold uppercase tracking-[0.1em] hover:bg-[#857AE0] disabled:opacity-50"
                  >
                    {busy === "scrape" ? "Pulling…" : "Pull branding"}
                  </button>
                </div>
              </div>
              <div>
                <label className={label}>Builder name</label>
                <input
                  className={input}
                  value={form.builder_name}
                  onChange={(e) => setForm({ ...form, builder_name: e.target.value })}
                  placeholder="Drees Homes"
                />
              </div>
              <div>
                <label className={label}>Prepared for</label>
                <div className="space-y-2">
                  {form.attendees.map((a, i) => (
                    <div key={i} className="flex gap-2">
                      <input
                        className={input}
                        value={a.name}
                        onChange={(e) => setAtt(i, { name: e.target.value })}
                        placeholder="Name"
                      />
                      <input
                        className={input}
                        value={a.title ?? ""}
                        onChange={(e) => setAtt(i, { title: e.target.value })}
                        placeholder="Title (optional)"
                      />
                      <button
                        onClick={() =>
                          setForm((f) => ({
                            ...f,
                            attendees: f.attendees.length > 1 ? f.attendees.filter((_, j) => j !== i) : [{ name: "", title: "" }],
                          }))
                        }
                        className="shrink-0 px-2 text-[#666] hover:text-red-400"
                        aria-label="Remove attendee"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => setForm((f) => ({ ...f, attendees: [...f.attendees, { name: "", title: "" }] }))}
                    className="text-xs font-semibold text-[#A8A2D0] hover:underline"
                  >
                    + Add person
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={label}>Meeting date</label>
                  <input
                    type="date"
                    className={input}
                    value={form.meeting_date}
                    onChange={(e) => setForm({ ...form, meeting_date: e.target.value })}
                  />
                </div>
                <div>
                  <label className={label}>From (optional)</label>
                  <input
                    className={input}
                    value={form.prepared_by}
                    onChange={(e) => setForm({ ...form, prepared_by: e.target.value })}
                    placeholder="Chad Davies"
                  />
                </div>
              </div>
              <div>
                <label className={label}>Opening line (optional)</label>
                <input
                  className={input}
                  value={form.opening_line}
                  onChange={(e) => setForm({ ...form, opening_line: e.target.value })}
                  placeholder={`A look at what else DIG can take on for ${form.builder_name || "the builder"}.`}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className={label}>Logo</label>
                <div className={`flex h-32 items-center justify-center rounded-xl ${logoPreviewBg}`}>
                  {form.logo_source_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={form.logo_source_url} alt="Selected logo" className="max-h-20 max-w-[70%] object-contain" />
                  ) : (
                    <span className="text-xs text-[#888]">No logo yet. Pull branding or paste a URL.</span>
                  )}
                </div>
                <div className="mt-2 flex items-center gap-4 text-xs text-[#aaa]">
                  <span>Tile:</span>
                  {(["light", "dark"] as const).map((bg) => (
                    <label key={bg} className="flex items-center gap-1.5">
                      <input
                        type="radio"
                        checked={form.logo_bg === bg}
                        onChange={() => setForm({ ...form, logo_bg: bg })}
                      />
                      {bg === "light" ? "White (standard logo)" : "Ink (white logo)"}
                    </label>
                  ))}
                  {form.logo_source_url && (
                    <button
                      onClick={() => setForm({ ...form, logo_source_url: null })}
                      className="ml-auto text-[#666] hover:text-red-400"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>

              {candidates.length > 0 && (
                <div>
                  <label className={label}>Found on their site, pick one</label>
                  <div className="grid grid-cols-3 gap-2">
                    {candidates.map((c) => (
                      <button
                        key={c.url}
                        onClick={() => setForm({ ...form, logo_source_url: c.url, logo_bg: c.reversed ? "dark" : "light" })}
                        className={`flex h-20 flex-col items-center justify-center gap-1 rounded-lg p-2 ${
                          c.reversed ? "bg-[#121212]" : "bg-white"
                        } ${form.logo_source_url === c.url ? "ring-2 ring-[#6A5ACD]" : "ring-1 ring-[#2C2C2C]"}`}
                        title={c.source}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={c.url} alt="" className="max-h-12 max-w-full object-contain" />
                        <span className="text-[9px] uppercase tracking-wider text-[#888]">{c.source}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className={label}>Or paste a logo image URL</label>
                <div className="flex gap-2">
                  <input
                    className={input}
                    value={manualLogo}
                    onChange={(e) => setManualLogo(e.target.value)}
                    placeholder="https://…/logo.svg"
                  />
                  <button
                    onClick={() => manualLogo.trim() && setForm({ ...form, logo_source_url: manualLogo.trim() })}
                    className="shrink-0 rounded-lg border border-[#2C2C2C] px-3 text-xs font-semibold hover:border-[#6A5ACD]"
                  >
                    Use
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-4 border-t border-[#2C2C2C] pt-5">
            <button
              onClick={save}
              disabled={busy === "save" || !adminKey}
              className="rounded-full bg-[#6A5ACD] px-6 py-2.5 text-xs font-bold uppercase tracking-[0.12em] hover:bg-[#857AE0] disabled:opacity-40"
            >
              {busy === "save" ? "Saving…" : editingId ? "Save changes" : "Create deck link"}
            </button>
            {editingId && (
              <button
                onClick={() => {
                  setEditingId(null);
                  setForm(EMPTY);
                  setCandidates([]);
                }}
                className="text-xs text-[#888] hover:text-white"
              >
                Cancel
              </button>
            )}
            {!adminKey && <span className="text-xs text-[#888]">Enter the admin password above to save.</span>}
          </div>
        </section>

        {/* ── List ── */}
        <section className="mt-10">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold">All decks</h2>
            <button onClick={refresh} className="text-xs text-[#888] hover:text-white">
              {busy === "list" ? "Loading…" : "Refresh"}
            </button>
          </div>
          {decks.length === 0 ? (
            <p className="text-sm text-[#666]">{adminKey ? "No decks yet." : "Enter the admin password to see decks."}</p>
          ) : (
            <div className="overflow-hidden rounded-xl border border-[#2C2C2C]">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#141414] text-[10px] uppercase tracking-[0.15em] text-[#777]">
                  <tr>
                    <th className="px-4 py-3">Builder</th>
                    <th className="px-4 py-3">Prepared for</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Views</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {decks.map((d) => (
                    <tr key={d.id} className="border-t border-[#222] align-middle">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-9 w-16 items-center justify-center rounded ${
                              d.logo_bg === "dark" ? "bg-[#121212]" : "bg-white"
                            }`}
                          >
                            {d.logo_url && (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={d.logo_url} alt="" className="max-h-6 max-w-[52px] object-contain" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{d.builder_name}</p>
                            <p className="text-[11px] text-[#666]">/for/{d.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-[#aaa]">{d.attendees.map((a) => a.name).join(", ") || "–"}</td>
                      <td className="px-4 py-3 text-[#aaa]">{d.meeting_date || "–"}</td>
                      <td className="px-4 py-3 text-[#aaa]">
                        {d.views}
                        {d.last_viewed_at && (
                          <span className="block text-[10px] text-[#666]">
                            last {new Date(d.last_viewed_at).toLocaleDateString()}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-3 text-xs">
                          <button onClick={() => copy(d.id)} className="font-semibold text-[#A8A2D0] hover:underline">
                            {copied === d.id ? "Copied" : "Copy link"}
                          </button>
                          <a href={`/for/${d.id}?preview=1`} target="_blank" className="text-[#aaa] hover:text-white">
                            Preview
                          </a>
                          <button onClick={() => edit(d)} className="text-[#aaa] hover:text-white">
                            Edit
                          </button>
                          <button onClick={() => remove(d)} className="text-[#666] hover:text-red-400">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
