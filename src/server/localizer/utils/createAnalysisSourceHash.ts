import { canonicalJson } from "~/server/localizer/utils/canonicalJson";
import { hashText } from "~/server/localizer/utils/hashText";

type AnalysisString = {
  stableKey: string;
  sourceText: string;
  developerComment: string | null;
  occurrences: { file: string; line: number; symbol: string | null }[];
};

export function createAnalysisSourceHash(strings: AnalysisString[]) {
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
