import { readdir } from "node:fs/promises";
import { join, relative } from "node:path";

export async function findSwiftFiles(root, directory = root) {
  const entries = (await readdir(directory, { withFileTypes: true })).sort(
    (left, right) => left.name.localeCompare(right.name),
  );
  const files = [];
  for (const entry of entries) {
    if (
      [".git", ".build", "DerivedData", ".localizer", "Localizer"].includes(
        entry.name,
      )
    )
      continue;
    const fullPath = join(directory, entry.name);
    if (entry.isDirectory())
      files.push(...(await findSwiftFiles(root, fullPath)));
    if (entry.isFile() && entry.name.endsWith(".swift"))
      files.push({ fullPath, relativePath: relative(root, fullPath) });
  }
  return files.sort((left, right) =>
    left.relativePath.localeCompare(right.relativePath),
  );
}
