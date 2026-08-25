import { getMissingApprovedTranslations } from "./getMissingApprovedTranslations.mjs";

function hasText(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function createEvidenceFindings(evidence) {
  if (!evidence || evidence.schemaVersion !== 1)
    return [
      {
        code: "missing_completion_evidence",
        message:
          "Create .localizer/localization-evidence.json using the full-localization skill before strict certification.",
      },
    ];
  const scope = evidence.declaredScope;
  const review = evidence.humanReview;
  const findings = [];
  if (!Array.isArray(scope?.targets) || !scope.targets.length)
    findings.push({
      code: "missing_declared_targets",
      message: "Completion evidence must name every shipping target.",
    });
  if (
    !Array.isArray(scope?.userFacingSurfaces) ||
    !scope.userFacingSurfaces.length
  )
    findings.push({
      code: "missing_declared_surfaces",
      message: "Completion evidence must list inspected user-facing surfaces.",
    });
  if (!Array.isArray(scope?.requiredFlows) || !scope.requiredFlows.length)
    findings.push({
      code: "missing_declared_flows",
      message:
        "Completion evidence must list localized flows that were exercised.",
    });
  if (!hasText(review?.reviewer) || !hasText(review?.reviewedAt))
    findings.push({
      code: "missing_human_reviewer",
      message:
        "Completion evidence must identify the human reviewer and review time.",
    });
  for (const field of [
    "longTextChecked",
    "rtlChecked",
    "dynamicContentChecked",
  ])
    if (review?.[field] !== true)
      findings.push({
        code: `missing_${field}`,
        message: `Completion evidence must confirm ${field}.`,
      });
  return findings;
}

function createVerificationFindings(verification, project) {
  const requiredLocales = project.locales.filter(
    (locale) => locale !== project.sourceLocale,
  );
  if (!verification || verification.schemaVersion !== 1)
    return [
      {
        code: "missing_localized_verification",
        message:
          "Run localizer verify for every shipping locale before strict certification.",
      },
    ];
  const results = Array.isArray(verification.results)
    ? verification.results
    : [];
  return requiredLocales.flatMap((locale) => {
    const result = results.find((item) => item.locale === locale);
    return result?.passed
      ? []
      : [
          {
            code: "localized_verification_missing_or_failed",
            locale,
            message: `Localized verification has not passed for ${locale}.`,
          },
        ];
  });
}

export function createStrictLocalizationCheck({
  audit,
  project,
  verification,
  evidence,
}) {
  const findings = [
    ...(audit.findings ?? []),
    ...getMissingApprovedTranslations(project).map((item) => ({
      code: "missing_approved_translation",
      ...item,
      message: `No approved translation exists for ${item.stableKey} in ${item.locale}.`,
    })),
    ...createVerificationFindings(verification, project),
    ...createEvidenceFindings(evidence),
  ];
  return {
    status: findings.length ? "action_required" : "certification_ready",
    findings,
    certification:
      "Certification-ready means declared scope, translation coverage, automated evidence, and explicit human review are present. It does not assert coverage beyond the declared release scope.",
  };
}
