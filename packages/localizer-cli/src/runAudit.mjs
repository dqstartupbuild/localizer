import { createLocalizationAudit } from "./createLocalizationAudit.mjs";
import { inspectXcodeLocalization } from "./mcp/inspectXcodeLocalization.mjs";
import { runNativeAnalyzer } from "./runNativeAnalyzer.mjs";

export async function runAudit(root) {
  const [analysis, xcode] = await Promise.all([
    runNativeAnalyzer(root),
    inspectXcodeLocalization(root),
  ]);
  const audit = createLocalizationAudit(analysis, xcode);
  console.log(JSON.stringify(audit, null, 2));
  if (audit.status === "action_required") process.exitCode = 1;
}
