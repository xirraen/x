export const opportunities = [
  { id: "monad", name: "Monad", category: "Layer 1", chain: "Monad", status: "Potential", score: 92, raised: "$244M", task: "Testnet & ecosystem activity", tags: ["Testnet", "EVM"], demo: true },
  { id: "megaeth", name: "MegaETH", category: "Layer 2", chain: "Ethereum", status: "Research", score: 87, raised: "$20M", task: "Testnet interaction", tags: ["Testnet", "Layer 2"], demo: true },
  { id: "abstract", name: "Abstract", category: "Layer 2", chain: "Ethereum", status: "Ongoing", score: 81, raised: "$11M", task: "Explore ecosystem apps", tags: ["Ecosystem", "Layer 2"], demo: true },
  { id: "hyperlane", name: "Hyperlane", category: "Infrastructure", chain: "Multichain", status: "Research", score: 76, raised: "$18.5M", task: "Cross-chain activity", tags: ["Bridge", "Multichain"], demo: true }
];

export function searchOpportunities(items, query = "") {
  const normalized = String(query).trim().toLocaleLowerCase();
  if (!normalized) return [...items];
  return items.filter((item) =>
    [item.name, item.category, item.chain, item.status, item.task, ...(item.tags ?? [])]
      .some((value) => String(value).toLocaleLowerCase().includes(normalized))
  );
}

export function normalizeBookmarkIds(value, knownIds = []) {
  if (!Array.isArray(value)) return [];
  const allowed = new Set(knownIds);
  return [...new Set(value.filter((id) => typeof id === "string" && allowed.has(id)))];
}
