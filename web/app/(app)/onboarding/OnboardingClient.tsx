"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TAXONOMY } from "@/lib/matching";

const SAFETY_OPTIONS = [
  { value: "public-first", label: "Public place or video first" },
  { value: "remote-only", label: "Remote only" },
  { value: "verified-only", label: "Verified mentors only" },
];

export function OnboardingClient({ initial }: { initial: Record<string, string> }) {
  const router = useRouter();
  const [goal, setGoal] = useState(initial.goal || "");
  const [domain, setDomain] = useState(initial.domain || TAXONOMY.domains[0]);
  const [stage, setStage] = useState(initial.stage || TAXONOMY.stages[1]);
  const [location, setLocation] = useState(initial.location || TAXONOMY.locations[1]);
  const [language, setLanguage] = useState(initial.language || TAXONOMY.languages[1]);
  const [meeting, setMeeting] = useState(initial.meeting || TAXONOMY.meetings[1]);
  const [budget, setBudget] = useState(initial.budget || TAXONOMY.budgets[4]);
  const [safety, setSafety] = useState(initial.safety || "public-first");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const filled = [goal, domain, stage, location, language, meeting, budget, safety].filter(Boolean).length;
  const pct = Math.round((filled / 8) * 100);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const res = await fetch("/api/preferences", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ goal, domain, stage, location, language, meeting, budget, safety }),
    });
    setSaving(false);
    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Could not save preferences.");
      return;
    }
    router.push("/discover");
    router.refresh();
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <p className="eyebrow mb-2">Guided setup</p>
        <h2 className="text-2xl mb-2">Tune matching before the first search</h2>
        <p className="text-[var(--muted)]">These defaults prefill discovery and keep privacy choices explicit.</p>
      </div>

      <div className="grid md:grid-cols-[1fr_280px] gap-6">
        <form onSubmit={save} className="bg-[var(--surface)] rounded-xl border border-[var(--line)] p-6 grid gap-4">
          <label className="grid gap-1.5 md:col-span-2">
            <span className="field-label">Primary goal</span>
            <input className="field-input" value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="Build a robotics career, switch into AI, validate SaaS pricing..." />
          </label>
          <label className="grid gap-1.5">
            <span className="field-label">Domain</span>
            <select className="field-input" value={domain} onChange={(e) => setDomain(e.target.value)}>
              {TAXONOMY.domains.map((d) => <option key={d}>{d}</option>)}
            </select>
          </label>
          <label className="grid gap-1.5">
            <span className="field-label">Stage</span>
            <select className="field-input" value={stage} onChange={(e) => setStage(e.target.value)}>
              {TAXONOMY.stages.map((s) => <option key={s}>{s}</option>)}
            </select>
          </label>
          <label className="grid gap-1.5">
            <span className="field-label">Location context</span>
            <select className="field-input" value={location} onChange={(e) => setLocation(e.target.value)}>
              {TAXONOMY.locations.map((l) => <option key={l}>{l}</option>)}
            </select>
          </label>
          <label className="grid gap-1.5">
            <span className="field-label">Language</span>
            <select className="field-input" value={language} onChange={(e) => setLanguage(e.target.value)}>
              {TAXONOMY.languages.map((l) => <option key={l}>{l}</option>)}
            </select>
          </label>
          <label className="grid gap-1.5">
            <span className="field-label">Meeting comfort</span>
            <select className="field-input" value={meeting} onChange={(e) => setMeeting(e.target.value)}>
              {TAXONOMY.meetings.filter((m) => m !== "No preference").map((m) => <option key={m}>{m}</option>)}
            </select>
          </label>
          <label className="grid gap-1.5">
            <span className="field-label">Budget comfort</span>
            <select className="field-input" value={budget} onChange={(e) => setBudget(e.target.value)}>
              {TAXONOMY.budgets.filter((b) => b !== "No preference").map((b) => <option key={b}>{b}</option>)}
            </select>
          </label>
          <label className="grid gap-1.5 md:col-span-2">
            <span className="field-label">Safety preference</span>
            <select className="field-input" value={safety} onChange={(e) => setSafety(e.target.value)}>
              {SAFETY_OPTIONS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </label>
          <div className="md:col-span-2 flex gap-2">
            <button type="submit" className="btn-primary" disabled={saving}>{saving ? "Saving..." : "Save preferences"}</button>
          </div>
          {error && <p className="text-[var(--danger)] text-sm md:col-span-2">{error}</p>}
        </form>

        <aside className="space-y-4">
          <div className="bg-[var(--surface)] rounded-xl border border-[var(--line)] p-5">
            <p className="eyebrow mb-2">Completion</p>
            <p className="text-3xl font-poppins font-bold">{pct}%</p>
            <div className="mt-2 h-1.5 rounded-full bg-[var(--surface-soft)] overflow-hidden">
              <div className="h-full bg-[var(--primary)] transition-all" style={{ width: `${pct}%` }} />
            </div>
          </div>
          <div className="bg-[var(--ink)] text-[#faf9f5] rounded-xl p-5">
            <p className="eyebrow text-[#f4d77a]/80 mb-2">Privacy default</p>
            <h3 className="text-base mb-2">Private first</h3>
            <p className="text-sm text-[#d8d4cb]">Resume notes and sensitive context stay private. Mentors see only the matching reasons you choose to share.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
