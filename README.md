# Construction Safety App — Bootstrap, Shared Core, API, and Web Scaffold

This repo is a monorepo managed with Turborepo and pnpm.

Included PRs:
- #bootstrap: monorepo scaffold, CI, Makefile
- #shared-core: shared-crypto, shared-types, shared-config, unit tests, .env.example, mock/live modes
- #api-scaffold: NestJS API app with Prisma schema v1, migration, seed, and /health
- #api-integration: shared-config wired into API, improved /health, supertest e2e tests
- #web-scaffold: Next.js web app with login and dashboard

## Requirements

- Node 20+
- pnpm 9.6.0+
- git
- PostgreSQL (optional; only needed if you run live DB locally)

## Quickstart (root)

- Copy env: `cp .env.example .env`
- Install: `pnpm install`
- Build: `pnpm build`
- Lint: `pnpm lint`
- Test: `pnpm test`
- CI (lint+build+test): `pnpm ci`

## Repo layout

- apps/
  - api — NestJS API (Prisma + /health, auth with JWT, role-based)
  - web — Next.js (login -> token -> dashboard calling /health and /health/secure)
- packages/
  - shared-crypto — hashing and HMAC helpers
  - shared-types — TS interfaces and shared DTOs
  - shared-config — env loader with schema validation

## Mock vs Live modes

- MODE=mock (default): runs without external infra; uses local secrets and defaults
- MODE=live: intended for integration with real services; will require proper secrets in future PRs

Set MODE in your .env (see .env.example). Each app/package can also include its own .env.example (e.g., apps/api/.env.example).

## API (apps/api)

- Health endpoint: GET /health -> `{ "status": "ok", "uptime": number, "env": string, "mode": string }`
- Secure health: GET /health/secure -> requires site-manager or admin token -> `{ "status": "ok-secure" }`
- Auth: POST /auth/login -> `{ "access_token": "..." }`
- Prisma schema v1 with Site and Inspection models
- Seed script to create demo data

API env example (apps/api/.env.example):
- MODE, PORT, NODE_ENV, SECRET_KEY, JWT_SECRET, API_URL, DATABASE_URL

### Run the API locally

1) `cp apps/api/.env.example apps/api/.env`
2) Optional (DB): If running with a real Postgres, ensure DATABASE_URL is set and Postgres is reachable.
3) Install deps: `pnpm install`
4) Generate Prisma client: `pnpm --filter @construction/api prisma:generate`
5) Run migrations (live DB only): `pnpm --filter @construction/api prisma:migrate`
6) Seed data (live DB only): `pnpm --filter @construction/api prisma:seed`
7) Build: `pnpm --filter @construction/api build`
8) Start: `node apps/api/dist/main.js`
9) Check health: `curl http://localhost:3000/health`
10) Login (mock users): `curl -X POST http://localhost:3000/auth/login -H "Content-Type: application/json" -d '{"username":"manager","password":"any"}'`

Mock mode note: In MODE=mock, you can skip steps 5 and 6. The endpoints work without a database.

## Web (apps/web)

- Next.js 14+ with TypeScript and Tailwind
- Pages:
  - `/login` — posts to API `/auth/login`, keeps token in memory
  - `/dashboard` — calls `/health` and `/health/secure` using pasted token; shows access denied states
- Configuration:
  - Set API URL via `NEXT_PUBLIC_API_URL` (defaults to `http://localhost:3000`)

### Run the Web locally

1) `pnpm install`
2) `pnpm --filter @construction/web dev`
3) Visit `http://localhost:3001`
4) Navigate to Login, authenticate with mock users (`manager`, `admin`, or `inspector` with any password)
5) Copy JWT from Login page and paste into Dashboard to call `/health/secure`

## CI

GitHub Actions workflow runs on push/PR to main:
- Install dependencies
- Lint
- Build
- Test (including supertest e2e for API)

## Demo steps (end-to-end)

1) Start API:
   - `cp apps/api/.env.example apps/api/.env`
   - `pnpm --filter @construction/api build && node apps/api/dist/main.js`
2) Start Web:
   - `pnpm --filter @construction/web dev`
3) Login at web `/login`, copy token, then visit `/dashboard` and paste token to access secure route
