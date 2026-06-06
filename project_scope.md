# Project Scope: Localizer

## Overview

Localizer is a developer tool for iOS applications that enables indie developers to localize their apps, App Store metadata, and in-app screenshots from a single dashboard.

The primary goal is to allow a developer to localize an entire iOS application in approximately five minutes without manually managing localization files, translation workflows, screenshot automation, or App Store metadata translations.

While Localizer generates and maintains localization resources internally, developers should rarely need to interact with those files directly.

Core positioning:

Localize your entire iOS app, screenshots included, in 5 minutes.

⸻

## Problem Statement

Localizing an iOS application is currently fragmented and time-consuming.

Developers must:

- Extract strings manually
- Maintain localization files
- Translate content into multiple languages
- Keep translations synchronized as the application evolves
- Capture screenshots for every supported locale
- Localize App Store metadata
- Repeat the process every time the app changes

Most indie developers either delay localization or only support a handful of languages because the process is cumbersome.

Localizer simplifies this process into a single workflow.

⸻

## Target Audience

Primary Audience:

- Solo indie developers
- Bootstrapped founders
- Small mobile app teams

Initial Platform Support:

- Native iOS applications only

Future Platform Support:

- React Native
- Additional mobile platforms

⸻

## MVP Goals

The MVP should provide three primary capabilities:

1. Application Localization
2. Screenshot Automation
3. App Store Metadata Localization

All three should be managed from a unified dashboard.

⸻

## Product Architecture

The system consists of two major components:

### Dashboard

Web application where users:

- Create and manage projects
- Select supported locales
- Review translations
- Edit translations
- Review generated screenshots
- Review App Store metadata translations
- Re-run analyses
- Re-run screenshot generation
- Re-run localization generation

⸻

### CLI

Developer-installed command line tool.

Example:

```sh
npx localizer init
```

The CLI is responsible for:

- Connecting projects to Localizer
- Analyzing source code
- Discovering screens
- Extracting user-facing text
- Generating localization resources
- Generating screenshot automation
- Uploading screenshots
- Synchronizing project updates

The long-term goal is a single installation flow regardless of platform.

⸻

## MVP Workflow

### Step 1

User creates a project.

Required fields:

- App Name

The app name is never translated.

⸻

### Step 2

Dashboard provides CLI installation instructions.

Example:

```sh
npx localizer init
```

Developer runs the command inside the application project.

⸻

### Step 3

Localizer analyzes the application.

Analysis includes:

- Screens
- Navigation flows
- User-facing text
- App structure
- Potential screenshot states

⸻

### Step 4

Detected screens are presented to the developer.

Example:

- Home
- Profile
- Settings
- Workout Detail
- Progress

Developer selects which screens should participate in screenshot generation.

⸻

### Step 5

Potential screen states are presented.

Examples:

- Empty State
- New User State
- Active User State
- Completed State

Developer confirms desired states.

⸻

### Step 6

Developer selects supported locales.

Examples:

- English
- Spanish
- French
- German
- Italian
- Japanese
- Korean
- Portuguese
- Chinese

The system should support all App Store locales.

⸻

### Step 7

Localization and screenshot generation begin.

⸻

## Feature 1: Application Localization

### Goal

Automatically localize all user-facing text within an application.

⸻

### Text Extraction

The system should identify:

- Button labels
- Titles
- Subtitles
- Navigation labels
- Menu items
- Form labels
- Error messages
- Empty states
- Onboarding content
- Subscription content
- Settings content
- User interface text

The system should ignore:

- Internal identifiers
- Variable names
- Class names
- App name
- Brand names
- Product names
- Proper nouns that should remain untranslated

Examples:

Translate:

Welcome Back

Do not translate:

Spider-Man

⸻

### Translation Rules

Translations should be generated for each selected locale.

Translations should be adapted for native speakers rather than performing literal word-for-word translation.

The objective is App Store quality localization.

⸻

### Translation Editing

Users must be able to:

- View translations
- Search translations
- Filter translations
- Edit translations
- Approve translations

⸻

### Translation Overrides

User edits must always take precedence.

Future scans should never overwrite manually edited translations.

⸻

### Incremental Updates

When the application changes:

- New strings should be translated automatically
- Existing strings should remain unchanged
- User overrides should remain intact

⸻

### Resource Generation

Localization resources should be generated during build processes.

The system should integrate with native iOS localization infrastructure.

The implementation should feel invisible to the developer.

The developer should not be required to manually manage localization resources.

⸻

## Feature 2: AI-Assisted Screen Discovery

### Goal

Automatically identify application screens and likely screenshot candidates.

⸻

### Screen Detection

The analysis engine should detect:

- SwiftUI Views
- UIViewControllers
- Navigation destinations
- Sheets
- Full-screen modals
- Tab navigation destinations

⸻

### AI Classification

AI should analyze discovered screens and determine:

- Screen name
- Purpose
- Screenshot value

Example:

WorkoutDetailView

Might become:

Workout Detail
High Value Screenshot Candidate

⸻

### Screen Selection

Developers should be able to:

- Include screens
- Exclude screens
- Re-analyze screens later

⸻

## Feature 3: AI-Assisted State Discovery

### Goal

Identify meaningful screen states that should be captured.

Examples:

Progress Screen:

- Empty State
- First Workout
- Active User
- Achievement Unlocked

Dashboard:

- No Data
- Some Data
- Fully Populated

AI should suggest likely states.

Developer confirms final selections.

⸻

## Feature 4: Screenshot Automation

### Goal

Automatically generate localized in-app screenshots.

⸻

### Screenshot Engine

The system should leverage native iOS testing infrastructure.

Recommended implementation:

- XCUITest generation
- Simulator automation
- Locale switching
- Screenshot capture

⸻

### Screenshot Workflow

For each selected locale:

1. Launch application
2. Navigate to target screen
3. Enter selected state
4. Capture screenshot
5. Repeat for all screens
6. Repeat for all locales

⸻

### Screenshot Storage

Generated screenshots should be uploaded to the dashboard.

⸻

### Screenshot Viewer

Developers should be able to:

- Browse screenshots
- Filter by locale
- Filter by screen
- Regenerate screenshots

⸻

### MVP Limitation

MVP generates raw in-app screenshots only.

No device frames.

No App Store marketing layouts.

No promotional graphics.

⸻

## Feature 5: App Store Metadata Localization

### Goal

Automatically localize App Store metadata.

⸻

### Supported Fields

Application:

- Subtitle
- Description
- Keywords
- Promotional Text

In-App Purchases:

- Name
- Description

⸻

### MVP Workflow

Developer manually pastes source content.

Localizer generates all locale versions.

⸻

### Future Version

Future releases may integrate directly with App Store Connect APIs.

Not part of MVP.

⸻

## Reanalysis System

Developers should be able to re-run:

- Localization analysis
- Screen discovery
- State discovery
- Screenshot generation
- Metadata localization

Individually or together.

⸻

## Dashboard Structure

### Projects

View all applications.

Actions:

- Create Project
- Open Project
- Delete Project

⸻

### Project Overview

Displays:

- Supported locales
- Translation status
- Screenshot status
- Last analysis date

⸻

### Localizations

Displays:

- All strings
- Search
- Filtering
- Editing
- Locale switching

⸻

### Screenshots

Displays:

- Screens
- States
- Locales
- Screenshot previews

⸻

### Metadata

Displays:

- Original metadata
- Localized metadata
- Editing controls

⸻

## Non-Goals For MVP

The following are intentionally excluded:

- React Native support
- Android support
- App Store Connect integration
- App importing from App Store URLs
- Screenshot framing
- Marketing screenshot generation
- Direct App Store submission
- Continuous localization sync
- OTA localization updates
- Remote localization delivery
- Localization quality scoring
- Team collaboration
- Multiple user roles

⸻

## Future Roadmap

### Phase 2

- React Native support
- App Store Connect import
- App Store Connect export
- Team collaboration

⸻

### Phase 3

- Android support
- Google Play localization
- Google Play screenshots

⸻

### Phase 4

- Automatic screenshot marketing layouts
- AI-generated screenshot copy
- ASO optimization suggestions
- Localization quality auditing

⸻

## Success Criteria

A developer should be able to:

1. Install Localizer
2. Connect their iOS application
3. Select supported locales
4. Review detected screens
5. Generate translations
6. Generate localized screenshots
7. Generate localized App Store metadata

All within approximately five minutes and without manually maintaining localization files.

If a developer can localize an iOS application and produce localized screenshots with minimal effort, the MVP is successful.
