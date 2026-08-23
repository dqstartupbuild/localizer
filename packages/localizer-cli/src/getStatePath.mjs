import { join } from "node:path";

export function getStatePath(root) {
  return join(root, ".localizer", "state.json");
}
