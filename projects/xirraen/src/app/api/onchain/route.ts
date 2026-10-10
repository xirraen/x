import { NextResponse } from "next/server";
import { walletAddress } from "@/lib/wallet";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const ROUTESCAN_BASE = "https://api.routescan.io/v2/network/mainnet/evm/all";
const INCLUDED_CHAIN_IDS = "1,10,42161,8453,100,137,43114";
const ROUTESCAN_HEADERS = {
  Accept: "application/json",
  "User-Agent": "xirraen-profile-live-preview/1.0",
};
const CACHE_TTL_MS = 45_000;
const NO_STORE_HEADERS = {
  "Cache-Control": "no-store, max-age=0, must-revalidate",
};

type ChainMeta = { name: string; symbol: string; dexId: string };

const chains: Record<string, ChainMeta> = {
  "1": { name: "Ethereum", symbol: "ETH", dexId: "ethereum" },
  "10": { name: "Optimism", symbol: "ETH", dexId: "optimism" },
  "42161": { name: "Arbitrum", symbol: "ETH", dexId: "arbitrum" },
  "8453": { name: "Base", symbol: "ETH", dexId: "base" },
  "100": { name: "Gnosis", symbol: "xDAI", dexId: "gnosis" },
  "137": { name: "Polygon", symbol: "POL", dexId: "polygon" },
  "43114": { name: "Avalanche", symbol: "AVAX", dexId: "avalanche" },
};

type AddressBalance = {
  chainId?: string;
  balance?: string;
  balanceValueUsd?: string | number | null;
};

type TokenHolding = {
  chainId?: string;
  tokenAddress?: string;
  tokenName?: string;
  tokenSymbol?: string;
  tokenDecimals?: number;
  tokenQuantity?: string;
  tokenPrice?: string | number | null;
  tokenValueInUsd?: string | number | null;
};

type WalletTransaction = {
  chainId?: string;
  timestamp?: string;
  from?: string;
  to?: string;
  value?: string;
  gasUsed?: string;
  method?: string | null;
  methodId?: string | null;
  status?: boolean;
};

type DexPair = {
  chainId?: string;
  pairAddress?: string;
  baseToken?: { address?: string };
  quoteToken?: { address?: string };
  priceUsd?: string | null;
  liquidity?: { usd?: number | null };
  volume?: { h24?: number | null };
};

type LiveAsset = {
  id: string;
  chainId: string;
  chainName: string;
  symbol: string;
  name: string;
  quantity: string;
  valueUsd: number | null;
  priceStatus: "priced" | "estimated" | "unpriced" | "conflicted";
};

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

type CachedPayload = { expiresAt: number; payload: LivePayload };
type CacheGlobal = typeof globalThis & { __xirraenOnchainCache?: CachedPayload };

async function getJson<T>(url: URL, headers: HeadersInit = ROUTESCAN_HEADERS): Promise<T> {
  const response = await fetch(url, { cache: "no-store", headers });
  if (!response.ok) throw new Error("upstream_unavailable");
  return (await response.json()) as T;
}

function toNumber(value: string | number | null | undefined): number | null {
  if (value === null || value === undefined || value === "") return null;
  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
}

function formatUnits(rawValue: string | undefined, decimals: number): string {
  if (!rawValue || !/^\d+$/.test(rawValue) || !Number.isInteger(decimals) || decimals < 0 || decimals > 36) return "0";
  const raw = BigInt(rawValue);
  const scale = BigInt(10) ** BigInt(decimals);
  const whole = raw / scale;
  if (decimals === 0) return whole.toString();
  const fraction = (raw % scale).toString().padStart(decimals, "0").replace(/0+$/, "");
  return fraction ? `${whole.toString()}.${fraction}` : whole.toString();
}

function nonZero(rawValue: string | undefined): boolean {
  return Boolean(rawValue && /^\d+$/.test(rawValue) && BigInt(rawValue) > BigInt(0));
}

function parseMethodName(method: string | null | undefined): string | null {
  if (!method) return null;
  const name = method.split("(")[0].trim();
  return name ? name.slice(0, 22) : null;
}

function getNativeAssets(rows: AddressBalance[]): LiveAsset[] {
  return rows.flatMap((row) => {
    const chainId = row.chainId ?? "";
    const meta = chains[chainId];
    if (!meta || !nonZero(row.balance)) return [];
    const value = toNumber(row.balanceValueUsd);
    return [{
      id: `${chainId}:native`,
      chainId,
      chainName: meta.name,
      symbol: meta.symbol,
      name: `${meta.name} ${meta.symbol}`,
      quantity: formatUnits(row.balance, 18),
      valueUsd: value && value > 0 ? value : null,
      priceStatus: value && value > 0 ? "priced" : "unpriced",
    } satisfies LiveAsset];
  });
}

async function getConservativeDexPrice(chainId: string, tokenAddress: string): Promise<{ status: "estimated" | "unpriced" | "conflicted"; priceUsd: number | null }> {
  const meta = chains[chainId];
  if (!meta || !/^0x[0-9a-fA-F]{40}$/.test(tokenAddress)) return { status: "unpriced", priceUsd: null };

  try {
    const url = new URL(`https://api.dexscreener.com/token-pairs/v1/${meta.dexId}/${tokenAddress}`);
    const pairs = await getJson<DexPair[]>(url, { Accept: "application/json" });
    if (!Array.isArray(pairs)) return { status: "unpriced", priceUsd: null };

    const candidates = pairs.filter((pair) => {
      const isTokenPair = [pair.baseToken?.address, pair.quoteToken?.address]
        .some((address) => address?.toLowerCase() === tokenAddress.toLowerCase());
      const price = toNumber(pair.priceUsd);
      const liquidity = toNumber(pair.liquidity?.usd) ?? 0;
      const volume24h = toNumber(pair.volume?.h24) ?? 0;
      return pair.chainId?.toLowerCase() === meta.dexId && isTokenPair && price !== null && price > 0 && liquidity >= 500 && volume24h >= 10;
    });

    // A single pool is not enough to value an unpriced holding. Require two liquid,
    // active pools and close agreement; otherwise keep the balance visible but unpriced.
    if (candidates.length < 2) return { status: "unpriced", priceUsd: null };

    const prices = candidates.map((pair) => Number(pair.priceUsd)).filter((price) => Number.isFinite(price) && price > 0).sort((a, b) => a - b);
    if (prices.length < 2) return { status: "unpriced", priceUsd: null };
    const spread = prices[prices.length - 1] / prices[0];
    if (!Number.isFinite(spread) || spread > 1.2) return { status: "conflicted", priceUsd: null };

    const middle = Math.floor(prices.length / 2);
    const median = prices.length % 2 ? prices[middle] : (prices[middle - 1] + prices[middle]) / 2;
    return { status: "estimated", priceUsd: median };
  } catch {
    return { status: "unpriced", priceUsd: null };
  }
}

async function getTokenAssets(rows: TokenHolding[]): Promise<LiveAsset[]> {
  const usableRows = rows.filter((row) => nonZero(row.tokenQuantity));
  return Promise.all(usableRows.map(async (row, index) => {
    const chainId = row.chainId ?? "";
    const meta = chains[chainId];
    const decimals = Number.isInteger(row.tokenDecimals) ? Number(row.tokenDecimals) : 18;
    const quantity = formatUnits(row.tokenQuantity, decimals);
    const quantityNumber = Number(quantity);
    const providerValue = toNumber(row.tokenValueInUsd);
    const providerPrice = toNumber(row.tokenPrice);
    const base: Omit<LiveAsset, "valueUsd" | "priceStatus"> = {
      id: `${chainId}:${row.tokenAddress ?? row.tokenSymbol ?? index}`,
      chainId,
      chainName: meta?.name ?? "EVM",
      symbol: (row.tokenSymbol || "TOKEN").slice(0, 16),
      name: (row.tokenName || row.tokenSymbol || "Token").slice(0, 48),
      quantity,
    };

    if (providerValue !== null && providerValue > 0) return { ...base, valueUsd: providerValue, priceStatus: "priced" };
    if (providerPrice !== null && providerPrice > 0 && Number.isFinite(quantityNumber)) {
      const computedValue = quantityNumber * providerPrice;
      if (Number.isFinite(computedValue) && computedValue > 0) return { ...base, valueUsd: computedValue, priceStatus: "priced" };
    }

    const dex = await getConservativeDexPrice(chainId, row.tokenAddress ?? "");
    if (dex.status === "estimated" && dex.priceUsd !== null && Number.isFinite(quantityNumber)) {
      const computedValue = quantityNumber * dex.priceUsd;
      if (Number.isFinite(computedValue) && computedValue > 0) return { ...base, valueUsd: computedValue, priceStatus: "estimated" };
    }
    return { ...base, valueUsd: null, priceStatus: dex.status };
  }));
}

function getActivity(transactions: WalletTransaction[]): LiveActivity[] {
  const address = walletAddress.toLowerCase();
  return [...transactions]
    .filter((tx) => Boolean(tx.timestamp && Number.isFinite(Date.parse(tx.timestamp))))
    .sort((left, right) => Date.parse(right.timestamp ?? "") - Date.parse(left.timestamp ?? ""))
    .slice(0, 3)
    .map((tx, index) => {
      const chainId = tx.chainId ?? "";
      const meta = chains[chainId];
      const fromSelf = tx.from?.toLowerCase() === address;
      const toSelf = tx.to?.toLowerCase() === address;
      const direction: LiveActivity["direction"] = fromSelf ? "OUT" : toSelf ? "IN" : "CALL";
      const methodName = parseMethodName(tx.method);
      const nativeValue = nonZero(tx.value) ? formatUnits(tx.value, 18) : null;
      return {
        id: `${chainId}:${tx.timestamp}:${index}`,
        chainName: meta?.name ?? "EVM",
        symbol: meta?.symbol ?? "EVM",
        timestamp: tx.timestamp ?? "",
        label: methodName ?? (nativeValue ? "Native transfer" : "On-chain interaction"),
        direction,
        quantity: nativeValue,
        gasUsed: toNumber(tx.gasUsed) ?? 0,
        succeeded: tx.status !== false,
      };
    });
}

async function fetchPortfolio(): Promise<LivePayload> {
  const address = encodeURIComponent(walletAddress);
  const nativeUrl = new URL(`${ROUTESCAN_BASE}/addresses`);
  nativeUrl.searchParams.set("ids", walletAddress);
  nativeUrl.searchParams.set("includedChainIds", INCLUDED_CHAIN_IDS);
  nativeUrl.searchParams.set("limit", "100");

  const tokenUrl = new URL(`${ROUTESCAN_BASE}/address/${address}/erc20-holdings`);
  tokenUrl.searchParams.set("includedChainIds", INCLUDED_CHAIN_IDS);
  tokenUrl.searchParams.set("limit", "100");

  const transactionUrl = new URL(`${ROUTESCAN_BASE}/address/${address}/transactions`);
  transactionUrl.searchParams.set("includedChainIds", INCLUDED_CHAIN_IDS);
  transactionUrl.searchParams.set("count", "true");
  transactionUrl.searchParams.set("sort", "desc");
  transactionUrl.searchParams.set("limit", "100");

  const [nativePayload, tokenPayload] = await Promise.all([
    getJson<{ items?: AddressBalance[] }>(nativeUrl),
    getJson<{ items?: TokenHolding[] }>(tokenUrl),
  ]);

  // Routescan's keyless tier is limited to two requests per second.
  await new Promise((resolve) => setTimeout(resolve, 1_100));
  const transactionPayload = await getJson<{ items?: WalletTransaction[]; count?: number; countType?: string }>(transactionUrl);

  const nativeAssets = getNativeAssets(Array.isArray(nativePayload.items) ? nativePayload.items : []);
  const tokenAssets = await getTokenAssets(Array.isArray(tokenPayload.items) ? tokenPayload.items : []);
  const assets = [...nativeAssets, ...tokenAssets].sort((a, b) => (b.valueUsd ?? -1) - (a.valueUsd ?? -1));
  const txs = Array.isArray(transactionPayload.items) ? transactionPayload.items : [];
  const transactionCount = typeof transactionPayload.count === "number" ? transactionPayload.count : txs.length;
  const gasUsed = txs.reduce((total, tx) => total + (toNumber(tx.gasUsed) ?? 0), 0);
  const gasIsLifetime = transactionPayload.countType === "exact" && transactionCount <= txs.length;
  const timestamps = txs.map((tx) => tx.timestamp).filter((value): value is string => Boolean(value && Number.isFinite(Date.parse(value))));
  const walletAgeDays = gasIsLifetime && timestamps.length > 0
    ? Math.max(0, Math.floor((Date.now() - Math.min(...timestamps.map((value) => Date.parse(value)))) / 86_400_000))
    : null;
  const contractDestinations = new Set(
    txs
      .filter((tx) => Boolean(parseMethodName(tx.method) || tx.methodId))
      .map((tx) => tx.to?.toLowerCase())
      .filter((address): address is string => Boolean(address && /^0x[0-9a-f]{40}$/.test(address))),
  );
  const unpricedAssetCount = assets.filter((asset) => asset.priceStatus === "unpriced" || asset.priceStatus === "conflicted").length;
  const totalUsd = assets.reduce((total, asset) => total + (asset.valueUsd ?? 0), 0);

  return {
    ok: true,
    updatedAt: new Date().toISOString(),
    refreshSeconds: 60,
    summary: {
      totalUsd,
      usdIsPartial: unpricedAssetCount > 0,
      transactionCount,
      walletAgeDays,
      gasUsed,
      gasSampleCount: txs.length,
      gasIsLifetime,
      protocolCount: gasIsLifetime ? contractDestinations.size : null,
    },
    activity: getActivity(txs),
  };
}

function jsonResponse(payload: LivePayload | { ok: false; message: string }, status = 200) {
  return NextResponse.json(payload, { status, headers: NO_STORE_HEADERS });
}

export async function GET() {
  const cache = globalThis as CacheGlobal;
  const cached = cache.__xirraenOnchainCache;
  if (cached && cached.expiresAt > Date.now()) return jsonResponse(cached.payload);

  try {
    const payload = await fetchPortfolio();
    cache.__xirraenOnchainCache = { payload, expiresAt: Date.now() + CACHE_TTL_MS };
    return jsonResponse(payload);
  } catch {
    return jsonResponse({ ok: false, message: "Data on-chain sementara tidak tersedia." }, 502);
  }
}
