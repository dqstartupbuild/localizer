import { createHash } from "node:crypto";

export function hashText(value) {
  return `sha256:${createHash("sha256").update(value).digest("hex")}`;
}
