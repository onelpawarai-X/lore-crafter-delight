import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { formatNumber, useLanguage } from "@/lib/i18n";
import { poems } from "@/lib/poems";

export const Route = createFileRoute("/poems/")({
  head: () => ({
    meta: [
      { title: "কবিতা — বইকথা" },
      { name: "description", content: "ইংরেজিতে লেখা ছোট কবিতার সংগ্রহ — ধীরে পড়ার জন্য।" },
      { property: "og:title", content: "কবিতা — বইকথা" },
      { property: "og:description", content: "Short poems in English, made for reading slowly." },
    ],
  }),
  component: PoemsPage,
});

function PoemsPage() {
  const { lang, t } = useLanguage();

  return (
    <div className="bk-page">
      <SiteHeader />
      <main>
        <div className="bk-wrap bk-page-head">
          <div className="bk-eyebrow">{t("poems.eyebrow")}</div>
          <h1>{t("poems.title")}</h1>
          <p className="bk-lede">{t("poems.lede")}</p>
        </div>
        <div className="bk-wrap bk-page-body">
          <div className="bk-poem-index">
            {poems.map((poem, index) => (
              <Link
                key={poem.slug}
                className="bk-poem-card"
                to="/poems/$poemId"
                params={{ poemId: poem.slug }}
              >
                <small>
                  {String(index + 1).padStart(2, "0")} · {poem.theme} · {poem.year}
                </small>
                <h2>{poem.title}</h2>
                <p>{(poem.stanzas[0] ?? []).join(" ")}</p>
              </Link>
            ))}
          </div>
          <p className="bk-lede" style={{ marginTop: 28 }}>
            {formatNumber(poems.length, lang)}
            {t("poems.count")}
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
