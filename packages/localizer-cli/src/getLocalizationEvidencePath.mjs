import { join } from "node:path";

export function getLocalizationEvidencePath(root) {
  return join(root, ".localizer", "localization-evidence.json");
}
