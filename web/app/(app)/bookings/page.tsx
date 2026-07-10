"use client";

import { useEffect, useState } from "react";
import { allowedTransitions, type BookingState } from "@/lib/matching";

interface Booking {
  id: string;
  mentorId: string;
  problemSummary: string;
  payment: string;
  meetingInstructions: string;
  state: BookingState;
  createdAt: string;
  mentor?: {
    name: string;
    headline: string;
  };
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    void loadBookings();
  }, []);

  async function loadBookings() {
    setLoading(true);
    setError("");
    const res = await fetch("/api/bookings");
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error || "Could not load bookings.");
      return;
    }
    setBookings(data.bookings);
  }

  async function moveBooking(id: string, state: BookingState) {
    setUpdating(id);
    setError("");
    const res = await fetch(`/api/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ state }),
    });
    const data = await res.json();
    setUpdating(null);
    if (!res.ok) {
      setError(data.error || "Could not update booking.");
      return;
    }
    setBookings((current) => current.map((booking) => (booking.id === id ? data.booking : booking)));
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <p className="eyebrow mb-2">Sessions</p>
        <h2 className="text-2xl mb-2">My bookings</h2>
        <p className="text-[var(--muted)]">Track session requests through explicit states without payment custody.</p>
      </div>

      {error && <p className="mb-4 text-sm text-[var(--danger)]">{error}</p>}

      {loading ? (
        <div className="bg-[var(--surface)] rounded-xl border border-[var(--line)] p-12 text-center">
          <p className="text-[var(--muted)]">Loading bookings...</p>
        </div>
      ) : bookings.length === 0 ? (
        <div className="bg-[var(--surface)] rounded-xl border border-[var(--line)] p-12 text-center">
          <p className="text-[var(--muted)] mb-2">No booking requests yet.</p>
          <p className="text-sm text-[var(--muted)]">Find a mentor and request a session to see the booking state machine in action.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {bookings.map((booking) => {
            const nextStates = allowedTransitions(booking.state);
            return (
              <article key={booking.id} className="bg-[var(--surface)] rounded-xl border border-[var(--line)] p-5">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <p className="eyebrow mb-1">{new Date(booking.createdAt).toLocaleDateString()}</p>
                    <h3 className="text-lg">{booking.mentor?.name ?? booking.mentorId}</h3>
                    {booking.mentor?.headline && <p className="text-sm text-[var(--muted)]">{booking.mentor.headline}</p>}
                  </div>
                  <span className="rounded-full border border-[var(--line)] bg-[var(--surface-soft)] px-3 py-1 text-xs font-bold font-poppins">
                    {formatState(booking.state)}
                  </span>
                </div>
                <p className="text-sm text-[var(--muted)] mb-3">{booking.problemSummary}</p>
                <div className="grid gap-1 text-sm text-[var(--muted)] mb-4">
                  <p><strong className="text-[var(--ink)]">Payment:</strong> {booking.payment}</p>
                  <p><strong className="text-[var(--ink)]">Meeting:</strong> {booking.meetingInstructions}</p>
                </div>
                {nextStates.length > 0 && (
                  <div className="flex flex-wrap gap-2 border-t border-[var(--line)] pt-3">
                    {nextStates.map((state) => (
                      <button
                        key={state}
                        type="button"
                        className="btn-secondary px-3 py-2 text-xs"
                        disabled={updating === booking.id}
                        onClick={() => moveBooking(booking.id, state)}
                      >
                        Move to {formatState(state)}
                      </button>
                    ))}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

function formatState(state: BookingState): string {
  return state.toLowerCase().replaceAll("_", " ");
}
