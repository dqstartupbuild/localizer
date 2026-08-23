import { localizerJson } from "~/app/api/localizer/v1/localizerJson";
import { localizerError } from "~/app/api/localizer/v1/localizerError";
import { assertLocalApiRequest } from "~/server/localizer/identity/assertLocalApiRequest";

export const runtime = "nodejs";

export function GET(request: Request) {
  try {
    assertLocalApiRequest(request);
    const workspace = { workspaceId: "local-development-workspace" };
    return localizerJson({
      status: "ok",
      protocolVersion: 1,
      workspace: workspace.workspaceId,
    });
  } catch (error) {
    return localizerError(error);
  }
}
