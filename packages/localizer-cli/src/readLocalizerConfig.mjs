import { ensureSafeApiUrl } from "./ensureSafeApiUrl.mjs";
import { getConfigPath } from "./getConfigPath.mjs";
import { readJson } from "./readJson.mjs";

export async function readLocalizerConfig(root) {
  const config = await readJson(getConfigPath(root));
  if (
    !config ||
    config.schemaVersion !== 1 ||
    typeof config.projectId !== "string" ||
    !/^proj_[a-z0-9]+$/.test(config.projectId) ||
    typeof config.apiUrl !== "string"
  ) {
    throw new Error(
      "localizer.config.json is invalid. Run localizer init again.",
    );
  }
  return { ...config, apiUrl: ensureSafeApiUrl(config.apiUrl) };
}
