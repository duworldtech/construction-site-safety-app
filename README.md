# Construction Safety App — Bootstrap, Shared Core, and API Scaffold

This repo is a monorepo managed with Turborepo and pnpm.

Included PRs:
- #bootstrap: monorepo scaffold, CI, Makefile
- #shared-core: shared-crypto, shared-types, shared-config, unit tests, .env.example, mock/live modes
- #api-scaffold: NestJS API app with Prisma schema v1, migration, seed, and /health

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
  - api — NestJS API scaffold (Prisma + /health)
- packages/
  - shared-crypto — hashing and HMAC helpers
  - shared-types — TS interfaces and shared DTOs
  - shared-config — env loader with schema validation

## Mock vs Live modes

- MODE=mock (default): runs without external infra; uses local secrets and defaults
- MODE=live: intended for integration with real services; will require proper secrets in future PRs

Set MODE in your .env (see .env.example). Each app/package can also include its own .env.example (e.g., apps/api/.env.example).

## API (apps/api)

- Health endpoint: GET /health -> `{ "status": "ok" }`
- Prisma schema v1 with Site and Inspection models
- Seed script to create demo data

API env example (apps/api/.env.example):
- MODE, PORT, NODE_ENV, SECRET_KEY, API_URL, DATABASE_URL

### Run the API locally

1) `cp apps/api/.env.example apps/api/.env`
2) Optional (DB): If running with a real Postgres, ensure DATABASE_URL is set and Postgres is reachable.
3) Install deps: `pnpm install`
4) Generate Prisma client: `pnpm --filter @construction/api prisma:generate`
5) Run migrations (live DB only): `pnpm --filter @construction/api prisma:migrate`
6) Seed data (live DB only): `pnpm --filter @construction/api prisma:seed`
7) Build: `pnpm --filter @construction/api build`
8) Start: `node apps/api/dist/main.js`
9) Check: `curl http://localhost:3000/health` -> `{ "status": "ok" }`

Mock mode note: In MODE=mock, you can skip steps 5 and 6. The /health endpoint works without a database.

## CI

GitHub Actions workflow runs on push/PR to main:
- Install dependencies
- Lint
- Build
- Test

## Demo steps (PR #shared-core + #api-scaffold)

1) `cp .env.example .env`
2) `pnpm install`
3) `pnpm build`
4) `pnpm test`

Expected:
- shared-crypto tests pass (hash/hmac/random)
- shared-config tests pass (defaults + mock mode)
- shared-types placeholder test passes
- API builds successfully and tests run (no DB required in mock mode)
