import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { useLanguage } from "@/lib/i18n";
import { poems } from "@/lib/poems";
import { captions } from "@/lib/captions";
import { bookSummaries } from "@/lib/manuscripts";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "সম্পর্কে — বইকথা" },
      {
        name: "description",
        content:
          "বইকথা একটি স্বাধীন ডিজিটাল লাইব্রেরি — গল্প, কবিতা আর ক্যাপশন, প্রতিদিন নতুন লেখা যোগ হয়।",
      },
      { property: "og:title", content: "সম্পর্কে — বইকথা" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t } = useLanguage();
  const numbers = [
    { value: bookSummaries.length, label: t("nav.stories") },
    { value: poems.length, label: t("nav.poems") },
    { value: captions.length, label: t("nav.captions") },
  ];

  return (
    <div className="bk-page">
      <SiteHeader />
      <main>
        <div className="bk-wrap bk-page-head">
          <div className="bk-eyebrow">{t("footer.about")}</div>
          <h1>পড়ার জন্য একটা শান্ত জায়গা</h1>
          <p className="bk-lede">{t("footer.aboutBody")}</p>
        </div>

        <div className="bk-wrap bk-page-body">
          <div className="bk-about-grid">
            <div>
              <h2>তিনটা তাক, তিন রকম পড়া</h2>
              <p>
                <strong>গল্প</strong> — অধ্যায়ে ভাগ করা উপন্যাস, প্রচ্ছদ থেকে পড়া শুরু।{" "}
                <strong>কবিতা</strong> — কম শব্দে বেশি কথা। <strong>ক্যাপশন</strong> — এক
                লাইনে ধরা অনুভূতি। প্রতিটা লেখার নিজের ঠিকানা আছে, তাই পছন্দের লেখাটা
                সেভ করে রাখা যায়।
              </p>
              <h2>লেখাগুলো কীভাবে আসে</h2>
              <p>
                প্রতিদিন সকালে নতুন গল্প, কবিতা আর ক্যাপশন যোগ হয় — হাতে লেখা, কোনো
                টেমপ্লেট বা কপি নয়। প্রতিটা লেখা GitHub-এ সংরক্ষিত থাকে, তাই সাইট বন্ধ
                হলেও লেখা থাকে।
              </p>
              <h2>পড়তে পড়তে</h2>
              <p>
                অক্ষরের আকার ছোট-বড় করা যায়, চোখে লাগলে শুনেও নেওয়া যায়। বই ডাউনলোড বা
                প্রিন্টও করা যায়।
              </p>
            </div>
            <aside className="bk-about-card">
              <div className="bk-eyebrow">এখন পর্যন্ত</div>
              <ul>
                {numbers.map((item) => (
                  <li key={item.label}>
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
              <Link className="bk-more" to="/">
                {t("nav.home")} <ArrowRight />
              </Link>
            </aside>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
