import { appendFile, readFile } from "node:fs/promises";
import { join } from "node:path";
import { ensureSafeApiUrl } from "./ensureSafeApiUrl.mjs";
import { getConfigPath } from "./getConfigPath.mjs";
import { getStatePath } from "./getStatePath.mjs";
import { requestJson } from "./requestJson.mjs";
import { writeJson } from "./writeJson.mjs";
import { runAnalyze } from "./runAnalyze.mjs";

export async function runInit(root, options) {
  if (typeof options.project !== "string")
    throw new Error("init requires --project <project-id>.");
  const apiUrl = ensureSafeApiUrl(
    typeof options.api === "string" ? options.api : "http://localhost:3000",
  );
  await requestJson(`${apiUrl}/api/localizer/v1/health`);
  const { data } = await requestJson(
    `${apiUrl}/api/localizer/v1/projects/${options.project}`,
  );
  await writeJson(getConfigPath(root), {
    schemaVersion: 1,
    projectId: data.project.id,
    apiUrl,
  });
  await writeJson(getStatePath(root), {
    schemaVersion: 1,
    lastRevision: null,
    syncEtag: null,
  });
  const ignore = join(root, ".gitignore");
  const current = await readFile(ignore, "utf8").catch(() => "");
  if (!current.includes(".localizer/"))
    await appendFile(
      ignore,
      `${current && !current.endsWith("\n") ? "\n" : ""}.localizer/\nLocalizer/Generated/*.localizer-hash\n`,
    );
  if (!options["skip-analysis"]) await runAnalyze(root, {});
  console.log(`Connected ${data.project.name} to ${apiUrl}.`);
}
