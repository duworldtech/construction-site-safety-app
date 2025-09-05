# Construction Safety App — Bootstrap

This repo is a monorepo managed with Turborepo and pnpm. This PR (#bootstrap) sets up:
- pnpm workspaces (apps/*, packages/*)
- Turborepo pipeline (turbo.json)
- CI skeleton (.github/workflows/ci.yml)
- Makefile tasks (install/dev/build/lint/test/ci)
- Root README and .gitignore

## Requirements

- Node 20+
- pnpm 9.6.0+
- git

## Quickstart

- Install: `pnpm install`
- Dev (runs all app/package dev scripts): `pnpm dev`
- Build: `pnpm build`
- Lint: `pnpm lint`
- Test: `pnpm test`
- CI (lint+build+test): `pnpm ci`

## Repo layout

- apps/ — applications (to be added in subsequent PRs)
- packages/ — shared libraries (to be added in subsequent PRs)

## CI

GitHub Actions workflow runs on push/PR to main:
- Install dependencies
- Lint
- Build
- Test (passWithNoTests to allow empty initial scaffold)

## Environments

- .env files are ignored by git. Create env files as needed per app/package in future PRs.
- .env.example will be introduced with each app or package as they are added.

## Demo steps

For this bootstrap PR:
1) pnpm install
2) pnpm build
3) pnpm lint
4) pnpm test

All steps should succeed with no apps/packages yet (tests pass by default).

## Next PRs

- #shared-core: shared-crypto, shared-types, shared-config (with tests and .env.example)
- #api-scaffold: NestJS API skeleton with Prisma v1 schema, migration, seed, and /health endpoint
