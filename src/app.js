const STORAGE_KEY = "openmargam:mvp-state:v1";

const TAXONOMY = {
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
};

const BOOKING_STATES = [
  "requested",
  "clarification_requested",
  "accepted",
  "payment_pending",
  "confirmed",
  "completed",
  "cancelled",
  "rejected",
];

const SAMPLE_PROBLEM =
  "I am a college student in India trying to move toward robotics and AI. I have a few Python projects, but I need practical guidance on what to build next, whether graduate school matters, and how to find mentors who understand the India to U.S. path.";

const MENTORS = [
  {
    id: "mira-patel",
    name: "Mira Patel",
    headline: "Robotics engineer, India to U.S. graduate path",
    initials: "MP",
    domains: ["Robotics career", "AI/ML career", "Graduate school"],
    tags: ["robotics", "ros", "python", "graduate school", "projects", "india"],
    stages: ["School student", "College student", "Career switcher"],
    locations: ["India/IIT", "U.S. tech", "Remote global"],
    languages: ["English", "Hindi"],
    meetings: ["video", "in-person", "chat"],
    pricing: "community hours",
    trustScore: 92,
    reviewQuality: 88,
    responseRate: 94,
    verified: ["Email", "GitHub", "Portfolio"],
    payment: "Free community hours, then Stripe Payment Link",
    meeting: "Google Meet or public university space",
    availability: "Tue and Thu evenings",
    bio: "Recently completed an MS robotics path and now works on autonomy systems.",
  },
  {
    id: "daniel-kim",
    name: "Daniel Kim",
    headline: "B2B SaaS founder and product operator",
    initials: "DK",
    domains: ["Startup advice", "Product management", "Software engineering"],
    tags: ["b2b", "pricing", "gtm", "saas", "founder", "operator"],
    stages: ["Founder", "Senior operator", "Early career"],
    locations: ["U.S. tech", "Remote global"],
    languages: ["English"],
    meetings: ["video", "phone"],
    pricing: "paid",
    trustScore: 89,
    reviewQuality: 91,
    responseRate: 81,
    verified: ["Email", "Domain email", "LinkedIn"],
    payment: "Stripe Payment Link",
    meeting: "Zoom link after confirmation",
    availability: "Mon mornings and Fri afternoons",
    bio: "Built and sold a vertical SaaS company, now advises early B2B teams.",
  },
  {
    id: "ananya-rao",
    name: "Ananya Rao",
    headline: "AI career switch mentor and MLOps lead",
    initials: "AR",
    domains: ["AI/ML career", "Cloud/MLOps", "Data engineering"],
    tags: ["mlops", "career switch", "portfolio", "cloud", "interviews", "india"],
    stages: ["Career switcher", "Early career", "College student"],
    locations: ["India/IIT", "Remote global"],
    languages: ["English", "Telugu", "Hindi"],
    meetings: ["video", "chat"],
    pricing: "donation",
    trustScore: 86,
    reviewQuality: 84,
    responseRate: 89,
    verified: ["Email", "GitHub"],
    payment: "Donation link optional",
    meeting: "Google Meet",
    availability: "Weekends",
    bio: "Moved from backend engineering into applied ML and now leads model delivery.",
  },
  {
    id: "sofia-martinez",
    name: "Sofia Martinez",
    headline: "Product leader for developer tools",
    initials: "SM",
    domains: ["Product management", "Software engineering", "Startup advice"],
    tags: ["developer tools", "roadmap", "research", "stakeholders", "pm interviews"],
    stages: ["Early career", "Career switcher", "Senior operator"],
    locations: ["U.S. tech", "Remote global"],
    languages: ["English", "Spanish"],
    meetings: ["video", "phone"],
    pricing: "paid",
    trustScore: 83,
    reviewQuality: 87,
    responseRate: 77,
    verified: ["Email", "LinkedIn"],
    payment: "PayPal link",
    meeting: "Microsoft Teams",
    availability: "Wed afternoons",
    bio: "Coaches engineers moving into product and PMs working on technical products.",
  },
  {
    id: "ravi-menon",
    name: "Ravi Menon",
    headline: "Data engineering and cloud architecture advisor",
    initials: "RM",
    domains: ["Data engineering", "Cloud/MLOps", "Software engineering"],
    tags: ["data pipelines", "spark", "aws", "architecture", "platform"],
    stages: ["Early career", "Senior operator", "Career switcher"],
    locations: ["India/IIT", "Remote global"],
    languages: ["English", "Tamil", "Hindi"],
    meetings: ["video", "phone", "chat"],
    pricing: "free",
    trustScore: 78,
    reviewQuality: 80,
    responseRate: 91,
    verified: ["Email", "GitHub"],
    payment: "Free sessions only",
    meeting: "Decide after booking",
    availability: "Sat mornings",
    bio: "Helps engineers move from application work into data platform roles.",
  },
  {
    id: "grace-chen",
    name: "Grace Chen",
    headline: "Hiring manager for software engineering teams",
    initials: "GC",
    domains: ["Software engineering", "Graduate school", "AI/ML career"],
    tags: ["interviews", "resume", "hiring", "career ladder", "u.s. tech"],
    stages: ["College student", "Early career", "Career switcher"],
    locations: ["U.S. tech", "Remote global", "Local in-person"],
    languages: ["English"],
    meetings: ["video", "in-person"],
    pricing: "community hours",
    trustScore: 90,
    reviewQuality: 86,
    responseRate: 72,
    verified: ["Email", "Domain email", "LinkedIn"],
    payment: "Community hours or Wise link",
    meeting: "Video or public library meeting",
    availability: "Monthly office hours",
    bio: "Reviews career plans, interview readiness, and realistic hiring paths.",
  },
];

const DEFAULT_STATE = {
  currentUser: null,
  users: [],
  onboarded: false,
  role: "mentee",
  preferences: {
    goal: "",
    domain: "Robotics career",
    stage: "College student",
    location: "India/IIT",
    language: "English",
    meeting: "video",
    budget: "community hours",
    safety: "public-first",
    saved: false,
  },
  lastProblem: null,
  matches: [],
  bookings: [],
  reports: [
    {
      id: "r-demo-1",
      userId: "daniel-kim",
      category: "Guaranteed outcome claim",
      risk: "medium",
      description: "Demo report showing how admin review works.",
      status: "open",
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
  ],
  blockedUsers: [],
  auditLog: [],
};

const state = loadState();

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function loadState() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? { ...DEFAULT_STATE, ...JSON.parse(stored) } : structuredClone(DEFAULT_STATE);
  } catch {
    return structuredClone(DEFAULT_STATE);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function structuredClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function init() {
  bindAuthEvents();
  hydrateSelects();
  bindEvents();
  renderAuthGate();
  if (state.currentUser) {
    showApp();
    route();
    renderAll();
    populatePreferences();
    if (!$("#problem-statement").value) {
      $("#problem-statement").value = SAMPLE_PROBLEM;
      applyPreferencesToDiscovery(false);
      $("#profile-notes").value = "GitHub portfolio and resume notes are private by default.";
    }
  }
}

function bindAuthEvents() {
  $$(".auth-tab").forEach((tab) => {
    tab.addEventListener("click", () => switchAuthTab(tab.dataset.authTab));
  });
  $("#signup-form").addEventListener("submit", signup);
  $("#signup-next").addEventListener("click", () => goToSignupStep(2));
  $("#signup-back").addEventListener("click", () => goToSignupStep(1));
  $("#login-form").addEventListener("submit", login);
  $("#logout-button").addEventListener("click", logout);
  $$(".toggle-visibility").forEach((button) => {
    button.addEventListener("click", () => toggleVisibility(button.dataset.target, button));
  });
  $("#signup-name").addEventListener("input", () => clearField("signup-name"));
  $("#signup-email").addEventListener("input", () => clearField("signup-email"));
  $("#signup-passcode").addEventListener("input", (event) => {
    clearField("signup-passcode");
    updatePasscodeStrength(event.target.value);
  });
  $("#signup-passcode-confirm").addEventListener("input", () =>
    clearField("signup-passcode-confirm"),
  );
  $("#login-email").addEventListener("input", () => $("#login-error").textContent = "");
  $("#login-passcode").addEventListener("input", () => $("#login-error").textContent = "");
}

function toggleVisibility(inputId, button) {
  const input = $(`#${inputId}`);
  const show = input.type === "password";
  input.type = show ? "text" : "password";
  button.textContent = show ? "Hide" : "Show";
  button.setAttribute("aria-label", show ? `Hide ${button.dataset.target}` : `Show ${button.dataset.target}`);
}

function goToSignupStep(step) {
  if (step === 2 && !validateSignupStep1()) return;
  const form = $("#signup-form");
  form.querySelectorAll(".step").forEach((section) => {
    const active = Number(section.dataset.step) === step;
    section.classList.toggle("active", active);
    section.disabled = !active;
  });
  form.querySelectorAll(".step-dot").forEach((dot) => {
    dot.classList.toggle("active", Number(dot.dataset.step) === step);
  });
  if (step === 2) $("#signup-role").focus();
}

function validateSignupStep1() {
  let valid = true;
  const name = $("#signup-name").value.trim();
  const email = $("#signup-email").value.trim().toLowerCase();
  if (name.length < 2) {
    setFieldError("signup-name", "Enter your full name.");
    valid = false;
  }
  if (!isValidEmail(email)) {
    setFieldError("signup-email", "Enter a valid email address.");
    valid = false;
  } else if (state.users.some((user) => user.email === email)) {
    setFieldError("signup-email", "An account with this email exists. Sign in instead.");
    valid = false;
  }
  return valid;
}

function validateSignupStep2() {
  let valid = true;
  const passcode = $("#signup-passcode").value;
  const confirm = $("#signup-passcode-confirm").value;
  if (passcode.length < 6) {
    setFieldError("signup-passcode", "Passcode must be at least 6 characters.");
    valid = false;
  }
  if (confirm !== passcode || confirm.length === 0) {
    setFieldError("signup-passcode-confirm", "Passcodes do not match.");
    valid = false;
  }
  return valid;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function setFieldError(inputId, message) {
  $(`#${inputId}`).closest(".field").classList.add("invalid");
  $(`[data-error-for="${inputId}"]`).textContent = message;
}

function clearField(inputId) {
  const field = $(`#${inputId}`).closest(".field");
  if (!field.classList.contains("invalid")) return;
  field.classList.remove("invalid");
  $(`[data-error-for="${inputId}"]`).textContent = "";
}

function updatePasscodeStrength(passcode) {
  let score = 0;
  if (passcode.length >= 6) score++;
  if (passcode.length >= 10) score++;
  if (/[A-Z]/.test(passcode) && /[a-z]/.test(passcode)) score++;
  if (/\d/.test(passcode) && /[^A-Za-z0-9]/.test(passcode)) score++;
  $(".passcode-strength").value = score;
}

function switchAuthTab(tabName) {
  $$(".auth-tab").forEach((tab) => {
    const active = tab.dataset.authTab === tabName;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-selected", active ? "true" : "false");
  });
  $("#signup-form").classList.toggle("hidden", tabName !== "signup");
  $("#login-form").classList.toggle("hidden", tabName !== "login");
  $("#login-error").textContent = "";
  if (tabName === "signup") {
    resetSignupForm();
  }
}

function signup(event) {
  event.preventDefault();
  if (!validateSignupStep1() || !validateSignupStep2()) return;

  const name = $("#signup-name").value.trim();
  const email = $("#signup-email").value.trim().toLowerCase();
  const role = $("#signup-role").value;
  const passcode = $("#signup-passcode").value;

  if (state.users.some((user) => user.email === email)) {
    setFieldError("signup-email", "An account with this email exists. Sign in instead.");
    switchAuthTab("login");
    $("#login-email").value = email;
    return;
  }

  const user = {
    id: `u-${Date.now()}`,
    name,
    email,
    role,
    passcode,
    createdAt: new Date().toISOString(),
  };
  state.users.push(user);
  state.currentUser = { id: user.id, name: user.name, email: user.email, role: user.role };
  state.role = role;
  state.onboarded = false;
  saveState();
  toast(`Welcome, ${user.name.split(" ")[0]}. Let's set up your profile.`);
  showApp();
  location.hash = "onboarding";
  route();
  renderAll();
  populatePreferences();
  resetSignupForm();
}

function resetSignupForm() {
  $("#signup-form").reset();
  $("#signup-form").querySelectorAll(".field.invalid").forEach((field) =>
    field.classList.remove("invalid"),
  );
  $(".passcode-strength").value = 0;
  goToSignupStep(1);
}

function login(event) {
  event.preventDefault();
  const email = $("#login-email").value.trim().toLowerCase();
  const passcode = $("#login-passcode").value;
  $("#login-error").textContent = "";

  if (!isValidEmail(email)) {
    $("#login-error").textContent = "Enter a valid email address.";
    return;
  }
  if (passcode.length === 0) {
    $("#login-error").textContent = "Enter your passcode.";
    return;
  }

  const user = state.users.find((u) => u.email === email);
  if (!user) {
    $("#login-error").textContent = "No account found for this email. Create an account instead.";
    return;
  }
  if (user.passcode !== passcode) {
    $("#login-error").textContent = "Passcode does not match. Try again or reset your demo.";
    return;
  }

  state.currentUser = { id: user.id, name: user.name, email: user.email, role: user.role };
  state.role = user.role;
  saveState();
  toast(`Welcome back, ${user.name.split(" ")[0]}.`);
  showApp();
  renderAll();
  populatePreferences();
  if (!state.onboarded) {
    location.hash = "onboarding";
  } else {
    location.hash = defaultRouteForRole(state.role);
  }
  route();
  $("#login-form").reset();
}

function logout() {
  state.currentUser = null;
  saveState();
  hideApp();
  renderAuthGate();
  toast("Signed out.");
}

function renderAuthGate() {
  const hasUsers = state.users.length > 0;
  if (hasUsers) {
    switchAuthTab("login");
  } else {
    switchAuthTab("signup");
  }
}

function showApp() {
  $("#auth-gate").hidden = true;
  $("#app-shell").hidden = false;
}

function hideApp() {
  $("#auth-gate").hidden = false;
  $("#app-shell").hidden = true;
}

function renderUserChip() {
  if (!state.currentUser) return;
  const initials = state.currentUser.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  $("#user-chip").textContent = `${initials} · ${state.currentUser.email}`;
}

function hydrateSelects() {
  fillSelect($("#domain"), TAXONOMY.domains);
  fillSelect($("#stage"), TAXONOMY.stages);
  fillSelect($("#location"), TAXONOMY.locations);
  fillSelect($("#language"), TAXONOMY.languages);
  fillSelect($("#meeting"), TAXONOMY.meetings);
  fillSelect($("#budget"), TAXONOMY.budgets);
  fillSelect($("#pref-domain"), TAXONOMY.domains);
  fillSelect($("#pref-stage"), TAXONOMY.stages);
  fillSelect($("#pref-location"), TAXONOMY.locations);
  fillSelect($("#pref-language"), TAXONOMY.languages);
  fillSelect($("#pref-meeting"), TAXONOMY.meetings.filter((item) => item !== "No preference"));
  fillSelect($("#pref-budget"), TAXONOMY.budgets.filter((item) => item !== "No preference"));
  fillSelect($("#mentor-filter"), ["All domains", ...TAXONOMY.domains]);
  fillSelect($("#report-user"), MENTORS.map((mentor) => mentor.name), MENTORS.map((mentor) => mentor.id));
  fillSelect($("#report-category"), TAXONOMY.reportCategories);
}

function fillSelect(element, labels, values = labels) {
  element.innerHTML = labels
    .map((label, index) => `<option value="${escapeHtml(values[index])}">${escapeHtml(label)}</option>`)
    .join("");
}

function bindEvents() {
  window.addEventListener("hashchange", route);
  $$(".role-switch button").forEach((button) => {
    button.addEventListener("click", () => setRole(button.dataset.role));
  });
  $("#onboarding-form").addEventListener("submit", savePreferences);
  $("#apply-preferences").addEventListener("click", () => {
    applyPreferencesToDiscovery(true);
    location.hash = "discover";
  });
  $("#problem-form").addEventListener("submit", submitProblem);
  $("#use-sample").addEventListener("click", useSample);
  $("#mentor-filter").addEventListener("change", renderMentors);
  $("#report-form").addEventListener("submit", submitReport);
  $("#reset-demo").addEventListener("click", resetDemo);
}

function route() {
  const current = location.hash.replace("#", "") || "discover";
  if (!routeAllowedForRole(current, state.role)) {
    location.hash = defaultRouteForRole(state.role);
    return;
  }
  $$(".route").forEach((routeElement) => routeElement.classList.remove("active"));
  $(`#route-${current}`)?.classList.add("active");
  $$(".nav-list a").forEach((link) => {
    link.classList.toggle("active", link.dataset.route === current);
  });

  const titleByRoute = {
    onboarding: "Set up your profile before matching",
    discover: "Find the right mentor for your problem",
    mentors: "Explore mentor profiles",
    "mentor-studio": "Your mentor dashboard",
    "mentor-requests": "Review incoming requests",
    bookings: "Your bookings",
    safety: "Safety center",
    admin: "Moderation panel",
  };
  const subtitleByRoute = {
    onboarding: "Capture stage, location, language, meeting comfort, budget, and safety preferences once.",
    discover: "Describe the problem and get ranked, explainable mentor recommendations.",
    mentors: "Browse a curated directory with trust, availability, language, and service ownership visible.",
    "mentor-studio": "Set up your profile, services, availability, payment links, meeting links, and trust signals.",
    "mentor-requests": "Accept, reject, clarify, or report requests with the full problem context visible.",
    bookings: "Move session requests through explicit states without payment custody.",
    safety: "Keep sensitive documents private and high-risk advice clearly flagged.",
    admin: "Review risk signals, resolve reports, suspend unsafe users, and track every action.",
  };
  $("#page-title").textContent = titleByRoute[current] || titleByRoute.discover;
  $("#page-subtitle").textContent = subtitleByRoute[current] || subtitleByRoute.discover;
}

function setRole(role) {
  state.role = role;
  saveState();
  renderRole();
  if (!routeAllowedForRole(location.hash.replace("#", "") || "discover", role)) {
    location.hash = defaultRouteForRole(role);
  } else {
    route();
  }
  toast(`${roleLabel(role)} view`);
}

function renderRole() {
  $$(".role-switch button").forEach((button) => {
    button.classList.toggle("active", button.dataset.role === state.role);
  });
  const labels = $$(".nav-group-label");
  const links = $$(".nav-list a");
  links.forEach((link) => {
    const roles = link.dataset.roles.split(" ");
    link.hidden = !roles.includes(state.role);
  });
  labels.forEach((label) => {
    let node = label.nextElementSibling;
    let anyVisible = false;
    while (node && !node.classList.contains("nav-group-label")) {
      if (node.tagName === "A" && !node.hidden) anyVisible = true;
      node = node.nextElementSibling;
    }
    label.hidden = !anyVisible;
  });
  $("#role-chip").textContent = `${roleLabel(state.role)} view`;
}

function routeAllowedForRole(routeName, role) {
  const link = $(`.nav-list a[data-route="${routeName}"]`);
  if (!link) return false;
  return link.dataset.roles.split(" ").includes(role);
}

function defaultRouteForRole(role) {
  return {
    mentee: "discover",
    mentor: "mentor-studio",
    admin: "admin",
  }[role];
}

function roleLabel(role) {
  return role.charAt(0).toUpperCase() + role.slice(1);
}

function populatePreferences() {
  const preferences = state.preferences;
  $("#pref-goal").value = preferences.goal;
  $("#pref-domain").value = preferences.domain;
  $("#pref-stage").value = preferences.stage;
  $("#pref-location").value = preferences.location;
  $("#pref-language").value = preferences.language;
  $("#pref-meeting").value = preferences.meeting;
  $("#pref-budget").value = preferences.budget;
  $("#pref-safety").value = preferences.safety;
  renderPreferences();
}

function savePreferences(event) {
  event.preventDefault();
  state.preferences = {
    goal: $("#pref-goal").value.trim(),
    domain: $("#pref-domain").value,
    stage: $("#pref-stage").value,
    location: $("#pref-location").value,
    language: $("#pref-language").value,
    meeting: $("#pref-meeting").value,
    budget: $("#pref-budget").value,
    safety: $("#pref-safety").value,
    saved: true,
  };
  state.onboarded = true;
  saveState();
  renderPreferences();
  applyPreferencesToDiscovery(false);
  toast("Preferences saved. Matching is ready.");
  location.hash = defaultRouteForRole(state.role);
  route();
}

function applyPreferencesToDiscovery(showToast) {
  const preferences = state.preferences;
  $("#domain").value = preferences.domain;
  $("#stage").value = preferences.stage;
  $("#location").value = preferences.location;
  $("#language").value = preferences.language;
  $("#meeting").value = preferences.meeting;
  $("#budget").value = preferences.budget;
  if (preferences.goal && !$("#problem-statement").value.trim()) {
    $("#problem-statement").value = preferences.goal;
  }
  if (showToast) toast("Preferences applied to discovery.");
}

function renderPreferences() {
  const preferences = state.preferences;
  const filled = ["goal", "domain", "stage", "location", "language", "meeting", "budget", "safety"].filter(
    (key) => preferences[key],
  ).length;
  $("#preference-completion").textContent = `${Math.round((filled / 8) * 100)}%`;
  $("#onboarding-status").textContent = preferences.saved ? "Saved" : "Not saved";
  $("#onboarding-status").classList.toggle("muted", !preferences.saved);
  $("#preview-goal").textContent = preferences.goal || "No goal captured yet";
  $("#preference-tags").innerHTML = [
    preferences.domain,
    preferences.stage,
    preferences.location,
    preferences.language,
    preferences.meeting,
    preferences.budget,
    safetyLabel(preferences.safety),
  ]
    .filter(Boolean)
    .map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`)
    .join("");
}

function submitProblem(event) {
  event.preventDefault();
  const problem = readProblemForm();
  state.lastProblem = problem;
  state.matches = rankMentors(problem);
  saveState();
  renderMatches();
  toast("Mentors ranked with deterministic matching.");
}

function readProblemForm() {
  return {
    statement: $("#problem-statement").value.trim(),
    domain: $("#domain").value,
    stage: $("#stage").value,
    location: $("#location").value,
    language: $("#language").value,
    meeting: $("#meeting").value,
    budget: $("#budget").value,
    profileNotes: $("#profile-notes").value.trim(),
  };
}

function useSample() {
  $("#problem-statement").value = SAMPLE_PROBLEM;
  $("#domain").value = "Robotics career";
  $("#stage").value = "College student";
  $("#location").value = "India/IIT";
  $("#language").value = "English";
  $("#meeting").value = "video";
  $("#budget").value = "community hours";
  $("#profile-notes").value = "GitHub portfolio and resume notes are private by default.";
}

function rankMentors(problem) {
  return MENTORS.filter((mentor) => !state.blockedUsers.includes(mentor.id))
    .map((mentor) => scoreMentor(problem, mentor))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}

function scoreMentor(problem, mentor) {
  const text = `${problem.statement} ${problem.profileNotes}`.toLowerCase();
  const keywordHits = mentor.tags.filter((tag) => text.includes(tag.toLowerCase()));
  const dimensions = {
    problemExpertise: mentor.domains.includes(problem.domain) ? 1 : keywordHits.length > 0 ? 0.6 : 0.15,
    livedExperience:
      mentor.tags.some((tag) => text.includes(tag.toLowerCase())) ? 1 : 0.35,
    careerStage: mentor.stages.includes(problem.stage) ? 1 : 0.35,
    location: problem.location === "No preference" || mentor.locations.includes(problem.location) ? 1 : 0.25,
    language: problem.language === "No preference" || mentor.languages.includes(problem.language) ? 1 : 0.2,
    availability: mentor.responseRate / 100,
    meeting: problem.meeting === "No preference" || mentor.meetings.includes(problem.meeting) ? 1 : 0.25,
    trust: mentor.trustScore / 100,
    review: mentor.reviewQuality / 100,
    price: problem.budget === "No preference" || mentor.pricing === problem.budget ? 1 : budgetNearFit(problem.budget, mentor.pricing),
  };

  const score =
    dimensions.problemExpertise * 25 +
    dimensions.livedExperience * 15 +
    dimensions.careerStage * 12 +
    dimensions.location * 10 +
    dimensions.language * 8 +
    dimensions.availability * 8 +
    dimensions.meeting * 7 +
    dimensions.trust * 7 +
    dimensions.review * 5 +
    dimensions.price * 3;

  return {
    mentor,
    score: Math.round(score),
    dimensions,
    reasons: buildReasons(problem, mentor, keywordHits, dimensions),
  };
}

function budgetNearFit(requested, mentorPricing) {
  if (requested === "free" && ["community hours", "donation"].includes(mentorPricing)) return 0.75;
  if (requested === "community hours" && ["free", "donation"].includes(mentorPricing)) return 0.7;
  if (requested === "paid" && ["donation", "community hours"].includes(mentorPricing)) return 0.5;
  return 0.25;
}

function buildReasons(problem, mentor, keywordHits, dimensions) {
  const reasons = [];
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
  if (mentor.trustScore >= 88) reasons.push("High trust score with verified public signals.");
  if (reasons.length < 3) reasons.push("Available for low-friction manual scheduling.");
  return reasons.slice(0, 5);
}

function renderAll() {
  renderUserChip();
  renderRole();
  renderPreferences();
  renderMatches();
  renderMentors();
  renderMentorStudio();
  renderMentorRequests();
  renderBookings();
  renderReports();
  renderAudit();
  renderAdminMetrics();
}

function renderMatches() {
  const container = $("#match-results");
  $("#match-count").textContent = `${state.matches.length} matches`;
  if (!state.matches.length) {
    container.className = "match-list empty-state";
    container.innerHTML = "<p>Submit a problem to rank mentors by expertise, lived context, trust, availability, language, location, meeting type, and budget fit.</p>";
    return;
  }

  container.className = "match-list";
  container.innerHTML = state.matches.map(renderMatchCard).join("");
  container.querySelectorAll("[data-book]").forEach((button) => {
    button.addEventListener("click", () => createBooking(button.dataset.book));
  });
  container.querySelectorAll("[data-block]").forEach((button) => {
    button.addEventListener("click", () => blockUser(button.dataset.block));
  });
}

function renderMatchCard(match) {
  const { mentor } = match;
  return `
    <article class="match-card">
      <div class="match-header">
        <div class="identity">
          <span class="avatar">${mentor.initials}</span>
          <span>
            <strong>${escapeHtml(mentor.name)}</strong>
            <span>${escapeHtml(mentor.headline)}</span>
          </span>
        </div>
        <div class="score">${match.score}<span>score</span></div>
      </div>
      <ul class="reason-list">
        ${match.reasons.map((reason) => `<li>${escapeHtml(reason)}</li>`).join("")}
      </ul>
      <div class="tag-row">
        ${mentor.domains.slice(0, 3).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
        <span class="tag muted">${escapeHtml(mentor.pricing)}</span>
        <span class="tag muted">${escapeHtml(mentor.availability)}</span>
      </div>
      <div class="availability">
        <span><strong>Payment:</strong> ${escapeHtml(mentor.payment)}</span>
        <span><strong>Meeting:</strong> ${escapeHtml(mentor.meeting)}</span>
      </div>
      <div class="card-actions">
        <button class="button primary small" data-book="${mentor.id}">Request session</button>
        <button class="button danger small" data-block="${mentor.id}">Block</button>
      </div>
    </article>
  `;
}

function renderMentors() {
  const filter = $("#mentor-filter").value;
  const mentors = filter === "All domains" ? MENTORS : MENTORS.filter((mentor) => mentor.domains.includes(filter));
  renderMentorStats(mentors);
  $("#mentor-grid").innerHTML = mentors.map(renderMentorCard).join("");
}

function renderMentorCard(mentor) {
  const blocked = state.blockedUsers.includes(mentor.id);
  return `
    <article class="mentor-card">
      <div class="mentor-header">
        <div class="identity">
          <span class="avatar">${mentor.initials}</span>
          <span>
            <strong>${escapeHtml(mentor.name)}</strong>
            <span>${escapeHtml(mentor.headline)}</span>
          </span>
        </div>
        <span class="status-pill ${blocked ? "danger" : ""}">${blocked ? "Blocked" : `${mentor.trustScore} trust`}</span>
      </div>
      <p>${escapeHtml(mentor.bio)}</p>
      <div class="mentor-score-row">
        <span class="mini-stat"><strong>${mentor.trustScore}</strong><span>Trust</span></span>
        <span class="mini-stat"><strong>${mentor.responseRate}%</strong><span>Response</span></span>
        <span class="mini-stat"><strong>${mentor.reviewQuality}</strong><span>Review</span></span>
      </div>
      <div class="tag-row">
        ${mentor.domains.slice(0, 2).map((item) => `<span class="tag warning">${escapeHtml(item)}</span>`).join("")}
        ${mentor.verified.map((item) => `<span class="tag">${escapeHtml(item)}</span>`).join("")}
      </div>
      <div class="availability">
        <span><strong>Languages:</strong> ${mentor.languages.join(", ")}</span>
        <span><strong>Meeting:</strong> ${mentor.meetings.join(", ")}</span>
        <span><strong>Pricing:</strong> ${mentor.pricing}</span>
        <span><strong>Availability:</strong> ${escapeHtml(mentor.availability)}</span>
      </div>
    </article>
  `;
}

function renderMentorStats(mentors) {
  const freeOrCommunity = mentors.filter((mentor) => ["free", "community hours", "donation"].includes(mentor.pricing)).length;
  const averageTrust = mentors.length
    ? Math.round(mentors.reduce((total, mentor) => total + mentor.trustScore, 0) / mentors.length)
    : 0;
  const languageCount = new Set(mentors.flatMap((mentor) => mentor.languages)).size;
  $("#mentor-stats").innerHTML = [
    metricCard(mentors.length, "available mentors"),
    metricCard(averageTrust, "avg trust score"),
    metricCard(languageCount, "languages"),
    metricCard(freeOrCommunity, "low-cost options"),
  ].join("");
}

function renderMentorStudio() {
  $("#mentor-studio-metrics").innerHTML = [
    metricCard("86%", "profile readiness"),
    metricCard("3", "service links"),
    metricCard("4", "problem areas"),
    metricCard("Manual", "availability"),
  ].join("");

  const setup = [
    {
      title: "Expertise and problem fit",
      detail: "Robotics career, AI/ML career, graduate school, India/IIT context.",
      status: "Complete",
    },
    {
      title: "Meeting boundaries",
      detail: "Video and public in-person meetings. Exact location only after confirmation.",
      status: "Public safe",
    },
    {
      title: "Payment instructions",
      detail: "Free community hours first, then mentor-owned payment link.",
      status: "No custody",
    },
    {
      title: "Trust signals",
      detail: "Verified email, GitHub, portfolio, response rate, and review quality.",
      status: "Visible",
    },
  ];

  $("#mentor-setup-list").innerHTML = setup
    .map(
      (item) => `
        <article class="setup-item">
          <div>
            <strong>${escapeHtml(item.title)}</strong>
            <p>${escapeHtml(item.detail)}</p>
          </div>
          <span class="tag">${escapeHtml(item.status)}</span>
        </article>
      `,
    )
    .join("");
}

function renderMentorRequests() {
  const container = $("#mentor-request-list");
  const requests = state.bookings.length
    ? state.bookings
    : [
        {
          id: "demo-request",
          mentorId: "mira-patel",
          problemSummary:
            "College student in India needs a robotics path review, project direction, and graduate school context.",
          state: "requested",
          payment: "Free community hours first",
          meetingInstructions: "Google Meet or public university space",
          isDemo: true,
        },
      ];
  const openCount = requests.filter((booking) => !["completed", "cancelled", "rejected"].includes(booking.state)).length;
  $("#mentor-request-count").textContent = `${openCount} open`;
  container.className = "booking-list";
  container.innerHTML = requests.map(renderBookingCard).join("");
  container.querySelectorAll("[data-transition]").forEach((button) => {
    button.addEventListener("click", () => transitionBooking(button.dataset.booking, button.dataset.transition));
  });
}

function createBooking(mentorId) {
  if (!state.lastProblem) {
    toast("Submit a problem before booking.");
    return;
  }
  const mentor = MENTORS.find((item) => item.id === mentorId);
  const booking = {
    id: `b-${Date.now()}`,
    mentorId,
    problemSummary: state.lastProblem.statement.slice(0, 150),
    payment: mentor.payment,
    meetingInstructions: mentor.meeting,
    state: "requested",
    createdAt: new Date().toISOString(),
  };
  state.bookings.unshift(booking);
  writeAudit(`Booking created with ${mentor.name}`);
  saveState();
  renderBookings();
  location.hash = "bookings";
  toast("Booking request created.");
}

function renderBookings() {
  $("#booking-count").textContent = `${state.bookings.filter((booking) => !["completed", "cancelled", "rejected"].includes(booking.state)).length} active`;
  const container = $("#booking-list");
  if (!state.bookings.length) {
    container.className = "booking-list empty-state";
    container.innerHTML = "<p>No booking requests yet. Request a session from a match to exercise the state machine.</p>";
    return;
  }
  container.className = "booking-list";
  container.innerHTML = state.bookings.map(renderBookingCard).join("");
  container.querySelectorAll("[data-transition]").forEach((button) => {
    button.addEventListener("click", () => transitionBooking(button.dataset.booking, button.dataset.transition));
  });
}

function renderBookingCard(booking) {
  const mentor = MENTORS.find((item) => item.id === booking.mentorId);
  const nextActions = booking.isDemo ? [] : allowedTransitions(booking.state);
  return `
    <article class="booking-card">
      <div class="booking-header">
        <div class="identity">
          <span class="avatar">${mentor.initials}</span>
          <span>
            <strong>${escapeHtml(mentor.name)}</strong>
            <span>${escapeHtml(booking.problemSummary)}${booking.problemSummary.length >= 150 ? "..." : ""}</span>
          </span>
        </div>
        <span class="status-pill">${formatState(booking.state)}</span>
      </div>
      <div class="booking-state">
        ${BOOKING_STATES.map((stateName) => `<span class="state-step ${stateName === booking.state ? "current" : ""}">${formatState(stateName)}</span>`).join("")}
      </div>
      <div class="availability">
        <span><strong>Payment:</strong> ${escapeHtml(booking.payment)}</span>
        <span><strong>Meeting:</strong> ${escapeHtml(booking.meetingInstructions)}</span>
      </div>
      ${nextActions.length ? `<div class="state-actions">
        ${nextActions.map((action) => `<button class="button secondary small" data-booking="${booking.id}" data-transition="${action}">${formatState(action)}</button>`).join("")}
      </div>` : ""}
    </article>
  `;
}

function allowedTransitions(current) {
  const transitions = {
    requested: ["clarification_requested", "accepted", "rejected", "cancelled"],
    clarification_requested: ["accepted", "rejected", "cancelled"],
    accepted: ["payment_pending", "confirmed", "cancelled"],
    payment_pending: ["confirmed", "cancelled"],
    confirmed: ["completed", "cancelled"],
    completed: [],
    cancelled: [],
    rejected: [],
  };
  return transitions[current] || [];
}

function transitionBooking(id, nextState) {
  const booking = state.bookings.find((item) => item.id === id);
  if (!booking) return;
  if (!allowedTransitions(booking.state).includes(nextState)) return;
  booking.state = nextState;
  writeAudit(`Booking ${id} moved to ${formatState(nextState)}`);
  saveState();
  renderBookings();
  renderMentorRequests();
  renderAudit();
}

function submitReport(event) {
  event.preventDefault();
  const report = {
    id: `r-${Date.now()}`,
    userId: $("#report-user").value,
    category: $("#report-category").value,
    risk: $("#report-risk").value,
    description: $("#report-description").value.trim(),
    status: "open",
    createdAt: new Date().toISOString(),
  };
  state.reports.unshift(report);
  writeAudit(`Report filed for ${mentorName(report.userId)}`);
  saveState();
  $("#report-form").reset();
  renderReports();
  renderAudit();
  toast("Report sent to admin review.");
}

function renderReports() {
  const openReports = state.reports.filter((report) => report.status === "open");
  $("#report-count").textContent = `${openReports.length} open`;
  renderAdminMetrics();
  const container = $("#report-list");
  if (!state.reports.length) {
    container.className = "report-list empty-state";
    container.innerHTML = "<p>No reports.</p>";
    return;
  }
  container.className = "report-list";
  container.innerHTML = state.reports.map(renderReportItem).join("");
  container.querySelectorAll("[data-report-action]").forEach((button) => {
    button.addEventListener("click", () => moderateReport(button.dataset.report, button.dataset.reportAction));
  });
}

function renderReportItem(report) {
  return `
    <article class="report-item ${report.risk === "high" ? "high-risk" : ""}">
      <div class="report-header">
        <div>
          <strong>${escapeHtml(mentorName(report.userId))}</strong>
          <p>${escapeHtml(report.category)}. ${escapeHtml(report.description)}</p>
        </div>
        <span class="tag ${report.risk === "high" ? "danger" : report.risk === "medium" ? "warning" : "muted"}">${escapeHtml(report.risk)}</span>
      </div>
      <div class="tag-row">
        <span class="tag muted">${formatState(report.status)}</span>
        <span class="tag muted">${new Date(report.createdAt).toLocaleString()}</span>
      </div>
      <div class="card-actions">
        <button class="button secondary small" data-report="${report.id}" data-report-action="resolved">Resolve</button>
        <button class="button danger small" data-report="${report.id}" data-report-action="suspended">Suspend user</button>
      </div>
    </article>
  `;
}

function moderateReport(id, action) {
  const report = state.reports.find((item) => item.id === id);
  if (!report) return;
  report.status = action;
  if (action === "suspended" && !state.blockedUsers.includes(report.userId)) {
    state.blockedUsers.push(report.userId);
  }
  writeAudit(`Report ${id} marked ${formatState(action)} for ${mentorName(report.userId)}`);
  saveState();
  renderAll();
}

function blockUser(mentorId) {
  if (!state.blockedUsers.includes(mentorId)) {
    state.blockedUsers.push(mentorId);
    writeAudit(`${mentorName(mentorId)} blocked by mentee`);
  }
  saveState();
  renderAll();
  toast(`${mentorName(mentorId)} blocked.`);
}

function renderAudit() {
  const container = $("#audit-list");
  if (!state.auditLog.length) {
    container.className = "audit-list empty-state";
    container.innerHTML = "<p>No admin or safety actions recorded yet.</p>";
    return;
  }
  container.className = "audit-list";
  container.innerHTML = state.auditLog
    .slice(0, 12)
    .map(
      (item) => `
        <article class="audit-item">
          <strong>${escapeHtml(item.message)}</strong>
          <p>${new Date(item.createdAt).toLocaleString()}</p>
        </article>
      `,
    )
    .join("");
}

function renderAdminMetrics() {
  const openReports = state.reports.filter((report) => report.status === "open").length;
  const highRisk = state.reports.filter((report) => report.risk === "high" && report.status === "open").length;
  const suspended = state.reports.filter((report) => report.status === "suspended").length;
  const blocked = state.blockedUsers.length;
  $("#admin-metrics").innerHTML = [
    metricCard(openReports, "open reports"),
    metricCard(highRisk, "high risk"),
    metricCard(suspended, "suspended"),
    metricCard(blocked, "blocked users"),
  ].join("");
}

function metricCard(value, label) {
  return `<article class="metric-card"><strong>${escapeHtml(value)}</strong><span>${escapeHtml(label)}</span></article>`;
}

function writeAudit(message) {
  state.auditLog.unshift({ message, createdAt: new Date().toISOString() });
}

function resetDemo() {
  localStorage.removeItem(STORAGE_KEY);
  Object.assign(state, structuredClone(DEFAULT_STATE));
  hideApp();
  renderAuthGate();
  toast("Demo state reset.");
}

function mentorName(id) {
  return MENTORS.find((mentor) => mentor.id === id)?.name || "Unknown user";
}

function formatState(value) {
  return value.replaceAll("_", " ");
}

function safetyLabel(value) {
  const labels = {
    "public-first": "Public or video first",
    "remote-only": "Remote only",
    "verified-only": "Verified mentors only",
  };
  return labels[value] || value;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function toast(message) {
  const element = $("#toast");
  element.textContent = message;
  element.classList.add("show");
  window.clearTimeout(toast.timer);
  toast.timer = window.setTimeout(() => element.classList.remove("show"), 2400);
}

init();
