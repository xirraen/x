# Dropchoice Next.js Migration

## Stack
- Next.js 15 App Router
- React 19
- TypeScript
- ESLint 9
- Vercel

## Development and verification
From the monorepo root, change directory to `projects/dropchoice`.

```bash
npm install
npm run dev
npm run typecheck
npm run lint
npm run build
npm run start
```

## Vercel project settings
- Root Directory: `projects/dropchoice`
- Framework Preset: `Next.js`
- Build Command: `npm run build`
- Install Command: `npm install`
- Output Directory: leave blank so Vercel detects Next.js output; do not set `dist`.
- Node.js: 22.x or 24.x.

The `vercel.json` file sets the framework to `nextjs` and declares install/build commands. Vercel's project-level framework and root directory settings still need to match.

## Migration status
The Next.js App Router dashboard is the current application entry point. The supplied v1.00 archive is a static HTML prototype. Its UI behaviors are demo-only; no real wallet session, live scanner, indexer, database, or authentication is implemented. Refactor the prototype into native React components and dedicated routes as a follow-up step.

## Security baseline
- Never request seed phrases or private keys.
- Verify wallet signatures server-side with single-use challenges if authentication is added.
- Validate and rate-limit future API inputs.
- Distinguish sample data from provider-verified on-chain data.
- Keep credentials out of client-side bundles.
