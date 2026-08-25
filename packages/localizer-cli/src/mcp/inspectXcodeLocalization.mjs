import { findFilesByExtension } from "./findFilesByExtension.mjs";
import { inspectCatalogBuildPhase } from "./inspectCatalogBuildPhase.mjs";

export async function inspectXcodeLocalization(root) {
  const [catalogs, stringsFiles, stringsDictFiles, projectFiles, workspaces] =
    await Promise.all([
      findFilesByExtension(root, ".xcstrings"),
      findFilesByExtension(root, ".strings"),
      findFilesByExtension(root, ".stringsdict"),
      findFilesByExtension(root, ".pbxproj"),
      findFilesByExtension(root, ".xcworkspace"),
    ]);
  const catalogBuildPhases = await Promise.all(
    catalogs.flatMap((catalog) =>
      projectFiles.map((project) =>
        inspectCatalogBuildPhase(root, project, catalog),
      ),
    ),
  );
  const catalogIntegration = catalogs.map((catalog) => {
    const xcodeProjects = catalogBuildPhases.filter(
      (check) => check.catalog === catalog,
    );
    return {
      catalog,
      xcodeProjects,
      presentInAnyResourcesBuildPhase: xcodeProjects.some(
        (check) => check.resourcesBuildPhase,
      ),
    };
  });
  return {
    catalogs,
    stringsFiles,
    stringsDictFiles,
    projectFiles,
    workspaces,
    catalogIntegration,
    readyForAutomaticTargetIntegration: false,
    requiredManualOrAgentWork:
      "Target membership and catalog-table ownership must be verified from the Xcode project before sync can claim runtime localization.",
  };
}
