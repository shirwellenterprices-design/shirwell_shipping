import { guides } from "@/lib/guides";
import { newsArticles } from "@/lib/news";
import { absoluteUrl, siteConfig } from "@/lib/site";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toRfc822(dateLabel: string): string {
  const parsed = Date.parse(dateLabel);
  const date = Number.isNaN(parsed) ? new Date() : new Date(parsed);
  return date.toUTCString();
}

/** RSS feed for Reader Revenue Manager / Publisher Center content discovery. */
export function GET() {
  const channelLink = absoluteUrl("/guides");
  const guideItems = guides.map((guide) => {
    const link = absoluteUrl(`/guides/${guide.slug}`);
    return `    <item>
      <title>${escapeXml(guide.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <description>${escapeXml(guide.description)}</description>
      <pubDate>${toRfc822(guide.updated)}</pubDate>
      <author>${escapeXml(siteConfig.contactEmail)} (${escapeXml(siteConfig.name)})</author>
    </item>`;
  });

  const newsItems = newsArticles.map((article) => {
    const link = absoluteUrl(`/news/${article.slug}`);
    return `    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <description>${escapeXml(article.excerpt)}</description>
      <pubDate>${toRfc822(article.date)}</pubDate>
      <author>${escapeXml(siteConfig.contactEmail)} (${escapeXml(siteConfig.name)})</author>
    </item>`;
  });

  const items = [...newsItems, ...guideItems].join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteConfig.name)} Shipping Guides &amp; News</title>
    <link>${escapeXml(channelLink)}</link>
    <description>${escapeXml(
      "Practical shipping guides and freight news: packing, customs, rates, tracking, and logistics updates.",
    )}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${escapeXml(absoluteUrl("/feed.xml"))}" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
