import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser, unauthorizedResponse } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { canTransition } from "@/lib/matching";
import {
  allowedBookingTransitions,
  canTransitionBooking,
  canUpdateBooking,
} from "@/lib/bookings";

const TransitionSchema = z.object({
  state: z.string(),
});

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user) return unauthorizedResponse();
  const { id } = await params;

  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request body." }, { status: 400 });

  const parsed = TransitionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid state." }, { status: 400 });
  }

  const booking = await prisma.booking.findUnique({
    where: { id },
    include: { mentor: { select: { userId: true } } },
  });
  if (!booking) return NextResponse.json({ error: "Booking not found." }, { status: 404 });
  if (!canUpdateBooking(user, booking)) {
    return NextResponse.json({ error: "Not authorized to update this booking." }, { status: 403 });
  }

  const currentState = booking.state;
  const nextState = parsed.data.state;
  if (!canTransition(currentState, nextState)) {
    return NextResponse.json({ error: `Cannot transition from ${booking.state} to ${nextState}.` }, { status: 400 });
  }
  if (!canTransitionBooking(user, booking, nextState)) {
    return NextResponse.json(
      { error: "Your account cannot perform that booking action." },
      { status: 403 },
    );
  }

  const updated = await prisma.$transaction(async (tx) => {
    const result = await tx.booking.updateMany({
      where: { id, state: currentState },
      data: { state: nextState },
    });
    if (result.count === 0) return null;

    const transitioned = await tx.booking.findUniqueOrThrow({
      where: { id },
      include: {
        mentor: { select: { name: true, headline: true, userId: true } },
        mentee: { select: { name: true } },
      },
    });
    await tx.auditLog.create({
      data: { userId: user.id, message: `Booking ${booking.id} moved to ${nextState}` },
    });
    return transitioned;
  });

  if (!updated) {
    return NextResponse.json(
      { error: "This booking changed before your action completed. Refresh and try again." },
      { status: 409 },
    );
  }

  return NextResponse.json({
    booking: {
      ...updated,
      mentor: {
        name: updated.mentor.name,
        headline: updated.mentor.headline,
      },
      availableTransitions: allowedBookingTransitions(user, updated),
    },
  });
}
