import { productionPreviewProject } from "~/server/localizer/preview/productionPreviewProject";

export function getProductionPreviewProject(projectId: string) {
  return projectId === productionPreviewProject.id
    ? productionPreviewProject
    : null;
}
