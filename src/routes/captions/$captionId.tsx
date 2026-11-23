import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, Copy } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { useLanguage } from "@/lib/i18n";
import { captions, findCaption } from "@/lib/captions";

export const Route = createFileRoute("/captions/$captionId")({
  loader: ({ params }) => {
    const caption = findCaption(decodeURIComponent(params.captionId));
    if (!caption) throw notFound();
    return caption;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.text?.slice(0, 60).replace(/\s+\S*$/, "") ?? "Caption"} — বইকথা` },
      { name: "description", content: loaderData?.text ?? "A caption from Bookkotha." },
      { property: "og:title", content: `${loaderData?.text?.slice(0, 60).replace(/\s+\S*$/, "") ?? "Caption"} — বইকথা` },
      { property: "og:description", content: loaderData?.text ?? "" },
      { property: "og:type", content: "article" },
    ],
  }),
  component: CaptionPage,
});

function CaptionPage() {
  const caption = Route.useLoaderData();
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const index = captions.findIndex((item) => item.slug === caption.slug);
  const next = index < captions.length - 1 ? captions[index + 1] : captions[0];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(caption.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="bk-page">
      <SiteHeader />
      <main className="bk-wrap">
        <article className="bk-caption-page">
          <div className="bk-eyebrow">{caption.context}</div>
          <blockquote className="bk-caption-quote">{caption.text}</blockquote>
          <p className="bk-caption-context">
            {caption.tags.map((tag) => `#${tag.replace(/\s+/g, "")}`).join("  ")}
          </p>
          <div className="bk-caption-actions">
            <button type="button" className="bk-copy" onClick={copy}>
              {copied ? <Check /> : <Copy />}
              {copied ? t("captions.copied") : t("captions.copy")}
            </button>
            <Link className="bk-copy" to="/captions">
              <ArrowLeft /> {t("captions.all")}
            </Link>
            {next && next.slug !== caption.slug && (
              <Link className="bk-copy" to="/captions/$captionId" params={{ captionId: next.slug }}>
                {t("captions.next")} <ArrowRight />
              </Link>
            )}
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
