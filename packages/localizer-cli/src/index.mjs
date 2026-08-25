#!/usr/bin/env node
import { resolve } from "node:path";
import { parseArguments } from "./parseArguments.mjs";
import { runAudit } from "./runAudit.mjs";
import { runAnalyze } from "./runAnalyze.mjs";
import { runInit } from "./runInit.mjs";
import { runMcpServer } from "./runMcpServer.mjs";
import { runMcpConfiguration } from "./runMcpConfiguration.mjs";
import { runStatus } from "./runStatus.mjs";
import { runSync } from "./runSync.mjs";
import { runXcodeCatalogIntegration } from "./runXcodeCatalogIntegration.mjs";
import { runLocalizedVerification } from "./runLocalizedVerification.mjs";
import { runLocalizationRoute } from "./runLocalizationRoute.mjs";
import { runStrictLocalizationCheck } from "./runStrictLocalizationCheck.mjs";

const { command, options } = parseArguments(process.argv.slice(2));
const root = resolve(
  typeof options.root === "string" ? options.root : process.cwd(),
);
try {
  if (command === "init") await runInit(root, options);
  else if (command === "analyze") await runAnalyze(root, options);
  else if (command === "audit") await runAudit(root);
  else if (command === "check") await runStrictLocalizationCheck(root, options);
  else if (command === "integrate")
    await runXcodeCatalogIntegration(root, options);
  else if (command === "verify") await runLocalizedVerification(root, options);
  else if (command === "sync") await runSync(root);
  else if (command === "status") await runStatus(root);
  else if (command === "mcp") await runMcpServer(root);
  else if (command === "mcp-config") runMcpConfiguration(root);
  else if (command === "route") runLocalizationRoute(options);
  else
    throw new Error(
      "Usage: localizer <init|analyze|audit|check|integrate|verify|sync|status|mcp|mcp-config|route> [--project ID] [--manifest FILE]",
    );
} catch (error) {
  console.error(`Localizer: ${error.message}`);
  process.exitCode = 1;
}
