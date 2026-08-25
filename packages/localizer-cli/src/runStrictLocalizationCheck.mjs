import { createLocalizationAudit } from "./createLocalizationAudit.mjs";
import { createStrictLocalizationCheck } from "./createStrictLocalizationCheck.mjs";
import { getLocalizationEvidencePath } from "./getLocalizationEvidencePath.mjs";
import { readOptionalJson } from "./readOptionalJson.mjs";
import { readLocalizerConfig } from "./readLocalizerConfig.mjs";
import { requestJson } from "./requestJson.mjs";
import { runNativeAnalyzer } from "./runNativeAnalyzer.mjs";
import { inspectXcodeLocalization } from "./mcp/inspectXcodeLocalization.mjs";

export async function runStrictLocalizationCheck(root, options) {
  if (options.strict !== true)
    throw new Error("check requires --strict. Use localizer check --strict.");
  const config = await readLocalizerConfig(root);
  const [analysis, xcode, verification, evidence, response] = await Promise.all(
    [
      runNativeAnalyzer(root),
      inspectXcodeLocalization(root),
      readOptionalJson(`${root}/.localizer/localized-verification.json`),
      readOptionalJson(getLocalizationEvidencePath(root)),
      requestJson(
        `${config.apiUrl}/api/localizer/v1/projects/${config.projectId}`,
      ),
    ],
  );
  const check = createStrictLocalizationCheck({
    audit: createLocalizationAudit(analysis, xcode),
    project: response.data.project,
    verification,
    evidence,
  });
  console.log(JSON.stringify(check, null, 2));
  if (check.status !== "certification_ready") process.exitCode = 1;
}
