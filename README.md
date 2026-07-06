# OpenMargam MVP

OpenMargam is a source-available mentorship and advisory network prototype focused on problem-first matching, user-owned services, and trust controls.

This repository currently contains a dependency-free browser MVP because Node.js and npm are not available in the current workspace. The app is intentionally structured so the matching, booking, moderation, and seeded domain data can later move into a Next.js TypeScript implementation.

## Implemented MVP

- Mentor directory with trust signals, languages, meeting methods, pricing model, and verification indicators.
- Problem intake flow with controlled taxonomy for domain, stage, location, language, meeting preference, and budget.
- Deterministic matching v1 with weighted scoring and human-readable explanations.
- Booking request flow with explicit states: requested, clarification requested, accepted, payment pending, confirmed, completed, cancelled, and rejected.
- Manual payment and meeting instructions with no platform custody.
- Report, block, suspend, moderation queue, and audit trail.
- Privacy and safety copy for high-risk advice, payment custody, in-person meetings, and private documents.
- Browser local storage for demo persistence.

## Run Locally

Use any static file server. With the system Python available in this workspace:

```sh
python3 -m http.server 4173
```

Then open:

```txt
http://localhost:4173
```

Opening `index.html` directly also works in most browsers.

## Test

```sh
python3 -m unittest discover -s tests
```

## Future Next.js Migration

When Node.js is available, the recommended production path is:

- Move UI into a single Next.js TypeScript app.
- Move `src/app.js` domain logic into typed modules under `packages/core`.
- Replace local storage with Postgres migrations and server-side authorization.
- Keep manual payment, meeting, email, storage, and AI providers behind adapters.
- Keep matching v1 deterministic before adding pgvector or AI-assisted matching.

## License Direction

The product goal is source-available community software, not OSI open source, if commercial cloning or SaaS replication must be restricted. A final license should be reviewed before public launch.
