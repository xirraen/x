# API, scanner, and test foundation

## Opportunity search

- `GET /api/opportunities?q=layer%202`
- Search covers project name, category, chain, status, task, and tags.
- The response marks records as `source: demo` and `verifiedOnChain: false`. Current opportunity records are sample data, not a verified feed.
- Query strings over 100 characters are rejected with HTTP 400.

## EVM address scanner

- `GET /api/scan/0x...`
- Validates the EVM address format before contacting a provider.
- Configure `EXPLORER_API_URL` to an Etherscan-compatible API endpoint. Optional `EXPLORER_API_KEY` is read only server-side. Optional `EXPLORER_CHAIN` labels the configured network.
- Without provider configuration, returns HTTP 503 with `SCANNER_NOT_CONFIGURED`; it does not fabricate activity.
- Provider failures return structured 502 errors. The endpoint returns up to 10 latest transactions from the provider.
- The API key must never use a `NEXT_PUBLIC_` prefix. Configure secrets in Vercel Project Settings → Environment Variables, then redeploy.
- The configured explorer endpoint must correspond to the intended chain. A chain label alone does not verify which network the provider serves.

## Tests

Run `npm test` to execute the Node.js tests for search and bookmark normalization.

## Remaining integration work

- Configure and verify a real explorer endpoint and chain-specific explorer link conventions.
- Add persistent user storage/authentication before storing bookmarks across devices. Current bookmark normalization is a tested utility, not a database integration.
- Add browser-level tests for interactive search, bookmark controls, mobile layout, and error states.
- Add rate limiting and abuse controls before exposing address scans publicly.
