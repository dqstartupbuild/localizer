import { getLocalCliEntrypoint } from "~/server/localizer/cli/getLocalCliEntrypoint";
import { quoteShellArgument } from "~/server/localizer/cli/quoteShellArgument";

export function createTargetRepositorySyncCommand() {
  return `node ${quoteShellArgument(getLocalCliEntrypoint())} sync`;
}
