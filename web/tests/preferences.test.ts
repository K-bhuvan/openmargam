import assert from "node:assert/strict";
import test from "node:test";
import { normalizePreferences } from "../lib/session";

test("normalizes object JSON preferences", () => {
  assert.deepEqual(normalizePreferences({ domain: "AI/ML career", onboarded: true }), {
    domain: "AI/ML career",
  });
});

test("normalizes legacy stringified preferences", () => {
  assert.deepEqual(normalizePreferences('{"stage":"College student"}'), {
    stage: "College student",
  });
});

test("returns an empty object for invalid preferences", () => {
  assert.deepEqual(normalizePreferences("not json"), {});
  assert.deepEqual(normalizePreferences(["AI/ML career"]), {});
});
