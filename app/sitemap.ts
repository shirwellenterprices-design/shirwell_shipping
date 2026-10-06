import type { MetadataRoute } from "next";
import { guides } from "@/lib/guides";
import { newsArticles } from "@/lib/news";
import { absoluteUrl } from "@/lib/site";

/** Public sitemap for Search Console + AdSense crawlability. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes: {
    path: string;
    changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"];
    priority: number;
  }[] = [
    { path: "/", changeFrequency: "daily", priority: 1 },
    { path: "/home", changeFrequency: "daily", priority: 1 },
    { path: "/about", changeFrequency: "monthly", priority: 0.8 },
    { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
    { path: "/faq", changeFrequency: "monthly", priority: 0.75 },
    { path: "/news", changeFrequency: "weekly", priority: 0.8 },
    { path: "/shipping-guide", changeFrequency: "weekly", priority: 0.85 },
    { path: "/guides", changeFrequency: "weekly", priority: 0.9 },
    { path: "/feed.xml", changeFrequency: "weekly", priority: 0.6 },
    { path: "/track", changeFrequency: "weekly", priority: 0.9 },
    { path: "/book", changeFrequency: "monthly", priority: 0.8 },
    { path: "/calculator", changeFrequency: "monthly", priority: 0.8 },
    { path: "/privacy", changeFrequency: "yearly", priority: 0.5 },
    { path: "/terms", changeFrequency: "yearly", priority: 0.5 },
    { path: "/policies", changeFrequency: "yearly", priority: 0.55 },
    ...guides.map((guide) => ({
      path: `/guides/${guide.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    ...newsArticles.map((article) => ({
      path: `/news/${article.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
