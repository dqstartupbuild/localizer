import { resolveLocalWorkspace } from "~/server/localizer/identity/resolveLocalWorkspace";

export function requireDevelopmentWorkspace() {
  const workspace = resolveLocalWorkspace();
  if (!workspace)
    throw new Error("Local development access is unavailable in production.");
  return workspace;
}
