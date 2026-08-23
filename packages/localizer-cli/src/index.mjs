#!/usr/bin/env node
import { resolve } from "node:path";
import { parseArguments } from "./parseArguments.mjs";
import { runAnalyze } from "./runAnalyze.mjs";
import { runInit } from "./runInit.mjs";
import { runStatus } from "./runStatus.mjs";
import { runSync } from "./runSync.mjs";

const { command, options } = parseArguments(process.argv.slice(2));
const root = resolve(
  typeof options.root === "string" ? options.root : process.cwd(),
);
try {
  if (command === "init") await runInit(root, options);
  else if (command === "analyze") await runAnalyze(root, options);
  else if (command === "sync") await runSync(root);
  else if (command === "status") await runStatus(root);
  else
    throw new Error(
      "Usage: localizer <init|analyze|sync|status> [--project ID] [--manifest FILE]",
    );
} catch (error) {
  console.error(`Localizer: ${error.message}`);
  process.exitCode = 1;
}
