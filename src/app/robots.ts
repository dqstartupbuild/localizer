import { type MetadataRoute } from "next";
import { getSiteUrl } from "~/features/marketing/site/getSiteUrl";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/projects", "/api", "/settings", "/screenshots", "/metadata"],
    },
    ...(siteUrl
      ? { sitemap: new URL("/sitemap.xml", siteUrl).toString() }
      : {}),
  };
}
