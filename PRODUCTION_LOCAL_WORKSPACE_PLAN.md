# Production account-free dashboard plan

## Goal

Allow desktop visitors to open the Localizer dashboard in production without an account while preserving the existing narrow-screen desktop-use notice. Keep the local development workspace durable on the developer's machine, and do not pretend that a hosted database or private account boundary exists.

## Required behavior

- `/projects`, sample overview, localizations, and activity render in production on desktop widths as a read-only preview.
- Narrow screens continue to show the existing desktop-only notice.
- Development and test continue using the persistent local workspace and local repository.
- Production uses an explicitly named, read-only public preview mode until hosted identity and storage are implemented.
- Public preview behavior is honest about its persistence and privacy boundaries.
- The marketing site's production dashboard actions may link to `/projects` once that route is safe.
- Dashboard and API routes remain `noindex`.

## Architecture review

1. Trace workspace resolution, repository selection, dashboard loaders, and API mutation paths.
2. Separate access mode from storage mode so production does not rely on a development-only identity fallback.
3. Choose the smallest safe preview repository behavior compatible with Vercel's runtime and the current no-backend constraint.
4. Keep production preview data isolated from local development data and avoid claiming durable or private storage.
5. Add regression tests for development, test, and production workspace resolution and public action routing.

## Implementation

1. Add one focused production preview workspace resolver or access-mode abstraction.
2. Wire dashboard services through the resolved account-free workspace without weakening future authenticated boundaries.
3. Update user-facing workspace copy so production preview limitations are clear and simple.
4. Restore production public actions to `/projects`.
5. Update privacy, support, README, and feature documentation to match the implemented production behavior.

## Verification

- Test `/projects` at mobile and desktop widths in development and a production build.
- Test all dashboard routes linked by the application at desktop width.
- Confirm narrow screens never render the compressed dashboard.
- Confirm production no longer returns 500 for `/projects`.
- Confirm no dashboard route becomes indexable.
- Run formatting, type checking, linting, tests, production build, and `git diff --check`.
- Recheck the anti-slop law for any UI or copy touched by the change.

## Delivery

Commit the correction and push `main` after validation.
