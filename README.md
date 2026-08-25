# Localizer

## Local development loop

Localizer can be used locally without signing in while backend authentication is still being built. Start the dashboard, create a project at `/projects/new`, then copy the project-specific command from its overview and run it inside the target iOS repository. The command invokes this checkout’s CLI by absolute path, so it does not depend on an npm script existing in the iOS repository.

```sh
node '/absolute/path/to/localizer-main/packages/localizer-cli/src/index.mjs' init --project proj_example --api http://127.0.0.1:3000
node '/absolute/path/to/localizer-main/packages/localizer-cli/src/index.mjs' sync
```

The CLI uses a SwiftSyntax analyzer to inventory supported SwiftUI and native
localization calls, uploads a normalized manifest, and syncs dashboard-approved
translations into `Localizer/Generated/Localizable.xcstrings`. Local data persists
in `.localizer-dev/` (or `LOCALIZER_DATA_DIR`) and is ignored by Git. See [the
feature guide](docs/features/local-development-cli-dashboard.md).

For a whole-app localization pass, Localizer also exposes a read-only MCP server
for a coding agent. It supplies a source inventory, Xcode-resource inspection,
and a completion contract; it does not falsely treat a regex scan as proof of
complete localization. See [the agent-assisted guide](docs/features/agent-assisted-full-localization.md).

For customer coding agents, ship the included
`skills/localizer-full-localization` skill beside the MCP configuration. It
routes low-cost work to the CLI, reserves MCP for translation state and writes,
and requires strict, evidence-based release certification. See the
[customer-agent skill guide](docs/features/customer-agent-localization-skill.md).

To add a generated default catalog to an Xcode target safely, see [the Xcode
catalog integration guide](docs/features/xcode-catalog-integration.md).

To run the selected app tests in every translation language, see [localized
runtime verification](docs/features/localized-runtime-verification.md).

`npm run localizer -- …` is only a convenience command when run from the Localizer checkout itself.

Localizer is an MIT-licensed, routed T3 app for a local-first iOS localization workflow. The public site is responsive; the desktop dashboard starts at `/projects`.

In production, `/projects` is a clearly labeled, read-only public preview with
bundled sample data. It accepts no CLI or write requests and does not represent
hosted project storage. Only its sample overview, localizations, and activity
views are available; prototype metadata, screen discovery, screenshots, and
settings routes return 404. Use the local development dashboard for persistent
work.

## Docs

- [Project Scope](./project_scope.md)
- [Technical Architecture](./technical-architecture.md)
- [Design System](./design.md)
- [Dashboard Application](./dashboard-application.md)
- [Desktop-only Dashboard](./docs/features/desktop-only-dashboard.md)
- [Production Public Preview](./docs/features/production-public-preview.md)
- [Public Marketing Site](./docs/features/marketing-public-site.md)
- [MIT License](./LICENSE)
- [Security Policy](./SECURITY.md)
- [Coding Guidelines](./coding-guidelines.md)

## Run Locally

```sh
npm install
npm run dev
```

The development server binds to `127.0.0.1` by default.

The dashboard is designed for desktop browsers. Narrow screens show a clear
desktop-use notice instead of compressing the project workspace.

If port `3000` is already in use, Next.js will choose the next available port.

## Verification

```sh
npm run typecheck
npm run lint
npm run build
```

## Current Implementation

The current application includes a public marketing and policy site plus separate dashboard screens. In development and test, projects, project creation, overview, localizations, activity, and the CLI/API loop use persistent local-development data. In production, the linked dashboard routes show one read-only bundled sample project. Screenshots, metadata, settings, and screen discovery remain dashboard prototypes:

- `/`
- `/projects`
- `/projects/new`
- `/projects/calisthenics-guppy/overview`
- `/projects/calisthenics-guppy/localizations`
- `/projects/calisthenics-guppy/screen-discovery`
- `/projects/calisthenics-guppy/screenshots`
- `/projects/calisthenics-guppy/metadata`
- `/projects/calisthenics-guppy/activity`
- `/settings`

Some dashboard prototype data is still served through a typed tRPC mock data router in local development only. Production authentication, durable hosted storage, and remote workflows are covered in `technical-architecture.md`.

## Public pages

- `/` explains the current local CLI-to-dashboard workflow.
- `/support` provides setup, commands, current limitations, issue reporting, and private security reporting links.
- `/privacy`, `/terms`, and `/license` document the current data model and MIT licensing boundary.
- `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`, `/llms.txt`, and `/llms-full.txt` support discovery.
