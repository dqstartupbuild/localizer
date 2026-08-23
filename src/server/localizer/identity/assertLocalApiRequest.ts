import { requireDevelopmentWorkspace } from "~/server/localizer/services/requireDevelopmentWorkspace";

export function assertLocalApiRequest(request: Request) {
  requireDevelopmentWorkspace();
  void request;
}
