import { spawn } from "node:child_process";

export function runXcodeTest(argumentsList) {
  return new Promise((resolve, reject) => {
    const child = spawn("xcodebuild", argumentsList, { stdio: "inherit" });
    child.once("error", reject);
    child.once("exit", (code) => resolve(code ?? 1));
  });
}
