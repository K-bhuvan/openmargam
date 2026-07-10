"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Tab = "signup" | "login";
type SignupStep = 1 | 2;

export default function AuthPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("signup");
  const [step, setStep] = useState<SignupStep>(1);
  const [loading, setLoading] = useState(false);
  const [showPasscode, setShowPasscode] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("MENTEE");
  const [passcode, setPasscode] = useState("");
  const [confirmPasscode, setConfirmPasscode] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPasscode, setLoginPasscode] = useState("");
  const [loginError, setLoginError] = useState("");

  function isValidEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function validateStep1() {
    const e: Record<string, string> = {};
    if (name.trim().length < 2) e.name = "Enter your full name.";
    if (!isValidEmail(email)) e.email = "Enter a valid email address.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function validateStep2() {
    const e: Record<string, string> = {};
    if (passcode.length < 6) e.passcode = "Passcode must be at least 6 characters.";
    if (confirmPasscode !== passcode || !confirmPasscode) e.confirmPasscode = "Passcodes do not match.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function passcodeStrength(p: string) {
    let score = 0;
    if (p.length >= 6) score++;
    if (p.length >= 10) score++;
    if (/[A-Z]/.test(p) && /[a-z]/.test(p)) score++;
    if (/\d/.test(p) && /[^A-Za-z0-9]/.test(p)) score++;
    return score;
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    if (!validateStep1() || !validateStep2()) return;
    setLoading(true);
    setErrors({});

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name.trim(), email: email.trim().toLowerCase(), passcode, role }),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setErrors({ email: data.error || "Signup failed." });
      return;
    }
    router.push("/");
    router.refresh();
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    if (!isValidEmail(loginEmail)) {
      setLoginError("Enter a valid email address.");
      return;
    }
    if (!loginPasscode) {
      setLoginError("Enter your passcode.");
      return;
    }
    setLoading(true);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: loginEmail.trim().toLowerCase(), passcode: loginPasscode }),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setLoginError(data.error || "Login failed.");
      return;
    }
    router.push("/");
    router.refresh();
  }

  function switchTab(next: Tab) {
    setTab(next);
    setErrors({});
    setLoginError("");
    if (next === "signup") setStep(1);
  }

  const strength = passcodeStrength(passcode);

  return (
    <div className="min-h-screen grid md:grid-cols-[1.15fr_1fr]">
      {/* Brand thesis panel */}
      <section className="hidden md:flex items-center px-[8%] py-14 relative bg-[#141413] text-[#faf9f5]">
        <div className="max-w-[520px]">
          <div className="w-14 h-14 rounded-[14px] grid place-items-center bg-gradient-to-br from-[#f4d77a] to-[#d9a64e] text-[#141413] font-bold text-sm border border-white/20 mb-6">
            OM
          </div>
          <p className="eyebrow text-[#f4d77a]/80 mb-3">Open mentorship network</p>
          <h2 className="text-[2.1rem] mb-5 text-[#faf9f5]">
            The right mentor for your decision.
          </h2>
          <p className="text-[#d8d4cb] text-[1.02rem] mb-7 max-w-[460px]">
            Describe what you are deciding. Get matched with mentors who have lived through it —
            or become one yourself. No commission, no payment custody.
          </p>
          <ul className="space-y-3 list-none p-0">
            {[
              ["Problem-first.", "Intake drives the match."],
              ["User-owned services.", "Bring your own payment, calendar, and meeting tools."],
              ["Trust, visible.", "Verification, response rate, and review quality up front."],
              ["Safety, default.", "Public-first meetings, private documents, audited moderation."],
            ].map(([bold, rest]) => (
              <li key={bold} className="border-l-2 border-[#d97757] pl-3.5 text-[0.94rem] text-[#e8e6dc]">
                <strong className="font-poppins font-bold text-[#faf9f5]">{bold}</strong> {rest}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Form panel */}
      <div className="flex items-center justify-center p-8 md:p-12 bg-[var(--surface)]">
        <div className="w-full max-w-[440px]">
          <div className="grid grid-cols-2 gap-1 p-1 rounded-full bg-[var(--surface-soft)] border border-[var(--line)] mb-6">
            <button
              onClick={() => switchTab("signup")}
              className={`rounded-full py-2 text-sm font-semibold font-poppins transition-colors ${
                tab === "signup" ? "bg-[var(--ink)] text-[#faf9f5]" : "text-[var(--muted)]"
              }`}
            >
              Create account
            </button>
            <button
              onClick={() => switchTab("login")}
              className={`rounded-full py-2 text-sm font-semibold font-poppins transition-colors ${
                tab === "login" ? "bg-[var(--ink)] text-[#faf9f5]" : "text-[var(--muted)]"
              }`}
            >
              Sign in
            </button>
          </div>

          {tab === "signup" ? (
            <form onSubmit={handleSignup} className="grid gap-3.5" noValidate>
              <div className="flex gap-1.5 mb-4">
                <span className={`h-1 flex-1 rounded-full ${step >= 1 ? "bg-[var(--primary)]" : "bg-[var(--surface-soft)]"}`} />
                <span className={`h-1 flex-1 rounded-full ${step >= 2 ? "bg-[var(--primary)]" : "bg-[var(--surface-soft)]"}`} />
              </div>

              {step === 1 && (
                <div className="grid gap-3.5">
                  <p className="eyebrow">Step 1 — Who you are</p>
                  <label className="grid gap-1.5">
                    <span className="field-label">Full name</span>
                    <input
                      className={`field-input ${errors.name ? "invalid" : ""}`}
                      value={name}
                      onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: "" })); }}
                      placeholder="Your name"
                      autoComplete="name"
                    />
                    {errors.name && <em className="text-[0.76rem] text-[var(--danger)] not-italic">{errors.name}</em>}
                  </label>
                  <label className="grid gap-1.5">
                    <span className="field-label">Email</span>
                    <input
                      className={`field-input ${errors.email ? "invalid" : ""}`}
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: "" })); }}
                      placeholder="you@example.com"
                      type="email"
                      autoComplete="email"
                    />
                    {errors.email && <em className="text-[0.76rem] text-[var(--danger)] not-italic">{errors.email}</em>}
                  </label>
                  <button
                    type="button"
                    className="btn-primary mt-1"
                    onClick={() => validateStep1() && setStep(2)}
                  >
                    Continue
                  </button>
                  <p className="text-[0.78rem] text-[var(--muted)] text-center mt-1">
                    Demo only — accounts are secure but this is a prototype.
                  </p>
                </div>
              )}

              {step === 2 && (
                <div className="grid gap-3.5">
                  <p className="eyebrow">Step 2 — How you join</p>
                  <label className="grid gap-1.5">
                    <span className="field-label">
                      I want to join as <em className="text-[var(--muted)] text-[0.76rem] italic">(changeable later)</em>
                    </span>
                    <select className="field-input" value={role} onChange={(e) => setRole(e.target.value)}>
                      <option value="MENTEE">Mentee — find mentors and get advice</option>
                      <option value="MENTOR">Mentor — offer guidance and build reputation</option>
                    </select>
                  </label>
                  <label className="grid gap-1.5">
                    <span className="field-label">Create a passcode</span>
                    <div className="relative">
                      <input
                        className={`field-input pr-16 ${errors.passcode ? "invalid" : ""}`}
                        value={passcode}
                        onChange={(e) => { setPasscode(e.target.value); setErrors((p) => ({ ...p, passcode: "" })); }}
                        placeholder="At least 6 characters"
                        type={showPasscode ? "text" : "password"}
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasscode(!showPasscode)}
                        className="absolute right-0 top-0 bottom-0 px-3 text-[0.74rem] font-semibold text-[var(--muted)] font-poppins"
                      >
                        {showPasscode ? "Hide" : "Show"}
                      </button>
                    </div>
                    <meter className="w-full h-1 mt-0.5" min={0} max={4} value={strength} aria-label="Passcode strength" />
                    {errors.passcode && <em className="text-[0.76rem] text-[var(--danger)] not-italic">{errors.passcode}</em>}
                  </label>
                  <label className="grid gap-1.5">
                    <span className="field-label">Confirm passcode</span>
                    <input
                      className={`field-input ${errors.confirmPasscode ? "invalid" : ""}`}
                      value={confirmPasscode}
                      onChange={(e) => { setConfirmPasscode(e.target.value); setErrors((p) => ({ ...p, confirmPasscode: "" })); }}
                      placeholder="Re-enter passcode"
                      type={showPasscode ? "text" : "password"}
                      autoComplete="new-password"
                    />
                    {errors.confirmPasscode && <em className="text-[0.76rem] text-[var(--danger)] not-italic">{errors.confirmPasscode}</em>}
                  </label>
                  <div className="flex gap-2 mt-1">
                    <button type="button" className="btn-secondary flex-1" onClick={() => setStep(1)}>Back</button>
                    <button type="submit" className="btn-primary flex-1" disabled={loading}>
                      {loading ? "Creating..." : "Create account"}
                    </button>
                  </div>
                </div>
              )}
            </form>
          ) : (
            <form onSubmit={handleLogin} className="grid gap-3.5" noValidate>
              <label className="grid gap-1.5">
                <span className="field-label">Email</span>
                <input
                  className="field-input"
                  value={loginEmail}
                  onChange={(e) => { setLoginEmail(e.target.value); setLoginError(""); }}
                  placeholder="you@example.com"
                  type="email"
                  autoComplete="email"
                />
              </label>
              <label className="grid gap-1.5">
                <span className="field-label">Passcode</span>
                <input
                  className="field-input"
                  value={loginPasscode}
                  onChange={(e) => { setLoginPasscode(e.target.value); setLoginError(""); }}
                  placeholder="Your passcode"
                  type="password"
                  autoComplete="current-password"
                />
              </label>
              {loginError && <p className="text-[0.82rem] text-[var(--danger)]">{loginError}</p>}
              <button type="submit" className="btn-primary mt-1" disabled={loading}>
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>
          )}

          <ul className="flex flex-wrap justify-center gap-1.5 mt-6 p-0 list-none">
            {["No commission", "Manual links first", "Bring your own services", "Safety default"].map((p) => (
              <li key={p} className="border border-[var(--line)] rounded-full bg-[var(--surface-soft)] text-[var(--muted)] text-[0.72rem] font-semibold font-poppins px-2.5 py-1">
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
