import path from "node:path";

export function getDataDirectory() {
  return path.resolve(process.env.LOCALIZER_DATA_DIR ?? ".localizer-dev");
}
