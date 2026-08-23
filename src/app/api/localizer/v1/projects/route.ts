import type { NextRequest } from "next/server";
import { localizerError } from "~/app/api/localizer/v1/localizerError";
import { localizerJson } from "~/app/api/localizer/v1/localizerJson";
import { parseJsonBody } from "~/app/api/localizer/v1/parseJsonBody";
import { createProject } from "~/server/localizer/services/createProject";
import { assertLocalApiRequest } from "~/server/localizer/identity/assertLocalApiRequest";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    assertLocalApiRequest(request);
    const project = await createProject(await parseJsonBody(request));
    return localizerJson({ project }, { status: 201 });
  } catch (error) {
    return localizerError(error);
  }
}
