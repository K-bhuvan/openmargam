"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

interface NavItem {
  href: string;
  label: string;
  roles: string[];
  group: string;
}

const NAV: NavItem[] = [
  { href: "/welcome", label: "How it works", roles: ["MENTEE", "MENTOR", "ADMIN"], group: "Start" },
  { href: "/discover", label: "Find mentors", roles: ["MENTEE"], group: "Discover" },
  { href: "/mentors", label: "Browse mentors", roles: ["MENTEE", "ADMIN"], group: "Discover" },
  { href: "/bookings", label: "Bookings", roles: ["MENTEE", "MENTOR", "ADMIN"], group: "Sessions" },
  { href: "/safety", label: "Safety center", roles: ["MENTEE", "MENTOR", "ADMIN"], group: "Trust" },
];

const ROLE_LABELS: Record<string, string> = {
  MENTEE: "Mentee",
  MENTOR: "Mentor",
  ADMIN: "Administrator",
};

interface AppShellProps {
  user: { id: string; name: string; email: string; role: string; onboarded: boolean };
  children: React.ReactNode;
}

export function AppShell({ user, children }: AppShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const initials = user.name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();

  const visibleNav = NAV.filter((n) => n.roles.includes(user.role));
  const groups = Array.from(new Set(visibleNav.map((n) => n.group)));

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/auth");
    router.refresh();
  }

  return (
    <div className="min-h-screen">
      {/* Drawer overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Slide-in sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-[240px] flex flex-col gap-5 p-5 bg-[#141413] text-[#f8fafc] overflow-y-auto transition-transform duration-200 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <Link
            href={
              !user.onboarded
                ? "/welcome"
                : user.role === "MENTOR" || user.role === "ADMIN"
                  ? "/bookings"
                  : "/discover"
            }
            className="flex items-center gap-3"
          >
            <Image
              src="/logo.svg"
              width={40}
              height={40}
              alt=""
              aria-hidden="true"
              className="rounded-lg border border-white/20"
              priority
            />
            <span>
              <strong className="block font-poppins text-sm">OpenMargam</strong>
              <small className="text-[0.7rem] text-[#b8c2cf]">Advisory network</small>
            </span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-white/60 hover:text-white p-1"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <nav className="grid gap-0.5">
          {groups.map((group) => (
            <div key={group}>
              <p className="my-2 mx-1 text-[0.64rem] font-bold uppercase tracking-wider text-white/40 font-poppins">{group}</p>
              {visibleNav.filter((n) => n.group === group).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block rounded-[10px] px-3 py-2 text-[0.86rem] transition-all ${
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

        <p className="mt-auto p-3 border border-white/8 rounded-xl bg-white/4 text-[#cfc7ba] text-[0.76rem] leading-relaxed">
          No commission. Payments go directly between mentor and mentee.
        </p>
      </aside>

      {/* Main content */}
      <main className="flex flex-col min-h-screen">
        <header className="flex items-center justify-between gap-4 px-6 md:px-8 py-3 border-b border-[var(--line)] bg-[var(--surface)]">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="w-9 h-9 grid place-items-center rounded-md border border-[var(--line)] hover:border-[var(--primary)] transition-colors"
              aria-label="Open menu"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <h1 className="text-base md:text-lg font-poppins">{pageTitle(pathname)}</h1>
          </div>

          <div className="relative flex items-center gap-3" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-9 h-9 grid place-items-center rounded-full border border-[var(--line)] hover:border-[var(--primary)] transition-colors"
              aria-label="Account menu"
            >
              <span className="text-sm font-bold font-poppins">{initials}</span>
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-12 w-64 bg-[var(--surface)] border border-[var(--line)] rounded-xl shadow-lg overflow-hidden z-50">
                <div className="px-4 py-3 border-b border-[var(--line)]">
                  <p className="font-poppins font-semibold text-sm">{user.name}</p>
                  <p className="text-xs text-[var(--muted)]">{user.email}</p>
                </div>
                <div className="px-4 py-3 border-b border-[var(--line)]">
                  <p className="eyebrow mb-1">Account type</p>
                  <p className="text-sm font-poppins font-semibold">
                    {ROLE_LABELS[user.role] ?? user.role}
                  </p>
                </div>
                <Link href="/onboarding" onClick={() => setMenuOpen(false)} className="block px-4 py-2.5 text-sm hover:bg-[var(--surface-soft)] transition-colors">
                  Profile setup
                </Link>
                <Link href="/safety" onClick={() => setMenuOpen(false)} className="block px-4 py-2.5 text-sm hover:bg-[var(--surface-soft)] transition-colors">
                  Safety center
                </Link>
                <button onClick={logout} className="block w-full text-left px-4 py-2.5 text-sm text-[var(--danger)] hover:bg-[var(--surface-soft)] transition-colors">
                  Sign out
                </button>
              </div>
            )}
          </div>
        </header>

        <div className="flex-1 p-6 md:p-8">{children}</div>
      </main>
    </div>
  );
}

function pageTitle(pathname: string): string {
  const map: Record<string, string> = {
    "/welcome": "How it works",
    "/discover": "Find mentors",
    "/onboarding": "Profile setup",
    "/mentors": "Browse mentors",
    "/bookings": "Bookings",
    "/safety": "Safety center",
  };
  return map[pathname] || "OpenMargam";
}
