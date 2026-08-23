export function assertProjectId(projectId: string) {
  if (!/^proj_[a-z0-9]+$/.test(projectId))
    throw new Error("Project not found.");
  return projectId;
}
