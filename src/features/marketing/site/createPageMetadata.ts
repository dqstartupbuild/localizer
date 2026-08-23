import { type Metadata } from "next";

import { getSiteUrl } from "~/features/marketing/site/getSiteUrl";

type CreatePageMetadataInput = {
  description: string;
  path: string;
  title: string;
};

export function createPageMetadata({
  description,
  path,
  title,
}: CreatePageMetadataInput): Metadata {
  const siteUrl = getSiteUrl();
  const canonicalUrl = siteUrl ? new URL(path, siteUrl).toString() : undefined;

  return {
    title,
    description,
    ...(canonicalUrl ? { alternates: { canonical: path } } : {}),
    openGraph: {
      type: "website",
      ...(canonicalUrl ? { url: canonicalUrl } : {}),
      ...(siteUrl
        ? {
            images: [
              { url: new URL("/og/opengraph-image", siteUrl).toString() },
            ],
          }
        : {}),
      title,
      description,
      siteName: "Localizer",
    },
    twitter: {
      card: "summary_large_image",
      ...(siteUrl
        ? { images: [new URL("/og/opengraph-image", siteUrl).toString()] }
        : {}),
      title,
      description,
    },
  };
}
