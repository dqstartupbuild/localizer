export function createLocalizationAudit(analysis, xcode) {
  const catalogsMissingResources = xcode.catalogIntegration.filter(
    (catalog) => !catalog.presentInAnyResourcesBuildPhase,
  );
  const findings = [
    ...analysis.unsupportedPatterns.map((pattern) => ({
      code: "dynamic_localizable_call",
      severity: "action_required",
      file: pattern.file,
      line: pattern.line,
      message:
        "A localizable API receives a dynamic value. Convert it to a native localized resource with typed placeholders, or document a deliberate exclusion.",
    })),
    ...catalogsMissingResources.map((catalog) => ({
      code: "catalog_not_in_resources",
      severity: "action_required",
      file: catalog.catalog,
      line: null,
      message:
        "This catalog is not proven to be in an Xcode Resources build phase.",
    })),
  ];
  return {
    status: findings.length ? "action_required" : "agent_review_required",
    supportedStringCount: analysis.strings.length,
    dynamicLocalizableCallCount: analysis.unsupportedPatterns.length,
    xcode,
    findings,
    certification:
      "No automated audit can prove 100% localization for arbitrary application behavior. An agent or developer must inspect every shipping target and certify the completion evidence returned by the MCP task.",
  };
}
