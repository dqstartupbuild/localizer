import { createHash } from "node:crypto";

export function createStableKey(sourceText) {
  return `swiftui_${createHash("sha256").update(sourceText).digest("hex").slice(0, 16)}`;
}
