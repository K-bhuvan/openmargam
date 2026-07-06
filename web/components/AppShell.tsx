"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

interface NavItem {
  href: string;
  label: string;
  roles: string[];
  group: string;
}

const NAV: NavItem[] = [
  { href: "/onboarding", label: "Profile setup", roles: ["MENTEE", "MENTOR"], group: "Discover" },
  { href: "/discover", label: "Find mentors", roles: ["MENTEE"], group: "Discover" },
  { href: "/mentors", label: "Explore mentors", roles: ["MENTEE"], group: "Discover" },
  { href: "/mentor-studio", label: "Mentor dashboard", roles: ["MENTOR"], group: "Mentor" },
  { href: "/mentor-requests", label: "Requests", roles: ["MENTOR"], group: "Mentor" },
  { href: "/bookings", label: "My bookings", roles: ["MENTEE", "MENTOR"], group: "Sessions" },
  { href: "/safety", label: "Safety center", roles: ["MENTEE", "MENTOR", "ADMIN"], group: "Trust" },
  { href: "/admin", label: "Admin panel", roles: ["ADMIN"], group: "Trust" },
];

const ROLE_LABELS: Record<string, string> = {
  MENTEE: "Mentee",
  MENTOR: "Mentor",
  ADMIN: "Admin",
};

export function AppShell({ user, children }: { user: { id: string; name: string; email: string; role: string }; children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [role, setRole] = useState(user.role);

  const initials = user.name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();

  const visibleNav = NAV.filter((n) => n.roles.includes(role));
  const groups = Array.from(new Set(visibleNav.map((n) => n.group)));

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/auth");
    router.refresh();
  }

  return (
    <div className="grid md:grid-cols-[268px_1fr] min-h-screen">
      <aside className="hidden md:flex flex-col gap-5 h-screen sticky top-0 p-5 bg-[#141413] text-[#f8fafc] overflow-y-auto">
        <Link href="/discover" className="flex items-center gap-3">
          <span className="w-11 h-11 grid place-items-center rounded-lg border border-white/20 bg-gradient-to-br from-[#f4d77a] to-[#d9a64e] text-[#141413] text-[0.8rem] font-bold">
            OM
          </span>
          <span>
            <strong className="block font-poppins">OpenMargam</strong>
            <small className="text-[0.72rem] text-[#b8c2cf]">Advisory network</small>
          </span>
        </Link>

        <div className="grid grid-cols-3 gap-1 p-1 rounded-full border border-white/12 bg-white/8">
          {(["MENTEE", "MENTOR", "ADMIN"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`rounded-full py-2 text-[0.76rem] font-bold font-poppins transition-colors ${
                role === r ? "bg-[#fffaf1] text-[#141413]" : "text-[#cfc7ba]"
              }`}
            >
              {ROLE_LABELS[r]}
            </button>
          ))}
        </div>

        <nav className="grid gap-0.5">
          {groups.map((group) => (
            <div key={group}>
              <p className="my-2 mx-1 text-[0.66rem] font-bold uppercase tracking-wider text-white/40 font-poppins">{group}</p>
              {visibleNav.filter((n) => n.group === group).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block rounded-[10px] px-3 py-2 text-[0.88rem] transition-all ${
                    pathname === item.href
                      ? "bg-white/12 text-white border border-white/12"
                      : "text-[#ded8ce] hover:bg-white/8 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
        </nav>

        <p className="mt-auto p-3 border border-white/8 rounded-xl bg-white/4 text-[#cfc7ba] text-[0.78rem] leading-relaxed">
          No commission. Payments go directly between mentor and mentee.
        </p>
      </aside>

      <main className="flex flex-col min-h-screen">
        <header className="flex items-center justify-between gap-4 px-6 md:px-8 py-4 border-b border-[var(--line)] bg-[var(--surface)]">
          <div>
            <p className="eyebrow">Problem-first mentorship</p>
            <h1 className="text-xl md:text-2xl">OpenMargam</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-[var(--muted)] font-poppins">{initials} · {user.email}</span>
            <span className="px-3 py-1 rounded-full bg-[var(--surface-soft)] text-[var(--muted)] text-sm font-poppins">
              {ROLE_LABELS[role]} view
            </span>
            <button onClick={logout} className="btn-secondary">Sign out</button>
          </div>
        </header>

        <div className="flex-1 p-6 md:p-8">{children}</div>
      </main>
    </div>
  );
}
