import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser, unauthorizedResponse } from "@/lib/session";
import { prisma } from "@/lib/prisma";

const ReportSchema = z.object({
  targetMentorId: z.string().nullable(),
  category: z.string().min(1),
  risk: z.enum(["LOW", "MEDIUM", "HIGH"]),
  description: z.string().min(10, "Describe the issue in at least 10 characters."),
});

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return unauthorizedResponse();

  const reports = await prisma.report.findMany({
    where: { reporterId: user.id },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ reports });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return unauthorizedResponse();

  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request body." }, { status: 400 });

  const parsed = ReportSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Validation failed." }, { status: 400 });
  }

  const report = await prisma.report.create({
    data: { ...parsed.data, reporterId: user.id, status: "OPEN" },
  });

  await prisma.auditLog.create({
    data: { userId: user.id, message: `Report filed for ${parsed.data.targetMentorId ?? "unknown"}` },
  });

  return NextResponse.json({ report }, { status: 201 });
}
