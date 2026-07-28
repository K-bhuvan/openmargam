"use client";

import { useEffect, useState } from "react";
import { TAXONOMY, type Mentor } from "@/lib/matching";

export default function MentorsPage() {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [filter, setFilter] = useState("All domains");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadMentors() {
      const res = await fetch("/api/mentors");
      const data = await res.json();
      setLoading(false);
      if (!res.ok) {
        setError(data.error || "Could not load mentors.");
        return;
      }
      setMentors(data.mentors);
    }
    void loadMentors();
  }, []);

  const filtered = mentors.filter((m) => {
    const matchesDomain = filter === "All domains" || m.domains.includes(filter);
    const q = search.toLowerCase();
    const matchesSearch = !q || m.name.toLowerCase().includes(q) || m.headline.toLowerCase().includes(q) || m.tags.some((t) => t.includes(q));
    return matchesDomain && matchesSearch;
  });

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <p className="eyebrow mb-2">Mentor directory</p>
        <h2 className="text-2xl mb-2">Browse mentors</h2>
        <p className="text-[var(--muted)]">Scan trust signals, availability, languages, and service ownership. Use <strong>Find mentors</strong> for problem-first matching instead.</p>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        <input
          className="field-input flex-1 min-w-[200px]"
          placeholder="Search by name, skill, or tag..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select className="field-input w-auto" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option>All domains</option>
          {TAXONOMY.domains.map((d) => <option key={d}>{d}</option>)}
        </select>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {loading && (
          <div
            aria-busy="true"
            aria-label="Loading mentors"
            className="md:col-span-2 bg-[var(--surface)] rounded-xl border border-[var(--line)] p-12 text-center text-[var(--muted)]"
          >
            Loading mentors...
          </div>
        )}
        {filtered.map((m) => (
          <article key={m.id} className="bg-[var(--surface)] rounded-xl border border-[var(--line)] p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="w-11 h-11 rounded-full bg-[var(--surface-soft)] grid place-items-center font-bold font-poppins text-sm">{m.initials}</span>
                <div>
                  <strong className="block">{m.name}</strong>
                  <span className="text-sm text-[var(--muted)]">{m.headline}</span>
                </div>
              </div>
              <span className="text-sm font-poppins font-bold text-[var(--primary)]">{m.trustScore}<span className="block text-[0.66rem] text-[var(--muted)] font-normal">reputation</span></span>
            </div>
            <p className="text-sm text-[var(--muted)] mb-3">{m.bio}</p>
            <div className="flex gap-4 text-xs text-[var(--muted)] mb-3">
              <span><strong className="text-[var(--ink)]">{m.responseRate}%</strong> response</span>
              <span><strong className="text-[var(--ink)]">{m.reviewQuality}</strong> review</span>
              <span><strong className="text-[var(--ink)]">{m.pricing}</strong></span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {m.domains.slice(0, 2).map((d) => (
                <span key={d} className="text-[0.7rem] px-2 py-0.5 rounded-full bg-[var(--surface-soft)] text-[var(--muted)] font-poppins">{d}</span>
              ))}
              {m.verified.map((v) => (
                <span key={v} className="text-[0.7rem] px-2 py-0.5 rounded-full border border-[var(--line)] text-[var(--muted)] font-poppins">✓ {v}</span>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-[var(--line)] text-xs text-[var(--muted)] space-y-0.5">
              <p><strong className="text-[var(--ink)]">Languages:</strong> {m.languages.join(", ")}</p>
              <p><strong className="text-[var(--ink)]">Meetings:</strong> {m.meetings.join(", ")}</p>
              <p><strong className="text-[var(--ink)]">Availability:</strong> {m.availability}</p>
            </div>
          </article>
        ))}
      </div>

      {error && <p className="text-center text-[var(--danger)] py-12">{error}</p>}

      {!loading && !error && filtered.length === 0 && (
        <p className="text-center text-[var(--muted)] py-12">No mentors match your search.</p>
      )}
    </div>
  );
}
