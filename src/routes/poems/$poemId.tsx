import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { useLanguage } from "@/lib/i18n";
import { findPoem, poems } from "@/lib/poems";

export const Route = createFileRoute("/poems/$poemId")({
  loader: ({ params }) => {
    const poem = findPoem(decodeURIComponent(params.poemId));
    if (!poem) throw notFound();
    return poem;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Poem"} — বইকথা` },
      { name: "description", content: `${loaderData?.title ?? "Poem"} — ${loaderData?.theme ?? ""}` },
      { property: "og:title", content: `${loaderData?.title ?? "Poem"} — বইকথা` },
      { property: "og:description", content: loaderData?.stanzas?.[0]?.join(" ") ?? "" },
      { property: "og:type", content: "article" },
    ],
  }),
  component: PoemPage,
});

function PoemPage() {
  const poem = Route.useLoaderData();
  const { t } = useLanguage();
  const index = poems.findIndex((item) => item.slug === poem.slug);
  const previous = index > 0 ? poems[index - 1] : undefined;
  const next = index < poems.length - 1 ? poems[index + 1] : undefined;

  return (
    <div className="bk-page">
      <SiteHeader />
      <main className="bk-wrap">
        <article className="bk-poem-page">
          <div className="bk-eyebrow">{poem.theme}</div>
          <h1>{poem.title}</h1>
          <div className="bk-poem-meta">
            <span>{poem.year}</span>
            <span>·</span>
            <span>বইকথা</span>
          </div>
          <div className="bk-poem-body">
            {poem.stanzas.map((stanza, stanzaIndex) => (
              <p className="bk-stanza" key={stanzaIndex}>
                {stanza.map((line, lineIndex) => (
                  <span key={lineIndex}>{line}</span>
                ))}
              </p>
            ))}
          </div>
          <nav className="bk-poem-nav">
            {previous ? (
              <Link to="/poems/$poemId" params={{ poemId: previous.slug }}>
                <ArrowLeft /> {previous.title}
              </Link>
            ) : (
              <Link to="/poems">
                <ArrowLeft /> {t("poems.all")}
              </Link>
            )}
            {next ? (
              <Link to="/poems/$poemId" params={{ poemId: next.slug }}>
                {next.title} <ArrowRight />
              </Link>
            ) : (
              <Link to="/poems">
                {t("poems.all")} <ArrowRight />
              </Link>
            )}
          </nav>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
