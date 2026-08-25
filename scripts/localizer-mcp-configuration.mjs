import assert from "node:assert/strict";
import { createMcpConfiguration } from "../packages/localizer-cli/src/createMcpConfiguration.mjs";

assert.deepEqual(
  createMcpConfiguration("/tools/localizer/index.mjs", "/apps/Example"),
  {
    mcpServers: {
      localizer: {
        command: "node",
        args: ["/tools/localizer/index.mjs", "mcp"],
        cwd: "/apps/Example",
      },
    },
  },
);
console.log("Localizer MCP configuration contract passed.");
