import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, BookOpen, Search, Sparkles, X } from "lucide-react";
import { BookCover } from "@/components/book-cover";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { genreClass, genres, type BookSummary } from "@/lib/books";
import { formatNumber, useLanguage } from "@/lib/i18n";
import { toBookSummary } from "@/lib/community-to-book";
import { fetchCommunityBooks } from "@/lib/community-books.server";
import { bookSummaries } from "@/lib/manuscripts";
import { bookSlug } from "@/lib/book-slug";
import { poems } from "@/lib/poems";
import { captions } from "@/lib/captions";

export const Route = createFileRoute("/")({
  loader: async () => ({ community: await fetchCommunityBooks() }),
  head: () => ({
    meta: [
      { title: "বইকথা — গল্প, কবিতা আর ক্যাপশনের লাইব্রেরি" },
      {
        name: "description",
        content:
          "বাংলা গল্পের বই, ইংরেজি কবিতা আর ছোট ক্যাপশন — এক শান্ত ডিজিটাল লাইব্রেরিতে, প্রতিদিন নতুন সংযোজন।",
      },
      { property: "og:title", content: "বইকথা — গল্প, কবিতা আর ক্যাপশনের লাইব্রেরি" },
      {
        property: "og:description",
        content: "গল্প, কবিতা আর ক্যাপশনের তিনটা আলাদা তাক, এক লাইব্রেরিতে।",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const { community } = Route.useLoaderData();
  const { lang, t } = useLanguage();
  const [genre, setGenre] = useState("all");
  const [search, setSearch] = useState("");

  const communityBooks = useMemo(
    () => community.map((entry, index) => toBookSummary(entry, index)),
    [community],
  );
  const books = useMemo<BookSummary[]>(
    () => [...bookSummaries, ...communityBooks],
    [communityBooks],
  );

  const visible = books.filter(
    (book) =>
      (genre === "all" || book.genre === genre) &&
      `${book.title} ${book.subtitle} ${book.genre} ${book.author ?? ""}`
        .toLowerCase()
        .includes(search.trim().toLowerCase()),
  );

  const featured = [books[5], books[0], books[15]].filter((book): book is BookSummary =>
    Boolean(book),
  );
  const genreTabs = ["all", ...genres];

  // When a search finds nothing here, look the book up online automatically
  // and bring it into the library, then open it.
  const navigate = useNavigate();
  const [online, setOnline] = useState<{ query: string; state: "loading" | "error"; message?: string }>();
  const query = search.trim();
  const shouldFetch = query.length >= 3 && visible.length === 0;
  useEffect(() => {
    if (!shouldFetch) {
      setOnline(undefined);
      return;
    }
    let cancelled = false;
    const timer = setTimeout(async () => {
      setOnline({ query, state: "loading" });
      try {
        const response = await fetch("/api/fetch-book", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ query }),
        });
        const data = (await response.json()) as { ok: boolean; slug?: string; error?: string };
        if (cancelled) return;
        if (data.ok && data.slug) {
          await navigate({ to: "/books/$bookId", params: { bookId: data.slug } });
        } else {
          setOnline({ query, state: "error", message: data.error ?? "" });
        }
      } catch {
        if (!cancelled) setOnline({ query, state: "error", message: "" });
      }
    }, 1200);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [shouldFetch, query, navigate]);

  const leadPoem = poems[0];
  const otherPoems = poems.slice(1, 5);
  const leadCaptions = captions.slice(0, 3);

  return (
    <div className="bk-page">
      <SiteHeader />
      <main>
        <section className="bk-hero">
          <Reveal>
          <div className="bk-wrap bk-hero-grid">
            <div>
              <span className="bk-eyebrow">{t("hero.eyebrow")}</span>
              <h1>
                <span>{t("hero.line1")}</span>
                <span>{t("hero.line2")}</span>
                <span>{t("hero.line3")}</span>
              </h1>
              <p className="bk-lede">{t("hero.body")}</p>
              <div className="bk-hero-actions">
                <a className="bk-btn bk-btn-solid" href="#stories">
                  {t("hero.readStories")} <ArrowRight />
                </a>
                <Link className="bk-btn bk-btn-ghost" to="/poems">
                  {t("hero.readPoems")} <Sparkles />
                </Link>
              </div>
              <div className="bk-stats">
                <div>
                  <strong>{formatNumber(books.length, lang)}</strong>
                  <span>{t("hero.statBooks")}</span>
                </div>
                <div>
                  <strong>{formatNumber(poems.length, lang)}</strong>
                  <span>{t("hero.statPoems")}</span>
                </div>
                <div>
                  <strong>{formatNumber(captions.length, lang)}</strong>
                  <span>{t("hero.statCaptions")}</span>
                </div>
              </div>
            </div>
            <div className="bk-hero-art" aria-label={t("stories.title")}>
              <div className="bk-hero-frame" aria-hidden="true" />
              <div className="bk-hero-covers">
                {featured.map((book) => (
                  <Link
                    key={book.id}
                    to="/books/$bookId"
                    params={{ bookId: bookSlug(book) }}
                    className="bk-hero-cover"
                  >
                    <BookCover book={book} priority />
                  </Link>
                ))}
              </div>
              <div className="bk-hero-note">
                <p>{t("hero.note")}</p>
                <span>{t("hero.noteBy")}</span>
              </div>
            </div>
          </div>
          </Reveal>
        </section>

        <section className="bk-sections">
          <Reveal delay={80}>
          <div className="bk-wrap">
            <div className="bk-sections-grid">
              <a className="bk-section-card" href="#stories">
                <small>01</small>
                <h3>{t("stories.title")}</h3>
                <p>{t("sections.stories.body")}</p>
                <footer>
                  {t("sections.open")}
                  <ArrowRight />
                </footer>
              </a>
              <Link className="bk-section-card" to="/poems">
                <small>02</small>
                <h3>{t("poems.title")}</h3>
                <p>{t("sections.poems.body")}</p>
                <footer>
                  {t("sections.open")}
                  <ArrowRight />
                </footer>
              </Link>
              <Link className="bk-section-card" to="/captions">
                <small>03</small>
                <h3>{t("captions.title")}</h3>
                <p>{t("sections.captions.body")}</p>
                <footer>
                  {t("sections.open")}
                  <ArrowRight />
                </footer>
              </Link>
            </div>
          </div>
          </Reveal>
        </section>

        <section id="stories" className="bk-band">
          <Reveal>
          <div className="bk-wrap">
            <div className="bk-band-head">
              <div>
                <div className="bk-eyebrow">{t("stories.eyebrow")}</div>
                <h2>
                  {t("stories.title")} <span>{formatNumber(books.length, lang)}</span>
                </h2>
              </div>
              <p className="bk-lede">{t("stories.lede")}</p>
            </div>

            <div className="bk-chips">
              {genreTabs.map((item) => (
                <button
                  key={item}
                  type="button"
                  className="bk-chip"
                  aria-pressed={genre === item}
                  onClick={() => setGenre(item)}
                >
                  {item === "all" ? t("collection.allGenres") : item}
                </button>
              ))}
            </div>

            <div className="bk-search">
              <Search size={16} />
              <input
                aria-label={t("collection.search")}
                placeholder={t("collection.search")}
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
              {search && (
                <button type="button" aria-label={t("collection.searchClear")} onClick={() => setSearch("")}>
                  <X size={15} />
                </button>
              )}
            </div>

            <div className="bk-story-grid">
              {visible.map((book) => (
                <article className={`bk-story ${genreClass(book.genre)}`} key={book.id}>
                  <Link
                    to="/books/$bookId"
                    params={{ bookId: bookSlug(book) }}
                    className="bk-story-art"
                    aria-label={`${book.title} ${t("collection.read")}`}
                  >
                    <BookCover book={book} />
                  </Link>
                  <div className="bk-story-meta">
                    <b>{book.genre}</b>
                    <span>
                      {formatNumber(book.chapterCount, lang)}
                      {t("collection.chapters")}
                    </span>
                  </div>
                  <Link
                    to="/books/$bookId"
                    params={{ bookId: bookSlug(book) }}
                    className="bk-story-title"
                  >
                    {book.title}
                  </Link>
                  <p className="bk-story-sub">{book.subtitle}</p>
                </article>
              ))}
            </div>

            {!visible.length && (
              <div className="bk-empty">
                <BookOpen size={30} />
                <p>
                  {online?.state === "loading"
                    ? `${t("online.loading")} “${online.query}”`
                    : online?.state === "error"
                      ? online.message || t("online.notFound")
                      : t("collection.empty.search")}
                </p>
                <button
                  type="button"
                  className="bk-btn bk-btn-ghost"
                  onClick={() => {
                    setSearch("");
                    setGenre("all");
                  }}
                >
                  {t("collection.empty.cta")} <ArrowRight />
                </button>
              </div>
            )}
          </div>
          </Reveal>
        </section>

        <section id="poems" className="bk-band">
          <Reveal>
          <div className="bk-wrap">
            <div className="bk-band-head">
              <div>
                <div className="bk-eyebrow">{t("poems.eyebrow")}</div>
                <h2>
                  {t("poems.title")} <span>{formatNumber(poems.length, lang)}</span>
                </h2>
              </div>
              <Link className="bk-more" to="/poems">
                {t("poems.all")} <ArrowRight />
              </Link>
            </div>

            <div className="bk-poem-layout">
              {leadPoem && (
                <Link className="bk-poem-feature" to="/poems/$poemId" params={{ poemId: leadPoem.slug }}>
                  <div className="bk-eyebrow">{leadPoem.theme}</div>
                  <h3>{leadPoem.title}</h3>
                  <p>
                    {(leadPoem.stanzas[0] ?? []).map((line, index) => (
                      <span key={index}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </p>
                  <footer>
                    <span>{t("poems.read")}</span>
                    <span>{leadPoem.year}</span>
                  </footer>
                </Link>
              )}
              <div className="bk-poem-list">
                {otherPoems.map((poem, index) => (
                  <Link
                    key={poem.slug}
                    className="bk-poem-row"
                    to="/poems/$poemId"
                    params={{ poemId: poem.slug }}
                  >
                    <span>{String(index + 2).padStart(2, "0")}</span>
                    <strong>{poem.title}</strong>
                    <em>{poem.theme}</em>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          </Reveal>
        </section>

        <section id="captions" className="bk-band">
          <Reveal>
          <div className="bk-wrap">
            <div className="bk-band-head">
              <div>
                <div className="bk-eyebrow">{t("captions.eyebrow")}</div>
                <h2>
                  {t("captions.title")} <span>{formatNumber(captions.length, lang)}</span>
                </h2>
              </div>
              <Link className="bk-more" to="/captions">
                {t("captions.all")} <ArrowRight />
              </Link>
            </div>

            <div className="bk-caption-grid">
              {leadCaptions.map((caption) => (
                <Link
                  key={caption.slug}
                  className="bk-caption"
                  to="/captions/$captionId"
                  params={{ captionId: caption.slug }}
                >
                  <p>{caption.text}</p>
                  <footer>
                    {caption.tags.slice(0, 3).map((tag) => (
                      <span className="bk-tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </footer>
                </Link>
              ))}
            </div>
          </div>
          </Reveal>
        </section>

        <div className="bk-wrap">
          <Reveal>
          <div className="bk-contribute">
            <div>
              <h3>{t("community.title")}</h3>
              <p>{t("community.body")}</p>
            </div>
            <a
              href="https://github.com/onelpawarai-X/lore-crafter-delight/tree/main/pdf-library"
              target="_blank"
              rel="noreferrer"
            >
              {t("community.cta")} <ArrowRight size={16} />
            </a>
          </div>
          </Reveal>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
