import { mutateProjectState } from "~/server/localizer/repository/mutateProjectState";
import { translationBatchPatchInputSchema } from "~/server/localizer/schemas/projectInput/translationBatchPatchInputSchema";

export async function patchTranslations(projectId: string, input: unknown) {
  const value = translationBatchPatchInputSchema.parse(input);
  return mutateProjectState(projectId, (current) => {
    if (current.revision !== value.expectedRevision)
      throw new Error("This project changed. Refresh and try again.");
    const requested = new Map(
      value.translations.map((translation) => [
        `${translation.stableKey}:${translation.locale}`,
        translation,
      ]),
    );
    for (const translation of value.translations) {
      if (!current.locales.includes(translation.locale))
        throw new Error("That locale is not enabled for this project.");
      const source = current.strings.find(
        (entry) => entry.stableKey === translation.stableKey,
      );
      if (!source || source.stale)
        throw new Error("That active source string was not found.");
    }
    const updatedAt = new Date().toISOString();
    const strings = current.strings.map((source) => {
      const updates = [...requested.values()].filter(
        (translation) => translation.stableKey === source.stableKey,
      );
      if (!updates.length) return source;
      const replacedLocales = new Set(updates.map((item) => item.locale));
      return {
        ...source,
        translations: [
          ...source.translations.filter(
            (translation) => !replacedLocales.has(translation.locale),
          ),
          ...updates.map((translation) => ({
            locale: translation.locale,
            value: translation.value,
            origin: "manual" as const,
            status: "approved" as const,
            updatedAt,
            sourceTextHash: source.sourceTextHash,
          })),
        ],
      };
    });
    const project = {
      ...current,
      strings,
      revision: current.revision + 1,
      updatedAt,
    };
    return { state: project, result: project };
  });
}
