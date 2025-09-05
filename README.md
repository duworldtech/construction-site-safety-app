# Construction Safety App

This repository contains the **Construction Safety App**, built as a monorepo with [Turborepo](https://turbo.build/), `pnpm`, and modular packages.

## Project Setup (Initial)

- Monorepo scaffold using Turborepo
- pnpm workspaces for apps and shared packages
- Makefile targets for dev, build, lint, test, migrate, and seed
- GitHub Actions workflows for CI (lint/build/test)

## Planned Development Sequence

1. **Bootstrap**
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

Cosine AI will deliver this app via continuous, incremental PRs.  
Each PR will be independently runnable, documented, and include demo steps.
# construction-site-safety-app
