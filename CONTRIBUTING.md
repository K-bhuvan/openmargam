# Contributing

Thank you for helping OpenMargam make important decisions less isolating and
less error-prone. Contributions of code, design, documentation, testing,
research, and lived experience are welcome.

## Before you start

- Read the project status and roadmap in [`README.md`](README.md).
- Search existing issues before opening a new one.
- For a bug, include the smallest reliable reproduction you can provide.
- For a major feature, start with an issue describing the user value, privacy
  impact, and effect on self-hosted deployments.
- Do not include sensitive personal information in issues, screenshots, logs,
  fixtures, or seed data.

Security vulnerabilities must follow [`SECURITY.md`](SECURITY.md), not the
public issue tracker.

## Development workflow

Run the full application with Docker from the repository root:

```sh
cp .env.example .env
./start.sh
```

Or work directly in `web/` using the commands documented in the main README.
Before submitting a pull request, run:

```sh
python3 -m unittest discover -s tests
cd web
npm test
npm run typecheck
npm run lint
npm audit --omit=dev
npm run build
```

Keep pull requests focused. Explain what changed, why it matters, how it was
verified, and any limitations that remain.

## Product constraints

Contributions should preserve these rules:

- No platform commission or payment custody.
- No mandatory paid APIs for local development.
- Matching quality takes priority over directory-style browsing.
- External services should be accessed through adapters.
- Sensitive fields should be private by default.
- Trust and safety behavior should be testable and auditable.

By participating, you agree to follow the [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md).
