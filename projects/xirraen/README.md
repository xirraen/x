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

## Wallet address and data display

The page uses the address supplied for the current markup: `0xCcA079160b4D308C5480BB40F066De58761a2e1D`. The complete checksum-case address is copied when the compact on-chain row is tapped or clicked; the visible abbreviation is uppercased for visual alignment. The `$0.000` figure is a layout placeholder and has not been verified for this new address. Transaction count, wallet age, gas usage, and protocol count remain unavailable. Allocation and 24-hour display were removed from the card.

No live portfolio feed, private key, seed phrase, signer, or transaction endpoint is used in this markup preview.

## Hosting

The Vercel project uses `projects/xirraen` as its root directory. The existing Dropchoice app remains in `projects/dropchoice`.

## Icon attribution

Branded network SVGs in `public/chain-icons` are sourced from [Web3Icons](https://github.com/0xa3k5/web3icons) (`@web3icons/core` v4.0.58), under the MIT license. The USDT/Tether logo is an official PNG media asset from [Tether's Media Assets page](https://tether.to/en/media/); it is included unmodified and displayed proportionally inside the same small square frame as the network icons, following Tether's logo-use guidelines.
