<p align="center">
  <img src="web/public/logo.svg" alt="OpenMargam logo" width="120" height="120" />
</p>

<h1 align="center">OpenMargam</h1>

<p align="center">
  <strong>Find clarity before making a life-shaping decision.</strong>
</p>

<p align="center">
  A problem-first mentorship network for connecting important questions with
  people who have relevant experience.
</p>

<p align="center">
  <a href="https://github.com/K-bhuvan/openmargam/actions/workflows/ci.yml"><img src="https://github.com/K-bhuvan/openmargam/actions/workflows/ci.yml/badge.svg" alt="CI status" /></a>
</p>

<p align="center">
  <a href="https://k-bhuvan.github.io/openmargam/"><strong>Try the public showcase</strong></a> ·
  <a href="https://github.com/K-bhuvan/openmargam/releases/tag/v0.1.0-showcase">v0.1.0 showcase</a> ·
  <a href="#run-locally-with-docker">Run locally</a> ·
  <a href="#project-status">Project status</a> ·
  <a href="#roadmap">Roadmap</a> ·
  <a href="#contributing">Contribute</a>
</p>

---

<p align="center">
  <img src="docs/openmargam-overview.svg" alt="OpenMargam turns a decision and its constraints into relevant human context, better questions, and a choice that remains yours." width="960" />
</p>

<details>
<summary><strong>Why OpenMargam exists</strong> — Read the story behind the project</summary>

<br />

Many people spend years feeling directionless—not because they lack ambition,
but because they cannot see how to connect where they are with where they want
to go.

I know that feeling personally.

When I completed my undergraduate degree, I was deeply uncertain about what to
do next. My parents encouraged me to take the secure job I already had in hand.
I understood why. But I wanted to build a future in AI and robotics.

I could roughly see the destination, yet I could not connect the dots. I did
not know which steps mattered, which risks were reasonable, or how to work
within the constraints I had. What I needed was not another generic article or
search result. I needed someone who understood the path, would listen to the
actual problem, and could help me ask better questions.

Along the way, I also made mistakes—especially financial ones. Taking a loan
that was too large and would take years to repay cost more than money. It cost
time, energy, options, and, most importantly, freedom.

Those experiences are the reason for OpenMargam.

> **The intention is simple:** help people make fewer avoidable mistakes by
> connecting them with people who have relevant lived experience, so they can
> ask important questions and make decisions they will feel proud of when they
> look back.

OpenMargam cannot promise a perfect decision. No mentor can make a decision for
someone else. But timely context, honest questions, and a conversation with the
right person can prevent years of unnecessary confusion or regret.

</details>

## What OpenMargam is building

OpenMargam is exploring a simple idea: make it easier for people facing
important decisions to connect with people whose experience may help.

The project is intentionally early. We are building in public, learning as we
go, and will shape the details as the product and community evolve.

## Try the public showcase

The [public showcase](https://k-bhuvan.github.io/openmargam/) demonstrates the
problem-first matching idea without operating a real mentorship service. It
uses fictional profiles and performs matching entirely inside the browser.

It has no accounts, bookings, payments, analytics, cookies, storage, external
APIs, or data submissions. Use it to understand the direction of the project,
then return to the repository to inspect the source, join a discussion, or
contribute.

## Project status

OpenMargam is at an **early public checkpoint**, not a finished product.

The repository is ready for people to inspect, run, question, and contribute
to. The hosted product is **not production-ready** and should not be trusted
with sensitive personal information, regulated professional advice, or payment
custody.

The active application lives in `web/`. The root `index.html`, `styles.css`,
and `src/app.js` files are the original dependency-free prototype and remain
for reference and regression coverage.

### What works today

- JWT-backed signup, login, logout, and HTTP-only sessions.
- Mentee and mentor roles with server-enforced authorization.
- Mentee onboarding preferences.
- Self-service mentor profile creation and editing.
- Database-backed mentor directory and matching.
- Structured problem intake and deterministic matching v1.
- Ranked recommendations with human-readable explanations.
- Booking requests with explicit states:
  `requested → clarification/accepted → payment pending → confirmed → completed`.
- Role-specific booking actions:
  - mentees request, cancel, and mark external payment as sent;
  - assigned mentors clarify, accept, reject, confirm, and complete;
  - admins remain constrained by the same state machine.
- Mentor-owned payment and meeting instructions with no platform custody;
  OpenMargam holds no funds.
- Safety guidance, report submission, and audit logging.
- PostgreSQL, Prisma migrations, Docker Compose, and curated seed data.
- GitHub Actions checks for tests, typecheck, lint, dependency audit, and build.
- A public landing page that explains the project before asking visitors to
  create an account.

### Current limitations

- Curated seed mentors are discovery profiles, not login-ready demo accounts.
- Availability is descriptive text rather than bookable time slots.
- Confirmation emails, reviews, blocking, admin moderation UI, badges,
  communities, and calendar integrations are not implemented.
- Matching weights are code-defined rather than admin-configurable.
- Trust, review, response, and verification fields are deliberately zero or
  empty until the product can derive them from real evidence.

## A project intended to stay open

OpenMargam will be developed in public, and its source and direction are
intended to remain publicly accessible.

I am building and open-sourcing the foundation, and I intend to host a public
instance for as close to the minimum sustainable cost as possible. The goal is
not to create another platform that extracts a commission from every human
interaction. Mentors should own their services, and communities should be able
to run and improve the software themselves.

I can begin the project, but I do not want its future to depend on one person.
The community should be able to question the design, contribute improvements,
adapt it for local needs, self-host it, and eventually take it further than I
can alone.

## Product principles

- **Problem first.** Start from the decision, not a directory of titles.
- **Human context matters.** Lived experience can reveal constraints that
  generic content misses.
- **The user decides.** Mentors provide context, not authority over someone
  else's life.
- **No platform custody.** No platform wallet, commission, or escrow.
- **Bring your own services.** Mentors choose their payment, meeting, and
  eventually calendar tools.
- **Explain the match.** No unexplained ranking and no mandatory paid AI API.
- **Earn trust honestly.** Trust signals should come from verifiable activity,
  not decorative badges.
- **Stay self-hostable.** Prefer small, understandable infrastructure before
  optional integrations.

## Architecture

- **Web:** Next.js 15 App Router, React, TypeScript, Tailwind CSS
- **Data:** PostgreSQL and Prisma
- **Validation:** Zod
- **Authentication:** signed JWT session in an HTTP-only cookie
- **Deployment:** multi-stage Docker build and Docker Compose

Matching v1 is deterministic, explainable, and runs locally without a paid AI
provider.

## Run locally with Docker

Create a root environment file and set a session secret of at least 32
characters:

```sh
cp .env.example .env
```

Start PostgreSQL, apply migrations, seed curated mentors, and launch the
production-style server:

```sh
./start.sh
```

Open `http://localhost:3000`.

Useful commands:

```sh
docker compose logs -f web
docker compose down
docker compose down -v
```

Do not reuse example secrets or local seed data in a public deployment.

## Run the web app manually

From `web/`:

```sh
cp .env.example .env
npm install
npm run db:migrate
npm run db:seed
npm run dev
```

This path requires a reachable PostgreSQL database matching `DATABASE_URL`.

## Test and validate

Static prototype:

```sh
python3 -m unittest discover -s tests
```

Active web application:

```sh
cd web
npm test
npm run typecheck
npm run lint
npm audit
npm run build
```

## Contributing

Early contributors are welcome—especially people who care about mentorship,
career access, community infrastructure, trust and safety, or self-hosted
software.

Read [`CONTRIBUTING.md`](CONTRIBUTING.md) and
[`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md) before opening a change. Security
issues should follow [`SECURITY.md`](SECURITY.md), not a public issue.

- Ask questions and discuss direction in
  [GitHub Discussions](https://github.com/K-bhuvan/openmargam/discussions).
- Choose scoped work from the
  [issue tracker](https://github.com/K-bhuvan/openmargam/issues).
- New contributors can start with the
  [production-operations guide](https://github.com/K-bhuvan/openmargam/issues/12)
  or [verified showcase screenshots](https://github.com/K-bhuvan/openmargam/issues/13).

## License

OpenMargam is licensed under the [GNU AGPL v3.0](LICENSE).

## Roadmap

The roadmap is intentionally outcome-based rather than date-based. Priorities
may change as contributors and early users teach us what matters.

### Current checkpoint — working foundation

- [x] Self-hostable Next.js and PostgreSQL application
- [x] Authentication and role-based authorization
- [x] Mentor profiles and mentee onboarding preferences
- [x] Problem-first matching with explainable rankings
- [x] Two-sided booking workflow with external payment and meeting details
- [x] Safety guidance, report submission, and audit logging
- [x] Public project documentation, CI, and release hygiene

### Next checkpoint — trustworthy public preview

- [ ] [Individual mentor profile pages](https://github.com/K-bhuvan/openmargam/issues/7)
- [ ] [Bookable availability and confirmation notifications](https://github.com/K-bhuvan/openmargam/issues/8)
- [ ] [Focused mentee and mentor dashboards](https://github.com/K-bhuvan/openmargam/issues/9)
- [ ] [Reviews, blocking, moderation, and evidence-based trust](https://github.com/K-bhuvan/openmargam/issues/10)
- [ ] [Account deletion, privacy, terms, and community-guideline flows](https://github.com/K-bhuvan/openmargam/issues/11)
- [ ] [Production operations guidance for rate limits, backups, and monitoring](https://github.com/K-bhuvan/openmargam/issues/12)

### Later — community and optional integrations

- [ ] Saved mentors, contribution badges, and community spaces
- [ ] Calendar and meeting-provider integrations
- [ ] Semantic matching with local or open-source embeddings
- [ ] Optional provider adapters for email, SMS, and user-supplied AI services

The immediate priority is the **trustworthy public preview**. Calendar sync,
platform chat, payment processing, and advanced AI matching should not distract
from completing that core experience.
