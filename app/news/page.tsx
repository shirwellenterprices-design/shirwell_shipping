import type { Metadata } from "next";
import Link from "next/link";
import { newsArticles } from "@/lib/news";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shipping News & Updates",
  description: `Shipping industry updates, logistics tips, and service news from ${siteConfig.name}. Stay informed on freight trends, customs changes, and practical shipping advice.`,
  alternates: { canonical: "/news" },
};

export default function NewsPage() {
  return (
    <main className="min-h-[calc(100dvh-4rem)] bg-background px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-4xl animate-fade-up">
        <p className="text-sm font-semibold uppercase tracking-widest text-gold">Updates</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Shipping News &amp; Insights
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Practical freight industry updates, logistics guidance, and shipping tips from{" "}
          {siteConfig.name}. Each article is written for shippers who need clear decisions — not
          marketing fluff.
        </p>

        <ul className="mt-12 space-y-10">
          {newsArticles.map((article) => (
            <li key={article.slug} className="border-t border-border pt-8 first:border-t-0 first:pt-0">
              <p className="text-sm text-muted">{article.date}</p>
              <h2 className="mt-2 text-2xl font-bold text-foreground">
                <Link href={`/news/${article.slug}`} className="hover:text-gold">
                  {article.title}
                </Link>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted">{article.excerpt}</p>
              <Link
                href={`/news/${article.slug}`}
                className="mt-4 inline-block text-sm font-semibold text-gold hover:underline"
              >
                Read full article →
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-16 text-sm text-muted">
          Browse all shipping guides in the{" "}
          <Link href="/guides" className="font-semibold text-gold hover:underline">
            guides library
          </Link>
          {" "}·{" "}
          <Link href="/faq" className="font-semibold text-gold hover:underline">
            FAQ
          </Link>
          {" "}·{" "}
          <Link href="/contact" className="font-semibold text-gold hover:underline">
            Contact support
          </Link>
        </p>
      </div>
    </main>
  );
}
