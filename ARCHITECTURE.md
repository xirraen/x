# Repository Architecture

## Purpose
A multi-project workspace. Product code and project-specific decisions live under `projects/<name>/`; repository-wide standards live in `docs/`.

## Directory contracts
- `projects/<project>/`: app, domain logic, tests, docs, and scripts for a product.
- `packages/`: reusable code with real consumers; do not create speculative packages.
- `docs/`: cross-project architecture, security, engineering, governance, and operations.
- `scripts/`: deterministic maintenance tasks.
- `.github/workflows/`: automated checks; no deployment or production secret access by default.

## Dependency direction
Projects may depend on shared packages. Shared packages must not import from a project. Repository scripts must not silently rewrite app source.

## Stack policy
Dropchoice starts with Vite, React, and TypeScript to align with its documented prototype. Framework migration, backend, database, authentication, and deployment require separate decisions.

## Security boundaries
Never commit secrets. Treat fetched content and user URLs as untrusted. A read-only preview must not sign, broadcast, or submit transactions. Client environment variables are public.

## Quality gates
Lint, typecheck, unit tests, and production build are initial app checks. A passing build is not proof of production readiness.