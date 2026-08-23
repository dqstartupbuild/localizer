import assert from "node:assert/strict";
import { getAvailablePort } from "./localizer-roundtrip/getAvailablePort.mjs";
import { requestText } from "./production-preview/requestText.mjs";
import { startProductionServer } from "./production-preview/startProductionServer.mjs";
import { waitForProductionPreview } from "./production-preview/waitForProductionPreview.mjs";

const port = await getAvailablePort();
const origin = `http://127.0.0.1:${port}`;
const app = startProductionServer(port);

try {
  await waitForProductionPreview(origin);
  const home = await requestText(origin, "/");
  assert.equal(home.response.status, 200);
  assert.match(home.text, /href="\/projects">Open dashboard/);

  const projects = await requestText(origin, "/projects");
  assert.equal(projects.response.status, 200);
  assert.match(projects.text, /This is sample data/);
  assert.match(projects.text, /cannot edit or save/);
  assert.match(projects.text, /Trail Notes/);
  assert.match(projects.text, /href="\/projects"/);
  assert.doesNotMatch(projects.text, /Create project/);

  const sampleOverview = await requestText(
    origin,
    "/projects/proj_preview/overview",
  );
  assert.equal(sampleOverview.response.status, 200);
  assert.doesNotMatch(sampleOverview.text, /127\.0\.0\.1|localhost/);

  const localizations = await requestText(
    origin,
    "/projects/proj_preview/localizations",
  );
  assert.equal(localizations.response.status, 200);
  assert.doesNotMatch(localizations.text, /Save translation|<textarea/);

  for (const path of [
    "/projects/proj_unknown/overview",
    "/projects/proj_preview/metadata",
    "/projects/proj_preview/screen-discovery",
    "/projects/proj_preview/screenshots",
    "/settings",
  ]) {
    const result = await requestText(origin, path);
    assert.equal(result.response.status, 404, `${path} must return 404`);
  }

  const localApi = await requestText(origin, "/api/localizer/v1/health");
  assert.equal(localApi.response.status, 503);
  assert.match(localApi.text, /service_unavailable/);

  const trpc = await requestText(
    origin,
    "/api/trpc/dashboard.summary?batch=1&input=%7B%220%22%3A%7B%22json%22%3Anull%7D%7D",
  );
  assert.equal(trpc.response.status, 403);
  assert.match(
    trpc.text,
    /Dashboard prototype data is available only in local development/,
  );
  assert.doesNotMatch(trpc.text, /Calisthenics Guppy/);
  console.log("Production public preview regression checks passed.");
} finally {
  app.kill("SIGTERM");
}
