import { access } from "node:fs/promises";
import { basename, dirname, resolve } from "node:path";
import { execFile } from "node:child_process";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { createXcodeProjectBackup } from "./createXcodeProjectBackup.mjs";
import { getGeneratedCatalogPath } from "./getGeneratedCatalogPath.mjs";

const executeFile = promisify(execFile);
const integrationScript = fileURLToPath(
  new URL("../scripts/integrate_xcode_catalog.rb", import.meta.url),
);

export async function runXcodeCatalogIntegration(root, options) {
  if (typeof options.xcodeproj !== "string")
    throw new Error(
      "integrate requires --xcodeproj <path-to-project.pbxproj>.",
    );
  const requestedProject = resolve(root, options.xcodeproj);
  const project =
    basename(requestedProject) === "project.pbxproj"
      ? dirname(requestedProject)
      : requestedProject;
  const catalog = getGeneratedCatalogPath(root);
  await access(catalog);
  const argumentsList = [integrationScript, project, catalog];
  if (typeof options.target === "string") argumentsList.push(options.target);
  const backup = await createXcodeProjectBackup(root, project);
  try {
    const { stdout } = await executeFile("ruby", argumentsList, {
      maxBuffer: 1024 * 1024,
    });
    console.log(JSON.stringify({ ...JSON.parse(stdout), backup }));
  } catch (error) {
    if (`${error.stderr ?? ""}`.includes("cannot load such file -- xcodeproj"))
      throw new Error(
        "Xcode catalog integration needs the Ruby xcodeproj gem. Install it with `gem install xcodeproj`, then run integrate again.",
      );
    throw new Error(`${error.stderr ?? error.message}`.trim());
  }
}
