export const TAXONOMY = {
  domains: [
    "AI/ML career",
    "Robotics career",
    "Startup advice",
    "Product management",
    "Software engineering",
    "Data engineering",
    "Cloud/MLOps",
    "Graduate school",
  ],
  stages: [
    "School student",
    "College student",
    "Early career",
    "Career switcher",
    "Founder",
    "Senior operator",
  ],
  locations: ["No preference", "India/IIT", "U.S. tech", "Local in-person", "Remote global"],
  languages: ["No preference", "English", "Hindi", "Telugu", "Tamil", "Spanish"],
  meetings: ["No preference", "video", "phone", "chat", "in-person"],
  budgets: ["No preference", "free", "paid", "donation", "community hours"],
  reportCategories: [
    "Guaranteed outcome claim",
    "Payment pressure",
    "Suspicious external link",
    "Harassment",
    "Credential concern",
    "Unsafe in-person request",
  ],
} as const;

export const BOOKING_STATES = [
  "REQUESTED",
  "CLARIFICATION_REQUESTED",
  "ACCEPTED",
  "PAYMENT_PENDING",
  "CONFIRMED",
  "COMPLETED",
  "CANCELLED",
  "REJECTED",
] as const;

export type BookingState = (typeof BOOKING_STATES)[number];
export type RiskLevel = "LOW" | "MEDIUM" | "HIGH";

export interface Mentor {
  id: string;
  name: string;
  headline: string;
  initials: string;
  domains: string[];
  tags: string[];
  stages: string[];
  locations: string[];
  languages: string[];
  meetings: string[];
  pricing: string;
  trustScore: number;
  reviewQuality: number;
  responseRate: number;
  verified: string[];
  availability: string;
  bio: string;
}

export interface Problem {
  statement: string;
  domain: string;
  stage: string;
  location: string;
  language: string;
  meeting: string;
  budget: string;
  profileNotes: string;
}

export interface MatchDimensions {
  problemExpertise: number;
  livedExperience: number;
  careerStage: number;
  location: number;
  language: number;
  availability: number;
  meeting: number;
  trust: number;
  review: number;
  price: number;
}

export interface MentorMatch {
  mentor: Mentor;
  score: number;
  dimensions: MatchDimensions;
  reasons: string[];
}

export const TRANSITIONS: Record<BookingState, BookingState[]> = {
  REQUESTED: ["CLARIFICATION_REQUESTED", "ACCEPTED", "REJECTED", "CANCELLED"],
  CLARIFICATION_REQUESTED: ["ACCEPTED", "REJECTED", "CANCELLED"],
  ACCEPTED: ["PAYMENT_PENDING", "CONFIRMED", "CANCELLED"],
  PAYMENT_PENDING: ["CONFIRMED", "CANCELLED"],
  CONFIRMED: ["COMPLETED", "CANCELLED"],
  COMPLETED: [],
  CANCELLED: [],
  REJECTED: [],
};

export function allowedTransitions(current: BookingState): BookingState[] {
  return TRANSITIONS[current] ?? [];
}

export function canTransition(current: BookingState, next: string): next is BookingState {
  return allowedTransitions(current).includes(next as BookingState);
}

function budgetNearFit(requested: string, mentorPricing: string): number {
  if (requested === "free" && ["community hours", "donation"].includes(mentorPricing)) return 0.75;
  if (requested === "community hours" && ["free", "donation"].includes(mentorPricing)) return 0.7;
  if (requested === "paid" && ["donation", "community hours"].includes(mentorPricing)) return 0.5;
  return 0.25;
}

function buildReasons(
  problem: Problem,
  mentor: Mentor,
  keywordHits: string[],
  dimensions: MatchDimensions,
): string[] {
  const reasons: string[] = [];
  if (mentor.domains.includes(problem.domain)) reasons.push(`Strong ${problem.domain} expertise.`);
  if (keywordHits.length) reasons.push(`Profile evidence matches: ${keywordHits.slice(0, 4).join(", ")}.`);
  if (dimensions.careerStage === 1) reasons.push(`Works with ${problem.stage.toLowerCase()} users.`);
  if (dimensions.location === 1 && problem.location !== "No preference") {
    reasons.push(`Has ${problem.location} context.`);
  }
  if (dimensions.language === 1 && problem.language !== "No preference") {
    reasons.push(`Supports ${problem.language}.`);
  }
  if (dimensions.meeting === 1 && problem.meeting !== "No preference") {
    reasons.push(`Offers ${problem.meeting} sessions.`);
  }
  if (dimensions.price === 1 && problem.budget !== "No preference") {
    reasons.push(`Pricing aligns with your ${problem.budget} preference.`);
  }
  if (reasons.length < 3) reasons.push("Profile background reflects aspects of your stated problem.");
  return reasons.slice(0, 5);
}

export function scoreMentor(problem: Problem, mentor: Mentor): MentorMatch {
  const text = `${problem.statement} ${problem.profileNotes}`.toLowerCase();
  const keywordHits = mentor.tags.filter((tag) => text.includes(tag.toLowerCase()));

  const dimensions: MatchDimensions = {
    problemExpertise: mentor.domains.includes(problem.domain) ? 1 : keywordHits.length > 0 ? 0.6 : 0.15,
    livedExperience: mentor.tags.some((tag) => text.includes(tag.toLowerCase())) ? 1 : 0.35,
    careerStage: mentor.stages.includes(problem.stage) ? 1 : 0.35,
    location: problem.location === "No preference" || mentor.locations.includes(problem.location) ? 1 : 0.25,
    language: problem.language === "No preference" || mentor.languages.includes(problem.language) ? 1 : 0.2,
    availability: 0,
    meeting: problem.meeting === "No preference" || mentor.meetings.includes(problem.meeting) ? 1 : 0.25,
    trust: 0,
    review: 0,
    price: problem.budget === "No preference" || mentor.pricing === problem.budget ? 1 : budgetNearFit(problem.budget, mentor.pricing),
  };

  const score =
    dimensions.problemExpertise * 32 +
    dimensions.livedExperience * 20 +
    dimensions.careerStage * 15 +
    dimensions.location * 10 +
    dimensions.language * 8 +
    dimensions.meeting * 8 +
    dimensions.price * 7;

  return {
    mentor,
    score: Math.round(score),
    dimensions,
    reasons: buildReasons(problem, mentor, keywordHits, dimensions),
  };
}

export function rankMentors(problem: Problem, mentors: Mentor[], blocked: string[] = []): MentorMatch[] {
  return mentors
    .filter((m) => !blocked.includes(m.id))
    .map((m) => scoreMentor(problem, m))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}
