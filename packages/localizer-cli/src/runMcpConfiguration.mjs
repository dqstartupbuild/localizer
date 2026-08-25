import { fileURLToPath } from "node:url";
import { createMcpConfiguration } from "./createMcpConfiguration.mjs";

const cliEntrypoint = fileURLToPath(new URL("./index.mjs", import.meta.url));

export function runMcpConfiguration(root) {
  console.log(
    JSON.stringify(createMcpConfiguration(cliEntrypoint, root), null, 2),
  );
}
