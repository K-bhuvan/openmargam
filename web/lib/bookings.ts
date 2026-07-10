export interface BookingAccessUser {
  id: string;
  role: string;
}

export interface BookingAccessRecord {
  menteeId: string;
  mentor: {
    userId: string;
  };
}

export function canUpdateBooking(user: BookingAccessUser, booking: BookingAccessRecord): boolean {
  return booking.menteeId === user.id || booking.mentor.userId === user.id || user.role === "ADMIN";
}
