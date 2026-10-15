import type { MetadataRoute } from "next";
import { getAllDiseases, getAllBlogPosts } from "@/lib/content";
import { getSiteUrl } from "@/lib/structuredData";

/** Parses a "YYYY-MM-DD" frontmatter date; falls back to the build time for
 * anything that doesn't parse cleanly rather than emitting an Invalid Date
 * into the sitemap XML. */
function safeDate(value: string): Date {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? new Date() : date;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/diseases`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/search`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
  ];

  const diseaseRoutes: MetadataRoute.Sitemap = getAllDiseases().map((disease) => ({
    url: `${siteUrl}/diseases/${disease.slug}`,
    lastModified: safeDate(disease.lastReviewed),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  const blogRoutes: MetadataRoute.Sitemap = getAllBlogPosts().map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: safeDate(post.date),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...diseaseRoutes, ...blogRoutes];
}
