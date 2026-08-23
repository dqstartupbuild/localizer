import { readProjectState } from "~/server/localizer/repository/readProjectState";

export function getProject(projectId: string) {
  return readProjectState(projectId);
}
