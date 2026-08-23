import { localizerError } from "~/app/api/localizer/v1/localizerError";
import { localizerJson } from "~/app/api/localizer/v1/localizerJson";
import { getProject } from "~/server/localizer/services/getProject";
import { assertLocalApiRequest } from "~/server/localizer/identity/assertLocalApiRequest";

export const runtime = "nodejs";

export async function GET(
  request: Request,
  context: { params: Promise<{ projectId: string }> },
) {
  try {
    assertLocalApiRequest(request);
    const project = await getProject((await context.params).projectId);
    if (!project) throw new Error("Project not found.");
    return localizerJson({ project });
  } catch (error) {
    return localizerError(error);
  }
}
