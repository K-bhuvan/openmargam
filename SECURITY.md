# Security Policy

OpenMargam is an early-stage project. The active application uses server-side
authentication, PostgreSQL, and HTTP-only session cookies, but it has not yet
completed a production security review.

## Reporting a vulnerability

Please do not open a public issue containing vulnerability details.

Use GitHub's **Report a vulnerability** option on the repository's Security
page. If private vulnerability reporting is unavailable, open a public issue
requesting a private maintainer contact without including technical details or
personal data.

Include the affected component, reproduction steps, impact, and any suggested
mitigation. Maintainers will acknowledge a report as soon as reasonably
possible and coordinate disclosure after a fix is available.

## Current safeguards

- Passwords are hashed with bcrypt and never stored in plaintext.
- Sessions use signed JWTs in HTTP-only, same-site cookies.
- API inputs are validated at request boundaries.
- Role and resource-ownership checks protect booking actions.
- Prisma parameterizes database queries.
- Reports and important actions are written to database-backed audit logs.
- CI runs tests, typechecking, linting, a production dependency audit, and a
  production build.

## Known early-stage limitations

- Rate limiting is in-memory and per application instance. Public deployments
  need a trusted proxy or shared rate limiter.
- Email verification, password recovery, account deletion, blocking, and an
  admin moderation interface are not implemented.
- Mentor payment and meeting instructions may contain external links that have
  not been automatically scanned.
- Trust and verification fields are reserved for future evidence-backed
  signals and remain empty in current seed data.
- Resume and attachment uploads are not implemented.

Before hosting real users, deploy behind HTTPS, replace all example secrets,
restrict database access, configure backups and monitoring, and complete an
independent security and privacy review.

Do not store card numbers, bank credentials, payment processor secrets, payout accounts, or private meeting credentials in this application.
