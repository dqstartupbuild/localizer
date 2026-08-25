import { resolve } from "node:path";
import { writeJson } from "./writeJson.mjs";
import { createXcodeTestArguments } from "./verification/createXcodeTestArguments.mjs";
import { parseLocales } from "./verification/parseLocales.mjs";
import { runXcodeTest } from "./verification/runXcodeTest.mjs";

export async function runLocalizedVerification(root, options) {
  if (typeof options.xcodeproj !== "string")
    throw new Error("verify requires --xcodeproj <path-to-project.xcodeproj>.");
  if (typeof options.scheme !== "string")
    throw new Error("verify requires --scheme <scheme-name>.");
  if (typeof options.destination !== "string")
    throw new Error("verify requires --destination <xcodebuild-destination>.");
  const project = resolve(root, options.xcodeproj);
  const locales = parseLocales(options.locales);
  const results = [];
  for (const locale of locales) {
    const argumentsList = createXcodeTestArguments({
      project,
      scheme: options.scheme,
      destination: options.destination,
      locale,
    });
    const exitCode = await runXcodeTest(argumentsList);
    results.push({ locale, exitCode, passed: exitCode === 0 });
  }
  const report = {
    schemaVersion: 1,
    project,
    scheme: options.scheme,
    destination: options.destination,
    verifiedAt: new Date().toISOString(),
    results,
  };
  await writeJson(
    resolve(root, ".localizer", "localized-verification.json"),
    report,
  );
  if (results.some((result) => !result.passed)) {
    process.exitCode = 1;
    console.error(
      "Localized Xcode tests failed. Review .localizer/localized-verification.json.",
    );
    return;
  }
  console.log("Localized Xcode tests passed.");
}
