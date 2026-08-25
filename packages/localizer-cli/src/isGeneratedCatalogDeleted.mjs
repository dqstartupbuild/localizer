import { assertSafeOutputPath } from "./assertSafeOutputPath.mjs";
import { getGeneratedCatalogPath } from "./getGeneratedCatalogPath.mjs";
import { readOptionalText } from "./readOptionalText.mjs";

export async function isGeneratedCatalogDeleted(root) {
  const catalog = await assertSafeOutputPath(
    root,
    getGeneratedCatalogPath(root),
  );
  const marker = await assertSafeOutputPath(root, `${catalog}.localizer-hash`);
  const [catalogContent, markerContent] = await Promise.all([
    readOptionalText(catalog),
    readOptionalText(marker),
  ]);
  return catalogContent === null && markerContent !== null;
}
