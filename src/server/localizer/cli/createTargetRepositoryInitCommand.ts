import { getLocalCliEntrypoint } from "~/server/localizer/cli/getLocalCliEntrypoint";
import { quoteShellArgument } from "~/server/localizer/cli/quoteShellArgument";

export function createTargetRepositoryInitCommand(
  projectId: string,
  apiUrl: string,
) {
  return `node ${quoteShellArgument(getLocalCliEntrypoint())} init --project ${quoteShellArgument(projectId)} --api ${quoteShellArgument(apiUrl)}`;
}
