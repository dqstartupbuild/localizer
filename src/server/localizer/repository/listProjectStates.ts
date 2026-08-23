import { readdir } from "node:fs/promises";
import path from "node:path";
import { getDataDirectory } from "~/server/localizer/repository/getDataDirectory";
import { readProjectState } from "~/server/localizer/repository/readProjectState";
import type { ProjectState } from "~/server/localizer/schemas/projectState/ProjectState";

export async function listProjectStates(): Promise<ProjectState[]> {
  const directory = path.join(getDataDirectory(), "projects");
  try {
    const entries = await readdir(directory, { withFileTypes: true });
    const projects = await Promise.all(
      entries
        .filter((entry) => entry.isDirectory())
        .map((entry) => readProjectState(entry.name)),
    );
    return projects
      .filter((project): project is ProjectState => project !== null)
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
}
