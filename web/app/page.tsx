import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";

const STEPS = [
  {
    number: "01",
    title: "Describe the decision",
    body: "Start with the choice, constraint, or uncertainty you are actually facing—not a job title or a generic topic.",
  },
  {
    number: "02",
    title: "Understand the match",
    body: "See mentors ranked by relevant experience, context, language, location, meeting style, and budget fit.",
  },
  {
    number: "03",
    title: "Talk, then decide",
    body: "Request a conversation, ask better questions, and keep ownership of the final decision.",
  },
];

const WORKING_NOW = [
  "Problem-first mentor matching",
  "Explainable recommendations",
  "Two-sided booking workflow",
  "Mentor-owned payment and meeting tools",
  "Audit logging for booking changes",
];

const COMING_NEXT = [
  "Bookable availability",
  "Email confirmations",
  "Reviews and blocking",
  "Safety report form and moderation tools",
];

export default async function HomePage() {
  const user = await getCurrentUser();
  if (user) {
    if (!user.onboarded) redirect("/welcome");
    redirect(user.role === "MENTOR" || user.role === "ADMIN" ? "/bookings" : "/discover");
  }

  return (
    <main className="min-h-screen overflow-hidden">
      <header className="border-b border-[var(--line)] bg-[var(--bg)]">
        <nav
          aria-label="Primary navigation"
          className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 md:px-8"
        >
          <Link href="/" className="flex items-center gap-3" aria-label="OpenMargam home">
            <Image
              src="/logo.svg"
              width={42}
              height={42}
              alt=""
              aria-hidden="true"
              className="rounded-lg"
              priority
            />
            <span>
              <strong className="block font-poppins text-sm">OpenMargam</strong>
              <small className="hidden text-[0.68rem] text-[var(--muted)] sm:block">Open mentorship network</small>
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <a href="#how-it-works" className="hidden text-sm font-semibold font-poppins text-[var(--muted)] hover:text-[var(--ink)] sm:block">
              How it works
            </a>
            <Link href="/auth" className="btn-secondary px-3.5 py-2 sm:px-5">
              Sign in
            </Link>
          </div>
        </nav>
      </header>

      <section className="relative border-b border-[var(--line)]">
        <div aria-hidden="true" className="absolute -right-32 -top-44 h-96 w-96 rounded-full bg-[#f4d77a]/20 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-[1.08fr_0.92fr] md:px-8 md:py-24 lg:gap-20">
          <div className="self-center">
            <p className="eyebrow mb-4 text-[var(--primary-dark)]">Early open-source preview</p>
            <h1 className="max-w-3xl text-4xl sm:text-5xl md:text-[3.6rem]">
              Find clarity before making a life-shaping decision.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-[var(--muted)] md:text-xl">
              OpenMargam connects important questions with people who have relevant lived experience—so you can see the tradeoffs, avoid preventable mistakes, and choose your own path.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/auth" className="btn-primary">Try the early preview</Link>
              <a href="#current-checkpoint" className="btn-secondary">See what works</a>
            </div>
            <p className="mt-5 max-w-xl text-sm text-[var(--muted)]">
              This is an early checkpoint, not a finished service. OpenMargam does not hold payments or make decisions on anyone&apos;s behalf.
            </p>
          </div>

          <aside className="self-center border-l-2 border-[var(--primary)] bg-[var(--surface)] p-6 sm:p-8" aria-label="Example decision brief">
            <p className="eyebrow mb-5">A decision, not a search query</p>
            <blockquote className="text-xl leading-relaxed sm:text-2xl">
              “I want to move into AI and robotics, but I have a secure offer, limited savings, and no clear route from here to there.”
            </blockquote>
            <div className="mt-7 border-t border-[var(--line)] pt-5">
              <p className="mb-3 font-poppins text-sm font-bold">What should shape the match?</p>
              <ul className="grid gap-2 text-sm text-[var(--muted)] sm:grid-cols-2">
                <li>Relevant transition</li>
                <li>Financial constraints</li>
                <li>Location and language</li>
                <li>Stage and timeframe</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section id="how-it-works" className="scroll-mt-8 border-b border-[var(--line)] bg-[var(--surface)]">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
          <div className="max-w-2xl">
            <p className="eyebrow mb-3">How it works</p>
            <h2 className="text-3xl md:text-4xl">Better questions before bigger commitments.</h2>
          </div>
          <ol className="mt-10 grid gap-px overflow-hidden border border-[var(--line)] bg-[var(--line)] md:grid-cols-3">
            {STEPS.map((step) => (
              <li key={step.number} className="bg-[var(--surface)] p-6 md:p-8">
                <span className="font-poppins text-sm font-bold text-[var(--primary-dark)]">{step.number}</span>
                <h3 className="mt-7 text-xl">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="current-checkpoint" className="scroll-mt-8 border-b border-[var(--line)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2 md:px-8 md:py-20 lg:gap-20">
          <div>
            <p className="eyebrow mb-3">Current checkpoint</p>
            <h2 className="text-3xl">Useful today. Honest about tomorrow.</h2>
            <p className="mt-4 text-[var(--muted)]">
              The core path is working and available for contributors to inspect. Trust, moderation, and scheduling still need meaningful work before a production launch.
            </p>
          </div>
          <div className="grid gap-7 sm:grid-cols-2">
            <div>
              <h3 className="mb-3 text-base">Working now</h3>
              <ul className="space-y-2 text-sm text-[var(--muted)]">
                {WORKING_NOW.map((item) => <li key={item}>✓ {item}</li>)}
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-base">Coming next</h3>
              <ul className="space-y-2 text-sm text-[var(--muted)]">
                {COMING_NEXT.map((item) => <li key={item}>→ {item}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#141413] text-[#faf9f5]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-[1.05fr_0.95fr] md:px-8 md:py-20 lg:gap-20">
          <div>
            <p className="eyebrow mb-3 text-[#f4d77a]">Open by design</p>
            <h2 className="text-3xl text-[#faf9f5]">A foundation the community can carry forward.</h2>
            <p className="mt-5 max-w-xl text-[#d8d4cb]">
              OpenMargam is licensed under AGPL-3.0, designed to remain self-hostable, and built without platform payment custody or mandatory paid AI services.
            </p>
          </div>
          <div className="self-center border-l border-white/20 pl-6">
            <p className="text-lg text-[#ede9df]">
              The goal is not perfect advice. It is fewer avoidable mistakes, more useful context, and decisions people can look back on with pride.
            </p>
            <Link href="/auth" className="mt-7 inline-block rounded-lg bg-[#faf9f5] px-5 py-2.5 font-poppins text-sm font-semibold text-[#141413] hover:bg-[#f4d77a]">
              Join the preview
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--line)] bg-[var(--surface)]">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-6 text-sm text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between md:px-8">
          <p>OpenMargam · Built in public</p>
          <p>Mentors offer context. You make the decision.</p>
        </div>
      </footer>
    </main>
  );
}
