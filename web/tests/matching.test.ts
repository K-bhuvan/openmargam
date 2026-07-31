import assert from "node:assert/strict";
import test from "node:test";
import { rankMentors, scoreMentor, type Problem } from "../lib/matching";
import { PUBLIC_MENTOR_SELECT } from "../lib/public-mentor";
import { SEED_MENTORS } from "../lib/seed-mentors";

const baseProblem: Problem = {
  statement: "I need concrete guidance for an important career decision.",
  domain: "Software engineering",
  stage: "Early career",
  location: "No preference",
  language: "No preference",
  meeting: "No preference",
  budget: "No preference",
  profileNotes: "",
};

test("robotics graduate-school context ranks the robotics mentor first", () => {
  const matches = rankMentors(
    {
      ...baseProblem,
      statement: "I am building robotics projects with ROS and planning graduate school.",
      domain: "Robotics career",
      stage: "College student",
      location: "India/IIT",
      language: "Hindi",
      meeting: "video",
      budget: "community hours",
    },
    SEED_MENTORS,
  );

  assert.equal(matches[0]?.mentor.id, "mira-patel");
  assert.ok(matches[0]?.reasons.some((reason) => reason.includes("Robotics career")));
  assert.ok(matches[0]?.reasons.some((reason) => reason.includes("Hindi")));
});

test("B2B pricing problem ranks the founder-operator first", () => {
  const matches = rankMentors(
    {
      ...baseProblem,
      statement: "I am a founder deciding B2B SaaS pricing and go-to-market strategy.",
      domain: "Startup advice",
      stage: "Founder",
      budget: "paid",
    },
    SEED_MENTORS,
  );

  assert.equal(matches[0]?.mentor.id, "daniel-kim");
  assert.ok(matches[0]?.reasons.some((reason) => reason.includes("pricing")));
});

test("blocked mentors are excluded before results are limited", () => {
  const matches = rankMentors(baseProblem, SEED_MENTORS, ["grace-chen"]);

  assert.equal(matches.some((match) => match.mentor.id === "grace-chen"), false);
  assert.ok(matches.length <= 5);
});

test("seed profiles do not contribute unearned trust signals", () => {
  for (const mentor of SEED_MENTORS) {
    const match = scoreMentor(baseProblem, mentor);
    assert.equal(match.dimensions.trust, 0);
    assert.equal(match.dimensions.review, 0);
    assert.equal(match.dimensions.availability, 0);
    assert.deepEqual(mentor.verified, []);
  }
});

test("public mentor projection excludes private instructions and internal ownership", () => {
  assert.equal("payment" in PUBLIC_MENTOR_SELECT, false);
  assert.equal("meeting" in PUBLIC_MENTOR_SELECT, false);
  assert.equal("userId" in PUBLIC_MENTOR_SELECT, false);
});
