import assert from "node:assert/strict";
import { request } from "./request.mjs";

export async function saveTranslation(
  apiUrl,
  projectId,
  stableKey,
  revision,
  value,
) {
  const { response, body } = await request(
    apiUrl,
    `/api/localizer/v1/projects/${projectId}/translations/${stableKey}`,
    {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        expectedRevision: revision,
        locale: "es-ES",
        value,
      }),
    },
  );
  assert.equal(response.status, 200);
  return body.project;
}
