# Dropchoice — Web3 Intelligence Workspace

Dropchoice is a research-first workspace for discovering and organizing Web3 ecosystem and airdrop opportunities.

## Stack
- Next.js App Router
- React 19 and TypeScript
- ESLint 9
- Vercel

## Local development
Run from `projects/dropchoice`:

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Verification
```bash
npm run typecheck
npm run lint
npm run build
npm run start
```

## Current implementation status
The Next.js App Router dashboard is an initial frontend implementation. Opportunity rows and summary statistics are demo data. Search/filter controls, wallet connection, persistence, address scanning, and on-chain activity are not yet connected to live services. No database, production authentication, or blockchain indexer is included.

The supplied v1.00 archive was checked against SHA-256 `e671c51dde7e81e2d9ff144725ab11e3a4293d106c3bd2a4bac49503d48b533a`. It contains a static single-page prototype and supporting documentation. The migration keeps the Next.js application as the build/deployment entry point; refactor the v1 interface into native React components in incremental changes rather than treating demo UI as production integration.

## Security boundaries
- Never request or store seed phrases/private keys.
- Treat an address as a public identifier, not proof of ownership.
- Wallet authentication, if added, must verify one-time challenges and signatures server-side.
- Do not label activity as confirmed on-chain without a trustworthy provider/indexer response.
- Keep secrets server-side; never expose them through `NEXT_PUBLIC_*` variables.

## Documentation
- `docs/README-NEXTJS.md` — development, verification, and deployment.
- `docs/IMPLEMENTATION.md` — v1 design and architecture notes.
- `docs/WHITEPAPER-SUMMARY.md` — source archive contents and prototype boundaries.
