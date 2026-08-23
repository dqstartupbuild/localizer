import { randomUUID } from "node:crypto";
import { resolve } from "node:path";
import { getStatePath } from "./getStatePath.mjs";
import { readJson } from "./readJson.mjs";
import { requestJson } from "./requestJson.mjs";
import { scanSwiftUiLiterals } from "./scanSwiftUiLiterals.mjs";
import { writeJson } from "./writeJson.mjs";
import { createAnalysisSourceHash } from "./createAnalysisSourceHash.mjs";
import { readLocalizerConfig } from "./readLocalizerConfig.mjs";

export async function runAnalyze(root, options) {
  const config = await readLocalizerConfig(root);
  const base =
    typeof options.manifest === "string"
      ? await readJson(resolve(root, options.manifest))
      : { strings: await scanSwiftUiLiterals(root) };
  const strings = base.strings;
  const manifest = {
    schemaVersion: 1,
    projectId: config.projectId,
    runId: `run_${randomUUID()}`,
    sourceHash: createAnalysisSourceHash(strings),
    environment: {
      cliVersion: "0.1.0",
      xcodeVersion: null,
      swiftVersion: null,
    },
    strings,
  };
  const { data } = await requestJson(
    `${config.apiUrl}/api/localizer/v1/projects/${config.projectId}/analysis-runs`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(manifest),
    },
  );
  const state = await readJson(getStatePath(root));
  await writeJson(getStatePath(root), {
    ...state,
    lastRevision: data.project.revision,
    lastAnalysis: {
      runId: manifest.runId,
      sourceHash: manifest.sourceHash,
      stringCount: strings.length,
    },
  });
  console.log(
    data.idempotent
      ? "Analysis is already current."
      : `Uploaded ${strings.length} supported SwiftUI strings.`,
  );
}
