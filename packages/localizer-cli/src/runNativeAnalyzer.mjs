import { execFile } from "node:child_process";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const executeFile = promisify(execFile);
const analyzerPath = fileURLToPath(
  new URL("../../localizer-analyzer", import.meta.url),
);

export async function runNativeAnalyzer(root) {
  const { stdout } = await executeFile(
    "swift",
    ["run", "--package-path", analyzerPath, "localizer-analyzer", root],
    { maxBuffer: 10 * 1024 * 1024 },
  );
  const result = JSON.parse(stdout);
  if (
    !Array.isArray(result.strings) ||
    !Array.isArray(result.unsupportedPatterns)
  )
    throw new Error("The native analyzer returned an invalid result.");
  return result;
}
