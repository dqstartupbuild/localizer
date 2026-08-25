import { join } from "node:path";
import { getStatePath } from "./getStatePath.mjs";
import { readJson } from "./readJson.mjs";
import { requestJson } from "./requestJson.mjs";
import { writeJson } from "./writeJson.mjs";
import { generateCatalog } from "./generateCatalog.mjs";
import { readLocalizerConfig } from "./readLocalizerConfig.mjs";
import { isGeneratedCatalogDeleted } from "./isGeneratedCatalogDeleted.mjs";
import { getGeneratedCatalogPath } from "./getGeneratedCatalogPath.mjs";

export async function runSync(root) {
  const config = await readLocalizerConfig(root);
  const state = await readJson(getStatePath(root));
  const deletedCatalog = await isGeneratedCatalogDeleted(root);
  const { response, data } = await requestJson(
    `${config.apiUrl}/api/localizer/v1/projects/${config.projectId}/sync-bundle`,
    {
      headers:
        state.syncEtag && !deletedCatalog
          ? { "if-none-match": state.syncEtag }
          : {},
    },
  );
  if (response.status === 304)
    return console.log("Translations are already current.");
  await writeJson(join(root, ".localizer", "translations-cache.json"), data);
  await generateCatalog(root, getGeneratedCatalogPath(root), data);
  await writeJson(getStatePath(root), {
    ...state,
    lastRevision: data.revision,
    syncEtag: response.headers.get("etag"),
  });
  console.log(
    `Wrote ${data.translations.length} translations to Localizer/Generated/Localizable.xcstrings.`,
  );
}
