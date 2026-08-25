# Xcode catalog integration

## What it does

`localizer integrate` adds Localizer's generated default string catalog to an
existing iOS app target's Resources build phase. The generated catalog is
`Localizer/Generated/Localizable.xcstrings`, which lets native SwiftUI literal
lookups use the default table after the file is compiled into the app.

## Use it

Run `sync` first, then choose the exact Xcode application target:

```sh
node '/absolute/path/to/localizer-main/packages/localizer-cli/src/index.mjs' integrate \
  --xcodeproj Example.xcodeproj --target Example
```

The command is idempotent. It prints the modified project, catalog, target, and
the location of a backup copy of `project.pbxproj` under
`.localizer/xcode-backups/`.

## Safety rules

- The command requires the Ruby `xcodeproj` gem. Run `gem install xcodeproj` if
  it is not already available.
- It adds the catalog only to the target supplied by `--target`. Without that
  option, it selects all application targets.
- It refuses to add the generated default catalog when a different
  `Localizable.xcstrings` file already exists in the project. An agent or
  developer must merge catalog ownership deliberately in that case.
- It does not rewrite Swift source. The MCP completion task covers source
  changes, plural forms, placeholders, existing resources, and runtime checks.

## Relevant code

```text
packages/localizer-cli/src/runXcodeCatalogIntegration.mjs
packages/localizer-cli/src/createXcodeProjectBackup.mjs
packages/localizer-cli/scripts/integrate_xcode_catalog.rb
scripts/localizer-xcode-integration.mjs
```

## Verification

`npm run test:localizer-xcode-integration` creates an Xcode project with the
official `xcodeproj` library, integrates the catalog twice, and verifies that
the Resources build phase contains exactly one catalog file reference.
