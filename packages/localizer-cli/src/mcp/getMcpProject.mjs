import { readLocalizerConfig } from "../readLocalizerConfig.mjs";
import { requestJson } from "../requestJson.mjs";

export async function getMcpProject(root) {
  const config = await readLocalizerConfig(root);
  const { data } = await requestJson(
    `${config.apiUrl}/api/localizer/v1/projects/${config.projectId}`,
  );
  return data.project;
}
