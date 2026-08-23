import { getSiteUrl } from "~/features/marketing/site/getSiteUrl";

export function SoftwareApplicationSchema() {
  const siteUrl = getSiteUrl();
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Localizer",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    description:
      "Check translations for an iOS app and sync them back to Xcode.",
    ...(siteUrl ? { url: siteUrl.toString() } : {}),
    codeRepository: "https://github.com/dqstartupbuild/localizer",
    license: "https://opensource.org/license/mit",
    isAccessibleForFree: true,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
