import { type MetadataRoute } from "next";
import { getSiteUrl } from "~/features/marketing/site/getSiteUrl";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  if (!siteUrl) return [];
  const routes = ["/", "/support", "/privacy", "/terms", "/license"];
  return routes.map((route) => ({
    url: new URL(route, siteUrl).toString(),
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : 0.5,
  }));
}
