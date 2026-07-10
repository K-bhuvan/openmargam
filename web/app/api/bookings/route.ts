import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser, unauthorizedResponse } from "@/lib/session";
import { prisma } from "@/lib/prisma";

const CreateBookingSchema = z.object({
  mentorId: z.string(),
  problemSummary: z.string().min(10, "Describe the problem before booking."),
});

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return unauthorizedResponse();

  const bookings = await prisma.booking.findMany({
    where: { menteeId: user.id },
    include: { mentor: { select: { name: true, headline: true } } },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ bookings });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return unauthorizedResponse();

  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request body." }, { status: 400 });

  const parsed = CreateBookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Validation failed." }, { status: 400 });
  }

  const { mentorId, problemSummary } = parsed.data;
  const mentor = await prisma.mentor.findUnique({
    where: { id: mentorId },
    select: { id: true, name: true, payment: true, meeting: true },
  });
  if (!mentor) return NextResponse.json({ error: "Mentor not found." }, { status: 404 });

  const booking = await prisma.booking.create({
    data: {
      menteeId: user.id,
      mentorId,
      problemSummary: problemSummary.slice(0, 150),
      payment: mentor.payment,
      meetingInstructions: mentor.meeting,
      state: "REQUESTED",
    },
  });

  await prisma.auditLog.create({
    data: { userId: user.id, message: `Booking created with ${mentor.name}` },
  });

  return NextResponse.json({ booking }, { status: 201 });
}
