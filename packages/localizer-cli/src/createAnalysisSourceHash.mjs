import { canonicalJson } from "./canonicalJson.mjs";
import { hashText } from "./hashText.mjs";

export function createAnalysisSourceHash(strings) {
  const canonicalStrings = strings
    .map((source) => ({
      ...source,
      occurrences: [...source.occurrences].sort((left, right) =>
        `${left.file}:${left.line}:${left.symbol ?? ""}`.localeCompare(
          `${right.file}:${right.line}:${right.symbol ?? ""}`,
        ),
      ),
    }))
    .sort((left, right) => left.stableKey.localeCompare(right.stableKey));
  return hashText(canonicalJson(canonicalStrings));
}
