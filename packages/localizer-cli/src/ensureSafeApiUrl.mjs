export function ensureSafeApiUrl(apiUrl) {
  const url = new URL(apiUrl);
  const loopback = ["localhost", "127.0.0.1", "::1"].includes(url.hostname);
  if (url.protocol !== "https:" && !loopback)
    throw new Error(
      "Plain HTTP is allowed only for a loopback Localizer server.",
    );
  return url.toString().replace(/\/$/, "");
}
