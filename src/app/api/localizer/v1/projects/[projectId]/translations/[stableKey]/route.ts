import type { NextRequest } from "next/server";
import { localizerError } from "~/app/api/localizer/v1/localizerError";
import { localizerJson } from "~/app/api/localizer/v1/localizerJson";
import { parseJsonBody } from "~/app/api/localizer/v1/parseJsonBody";
import { patchTranslation } from "~/server/localizer/services/patchTranslation";
import { assertLocalApiRequest } from "~/server/localizer/identity/assertLocalApiRequest";

export const runtime = "nodejs";

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ projectId: string; stableKey: string }> },
) {
  try {
    assertLocalApiRequest(request);
    const { projectId, stableKey } = await context.params;
    const project = await patchTranslation(
      projectId,
      stableKey,
      await parseJsonBody(request),
    );
    if (!project) throw new Error("Project not found.");
    return localizerJson({ project });
  } catch (error) {
    return localizerError(error);
  }
}
