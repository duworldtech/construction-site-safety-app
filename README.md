# Construction Safety App — Bootstrap and Shared Core

This repo is a monorepo managed with Turborepo and pnpm.

Included PRs:
- #bootstrap: monorepo scaffold, CI, Makefile
- #shared-core: shared-crypto, shared-types, shared-config, unit tests, .env.example, mock/live modes

## Requirements

- Node 20+
- pnpm 9.6.0+
- git

## Quickstart

- Copy env: `cp .env.example .env`
- Install: `pnpm install`
- Build: `pnpm build`
- Lint: `pnpm lint`
- Test: `pnpm test`
- Dev (watch in packages): `pnpm dev`
- CI (lint+build+test): `pnpm ci`

## Repo layout

- apps/ — applications (to be added in subsequent PRs)
- packages/
  - shared-crypto — hashing and HMAC helpers
  - shared-types — TS interfaces and shared DTOs
  - shared-config — env loader with schema validation

## Mock vs Live modes

- MODE=mock (default): runs without external infra; uses local secrets and defaults
- MODE=live: intended for integration with real services; will require proper secrets in future PRs

Set MODE in your .env (see .env.example).

## CI

GitHub Actions workflow runs on push/PR to main:
- Install dependencies
- Lint
- Build
- Test

## Demo steps (PR #shared-core)

1) `cp .env.example .env`
2) `pnpm install`
3) `pnpm build`
4) `pnpm test`

Expected:
- shared-crypto tests pass (hash/hmac/random)
- shared-config tests pass (defaults + mock mode)
- shared-types has a placeholder test that passes

## Next PRs

- #api-scaffold: NestJS API skeleton with Prisma v1 schema, migration, seed, and /health endpoint
