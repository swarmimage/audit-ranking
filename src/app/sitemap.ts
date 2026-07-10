import type { MetadataRoute } from "next";

const SITE_URL = "https://auditranking.uz";

const staticRoutes = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contacts", changeFrequency: "monthly", priority: 0.6 },
  { path: "/method", changeFrequency: "monthly", priority: 0.7 },
  { path: "/news", changeFrequency: "weekly", priority: 0.8 },
  { path: "/ratings", changeFrequency: "monthly", priority: 0.8 },
  { path: "/regulations", changeFrequency: "monthly", priority: 0.7 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return staticRoutes.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
