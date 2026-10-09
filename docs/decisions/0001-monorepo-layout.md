# ADR 0001: Project-Oriented Monorepo

- Status: Accepted for initial reconstruction
- Date: 2026-10-10

## Context
The repository needs a broader workspace while keeping products independently understandable. Dropchoice is the first product.

## Decision
Use `projects/<name>/` for product code/docs, `packages/` for genuinely shared code, `docs/` for repository standards, and `scripts/` for maintenance. Start Dropchoice with Vite, React, and TypeScript.

## Alternatives
Root-level product code was rejected because it blurs concerns. A monorepo orchestrator is deferred until there is measured need. Separate Dropchoice repo is not selected for this phase.

## Consequences
Root remains an index/governance layer. Backend, framework migration, and deployment remain separate decisions.