import { createHash } from "node:crypto";

export function hashText(value: string) {
  return `sha256:${createHash("sha256").update(value).digest("hex")}`;
}
