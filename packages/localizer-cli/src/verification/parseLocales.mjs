export function parseLocales(value) {
  if (typeof value !== "string" || !value.trim())
    throw new Error("verify requires --locales <locale[,locale]>.");
  const locales = [...new Set(value.split(",").map((locale) => locale.trim()))];
  if (
    locales.some((locale) => !/^[a-z]{2,3}(?:-[A-Za-z0-9]{2,8})*$/.test(locale))
  )
    throw new Error(
      "Each verification locale must be a BCP 47 locale identifier.",
    );
  return locales;
}
