import { readdir } from "node:fs/promises";
import { join, relative } from "node:path";

const skippedDirectories = new Set([
  ".git",
  ".build",
  "DerivedData",
  ".localizer",
  "node_modules",
]);

export async function findFilesByExtension(root, extension, directory = root) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && skippedDirectories.has(entry.name)) continue;
    const fullPath = join(directory, entry.name);
    if (entry.isDirectory() && entry.name.endsWith(extension)) {
      files.push(relative(root, fullPath));
      continue;
    }
    if (entry.isDirectory())
      files.push(...(await findFilesByExtension(root, extension, fullPath)));
    if (entry.isFile() && entry.name.endsWith(extension))
      files.push(relative(root, fullPath));
  }
  return files.sort((left, right) => left.localeCompare(right));
}
