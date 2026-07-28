import type { Prisma } from "@prisma/client";

export const PUBLIC_MENTOR_SELECT = {
  id: true,
  name: true,
  headline: true,
  initials: true,
  bio: true,
  domains: true,
  tags: true,
  stages: true,
  locations: true,
  languages: true,
  meetings: true,
  pricing: true,
  trustScore: true,
  reviewQuality: true,
  responseRate: true,
  verified: true,
  availability: true,
} satisfies Prisma.MentorSelect;
