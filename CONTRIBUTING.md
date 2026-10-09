# Contributing

1. Review/open an issue for substantial work.
2. Create a focused branch and keep each PR scoped.
3. Add tests and docs with behavior changes.
4. Run checks and report results.
5. Describe limitations, security risks, and migration impact.

Dropchoice checks (run inside `projects/dropchoice/`): `npm install`, `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`.

Use TypeScript, separate domain rules from UI, validate untrusted input, and avoid unnecessary dependencies. Never commit credentials, seed phrases, private keys, or production data. Do not claim demo-only features are live or production-ready.