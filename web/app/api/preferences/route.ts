import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser, unauthorizedResponse } from "@/lib/session";
import { prisma } from "@/lib/prisma";

const PreferencesSchema = z.object({
  goal: z.string().optional().default(""),
  domain: z.string(),
  stage: z.string(),
  location: z.string(),
  language: z.string(),
  meeting: z.string(),
  budget: z.string(),
  safety: z.enum(["public-first", "remote-only", "verified-only"]),
});

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return unauthorizedResponse();
  return NextResponse.json({ preferences: user.preferences, onboarded: user.onboarded });
}

export async function PUT(request: Request) {
  const user = await getCurrentUser();
  if (!user) return unauthorizedResponse();

  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request body." }, { status: 400 });

  const parsed = PreferencesSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Validation failed." }, { status: 400 });
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      preferences: parsed.data,
      onboarded: true,
    },
  });

  return NextResponse.json({ preferences: parsed.data, onboarded: true });
}
