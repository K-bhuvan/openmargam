import { getCurrentUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { OnboardingClient } from "./OnboardingClient";
import { MentorProfileClient } from "./MentorProfileClient";

export default async function OnboardingPage() {
  const user = await getCurrentUser();

  if (user?.role === "MENTOR") {
    const profile = await prisma.mentor.findUnique({
      where: { userId: user.id },
      select: {
        headline: true,
        bio: true,
        domains: true,
        tags: true,
        stages: true,
        locations: true,
        languages: true,
        meetings: true,
        pricing: true,
        payment: true,
        meeting: true,
        availability: true,
      },
    });
    return <MentorProfileClient initial={profile ?? {}} />;
  }

  return <OnboardingClient initial={user?.preferences ?? {}} />;
}
