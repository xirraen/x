import test from "node:test";
import assert from "node:assert/strict";
import { opportunities, searchOpportunities, normalizeBookmarkIds } from "../src/lib/opportunities.mjs";

test("search matches project names case-insensitively", () => {
  assert.deepEqual(searchOpportunities(opportunities, "mOnAd").map((x) => x.id), ["monad"]);
});

test("search matches category, chain, and tags", () => {
  assert.deepEqual(searchOpportunities(opportunities, "Layer 2").map((x) => x.id), ["megaeth", "abstract"]);
  assert.deepEqual(searchOpportunities(opportunities, "multichain").map((x) => x.id), ["hyperlane"]);
});

test("empty search returns all opportunities", () => {
  assert.equal(searchOpportunities(opportunities, "  ").length, opportunities.length);
});

test("bookmark normalization drops unknowns and duplicates", () => {
  assert.deepEqual(normalizeBookmarkIds(["monad", "monad", "unknown", 4], opportunities.map((x) => x.id)), ["monad"]);
});

test("invalid bookmark storage shapes safely return empty list", () => {
  assert.deepEqual(normalizeBookmarkIds(null, ["monad"]), []);
});
