import { copyFile, mkdir } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { join } from "node:path";

export async function createXcodeProjectBackup(root, project) {
  const source = join(project, "project.pbxproj");
  const directory = join(root, ".localizer", "xcode-backups");
  await mkdir(directory, { recursive: true });
  const destination = join(directory, `${randomUUID()}.pbxproj`);
  await copyFile(source, destination);
  return destination;
}
