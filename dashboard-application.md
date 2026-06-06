# Dashboard Application

## Overview

The first Localizer application screen is a T3 App dashboard built from the supplied mockup and the product scope documents.

It represents the main working surface for:

- Project health
- Translation review
- Screen discovery
- Screenshot review
- App Store metadata localization
- Localization workflow progress

The current implementation uses typed mock data served through tRPC. This keeps the UI wired to a realistic server boundary while the persistent database and production backend are still future work.

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

The dashboard also uses `lucide-react` for icons so controls use familiar symbols instead of custom SVGs.

## Design Source

`design.md` defines the semantic design system extracted from the mockup.

The UI follows these core rules:

- Pale app canvas
- White bordered operational panels
- Teal primary actions and approved states
- Dark navy export actions
- Compact tables and controls
- 8 pixel or smaller panel rounding
- Dense dashboard layout on desktop
- Compact mobile navigation with stacked work panels

## Data Flow

The App Router page fetches dashboard data server-side:

```text
src/app/page.tsx
  -> api.dashboard.summary()
  -> src/server/api/routers/dashboard.ts
  -> src/server/data/dashboardData.ts
  -> LocalizerDashboard
```

The data contract lives in:

```text
src/features/dashboard/types/dashboardData.ts
```

This keeps the current app type-safe while leaving room to replace static data with database-backed queries later.

## File Tree

```text
src/
├── app/
│   ├── layout.tsx
│   └── page.tsx
├── features/
│   └── dashboard/
│       ├── components/
│       │   ├── BrandMark.tsx
│       │   ├── LocalizationTable.tsx
│       │   ├── LocalizationTabs.tsx
│       │   ├── LocalizationsPanel.tsx
│       │   ├── LocalizerDashboard.tsx
│       │   ├── MetadataFieldRow.tsx
│       │   ├── MetadataPanel.tsx
│       │   ├── Panel.tsx
│       │   ├── PhoneScreenshotPreview.tsx
│       │   ├── ProgressBar.tsx
│       │   ├── ProjectCard.tsx
│       │   ├── ProjectLogo.tsx
│       │   ├── ProjectMetric.tsx
│       │   ├── ProjectsPanel.tsx
│       │   ├── ScreenCandidateRow.tsx
│       │   ├── ScreenDiscoveryPanel.tsx
│       │   ├── ScreenThumb.tsx
│       │   ├── ScreenshotTile.tsx
│       │   ├── ScreenshotsPanel.tsx
│       │   ├── Sidebar.tsx
│       │   ├── SidebarHelpCard.tsx
│       │   ├── SidebarNavItem.tsx
│       │   ├── SidebarPlanCard.tsx
│       │   ├── SidebarUserCard.tsx
│       │   ├── StatusBadge.tsx
│       │   ├── ToolbarButton.tsx
│       │   ├── WorkflowStepItem.tsx
│       │   └── WorkflowStrip.tsx
│       └── types/
│           └── dashboardData.ts
├── server/
│   ├── api/
│   │   ├── root.ts
│   │   └── routers/
│   │       └── dashboard.ts
│   └── data/
│       └── dashboardData.ts
└── styles/
    └── globals.css
```

## Component Responsibilities

`LocalizerDashboard.tsx` composes the full page layout.

`Sidebar.tsx` owns the app navigation shell. It renders the full plan and account area on desktop, then collapses to compact navigation on mobile.

`ProjectsPanel.tsx` renders project cards and completion metrics.

`LocalizationsPanel.tsx` renders translation tabs, search, locale controls, export controls, and the localization table.

`ScreenDiscoveryPanel.tsx` renders detected screen candidates, confidence, and selection state.

`ScreenshotsPanel.tsx` renders locale controls, screen tabs, generated screenshot previews, and the regenerate action.

`MetadataPanel.tsx` renders App Store metadata source and translated fields.

`WorkflowStrip.tsx` renders the bottom workflow progression.

Shared UI primitives include:

- `Panel.tsx`
- `ToolbarButton.tsx`
- `ProgressBar.tsx`
- `StatusBadge.tsx`

## Responsive Behavior

Desktop uses a left sidebar plus a two-row operational grid:

- Projects and Localizations on the top row
- Screen Discovery, Screenshots, and Metadata on the second row
- Workflow strip across the bottom

Mobile uses:

- Compact top navigation
- Hidden desktop-only plan and account blocks
- Single-column work panels
- Horizontally scrollable dense tables where needed

## Verification

Commands run:

```sh
npm run typecheck
npm run lint
npm run build
```

The dev server was started with:

```sh
npm run dev
```

Port `3000` was already occupied, so Next.js served the app on:

```text
http://localhost:3001
```

Rendered page checks:

- `curl -I http://localhost:3001` returned `200 OK`.
- Desktop screenshot captured with Playwright at `1440x900`.
- Mobile screenshot captured with Playwright at `390x1200`.

The Browser plugin was not exposed as a callable tool in this session, so Playwright CLI screenshots were used as the visual verification fallback.
