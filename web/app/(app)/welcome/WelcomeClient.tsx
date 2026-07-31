"use client";

import Link from "next/link";

const STEPS = [
  { n: "01", title: "Describe your problem", body: "Tell us what you are deciding — career switch, startup pricing, grad school, a hiring path. The more specific, the better the match.", icon: "✎" },
  { n: "02", title: "Get ranked, explainable matches", body: "The matching engine scores mentors across expertise, lived context, stage, location, language, meeting type, and budget fit. Every score comes with reasons.", icon: "⌖" },
  { n: "03", title: "Book without custody", body: "Request a session. Mentors accept, clarify, or reject. Payments stay between you and the mentor — the platform never holds money.", icon: "↗" },
  { n: "04", title: "Meet and follow up", body: "Use Google Meet, Zoom, or a public venue. Share notes after. Reports create an audit trail for future moderation tools.", icon: "✓" },
];

const PRINCIPLES = [
  { title: "No commission", body: "Mentors keep what they earn. We never take a cut." },
  { title: "Bring your own services", body: "Stripe, PayPal, Wise, UPI — mentors choose their own payment and meeting tools." },
  { title: "Problem-first, not profile-first", body: "Matching starts from what you are deciding, not from browsing names." },
  { title: "Safety made explicit", body: "Public-place guidance, clear cautions, and auditable reports." },
];

export function WelcomeClient({ onboarded, role }: { onboarded: boolean; role: string }) {
  const isMentor = role === "MENTOR";

  return (
    <div className="max-w-4xl mx-auto">
      <section className="text-center py-8 md:py-12">
        <p className="eyebrow mb-3">OpenMargam</p>
        <h2 className="text-3xl md:text-4xl mb-4">
          The right mentor for your decision.
        </h2>
        <p className="text-[var(--muted)] max-w-xl mx-auto text-lg">
          Describe what you are deciding. Get matched with mentors who have lived through it — or become one yourself.
        </p>
        <div className="flex justify-center gap-3 mt-8">
          {!onboarded ? (
            <>
              <Link href="/onboarding" className="btn-primary">Set up your profile</Link>
              {!isMentor && <Link href="/discover" className="btn-secondary">Browse mentors first</Link>}
            </>
          ) : (
            <Link href={isMentor ? "/bookings" : "/discover"} className="btn-primary">
              {isMentor ? "View session requests" : "Find mentors"}
            </Link>
          )}
        </div>
      </section>

      <section className="py-8">
        <p className="eyebrow mb-6 text-center">How it works</p>
        <div className="grid md:grid-cols-2 gap-4">
          {STEPS.map((step) => (
            <article key={step.n} className="bg-[var(--surface)] rounded-xl border border-[var(--line)] p-6">
              <div className="flex items-start gap-4">
                <span className="text-2xl text-[var(--primary)] font-poppins font-bold w-10 h-10 grid place-items-center rounded-lg bg-[var(--surface-soft)]">{step.icon}</span>
                <div>
                  <p className="eyebrow text-[var(--primary)] mb-1">{step.n}</p>
                  <h3 className="text-lg mb-1">{step.title}</h3>
                  <p className="text-sm text-[var(--muted)]">{step.body}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="py-8">
        <div className="grid md:grid-cols-4 gap-4">
          {PRINCIPLES.map((p) => (
            <div key={p.title} className="text-center">
              <h4 className="text-sm font-poppins font-bold mb-1">{p.title}</h4>
              <p className="text-xs text-[var(--muted)]">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="text-center py-8">
        <p className="text-[var(--muted)] mb-3">Ready to start?</p>
        {!onboarded ? (
          <Link href="/onboarding" className="btn-primary">Set up your profile</Link>
        ) : (
          <Link href={isMentor ? "/bookings" : "/discover"} className="btn-primary">
            {isMentor ? "View session requests" : "Find mentors"}
          </Link>
        )}
      </section>
    </div>
  );
}
