import { NextRequest, NextResponse } from "next/server";

const ADDRESS_PATTERN = /^0x[a-fA-F0-9]{40}$/;

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ address: string }> }
) {
  const { address } = await context.params;
  if (!ADDRESS_PATTERN.test(address)) {
    return NextResponse.json({ error: "Invalid EVM address. Expected 0x followed by 40 hexadecimal characters." }, { status: 400 });
  }

  const baseUrl = process.env.EXPLORER_API_URL;
  const apiKey = process.env.EXPLORER_API_KEY;
  const chain = process.env.EXPLORER_CHAIN ?? "configured-chain";

  if (!baseUrl) {
    return NextResponse.json({
      error: "Address scanning is not configured yet.",
      code: "SCANNER_NOT_CONFIGURED",
      message: "Set EXPLORER_API_URL and configure an explorer-compatible API before requesting verified activity."
    }, { status: 503 });
  }

  try {
    const url = new URL(baseUrl);
    url.searchParams.set("module", "account");
    url.searchParams.set("action", "txlist");
    url.searchParams.set("address", address);
    url.searchParams.set("startblock", "0");
    url.searchParams.set("endblock", "99999999");
    url.searchParams.set("page", "1");
    url.searchParams.set("offset", "10");
    url.searchParams.set("sort", "desc");
    if (apiKey) url.searchParams.set("apikey", apiKey);

    const response = await fetch(url, { signal: AbortSignal.timeout(8000), next: { revalidate: 30 } });
    if (!response.ok) {
      return NextResponse.json({ error: "Explorer provider returned an error.", code: "EXPLORER_HTTP_ERROR" }, { status: 502 });
    }

    const payload: unknown = await response.json();
    if (!payload || typeof payload !== "object" || !("status" in payload) || !("result" in payload)) {
      return NextResponse.json({ error: "Explorer returned an unexpected response.", code: "EXPLORER_INVALID_RESPONSE" }, { status: 502 });
    }

    const explorer = payload as { status: string; message?: string; result: unknown };
    if (explorer.status !== "1" || !Array.isArray(explorer.result)) {
      return NextResponse.json({ error: "Explorer could not verify activity for this address.", code: "EXPLORER_QUERY_FAILED" }, { status: 502 });
    }

    const transactions = explorer.result.slice(0, 10).map((tx: Record<string, unknown>) => ({
      hash: typeof tx.hash === "string" ? tx.hash : null,
      from: typeof tx.from === "string" ? tx.from : null,
      to: typeof tx.to === "string" ? tx.to : null,
      value: typeof tx.value === "string" ? tx.value : null,
      timestamp: typeof tx.timeStamp === "string" ? tx.timeStamp : null,
      blockNumber: typeof tx.blockNumber === "string" ? tx.blockNumber : null,
      isError: tx.isError === "1"
    }));

    return NextResponse.json({
      data: { address, chain, transactions },
      meta: { source: url.origin, verifiedByProvider: true, count: transactions.length }
    }, { headers: { "Cache-Control": "private, max-age=30" } });
  } catch {
    return NextResponse.json({ error: "Unable to reach the explorer provider.", code: "EXPLORER_UNAVAILABLE" }, { status: 502 });
  }
}
