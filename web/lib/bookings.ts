import {
  allowedTransitions,
  type BookingState,
} from "@/lib/matching";

export interface BookingAccessUser {
  id: string;
  role: string;
}

export interface BookingAccessRecord {
  menteeId: string;
  state: BookingState;
  mentor: {
    userId: string;
  };
}

const MENTEE_TRANSITIONS: Partial<Record<BookingState, BookingState[]>> = {
  REQUESTED: ["CANCELLED"],
  CLARIFICATION_REQUESTED: ["CANCELLED"],
  ACCEPTED: ["PAYMENT_PENDING", "CANCELLED"],
  PAYMENT_PENDING: ["CANCELLED"],
  CONFIRMED: ["CANCELLED"],
};

const MENTOR_TRANSITIONS: Partial<Record<BookingState, BookingState[]>> = {
  REQUESTED: ["CLARIFICATION_REQUESTED", "ACCEPTED", "REJECTED"],
  CLARIFICATION_REQUESTED: ["ACCEPTED", "REJECTED"],
  ACCEPTED: ["CANCELLED"],
  PAYMENT_PENDING: ["CONFIRMED", "CANCELLED"],
  CONFIRMED: ["COMPLETED", "CANCELLED"],
};

export function canUpdateBooking(user: BookingAccessUser, booking: BookingAccessRecord): boolean {
  return booking.menteeId === user.id || booking.mentor.userId === user.id || user.role === "ADMIN";
}

export function allowedBookingTransitions(
  user: BookingAccessUser,
  booking: BookingAccessRecord,
): BookingState[] {
  if (user.role === "ADMIN") return allowedTransitions(booking.state);
  if (booking.menteeId === user.id) return MENTEE_TRANSITIONS[booking.state] ?? [];
  if (booking.mentor.userId === user.id) return MENTOR_TRANSITIONS[booking.state] ?? [];
  return [];
}

export function canTransitionBooking(
  user: BookingAccessUser,
  booking: BookingAccessRecord,
  next: string,
): next is BookingState {
  return allowedBookingTransitions(user, booking).includes(next as BookingState);
}
