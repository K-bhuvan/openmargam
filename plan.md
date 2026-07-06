# Human Tech Advisory Network — `plan.md`

> Working title: **OpenMargam**  
> Product type: open/source-available mentorship, advisory, and professional networking platform for business and technology domains.

---

## 1. Core Philosophy

This project is like **Linux for mentorship and professional guidance**.

The core software should be free for people to inspect, run, self-host, improve, and use to create mentorship networks. The platform itself should not take commissions, control mentor pricing, own the payment flow, or act as a middleman between mentor and mentee.

The app provides the common infrastructure:

- mentor discovery
- right-person/right-problem matching
- scheduling coordination
- profile trust signals
- scam prevention
- reviews and reputation
- mentor badges
- business and technology networking
- remote and in-person meeting support

The users bring and pay for their own external services:

- payment provider
- calendar provider
- video-call provider
- phone provider
- email/SMS provider if self-hosting
- hosting/database/storage if deploying their own instance
- optional AI API keys if they want paid AI-based matching

**Core principle:** free software layer, user-owned service layer.

---

## 2. Problem Statement

There is a large gap between people who need practical guidance and people who have hard-earned experience.

Generic search, AI chat, and online articles can answer common questions, but they cannot fully replace customized, real-life, context-aware advice from someone who has personally solved a similar problem.

Examples:

- A student wants to build a robotics career from school.
- A working engineer wants to transition into AI/robotics.
- A founder wants advice from someone who has built B2B SaaS before.
- Someone wants local guidance about IITs, U.S. graduate school, startup networks, or regional hiring norms.
- A professional wants to know whether a specific business or technology decision is realistic.

The core problem is not simply “book a mentor.”

The real problem is:

> Match the right person to the right problem at the right time, with enough trust, context, and low friction that the interaction actually happens.

---

## 3. Product Positioning

This is **not** a commission-based marketplace.

This is an open mentorship and advisory network where:

- mentors own their pricing
- mentors own their payment channels
- mentors own their meeting channels
- mentees choose based on fit, trust, relevance, and availability
- the platform focuses on matching, safety, scheduling, reputation, and professional networking

### Product category

```txt
Open mentorship network
+ intelligent advisory matching
+ scheduling workflow
+ professional reputation layer
+ anti-scam layer
+ business/technology networking graph
```

---

## 4. Non-Negotiable Principles

1. **No commission model**  
   The platform does not take a percentage from mentor earnings.

2. **No platform-defined pricing**  
   The mentor decides whether a session is free, paid, donation-based, barter-based, community-hours-based, or custom.

3. **No platform-owned payment custody**  
   Money should move directly from mentee to mentor through the mentor’s chosen payment method.

4. **Bring your own services**  
   The app should not require one centralized paid API to function.

5. **Low friction**  
   It should be easy to create a profile, describe a problem, find a mentor, request a session, and meet.

6. **Right match is the core feature**  
   Booking is secondary. Matching quality is the heart of the product.

7. **Remote and in-person are equally important**  
   The product should support phone, video, chat, and safe in-person meetings.

8. **Zero tolerance for scams**  
   The system must include trust signals, reporting, review analysis, moderation workflows, and abuse prevention from day one.

9. **Context matters**  
   Language, location, domain, career stage, lived experience, recency of experience, and cultural/regional knowledge should influence matching.

10. **The app is not liable for outcomes**  
    The app helps people connect. It does not guarantee career, business, financial, legal, immigration, medical, or educational outcomes.

---

## 5. Business / Operating Model

### 5.1 Software Model

The software is free to use at the code level.

Anyone should be able to:

- run it locally
- self-host it
- modify it
- inspect the code
- deploy a community instance
- contribute improvements

### 5.2 Service Cost Model

The platform itself does not absorb or hide third-party service costs.

Costs are paid by the relevant party:

| Cost | Who pays? |
|---|---|
| Mentor payment processor | Mentor |
| Mentee payment to mentor | Mentee |
| Zoom/Google Meet/phone account | Participant who chooses that medium |
| Calendar integration | Participant or deployer |
| Email provider | Deployer of that instance |
| Hosting/database/storage | Deployer of that instance |
| Optional paid AI API | User/deployer who enables it |
| SMS/phone masking | User/deployer who enables it |

### 5.3 Public Hosted Instance

If a public instance exists, someone still pays infrastructure costs:

- domain
- hosting
- database
- storage
- email
- monitoring
- moderation tooling
- abuse prevention

Funding options for a public instance:

- donations
- GitHub Sponsors
- grants
- nonprofit structure
- community funding
- optional managed hosting/support

Important: any managed hosting/support fee must be separate from mentorship payments. It should not become a hidden commission.

---

## 6. Licensing Strategy

The user goal is:

> People can inspect, use, self-host, and contribute to the project, but companies should not be able to clone, resell, or commercially replicate it freely.

This creates a legal distinction.

A license that blocks commercial use or SaaS replication is usually **not OSI-open-source**. It is better described as **source-available**.

### Recommended approach

Use a **source-available noncommercial license** for the main application.

Candidate options:

1. **PolyForm Noncommercial**  
   Good when the project should be available for noncommercial use but not commercial exploitation.

2. **Business Source License style**  
   Good if future delayed open-source conversion is desired.

3. **Commons Clause style restriction**  
   Good if you want to allow code visibility but restrict selling the software or hosted equivalent.

4. **Custom source-available license reviewed by a lawyer**  
   Best if the exact goal is “companies cannot replicate this work in any form or shape.”

### Alternative if true open source is required

Use **AGPL-3.0** if the goal is OSI-recognized open source with strong copyleft. However, AGPL does not fully prevent companies from using or competing with the project. It mainly requires source sharing when the software is modified and offered over a network.

### Recommended wording

Do not market it as “open source” if using commercial restrictions.

Use:

```txt
source-available community software
free for individual, educational, research, and noncommercial community use
commercial use, resale, hosted clones, and SaaS replication require explicit permission
```

---

## 7. Target Users

### 7.1 Mentees

Mentees are people seeking practical guidance.

Examples:

- students
- early-career professionals
- career switchers
- founders
- engineers
- product managers
- small business owners
- technical leaders
- people exploring business/technology paths

### 7.2 Mentors

Mentors are people with practical, verified, or experience-backed knowledge.

Examples:

- engineers
- founders
- operators
- product leaders
- researchers
- hiring managers
- domain experts
- startup advisors
- people who recently completed a specific path successfully

### 7.3 Community Maintainers

Maintainers are people who run or moderate an instance.

They manage:

- trust rules
- reports
- scam review
- badge validation
- local community policies
- abuse prevention
- instance-level configuration

---

## 8. Core User Stories

### Mentee stories

- As a mentee, I can describe my problem in natural language.
- As a mentee, I can upload a resume or paste my LinkedIn/GitHub/portfolio URL.
- As a mentee, I can specify my goal, domain, location, language, and preferred meeting medium.
- As a mentee, I can receive mentor recommendations based on actual fit, not just popularity.
- As a mentee, I can see why a mentor was recommended.
- As a mentee, I can request phone, video, chat, or in-person mentorship.
- As a mentee, I can report suspicious behavior.
- As a mentee, I can leave structured feedback after a session.

### Mentor stories

- As a mentor, I can create a profile with expertise, lived experience, links, availability, and preferred meeting methods.
- As a mentor, I can set my own price or offer free/community sessions.
- As a mentor, I can add my own payment link or payment instructions.
- As a mentor, I can add my own meeting link or calendar integration.
- As a mentor, I can define the types of problems I am best suited to help with.
- As a mentor, I can accept, reject, or request clarification before accepting a session.
- As a mentor, I can earn badges and share them publicly.
- As a mentor, I can grow my professional network.

### Maintainer stories

- As a maintainer, I can configure allowed payment methods.
- As a maintainer, I can configure allowed meeting mediums.
- As a maintainer, I can review scam reports.
- As a maintainer, I can suspend or ban bad actors.
- As a maintainer, I can define local trust and verification policies.
- As a maintainer, I can run the platform with no mandatory paid AI API.

---

## 9. MVP Scope

### MVP must include

1. User accounts
2. Mentor profiles
3. Mentee profiles
4. Problem intake form
5. Resume upload or profile link attachment
6. Structured mentor expertise taxonomy
7. Matching engine v1
8. Mentor recommendation explanation
9. Booking request flow
10. Mentor accept/reject flow
11. External payment link support
12. External meeting link support
13. Phone/video/in-person meeting type support
14. Review and rating system
15. Badge system v1
16. Report/block user flow
17. Admin moderation dashboard
18. Basic networking feed or directory
19. Deployment documentation
20. License and contribution guidelines

### MVP should not include

1. Platform-owned wallet
2. Platform commission
3. Escrow
4. Complex dispute arbitration
5. Mandatory LinkedIn API integration
6. Mandatory Zoom API integration
7. Mandatory SMS integration
8. Mandatory paid LLM integration
9. Full social media feed
10. Mobile app before web product validation

---

## 10. Product Architecture

```txt
Client Web App
    |
    v
API Layer
    |
    +--> Auth Service
    +--> Profile Service
    +--> Matching Service
    +--> Booking Service
    +--> Trust & Safety Service
    +--> Badge Service
    +--> Notification Service
    +--> Admin Moderation Service
    |
    v
Postgres Database
    |
    +--> Structured tables
    +--> pgvector embeddings, optional
    |
    v
External User-Owned Services
    +--> Mentor payment link
    +--> Mentor meeting link
    +--> Mentor calendar
    +--> User-provided AI API key, optional
```

---

## 11. Recommended Tech Stack

### Default stack

```txt
Frontend: Next.js + TypeScript
UI: Tailwind CSS + shadcn/ui
Backend: Next.js API routes or FastAPI
Database: PostgreSQL
Vector search: pgvector
Auth: Auth.js or Supabase Auth
File storage: S3-compatible storage, Supabase Storage, or local adapter
Email: Resend/SMTP adapter
Queue: BullMQ + Redis, or database-backed queue for MVP
Search: Postgres full-text search first
Deployment: Docker Compose for self-hosting
Production hosting: Fly.io, Render, Railway, Hetzner, AWS, GCP, or any Docker host
Observability: OpenTelemetry + basic logs first
```

### Important design rule

Every external dependency should be behind an adapter.

```txt
PaymentAdapter
CalendarAdapter
MeetingAdapter
EmailAdapter
StorageAdapter
EmbeddingAdapter
ModerationAdapter
```

This prevents vendor lock-in and allows every deployment to choose its own providers.

---

## 12. Bring-Your-Own-Service Model

### 12.1 BYOP — Bring Your Own Payment

Mentors can add payment methods such as:

- Stripe Payment Link
- PayPal link
- Razorpay link
- UPI ID
- Wise link
- bank transfer instructions
- cash/in-person payment
- free session
- donation link
- custom external payment URL

The platform stores only:

```txt
payment_method_type
payment_display_name
payment_url_or_instruction
payment_required_before_booking
mentor_refund_policy_text
```

The platform must not store:

- card numbers
- bank credentials
- payment processor secrets
- payout accounts
- transaction custody data

### 12.2 BYOC — Bring Your Own Calendar

MVP option:

- mentor manually defines availability blocks

Later option:

- mentor connects Google Calendar
- mentor connects Outlook Calendar
- mentor imports `.ics`

Calendar integration is optional, not required for MVP.

### 12.3 BYOM — Bring Your Own Meeting Medium

Supported meeting types:

- Google Meet link
- Zoom link
- Microsoft Teams link
- WhatsApp call
- phone call
- in-person meeting
- custom link
- “decide after booking”

The app should not require a global video API.

### 12.4 BYOAI — Bring Your Own AI Key

The platform should work without paid AI.

Optional advanced deployments can enable:

- OpenAI
- Anthropic
- Gemini
- local embeddings
- local LLM
- Hugging Face models

No AI provider should be hardcoded.

---

## 13. Matching Engine

The matching engine is the most important system.

### 13.1 Matching goal

Given a mentee problem, return mentors who are likely to provide useful, relevant, trustworthy, and context-aware advice.

The output should not only rank mentors. It should explain the match.

Example:

```txt
You are asking about building a robotics career from school.
This mentor is a strong match because:
- they studied robotics
- they recently transitioned into robotics work
- they have robotics projects on GitHub
- they understand early-career technical roadmaps
- they speak your preferred language
- they have India/IIT context
- they offer video and in-person sessions
```

### 13.2 Matching inputs

From mentee:

```txt
problem_statement
current_stage
target_outcome
domain
subdomain
location
language_preference
optional gender comfort preference
meeting_medium_preference
budget/free preference
urgency
resume_text
linkedin_url
github_url
portfolio_url
```

From mentor:

```txt
expertise_domains
specific_problem_tags
career_path
education_path
location_context
languages
optional gender identity, only if voluntarily disclosed
meeting_mediums
availability
price/free options
proof_links
verified_credentials
reviews
badges
trust_score
recency_of_relevant_experience
```

### 13.3 Matching dimensions

Use a weighted scoring model.

```txt
final_score =
  0.25 * problem_expertise_fit
+ 0.15 * lived_experience_fit
+ 0.12 * career_stage_fit
+ 0.10 * location_context_fit
+ 0.08 * language_fit
+ 0.08 * availability_fit
+ 0.07 * meeting_medium_fit
+ 0.07 * trust_score
+ 0.05 * review_quality
+ 0.03 * price_or_free_fit
```

Weights should be configurable by instance maintainers.

### 13.4 Matching v1

Use structured matching first.

Implementation:

- controlled taxonomy for domains/subdomains
- mentor skill tags
- problem category tags
- location/culture tags
- language tags
- availability filter
- meeting medium filter
- trust score filter
- keyword search
- simple scoring rules

No paid AI required.

### 13.5 Matching v2

Add semantic matching.

Implementation:

- generate embeddings for mentor profiles
- generate embeddings for problem statements
- store vectors in Postgres using pgvector
- combine vector similarity with structured filters
- explain matches using deterministic templates first

### 13.6 Matching v3

Add optional AI-assisted matching.

Only if the deployment enables an AI provider.

Possible uses:

- extract structured fields from resumes
- summarize mentor expertise
- classify mentee problems
- produce better match explanations
- detect vague, risky, or scam-like requests

Rule: the app must still work without this.

---

## 14. Cold Start Strategy

The matching system should be ready before network effects exist.

### Phase 1: Curated mentor onboarding

Start with manually curated mentor categories:

- AI/ML career
- robotics career
- startup/founder advice
- product management
- software engineering
- data engineering
- cloud/MLOps
- business strategy
- college/graduate school guidance
- India/IIT context
- U.S. tech career context

### Phase 2: Problem-first onboarding

Ask mentees:

```txt
What are you trying to achieve?
What have you already tried?
What is your current stage?
What kind of person would be most useful?
Do you need local/cultural context?
Do you prefer phone, video, chat, or in-person?
```

### Phase 3: Manual quality loop

For early users:

- track accepted recommendations
- track rejected recommendations
- ask “why was this not a good fit?”
- manually inspect poor matches
- improve taxonomy and weights

### Phase 4: Community graph

As usage grows:

- mentors can endorse other mentors
- mentees can follow mentors
- users can join topic communities
- successful sessions improve future matching
- reviews become more structured

---

## 15. Scheduling Flow

### 15.1 Default flow

```txt
1. Mentee describes problem.
2. System recommends mentors.
3. Mentee chooses mentor.
4. Mentee selects meeting type: phone, video, chat, in-person, custom.
5. Mentee requests session.
6. Mentor accepts, rejects, or asks for clarification.
7. If paid, mentee pays mentor directly using mentor-owned payment method.
8. Mentor confirms payment if required.
9. Meeting details are finalized.
10. Both parties receive confirmation.
11. Session happens.
12. Both parties review each other.
```

### 15.2 Low-friction rule

MVP must support manual links.

Do not block booking because a mentor has not connected Google Calendar, Zoom, Stripe, etc.

### 15.3 In-person meeting support

For in-person sessions:

- show public-place safety warning
- never expose exact home address by default
- allow broad location first, exact location after confirmation
- recommend cafes, libraries, coworking spaces, university buildings, or public venues
- allow both parties to cancel/report
- require explicit consent from both parties

---

## 16. Trust and Safety

### 16.1 Trust signals

Profiles should show:

- verified email
- verified GitHub account
- verified domain email, optional
- LinkedIn URL attached, manually or semi-automatically reviewed
- portfolio URL
- resume uploaded, optional/private
- completed sessions
- reviews
- response rate
- cancellation rate
- report history, internal only
- badges
- “new mentor” label
- “verified mentor” label

### 16.2 Anti-scam controls

MVP must include:

- report user
- block user
- suspend account
- admin moderation queue
- suspicious external link flag
- repeated complaint detection
- new account rate limits
- booking request limits
- review manipulation detection, basic
- visible safety guidelines
- no guaranteed outcome disclaimer

### 16.3 High-risk advice categories

The app should flag certain topics:

- legal advice
- medical advice
- immigration advice
- investment advice
- tax advice
- mental health crisis advice
- guaranteed job placement claims
- guaranteed admission claims
- guaranteed funding claims

Mentors can discuss general experience, but the UI must make clear when professional certification is needed.

### 16.4 Scam examples to detect

- “Pay me outside and I guarantee a job.”
- “I can get you admission if you pay now.”
- “Send documents to my personal account.”
- “I need your bank login.”
- “Invest in this opportunity.”
- “Crypto trading mentorship with guaranteed returns.”
- suspicious shortened links
- repeated off-platform pressure

---

## 17. Badge and Motivation System

Money is not the only motivator. Mentors should gain status, proof, visibility, and community reputation.

### 17.1 Badge examples

```txt
Verified Mentor
High Trust Mentor
Fast Responder
Community Helper
Free Community Hours Contributor
Top Robotics Mentor
AI Career Guide
Startup Operator
Career Switch Expert
India/IIT Context Expert
U.S. Tech Career Guide
Open Source Contributor
100 Sessions Helped
Strong Session Feedback
Problem-Solver Badge
```

### 17.2 Badge rules

Badges should be earned by specific, auditable events.

Examples:

```txt
Fast Responder = median response time below threshold
Community Helper = completed N free sessions
High Trust Mentor = low report rate + high review quality
Domain Mentor = verified expertise + positive domain-specific reviews
100 Sessions Helped = completed 100 confirmed sessions
```

### 17.3 Shareable badges

Each badge should have:

- public badge URL
- LinkedIn share card
- GitHub profile markdown
- personal website embed
- image export

Example GitHub badge:

```md
[![Verified Mentor](https://mentor-os.example.com/badges/user123/verified.svg)](https://mentor-os.example.com/u/user123)
```

---

## 18. Networking Features

The app should not only be a booking tool. It should also be a professional network for business and technology people.

### MVP networking features

- public mentor directory
- topic-based communities
- follow mentor
- save mentor
- ask-for-intro request
- public posts, optional after MVP
- office hours listings
- community events

### Community examples

```txt
Robotics Career
AI/ML Career
Startup Builders
Data Engineering
MLOps
Product Management
Cloud Engineering
India to U.S. Career Path
IIT/Indian College Guidance
Early Founder Advice
```

---

## 19. Data Model

### 19.1 Core tables

```txt
users
profiles
mentor_profiles
mentee_profiles
expertise_domains
expertise_tags
problem_requests
mentor_problem_tags
availability_blocks
booking_requests
sessions
reviews
badges
user_badges
payment_methods
meeting_methods
reports
blocks
trust_events
moderation_actions
attachments
external_links
communities
community_memberships
```

### 19.2 Important fields

#### users

```txt
id
email
role
status
created_at
updated_at
```

#### mentor_profiles

```txt
user_id
headline
bio
years_experience
current_role
current_company_optional
education_optional
location_country
location_region
location_city_optional
languages
meeting_mediums
pricing_type
is_accepting_requests
trust_score
```

#### problem_requests

```txt
id
mentee_id
problem_statement
current_stage
target_outcome
domain
subdomain
location_context_needed
language_preference
meeting_medium_preference
budget_preference
urgency
status
created_at
```

#### payment_methods

```txt
id
mentor_id
type
display_name
url_or_instruction
is_active
payment_required_before_booking
refund_policy_text
```

#### meeting_methods

```txt
id
mentor_id
type
label
url_or_instruction
requires_confirmation
is_active
```

#### reports

```txt
id
reporter_id
reported_user_id
session_id_optional
category
description
status
admin_notes
created_at
```

---

## 20. API Design

### Auth

```txt
POST /api/auth/signup
POST /api/auth/login
POST /api/auth/logout
GET  /api/me
```

### Profiles

```txt
GET    /api/users/:id
PATCH  /api/profile
POST   /api/profile/links
POST   /api/profile/attachments
```

### Mentor

```txt
POST   /api/mentor/profile
PATCH  /api/mentor/profile
POST   /api/mentor/payment-methods
POST   /api/mentor/meeting-methods
POST   /api/mentor/availability
GET    /api/mentor/:id
```

### Problem intake and matching

```txt
POST /api/problems
GET  /api/problems/:id
POST /api/match
GET  /api/match/:problem_id
```

### Booking

```txt
POST  /api/bookings
GET   /api/bookings/:id
PATCH /api/bookings/:id/accept
PATCH /api/bookings/:id/reject
PATCH /api/bookings/:id/clarification
PATCH /api/bookings/:id/confirm-payment
PATCH /api/bookings/:id/finalize-meeting
PATCH /api/bookings/:id/cancel
```

### Reviews

```txt
POST /api/sessions/:id/reviews
GET  /api/users/:id/reviews
```

### Trust and safety

```txt
POST  /api/reports
POST  /api/blocks
GET   /api/admin/reports
PATCH /api/admin/reports/:id
PATCH /api/admin/users/:id/suspend
```

### Badges

```txt
GET  /api/badges
GET  /api/users/:id/badges
POST /api/admin/badges/award
```

---

## 21. Privacy and Data Handling

The app may process sensitive career and identity-related information. Privacy must be designed early.

### Rules

- Resume upload should be optional.
- LinkedIn/GitHub/portfolio links should be optional.
- Users should control what is public.
- Exact location should not be public by default.
- Uploaded resumes should be private by default.
- Only derived matching signals should be used publicly.
- Users should be able to delete their account.
- Users should be able to delete attachments.
- Admin access to private documents should be restricted and audited.

### Resume processing

For MVP:

- upload PDF
- extract text if possible
- let user review extracted fields
- do not expose raw resume to mentors unless user explicitly shares it

---

## 22. Legal and Disclaimer Requirements

The app should include clear disclaimers.

### Platform disclaimer

```txt
This platform helps people discover and connect with mentors. It does not guarantee job offers, admissions, funding, business outcomes, investment returns, immigration outcomes, or any other result. Users are responsible for verifying credentials, evaluating advice, and making their own decisions.
```

### Payment disclaimer

```txt
Payments happen directly between participants using external payment methods. The platform does not process, hold, refund, guarantee, or arbitrate payments unless a specific deployment explicitly adds that feature.
```

### In-person meeting disclaimer

```txt
In-person meetings are arranged voluntarily by participants. Meet in public places, do not share sensitive personal information unnecessarily, and report suspicious behavior immediately.
```

### Professional advice disclaimer

```txt
Mentorship is not a substitute for licensed professional advice. For legal, medical, tax, financial, immigration, or mental health matters, consult a qualified professional.
```

---

## 23. UI / UX Principles

### Design values

- elegant
- calm
- trustworthy
- low-friction
- modern
- professional
- not noisy
- not gamified in a childish way

### Key UX flows

1. **Problem-first search**  
   User starts by describing the problem, not by browsing endless profiles.

2. **Explainable matching**  
   Every recommendation explains why the mentor is relevant.

3. **Minimal setup for mentors**  
   Mentor can become discoverable with profile + expertise + meeting method + optional payment method.

4. **Manual-first integrations**  
   Paste links first. API integrations later.

5. **Trust visible everywhere**  
   Badges, verification, reviews, report controls, and safety warnings should be easy to find.

---

## 24. Pages

### Public pages

```txt
/
/about
/how-it-works
/mentors
/mentors/:username
/communities
/communities/:slug
/badges/:badge_id
/u/:username
/safety
/license
```

### Authenticated pages

```txt
/onboarding
/dashboard
/problems/new
/problems/:id/matches
/bookings
/bookings/:id
/profile/edit
/mentor/setup
/mentor/availability
/mentor/payment-methods
/mentor/meeting-methods
/network
/settings
```

### Admin pages

```txt
/admin
/admin/reports
/admin/users
/admin/badges
/admin/trust-events
/admin/communities
```

---

## 25. Implementation Phases

### Phase 0 — Repo foundation

- set up monorepo or single Next.js app
- add license
- add contribution guide
- add code of conduct
- add security policy
- add Docker Compose
- add environment config docs
- add database migrations

### Phase 1 — Core profiles

- auth
- user profile
- mentor profile
- mentee profile
- external links
- resume upload
- expertise taxonomy

### Phase 2 — Matching v1

- problem intake
- structured matching
- mentor ranking
- match explanation
- filters for language/location/meeting type
- admin-configurable weights

### Phase 3 — Booking v1

- booking request
- mentor accept/reject/clarify
- manual availability
- external meeting method
- external payment method
- confirmation email

### Phase 4 — Trust and safety

- reviews
- report/block
- admin dashboard
- trust score v1
- suspicious link warning
- safety pages

### Phase 5 — Badges and network

- badge rules
- badge awarding
- public badge pages
- GitHub/LinkedIn-shareable badges
- communities
- follow/save mentor

### Phase 6 — Advanced matching

- pgvector semantic search
- local/open-source embeddings
- resume field extraction
- optional AI provider adapter
- feedback-based ranking improvements

### Phase 7 — Optional integrations

- Google Calendar
- Outlook Calendar
- Google Meet creation
- Zoom link integration
- SMS notifications
- user-provided AI keys

---

## 26. Environment Variables

Example `.env.example`:

```env
APP_URL=http://localhost:3000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/mentor_os
AUTH_SECRET=change-me
STORAGE_PROVIDER=local
EMAIL_PROVIDER=smtp
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=
ENABLE_VECTOR_SEARCH=false
ENABLE_AI_MATCHING=false
AI_PROVIDER=none
OPENAI_API_KEY=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
ENABLE_GOOGLE_CALENDAR=false
ENABLE_SMS=false
```

No paid API key should be required for local development.

---

## 27. Deployment Modes

### Local development

```txt
Docker Compose
Postgres
Local file storage
SMTP dev server or console email
No paid APIs
```

### Community self-hosted instance

```txt
Docker deployment
Postgres
S3-compatible storage
SMTP provider
Manual payment links
Manual meeting links
Optional calendar integration
```

### Public hosted instance

```txt
Managed Postgres
Object storage
Email provider
Monitoring
Backups
Moderation queue
Rate limiting
Abuse prevention
Optional AI matching
```

---

## 28. Quality Requirements

This application deals with trust, identity, mentorship, career decisions, and potentially paid interactions. Build it with production-grade engineering practices.

### Required practices

- TypeScript strict mode
- database migrations
- input validation
- authorization checks
- rate limiting
- audit logs for admin actions
- test coverage for matching logic
- test coverage for booking state machine
- test coverage for trust/safety flows
- secure file upload validation
- dependency scanning
- clear error handling
- structured logging
- backup strategy

### Matching tests

Create test cases such as:

```txt
Robotics student -> recently successful robotics mentor
India/IIT guidance -> mentor with India/IIT context
AI career switch -> mentor who transitioned into AI recently
Founder pricing problem -> B2B SaaS founder/operator
Local networking request -> mentor with same/nearby location
Language preference -> mentor who speaks requested language
In-person preference -> mentor available nearby and in-person
```

---

## 29. Initial Repo Structure

```txt
mentor-os/
  apps/
    web/
      app/
      components/
      lib/
      server/
      tests/
  packages/
    core/
      matching/
      trust/
      badges/
      taxonomy/
    adapters/
      payment/
      calendar/
      meeting/
      email/
      storage/
      ai/
    database/
      migrations/
      seed/
  docs/
    architecture.md
    matching.md
    trust-safety.md
    deployment.md
    licensing.md
  docker-compose.yml
  .env.example
  README.md
  LICENSE
  CONTRIBUTING.md
  SECURITY.md
  CODE_OF_CONDUCT.md
```

---

## 30. Success Metrics

### Matching metrics

```txt
match_acceptance_rate
mentor_response_rate
booking_completion_rate
post_session_helpfulness_score
bad_match_report_rate
time_to_first_relevant_mentor
```

### Trust metrics

```txt
report_rate
confirmed_scam_rate
repeat_offender_rate
review_quality_score
verified_profile_rate
```

### Community metrics

```txt
active_mentors
active_mentees
completed_sessions
free_community_sessions
mentor_retention
mentee_return_rate
community_engagement
```

---

## 31. Definition of Done for MVP

MVP is complete when:

- a mentor can create a complete profile
- a mentee can describe a problem
- the system can recommend mentors with explanations
- a mentee can request a session
- a mentor can accept/reject/clarify
- mentor-owned payment instructions can be attached
- mentor-owned meeting instructions can be attached
- phone/video/in-person meeting types are supported
- both parties can review each other
- users can report/block suspicious users
- admin can review reports
- badges can be awarded and displayed
- app can run locally without paid APIs
- app can be self-hosted using Docker Compose
- license clearly prevents unwanted commercial cloning if that is the chosen legal strategy

---

## 32. Key Product Risk

The biggest risk is not scheduling.

The biggest risk is bad matching.

If the app recommends generic mentors, it becomes another directory. The product only becomes valuable when the system consistently understands the user’s actual problem and recommends someone with the right practical experience.

Therefore, every major engineering and product decision should protect this priority:

> Right person. Right problem. Right context. Low friction. High trust.

---

## 33. Reference Notes

- OSI Open Source Definition: https://opensource.org/osd
- PolyForm Noncommercial License: https://polyformproject.org/licenses/noncommercial/1.0.0
- Commons Clause: https://commonsclause.com
- Business Source License: https://mariadb.com/bsl11
- Stripe Payment Links: https://docs.stripe.com/payment-links
- Google Calendar event conference data: https://developers.google.com/workspace/calendar/api/guides/create-events
- Supabase pgvector documentation: https://supabase.com/docs/guides/database/extensions/pgvector
