const localSiteUrl = "http://localhost:3000";

function toHttpUrl(value: string | undefined) {
  if (!value) return null;

  try {
    const url = new URL(value.startsWith("http") ? value : `https://${value}`);
    return url.protocol === "http:" || url.protocol === "https:" ? url : null;
  } catch {
    return null;
  }
}

export function getSiteUrl() {
  const configuredUrl = toHttpUrl(process.env.NEXT_PUBLIC_SITE_URL);
  if (configuredUrl) return configuredUrl;

  const deploymentUrl = toHttpUrl(
    process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL,
  );
  if (deploymentUrl) return deploymentUrl;

  return process.env.NODE_ENV === "production" ? null : new URL(localSiteUrl);
}
