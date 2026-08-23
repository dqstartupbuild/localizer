import { readFile } from "node:fs/promises";
import { projectStateSchema } from "~/server/localizer/schemas/projectState/projectStateSchema";
import type { ProjectState } from "~/server/localizer/schemas/projectState/ProjectState";
import { getProjectFile } from "~/server/localizer/repository/getProjectFile";

export async function readProjectState(
  projectId: string,
): Promise<ProjectState | null> {
  try {
    const data = await readFile(getProjectFile(projectId), "utf8");
    return projectStateSchema.parse(JSON.parse(data));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}
