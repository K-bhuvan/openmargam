import assert from "node:assert/strict";
import test from "node:test";
import {
  allowedBookingTransitions,
  canTransitionBooking,
  canUpdateBooking,
} from "../lib/bookings";

const booking = {
  menteeId: "mentee-1",
  state: "REQUESTED" as const,
  mentor: {
    userId: "mentor-1",
  },
};

test("booking owner can update their booking", () => {
  assert.equal(canUpdateBooking({ id: "mentee-1", role: "MENTEE" }, booking), true);
});

test("assigned mentor can update their booking", () => {
  assert.equal(canUpdateBooking({ id: "mentor-1", role: "MENTOR" }, booking), true);
});

test("unrelated self-registered mentor cannot update another booking", () => {
  assert.equal(canUpdateBooking({ id: "mentor-2", role: "MENTOR" }, booking), false);
});

test("admin can update any booking", () => {
  assert.equal(canUpdateBooking({ id: "admin-1", role: "ADMIN" }, booking), true);
});

test("mentee can cancel a request but cannot accept their own request", () => {
  const user = { id: "mentee-1", role: "MENTEE" };

  assert.deepEqual(allowedBookingTransitions(user, booking), ["CANCELLED"]);
  assert.equal(canTransitionBooking(user, booking, "CANCELLED"), true);
  assert.equal(canTransitionBooking(user, booking, "ACCEPTED"), false);
});

test("assigned mentor can clarify, accept, or reject a request", () => {
  const user = { id: "mentor-1", role: "MENTOR" };

  assert.deepEqual(allowedBookingTransitions(user, booking), [
    "CLARIFICATION_REQUESTED",
    "ACCEPTED",
    "REJECTED",
  ]);
});

test("mentee marks an accepted booking as payment pending", () => {
  const accepted = { ...booking, state: "ACCEPTED" as const };

  assert.deepEqual(
    allowedBookingTransitions({ id: "mentee-1", role: "MENTEE" }, accepted),
    ["PAYMENT_PENDING", "CANCELLED"],
  );
  assert.deepEqual(
    allowedBookingTransitions({ id: "mentor-1", role: "MENTOR" }, accepted),
    ["CANCELLED"],
  );
});

test("mentor confirms payment and completes a confirmed session", () => {
  const mentor = { id: "mentor-1", role: "MENTOR" };
  const paymentPending = { ...booking, state: "PAYMENT_PENDING" as const };
  const confirmed = { ...booking, state: "CONFIRMED" as const };

  assert.deepEqual(allowedBookingTransitions(mentor, paymentPending), ["CONFIRMED", "CANCELLED"]);
  assert.deepEqual(allowedBookingTransitions(mentor, confirmed), ["COMPLETED", "CANCELLED"]);
});

test("unrelated users have no available transitions", () => {
  assert.deepEqual(
    allowedBookingTransitions({ id: "mentee-2", role: "MENTEE" }, booking),
    [],
  );
});

test("admin is constrained by the global state machine", () => {
  const admin = { id: "admin-1", role: "ADMIN" };
  const completed = { ...booking, state: "COMPLETED" as const };

  assert.deepEqual(allowedBookingTransitions(admin, booking), [
    "CLARIFICATION_REQUESTED",
    "ACCEPTED",
    "REJECTED",
    "CANCELLED",
  ]);
  assert.deepEqual(allowedBookingTransitions(admin, completed), []);
});
