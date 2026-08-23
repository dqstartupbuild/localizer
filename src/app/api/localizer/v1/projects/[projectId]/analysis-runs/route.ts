import type { NextRequest } from "next/server";
import { localizerError } from "~/app/api/localizer/v1/localizerError";
import { localizerJson } from "~/app/api/localizer/v1/localizerJson";
import { parseJsonBody } from "~/app/api/localizer/v1/parseJsonBody";
import { assertLocalApiRequest } from "~/server/localizer/identity/assertLocalApiRequest";
import { uploadAnalysis } from "~/server/localizer/services/uploadAnalysis";

export const runtime = "nodejs";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ projectId: string }> },
) {
  try {
    assertLocalApiRequest(request);
    const result = await uploadAnalysis(
      (await context.params).projectId,
      await parseJsonBody(request),
    );
    if (!result) throw new Error("Project not found.");
    return localizerJson({
      project: result.project,
      idempotent: result.idempotent,
    });
  } catch (error) {
    return localizerError(error);
  }
}
