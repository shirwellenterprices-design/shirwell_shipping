import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuideArticle } from "@/app/components/GuideArticle";
import GuideJsonLd from "@/app/components/GuideJsonLd";
import { getAllGuideSlugs, getGuide } from "@/lib/guides";
import { absoluteUrl, siteConfig } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return { title: "Guide not found" };

  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: `/guides/${guide.slug}` },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url: absoluteUrl(`/guides/${guide.slug}`),
      siteName: siteConfig.name,
      type: "article",
    },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  return (
    <>
      <GuideJsonLd guide={guide} />
      <GuideArticle guide={guide} />
    </>
  );
}
