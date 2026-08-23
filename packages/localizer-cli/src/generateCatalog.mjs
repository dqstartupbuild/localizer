import { hashText } from "./hashText.mjs";
import { atomicWriteText } from "./atomicWriteText.mjs";
import { assertSafeOutputPath } from "./assertSafeOutputPath.mjs";
import { readOptionalText } from "./readOptionalText.mjs";

export async function generateCatalog(root, file, bundle) {
  const safeFile = await assertSafeOutputPath(root, file);
  const marker = `${safeFile}.localizer-hash`;
  const candidate = `${safeFile}.pending`;
  await assertSafeOutputPath(root, marker);
  await assertSafeOutputPath(root, candidate);
  const strings = {};
  for (const translation of [...bundle.translations].sort((a, b) =>
    `${a.stableKey}:${a.locale}`.localeCompare(`${b.stableKey}:${b.locale}`),
  )) {
    const entry = strings[translation.sourceText] ?? { localizations: {} };
    entry.localizations[translation.locale] = {
      stringUnit: { state: "translated", value: translation.value },
    };
    strings[translation.sourceText] = entry;
  }
  const content = `${JSON.stringify({ sourceLanguage: bundle.project.sourceLocale, strings, version: "1.0" }, null, 2)}\n`;
  const existing = await readOptionalText(safeFile);
  const known = await readOptionalText(marker);
  if (existing === null && known !== null) {
    await atomicWriteText(candidate, content);
    throw new Error(
      `Refused to recreate a deleted generated catalog. Review ${candidate}.`,
    );
  }
  if (existing !== null && (!known || hashText(existing) !== known.trim())) {
    await atomicWriteText(candidate, content);
    throw new Error(
      `Refused to overwrite a hand-edited generated catalog. Review ${candidate}.`,
    );
  }
  await atomicWriteText(safeFile, content);
  await atomicWriteText(marker, `${hashText(content)}\n`);
}
