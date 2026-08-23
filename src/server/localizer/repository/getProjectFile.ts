import path from "node:path";
import { getDataDirectory } from "~/server/localizer/repository/getDataDirectory";
import { assertProjectId } from "~/server/localizer/repository/assertProjectId";

export function getProjectFile(projectId: string) {
  return path.join(
    getDataDirectory(),
    "projects",
    assertProjectId(projectId),
    "state.json",
  );
}
