"use client";

import { useState } from "react";
import { TAXONOMY, type MentorMatch } from "@/lib/matching";

export default function DiscoverPage() {
  const [statement, setStatement] = useState("");
  const [domain, setDomain] = useState<string>(TAXONOMY.domains[0]);
  const [stage, setStage] = useState<string>(TAXONOMY.stages[1]);
  const [location, setLocation] = useState<string>(TAXONOMY.locations[1]);
  const [language, setLanguage] = useState<string>(TAXONOMY.languages[1]);
  const [meeting, setMeeting] = useState<string>(TAXONOMY.meetings[1]);
  const [budget, setBudget] = useState<string>(TAXONOMY.budgets[4]);
  const [profileNotes, setProfileNotes] = useState("");
  const [matches, setMatches] = useState<MentorMatch[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [bookingStatus, setBookingStatus] = useState<Record<string, string>>({});

  async function runMatch(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setBookingStatus({});
    const res = await fetch("/api/match", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ statement, domain, stage, location, language, meeting, budget, profileNotes }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) { setError(data.error || "Matching failed."); return; }
    setMatches(data.matches);
  }

  async function requestBooking(mentorId: string) {
    setBookingStatus((current) => ({ ...current, [mentorId]: "Requesting..." }));
    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mentorId, problemSummary: statement }),
    });
    const data = await res.json();
    setBookingStatus((current) => ({
      ...current,
      [mentorId]: res.ok ? "Requested" : data.error || "Request failed.",
    }));
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <p className="eyebrow mb-2">Problem-first matching</p>
        <h2 className="text-2xl mb-2">Describe the problem. Get ranked matches.</h2>
        <p className="text-[var(--muted)]">
          The matching engine scores mentors across expertise, lived context, stage, location, language, meeting type, and budget fit.
          Want to browse instead? <a href="/mentors" className="text-[var(--primary)] underline">Browse the directory →</a>
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <form onSubmit={runMatch} className="bg-[var(--surface)] rounded-xl border border-[var(--line)] p-6 grid gap-4">
          <label className="grid gap-1.5 md:col-span-2">
            <span className="field-label">Problem statement</span>
            <textarea className="field-input" rows={5} value={statement} onChange={(e) => setStatement(e.target.value)} placeholder="Describe what you need help deciding..." required />
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
            <span className="field-label">Location</span>
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
            <span className="field-label">Meeting type</span>
            <select className="field-input" value={meeting} onChange={(e) => setMeeting(e.target.value)}>
              {TAXONOMY.meetings.map((m) => <option key={m}>{m}</option>)}
            </select>
          </label>
          <label className="grid gap-1.5">
            <span className="field-label">Budget</span>
            <select className="field-input" value={budget} onChange={(e) => setBudget(e.target.value)}>
              {TAXONOMY.budgets.map((b) => <option key={b}>{b}</option>)}
            </select>
          </label>
          <label className="grid gap-1.5 md:col-span-2">
            <span className="field-label">Profile links or resume notes</span>
            <input className="field-input" value={profileNotes} onChange={(e) => setProfileNotes(e.target.value)} placeholder="GitHub, portfolio, etc." />
          </label>
          <div className="md:col-span-2">
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Matching..." : "Run matching"}
            </button>
          </div>
          {error && <p className="text-[var(--danger)] text-sm md:col-span-2">{error}</p>}
        </form>

        <div className="bg-[var(--surface)] rounded-xl border border-[var(--line)] p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-poppins">Explainable matches</h3>
            <span className="text-sm text-[var(--muted)]">{matches.length} matches</span>
          </div>
          {matches.length === 0 ? (
            <p className="text-[var(--muted)] text-sm">Submit a problem to rank mentors by expertise, lived context, stage, language, location, meeting type, and budget fit.</p>
          ) : (
            <div className="grid gap-4">
              {matches.map((m) => (
                <article key={m.mentor.id} className="border border-[var(--line)] rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="w-10 h-10 rounded-full bg-[var(--surface-soft)] grid place-items-center text-sm font-bold font-poppins">{m.mentor.initials}</span>
                      <div>
                        <strong className="block">{m.mentor.name}</strong>
                        <span className="text-sm text-[var(--muted)]">{m.mentor.headline}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <strong className="text-xl text-[var(--primary)]">{m.score}</strong>
                      <span className="block text-[0.72rem] text-[var(--muted)]">score</span>
                    </div>
                  </div>
                  <ul className="text-sm text-[var(--muted)] list-disc pl-5 mb-3 space-y-0.5">
                    {m.reasons.map((r, i) => <li key={i}>{r}</li>)}
                  </ul>
                  <div className="flex flex-wrap gap-1.5">
                    {m.mentor.domains.slice(0, 3).map((d) => (
                      <span key={d} className="text-[0.72rem] px-2 py-0.5 rounded-full bg-[var(--surface-soft)] text-[var(--muted)] font-poppins">{d}</span>
                    ))}
                    <span className="text-[0.72rem] px-2 py-0.5 rounded-full bg-[var(--surface-soft)] text-[var(--muted)] font-poppins">{m.mentor.pricing}</span>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-[var(--line)] pt-3">
                    <button
                      type="button"
                      className="btn-secondary px-3 py-2 text-xs"
                      disabled={bookingStatus[m.mentor.id] === "Requesting..." || bookingStatus[m.mentor.id] === "Requested"}
                      onClick={() => requestBooking(m.mentor.id)}
                    >
                      Request session
                    </button>
                    {bookingStatus[m.mentor.id] && (
                      <span className="text-xs text-[var(--muted)]">{bookingStatus[m.mentor.id]}</span>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
