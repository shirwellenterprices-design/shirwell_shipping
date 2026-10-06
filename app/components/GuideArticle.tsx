import Link from "next/link";
import type { Guide } from "@/lib/guides";
import { guides } from "@/lib/guides";
import AdSenseAd from "@/app/components/AdSenseAd";
import MatchedContentAd from "@/app/components/MatchedContentAd";
import { adsenseConfig } from "@/lib/adsense";

export function GuideArticle({ guide }: { guide: Guide }) {
  const related = guides.filter((g) => g.slug !== guide.slug).slice(0, 3);
  const mid = Math.ceil(guide.sections.length / 2);

  return (
    <main className="min-h-[calc(100dvh-4rem)] bg-background px-4 py-10 sm:px-6 sm:py-14">
      <article className="mx-auto max-w-3xl animate-fade-up">
        <p className="text-sm font-semibold uppercase tracking-widest text-gold">Guides</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {guide.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">{guide.description}</p>
        <p className="mt-3 text-sm text-muted/80">
          Updated {guide.updated} · {guide.readingMinutes} min read
        </p>

        <div className="mt-10 space-y-10 text-base leading-relaxed text-foreground/90">
          {guide.sections.map((section, index) => (
            <div key={section.heading}>
              <section>
                <h2 className="text-xl font-semibold text-foreground">{section.heading}</h2>
                {section.paragraphs.map((p) => (
                  <p key={p.slice(0, 48)} className="mt-3 text-muted">
                    {p}
                  </p>
                ))}
                {section.bullets && section.bullets.length > 0 && (
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-muted">
                    {section.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
              {adsenseConfig.enabled && adsenseConfig.inArticleSlot && index === 0 && (
                <section aria-label="Advertisement" className="overflow-visible py-6">
                  <AdSenseAd
                    className="min-h-[120px]"
                    slot={adsenseConfig.inArticleSlot}
                    format="fluid"
                    layout="in-article"
                    fullWidthResponsive={false}
                  />
                </section>
              )}
              {adsenseConfig.enabled && index === mid - 1 && mid > 1 && (
                <section aria-label="Advertisement" className="overflow-visible py-4">
                  <AdSenseAd
                    className="min-h-[250px]"
                    slot={adsenseConfig.boxAdSlot}
                    format="rectangle"
                  />
                </section>
              )}
            </div>
          ))}
        </div>

        <MatchedContentAd />

        <div className="mt-12 border-t border-border pt-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-muted">
            Continue reading
          </p>
          <ul className="mt-4 space-y-3">
            {related.map((g) => (
              <li key={g.slug}>
                <Link
                  href={`/guides/${g.slug}`}
                  className="font-semibold text-gold hover:underline"
                >
                  {g.title}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/guides" className="text-muted hover:text-gold">
                All shipping guides →
              </Link>
            </li>
          </ul>
        </div>
      </article>
    </main>
  );
}
