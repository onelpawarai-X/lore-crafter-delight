import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "bn" | "en";

export type Dict = Record<string, string>;

// UI copy for both languages. Book prose stays in its original language; only
// interface text is translated.
const translations: Record<Lang, Dict> = {
  bn: {
    "brand.tagline": "গল্পের ভেতর, নিজের মতো।",
    "nav.home": "প্রথম পাতা",
    "nav.stories": "গল্প",
    "nav.poems": "কবিতা",
    "nav.captions": "ক্যাপশন",
    "hero.eyebrow": "একটি ডিজিটাল লাইব্রেরি",
    "hero.line1": "পড়ার জন্য",
    "hero.line2": "একটা শান্ত",
    "hero.line3": "জায়গা।",
    "hero.body":
      "প্রতিদিন নতুন গল্প যোগ হয়, সাথে কবিতা আর ক্যাপশন — বাংলা আর ইংরেজি মিলিয়ে, এক জায়গায়, কোনো তাড়া ছাড়া।",
    "hero.readStories": "গল্প পড়ুন",
    "hero.readPoems": "কবিতা পড়ুন",
    "hero.statBooks": "টি গল্প",
    "hero.statPoems": "টি কবিতা",
    "hero.statCaptions": "টি ক্যাপশন",
    "hero.note": "প্রতিদিন একটা নতুন গল্প, নিজে থেকেই যোগ হয়।",
    "hero.noteBy": "বইকথা সংগ্রহ",
    "sections.eyebrow": "তিনটা আলাদা জগৎ",
    "sections.title": "এক লাইব্রেরি, তিন রকম পড়া",
    "sections.stories.body": "অধ্যায়ে ভাগ করা উপন্যাস — ভূত, প্রেম, রহস্য আর কল্পনা।",
    "sections.poems.body": "কম শব্দে বেশি কথা — ইংরেজি কবিতার ছোট সংগ্রহ।",
    "sections.captions.body": "এক লাইনে ধরা অনুভূতি — ইংরেজি ক্যাপশন, পড়ার জন্য।",
    "sections.open": "খুলুন",
    "stories.eyebrow": "গল্পের সংগ্রহ",
    "stories.title": "গল্প",
    "stories.lede": "প্রতিটি বই আলাদা জগৎ — প্রচ্ছদ বেছে নিন, অধ্যায়ে অধ্যায়ে পড়ুন।",
    "stories.all": "সব গল্প দেখুন",
    "poems.eyebrow": "কবিতার তাক",
    "poems.title": "কবিতা",
    "poems.lede": "ইংরেজিতে লেখা ছোট কবিতা — ধীরে পড়ার জন্য।",
    "poems.all": "সব কবিতা",
    "poems.read": "পড়ুন",
    "poems.count": "টি কবিতা",
    "poems.prev": "আগের কবিতা",
    "poems.next": "পরের কবিতা",
    "captions.eyebrow": "এক লাইনের তাক",
    "captions.title": "ক্যাপশন",
    "captions.lede": "ছোট ছোট ইংরেজি ক্যাপশন — পড়ুন, কপি করুন, রেখে দিন।",
    "captions.all": "সব ক্যাপশন",
    "captions.copy": "কপি করুন",
    "captions.copied": "কপি হয়েছে",
    "captions.count": "টি ক্যাপশন",
    "captions.next": "পরের ক্যাপশন",
    "footer.explore": "ঘুরে দেখুন",
    "footer.about": "সম্পর্কে",
    "footer.aboutBody":
      "বইকথা একটি স্বাধীন ডিজিটাল লাইব্রেরি — গল্প, কবিতা আর ক্যাপশন, প্রতিদিন একটু একটু করে বাড়ছে।",
    "footer.rights": "সব লেখা নিজস্ব।",
    "header.collection": "বইয়ের সংগ্রহ",
    "header.language": "ভাষা",
    "intro.eyebrow": "কল্পনার কোনো শেষ নেই",
    "intro.titleSub": "এক মলাটে, হাজার অনুভূতি।",
    "intro.body":
      "কখনো গা ছমছমে অন্ধকার, কখনো একটুখানি ভালোবাসা। প্রতিটি বই আলাদা জগৎ। আপনার পরের গল্পটি কোথায়?",
    "intro.cta": "গল্পের জগতে প্রবেশ",
    "intro.books": "টি বই",
    "intro.worlds": "টি ভিন্ন জগৎ",
    "intro.lang": "যেকোনো ভাষা",
    "featured.caption": "পাতায় পাতায় নতুন পৃথিবী",
    "collection.eyebrow": "আপনার গল্প, আপনার পছন্দ",
    "collection.title": "গল্পের সংগ্রহ",
    "collection.all": "সব বই",
    "collection.saved": "আমার তালিকা",
    "collection.search": "আপনার গল্প খুঁজুন...",
    "collection.searchClear": "অনুসন্ধান মুছুন",
    "collection.allGenres": "সব ধরনের গল্প",
    "collection.count": "টি বই",
    "collection.status": "প্রথম অধ্যায় প্রকাশিত",
    "collection.read": "পড়ুন",
    "collection.save": "তালিকায় রাখুন",
    "collection.unsave": "তালিকা থেকে সরান",
    "collection.chapters": "টি অধ্যায়",
    "collection.empty.saved": "আপনার তালিকা এখনো খালি",
    "collection.empty.search": "এই নামে কোনো বই পাওয়া যায়নি",
    "online.loading": "লাইব্রেরিতে নেই — অনলাইন থেকে বইটি আনা হচ্ছে…",
    "online.notFound": "অনলাইনেও এই বই পাওয়া যায়নি",
    "collection.empty.cta": "সব বই দেখুন",
    "collection.novel": "উপন্যাস",
    "footer.note": "পূর্ণাঙ্গ পাণ্ডুলিপি · নতুন অধ্যায় যোগ হচ্ছে",
    "footer.tag": "গল্পে বাঁচুক কল্পনা।",
    "reader.back": "সংগ্রহে ফিরুন",
    "reader.smaller": "অক্ষর ছোট করুন",
    "reader.larger": "অক্ষর বড় করুন",
    "reader.export": "ডাউনলোড",
    "reader.openFile": "খুলুন",
    "reader.contents": "সূচিপত্র",
    "reader.chapterPlan": "অধ্যায়",
    "reader.chapter": "অধ্যায়",
    "reader.chapterEnd": "এই অধ্যায়ের সমাপ্তি",
    "reader.finished": "অধ্যায় পড়া হয়েছে",
    "reader.markRead": "পড়া শেষ",
    "reader.nextChapter": "পরের অধ্যায়",
    "reader.listen": "শুনুন",
    "reader.listenPlaying": "পড়ে শোনানো হচ্ছে",
    "reader.listenPause": "বিরতি",
    "reader.listenResume": "চালু করুন",
    "reader.listenStop": "বন্ধ করুন",
    "reader.listenNext": "পরের অধ্যায়",
    "reader.listenRate": "গতি",
    "reader.listenLoading": "গুগলের কণ্ঠ আনছি...",
    "reader.listenUnsupported": "এই ব্রাউজারে পড়ে শোনানোর সুবিধা নেই।",
    "community.eyebrow": "আপনার লেখা, সবার পড়া",
    "community.title": "কমিউনিটি বই",
    "community.body":
      "আপনার লেখা বই এই লাইব্রেরিতে যোগ করতে চান? যেকোনো ভাষায় লিখুন — শুধু বাংলা বা ইংরেজি নয়। ফোল্ডারে জমা দিন, বা এজেন্ট দিয়ে সরাসরি API-তে পাঠান — অনুমোদনের সঙ্গে সঙ্গে এখানে প্রকাশিত হবে।",
    "community.cta": "জমা দেওয়ার নিয়ম",
    "community.author": "লেখক",
    "community.empty": "নতুন কমিউনিটি বই শীঘ্রই আসছে।",
    "community.readOnline": "অনলাইনে পড়ুন",
    "community.coverOnly": "প্রচ্ছদ ও বিবরণ",
  },
  en: {
    "brand.tagline": "Inside a story, on your own terms.",
    "nav.home": "Home",
    "nav.stories": "Stories",
    "nav.poems": "Poems",
    "nav.captions": "Captions",
    "hero.eyebrow": "A digital library",
    "hero.line1": "A quiet place",
    "hero.line2": "for stories,",
    "hero.line3": "and poems.",
    "hero.body":
      "A new story arrives every day, with poems and captions beside it — Bangla and English, in one place, with nothing to rush.",
    "hero.readStories": "Read the stories",
    "hero.readPoems": "Read the poems",
    "hero.statBooks": " stories",
    "hero.statPoems": " poems",
    "hero.statCaptions": " captions",
    "hero.note": "A new story arrives every day, on its own.",
    "hero.noteBy": "The Bookkotha shelf",
    "sections.eyebrow": "Three separate worlds",
    "sections.title": "One library, three ways to read",
    "sections.stories.body": "Chaptered novels — ghosts, love, mystery and imagination.",
    "sections.poems.body": "Fewer words, more said — a small shelf of English poems.",
    "sections.captions.body": "A feeling caught in one line — English captions to read.",
    "sections.open": "Open",
    "stories.eyebrow": "The story shelf",
    "stories.title": "Stories",
    "stories.lede": "Every book is a separate world — pick a cover, read it chapter by chapter.",
    "stories.all": "All stories",
    "poems.eyebrow": "The poetry shelf",
    "poems.title": "Poems",
    "poems.lede": "Short poems in English — made for reading slowly.",
    "poems.all": "All poems",
    "poems.read": "Read",
    "poems.count": " poems",
    "poems.prev": "Previous poem",
    "poems.next": "Next poem",
    "captions.eyebrow": "The one-line shelf",
    "captions.title": "Captions",
    "captions.lede": "Short captions in English — read them, copy them, keep them.",
    "captions.all": "All captions",
    "captions.copy": "Copy",
    "captions.copied": "Copied",
    "captions.count": " captions",
    "captions.next": "Next caption",
    "footer.explore": "Explore",
    "footer.about": "About",
    "footer.aboutBody":
      "Bookkotha is an independent digital library — stories, poems and captions, growing a little every day.",
    "footer.rights": "All writing is original.",
    "header.collection": "Book collection",
    "header.language": "Language",
    "intro.eyebrow": "Imagination has no end",
    "intro.titleSub": "One cover, a thousand feelings.",
    "intro.body":
      "Sometimes a chilling dark, sometimes a touch of love. Every book is a separate world. Where is your next story?",
    "intro.cta": "Enter the story worlds",
    "intro.books": " books",
    "intro.worlds": " distinct worlds",
    "intro.lang": "Any language",
    "featured.caption": "A new world on every page",
    "collection.eyebrow": "Your story, your choice",
    "collection.title": "Story collection",
    "collection.all": "All books",
    "collection.saved": "My list",
    "collection.search": "Find your story...",
    "collection.searchClear": "Clear search",
    "collection.allGenres": "All genres",
    "collection.count": " books",
    "collection.status": "Opening chapter published",
    "collection.read": "Read",
    "collection.save": "Save to my list",
    "collection.unsave": "Remove from my list",
    "collection.chapters": " chapters",
    "collection.empty.saved": "Your list is still empty",
    "collection.empty.search": "No book found with that name",
    "online.loading": "Not in the library — fetching it from online…",
    "online.notFound": "This book could not be found online either",
    "collection.empty.cta": "See all books",
    "collection.novel": "Novel",
    "footer.note": "Full manuscripts · new chapters being added",
    "footer.tag": "Let imagination live in stories.",
    "reader.back": "Back to collection",
    "reader.smaller": "Smaller text",
    "reader.larger": "Larger text",
    "reader.export": "Download",
    "reader.openFile": "Open",
    "reader.contents": "Contents",
    "reader.chapterPlan": "Chapters",
    "reader.chapter": "Chapter",
    "reader.chapterEnd": "End of this chapter",
    "reader.finished": "Chapter read",
    "reader.markRead": "Mark as read",
    "reader.nextChapter": "Next chapter",
    "reader.listen": "Listen",
    "reader.listenPlaying": "Reading aloud",
    "reader.listenPause": "Pause",
    "reader.listenResume": "Resume",
    "reader.listenStop": "Stop",
    "reader.listenNext": "Next chapter",
    "reader.listenRate": "Speed",
    "reader.listenLoading": "Loading Google voice...",
    "reader.listenUnsupported": "This browser cannot read text aloud.",
    "community.eyebrow": "Your writing, everyone reading",
    "community.title": "Community books",
    "community.body":
      "Want your own book in this library? Write in any language — not just Bangla or English. Submit a folder, or send it straight to the API from an agent — it appears here as soon as it is approved.",
    "community.cta": "Submission guide",
    "community.author": "Author",
    "community.empty": "New community books are coming soon.",
    "community.readOnline": "Read online",
    "community.coverOnly": "Cover and details",
  },
};

const STORAGE_KEY = "bookkotha-language";

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

function readStoredLang(): Lang {
  if (typeof window === "undefined") return "bn";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "bn" || stored === "en") return stored;
  } catch {
    // Ignore storage access failures (private mode, disabled storage).
  }
  return "bn";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readStoredLang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignore storage access failures.
    }
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      setLang,
      t: (key: string) => translations[lang][key] ?? translations.bn[key] ?? key,
    }),
    [lang, setLang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}

// Locale-aware number formatting: Bangla digits for bn, grouped for en.
export function formatNumber(value: number, lang: Lang): string {
  return value.toLocaleString(lang === "bn" ? "bn-BD" : "en-US");
}
