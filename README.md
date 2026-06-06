# Localizer

Localizer is a routed T3 App for localizing iOS apps, App Store metadata, and in-app screenshots from one workflow.

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

The current application implements separate product screens using the mockup as a design reference:

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

## Demo

The current dashboard walkthrough is stored at:

```text
demos/localizer-dashboard-demo.webm
```
