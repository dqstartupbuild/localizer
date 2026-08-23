import { resolveLocalWorkspace } from "~/server/localizer/identity/resolveLocalWorkspace";
import type { DashboardWorkspace } from "~/server/localizer/workspace/DashboardWorkspace";

export function resolveDashboardWorkspace(): DashboardWorkspace {
  return resolveLocalWorkspace()
    ? { mode: "local", label: "Local workspace" }
    : { mode: "public-preview", label: "Public preview" };
}
