import { mkdir, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { projectStateSchema } from "~/server/localizer/schemas/projectState/projectStateSchema";
import type { ProjectState } from "~/server/localizer/schemas/projectState/ProjectState";
import { getProjectFile } from "~/server/localizer/repository/getProjectFile";

export async function writeProjectState(nextState: ProjectState) {
  const state = projectStateSchema.parse(nextState);
  const file = getProjectFile(state.id);
  await mkdir(path.dirname(file), { recursive: true });
  const temporaryFile = `${file}.${randomUUID()}.tmp`;
  await writeFile(temporaryFile, `${JSON.stringify(state, null, 2)}\n`, "utf8");
  await rename(temporaryFile, file);
}
