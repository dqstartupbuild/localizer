# Customer-agent localization skill and strict certification

## Purpose

Localizer now includes a customer-agent skill at
`skills/localizer-full-localization`. It fills the gap between deterministic
CLI/MCP operations and the repository-specific reasoning needed to localize
resources, dynamic content, and user flows that a static source inventory cannot
prove complete.

The skill uses a token-first routing rule:

- Use the CLI for deterministic setup, audit, generation, Xcode integration,
  verification, and certification.
- Use MCP only to read the connected project's translation state or save a
  revision-protected translation batch.
- Use the skill only to resolve audit findings, inspect unmodeled scope, make
  source/resource changes, or prepare completion evidence.

Run `localizer route --phase <setup|inventory|translate|resolve|certify>` to
receive the same routing decision without a source scan. MCP also exposes
`get_localization_workflow_route` for agents without shell access.

## Strict completion gate

`localizer check --strict` is intentionally fail-closed. It returns
`certification_ready` only when all of the following are present:

1. The static/Xcode audit has no action-required findings.
2. Every active source string has an approved translation for each configured
   non-source locale.
3. `.localizer/localized-verification.json` records a passing test run for each
   configured non-source locale.
4. `.localizer/localization-evidence.json` names shipping targets, inspected
   user-facing surfaces, and exercised flows.
5. That evidence identifies a human reviewer and confirms long-text, RTL, and
   dynamic-content review.

Start from
`skills/localizer-full-localization/references/completion-evidence.json` and
replace the example values with actual release evidence. The CLI does not write
this attestation because target scope and human review cannot be inferred
safely.

Certification means the build is localized for the declared release scope. It
does not claim coverage for undisclosed server content, disabled features, or
other behavior outside that scope.

## Relevant code

```text
skills/localizer-full-localization/             Customer-agent instructions
packages/localizer-cli/src/runLocalizationRoute.mjs
packages/localizer-cli/src/createStrictLocalizationCheck.mjs
packages/localizer-cli/src/runStrictLocalizationCheck.mjs
packages/localizer-cli/src/mcp/getMcpTools.mjs
```

## Verification

Run:

```sh
npm run test:localizer-strict-check
npm run test:localizer-routing
npm run test:localizer-mcp
```
