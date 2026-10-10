# Dropchoice

Evidence-first Web3 opportunity intelligence workspace untuk menemukan sinyal, mengevaluasi ketidakpastian, mencatat evidence, melacak riset, dan membandingkan trade-off.

## Status saat ini

Dropchoice v1 adalah **frontend prototype modern** berbasis React + TypeScript dengan data demo dan batasan safety yang eksplisit.

- Dashboard responsive dengan Overview, Opportunities, Action Preview, Events, My Activity, dan Safety & Alerts.
- Pencarian, filter evaluasi, bookmark research lokal, checklist lokal, demo wallet state, dan toast feedback.
- Tidak ada live source ingestion, authentication, durable backend, wallet signing, atau transaction execution.
- Tidak ada seed phrase/private key yang diminta.
- Label editorial bukan financial forecast, reward guarantee, atau eligibility guarantee.
- Verifikasi sumber resmi secara mandiri sebelum mengambil tindakan.

## Stack

- Vite
- React 18
- TypeScript
- Lucide React
- Plain CSS dengan responsive layout dan reduced-motion support

## Menjalankan lokal

```bash
npm install
npm run dev
```

## Validasi

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

## Deployment Vercel

Pada Vercel, gunakan konfigurasi berikut:

- **Root Directory:** `projects/dropchoice`
- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

Project ini aman dijalankan sebagai static frontend. Backend dan integrasi blockchain harus ditambahkan sebagai tahap terpisah dengan audit safety, source provenance, rate limit, dan validasi kepemilikan wallet.

## Dokumen produk

- `docs/PRODUCT_SPEC.md`
- `docs/DOMAIN_MODEL.md`
- `docs/SAFETY_MODEL.md`
- `docs/TEST_STRATEGY.md`
- `ROADMAP.md`
