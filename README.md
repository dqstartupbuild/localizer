# Localizer

Localizer is a T3 App dashboard for localizing iOS apps, App Store metadata, and in-app screenshots from one workflow.

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

The current application implements the dashboard shown in the provided mockup:

- Project cards with localization, screenshot, and metadata progress
- Localization review table
- Screen discovery review
- Screenshot preview grid
- Metadata localization editor
- Localization workflow strip
- Responsive mobile layout

Dashboard data is currently served through a typed tRPC mock data router. Persistent storage and production workflows are covered in `technical-architecture.md` and are future implementation work.

## Demo

The current dashboard walkthrough is stored at:

```text
demos/localizer-dashboard-demo.webm
```
