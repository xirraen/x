"use client";

import Image from "next/image";
import { createContext, useContext, useEffect, useState } from "react";
import WalletAddressButton from "./wallet-address-button";

type LiveActivity = {
  id: string;
  chainName: string;
  symbol: string;
  timestamp: string;
  label: string;
  direction: "IN" | "OUT" | "CALL";
  quantity: string | null;
  gasUsed: number;
  succeeded: boolean;
};

type LivePayload = {
  ok: true;
  updatedAt: string;
  refreshSeconds: number;
  summary: {
    totalUsd: number;
    usdIsPartial: boolean;
    transactionCount: number;
    walletAgeDays: number | null;
    gasUsed: number;
    gasSampleCount: number;
    gasIsLifetime: boolean;
    protocolCount: number | null;
  };
  activity: LiveActivity[];
};

type OnchainContextValue = {
  data: LivePayload | null;
  loading: boolean;
  error: boolean;
};

const OnchainContext = createContext<OnchainContextValue>({ data: null, loading: true, error: false });
const REFRESH_MS = 60_000;

export function OnchainDataProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [state, setState] = useState<OnchainContextValue>({ data: null, loading: true, error: false });

  useEffect(() => {
    let active = true;
    let timer: number | undefined;
    let controller: AbortController | undefined;

    const refresh = async () => {
      controller = new AbortController();
      try {
        const response = await fetch("/api/onchain", { cache: "no-store", signal: controller.signal });
        if (!response.ok) throw new Error("feed_unavailable");
        const payload = (await response.json()) as LivePayload;
        if (!payload?.ok || !Array.isArray(payload.activity)) throw new Error("invalid_feed");
        if (active) setState({ data: payload, loading: false, error: false });
      } catch {
        if (active) setState((current) => ({ ...current, loading: false, error: true }));
      } finally {
        if (active) timer = window.setTimeout(refresh, REFRESH_MS);
      }
    };

    void refresh();
    return () => {
      active = false;
      controller?.abort();
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, []);

  return <OnchainContext.Provider value={state}>{children}</OnchainContext.Provider>;
}

function useOnchainData() {
  return useContext(OnchainContext);
}

function formatUsd(value: number): string {
  if (!Number.isFinite(value) || value < 0.00005 && value > 0) return value > 0 ? "$<0.0001" : "$0.00";
  const small = value < 1;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: small ? 4 : 2,
    maximumFractionDigits: small ? 6 : 2,
  }).format(value);
}

function formatCompact(value: number): string {
  if (!Number.isFinite(value) || value < 0) return "—";
  return new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(value);
}

function formatQuantity(value: string): string {
  const number = Number(value);
  if (!Number.isFinite(number)) return value;
  return new Intl.NumberFormat("en-US", { maximumSignificantDigits: 7 }).format(number);
}

function relativeTime(timestamp: string): string {
  const elapsed = Math.max(0, Date.now() - Date.parse(timestamp));
  if (!Number.isFinite(elapsed)) return "waktu tidak diketahui";
  const minutes = Math.floor(elapsed / 60_000);
  if (minutes < 1) return "baru saja";
  if (minutes < 60) return `${minutes} m lalu`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} j lalu`;
  const days = Math.floor(hours / 24);
  return `${days} hari lalu`;
}

export function OnchainCard({ address }: Readonly<{ address: string }>) {
  const { data, loading, error } = useOnchainData();
  const status = error ? (data ? "STALE" : "OFFLINE") : data ? "LIVE" : loading ? "SYNC" : "OFFLINE";
  const totalLabel = !data
    ? "—"
    : data.summary.totalUsd === 0 && data.summary.usdIsPartial
      ? "N/A"
      : formatUsd(data.summary.totalUsd);
  const gasTitle = data?.summary.gasIsLifetime
    ? "Jumlah unit gas dari seluruh transaksi yang terindeks."
    : `Jumlah unit gas pada ${data?.summary.gasSampleCount ?? 0} transaksi terbaru yang dimuat.`;

  return (
    <section className="onchain-card" aria-labelledby="onchain-title">
      <div className="onchain-head">
        <WalletAddressButton address={address} />
      </div>
      <h2 className="sr-only" id="onchain-title">Ringkasan on-chain wallet</h2>
      <svg className="onchain-candle-watermark" viewBox="0 0 320 70" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path d="M8 48 C34 45 42 33 66 37 S104 51 128 39 S164 24 187 34 S224 46 247 27 S283 18 312 12" fill="none" stroke="#607ec3" strokeWidth="1.5" />
        <g strokeWidth="2.5" strokeLinecap="round">
          <g stroke="#55a88b" fill="#55a88b"><path d="M18 31v28"/><rect x="14" y="39" width="8" height="13" rx="1.5"/></g>
          <g stroke="#967bbb" fill="#967bbb"><path d="M46 23v34"/><rect x="42" y="31" width="8" height="17" rx="1.5"/></g>
          <g stroke="#55a88b" fill="#55a88b"><path d="M74 29v31"/><rect x="70" y="36" width="8" height="15" rx="1.5"/></g>
          <g stroke="#967bbb" fill="#967bbb"><path d="M102 16v34"/><rect x="98" y="23" width="8" height="16" rx="1.5"/></g>
          <g stroke="#55a88b" fill="#55a88b"><path d="M130 22v35"/><rect x="126" y="29" width="8" height="18" rx="1.5"/></g>
          <g stroke="#967bbb" fill="#967bbb"><path d="M158 18v33"/><rect x="154" y="25" width="8" height="15" rx="1.5"/></g>
          <g stroke="#55a88b" fill="#55a88b"><path d="M186 12v34"/><rect x="182" y="18" width="8" height="16" rx="1.5"/></g>
          <g stroke="#967bbb" fill="#967bbb"><path d="M214 17v36"/><rect x="210" y="25" width="8" height="17" rx="1.5"/></g>
          <g stroke="#55a88b" fill="#55a88b"><path d="M242 8v34"/><rect x="238" y="14" width="8" height="16" rx="1.5"/></g>
          <g stroke="#967bbb" fill="#967bbb"><path d="M270 13v35"/><rect x="266" y="21" width="8" height="17" rx="1.5"/></g>
          <g stroke="#55a88b" fill="#55a88b"><path d="M298 6v31"/><rect x="294" y="12" width="8" height="14" rx="1.5"/></g>
        </g>
      </svg>

      <div className="balance-row">
        <strong className="balance-value" aria-live="polite" aria-atomic="true" title="Nilai ini hanya menghitung aset yang memiliki valuasi USD tepercaya; aset tanpa harga tepercaya tidak disertakan.">
          {totalLabel}
        </strong>
        <span className="balance-token" role="img" aria-label="Nilai dikutip dalam USD; ikon Tether sebagai penanda stablecoin" title="Nilai USD, bukan saldo USDT">
          <Image src="/chain-icons/usdt-tether.png" alt="" width={18} height={18} />
        </span>
      </div>

      <div className="balance-meta">
        <span className={`wallet-live-state ${status.toLowerCase()}`}><i aria-hidden="true" />{status}</span>
      </div>

      <dl className="onchain-metrics">
        <div><dt>TRANSAKSI</dt><dd>{data ? formatCompact(data.summary.transactionCount) : "—"}</dd></div>
        <div><dt>UMUR WALLET</dt><dd>{data?.summary.walletAgeDays === null || !data ? "—" : `${data.summary.walletAgeDays} hari`}</dd></div>
        <div><dt>GAS</dt><dd title={gasTitle}>{data ? `${formatCompact(data.summary.gasUsed)} unit` : "—"}</dd></div>
        <div><dt>PROTOKOL</dt><dd title="Jumlah tujuan kontrak unik dengan method yang terdekode pada riwayat yang dimuat.">{data?.summary.protocolCount === null || !data ? "—" : data.summary.protocolCount}</dd></div>
      </dl>

      <div className="chain-icons" aria-label="Jaringan EVM yang diperiksa">
        <span className="chain-icon chain-ethereum" title="Ethereum"><Image src="/chain-icons/ethereum.svg" alt="" width={18} height={18} /></span>
        <span className="chain-icon chain-optimism" title="Optimism"><Image src="/chain-icons/optimism.svg" alt="" width={18} height={18} /></span>
        <span className="chain-icon chain-arbitrum" title="Arbitrum"><Image src="/chain-icons/arbitrum-one.svg" alt="" width={18} height={18} /></span>
        <span className="chain-icon chain-base" title="Base"><Image src="/chain-icons/base.svg" alt="" width={18} height={18} /></span>
        <span className="chain-icon chain-gnosis" title="Gnosis"><Image src="/chain-icons/gnosis.svg" alt="" width={18} height={18} /></span>
        <span className="chain-icon chain-polygon" title="Polygon"><Image src="/chain-icons/polygon.svg" alt="" width={18} height={18} /></span>
        <span className="chain-icon chain-avalanche" title="Avalanche C-Chain"><Image src="/chain-icons/avalanche.svg" alt="" width={18} height={18} /></span>
      </div>
    </section>
  );
}

export function ActivityCard() {
  const { data, loading, error } = useOnchainData();
  const status = error ? (data ? "STALE" : "OFFLINE") : data ? "LIVE" : loading ? "SYNC" : "OFFLINE";

  return (
    <section className="empty-tile activity-tile" aria-labelledby="activity-heading">
      <div className="tile-heading">
        <div><span className="tile-kicker">03 / ACTIVITY</span><h2 id="activity-heading">Aktivitas terbaru</h2></div>
        <span className={`live-pill ${status === "LIVE" ? "is-live" : ""}`}><i aria-hidden="true" />{status}</span>
      </div>
      {data && data.activity.length > 0 ? (
        <div className="activity-list" aria-label="Tiga transaksi wallet terbaru">
          {data.activity.map((item) => (
            <div className="activity-item" key={item.id}>
              <span className={`activity-direction ${item.direction.toLowerCase()}`} aria-hidden="true">{item.direction === "OUT" ? "↗" : item.direction === "IN" ? "↙" : "⌁"}</span>
              <div className="activity-copy">
                <strong>{item.label}</strong>
                <span>{item.chainName} · {item.direction === "OUT" ? "keluar" : item.direction === "IN" ? "masuk" : "kontrak"}{item.quantity ? ` · ${formatQuantity(item.quantity)} ${item.symbol}` : ""}</span>
              </div>
              <time className="activity-date" dateTime={item.timestamp} title={new Date(item.timestamp).toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })}>
                {relativeTime(item.timestamp)}
              </time>
            </div>
          ))}
          <p className="activity-footnote">Data publik read-only · sinkron otomatis tiap 60 detik</p>
        </div>
      ) : (
        <div className="activity-empty">
          <span className="activity-line" aria-hidden="true" />
          <p>{loading ? "Memuat riwayat transaksi dari jaringan…" : "Feed transaksi sementara tidak tersedia."}</p>
        </div>
      )}
    </section>
  );
}
