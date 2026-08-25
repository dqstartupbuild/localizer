export function createMcpConfiguration(cliEntrypoint, targetRoot) {
  return {
    mcpServers: {
      localizer: {
        command: "node",
        args: [cliEntrypoint, "mcp"],
        cwd: targetRoot,
      },
    },
  };
}
