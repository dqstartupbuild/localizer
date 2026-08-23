# Dashboard Application

## Overview

The Localizer web application is a routed T3 App. The root route is a simple marketing landing page with a looping product demo hero. The supplied mockup is used as a visual reference for dashboard density, hierarchy, color, spacing, tables, cards, and controls, but the product is implemented as actual screens instead of one combined mockup page.

The app currently represents the MVP dashboard surface for:

- Project creation and management
- CLI setup guidance
- Project overview and next actions
- Locale selection
- Translation review and manual overrides
- Screen and state discovery
- Screenshot generation review
- App Store metadata localization
- Activity and run status
- Build-generation settings

The implementation uses typed mock data served through tRPC. This keeps every page wired through a realistic server boundary while persistent storage and production job execution remain future work.

## Stack

The app was scaffolded with:

```sh
npm create t3-app@latest
```

Selected options:

- Next.js App Router
- TypeScript
- Tailwind CSS
- tRPC
- ESLint

The app also uses `lucide-react` for functional dashboard icons and `@playwright/test` for screenshot/video verification.

## Route Map

```text
/                                      -> marketing landing page with autoplay demo hero and /projects CTA
/projects                              -> project list and project creation entry point
/projects/new                          -> create project and CLI setup instructions
/projects/[projectId]/overview         -> project status, setup workflow, locales, next actions
/projects/[projectId]/localizations    -> string table, filters, approvals, manual override editor
/projects/[projectId]/screen-discovery -> discovered screens and suggested screenshot states
/projects/[projectId]/screenshots      -> screenshot run controls, matrix summary, preview gallery
/projects/[projectId]/metadata         -> App Store metadata localization review
/projects/[projectId]/activity         -> analysis, translation, metadata, and screenshot activity
/settings                              -> locales, build generation, and protected terms
```

## Data Flow

Dashboard routes fetch the current dashboard model server-side through tRPC:

```text
src/app/**/page.tsx
  -> api.dashboard.summary()
  -> src/server/api/routers/dashboard.ts
  -> src/server/data/dashboardData.ts
  -> page component
```

The shared data contract lives in:

```text
src/features/dashboard/types/dashboardData.ts
```

## File Tree

```text
src/
├── app/
│   ├── page.tsx
│   ├── projects/
│   │   ├── page.tsx
│   │   ├── new/page.tsx
│   │   └── [projectId]/
│   │       ├── overview/page.tsx
│   │       ├── localizations/page.tsx
│   │       ├── screen-discovery/page.tsx
│   │       ├── screenshots/page.tsx
│   │       ├── metadata/page.tsx
│   │       └── activity/page.tsx
│   └── settings/page.tsx
├── features/
│   ├── dashboard/
│   │   ├── components/
│   │   ├── pages/
│   │   └── types/
│   └── marketing/
│       └── pages/
├── public/
│   └── videos/
├── server/
│   ├── api/
│   └── data/
└── styles/
```

## Page Responsibilities

`LandingPage.tsx` renders the marketing home page with a muted, looping demo video, simple human copy, and the primary dashboard CTA.

`ProjectsPage.tsx` renders all connected applications and links into each project.

`NewProjectPage.tsx` captures app name and source locale, then shows the CLI setup command.

`ProjectOverviewPage.tsx` shows project health, setup steps, supported locales, recent activity, and primary next actions.

`LocalizationsPage.tsx` provides the translation table, locale filtering, approval states, and a focused manual override editor.

`ScreenDiscoveryPage.tsx` separates screen selection from state selection so developers can confirm screenshot candidates before generation.

`ScreenshotsPage.tsx` shows screenshot generation controls, matrix details, and localized screenshot previews.

`MetadataPage.tsx` handles App Store metadata fields and the review rules that differ from in-app strings.

`ActivityPage.tsx` exposes analysis and generation run status so reanalysis and blocked actions are visible.

`SettingsPage.tsx` handles locales, build-time generation behavior, and protected terms.

## Shared Components

`AppShell.tsx` owns the sidebar and page canvas.

`Sidebar.tsx` and `SidebarNavItem.tsx` render real route links with active state.

`PageHeader.tsx` gives every screen a title, product context, description, and actions.

Reusable primitives include:

- `Panel.tsx`
- `ToolbarButton.tsx`
- `ProgressBar.tsx`
- `StatusBadge.tsx`
- `OverviewStatCard.tsx`
- `EmptyStatePanel.tsx`

Feature panels from the mockup are reused where they map to a real page:

- `LocalizationsPanel.tsx`
- `ScreenDiscoveryPanel.tsx`
- `ScreenshotsPanel.tsx`
- `MetadataPanel.tsx`

## Responsive Behavior

Desktop uses a fixed left sidebar and focused page content. Pages use split layouts only when the secondary content is part of the workflow, such as a selected string editor, state candidates, run details, or settings controls.

The dashboard is intentionally desktop-only. Below the desktop breakpoint, `AppShell` replaces project navigation and controls with a direct message asking the user to continue from a desktop browser. The marketing site remains responsive and available on mobile. See `docs/features/desktop-only-dashboard.md`.

## Verification

Expected checks:

```sh
npm run typecheck
npm run lint
npm run build
```

The local app usually serves at:

```text
http://localhost:3001
```

Port `3000` is already occupied on this machine, so Next.js selects `3001`.

# Local development connection

The dashboard now runs against a persistent implicit local workspace in development and test. `/projects`, `/projects/new`, project overview, and localizations use the real local project services rather than fixture-only state. The dashboard does not claim it can inspect a developer’s Mac directly: it gives a copyable command and waits for the CLI analysis to arrive. See `docs/features/local-development-cli-dashboard.md`.
