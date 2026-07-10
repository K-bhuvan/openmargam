import assert from "node:assert/strict";
import test from "node:test";
import { canUpdateBooking } from "../lib/bookings";

const booking = {
  menteeId: "mentee-1",
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
