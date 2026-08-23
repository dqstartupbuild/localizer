# Production public preview

## Purpose

Production visitors can open `/projects` without creating an account. The route is a clearly labeled, read-only product preview, not a hosted Localizer workspace.

## Behavior

- Desktop production routes show the bundled `Trail Notes` sample project.
- `/projects/new` explains how to start a local workspace and contains no project form.
- Preview overview, localizations, and activity screens contain no write controls, local CLI commands, or personal account claims.
- Unknown production preview project IDs return the application 404 page.
- Preview metadata, screen discovery, screenshots, and settings routes are unsupported and return 404 in production.
- Narrow screens retain the desktop-only dashboard notice, with copy that identifies the sample preview.
- Dashboard pages remain `noindex` through `src/app/projects/layout.tsx`.
- The localizer HTTP API remains local-only. In production it responds with a structured `503 service_unavailable` response rather than touching local filesystem storage. The tRPC dashboard prototype endpoint is development-only and returns an unavailable error in production.

The preview copy must say "sample data" directly and explain that visitors can look around but cannot edit or save anything. Avoid internal terms such as "bundled project," "validated project data," and "read-only workspace" in the interface.

## Data boundary

`src/server/localizer/preview/productionPreviewProject.ts` owns the sample project. It is validated with the same `projectStateSchema` used for local projects when the module loads. It is bundled with the application, has no database dependency, and must not include real user content.

`src/server/localizer/workspace/resolveDashboardWorkspace.ts` selects the mode: local development/test retains the persistent repository workflow, while any non-local environment uses the public preview mode.

## Related code

- `src/app/projects/**`: selects the local or preview route implementation.
- `src/features/dashboard/pages/ProductionPreview*.tsx`: focused read-only preview views.
- `src/features/dashboard/components/ProductionPreviewNotice.tsx`: shared user-facing boundary copy.
- `src/app/api/localizer/v1/localizerError.ts`: returns the intentional unavailable API response.
- `scripts/production-preview.mjs`: production regression coverage for preview routing, no-write content, and blocked API access.

## Verification

Run `npm run test`. It keeps the local CLI/API round trip and adds a production-build regression check for the public preview. The latter verifies the public action path through the rendered dashboard link, sample and unknown project routing, unsupported route 404s, no-write preview content, and local API/tRPC rejection.

## Future hosted work

Replace the public preview resolver with an authenticated hosted workspace only when identity, authorization, durable storage, audit behavior, and deletion controls are implemented together. Do not route hosted requests into the local development repository.
