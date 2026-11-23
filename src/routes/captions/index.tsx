import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { formatNumber, useLanguage } from "@/lib/i18n";
import { captions } from "@/lib/captions";

export const Route = createFileRoute("/captions/")({
  head: () => ({
    meta: [
      { title: "ক্যাপশন — বইকথা" },
      { name: "description", content: "ছোট ছোট ইংরেজি ক্যাপশন — পড়ুন, কপি করুন, রেখে দিন।" },
      { property: "og:title", content: "ক্যাপশন — বইকথা" },
      { property: "og:description", content: "Short captions in English about reading, nights and quiet days." },
    ],
  }),
  component: CaptionsPage,
});

function CaptionsPage() {
  const { lang, t } = useLanguage();

  return (
    <div className="bk-page">
      <SiteHeader />
      <main>
        <div className="bk-wrap bk-page-head">
          <div className="bk-eyebrow">{t("captions.eyebrow")}</div>
          <h1>{t("captions.title")}</h1>
          <p className="bk-lede">{t("captions.lede")}</p>
        </div>
        <div className="bk-wrap bk-page-body">
          <div className="bk-caption-grid">
            {captions.map((caption) => (
              <Link
                key={caption.slug}
                className="bk-caption"
                to="/captions/$captionId"
                params={{ captionId: caption.slug }}
              >
                <p>{caption.text}</p>
                <footer>
                  {caption.tags.map((tag) => (
                    <span className="bk-tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </footer>
              </Link>
            ))}
          </div>
          <p className="bk-lede" style={{ marginTop: 28 }}>
            {formatNumber(captions.length, lang)}
            {t("captions.count")}
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
