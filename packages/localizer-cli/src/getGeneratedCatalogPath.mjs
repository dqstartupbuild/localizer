import { join } from "node:path";

export function getGeneratedCatalogPath(root) {
  return join(root, "Localizer", "Generated", "Localizable.xcstrings");
}
