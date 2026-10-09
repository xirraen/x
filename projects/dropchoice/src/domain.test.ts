import {describe,expect,it} from "vitest";
import {filterOpportunities,opportunities} from "./domain";
describe("filterOpportunities",()=>{
it("returns all records for an empty query",()=>expect(filterOpportunities(opportunities,"","All")).toHaveLength(3));
it("filters text case-insensitively",()=>expect(filterOpportunities(opportunities,"ethereum","All").map(x=>x.id)).toEqual(["demo-01"]));
it("filters evaluation",()=>expect(filterOpportunities(opportunities,"","Avoid").map(x=>x.id)).toEqual(["demo-03"]));
it("combines text and evaluation",()=>expect(filterOpportunities(opportunities,"testnet","Proceed with caution").map(x=>x.id)).toEqual(["demo-02"]));
});