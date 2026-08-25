import assert from "node:assert/strict";
import { createStrictLocalizationCheck } from "../packages/localizer-cli/src/createStrictLocalizationCheck.mjs";

const project = {
  sourceLocale: "en-US",
  locales: ["en-US", "es-ES", "ar"],
  strings: [
    {
      stableKey: "home.title",
      stale: false,
      translations: [
        { locale: "es-ES", value: "Inicio", status: "approved" },
        { locale: "ar", value: "الرئيسية", status: "approved" },
      ],
    },
  ],
};
const evidence = {
  schemaVersion: 1,
  declaredScope: {
    targets: ["Example"],
    userFacingSurfaces: ["SwiftUI", "Info.plist"],
    requiredFlows: ["Onboarding"],
  },
  humanReview: {
    reviewer: "Jane Reviewer",
    reviewedAt: "2026-08-25T00:00:00.000Z",
    longTextChecked: true,
    rtlChecked: true,
    dynamicContentChecked: true,
  },
};
const verification = {
  schemaVersion: 1,
  results: [
    { locale: "es-ES", passed: true },
    { locale: "ar", passed: true },
  ],
};
const complete = createStrictLocalizationCheck({
  audit: { findings: [] },
  project,
  verification,
  evidence,
});
assert.equal(complete.status, "certification_ready");
const incomplete = createStrictLocalizationCheck({
  audit: { findings: [] },
  project,
  verification: null,
  evidence: null,
});
assert.equal(incomplete.status, "action_required");
assert.deepEqual(incomplete.findings.map((item) => item.code).sort(), [
  "missing_completion_evidence",
  "missing_localized_verification",
]);
console.log("Localizer strict check contract passed.");
