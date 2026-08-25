import type { NextRequest } from "next/server";
import { localizerError } from "~/app/api/localizer/v1/localizerError";
import { localizerJson } from "~/app/api/localizer/v1/localizerJson";
import { parseJsonBody } from "~/app/api/localizer/v1/parseJsonBody";
import { assertLocalApiRequest } from "~/server/localizer/identity/assertLocalApiRequest";
import { patchTranslations } from "~/server/localizer/services/patchTranslations";

export const runtime = "nodejs";

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ projectId: string }> },
) {
  try {
    assertLocalApiRequest(request);
    const project = await patchTranslations(
      (await context.params).projectId,
      await parseJsonBody(request),
    );
    if (!project) throw new Error("Project not found.");
    return localizerJson({ project });
  } catch (error) {
    return localizerError(error);
  }
}
