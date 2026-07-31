const CURRENT_SAFEGUARDS = [
  {
    title: "No payment custody",
    body: "Payments stay outside OpenMargam. Never share card numbers, bank credentials, one-time passcodes, or payment-account passwords with a mentor.",
  },
  {
    title: "Safer first meetings",
    body: "Use video or a public venue for a first meeting. Share exact locations only after both people agree, and tell someone you trust when meeting in person.",
  },
  {
    title: "Advice has limits",
    body: "Mentors offer context, not guaranteed outcomes. Use licensed professionals for legal, medical, immigration, tax, financial, or crisis support.",
  },
  {
    title: "Auditable reports",
    body: "Authenticated reports can be recorded with a category and risk level. Report creation and booking changes write audit entries for future moderation workflows.",
  },
];

const NOT_BUILT_YET = [
  "Identity or employment verification",
  "Automatic external-link scanning",
  "User blocking",
  "A user-facing report form and admin moderation queue",
  "Trust scores derived from completed sessions and reviews",
];

export default function SafetyPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <p className="eyebrow mb-2">Trust and privacy</p>
        <h2 className="text-2xl mb-2">Safety center</h2>
        <p className="text-[var(--muted)]">What the early preview protects today—and what it does not yet protect.</p>
      </div>

      <section aria-labelledby="current-safeguards">
        <h3 id="current-safeguards" className="mb-4 text-lg">Current safeguards</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {CURRENT_SAFEGUARDS.map((s) => (
            <article key={s.title} className="bg-[var(--surface)] rounded-xl border border-[var(--line)] p-6">
              <h4 className="text-base mb-2">{s.title}</h4>
              <p className="text-sm text-[var(--muted)] leading-relaxed">{s.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="not-built" className="mt-8 border border-[var(--line)] bg-[var(--surface-soft)] p-6">
        <p className="eyebrow mb-2">Early-stage limitations</p>
        <h3 id="not-built" className="text-lg">Not built yet</h3>
        <ul className="mt-4 grid gap-2 text-sm text-[var(--muted)] sm:grid-cols-2">
          {NOT_BUILT_YET.map((item) => <li key={item}>— {item}</li>)}
        </ul>
      </section>

      <div className="mt-8 bg-[var(--ink)] text-[#faf9f5] rounded-xl p-6">
        <p className="eyebrow text-[#f4d77a]/80 mb-2">Before you continue</p>
        <p className="text-sm text-[#d8d4cb]">
          Do not enter sensitive personal documents or regulated-advice details in this preview.
          Payments, refunds, meeting arrangements, and service delivery remain between mentor and
          mentee. If a request feels unsafe or unusually urgent, stop the interaction.
        </p>
      </div>
    </div>
  );
}
