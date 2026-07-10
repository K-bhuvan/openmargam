import { getCurrentUser } from "@/lib/session";
import { OnboardingClient } from "./OnboardingClient";

export default async function OnboardingPage() {
  const user = await getCurrentUser();
  return <OnboardingClient initial={user?.preferences ?? {}} />;
}
