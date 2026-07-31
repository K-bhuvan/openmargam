const PROFILES = [
  {
    name: "Asha R.",
    headline: "Robotics engineer who navigated a graduate-school transition",
    topics: ["robotics", "graduate-school", "career"],
    stages: ["student", "early-career", "career-switcher"],
    keywords: ["robotics", "ai", "loan", "graduate", "masters", "research", "secure job"],
  },
  {
    name: "Noah K.",
    headline: "Software lead who moved from general engineering into applied ML",
    topics: ["career", "robotics"],
    stages: ["early-career", "career-switcher"],
    keywords: ["career", "switch", "software", "portfolio", "ml", "interview", "job"],
  },
  {
    name: "Leena M.",
    headline: "First-generation graduate who planned around financial constraints",
    topics: ["graduate-school", "career"],
    stages: ["student", "early-career"],
    keywords: ["loan", "debt", "scholarship", "graduate", "family", "savings", "financial"],
  },
  {
    name: "Mateo S.",
    headline: "Founder who tested an idea before leaving a stable role",
    topics: ["startup", "career"],
    stages: ["founder", "early-career", "career-switcher"],
    keywords: ["startup", "founder", "customer", "idea", "risk", "stable", "business"],
  },
];

const form = document.querySelector("#match-form");
const decision = document.querySelector("#decision");
const topic = document.querySelector("#topic");
const stage = document.querySelector("#stage");
const results = document.querySelector("#match-results");
const exampleButton = document.querySelector("#use-example");

exampleButton.addEventListener("click", () => {
  decision.value = "I have a stable software job but want to move into robotics without taking on a large loan.";
  topic.value = "robotics";
  stage.value = "career-switcher";
  decision.focus();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const statement = decision.value.trim().toLowerCase();
  if (!statement) return;

  const ranked = PROFILES.map((profile) => scoreProfile(profile, statement, topic.value, stage.value))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  renderMatches(ranked);
});

function scoreProfile(profile, statement, selectedTopic, selectedStage) {
  let score = 20;
  const reasons = [];

  if (profile.topics.includes(selectedTopic)) {
    score += 38;
    reasons.push(`Relevant experience for ${topic.options[topic.selectedIndex].text.toLowerCase()}.`);
  }

  if (profile.stages.includes(selectedStage)) {
    score += 22;
    reasons.push(`Has context for the ${stage.options[stage.selectedIndex].text.toLowerCase()} stage.`);
  }

  const keywordMatches = profile.keywords.filter((keyword) => statement.includes(keyword));
  if (keywordMatches.length) {
    score += Math.min(keywordMatches.length * 7, 20);
    reasons.push(`Scenario overlap: ${keywordMatches.slice(0, 3).join(", ")}.`);
  }

  if (reasons.length < 2) reasons.push("Could offer a contrasting perspective on the decision.");
  return { profile, score: Math.min(score, 100), reasons };
}

function renderMatches(matches) {
  results.replaceChildren();

  const heading = document.createElement("h3");
  heading.className = "results-heading";
  heading.textContent = "Fictional demonstration matches";
  results.append(heading);

  for (const match of matches) {
    const card = document.createElement("article");
    card.className = "result-card";

    const head = document.createElement("div");
    head.className = "result-head";

    const identity = document.createElement("div");
    const label = document.createElement("span");
    label.className = "fictional-label";
    label.textContent = "Fictional profile";
    const name = document.createElement("h3");
    name.textContent = match.profile.name;
    const headline = document.createElement("p");
    headline.textContent = match.profile.headline;
    identity.append(label, name, headline);

    const score = document.createElement("span");
    score.className = "match-score";
    score.textContent = `${match.score}% fit`;
    head.append(identity, score);

    const reasons = document.createElement("ul");
    reasons.className = "reason-list";
    for (const reasonText of match.reasons) {
      const reason = document.createElement("li");
      reason.textContent = reasonText;
      reasons.append(reason);
    }

    card.append(head, reasons);
    results.append(card);
  }
}
