import { join } from "node:path";

export function getConfigPath(root) {
  return join(root, "localizer.config.json");
}
