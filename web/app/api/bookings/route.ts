import { NextResponse } from "next/server";
import { z } from "zod";
import type { Prisma } from "@prisma/client";
import { getCurrentUser, unauthorizedResponse } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { allowedBookingTransitions } from "@/lib/bookings";

const CreateBookingSchema = z.object({
  mentorId: z.string(),
  problemSummary: z.string().min(10, "Describe the problem before booking."),
});

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return unauthorizedResponse();

  let where: Prisma.BookingWhereInput;
  let notice: string | undefined;

  if (user.role === "ADMIN") {
    where = {};
  } else if (user.role === "MENTOR") {
    const mentor = await prisma.mentor.findUnique({
      where: { userId: user.id },
      select: { id: true },
    });
    if (!mentor) {
      notice = "Your mentor account is not linked to a mentor profile yet.";
      return NextResponse.json({ bookings: [], role: user.role, notice });
    }
    where = { mentorId: mentor.id };
  } else {
    where = { menteeId: user.id };
  }

  const bookings = await prisma.booking.findMany({
    where,
    include: {
      mentor: { select: { name: true, headline: true, userId: true } },
      mentee: { select: { name: true } },
    },
    orderBy: { createdAt: "desc" },
  });
  const responseBookings = bookings.map((booking) => ({
    ...booking,
    mentor: {
      name: booking.mentor.name,
      headline: booking.mentor.headline,
    },
    availableTransitions: allowedBookingTransitions(user, booking),
  }));

  return NextResponse.json({ bookings: responseBookings, role: user.role, notice });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return unauthorizedResponse();
  if (user.role !== "MENTEE") {
    return NextResponse.json({ error: "Only mentee accounts can request sessions." }, { status: 403 });
  }

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
