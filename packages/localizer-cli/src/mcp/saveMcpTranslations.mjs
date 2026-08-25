import { readLocalizerConfig } from "../readLocalizerConfig.mjs";
import { requestJson } from "../requestJson.mjs";

export async function saveMcpTranslations(root, input) {
  const config = await readLocalizerConfig(root);
  const { data } = await requestJson(
    `${config.apiUrl}/api/localizer/v1/projects/${config.projectId}/translations`,
    {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(input),
    },
  );
  return data.project;
}
