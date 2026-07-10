const SECTIONS = [
  {
    title: "Payment custody",
    body: "Payments stay outside the platform. Mentors publish instructions or links (Stripe, PayPal, Wise, UPI), and OpenMargam stores no processor secrets or bank credentials. Refunds and disputes are handled directly between mentor and mentee.",
  },
  {
    title: "High-risk advice",
    body: "Legal, medical, immigration, tax, financial, and crisis topics are flagged with professional-advice disclaimers. Mentors are advised to direct mentees to licensed professionals for regulated matters.",
  },
  {
    title: "In-person meetings",
    body: "Broad locations are shown first. Exact locations require confirmation after booking. Public venues are recommended for first meetings. Remote-first is the default for high-risk categories.",
  },
  {
    title: "Private documents",
    body: "Resume notes and profile links are private by default. Mentors see derived matching signals unless a mentee explicitly shares raw material. Sensitive context (gender, immigration status, health) is never exposed in matching explanations.",
  },
  {
    title: "Verification",
    body: "Mentor verification includes email, domain email, GitHub, LinkedIn, and portfolio checks. Verification badges are transparent — we show what was verified, not just that something was.",
  },
  {
    title: "Moderation",
    body: "Reports are reviewed by admins with risk levels (low, medium, high). Suspendable offenses include guaranteed-outcome claims, payment pressure, suspicious links, harassment, credential fraud, and unsafe in-person requests. Every admin action is audited.",
  },
];

export default function SafetyPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <p className="eyebrow mb-2">Trust and privacy</p>
        <h2 className="text-2xl mb-2">Safety center</h2>
        <p className="text-[var(--muted)]">How OpenMargam keeps mentorship safe without becoming a gatekeeper.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {SECTIONS.map((s) => (
          <article key={s.title} className="bg-[var(--surface)] rounded-xl border border-[var(--line)] p-6">
            <h3 className="text-lg mb-2">{s.title}</h3>
            <p className="text-sm text-[var(--muted)] leading-relaxed">{s.body}</p>
          </article>
        ))}
      </div>

      <div className="mt-8 bg-[var(--ink)] text-[#faf9f5] rounded-xl p-6">
        <p className="eyebrow text-[#f4d77a]/80 mb-2">Disclaimer</p>
        <p className="text-sm text-[#d8d4cb]">
          OpenMargam helps users discover, schedule, and communicate. Payments, refunds, and service
          delivery are handled directly between mentor and mentee unless otherwise stated. Mentors
          provide advice, not guaranteed outcomes.
        </p>
      </div>
    </div>
  );
}
