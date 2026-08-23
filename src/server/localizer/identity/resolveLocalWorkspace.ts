import { localWorkspace } from "~/server/localizer/identity/localWorkspace";

export function resolveLocalWorkspace() {
  if (process.env.NODE_ENV !== "development" && process.env.NODE_ENV !== "test")
    return null;
  return localWorkspace;
}
