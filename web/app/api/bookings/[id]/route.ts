import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser, unauthorizedResponse } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { canTransition } from "@/lib/matching";
import { canUpdateBooking } from "@/lib/bookings";

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
  if (!canTransition(currentState, parsed.data.state)) {
    return NextResponse.json({ error: `Cannot transition from ${booking.state} to ${parsed.data.state}.` }, { status: 400 });
  }

  const updated = await prisma.booking.update({
    where: { id },
    data: { state: parsed.data.state },
    include: { mentor: { select: { name: true, headline: true } } },
  });

  await prisma.auditLog.create({
    data: { userId: user.id, message: `Booking ${booking.id} moved to ${parsed.data.state}` },
  });

  return NextResponse.json({ booking: updated });
}
