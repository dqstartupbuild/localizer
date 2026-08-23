# Local development CLI and dashboard

## What it does

Localizer now has a working local-development loop without a sign-in screen. The dashboard and CLI share one persistent workspace on the machine running the Next.js app. Create a project in the dashboard, run the exact command shown inside an iOS repository, review extracted strings, save a manual translation, and sync a generated String Catalog back into that repository.

## How it works

The development repository writes one validated JSON state file per project under `.localizer-dev/projects/<project-id>/state.json`. Set `LOCALIZER_DATA_DIR` to use another location in a test or local environment. Writes use a temporary file plus rename, and mutations are serialized inside one Next.js process. This JSON adapter is intentionally not safe for multiple server processes. `.localizer-dev/` is ignored by Git.

The versioned API lives under `/api/localizer/v1`. It exposes health, project creation/listing/reading, analysis uploads, revision-safe manual translation patches, and ETag-based sync bundles. It accepts normalized text metadata only.

The local workspace shell exposes only Projects, Overview, Localizations, and Activity. Screen discovery, screenshots, metadata, and settings remain prototype routes and are intentionally not linked from the connected local workflow.

The CLI lives in `packages/localizer-cli` and is available during repository development through `npm run localizer --`. It supports `init`, `analyze`, `analyze --manifest`, `sync`, and `status`. Its scanner is deliberately limited to common SwiftUI literal calls. It merges identical literal text into one entry with sorted occurrences because implicit SwiftUI and String Catalog lookup is text-based. Context-specific duplicate text requires future explicit localization-key support. Use a supplied normalized manifest when that scanner is insufficient.

`sync` writes a cache in `.localizer/translations-cache.json` and derives `Localizer/Generated/Localizer.xcstrings`. The catalog uses the SwiftUI literal source text as its lookup key, so `Text("Welcome back")` resolves the `"Welcome back"` catalog entry. The output and its marker are written atomically. Localizer records the exact generated hash; if the catalog is edited or deleted outside Localizer, `status` fails and the next changed sync refuses to recreate or overwrite it, writing a `.pending` candidate instead. Output paths must remain below the repository root and cannot traverse existing symbolic links.

An analysis source hash is recomputed on the server from canonical, sorted strings and occurrences. The server rejects a manifest whose supplied hash does not match its content. When a stable key from an explicit manifest changes source text, Localizer retains any manual translation as `needs_review`; it is not emitted by sync until someone saves it again in the dashboard, which explicitly approves it for the changed source. The conservative implicit-literal scanner derives keys from literal text, so a changed literal is a new entry and needs future explicit-key support for context-aware reconciliation.

## Use it

```sh
npm run dev
# In the target iOS repository, copy the project-specific command shown by the dashboard.
# It has the form:
node '/absolute/path/to/localizer-main/packages/localizer-cli/src/index.mjs' init --project proj_example --api http://127.0.0.1:3000
node '/absolute/path/to/localizer-main/packages/localizer-cli/src/index.mjs' sync
```

`npm run dev` binds the local dashboard to `127.0.0.1` by default.

`npm run localizer -- …` is a convenience command for contributors working inside the Localizer checkout. It is not expected to exist in an iOS repository.

Execute `npm run test:localizer-roundtrip` to start an isolated development server and verify create → analyze → save → sync, source-review protection, hash mismatch rejection, deterministic output, and modified-catalog protection in temporary directories.

## Deliberate limits

No production authentication, database, GitHub integration, screenshots, Xcode mutation, or automatic translation is included. The implicit workspace is available only when `NODE_ENV` is `development` or `test`; a future authenticated identity adapter and database repository should replace the development adapters without changing the CLI protocol. Next.js route handlers do not expose a trustworthy peer address, so this phase does not claim server-side loopback verification. The CLI itself only permits plain HTTP to loopback hosts.

## Relevant files

```text
src/server/localizer/schemas/         focused project-state and request schemas
src/server/localizer/identity/        local-development workspace identity
src/server/localizer/repository/      local persistence adapter
src/server/localizer/services/        project and translation operations
src/app/api/localizer/v1/             versioned API routes
packages/localizer-cli/src/           local CLI commands and catalog projection
src/app/projects/                     connected dashboard routes
scripts/localizer-roundtrip/          focused round-trip test helpers
```
