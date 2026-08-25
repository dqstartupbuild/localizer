# Localized runtime verification

## What it does

`localizer verify` runs `xcodebuild test` once for each requested language and
region. It passes Xcode's test-language and test-region options, then writes a
machine-readable result to `.localizer/localized-verification.json`.

## Use it

```sh
node '/absolute/path/to/localizer-main/packages/localizer-cli/src/index.mjs' verify \
  --xcodeproj Example.xcodeproj \
  --scheme Example \
  --destination 'platform=iOS Simulator,name=iPhone 16' \
  --locales es-ES,fr-FR,ar
```

The command exits nonzero when any locale's test run fails. A successful test
run proves only the tests the target actually contains; the agent completion
contract still requires visual review of long-text and right-to-left
pseudolanguages.

## Relevant code

```text
packages/localizer-cli/src/runLocalizedVerification.mjs
packages/localizer-cli/src/verification/  locale parsing and xcodebuild command creation
scripts/localizer-verification.mjs
```

## Verification

`npm run test:localizer-verification` checks deterministic locale parsing and
the exact `xcodebuild test` arguments used for language and region coverage.
