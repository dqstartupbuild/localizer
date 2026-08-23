import { readFile } from "node:fs/promises";
import { findSwiftFiles } from "./findSwiftFiles.mjs";
import { createStableKey } from "./createStableKey.mjs";

export async function scanSwiftUiLiterals(root) {
  const found = new Map();
  for (const file of await findSwiftFiles(root)) {
    const lines = (await readFile(file.fullPath, "utf8")).split(/\r?\n/);
    lines.forEach((line, index) => {
      const match = line.match(
        /\b(?:Text|Label|Button|navigationTitle|alert)\s*\(\s*\"((?:\\.|[^\"])*)\"/,
      );
      if (!match?.[1]) return;
      const sourceText = match[1].replace(/\\\"/g, '"').replace(/\\n/g, "\n");
      if (!sourceText.trim() || /\\\(/.test(sourceText)) return;
      const stableKey = createStableKey(sourceText);
      const current = found.get(stableKey) ?? {
        stableKey,
        sourceText,
        developerComment: null,
        occurrences: [],
      };
      current.occurrences.push({
        file: file.relativePath,
        line: index + 1,
        symbol: null,
      });
      found.set(stableKey, current);
    });
  }
  for (const source of found.values()) {
    source.occurrences.sort((left, right) =>
      `${left.file}:${left.line}`.localeCompare(`${right.file}:${right.line}`),
    );
  }
  return [...found.values()].sort((left, right) =>
    left.stableKey.localeCompare(right.stableKey),
  );
}
