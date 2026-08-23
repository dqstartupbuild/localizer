import { join } from "node:path";
import { assertSafeOutputPath } from "./assertSafeOutputPath.mjs";
import { getStatePath } from "./getStatePath.mjs";
import { readJson } from "./readJson.mjs";
import { requestJson } from "./requestJson.mjs";
import { hashText } from "./hashText.mjs";
import { readLocalizerConfig } from "./readLocalizerConfig.mjs";
import { readOptionalText } from "./readOptionalText.mjs";

export async function runStatus(root) {
  const config = await readLocalizerConfig(root);
  const state = await readJson(getStatePath(root));
  const catalog = await assertSafeOutputPath(
    root,
    join(root, "Localizer", "Generated", "Localizer.xcstrings"),
  );
  const marker = await assertSafeOutputPath(root, `${catalog}.localizer-hash`);
  const catalogContent = await readOptionalText(catalog);
  const expectedHash = await readOptionalText(marker);
  if (catalogContent === null && expectedHash !== null) {
    throw new Error(
      "The generated String Catalog was deleted outside Localizer. Run sync to create a pending review candidate.",
    );
  }
  if (
    catalogContent !== null &&
    (!expectedHash || hashText(catalogContent) !== expectedHash.trim())
  ) {
    throw new Error(
      "The generated String Catalog was modified outside Localizer. Run sync to create a pending review candidate.",
    );
  }
  const { data } = await requestJson(
    `${config.apiUrl}/api/localizer/v1/projects/${config.projectId}`,
  );
  console.log(
    JSON.stringify(
      {
        project: data.project.name,
        projectId: config.projectId,
        revision: data.project.revision,
        strings: data.project.strings.filter((item) => !item.stale).length,
        lastSyncRevision: state.lastRevision,
      },
      null,
      2,
    ),
  );
}
