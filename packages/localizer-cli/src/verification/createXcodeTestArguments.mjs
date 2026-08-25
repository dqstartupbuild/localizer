export function createXcodeTestArguments({
  project,
  scheme,
  destination,
  locale,
}) {
  const [language, region] = locale.split("-");
  return [
    "test",
    "-project",
    project,
    "-scheme",
    scheme,
    "-destination",
    destination,
    "-testLanguage",
    language,
    ...(region ? ["-testRegion", region] : []),
  ];
}
