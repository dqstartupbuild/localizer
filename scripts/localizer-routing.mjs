import assert from "node:assert/strict";
import { createLocalizationWorkflowRoute } from "../packages/localizer-cli/src/createLocalizationWorkflowRoute.mjs";

assert.equal(
  createLocalizationWorkflowRoute("inventory").recommendedTool,
  "cli",
);
assert.equal(
  createLocalizationWorkflowRoute("translate").recommendedTool,
  "mcp",
);
assert.equal(
  createLocalizationWorkflowRoute("resolve").recommendedTool,
  "skill",
);
assert.equal(
  createLocalizationWorkflowRoute("certify").recommendedTool,
  "skill_then_cli",
);
assert.throws(
  () => createLocalizationWorkflowRoute("everything"),
  /Unknown localization phase/,
);
console.log("Localizer routing contract passed.");
