---
name: localizer-full-localization
description: This skill should be used when a Swift iOS app needs a complete localization pass, audit findings need resolution, or a release needs strict localization certification.
---

# Full localization for Swift iOS apps

Use this skill to resolve the parts of a Swift iOS app that Localizer's CLI and
MCP cannot safely change or certify on their own. Treat the declared release
scope as the boundary of completion. Never claim that an app is fully localized
outside that scope.

## Token-first routing

Choose the least expensive tool that can do the work:

| Need                                                                                             | Use        | Do not use the skill when                                      |
| ------------------------------------------------------------------------------------------------ | ---------- | -------------------------------------------------------------- |
| Initialize, scan, generate, integrate, test, or certify                                          | CLI        | The command produces an actionable error or audit finding.     |
| Read translation state or save an approved batch                                                 | MCP        | The work requires only a deterministic CLI command.            |
| Resolve audit findings, inspect unmodeled resources, change source, or document release evidence | This skill | The audit is clean and no source/resource reasoning is needed. |

Start with `localizer route --phase inventory` when uncertain. Do not call the
MCP routing tool if a shell is available; the CLI route is cheaper. Use the MCP
equivalent only when the agent has MCP but no shell.

## Required workflow

1. Run `localizer audit`. If it has no findings, skip directly to translation,
   verification, and certification. If it has findings, use this skill to
   resolve them one at a time.
2. Establish the declared release scope: shipping Xcode targets, supported
   locales, user-facing resource types, and app flows that must be exercised.
3. Inspect every in-scope SwiftUI, UIKit/AppKit, extension, widget, intent,
   notification, package, test UI, Storyboard/XIB, InfoPlist, strings file,
   plural table, catalog, localized asset, and server/CMS content source.
4. Replace user-facing literals with native localization APIs. Use explicit keys
   and comments when the same source text has different meanings. Preserve
   placeholders, plurals, device variants, terminology, and existing catalog
   ownership. Do not localize identifiers, URLs, analytics events, logs, or
   protected brand terms without an explicit request.
5. Call `get_localization_project` only when translation context is needed.
   Prepare one reviewed batch and call `save_localization_translations` with the
   current revision. Refresh and recreate the batch if that revision changed.
6. Run `localizer sync`, `localizer integrate`, and `localizer audit`. Resolve
   every action-required finding. Do not overwrite a hand-maintained catalog.
7. Run `localizer verify` for every shipping locale and target. Exercise the
   declared flows using long-text and RTL pseudolanguages. Record any gap as
   unfinished work.
8. Write `.localizer/localization-evidence.json` from
   `references/completion-evidence.json`, filling it with the actual scope and
   human review information. Run `localizer check --strict` and do not certify
   the release unless it returns `certification_ready`.

## Rules for dynamic and remote text

Do not mark a dynamic string complete merely because it did not appear in a
static scan. Trace its runtime source. Either localize it on-device using a key
and typed variables, require the server to return locale-specific content, or
document it as an approved exclusion in the release scope. Add a test flow that
exercises it.

## Completion language

Say “localized for the declared release scope” only after strict certification
passes. State the targets, locales, and human reviewer. Never say “100% of any
app” or “fully localized” based only on a scanner, a generated catalog, or an
AI translation batch.
