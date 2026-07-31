import { NextResponse } from "next/server";
import { getCurrentUser, unauthorizedResponse } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { PUBLIC_MENTOR_SELECT } from "@/lib/public-mentor";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return unauthorizedResponse();

  const mentors = await prisma.mentor.findMany({
    select: PUBLIC_MENTOR_SELECT,
    orderBy: { createdAt: "asc" },
  });
  return NextResponse.json({ mentors });
}
