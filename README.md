# xirraen

Independent development workspace for software experiments, Web3 research, and modular product engineering.

## Repository map
- `projects/` — product applications and project-specific documentation.
- `packages/` — shared packages only when multiple projects need them.
- `docs/` — repository-wide architecture, engineering, security, and governance.
- `scripts/` — repeatable maintenance tasks.
- `.github/workflows/` — automated quality and security checks.

## Projects

### Dropchoice
Dropchoice is an evidence-first Web3 opportunity intelligence workspace for discovering signals, evaluating uncertainty, recording evidence, discussing research, tracking progress, and comparing route trade-offs without executing transactions.

- [Project overview](projects/dropchoice/README.md)
- [Product specification](projects/dropchoice/docs/PRODUCT_SPEC.md)
- [Project roadmap](projects/dropchoice/ROADMAP.md)

Current implementation is a local prototype. Demo data is not live research; evaluations are editorial assessments rather than financial forecasts; no wallet connection, signature, or transaction execution is provided.

## Engineering principles
1. Evidence over unsupported claims.
2. Safe defaults and no secrets in client code.
3. Small, reviewable changes with automated checks.
4. Explicit product boundaries: a UI is not proof of production capability.
5. Add shared infrastructure only when real project needs justify it.

See [ARCHITECTURE.md](ARCHITECTURE.md), [ROADMAP.md](ROADMAP.md), [CONTRIBUTING.md](CONTRIBUTING.md), and [SECURITY.md](SECURITY.md).

Maintained by [@xirraen](https://github.com/xirraen).
