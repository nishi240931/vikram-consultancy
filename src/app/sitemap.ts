import { MetadataRoute } from "next";
import { SEO_CONFIG } from "@/config/seo.config";
import { APP_CONFIG } from "@/config/app.config";
import { FEATURED_UNIVERSITIES_DATA } from "@/data/universities";
import { FALLBACK_COURSES_DATA } from "@/services/course.service";
import { FALLBACK_SCHOLARSHIPS_DATA } from "@/services/scholarship.service";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SEO_CONFIG.siteUrl;

  const routes = [
    "",
    "/about",
    "/services",
    "/destinations",
    "/universities",
    "/courses",
    "/scholarships",
    "/blogs",
    "/events",
    "/contact",
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

  const universityRoutes = FEATURED_UNIVERSITIES_DATA.map((u) => ({
    url: `${baseUrl}/universities/${u.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const courseRoutes = FALLBACK_COURSES_DATA.map((c) => ({
    url: `${baseUrl}/courses/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const scholarshipRoutes = FALLBACK_SCHOLARSHIPS_DATA.map((s) => ({
    url: `${baseUrl}/scholarships/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [
    ...routes,
    ...destinationRoutes,
    ...universityRoutes,
    ...courseRoutes,
    ...scholarshipRoutes,
  ];
}
