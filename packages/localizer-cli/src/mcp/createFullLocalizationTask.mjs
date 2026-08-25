export function createFullLocalizationTask(root, xcode) {
  return {
    root,
    nonNegotiableRules: [
      "Do not claim coverage from a regex scan. Inspect every app target and all user-facing resources.",
      "Preserve existing localization keys and catalogs. Do not replace a hand-maintained catalog.",
      "Use explicit stable keys and developer comments when source text has more than one meaning.",
      "Convert dynamic user-facing text to String(localized:), LocalizedStringResource, or an equivalent native API with typed placeholders.",
      "Add plural and device variations where grammatical rules require them.",
      "Do not localize bundle identifiers, accessibility identifiers, URLs, logs, analytics events, trademarks, or protected brand terms unless explicitly requested.",
      "Build and run every app target after the change, then exercise at least one long-text and one RTL pseudolanguage.",
    ],
    requiredInspection: [
      "SwiftUI views, UIKit/AppKit controllers, Swift packages, extensions, widgets, intents, notifications, and tests that render app UI.",
      "Existing .xcstrings, .strings, .stringsdict, InfoPlist.strings, storyboards, XIBs, localized assets, and App Store metadata sources.",
      "Every Xcode target that ships user-facing text.",
    ],
    xcode,
    completionEvidence: [
      "A catalog is in each intended target's resources build phase.",
      "No discovered nonlocalized user-facing string remains without a documented exclusion.",
      "All selected locales have reviewed values, including plural/variant forms.",
      "Build and localized runtime checks pass for every shipping target.",
    ],
    integrationCommand:
      "After sync creates Localizer/Generated/Localizable.xcstrings, run `localizer integrate --xcodeproj path/to/project.xcodeproj --target AppTarget` to add it idempotently to the target's resources.",
    agentWorkflow: [
      "Call scan_localization_sources and audit_localization_readiness, then inspect every unresolved target and resource named in the completion contract.",
      "Rewrite or explicitly exclude all user-facing source patterns that the analyzer cannot model safely. Keep the source code's native localization API and catalog table consistent.",
      "Call get_localization_project. Translate every active source string for each enabled non-source locale, preserving placeholders and approved terminology.",
      "Call save_localization_translations with the project revision and the complete reviewed batch. Refresh the project and retry if its revision changed.",
      "Run localizer sync, localizer integrate, and localizer audit. Resolve every action-required finding.",
      "Run `localizer verify --xcodeproj Example.xcodeproj --scheme Example --destination 'platform=iOS Simulator,name=iPhone 16' --locales es-ES,ar` for each shipping target. Then exercise long-text and RTL pseudolanguages. Record failures as unresolved work rather than certifying the app.",
    ],
  };
}
