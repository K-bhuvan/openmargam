# OpenMargam Web

This is the active Next.js app for OpenMargam. It uses:

- Next.js App Router
- Prisma
- Postgres
- JWT-backed HTTP-only session cookies

## Local Development

From this directory:

```sh
cp .env.example .env
npm install
npm run db:migrate
npm run db:seed
npm run dev
```

Open `http://localhost:3000`.

For the full Docker workflow, run `./start.sh` from the repository root. The root compose file starts Postgres, applies Prisma migrations with `prisma migrate deploy`, seeds mentors, and starts the standalone Next.js server.

## Environment

Required:

- `DATABASE_URL`: Postgres connection string.
- `JWT_SECRET`: 32+ character secret for signing session JWTs. Production startup fails if this is missing.
- `SESSION_COOKIE_NAME`: optional cookie name override.

## Checks

```sh
npm run typecheck
npm run lint
npm run build
npm audit --omit=dev
```
