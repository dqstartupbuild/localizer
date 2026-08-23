# Desktop-only dashboard

## What it does

The Localizer marketing site remains available at every viewport size. Dashboard routes that use `AppShell` show the full project workspace only at the desktop breakpoint and above. Narrower screens receive a short message asking the user to continue from a desktop browser.

The mobile message is visible immediately and does not depend on JavaScript, device detection, or an entrance animation. The dashboard remains mounted only as hidden responsive content, so its controls are not exposed visually or to assistive technology below the breakpoint.

## Why

Localization review, project navigation, source occurrences, and generated-file guidance need more horizontal space than a phone provides. A direct desktop notice is clearer than compressing the workspace into controls that are difficult to read or operate.

## Implementation

- `src/features/dashboard/components/DesktopOnlyDashboardNotice.tsx` owns the narrow-screen message.
- `src/features/dashboard/components/AppShell.tsx` switches between the notice and the dashboard at Tailwind's `lg` breakpoint.
- The breakpoint is viewport-based, so resized desktop windows receive the same honest guidance when there is not enough room.
- The notice contains no dead action. Users simply reopen the same dashboard URL on a desktop browser.

## Use cases

- A user follows a dashboard link on a phone and is told where the workflow is supported.
- A desktop browser narrower than the supported workspace width receives the same notice.
- A desktop browser at or above the breakpoint receives the complete project navigation and content.

## File tree

```text
src/features/dashboard/components/
├── AppShell.tsx
└── DesktopOnlyDashboardNotice.tsx
```

## Verification

Validate at a phone-sized viewport, immediately below the desktop breakpoint, at the desktop breakpoint, and at a wide desktop viewport. The notice must be the only dashboard content below the breakpoint, while desktop navigation and project controls must remain unchanged above it.
