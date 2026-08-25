# CLI to Dashboard Development Connection Plan

## Outcome

Build a working local-development loop in which a developer can use Localizer without signing in, keep work across server restarts, connect an iOS repository through the Localizer CLI, review extracted strings in the web dashboard, save manual translations, and pull a deterministic native String Catalog back into the iOS repository.

This phase proves the product boundary and user experience. It intentionally does not implement production authentication, PostgreSQL, hosted jobs, GitHub import, MCP, full SwiftSyntax analysis, Xcode project mutation, machine translation, or screenshot automation.

## Product Principle

Authentication and persistence are separate concerns.

In development, Localizer resolves every request to one implicit local workspace. The dashboard and CLI both read and write that workspace through the same application services. No sign-in screen or fake session is required, and data persists on disk.

In production, the implicit development identity is disabled. A future authenticated identity adapter and database repository will replace the local adapters without changing the versioned CLI protocol.

OpenCut uses the same broad local-first principle for its editor: projects can be used without an account and are persisted in browser storage. Localizer cannot rely on browser-only storage because its CLI is a second process, so Localizer persists the shared development workspace on the server filesystem instead.

## Supported Round Trip

1. Start the Localizer web app locally.
2. Create an iOS app project from `/projects/new`.
3. The dashboard shows a project-specific CLI command.
4. Run the command inside an iOS repository.
5. The CLI verifies the local API, writes `localizer.config.json`, and uploads a normalized analysis manifest.
6. The overview changes from waiting to connected and shows the real analysis revision and source-string count.
7. The localizations screen shows the uploaded strings.
8. Edit and save a translation in the dashboard.
9. Run the CLI sync command.
10. The CLI writes `.localizer/translations-cache.json` and `Localizer/Generated/Localizable.xcstrings`.
11. Repeating analysis or sync creates no duplicates and no file diff.
12. If someone edits the generated catalog manually, Localizer refuses to overwrite it and writes a pending candidate for review.

## Source of Truth

| Data                              | Authority                  | Local copy                                  |
| --------------------------------- | -------------------------- | ------------------------------------------- |
| Source strings and occurrences    | CLI analysis manifest      | Latest accepted manifest metadata           |
| Enabled locales                   | Dashboard project settings | CLI sync cache                              |
| Manual translations and approvals | Dashboard workspace        | CLI sync cache and generated catalog        |
| Generated String Catalog          | Derived artifact           | `Localizer/Generated/Localizable.xcstrings` |
| CLI connection settings           | iOS repository             | `localizer.config.json`                     |

Rules:

- Manual translations are never overwritten by a later analysis.
- Missing strings become stale but retain their translations.
- Stale strings are not included in generated output.
- A source-text change for an existing stable key preserves manual translations as `needs_review`; they are excluded from sync until a dashboard save explicitly approves them against the new source text.
- Every accepted mutation increments the project revision.
- Dashboard edits carry an expected revision and reject stale writes.
- Identical analysis uploads are idempotent by canonical source hash.
- Generated files are projections, never imported as the server source of truth.

## Development Identity

Introduce one identity resolution boundary.

Development and test behavior:

```text
ownerId = local-development-user
workspaceId = local-development-workspace
```

Production behavior:

- The implicit identity is unavailable.
- Unauthenticated CLI endpoints return an unavailable or unauthorized response.
- The future backend supplies an authenticated owner and workspace through the same boundary.

The UI must not display a fake named user. It should describe the current scope as `Local workspace` until real account data exists.

## Persistent Development Repository

Store data outside watched source directories:

```text
.localizer-dev/
└── projects/
    └── <project-id>/
        └── state.json
```

Requirements:

- `.localizer-dev/` is ignored by Git.
- `LOCALIZER_DATA_DIR` overrides the location for tests.
- HTTP input can never choose filesystem paths.
- Writes validate the complete next state.
- Writes use a unique temporary file in the same directory followed by atomic rename.
- Read-modify-write operations are serialized per project within one server process. This JSON adapter does not provide multi-process locking or compare-and-swap.
- A failed write leaves the previous state intact.

The initial implementation is deliberately a JSON repository. It must sit behind project service functions so PostgreSQL can replace it later.

## Versioned CLI Protocol

Base path:

```text
/api/localizer/v1
```

Endpoints for this phase:

```text
GET   /health
POST  /projects
GET   /projects/list
GET   /projects/:projectId
POST  /projects/:projectId/analysis-runs
GET   /projects/:projectId/sync-bundle
PATCH /projects/:projectId/translations/:stableKey
```

The split `/projects/list` path keeps each Next.js route file responsible for one operation under the repository's atomic file rule.

All endpoint inputs and outputs use strict Zod schemas. The API accepts normalized text metadata only. It rejects source files, absolute paths, traversal segments, arbitrary blobs, secrets, and environment dumps.

### Analysis Manifest

```json
{
  "schemaVersion": 1,
  "projectId": "proj_example",
  "runId": "run_example",
  "sourceHash": "sha256:...",
  "environment": {
    "cliVersion": "0.1.0",
    "xcodeVersion": null,
    "swiftVersion": null
  },
  "strings": [
    {
      "stableKey": "welcome_back",
      "sourceText": "Welcome back",
      "developerComment": null,
      "occurrences": [
        {
          "file": "HomeView.swift",
          "line": 42,
          "symbol": null
        }
      ]
    }
  ]
}
```

For the first implementation, the CLI supports a supplied manifest and a conservative development scanner for common SwiftUI string literals. The scanner is explicitly labeled as limited and does not claim SwiftSyntax completeness. It merges duplicate source literals because implicit SwiftUI lookup is text-based. Context-specific duplicate text requires future explicit localization-key support.

### Sync Bundle

```json
{
  "schemaVersion": 1,
  "revision": 4,
  "project": {
    "id": "proj_example",
    "name": "Example App",
    "sourceLocale": "en-US"
  },
  "analysis": {
    "runId": "run_example",
    "sourceHash": "sha256:..."
  },
  "locales": ["es-ES"],
  "translations": [
    {
      "stableKey": "welcome_back",
      "sourceText": "Welcome back",
      "sourceTextHash": "sha256:...",
      "locale": "es-ES",
      "value": "Te damos la bienvenida",
      "origin": "manual",
      "status": "approved",
      "updatedAt": "2026-08-23T12:00:00.000Z"
    }
  ]
}
```

Bundle responses include an ETag derived from the project revision. The CLI sends `If-None-Match` and treats `304` as already current.

## Development Safety

- No-auth mode works only in `development` and `test`.
- No-auth routes are enabled only when `NODE_ENV` is `development` or `test`. This Next.js phase does not claim peer-address verification because request Host headers are not a trustworthy boundary.
- The CLI rejects non-loopback plain HTTP URLs.
- The manifest body limit is 2 MB.
- Request schemas reject unknown fields.
- Server errors use a stable JSON envelope and never expose stack traces.
- Development data responses use `Cache-Control: no-store`.
- The CLI never stores credentials during this phase.
- Generated output must remain inside the detected repository root.
- Symlink and path traversal escapes are rejected.

## CLI Commands

When running commands from the Localizer checkout:

```sh
npm run localizer -- init --project <project-id>
npm run localizer -- analyze
npm run localizer -- analyze --manifest ./manifest.json
npm run localizer -- sync
npm run localizer -- status
```

When running commands from a target iOS repository in this local-development phase, the dashboard must show an absolute CLI entrypoint and current local API URL instead:

```sh
node '/absolute/path/to/localizer-main/packages/localizer-cli/src/index.mjs' init --project <project-id> --api http://127.0.0.1:3000
node '/absolute/path/to/localizer-main/packages/localizer-cli/src/index.mjs' sync
```

Published-package copy remains future-facing:

```sh
npx localizer init
```

### `init`

- Defaults to `http://localhost:3000`.
- Verifies the health endpoint.
- Fetches the requested dashboard project.
- Writes `localizer.config.json`.
- Writes `.localizer/state.json`.
- Adds Localizer cache paths to the iOS repository `.gitignore` idempotently.
- Runs the first conservative analysis unless `--skip-analysis` is set.

### `analyze`

- Reads and validates configuration.
- Accepts a supplied manifest or extracts supported SwiftUI literals.
- Computes a canonical hash independent of object key order.
- Uploads a unique run identifier.
- Records the accepted revision and analysis details locally.
- Succeeds without duplication when the same source hash is uploaded again.

### `sync`

- Requests the newest bundle with the last ETag.
- Writes the translation cache atomically.
- Generates a deterministic Localizer-owned String Catalog.
- Records the bundle revision and generated-file hash.
- Reports `Already up to date` for a `304` response.
- Refuses to overwrite a catalog that differs from its recorded generated hash.

### `status`

- Shows project and server identity.
- Shows local and server revisions.
- Shows the last analysis and sync time.
- Checks generated-file integrity.
- Provides one clear next action.
- Exits nonzero for unreachable server, invalid configuration, or modified generated output.

## Dashboard Work

### Projects

- Read persisted local projects instead of the static fixture.
- Provide an honest first-run state.
- Show connection state, last update, locales, and string count.
- Link every card using its real project ID.

### New Project

- Make the form functional.
- Collect app name, source locale, and initial target locale.
- Create the project in the local workspace.
- Redirect to its real overview.
- Explain that no account is needed during local development.

### Project Overview

- Await and use the route `projectId`.
- Show waiting, connected, analyzed, and sync-needed states from persisted data.
- Display an exact copyable CLI command.
- Poll only while waiting for the first connection or analysis.
- Show real revision, string count, locale count, last analysis, and last CLI contact.
- Remove unavailable generation controls.

### Localizations

- Render real uploaded source strings.
- Switch among configured target locales.
- Select a string and save a real manual translation.
- Preserve manual values across later analyses.
- Show missing, approved, needs-review, and stale states.
- Handle revision conflicts with plain-language recovery copy.

### Activity

- Record project creation, CLI connection, analysis acceptance, manual translation updates, and bundle sync reads.
- Do not mix fixture activity with real project activity.

### Shell

- Resolve navigation with the active real project ID.
- Replace the fake user card with a local-workspace identity.
- Do not expose plan usage or billing until those are real.

## UI Direction

The dashboard should feel like one working handoff surface, not a stack of generic SaaS cards.

Signature artifact: a live sync ledger that shows the actual repository, accepted manifest revision, dashboard edit revision, and generated catalog status as one continuous handoff. It uses real data and status changes, not a decorative fake terminal.

Rules for the new and modified UI:

- Use system UI text rather than loading Inter as a brand choice.
- Keep ordinary content visible without entrance-animation gates.
- Use one clear primary action at a time.
- Do not pair filled and outlined buttons by default.
- Do not use pills for ordinary metadata.
- Do not add glowing buttons, gradient headlines, floating cards, icon tiles, or fake app windows.
- Use icons only when they clarify a real action.
- All controls must work and be verified with actual clicks.
- Maintain legible contrast, generous gutters, responsive stacking, and complete unclipped content.

## Atomic File Organization

```text
packages/localizer-cli/
├── bin/localizer.js
├── commands/
├── api/
├── analysis/
├── config/
├── files/
├── output/
└── types/

src/contracts/localizer/v1/
├── schemas/
├── types/
└── constants/

src/server/local-workspace/
├── identity/
├── repositories/
├── projects/
├── analyses/
├── translations/
└── sync/

src/features/local-connection/
├── components/
├── hooks/
├── pages/
└── types/

src/app/api/localizer/v1/
├── health/route.ts
└── projects/
```

Every new component, hook, schema, utility function, project operation, and CLI command lives in its own focused file.

## Verification

### Unit

- Strict schema rejection
- Canonical manifest hashing
- Deterministic catalog bytes
- Stable keys independent of line number
- Repeated analysis idempotency
- New, existing, changed, and stale string reconciliation
- Manual translation preservation
- Revision conflicts
- Atomic-write rollback behavior
- Modified generated-file protection
- Loopback detection and output-path safety

### API

- Health
- Create, list, and read project
- Unknown project
- Analysis upload and duplicate upload
- Translation save and stale revision conflict
- Sync ETag and `304`
- Production unauthenticated rejection
- Oversized and malformed payload rejection

### End to End

1. Start Next.js on an isolated port with an isolated `LOCALIZER_DATA_DIR`.
2. Create a project in the UI.
3. Initialize a temporary iOS repository with the real CLI.
4. Upload Swift fixture strings.
5. Confirm the browser updates to analyzed state.
6. Save a translation in the browser.
7. Run CLI sync.
8. Verify the cache and String Catalog.
9. Run sync twice and verify byte stability.
10. Modify the generated catalog and verify safe refusal.

### Repository Checks

```sh
npm test
npm run typecheck
npm run lint
npm run build
```

Browser verification covers desktop and mobile widths, every new control, keyboard focus, overflow, clipping, centering, contrast, empty/loading/error states, and the complete anti-slop checklist.

## Acceptance Criteria

- A fresh checkout completes the dashboard to CLI to dashboard to native-file round trip without editing JSON by hand.
- Development requires no authentication and does not show a sign-in gate.
- Development data survives a Next.js restart.
- Production cannot silently inherit unauthenticated behavior.
- Dynamic routes display the requested project.
- Identical analyses do not duplicate strings or activity.
- Manual dashboard edits survive later analyses.
- CLI sync is deterministic and idempotent.
- Modified generated files are never silently overwritten.
- No implemented control is dead.
- Errors explain what happened and the next useful action.
- Documentation clearly identifies deferred production and native automation work.

## Deferred Work

- Production authentication and teams
- PostgreSQL repository
- GitHub App import and pull requests
- macOS CI runners
- Keychain-backed CLI tokens
- SwiftSyntax native analyzer
- Xcode target and build-phase modification
- Existing catalog adoption and merge
- Machine translation provider
- Screenshot discovery and XCUITest execution
- App Store Connect integration
- MCP server

The deferred systems should consume the same versioned contracts and application services rather than creating parallel implementations.
