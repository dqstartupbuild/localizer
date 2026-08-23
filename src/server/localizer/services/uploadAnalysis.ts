import { analysisManifestSchema } from "~/server/localizer/schemas/projectInput/analysisManifestSchema";
import { hashText } from "~/server/localizer/utils/hashText";
import { mutateProjectState } from "~/server/localizer/repository/mutateProjectState";
import { createAnalysisSourceHash } from "~/server/localizer/utils/createAnalysisSourceHash";

export async function uploadAnalysis(projectId: string, input: unknown) {
  const manifest = analysisManifestSchema.parse(input);
  if (manifest.projectId !== projectId)
    throw new Error("Project ID does not match the request path.");
  const computedHash = createAnalysisSourceHash(manifest.strings);
  if (manifest.sourceHash !== computedHash) {
    throw new Error(
      "The analysis source hash does not match its normalized strings.",
    );
  }
  const result = await mutateProjectState(projectId, (current) => {
    if (current.analysis?.sourceHash === manifest.sourceHash) {
      return { state: current, result: { project: current, idempotent: true } };
    }
    const previous = new Map(
      current.strings.map((entry) => [entry.stableKey, entry]),
    );
    const uploaded = new Set(manifest.strings.map((entry) => entry.stableKey));
    const strings = manifest.strings.map((entry) => {
      const sourceTextHash = hashText(entry.sourceText);
      const existing = previous.get(entry.stableKey);
      const sourceChanged = existing?.sourceTextHash !== sourceTextHash;
      const translations = existing?.translations ?? [];
      return {
        ...entry,
        sourceTextHash,
        stale: false,
        translations: sourceChanged
          ? translations.map((translation) => ({
              ...translation,
              status: "needs_review" as const,
            }))
          : translations,
      };
    });
    for (const existing of current.strings) {
      if (!uploaded.has(existing.stableKey))
        strings.push({ ...existing, stale: true });
    }
    const updatedAt = new Date().toISOString();
    const project = {
      ...current,
      revision: current.revision + 1,
      updatedAt,
      analysis: {
        runId: manifest.runId,
        sourceHash: manifest.sourceHash,
        receivedAt: updatedAt,
        cliVersion: manifest.environment.cliVersion,
      },
      strings: strings.sort((left, right) =>
        left.stableKey.localeCompare(right.stableKey),
      ),
    };
    return { state: project, result: { project, idempotent: false } };
  });
  return result;
}
