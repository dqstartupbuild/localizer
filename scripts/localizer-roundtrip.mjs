import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createProject } from "./localizer-roundtrip/createProject.mjs";
import { getAvailablePort } from "./localizer-roundtrip/getAvailablePort.mjs";
import { request } from "./localizer-roundtrip/request.mjs";
import { runCli } from "./localizer-roundtrip/runCli.mjs";
import { saveTranslation } from "./localizer-roundtrip/saveTranslation.mjs";
import { startDevelopmentServer } from "./localizer-roundtrip/startDevelopmentServer.mjs";
import { waitForHealth } from "./localizer-roundtrip/waitForHealth.mjs";
import { saveMcpTranslations } from "../packages/localizer-cli/src/mcp/saveMcpTranslations.mjs";

const root = await mkdtemp(join(tmpdir(), "localizer-roundtrip-repository-"));
const emptyRoot = await mkdtemp(join(tmpdir(), "localizer-roundtrip-empty-"));
const dataDirectory = await mkdtemp(
  join(tmpdir(), "localizer-roundtrip-data-"),
);
const port = await getAvailablePort();
const apiUrl = `http://127.0.0.1:${port}`;
const app = startDevelopmentServer(port, dataDirectory);

try {
  await waitForHealth(apiUrl);
  await writeFile(
    join(root, "AppView.swift"),
    'import SwiftUI\nstruct AppView: View {\n  var body: some View {\n    VStack {\n      Text("Welcome back")\n      Text("Welcome back")\n    }\n  }\n}\n',
  );
  const project = await createProject(apiUrl);
  await runCli(["init", "--project", project.id, "--api", apiUrl], root);
  let { body: state } = await request(
    apiUrl,
    `/api/localizer/v1/projects/${project.id}`,
  );
  const stableKey = state.project.strings[0].stableKey;
  assert.equal(state.project.strings.length, 1);
  assert.equal(state.project.strings[0].occurrences.length, 2);
  await saveMcpTranslations(root, {
    expectedRevision: state.project.revision,
    translations: [
      {
        stableKey,
        locale: "es-ES",
        value: "Te damos la bienvenida",
      },
    ],
  });
  await runCli(["sync"], root);
  const catalogFile = join(
    root,
    "Localizer",
    "Generated",
    "Localizable.xcstrings",
  );
  const firstCatalog = await readFile(catalogFile, "utf8");
  assert.match(firstCatalog, /"Welcome back"/);
  assert.match(firstCatalog, /Te damos la bienvenida/);
  assert.equal(firstCatalog.match(/"Welcome back"/g)?.length, 1);
  await writeFile(
    join(root, "AppView.swift"),
    '// An unrelated source line must not change the literal identity.\nimport SwiftUI\nstruct AppView: View {\n  var body: some View {\n    VStack {\n      Text("Welcome back")\n      Text("Welcome back")\n    }\n  }\n}\n',
  );
  await runCli(["analyze"], root);
  ({ body: state } = await request(
    apiUrl,
    `/api/localizer/v1/projects/${project.id}`,
  ));
  assert.equal(state.project.strings.length, 1);
  assert.equal(state.project.strings[0].stableKey, stableKey);
  assert.equal(state.project.strings[0].translations[0].status, "approved");
  await runCli(["sync"], root);
  assert.equal(await readFile(catalogFile, "utf8"), firstCatalog);

  await writeFile(
    join(root, "changed-manifest.json"),
    JSON.stringify({
      strings: [
        {
          stableKey,
          sourceText: "Welcome again",
          developerComment: null,
          occurrences: [{ file: "AppView.swift", line: 3, symbol: null }],
        },
      ],
    }),
  );
  await runCli(["analyze", "--manifest", "changed-manifest.json"], root);
  ({ body: state } = await request(
    apiUrl,
    `/api/localizer/v1/projects/${project.id}`,
  ));
  assert.equal(
    state.project.strings[0].translations[0].value,
    "Te damos la bienvenida",
  );
  assert.equal(state.project.strings[0].translations[0].status, "needs_review");
  const { body: pendingBundle } = await request(
    apiUrl,
    `/api/localizer/v1/projects/${project.id}/sync-bundle`,
  );
  assert.equal(pendingBundle.translations.length, 0);
  const invalidManifest = {
    schemaVersion: 1,
    projectId: project.id,
    runId: "bad-hash",
    sourceHash:
      "sha256:0000000000000000000000000000000000000000000000000000000000000000",
    environment: {
      cliVersion: "0.1.0",
      xcodeVersion: null,
      swiftVersion: null,
    },
    strings: [
      {
        stableKey,
        sourceText: "Conflicting text",
        developerComment: null,
        occurrences: [{ file: "AppView.swift", line: 2, symbol: null }],
      },
    ],
  };
  const mismatch = await request(
    apiUrl,
    `/api/localizer/v1/projects/${project.id}/analysis-runs`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(invalidManifest),
    },
  );
  assert.equal(mismatch.response.status, 400);
  const approved = await saveTranslation(
    apiUrl,
    project.id,
    stableKey,
    state.project.revision,
    "Te damos la bienvenida otra vez",
  );
  await runCli(["sync"], root);
  const reviewedCatalog = await readFile(catalogFile, "utf8");
  assert.match(reviewedCatalog, /"Welcome again"/);
  assert.match(reviewedCatalog, /Te damos la bienvenida otra vez/);

  await writeFile(catalogFile, "manually changed\n");
  await assert.rejects(() => runCli(["status"], root));
  await saveTranslation(
    apiUrl,
    project.id,
    stableKey,
    approved.revision,
    "Valor cambiado",
  );
  await assert.rejects(() => runCli(["sync"], root));
  await readFile(`${catalogFile}.pending`, "utf8");

  const emptyProject = await createProject(apiUrl);
  await runCli(
    ["init", "--project", emptyProject.id, "--api", apiUrl],
    emptyRoot,
  );
  await runCli(["sync"], emptyRoot);
  const emptyCatalog = join(
    emptyRoot,
    "Localizer",
    "Generated",
    "Localizable.xcstrings",
  );
  assert.match(await readFile(emptyCatalog, "utf8"), /"strings": \{\}/);
  await runCli(["status"], emptyRoot);
  await writeFile(emptyCatalog, "");
  await assert.rejects(() => runCli(["status"], emptyRoot));
  await rm(emptyCatalog);
  await assert.rejects(() => runCli(["status"], emptyRoot));
  await assert.rejects(() => runCli(["sync"], emptyRoot));
  await readFile(`${emptyCatalog}.pending`, "utf8");
  console.log("Localizer CLI/API round trip passed.");
} finally {
  app.kill("SIGTERM");
  await rm(root, { recursive: true, force: true });
  await rm(emptyRoot, { recursive: true, force: true });
  await rm(dataDirectory, { recursive: true, force: true });
}
