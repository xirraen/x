# xirraen — Web3 profile

Profil personal responsif berbentuk Bento, dengan avatar Web3 orisinal, folder tautan, kartu on-chain, serta tautan proyek dan catatan.

## Run locally

```bash
npm install
npm run dev
```

## Build and checks

```bash
npm run typecheck
npm run lint
npm run build
```

## Profile links

- X: https://x.com/xirraen
- GitHub: https://github.com/xirraen
- Telegram: https://t.me/xirraen

## Live on-chain data

The on-chain card reads public EVM balance aggregates and transaction history from Routescan for Ethereum, Optimism, Arbitrum, Base, Gnosis, Polygon, and Avalanche C-Chain. The page requests a refresh about every 60 seconds; its server route keeps only a short-lived in-memory response cache and sends `Cache-Control: no-store` to clients. The page and public JSON endpoint do not expose individual token names, quantities, or holdings lists.

USD totals include only assets with a usable provider value or a conservative fallback: DexScreener fallback pricing is included only when at least two active, liquid pools agree within 20%. Assets with conflicting or unavailable prices are excluded from the aggregate, and the UI exposes only a generic partial-value indicator through accessibility metadata—not the asset identity or quantity. Gas shows the sum of indexed gas units, and protocol count is a proxy based on distinct decoded contract destinations.

All requests are read-only. No private key, seed phrase, signer, transaction submission, or persistent balance storage is used. The complete checksum-case wallet address is copied when the compact address row is tapped or clicked; the visible abbreviation is uppercased for visual alignment.

## Hosting

The Vercel project uses `projects/xirraen` as its root directory. The existing Dropchoice app remains in `projects/dropchoice`.

## Icon attribution

Branded network SVGs in `public/chain-icons` are sourced from [Web3Icons](https://github.com/0xa3k5/web3icons) (`@web3icons/core` v4.0.58), under the MIT license. The USDT/Tether logo is an official PNG media asset from [Tether's Media Assets page](https://tether.to/en/media/); it is included unmodified and displayed proportionally inside the same small square frame as the network icons, following Tether's logo-use guidelines.
