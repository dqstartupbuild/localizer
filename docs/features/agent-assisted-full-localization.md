# Agent-assisted full-app localization

## Purpose

Localizer's built-in analyzer uses SwiftSyntax to read Swift source accurately.
It can inventory common SwiftUI and native localization literals and flags dynamic
calls for review, but it cannot certify that an arbitrary Swift application has
no remaining user-facing text. This feature gives a coding agent MCP tools to
inspect the target repository and receive an explicit completion contract for
the work that a full localization requires.

## Start the MCP server

Run this from the target app repository after installing or checking out
Localizer:

```sh
node '/absolute/path/to/localizer-main/packages/localizer-cli/src/index.mjs' mcp
```

Configure the user's coding agent to start that command over standard input and
output. The server exposes inspection tools plus one explicitly scoped,
revision-protected translation-save tool:

To print a ready-to-paste MCP configuration for the current target repository,
run:

```sh
node '/absolute/path/to/localizer-main/packages/localizer-cli/src/index.mjs' mcp-config
```

The command emits a standard `mcpServers.localizer` object with the target
repository as its working directory.

- `scan_localization_sources`: returns Localizer's supported source inventory.
- `inspect_xcode_localization`: returns catalog and Xcode-project evidence.
- `get_full_localization_task`: returns the required inspection, safe rewrite,
  and validation contract.
- `audit_localization_readiness`: returns source and Xcode integration findings
  that must be resolved before a developer can certify completeness.
- `get_localization_project`: returns the current source inventory, languages,
  translations, and revision.
- `save_localization_translations`: atomically saves an agent-reviewed batch of
  translations using that revision.

The same evidence is available from the terminal:

```sh
node '/absolute/path/to/localizer-main/packages/localizer-cli/src/index.mjs' audit
```

For a full release pass, install the customer-agent skill at
`skills/localizer-full-localization`. It tells an agent when to use a
deterministic CLI command, MCP project/translation tools, or deeper
repository-specific reasoning. Its final `localizer check --strict` gate is
documented in [customer-agent localization skill](customer-agent-localization-skill.md).

After `sync` creates `Localizer/Generated/Localizable.xcstrings`, add it to the intended Xcode app
target with:

```sh
node '/absolute/path/to/localizer-main/packages/localizer-cli/src/index.mjs' integrate \
  --xcodeproj Example.xcodeproj --target Example
```

This operation is idempotent, creates a recoverable copy of `project.pbxproj`
under `.localizer/xcode-backups/`, and requires the Ruby `xcodeproj` gem. It is
only safe to run after the agent or developer has chosen the catalog table
ownership for the target.

## Completion contract

An agent must inspect every shipping target and its resources, preserve existing
catalog ownership, convert nonlocalized user-facing text to native localization
APIs, then prove target membership, translated variants, build success, and
localized runtime checks. A scanner result alone never counts as proof.

The normal agent sequence is: inspect and audit → make source/resource changes
→ fetch the connected project → prepare reviewed translations → save the batch
with the reported revision → sync → integrate → audit again → run localized
build and runtime checks. `save_localization_translations` is revision-protected:
refresh the project and recreate the batch when another editor changes it first.
See [localized runtime verification](localized-runtime-verification.md) for the
executable Xcode test stage.

The MCP server never writes source code, project files, or secrets. The user's
agent and developer remain responsible for reviewing and applying source
changes. The translation-save tool writes only the connected local project's
reviewed translation state, protected by an optimistic revision check.
`localizer sync` remains responsible only for writing the generated translation
catalog after translations are approved.

## Relevant code

```text
packages/localizer-cli/src/mcp/       MCP request handling and scoped tools
packages/localizer-cli/src/runMcpServer.mjs  stdio MCP transport
packages/localizer-analyzer/          SwiftSyntax-native source analyzer
packages/localizer-cli/src/runNativeAnalyzer.mjs  analyzer CLI bridge
```
