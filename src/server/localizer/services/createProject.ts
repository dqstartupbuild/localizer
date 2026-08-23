import { randomUUID } from "node:crypto";
import { createProjectInputSchema } from "~/server/localizer/schemas/projectInput/createProjectInputSchema";
import { writeProjectState } from "~/server/localizer/repository/writeProjectState";

export async function createProject(input: unknown) {
  const value = createProjectInputSchema.parse(input);
  const now = new Date().toISOString();
  const project = {
    schemaVersion: 1 as const,
    id: `proj_${randomUUID().replaceAll("-", "").slice(0, 16)}`,
    name: value.name,
    sourceLocale: value.sourceLocale,
    locales: [...new Set([value.sourceLocale, ...value.locales])],
    revision: 0,
    createdAt: now,
    updatedAt: now,
    analysis: null,
    strings: [],
  };
  await writeProjectState(project);
  return project;
}
