import assert from "node:assert/strict";
import { request } from "./request.mjs";

export async function createProject(apiUrl) {
  const { response, body } = await request(
    apiUrl,
    "/api/localizer/v1/projects",
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: "CLI round trip",
        sourceLocale: "en-US",
        locales: ["es-ES"],
      }),
    },
  );
  assert.equal(response.status, 201);
  return body.project;
}
