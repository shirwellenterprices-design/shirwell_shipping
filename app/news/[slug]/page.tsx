import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AdSenseAd from "@/app/components/AdSenseAd";
import { adsenseConfig } from "@/lib/adsense";
import { getAllNewsSlugs, getNewsArticle, newsArticles } from "@/lib/news";
import { absoluteUrl, siteConfig } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllNewsSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getNewsArticle(slug);
  if (!article) return { title: "Article not found" };

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/news/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: absoluteUrl(`/news/${article.slug}`),
      siteName: siteConfig.name,
      type: "article",
    },
  };
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getNewsArticle(slug);
  if (!article) notFound();

  const related = newsArticles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <main className="min-h-[calc(100dvh-4rem)] bg-background px-4 py-10 sm:px-6 sm:py-14">
      <article className="mx-auto max-w-3xl animate-fade-up">
        <p className="text-sm font-semibold uppercase tracking-widest text-gold">News</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {article.title}
        </h1>
        <p className="mt-3 text-sm text-muted">
          {article.date} · {siteConfig.name}
        </p>
        <p className="mt-6 text-lg leading-relaxed text-muted">{article.excerpt}</p>

        <div className="mt-8 space-y-5 text-base leading-relaxed text-muted">
          {article.body.split("\n\n").map((para) => (
            <p key={para.slice(0, 48)}>{para}</p>
          ))}
        </div>

        {adsenseConfig.enabled && adsenseConfig.inArticleSlot ? (
          <section aria-label="Advertisement" className="my-10">
            <AdSenseAd
              className="min-h-[120px]"
              slot={adsenseConfig.inArticleSlot}
              format="fluid"
              layout="in-article"
              fullWidthResponsive={false}
            />
          </section>
        ) : null}

        <p className="mt-8 text-sm">
          Related guide:{" "}
          <Link href={article.relatedGuide.href} className="font-semibold text-gold hover:underline">
            {article.relatedGuide.label}
          </Link>
        </p>

        <div className="mt-12 border-t border-border pt-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-muted">More updates</p>
          <ul className="mt-4 space-y-3">
            {related.map((a) => (
              <li key={a.slug}>
                <Link href={`/news/${a.slug}`} className="font-semibold text-gold hover:underline">
                  {a.title}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/news" className="text-muted hover:text-gold">
                All shipping news →
              </Link>
            </li>
          </ul>
        </div>
      </article>
    </main>
  );
}
