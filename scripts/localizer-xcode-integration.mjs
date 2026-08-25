import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { access, mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { promisify } from "node:util";
import { inspectXcodeLocalization } from "../packages/localizer-cli/src/mcp/inspectXcodeLocalization.mjs";
import { runXcodeCatalogIntegration } from "../packages/localizer-cli/src/runXcodeCatalogIntegration.mjs";

const executeFile = promisify(execFile);
const root = await mkdtemp(join(tmpdir(), "localizer-xcode-integration-"));
const project = join(root, "Example.xcodeproj");
const conflictingProject = join(root, "Conflicting.xcodeproj");
try {
  await executeFile("ruby", [
    "-e",
    'require "xcodeproj"; project = Xcodeproj::Project.new(ARGV.fetch(0)); project.new_target(:application, "Example", :ios, "17.0"); project.save',
    project,
  ]);
  await mkdir(join(root, "Localizer", "Generated"), { recursive: true });
  await writeFile(
    join(root, "Localizer", "Generated", "Localizable.xcstrings"),
    "{}\n",
  );
  const options = {
    xcodeproj: "Example.xcodeproj",
    target: "Example",
  };
  await runXcodeCatalogIntegration(root, options);
  await runXcodeCatalogIntegration(root, options);
  await access(join(root, ".localizer", "xcode-backups"));
  const { stdout } = await executeFile("ruby", [
    "-e",
    'require "xcodeproj"; project = Xcodeproj::Project.open(ARGV.fetch(0)); target = project.targets.find { |item| item.name == "Example" }; puts target.resources_build_phase.files_references.count { |item| item.path == "Localizable.xcstrings" }',
    project,
  ]);
  assert.equal(stdout.trim(), "1");
  const inspection = await inspectXcodeLocalization(root);
  assert.equal(
    inspection.catalogIntegration[0].presentInAnyResourcesBuildPhase,
    true,
  );
  await executeFile("ruby", [
    "-e",
    'require "xcodeproj"; project = Xcodeproj::Project.new(ARGV.fetch(0)); project.new_target(:application, "Conflicting", :ios, "17.0"); project.main_group.new_group("Existing").new_file("Localizable.xcstrings"); project.save',
    conflictingProject,
  ]);
  await assert.rejects(
    () =>
      runXcodeCatalogIntegration(root, {
        xcodeproj: "Conflicting.xcodeproj",
        target: "Conflicting",
      }),
    /different Localizable\.xcstrings already exists/,
  );
  console.log("Localizer Xcode integration passed.");
} finally {
  await rm(root, { recursive: true, force: true });
}
