import { getProject } from "~/server/localizer/services/getProject";

export async function getSyncBundle(projectId: string) {
  const project = await getProject(projectId);
  if (!project?.analysis) return null;
  return {
    schemaVersion: 1 as const,
    revision: project.revision,
    project: {
      id: project.id,
      name: project.name,
      sourceLocale: project.sourceLocale,
    },
    analysis: {
      runId: project.analysis.runId,
      sourceHash: project.analysis.sourceHash,
    },
    locales: project.locales.filter(
      (locale) => locale !== project.sourceLocale,
    ),
    translations: project.strings.flatMap((source) =>
      source.stale
        ? []
        : source.translations
            .filter((translation) => translation.status === "approved")
            .map((translation) => ({
              stableKey: source.stableKey,
              sourceText: source.sourceText,
              ...translation,
            })),
    ),
  };
}
