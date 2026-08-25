import assert from "node:assert/strict";
import { createXcodeTestArguments } from "../packages/localizer-cli/src/verification/createXcodeTestArguments.mjs";
import { parseLocales } from "../packages/localizer-cli/src/verification/parseLocales.mjs";

assert.deepEqual(parseLocales("es-ES,ar,es-ES"), ["es-ES", "ar"]);
assert.throws(() => parseLocales("not a locale"), /BCP 47/);
assert.deepEqual(
  createXcodeTestArguments({
    project: "/tmp/Example.xcodeproj",
    scheme: "Example",
    destination: "platform=iOS Simulator,name=iPhone 16",
    locale: "es-ES",
  }),
  [
    "test",
    "-project",
    "/tmp/Example.xcodeproj",
    "-scheme",
    "Example",
    "-destination",
    "platform=iOS Simulator,name=iPhone 16",
    "-testLanguage",
    "es",
    "-testRegion",
    "ES",
  ],
);
console.log("Localizer verification command contract passed.");
