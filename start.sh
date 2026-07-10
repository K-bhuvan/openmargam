#!/usr/bin/env bash
set -e

echo "Starting OpenMargam (Postgres + Next.js)..."
echo ""

if [[ ! -f .env ]]; then
  echo "Missing .env. Copy .env.example to .env and set JWT_SECRET first."
  exit 1
fi

if ! grep -Eq '^JWT_SECRET=.{32,}$' .env; then
  echo "JWT_SECRET must be set in .env and must be at least 32 characters."
  exit 1
fi

# Build and start everything: db → migrate → seed → web
docker compose up --build -d

echo ""
echo "Waiting for services to settle..."
sleep 3

echo ""
echo "✓ OpenMargam is running at http://localhost:3000"
echo "  - Postgres on localhost:5432 (user: postgres, db: openmargam)"
echo "  - Web app on localhost:3000"
echo ""
echo "  Stop:    docker compose down"
echo "  Logs:    docker compose logs -f web"
echo "  Reset:   docker compose down -v && docker compose up --build -d"
