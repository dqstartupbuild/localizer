import { readFile } from "node:fs/promises";
import { basename, join } from "node:path";

function escapeRegularExpression(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function findFileReferenceIds(project, catalogName) {
  const name = escapeRegularExpression(catalogName);
  return [
    ...project.matchAll(
      new RegExp(
        `\\b([A-F0-9]{8,}) /\\* ${name} \\*/ = \\{isa = PBXFileReference;[\\s\\S]*?\\};`,
        "g",
      ),
    ),
  ].map((match) => match[1]);
}

function findBuildFileIds(project, fileReferenceIds) {
  return fileReferenceIds.flatMap((fileReferenceId) =>
    [
      ...project.matchAll(
        new RegExp(
          `\\b([A-F0-9]{8,}) /\\* .*? in Resources \\*/ = \\{isa = PBXBuildFile; fileRef = ${fileReferenceId} /\\*`,
          "g",
        ),
      ),
    ].map((match) => match[1]),
  );
}

function isInResourcesBuildPhase(project, buildFileIds) {
  return buildFileIds.some((buildFileId) =>
    new RegExp(
      `files = \\([\\s\\S]*?\\b${buildFileId} /\\* .*? in Resources \\*/`,
      "g",
    ).test(project),
  );
}

export async function inspectCatalogBuildPhase(root, projectPath, catalogPath) {
  const project = await readFile(join(root, projectPath), "utf8");
  const fileReferenceIds = findFileReferenceIds(project, basename(catalogPath));
  const buildFileIds = findBuildFileIds(project, fileReferenceIds);
  return {
    catalog: catalogPath,
    project: projectPath,
    fileReference: fileReferenceIds.length > 0,
    resourcesBuildPhase: isInResourcesBuildPhase(project, buildFileIds),
  };
}
