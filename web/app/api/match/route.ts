import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser, unauthorizedResponse } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { rankMentors, type Problem } from "@/lib/matching";
import { PUBLIC_MENTOR_SELECT } from "@/lib/public-mentor";

const MatchSchema = z.object({
  statement: z.string().min(10, "Describe the problem in at least 10 characters."),
  domain: z.string(),
  stage: z.string(),
  location: z.string(),
  language: z.string(),
  meeting: z.string(),
  budget: z.string(),
  profileNotes: z.string().optional().default(""),
});

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return unauthorizedResponse();

  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request body." }, { status: 400 });

  const parsed = MatchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Validation failed." }, { status: 400 });
  }

  const problem: Problem = parsed.data;
  const mentors = await prisma.mentor.findMany({
    select: PUBLIC_MENTOR_SELECT,
    orderBy: { createdAt: "asc" },
  });
  const matches = rankMentors(problem, mentors, []);
  return NextResponse.json({ matches });
}
