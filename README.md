# Localizer

Localizer is a routed T3 App for localizing iOS apps, App Store metadata, and in-app screenshots from one workflow. The root route is a simple marketing landing page, and the dashboard starts at `/projects`.

## Docs

- [Project Scope](./project_scope.md)
- [Technical Architecture](./technical-architecture.md)
- [Design System](./design.md)
- [Dashboard Application](./dashboard-application.md)
- [Coding Guidelines](./coding-guidelines.md)

## Run Locally

```sh
npm install
npm run dev
```

If port `3000` is already in use, Next.js will choose the next available port.

## Verification

```sh
npm run typecheck
npm run lint
npm run build
```

## Current Implementation

The current application includes a non-technical marketing landing page and separate product screens using the mockup as a design reference:

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

Dashboard data is currently served through a typed tRPC mock data router. Persistent storage and production workflows are covered in `technical-architecture.md`.

The landing page hosts the recorded dashboard walkthrough from `public/videos/localizer-dashboard-demo.webm` as a muted, looping hero video. Its primary CTA links to `/projects`.

## Demo

The current dashboard walkthrough is stored at:

```text
demos/localizer-dashboard-demo.webm
```
