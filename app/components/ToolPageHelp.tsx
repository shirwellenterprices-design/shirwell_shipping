import Link from "next/link";

type HelpBlock = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  link?: { href: string; label: string };
};

export default function ToolPageHelp({
  title,
  intro,
  blocks,
}: {
  title: string;
  intro: string;
  blocks: HelpBlock[];
}) {
  return (
    <section className="mt-12 space-y-8 border-t border-border pt-10 text-base leading-relaxed text-muted">
      <div>
        <h2 className="text-xl font-semibold text-foreground">{title}</h2>
        <p className="mt-3">{intro}</p>
      </div>
      {blocks.map((block) => (
        <div key={block.heading}>
          <h3 className="text-lg font-semibold text-foreground">{block.heading}</h3>
          {block.paragraphs.map((p) => (
            <p key={p.slice(0, 40)} className="mt-3">
              {p}
            </p>
          ))}
          {block.bullets && block.bullets.length > 0 ? (
            <ul className="mt-3 list-disc space-y-2 pl-5">
              {block.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
          {block.link ? (
            <p className="mt-3">
              <Link href={block.link.href} className="font-semibold text-gold hover:underline">
                {block.link.label}
              </Link>
            </p>
          ) : null}
        </div>
      ))}
    </section>
  );
}
