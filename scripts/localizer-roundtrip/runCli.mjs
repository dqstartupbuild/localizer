import { runProcess } from "./runProcess.mjs";

export function runCli(argumentsList, root) {
  return runProcess(
    process.execPath,
    ["packages/localizer-cli/src/index.mjs", ...argumentsList, "--root", root],
    { stdio: "inherit" },
  );
}
