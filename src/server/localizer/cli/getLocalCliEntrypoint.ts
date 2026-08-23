import path from "node:path";

export function getLocalCliEntrypoint() {
  return path.resolve(
    process.cwd(),
    "packages",
    "localizer-cli",
    "src",
    "index.mjs",
  );
}
