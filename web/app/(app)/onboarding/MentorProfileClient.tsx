"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TAXONOMY } from "@/lib/matching";
import { ProfileSelectField } from "./ProfileSelectField";

export interface MentorProfileInitial {
  headline?: string;
  bio?: string;
  domains?: string[];
  tags?: string[];
  stages?: string[];
  locations?: string[];
  languages?: string[];
  meetings?: string[];
  pricing?: string;
  payment?: string;
  meeting?: string;
  availability?: string;
}

export function MentorProfileClient({ initial }: { initial: MentorProfileInitial }) {
  const router = useRouter();
  const [headline, setHeadline] = useState(initial.headline || "");
  const [bio, setBio] = useState(initial.bio || "");
  const [domain, setDomain] = useState(initial.domains?.[0] || TAXONOMY.domains[0]);
  const [stage, setStage] = useState(initial.stages?.[0] || TAXONOMY.stages[2]);
  const [location, setLocation] = useState(initial.locations?.[0] || TAXONOMY.locations[4]);
  const [language, setLanguage] = useState(initial.languages?.[0] || TAXONOMY.languages[1]);
  const [meeting, setMeeting] = useState(initial.meetings?.[0] || TAXONOMY.meetings[1]);
  const [pricing, setPricing] = useState(initial.pricing || "community hours");
  const [tags, setTags] = useState(initial.tags?.join(", ") || "");
  const [payment, setPayment] = useState(initial.payment || "");
  const [meetingInstructions, setMeetingInstructions] = useState(initial.meeting || "");
  const [availability, setAvailability] = useState(initial.availability || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const res = await fetch("/api/mentor-profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        headline,
        bio,
        domain,
        stage,
        location,
        language,
        meeting,
        pricing,
        tags,
        payment,
        meetingInstructions,
        availability,
      }),
    });
    const data = await res.json();
    setSaving(false);
    if (!res.ok) {
      setError(data.error || "Could not save your mentor profile.");
      return;
    }
    router.push("/bookings");
    router.refresh();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <p className="eyebrow mb-2">Mentor profile</p>
        <h2 className="text-2xl mb-2">Explain where your experience is useful</h2>
        <p className="text-[var(--muted)]">
          Your profile feeds matching and session requests. Trust metrics begin at zero and grow
          from real activity; they are never self-awarded.
        </p>
      </div>

      <form
        onSubmit={save}
        className="bg-[var(--surface)] rounded-xl border border-[var(--line)] p-6 grid md:grid-cols-2 gap-4"
      >
        <label className="grid gap-1.5 md:col-span-2">
          <span className="field-label">Professional headline</span>
          <input
            className="field-input"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            placeholder="Robotics engineer helping students plan graduate study"
            maxLength={120}
            required
          />
        </label>

        <label className="grid gap-1.5 md:col-span-2">
          <span className="field-label">Experience and mentoring context</span>
          <textarea
            className="field-input"
            rows={5}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Describe what you have done, who you can help, and the limits of your advice."
            maxLength={800}
            required
          />
        </label>

        <ProfileSelectField label="Primary domain" value={domain} onChange={setDomain} options={TAXONOMY.domains} />
        <ProfileSelectField label="Career stage served" value={stage} onChange={setStage} options={TAXONOMY.stages} />
        <ProfileSelectField label="Location context" value={location} onChange={setLocation} options={TAXONOMY.locations} />
        <ProfileSelectField label="Primary language" value={language} onChange={setLanguage} options={TAXONOMY.languages} />
        <ProfileSelectField label="Meeting format" value={meeting} onChange={setMeeting} options={TAXONOMY.meetings} />
        <ProfileSelectField
          label="Pricing model"
          value={pricing}
          onChange={setPricing}
          options={["free", "paid", "donation", "community hours"]}
        />

        <label className="grid gap-1.5 md:col-span-2">
          <span className="field-label">Expertise tags</span>
          <input
            className="field-input"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="robotics, ROS, graduate school, portfolio"
            maxLength={240}
            required
          />
          <span className="text-xs text-[var(--muted)]">Separate up to 12 tags with commas.</span>
        </label>

        <label className="grid gap-1.5">
          <span className="field-label">Payment instructions</span>
          <input
            className="field-input"
            value={payment}
            onChange={(e) => setPayment(e.target.value)}
            placeholder="Free community hours or your external payment method"
            maxLength={240}
            required
          />
        </label>

        <label className="grid gap-1.5">
          <span className="field-label">Meeting instructions</span>
          <input
            className="field-input"
            value={meetingInstructions}
            onChange={(e) => setMeetingInstructions(e.target.value)}
            placeholder="Google Meet link after confirmation"
            maxLength={240}
            required
          />
        </label>

        <label className="grid gap-1.5 md:col-span-2">
          <span className="field-label">General availability</span>
          <input
            className="field-input"
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            placeholder="Tuesday and Thursday evenings, Eastern Time"
            maxLength={160}
            required
          />
        </label>

        {error && <p className="text-[var(--danger)] text-sm md:col-span-2">{error}</p>}

        <div className="md:col-span-2 flex flex-wrap items-center gap-3 pt-2">
          <button type="submit" className="btn-primary" disabled={saving}>
            {saving ? "Saving profile..." : "Save mentor profile"}
          </button>
          <p className="text-xs text-[var(--muted)]">
            Payment and meeting services remain between you and the mentee.
          </p>
        </div>
      </form>
    </div>
  );
}
