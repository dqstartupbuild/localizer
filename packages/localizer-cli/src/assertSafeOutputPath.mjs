import { lstat, realpath } from "node:fs/promises";
import { relative, resolve, sep } from "node:path";

export async function assertSafeOutputPath(root, file) {
  const realRoot = await realpath(root);
  const requestedRoot = resolve(root);
  const requestedFile = resolve(file);
  const requestedRelative = relative(requestedRoot, requestedFile);
  const realRelative = relative(realRoot, requestedFile);
  const isInside = (value) =>
    value && value !== ".." && !value.startsWith(`..${sep}`);
  const relativeFile = isInside(requestedRelative)
    ? requestedRelative
    : realRelative;
  if (!isInside(relativeFile)) {
    throw new Error("Localizer output must stay inside the repository root.");
  }
  const absoluteFile = resolve(realRoot, relativeFile);
  const parts = relativeFile.split(sep);
  let current = realRoot;
  for (const part of parts.slice(0, -1)) {
    current = resolve(current, part);
    try {
      if ((await lstat(current)).isSymbolicLink())
        throw new Error("Localizer refuses to write through a symbolic link.");
    } catch (error) {
      if (error?.code !== "ENOENT") throw error;
    }
  }
  return absoluteFile;
}
