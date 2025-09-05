# Construction Safety App

This repository contains the **Construction Safety App**, built as a monorepo with [Turborepo](https://turbo.build/), `pnpm`, and modular packages.

## PR #bootstrap (this PR)

Scaffold only. No apps yet. CI proves the toolchain works.

What's included:
- Turborepo + pnpm workspaces
- Root Makefile with dev/build/lint/test targets
- GitHub Actions CI (lint/build/test)
- Prettier baseline

### Requirements

- Node.js 20+
- pnpm 9+

### Quick start

- Install: `make install`
- Lint: `make lint`
- Build: `make build`
- Test: `make test`
- Dev orchestrator (no apps yet): `make dev`

Expected results:
- Lint runs Prettier through turbo (no-op until packages/apps are added).
- Build/test are no-ops but validate the pipeline wiring.
- CI runs on PR and on push to main.

### .env.example

This bootstrap stage does not require environment variables, but future PRs will. Create a `.env` at the project root when instructed in later PRs.

### Mock vs live modes

Not applicable in bootstrap. Subsequent PRs will document toggles (e.g., MOCK=1) in their READMEs and .env.example.

## Planned Development Sequence

1. **Bootstrap** (this PR)
   - Monorepo scaffold, pnpm, turbo.json, Makefile, root README
   - CI skeletons for lint/build/test
2. **Shared Core**
   - Shared crypto utilities, DTOs, and config helpers
3. **API Scaffold**
   - NestJS app skeleton, Prisma schema + migration + seed, health endpoint
4. **Storage + Upload**
   - Local and S3 storage modes, signed uploads
5. **Verify-Hash + Evidence Token**
   - HMAC signing, offline-verifiable PDF export
6. **Mobile App**
   - Expo Bare scaffold, WatermelonDB init, capture + queue
7. **Admin Web**
   - Sites/Inspections UI, PDF export
8. **Sync Helpers + API Stubs**
9. **Pilot-kit Docs**
10. **Billing Scaffold**

---

Each PR will be independently runnable, documented, and include demo steps.
