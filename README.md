# OpenMargam MVP

OpenMargam is a source-available mentorship and advisory network prototype focused on problem-first matching, user-owned services, and trust controls.

The repository contains two app surfaces:

- `web/`: the active Next.js, Prisma, and Postgres implementation.
- `index.html`, `styles.css`, and `src/app.js`: the original dependency-free browser MVP kept for reference and legacy tests.

## Run the Next.js App

Create a local environment file from the example and set a real 32+ character session secret:

```sh
cp .env.example .env
```

Then start Postgres, run Prisma migrations, seed mentors, and launch the app:

```sh
./start.sh
```

Open:

```txt
http://localhost:3000
```

The Docker workflow runs `prisma migrate deploy` and then `prisma/seed.ts`. Production-like runs fail fast if `JWT_SECRET` is missing.

## Run the Static MVP

The static prototype still works without Node.js:

```sh
python3 -m http.server 4173
```

Open:

```txt
http://localhost:4173
```

## Test and Validate

Static MVP tests:

```sh
python3 -m unittest discover -s tests
```

Next.js app checks:

```sh
cd web
npm run typecheck
npm run lint
npm run build
npm audit --omit=dev
```

## Implemented MVP

- Mentor directory with trust signals, languages, meeting methods, pricing model, and verification indicators.
- Problem intake with controlled taxonomy for domain, stage, location, language, meeting preference, and budget.
- Deterministic matching v1 with weighted scoring and human-readable explanations.
- Booking request flow with explicit states: requested, clarification requested, accepted, payment pending, confirmed, completed, cancelled, and rejected.
- Manual payment and meeting instructions with no platform custody.
- Safety and privacy copy for high-risk advice, payment custody, in-person meetings, and private documents.

## License Direction

The product goal is source-available community software, not OSI open source, if commercial cloning or SaaS replication must be restricted. A final license should be reviewed before public launch.
