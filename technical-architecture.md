# Technical Architecture: Localizer

## Purpose

`project_scope.md` defines what Localizer does. This document defines how the MVP should work technically.

The highest-risk parts of Localizer are:

- Swift source parsing
- User-facing text extraction
- Screen discovery
- Screen state discovery
- Translation storage and override handling
- Native iOS resource generation
- XCUITest generation
- Simulator screenshot capture
- Screenshot upload and review

This architecture assumes the MVP is native iOS only and runs from a macOS development environment with Xcode installed.

## Architecture Principles

1. Prefer local analysis over source upload.
   The CLI should parse the user's project locally and upload normalized analysis manifests, not full source code.

2. Keep generated artifacts deterministic.
   Re-running the same analysis with the same inputs should produce the same keys, manifests, generated Swift files, resource files, and screenshot test files.

3. Preserve user edits forever unless the user explicitly changes them.
   Machine translation can fill missing values, but it must not overwrite manual edits.

4. Avoid network-dependent normal builds.
   Build-time resource generation should use the local translation cache. Network sync should be explicit or enabled by CI configuration.

5. Use native iOS infrastructure.
   The MVP should generate native localization resources and native XCUITest screenshot automation rather than inventing a custom runtime localization layer.

6. Make unsupported cases visible.
   The CLI should classify findings by confidence and surface strings, screens, or states that require manual review.

7. Keep implementation files atomic.
   The repo's `coding-guidelines.md` requires one file, one purpose. Implementation should split parsers, visitors, generators, API handlers, models, jobs, and UI components by single responsibility.

## System Overview

Localizer has four major technical surfaces:

1. Dashboard
   Web UI for project setup, locale selection, translation review, screen selection, state selection, screenshot review, and metadata review.

2. Backend API
   Stores projects, analysis manifests, strings, translations, screen candidates, state candidates, screenshot runs, screenshot records, and metadata translations.

3. Background Jobs
   Runs AI classification, translation generation, metadata translation, stale detection, screenshot processing, and artifact cleanup.

4. CLI
   Runs inside the developer's iOS app repository. It performs local Swift parsing, project integration, resource generation, XCUITest generation, simulator execution, screenshot extraction, and upload.

The CLI is the only component that directly inspects the developer's local source tree.

## MVP Component Responsibilities

### Dashboard

The dashboard is responsible for:

- Project creation
- Locale selection
- Translation table review
- Manual translation edits
- Translation approval
- Screen candidate review
- State candidate review
- Screenshot run review
- App Store metadata input and review
- Reanalysis controls

The dashboard should not perform Swift parsing or screenshot capture.

### Backend API

The backend API is responsible for:

- Project and user authorization
- Analysis manifest ingestion
- Analysis diffing
- Translation persistence
- Manual override persistence
- Screen and state persistence
- Screenshot run orchestration metadata
- Signed upload URL creation
- Signed screenshot preview URL creation
- App Store metadata localization storage

### Background Jobs

Background jobs are responsible for:

- Translating new strings
- Translating metadata fields
- Classifying screens
- Suggesting screen states
- Marking stale strings, screens, and states
- Post-processing uploaded screenshots
- Cleaning abandoned screenshot runs

The MVP can run these jobs inside the same deployable backend process with a queue. There is no need to split services before scaling pressure proves it necessary.

### CLI

The CLI is responsible for:

- Authenticating the local project
- Writing local Localizer configuration
- Detecting Xcode projects and targets
- Installing Xcode build phases
- Installing generated file references
- Running local Swift parsing
- Building an analysis manifest
- Uploading the analysis manifest
- Pulling translation cache data
- Generating native localization resources
- Generating typed string accessors
- Generating XCUITest screenshot files
- Running screenshot automation
- Extracting screenshots from `.xcresult`
- Uploading screenshots

The `npx localizer` package should act as the user-facing wrapper. Swift parsing and Xcode project inspection should be delegated to a native macOS helper binary built with SwiftSyntax and Xcode tooling.

## Local Project Layout

After `npx localizer init`, the app repository should contain:

```text
.
├── .localizer/
│   ├── project.json
│   ├── analysis-cache.json
│   ├── translations-cache.json
│   └── screenshots-cache.json
├── Localizer/
│   ├── Generated/
│   │   ├── Localizer.xcstrings
│   │   ├── LocalizerStrings.generated.swift
│   │   └── LocalizerScreenshotsUITests.generated.swift
│   └── ScreenshotSupport/
│       └── LocalizerScreenshotSupport.generated.swift
└── localizer.config.json
```

`.localizer/project.json` may be committed if it contains only project identity and API endpoint data.

`.localizer/*-cache.json` should not be committed by default because it may contain translations, local analysis metadata, and run state.

`Localizer/Generated/*` can be committed or ignored depending on project settings. The safest MVP default is to commit generated resources and generated Swift accessors so clean checkouts build even before `localizer sync` runs.

## Local Configuration

`localizer.config.json` should be the root local configuration file.

Example:

```json
{
  "projectId": "proj_123",
  "appName": "Example App",
  "sourceLocale": "en-US",
  "selectedLocales": ["es-ES", "fr-FR", "de-DE"],
  "xcode": {
    "workspace": "Example.xcworkspace",
    "project": "Example.xcodeproj",
    "appTarget": "Example",
    "uiTestTarget": "ExampleUITests",
    "scheme": "Example"
  },
  "generation": {
    "resourceFormat": "xcstrings",
    "commitGeneratedFiles": true,
    "networkSyncDuringBuild": false
  },
  "screenshots": {
    "devices": ["iPhone 16 Pro"],
    "outputDirectory": ".localizer/screenshots"
  }
}
```

Secrets should not be stored in this file. User credentials should live in the OS keychain or a user-level Localizer credential file outside the app repository.

## Data Model

The backend should use a relational database for MVP. PostgreSQL is the default recommendation because Localizer needs strong consistency for manual overrides, analysis diffs, and status tracking.

### Core Tables

`projects`

- `id`
- `owner_id`
- `app_name`
- `source_locale`
- `created_at`
- `updated_at`

`project_locales`

- `id`
- `project_id`
- `locale`
- `enabled`
- `created_at`

`analysis_runs`

- `id`
- `project_id`
- `cli_version`
- `xcode_version`
- `swift_version`
- `source_hash`
- `status`
- `started_at`
- `completed_at`

`source_strings`

- `id`
- `project_id`
- `stable_key`
- `default_text`
- `normalized_text`
- `developer_comment`
- `classification`
- `status`
- `first_seen_analysis_run_id`
- `last_seen_analysis_run_id`
- `created_at`
- `updated_at`

`string_occurrences`

- `id`
- `source_string_id`
- `analysis_run_id`
- `file_path_hash`
- `symbol_path`
- `ui_context`
- `extraction_confidence`
- `rewrite_required`
- `created_at`

`translations`

- `id`
- `source_string_id`
- `locale`
- `value`
- `status`
- `origin`
- `provider`
- `approved_at`
- `created_at`
- `updated_at`

`translation_overrides`

- `id`
- `translation_id`
- `locale`
- `value`
- `edited_by_user_id`
- `created_at`
- `updated_at`

Manual edits can be stored directly on `translations.origin = "manual"` if desired, but a separate `translation_overrides` table makes the "never overwrite user edits" rule explicit.

`screens`

- `id`
- `project_id`
- `stable_screen_id`
- `source_type_name`
- `display_name`
- `purpose`
- `screenshot_value`
- `status`
- `selection_status`
- `first_seen_analysis_run_id`
- `last_seen_analysis_run_id`

`screen_states`

- `id`
- `screen_id`
- `stable_state_id`
- `display_name`
- `state_kind`
- `selection_status`
- `confidence`
- `setup_strategy`
- `created_at`
- `updated_at`

`screenshot_runs`

- `id`
- `project_id`
- `analysis_run_id`
- `status`
- `device_name`
- `xcode_version`
- `started_at`
- `completed_at`

`screenshots`

- `id`
- `screenshot_run_id`
- `screen_id`
- `screen_state_id`
- `locale`
- `device_name`
- `image_object_key`
- `width`
- `height`
- `status`
- `failure_reason`
- `created_at`

`metadata_items`

- `id`
- `project_id`
- `field_type`
- `source_value`
- `created_at`
- `updated_at`

`metadata_translations`

- `id`
- `metadata_item_id`
- `locale`
- `value`
- `status`
- `origin`
- `created_at`
- `updated_at`

## Stable IDs

Stable IDs are critical because analysis runs happen repeatedly.

### Source String Keys

Use two identifiers:

1. `stable_key`
   Represents the logical string entry used for translations and resource generation.

2. `occurrence_id`
   Represents a specific location where a string appeared in source code.

Recommended stable key:

```text
loc_<base32(sha256(project_id + normalized_default_text + optional_context_hint))[0..12]>
```

Recommended occurrence ID:

```text
occ_<base32(sha256(stable_key + normalized_file_path + symbol_path + ui_context))[0..12]>
```

This allows repeated text like `Save` to share one translation by default while still preserving where each occurrence appears.

Dashboard should eventually support splitting a shared string into separate contextual keys when the same source text needs different translations in different places.

### Screen IDs

Recommended screen ID:

```text
screen_<base32(sha256(module_name + type_name))[0..12]>
```

### State IDs

Recommended state ID:

```text
state_<base32(sha256(screen_id + normalized_state_name + state_kind))[0..12]>
```

## Swift Parsing Architecture

### Parser Choice

Use SwiftSyntax as the primary parser.

Reasoning:

- It understands Swift source structure.
- It can preserve source locations.
- It supports deterministic syntax tree traversal.
- It enables future source rewriting without regex.

Do not use regex as the primary extraction method. Regex can be used only for narrow fallback checks or generated file validation.

### Native Analyzer Binary

The npm CLI should call a native analyzer binary:

```sh
npx localizer analyze
```

Internally:

```text
Node CLI
  -> localizer-analyzer-macos
    -> SwiftSyntax visitors
    -> Xcode project inspector
    -> analysis manifest JSON
```

The analyzer binary should be versioned with the CLI and downloaded during install or first run.

### Analyzer Inputs

The analyzer needs:

- Repository root
- Xcode project or workspace path
- App target name
- UI test target name
- Source locale
- App name
- Protected glossary terms
- Ignore paths
- Previous analysis cache

### Analyzer Outputs

The analyzer emits one analysis manifest.

Example shape:

```json
{
  "schemaVersion": 1,
  "project": {
    "appName": "Example App",
    "sourceLocale": "en-US"
  },
  "environment": {
    "cliVersion": "0.1.0",
    "xcodeVersion": "17.0",
    "swiftVersion": "6.0"
  },
  "sourceHash": "sha256...",
  "strings": [],
  "screens": [],
  "navigationGraph": [],
  "stateCandidates": [],
  "rewritePlan": []
}
```

The manifest should be compact enough to upload without sending full source files.

## Text Extraction

### Extraction Visitors

SwiftSyntax visitors should be split by responsibility:

- SwiftUI text visitor
- UIKit text visitor
- AppKit exclusion visitor if future macOS code is detected
- Localized string API visitor
- String interpolation visitor
- Ignore pattern visitor
- Symbol context visitor
- Rewrite plan visitor

### SwiftUI Extraction

Detect string literals passed to SwiftUI APIs likely to render user-facing text:

- `Text`
- `Label`
- `Button`
- `NavigationLink`
- `.navigationTitle`
- `.tabItem`
- `.alert`
- `.confirmationDialog`
- `TextField`
- `SecureField`
- `Picker`
- `Toggle`
- `Menu`

Examples:

```swift
Text("Welcome Back")
Button("Continue") { }
.navigationTitle("Settings")
```

These should produce localizable source strings.

### UIKit Extraction

Detect user-facing string literals assigned to UIKit properties or passed to UIKit initializers:

- `UILabel.text`
- `UIButton.setTitle`
- `UINavigationItem.title`
- `UIViewController.title`
- `UITextField.placeholder`
- `UIAlertController`
- `UIAction`
- `UIMenu`
- `UISegmentedControl`

Examples:

```swift
title = "Settings"
nameLabel.text = "Name"
button.setTitle("Save", for: .normal)
```

UIKit strings usually require source rewriting or explicit generated accessors because resource generation alone does not localize arbitrary `String` assignments.

### Existing Localization APIs

Detect and preserve existing localization calls:

- `NSLocalizedString`
- `String(localized:)`
- `LocalizedStringResource`
- `LocalizedStringKey`

These should be imported into Localizer as existing keys rather than rewritten blindly.

### Interpolation

Simple interpolations should be converted into placeholderized strings.

Example:

```swift
Text("Welcome, \(name)")
```

Manifest entry:

```json
{
  "defaultText": "Welcome, {name}",
  "placeholders": [
    {
      "name": "name",
      "swiftExpression": "name",
      "format": "string"
    }
  ]
}
```

Generated accessor:

```swift
static func welcomeName(_ name: String) -> String
```

Complex concatenation should be flagged for manual review.

### Ignore Rules

The analyzer should ignore:

- App name
- Protected brand terms
- Product names
- Class names
- Enum case names
- Internal identifiers
- Debug strings
- Logging strings
- Test-only strings outside screenshot test generation
- Accessibility identifiers
- File names
- URL strings
- Bundle identifiers

Ignore decisions should include a reason in the manifest so the dashboard can expose false negatives later if needed.

### Classification Confidence

Every extracted string should include:

- `ui_context`
- `classification`
- `confidence`
- `rewrite_required`
- `reason`

Example:

```json
{
  "defaultText": "Welcome Back",
  "classification": "user_facing_text",
  "confidence": 0.97,
  "rewriteRequired": false,
  "reason": "SwiftUI Text initializer"
}
```

## Source Rewriting

Resource generation alone is not enough for every iOS string. SwiftUI often resolves literal strings through localization infrastructure, but UIKit and generic `String` values do not.

The MVP should support deterministic source rewriting, but rewriting should be an explicit CLI operation, not something that happens during every build.

### Rewrite Flow

1. Analyzer creates a rewrite plan.
2. Dashboard or CLI shows high-confidence rewrite candidates.
3. Developer runs:

```sh
npx localizer apply
```

4. CLI applies SwiftSyntax-based rewrites.
5. CLI writes generated typed accessors.

### Rewrite Examples

UIKit assignment:

```swift
title = "Settings"
```

Becomes:

```swift
title = LocalizerStrings.settings
```

SwiftUI text:

```swift
Text("Welcome Back")
```

Can remain unchanged if the generated resource key is the literal text, or it can become:

```swift
Text(LocalizerStrings.welcomeBack)
```

The MVP should prefer leaving SwiftUI literals unchanged when native localization can resolve them correctly. Rewrite only when required for consistency, placeholders, or non-localizing contexts.

### Rewrite Safety

The rewriter must:

- Operate through SwiftSyntax
- Preserve formatting as much as possible
- Create a patch preview before applying
- Avoid rewriting low-confidence findings
- Avoid rewriting generated files
- Avoid rewriting test files unless they are Localizer-generated screenshot tests
- Be idempotent

## Screen Discovery

Screen discovery combines static parsing and AI classification.

### Static Screen Detection

The analyzer should detect SwiftUI screens:

- `struct SomeView: View`
- `var body: some View`
- `NavigationStack`
- `NavigationSplitView`
- `NavigationLink`
- `.navigationDestination`
- `.sheet`
- `.fullScreenCover`
- `TabView`

The analyzer should detect UIKit screens:

- `UIViewController` subclasses
- `UITableViewController` subclasses
- `UICollectionViewController` subclasses
- `UITabBarController` destinations
- `UINavigationController` root and pushed controllers
- Storyboard references when statically discoverable

Storyboard support can be partial in the MVP. Native Swift and SwiftUI source should be the first target.

### Navigation Graph

The analyzer should emit a navigation graph.

Example:

```json
{
  "from": "screen_home",
  "to": "screen_settings",
  "trigger": {
    "kind": "button_tap",
    "label": "Settings",
    "accessibilityIdentifier": "localizer.nav.settings"
  },
  "confidence": 0.88
}
```

The graph is used for:

- Dashboard screen review
- Screenshot candidate ranking
- XCUITest path generation

### AI Screen Classification

Static analysis should produce raw candidates. AI should classify them into user-facing concepts.

Input to AI should include:

- Type name
- Parent type name
- UI text snippets
- Navigation relationships
- View hierarchy summary
- Source file path category
- Detected data states

Input should not include full source code by default.

AI output:

- Display name
- Screen purpose
- Screenshot value
- Candidate confidence
- Reasoning summary

Example:

```json
{
  "sourceTypeName": "WorkoutDetailView",
  "displayName": "Workout Detail",
  "purpose": "Shows workout metrics and completion details.",
  "screenshotValue": "high",
  "confidence": 0.91
}
```

### Screen Selection Persistence

If a developer includes or excludes a screen, future reanalysis must preserve that choice while the same stable screen ID still exists.

If a screen disappears from source, mark it stale instead of deleting it immediately.

## State Discovery

State discovery identifies meaningful UI states for screenshots.

### Static State Signals

The analyzer should detect:

- `if items.isEmpty`
- `switch state`
- `enum ViewState`
- `ProgressView`
- Empty state text
- Error state text
- Loading state text
- Success state text
- SwiftUI previews
- Preview data factories
- Mock data fixtures
- Boolean flags in view models

### AI State Suggestions

AI should convert raw state signals into user-facing screenshot states.

Example:

```json
{
  "screen": "ProgressView",
  "suggestedStates": [
    {
      "displayName": "Empty State",
      "stateKind": "empty",
      "confidence": 0.89
    },
    {
      "displayName": "Active User",
      "stateKind": "populated",
      "confidence": 0.82
    }
  ]
}
```

### State Setup Strategies

Every selected state needs a setup strategy for screenshot capture.

Supported MVP strategies:

1. `navigation_only`
   XCUITest reaches the screen through normal UI navigation and captures whatever default state the app shows.

2. `launch_argument`
   The app reads Localizer launch arguments and configures a known fixture state.

3. `generated_preview_host`
   The app launches into a generated debug-only screenshot host that renders a SwiftUI view with generated or discovered fixture data.

4. `manual_required`
   The state is valuable but cannot be generated safely yet. The dashboard should show it as requiring developer setup.

The MVP should be honest about state capture support. Fully automatic state setup will work best for simple SwiftUI views and apps with existing preview or fixture data.

## Screenshot Support Integration

### Launch Arguments

Generated XCUITests should launch the app with Localizer-specific arguments:

```text
-localizerMode screenshot
-localizerScreen screen_abc123
-localizerState state_def456
-AppleLanguages (es-ES)
-AppleLocale es_ES
```

The app should ignore these arguments unless Localizer screenshot support is installed and the build configuration allows it.

### Screenshot Support Code

The CLI should generate debug-only support code:

```swift
#if DEBUG
enum LocalizerScreenshotSupport {
    static func configureIfNeeded() {
        // Reads launch arguments and prepares screenshot state.
    }
}
#endif
```

For SwiftUI apps, init should add a small integration point near the app entry:

```swift
LocalizerScreenshotSupport.configureIfNeeded()
```

For UIKit apps, init should add the equivalent setup during app launch.

The generated support code should be isolated and easy to remove.

### Accessibility Identifiers

Generated XCUITests need stable selectors. Localized visible labels are not stable across locales.

The analyzer should detect navigation controls that need identifiers. If identifiers are missing, the rewrite plan should suggest adding generated identifiers.

Example:

```swift
Button("Settings") { ... }
    .accessibilityIdentifier("localizer.nav.settings")
```

The generated tests should prefer:

1. Explicit accessibility identifiers
2. Existing developer accessibility identifiers
3. Stable test-mode launch routing
4. Localized labels only as a last resort

## XCUITest Generation

### Generated Test File

The CLI should generate:

```text
Localizer/Generated/LocalizerScreenshotsUITests.generated.swift
```

The generated file belongs to the UI test target.

### Test Structure

Each selected screenshot target should produce a deterministic test method.

Screenshot target:

```text
locale + device + screen + state
```

Generated test example:

```swift
final class LocalizerScreenshotsUITests: XCTestCase {
    func test_esES_iPhone16Pro_settings_emptyState() throws {
        let app = XCUIApplication()
        app.launchArguments += [
            "-localizerMode", "screenshot",
            "-localizerScreen", "screen_settings",
            "-localizerState", "state_empty",
            "-AppleLanguages", "(es-ES)",
            "-AppleLocale", "es_ES"
        ]
        app.launch()

        try LocalizerNavigator.navigateToSettings(in: app)
        LocalizerCapture.capture(name: "es-ES/settings/empty")
    }
}
```

Shared helpers should be generated or included once:

- `LocalizerNavigator`
- `LocalizerCapture`
- `LocalizerWait`
- `LocalizerFailureReporter`

### Navigation Generation

Navigation steps should come from the navigation graph.

Example:

```json
[
  {
    "action": "tap",
    "selector": {
      "kind": "accessibilityIdentifier",
      "value": "localizer.nav.settings"
    }
  }
]
```

Generated XCTest:

```swift
app.buttons["localizer.nav.settings"].tap()
```

If no reliable path exists, mark the screenshot target as `manual_required` instead of generating a brittle test.

### Locale Matrix

The CLI should generate screenshots for:

- Selected locales
- Selected screens
- Selected states
- Selected devices

The resulting matrix can get large quickly. The dashboard should show estimated screenshot count before the run starts.

## Screenshot Capture Pipeline

### Local Flow

1. CLI pulls selected screens, states, locales, and translations.
2. CLI generates resources and XCUITest files.
3. CLI builds the app and UI test target.
4. CLI boots the requested simulator.
5. CLI runs generated tests.
6. XCTest attaches screenshots to the test result bundle.
7. CLI extracts screenshots from `.xcresult`.
8. CLI normalizes file names.
9. CLI uploads screenshots.
10. CLI updates screenshot run status.

### Xcode Commands

The CLI should use `xcodebuild` directly.

Build:

```sh
xcodebuild \
  -workspace Example.xcworkspace \
  -scheme Example \
  -destination 'platform=iOS Simulator,name=iPhone 16 Pro' \
  build-for-testing
```

Run:

```sh
xcodebuild \
  -workspace Example.xcworkspace \
  -scheme Example \
  -destination 'platform=iOS Simulator,name=iPhone 16 Pro' \
  -resultBundlePath .localizer/xcresults/localizer.xcresult \
  test-without-building
```

### Screenshot Extraction

Screenshots should be attached through XCTest attachments. The CLI should extract them from `.xcresult` using `xcresulttool`.

Each extracted screenshot should be mapped back to:

- Screenshot run ID
- Locale
- Screen ID
- State ID
- Device name
- Test method

The generated attachment name should encode this mapping.

### Simulator Hygiene

For reliable output, the CLI should:

- Boot the requested simulator if needed
- Set a predictable appearance if supported by config
- Reset app state between tests when requested
- Disable animations where possible
- Wait for idle UI before capture
- Capture failure screenshots when navigation fails

The MVP does not need to erase the whole simulator before every screenshot, but it should provide a `--clean-simulator` option.

## Screenshot Storage

Images should be stored in object storage, not the database.

Recommended object key:

```text
projects/{project_id}/screenshots/{run_id}/{locale}/{device}/{screen_id}/{state_id}.png
```

The database stores object keys, dimensions, status, and metadata.

### Upload Flow

1. CLI creates screenshot run.
2. Backend returns signed upload URLs or a batch upload endpoint.
3. CLI uploads PNG files.
4. CLI confirms upload completion.
5. Backend marks screenshot records ready.

### Dashboard Preview

Dashboard should request signed read URLs from the backend. It should not expose raw bucket URLs if the bucket is private.

## Translation Generation

### Translation Job Flow

1. Analysis manifest creates or updates `source_strings`.
2. Backend computes missing translations for enabled locales.
3. Translation job builds locale-specific prompts.
4. Protected terms and app name are included as glossary constraints.
5. Translation provider returns values.
6. Backend stores machine translations only where no manual override exists.
7. Dashboard shows status.

### Translation Statuses

Recommended statuses:

- `missing`
- `machine_translated`
- `manual_edited`
- `approved`
- `stale_source_changed`
- `needs_review`

### Translation Origins

Recommended origins:

- `machine`
- `manual`
- `imported`
- `generated_from_metadata`

### Override Rule

If `translations.origin = "manual"` or an active `translation_overrides` row exists, automated jobs must not replace `value`.

If source text changes, the translation can be marked `stale_source_changed`, but the manual value remains.

## App Store Metadata Localization

Metadata localization is stored separately from app strings because metadata has different constraints.

Field-specific constraints:

- Subtitle length
- Keyword length and comma handling
- Promotional text length
- Description formatting
- In-app purchase name length
- In-app purchase description length

Translation jobs should validate field length after translation. If a locale exceeds the App Store limit, mark it `needs_review` and generate a shorter candidate.

The MVP uses manual paste input. App Store Connect import/export is future work.

## Build-Time Resource Generation

### Goal

At build time, the app should have current native localization resources and typed accessors without the developer manually editing localization files.

### Network Policy

Normal builds should not require network access.

Default:

```text
Build phase reads .localizer/translations-cache.json
Build phase generates Localizer/Generated files
```

Optional CI mode:

```text
LOCALIZER_SYNC=1
Build phase runs localizer sync before generation
```

### Generated Files

Preferred MVP generated resources:

```text
Localizer/Generated/Localizer.xcstrings
Localizer/Generated/LocalizerStrings.generated.swift
```

Fallback for older projects:

```text
Localizer/Generated/{locale}.lproj/Localizable.strings
Localizer/Generated/{locale}.lproj/Localizable.stringsdict
```

String catalogs should be the default for modern Xcode projects.

### Xcode Build Phase

`npx localizer init` should add a Run Script build phase before Compile Sources and Copy Bundle Resources.

Example:

```sh
if [ "$LOCALIZER_DISABLE_BUILD_GENERATION" = "1" ]; then
  exit 0
fi

npx localizer resources generate \
  --project-root "$SRCROOT" \
  --target "$TARGET_NAME" \
  --configuration "$CONFIGURATION"
```

The build phase should declare input and output files where possible so Xcode can skip unnecessary work.

### Resource Generation Flow

1. Read `localizer.config.json`.
2. Read `.localizer/translations-cache.json`.
3. Validate selected locales.
4. Validate required source strings.
5. Generate `Localizer.xcstrings`.
6. Generate `LocalizerStrings.generated.swift`.
7. Write a generation stamp with source hash and translation cache hash.

### Generated Swift Accessors

Generated accessors provide stable typed use for rewritten strings.

Example:

```swift
enum LocalizerStrings {
    static var settings: String {
        String(localized: "loc_j4k9x2m1q8aa", defaultValue: "Settings")
    }
}
```

Parameterized example:

```swift
enum LocalizerStrings {
    static func welcomeName(_ name: String) -> String {
        String(
            localized: "loc_r8p2vx19m0la",
            defaultValue: "Welcome, \(name)"
        )
    }
}
```

Generated accessor names should be human-readable when possible and collision-safe with a suffix when needed.

### Failure Behavior

If generation fails:

- Local development builds should show a clear error with the failed file and reason.
- CI builds should fail.
- Offline builds should continue if the local cache and generated files are valid.
- Missing cache with no generated files should fail because the app cannot be localized correctly.

## Analysis Reconciliation

Each analysis run should be reconciled against the previous known project state.

### New Strings

If a stable key is new:

- Create `source_strings`.
- Create occurrences.
- Queue translations for selected locales.

### Existing Strings

If a stable key already exists:

- Update `last_seen_analysis_run_id`.
- Add or update occurrences.
- Do not overwrite translations.

### Missing Strings

If a previously active key is missing:

- Mark as `stale`.
- Keep translations.
- Keep manual overrides.
- Exclude from generated resources only after a retention period or explicit cleanup.

### Changed Source Text

If an occurrence appears to represent the same UI context but source text changed:

- Create a new source string key if the normalized text changed.
- Link the old and new records through replacement metadata.
- Mark old translations as stale.
- Generate new machine translations unless the developer maps old translations forward.

## API Surface

The exact API style can be REST or RPC-like HTTP for MVP. The important part is clear ownership and idempotency.

Recommended endpoints:

```text
POST /projects
GET  /projects
GET  /projects/:projectId

POST /projects/:projectId/analysis-runs
GET  /projects/:projectId/analysis-runs/:analysisRunId

GET  /projects/:projectId/source-strings
PATCH /projects/:projectId/translations/:translationId
POST /projects/:projectId/translations/:translationId/approve

GET  /projects/:projectId/screens
PATCH /projects/:projectId/screens/:screenId
PATCH /projects/:projectId/screen-states/:stateId

GET  /projects/:projectId/localizer-cache
POST /projects/:projectId/screenshot-runs
POST /projects/:projectId/screenshot-runs/:runId/uploads
PATCH /projects/:projectId/screenshot-runs/:runId

GET  /projects/:projectId/metadata
PATCH /projects/:projectId/metadata/:metadataItemId
```

Analysis ingestion should be idempotent by `source_hash`. If the same manifest is uploaded twice, the backend should not duplicate strings, screens, or states.

## CLI Commands

Recommended MVP commands:

```sh
npx localizer init
npx localizer analyze
npx localizer sync
npx localizer apply
npx localizer resources generate
npx localizer screenshots generate
npx localizer status
```

### `init`

Initializes Localizer inside an iOS app repository.

Responsibilities:

- Authenticate user
- Connect local repo to project
- Detect Xcode project, workspace, schemes, and targets
- Write local config
- Add generated files
- Add Xcode build phase
- Add UI test target integration when needed

### `analyze`

Runs local parsing and uploads an analysis manifest.

### `sync`

Pulls latest translations, selected screens, selected states, metadata translations, and project settings into local cache.

### `apply`

Applies approved SwiftSyntax rewrite plan.

### `resources generate`

Generates native localization resources and typed Swift accessors from local cache.

### `screenshots generate`

Generates XCUITest files, runs screenshot automation, extracts screenshots, and uploads them.

### `status`

Reports local configuration, cache freshness, analysis status, selected locale count, selected screenshot count, and missing prerequisites.

## Privacy and Security

### Source Privacy

Default behavior should upload:

- Normalized strings
- Symbol names
- UI hierarchy summaries
- File path hashes
- Screen and navigation metadata

Default behavior should not upload:

- Full source files
- Secrets
- Environment files
- Build logs with credentials

Any AI step requiring source snippets should be opt-in and scoped to a small excerpt.

### Credentials

Project config in the repo should not contain user secrets.

Use:

- macOS Keychain for local user auth
- Environment variables for CI
- Short-lived signed URLs for screenshot upload

### Generated File Safety

Generated files should include a header:

```text
// Generated by Localizer. Do not edit directly.
```

The CLI should refuse to rewrite files outside the detected app project root.

## Observability

Localizer should track:

- Analysis duration
- Parser failures
- Strings extracted
- Strings ignored
- Screens discovered
- States suggested
- Translation jobs queued
- Translation jobs failed
- Screenshot targets generated
- Screenshot tests passed
- Screenshot tests failed
- Screenshot upload failures

The CLI should write local logs to:

```text
.localizer/logs/
```

The dashboard should expose user-actionable failures, not internal stack traces.

## MVP Technical Decisions

### Decision 1: Use a Modular Monolith Backend

Use one backend deployable with clear internal modules for projects, analysis, translations, screens, screenshots, metadata, and jobs.

Trade-off:

- Positive: Faster MVP development and simpler operations.
- Negative: Less independent scaling.
- Revisit when screenshot processing, translation jobs, or API traffic need independent scaling.

### Decision 2: Parse Swift Locally With SwiftSyntax

Use a native local analyzer instead of uploading source and parsing server-side.

Trade-off:

- Positive: Better privacy and more accurate Swift parsing.
- Negative: Requires distributing and updating a macOS helper binary.
- Revisit if analyzer distribution becomes a major support burden.

### Decision 3: Use XCUITest for Screenshots

Generate native XCUITests instead of using a custom screenshot runtime.

Trade-off:

- Positive: Uses the tools iOS developers already have installed.
- Negative: Navigation and state setup are difficult for complex apps.
- Revisit if generated tests become too brittle or too slow.

### Decision 4: Generate Resources From Local Cache During Build

Builds should read local cache and generate resources without requiring network access.

Trade-off:

- Positive: Normal builds remain reliable offline.
- Negative: Developers need to run `localizer sync` to receive dashboard edits locally.
- Revisit if users strongly prefer always-live build sync.

### Decision 5: Store Screenshots in Object Storage

Store screenshot binaries outside the database.

Trade-off:

- Positive: Scales better and keeps database rows small.
- Negative: Requires signed URL management.
- Revisit only if object storage complexity outweighs early MVP needs.

## Known Risks

1. Swift parsing coverage
   SwiftUI and UIKit patterns are broad. The MVP should support common patterns first and report unsupported patterns clearly.

2. Source rewriting trust
   Developers may be cautious about automated rewrites. Patch previews and idempotent SwiftSyntax rewrites are required.

3. Screenshot navigation brittleness
   XCUITest selectors must avoid localized labels. Accessibility identifiers or test-mode launch routing are necessary.

4. State setup complexity
   Automatically producing rich app states is hard without app-specific fixtures. The MVP needs generated support plus manual-required states.

5. Build phase reliability
   Build scripts that fail unclearly will frustrate users. Generation errors need concise actionable output.

6. String key churn
   Bad stable key design can destroy translation continuity. Keys should be based on normalized text and context, not line numbers.

## MVP Implementation Order

1. Project configuration and CLI init
2. SwiftSyntax text extraction
3. Backend project, locale, string, and translation storage
4. Translation generation and override handling
5. Local translation cache sync
6. Build-time `.xcstrings` generation
7. Generated Swift accessors
8. Basic SwiftUI screen discovery
9. Dashboard screen selection
10. Basic state suggestion
11. XCUITest generation for selected screens
12. Screenshot extraction from `.xcresult`
13. Screenshot upload and dashboard viewer
14. UIKit extraction and rewrite support
15. App Store metadata localization

This order gets application localization working before screenshot automation reaches full coverage.

## Open Questions

1. Should generated files be committed by default, or should Localizer default to ignored generated artifacts?

2. How aggressive should `npx localizer apply` be for SwiftUI literals that already work with native localization?

3. What is the minimum supported Xcode version for the MVP?

4. Should storyboard and nib extraction be included in MVP, or deferred until native Swift and SwiftUI flows are stable?

5. How much app source context may be sent to AI services for better classification?

6. Should Localizer require a UI test target, or create one automatically if missing?

7. Which simulator devices should be the default screenshot set?

8. How should teams handle multiple schemes or white-labeled targets in the MVP?
