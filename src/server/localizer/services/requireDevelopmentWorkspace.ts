import { resolveLocalWorkspace } from "~/server/localizer/identity/resolveLocalWorkspace";

export function requireDevelopmentWorkspace() {
  const workspace = resolveLocalWorkspace();
  if (!workspace)
    throw new Error(
      "Local API access is unavailable in production. Run Localizer locally for writable work.",
    );
  return workspace;
}
