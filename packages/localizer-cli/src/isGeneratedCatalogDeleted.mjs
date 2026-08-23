import { join } from "node:path";
import { assertSafeOutputPath } from "./assertSafeOutputPath.mjs";
import { readOptionalText } from "./readOptionalText.mjs";

export async function isGeneratedCatalogDeleted(root) {
  const catalog = await assertSafeOutputPath(
    root,
    join(root, "Localizer", "Generated", "Localizer.xcstrings"),
  );
  const marker = await assertSafeOutputPath(root, `${catalog}.localizer-hash`);
  const [catalogContent, markerContent] = await Promise.all([
    readOptionalText(catalog),
    readOptionalText(marker),
  ]);
  return catalogContent === null && markerContent !== null;
}
