import { localizerJson } from "~/app/api/localizer/v1/localizerJson";
import { assertLocalApiRequest } from "~/server/localizer/identity/assertLocalApiRequest";

export const runtime = "nodejs";

export function GET(request: Request) {
  assertLocalApiRequest(request);
  const workspace = { workspaceId: "local-development-workspace" };
  return localizerJson({
    status: "ok",
    protocolVersion: 1,
    workspace: workspace.workspaceId,
  });
}
