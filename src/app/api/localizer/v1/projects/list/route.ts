import { localizerError } from "~/app/api/localizer/v1/localizerError";
import { localizerJson } from "~/app/api/localizer/v1/localizerJson";
import { listProjects } from "~/server/localizer/services/listProjects";
import { assertLocalApiRequest } from "~/server/localizer/identity/assertLocalApiRequest";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    assertLocalApiRequest(request);
    return localizerJson({ projects: await listProjects() });
  } catch (error) {
    return localizerError(error);
  }
}
