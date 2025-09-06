# Construction Safety App — Minimal Functional Stack

A minimal, mock-mode friendly Construction Safety App delivered as a Turborepo monorepo with API and Web apps plus shared packages.

- API: NestJS with auth (JWT), health endpoints, Prisma schema (for future live mode)
- Web: Next.js with Tailwind — login and dashboard that call the API
- Shared packages: config, types, crypto
- CI: Lint, build, unit/e2e tests (API + Web)

## Requirements

- Node 20+
- pnpm 9.6.0+
- git
- PostgreSQL (optional; only needed if you run live DB locally for future features)

## Mock vs Live modes

- MODE=mock (default): works without external infra; safe defaults and demo users
- MODE=live: will integrate with real services in future PRs (DB, etc.)

Set MODE in .env files (see .env.example). Each app includes its own .env.example (e.g., apps/api/.env.example).

## Quickstart (root)

- Copy env: `cp .env.example .env`
- Install: `pnpm install`
- Build all: `pnpm build`
- Lint: `pnpm lint`
- Test all: `pnpm test`
- CI locally (optional): `pnpm ci`

## Minimal flow overview

- Web /login -> POST API /auth/login -> receive JWT (mock users)
- Web /dashboard -> paste JWT -> call /health and /health/secure
- Role-based access: inspector denied; manager/admin allowed on /health/secure

Mock users (username/password in mock mode; any password accepted):
- inspector
- manager
- admin

## API (apps/api)

Endpoints:
- GET /health -> { "status": "ok", "uptime": number, "env": string, "mode": string }
- GET /health/secure -> requires JWT with role site-manager or admin -> { "status": "ok-secure" }
- POST /auth/login -> { "access_token": "..." }

Env (apps/api/.env.example):
- MODE, PORT, NODE_ENV, SECRET_KEY, JWT_SECRET, API_URL, DATABASE_URL

Run locally (mock mode):
1) `cp apps/api/.env.example apps/api/.env`
2) `pnpm install`
3) `pnpm --filter @construction/api build`
4) `node apps/api/dist/main.js`
5) Verify: `curl http://localhost:3000/health`
6) Login: `curl -X POST http://localhost:3000/auth/login -H "Content-Type: application/json" -d '{"username":"manager","password":"any"}'`

Notes:
- Prisma schema exists for future live mode; you can skip migrations/seeds in mock mode.

## Web (apps/web)

Pages:
- /login — posts to /auth/login, shows token (kept in memory)
- /dashboard — paste token; calls /health and /health/secure; shows results and access denied

Config:
- API URL via NEXT_PUBLIC_API_URL (defaults to http://localhost:3000)

Run locally:
1) In another terminal with API running
2) `pnpm --filter @construction/web dev`
3) Open http://localhost:3001
4) Login with manager/admin/inspector (any password in mock)
5) Copy token from /login, paste into /dashboard to call /health/secure

## Tests

- API unit + e2e (supertest) run via `pnpm --filter @construction/api test`
- Web e2e (Playwright):
  - Install browsers once: `pnpm --filter @construction/web exec npx playwright install`
  - Start API (and Web in another terminal)
  - Run: `pnpm --filter @construction/web e2e`

## CI

GitHub Actions workflow:
- Installs dependencies
- Lints and builds
- Runs API tests
- Starts API + Web in mock mode
- Runs Web Playwright e2e

## Repo layout

- apps/
  - api — NestJS API (auth + health; Prisma schema for future live mode)
  - web — Next.js web (login and dashboard)
- packages/
  - shared-crypto — hashing and HMAC helpers
  - shared-types — shared TypeScript types
  - shared-config — .env loader with zod validation and mock/live helpers

This repository demonstrates a complete, minimal, functional flow suitable for review or handoff.
