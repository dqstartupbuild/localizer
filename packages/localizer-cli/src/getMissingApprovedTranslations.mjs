export function getMissingApprovedTranslations(project) {
  const requiredLocales = project.locales.filter(
    (locale) => locale !== project.sourceLocale,
  );
  return project.strings
    .filter((source) => !source.stale)
    .flatMap((source) =>
      requiredLocales.flatMap((locale) => {
        const translation = source.translations.find(
          (item) => item.locale === locale,
        );
        return translation?.status === "approved" && translation.value.trim()
          ? []
          : [{ stableKey: source.stableKey, locale }];
      }),
    );
}
