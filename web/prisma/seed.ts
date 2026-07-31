import { PrismaClient } from "@prisma/client";
import { SEED_MENTORS } from "../lib/seed-mentors";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding mentors...");
  for (const m of SEED_MENTORS) {
    const profile = {
      name: m.name,
      headline: m.headline,
      initials: m.initials,
      bio: m.bio,
      domains: m.domains,
      tags: m.tags,
      stages: m.stages,
      locations: m.locations,
      languages: m.languages,
      meetings: m.meetings,
      pricing: m.pricing,
      trustScore: m.trustScore,
      reviewQuality: m.reviewQuality,
      responseRate: m.responseRate,
      verified: m.verified,
      payment: m.payment,
      meeting: m.meeting,
      availability: m.availability,
    };
    await prisma.mentor.upsert({
      where: { id: m.id },
      update: {
        trustScore: m.trustScore,
        reviewQuality: m.reviewQuality,
        responseRate: m.responseRate,
        verified: m.verified,
      },
      create: {
        id: m.id,
        userId: m.id,
        ...profile,
      },
    });
    console.log(`  ✓ ${m.name}`);
  }
  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
