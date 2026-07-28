import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser, unauthorizedResponse } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { TAXONOMY } from "@/lib/matching";

const MentorProfileSchema = z.object({
  headline: z.string().min(10, "Add a headline of at least 10 characters.").max(120),
  bio: z.string().min(40, "Tell mentees about your experience in at least 40 characters.").max(800),
  domain: z.enum(TAXONOMY.domains),
  stage: z.enum(TAXONOMY.stages),
  location: z.enum(TAXONOMY.locations),
  language: z.enum(TAXONOMY.languages),
  meeting: z.enum(TAXONOMY.meetings),
  pricing: z.enum(["free", "paid", "donation", "community hours"]),
  tags: z.string().min(2, "Add at least one expertise tag.").max(240),
  payment: z.string().min(5, "Describe how mentees pay you, or state that sessions are free.").max(240),
  meetingInstructions: z.string().min(5, "Describe your meeting method.").max(240),
  availability: z.string().min(5, "Describe your general availability.").max(160),
});

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return unauthorizedResponse();
  if (user.role !== "MENTOR") {
    return NextResponse.json({ error: "Only mentor accounts have mentor profiles." }, { status: 403 });
  }

  const profile = await prisma.mentor.findUnique({ where: { userId: user.id } });
  return NextResponse.json({ profile });
}

export async function PUT(request: Request) {
  const user = await getCurrentUser();
  if (!user) return unauthorizedResponse();
  if (user.role !== "MENTOR") {
    return NextResponse.json({ error: "Only mentor accounts can edit mentor profiles." }, { status: 403 });
  }

  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request body." }, { status: 400 });

  const parsed = MentorProfileSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Validation failed." },
      { status: 400 },
    );
  }

  const {
    headline,
    bio,
    domain,
    stage,
    location,
    language,
    meeting,
    pricing,
    payment,
    meetingInstructions,
    availability,
  } = parsed.data;
  const tags = parsed.data.tags
    .split(",")
    .map((tag) => tag.trim().toLowerCase())
    .filter(Boolean)
    .slice(0, 12);

  if (tags.length === 0) {
    return NextResponse.json({ error: "Add at least one expertise tag." }, { status: 400 });
  }

  const profileData = {
    name: user.name,
    headline,
    initials: initialsFor(user.name),
    bio,
    domains: [domain],
    tags,
    stages: [stage],
    locations: location === "No preference" ? ["Remote global"] : [location],
    languages: language === "No preference" ? ["English"] : [language],
    meetings: meeting === "No preference" ? ["video"] : [meeting],
    pricing,
    payment,
    meeting: meetingInstructions,
    availability,
  };

  const [profile] = await prisma.$transaction([
    prisma.mentor.upsert({
      where: { userId: user.id },
      update: profileData,
      create: {
        ...profileData,
        userId: user.id,
        trustScore: 0,
        reviewQuality: 0,
        responseRate: 0,
        verified: [],
      },
    }),
    prisma.user.update({
      where: { id: user.id },
      data: { onboarded: true },
    }),
  ]);

  return NextResponse.json({ profile });
}

function initialsFor(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
