import { translationPatchInputSchema } from "~/server/localizer/schemas/projectInput/translationPatchInputSchema";
import { mutateProjectState } from "~/server/localizer/repository/mutateProjectState";

export async function patchTranslation(
  projectId: string,
  stableKey: string,
  input: unknown,
) {
  const value = translationPatchInputSchema.parse(input);
  const result = await mutateProjectState(projectId, (current) => {
    if (current.revision !== value.expectedRevision)
      throw new Error("This project changed. Refresh and try again.");
    if (!current.locales.includes(value.locale))
      throw new Error("That locale is not enabled for this project.");
    const source = current.strings.find(
      (entry) => entry.stableKey === stableKey,
    );
    if (!source || source.stale)
      throw new Error("That active source string was not found.");
    const updatedAt = new Date().toISOString();
    const translation = {
      locale: value.locale,
      value: value.value,
      origin: "manual" as const,
      status: "approved" as const,
      updatedAt,
      sourceTextHash: source.sourceTextHash,
    };
    const strings = current.strings.map((entry) =>
      entry.stableKey !== stableKey
        ? entry
        : {
            ...entry,
            translations: [
              ...entry.translations.filter(
                (item) => item.locale !== value.locale,
              ),
              translation,
            ],
          },
    );
    const project = {
      ...current,
      strings,
      revision: current.revision + 1,
      updatedAt,
    };
    return { state: project, result: project };
  });
  return result;
}
