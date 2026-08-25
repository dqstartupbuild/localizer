const routes = {
  setup: {
    recommendedTool: "cli",
    reason:
      "Setup is deterministic. Do not spend agent tokens on it unless the command reports an error.",
    commands: ["localizer init …", "localizer mcp-config"],
  },
  inventory: {
    recommendedTool: "cli",
    reason:
      "Use the CLI audit first. It gives a machine-readable worklist without an MCP round trip.",
    commands: ["localizer audit"],
  },
  translate: {
    recommendedTool: "mcp",
    reason:
      "Translation work needs the connected project's revision, source context, and protected batch save operation.",
    mcpTools: ["get_localization_project", "save_localization_translations"],
  },
  resolve: {
    recommendedTool: "skill",
    reason:
      "Use the full-localization skill only for audit findings, dynamic content, resource ownership, or source changes that need repository reasoning.",
    prerequisite:
      "Run localizer audit first and pass its findings to the skill.",
  },
  certify: {
    recommendedTool: "skill_then_cli",
    reason:
      "The skill records the declared scope and human review. The CLI verifies objective evidence and fails closed.",
    commands: ["localizer check --strict"],
  },
};

export function createLocalizationWorkflowRoute(phase = "inventory") {
  const route = routes[phase];
  if (!route)
    throw new Error(
      `Unknown localization phase \"${phase}\". Use setup, inventory, translate, resolve, or certify.`,
    );
  return { phase, ...route };
}
