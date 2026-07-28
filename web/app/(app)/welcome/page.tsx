import { getCurrentUser } from "@/lib/session";
import { WelcomeClient } from "./WelcomeClient";

export default async function WelcomePage() {
  const user = await getCurrentUser();
  return <WelcomeClient onboarded={user?.onboarded ?? false} role={user?.role ?? "MENTEE"} />;
}
