import { NextRequest, NextResponse } from "next/server";
import { opportunities, searchOpportunities } from "../../../lib/opportunities.mjs";

export const dynamic = "force-dynamic";

export function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q") ?? "";
  if (query.length > 100) {
    return NextResponse.json({ error: "Search query must be 100 characters or fewer." }, { status: 400 });
  }

  const results = searchOpportunities(opportunities, query);
  return NextResponse.json({
    data: results,
    meta: { count: results.length, source: "demo", verifiedOnChain: false }
  }, {
    headers: { "Cache-Control": "no-store" }
  });
}
