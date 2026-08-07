import { MetadataRoute } from "next";
import { SEO_CONFIG } from "@/config/seo.config";
import { APP_CONFIG } from "@/config/app.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SEO_CONFIG.siteUrl;

  const routes = [
    "",
    "/destinations",
    "/universities",
    "/courses",
    "/scholarships",
    "/book-consultation",
    "/privacy",
    "/terms",
    "/cookies",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const destinationRoutes = APP_CONFIG.destinations.map((d) => ({
    url: `${baseUrl}/destinations/${d.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...routes, ...destinationRoutes];
}
