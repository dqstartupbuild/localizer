import { localizerError } from "~/app/api/localizer/v1/localizerError";
import { localizerJson } from "~/app/api/localizer/v1/localizerJson";
import { getSyncBundle } from "~/server/localizer/services/getSyncBundle";
import { assertLocalApiRequest } from "~/server/localizer/identity/assertLocalApiRequest";

export const runtime = "nodejs";

export async function GET(
  request: Request,
  context: { params: Promise<{ projectId: string }> },
) {
  try {
    assertLocalApiRequest(request);
    const bundle = await getSyncBundle((await context.params).projectId);
    if (!bundle)
      throw new Error("Project not found or has no accepted analysis.");
    const etag = `\"localizer-${bundle.revision}\"`;
    if (request.headers.get("if-none-match") === etag)
      return new Response(null, {
        status: 304,
        headers: { ETag: etag, "Cache-Control": "no-store" },
      });
    return localizerJson(bundle, { headers: { ETag: etag } });
  } catch (error) {
    return localizerError(error);
  }
}
