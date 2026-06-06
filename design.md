# Design System: Localizer

**Project ID:** localizer

## 1. Visual Theme & Atmosphere

Localizer uses a quiet, precise, productivity-first dashboard aesthetic. The interface should feel calm, fast, and trustworthy: a tool built for indie iOS developers who need to scan project health, review work, and take action without visual noise.

The mockup is airy but information-dense. Large page sections sit on a very pale app background, while individual task areas use crisp white panels with hairline borders. The overall mood is polished, utilitarian, and lightly premium, with visual interest coming from clean hierarchy, compact status indicators, small icons, and progress bars rather than decorative illustration.

The design should avoid marketing-page patterns. The first screen is the working product: projects, localization review, screenshot review, metadata editing, and workflow status.

## 2. Color Palette & Roles

- **Primary Localizer Teal (#0F8F86):** Used for primary actions, active navigation icons, selected tabs, approved state indicators, progress bars, and high-confidence completion states.
- **Deep Export Navy (#111827):** Used for high-emphasis export buttons and dark action controls that should stand apart from regular teal actions.
- **Soft Mint Selection (#E8F6F3):** Used for active sidebar rows, selected tab backgrounds, selected controls, and subtle success surfaces.
- **Pale App Canvas (#F7F9F8):** Used as the main application background behind panels.
- **Panel White (#FFFFFF):** Used for dashboard cards, tables, form areas, screenshot galleries, and primary content surfaces.
- **Fine Border Gray (#E5E7EB):** Used for panel borders, table dividers, input outlines, card edges, and subtle section separation.
- **Muted Text Slate (#6B7280):** Used for secondary labels, breadcrumbs, helper text, timestamps, and metadata descriptions.
- **Primary Text Charcoal (#111827):** Used for headings, project names, table content, and form values.
- **Warning Progress Gold (#F2C94C):** Used sparingly for partial screenshot or metadata completion states.
- **Edited Lavender (#EEF2FF):** Used for edited translation badges and low-emphasis non-final status labels.
- **Approved Mint (#DDF8EE):** Used for approved translation and metadata status badges.

## 3. Typography Rules

The typography should be compact, modern, and highly scannable. Use a neutral sans-serif with strong dashboard legibility. Inter is the preferred font.

Headings should use medium-to-semibold weight, not oversized hero typography. Main panel titles sit around 18 to 22 pixels. Section labels and table headers should be small, uppercase or title case where appropriate, and visually quiet.

Body copy should stay compact, around 12 to 14 pixels. Secondary text should use muted slate and lighter weight. Letter spacing should remain normal, with no negative tracking. Buttons and badges should use medium weight for clarity at small sizes.

## 4. Component Stylings

- **Buttons:** Primary buttons are compact rectangles with subtly rounded corners and solid Localizer Teal (#0F8F86). Export buttons use Deep Export Navy (#111827). Secondary controls use white backgrounds, fine gray borders, and muted text. Icon buttons should include a familiar icon and a tooltip when the icon is not obvious.
- **Cards/Containers:** Panels use Panel White (#FFFFFF), a one-pixel Fine Border Gray (#E5E7EB), and restrained 8 pixel corner rounding. Shadows should be whisper-soft or absent. Selected project cards use a teal border to indicate focus without adding heavy elevation.
- **Inputs/Forms:** Inputs use white backgrounds, fine gray borders, compact height, and placeholder text in muted slate. Search fields should include a search icon and occupy the table toolbar width cleanly.
- **Sidebar:** The sidebar is a fixed-width white rail with product identity at the top, navigation in the middle, plan usage metrics below, and account/help controls near the bottom. Active navigation rows use Soft Mint Selection (#E8F6F3) with Primary Localizer Teal (#0F8F86).
- **Tables:** Tables are flat, compact, and bordered. Header rows use muted labels. Rows are separated by fine gray lines. Status badges sit inline and use soft backgrounds rather than saturated fills.
- **Progress Bars:** Progress bars are thin, linear, and teal for healthy status. Warning progress uses Warning Progress Gold (#F2C94C). Labels should show both category and percentage.
- **Screenshot Tiles:** Screenshot previews use dark in-app imagery, small labels, and a compact download icon overlay in the lower-right corner. Tiles should stay aligned in a predictable grid.
- **Metadata Forms:** Metadata editing is laid out as paired source and localized fields. Status badges appear at the far right, aligned to each field group.

## 5. Layout Principles

The layout is a multi-panel operations dashboard. Use a fixed sidebar on the left and a responsive working canvas on the right.

Desktop layout should use a two-row grid:

- Top row: Projects on the left, Localizations on the right.
- Middle row: Screen Discovery, Screenshots, and Metadata.
- Bottom row: Localization Workflow as a full-width process strip.

Spacing should be tight but breathable. Use 16 to 24 pixels between major panels, 12 to 16 pixels inside panels, and compact 8 pixel spacing for rows, badges, and control clusters.

Alignment is strict. Panel headers, tabs, tables, and controls should sit on clear grid lines. Cards should not float inside other cards. Page sections should remain direct white panels on the pale canvas.

On narrower screens, the layout should collapse into a single-column working stack while preserving sidebar access or moving navigation into a top rail. Text must remain inside its containers, and dashboard panels should maintain stable dimensions so badges, progress bars, and preview tiles do not cause layout shift.

## 6. Iconography

Use thin-line icons with rounded stroke endings. Icons should be functional and familiar: folder for projects, globe or shield for localizations, camera for screenshots, file/edit for metadata, activity pulse for activity, settings gear for settings, download for exports, search for filtering, and plus for project creation.

Icons should usually appear at 16 to 20 pixels. Sidebar icons use muted slate by default and teal when active.

## 7. Interaction States

Hover states should be restrained. White controls can shift to Pale App Canvas (#F7F9F8). Teal controls can darken slightly. Active tabs use teal text, a thin teal underline, or a soft mint fill.

Selected entities should be clear but not heavy. Use teal borders, soft mint backgrounds, checked controls, or status pills instead of large shadows.

Loading states should preserve the layout skeleton. Empty states should be compact and operational, with a direct action instead of illustration-heavy messaging.
