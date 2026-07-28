import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";

export default async function HomePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/auth");
  if (!user.onboarded) redirect("/welcome");
  redirect(user.role === "MENTOR" || user.role === "ADMIN" ? "/bookings" : "/discover");
}
