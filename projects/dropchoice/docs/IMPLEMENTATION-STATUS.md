# Dropchoice implementation status

## Delivered in this increment
- Search API: `GET /api/opportunities?q=<query>`. Search is case-insensitive across project name, category, chain, status, task, and tags. Response explicitly labels records as demo data.
- EVM address activity API: `GET /api/scan/<address>`. Validates a 20-byte EVM address and reads recent Ethereum Mainnet transactions from Blockscout. Responses include explorer links and source attribution; upstream errors return a controlled 502.
- Dashboard search and watchlist interactions in the Next.js client page. Bookmarks persist in the current browser using localStorage and gracefully degrade if browser storage is unavailable.

## Important limitations
- Opportunity records and funding figures remain illustrative demo records, not verified current claims.
- Browser localStorage is per browser/device and is not shared or server-persistent. A Supabase project is not currently available in the connected account, so this increment does not pretend that cloud database persistence is configured.
- The scanner currently supports Ethereum Mainnet only. It does not connect a wallet, sign transactions, or submit transactions.
- The scanner depends on the public Blockscout endpoint and returns a controlled error when that provider is unavailable.

## Smoke checks
- Search: `/api/opportunities?q=ethereum` should return matching sample records and `meta.isDemo: true`.
- Empty search: `/api/opportunities` returns all sample records.
- Invalid address: `/api/scan/not-an-address` should return HTTP 400.
- Valid EVM address: `/api/scan/0x0000000000000000000000000000000000000000` should return recent activity from Blockscout or a controlled HTTP 502 if the provider is unavailable.
- Bookmark state: save a row, refresh the page, and confirm it remains saved in the same browser.
- Responsive layout: check at 390px, 760px, and desktop widths.
