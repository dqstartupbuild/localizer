# Localizer full-localization skill

This customer-agent skill completes the work that static scans and translation
generation cannot safely infer. It routes simple, repeatable steps to the CLI,
uses MCP only for project state and protected translation writes, and reserves
agent reasoning for the expensive work: unmodeled resources, dynamic content,
source migrations, and release evidence.

Copy this `skills/localizer-full-localization` directory into the customer's
agent skill directory, or configure the agent to load its `SKILL.md` directly.
Then expose Localizer's MCP server with `localizer mcp-config` when the agent
needs translation state or batch saving.

The skill starts with `localizer audit`, fixes every finding in the declared
release scope, runs localized verification, and writes
`.localizer/localization-evidence.json`. The final `localizer check --strict`
command fails unless translations, audit results, test results, and explicit
human review evidence are present.

It does not create a false automatic guarantee. Instead, it produces a
repeatable, evidence-backed statement: a particular build is localized for its
declared targets, locales, resources, and tested flows.
