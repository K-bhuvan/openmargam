import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { AppShell } from "@/components/AppShell";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect("/auth");

  return <AppShell user={{ id: user.id, name: user.name, email: user.email, role: user.role, onboarded: user.onboarded }}>{children}</AppShell>;
}
