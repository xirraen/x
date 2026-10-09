import test from "node:test";
import assert from "node:assert/strict";
import { projectStatus } from "./index.js";

test("reports the project scaffold status", () => {
  assert.deepEqual(projectStatus(), {
    name: "xxx",
    status: "scaffold",
  });
});
