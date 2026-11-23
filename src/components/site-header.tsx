import { Link, useLocation } from "@tanstack/react-router";
import { Languages } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const navItems = [
  { to: "/", key: "nav.stories" },
  { to: "/poems", key: "nav.poems" },
  { to: "/captions", key: "nav.captions" },
] as const;

function isActive(pathname: string, to: string) {
  if (to === "/") return pathname === "/" || pathname.startsWith("/books");
  return pathname === to || pathname.startsWith(`${to}/`);
}

export function SiteHeader() {
  const { lang, setLang, t } = useLanguage();
  const { pathname } = useLocation();
  const next = lang === "bn" ? "en" : "bn";

  return (
    <header className="bk-header">
      <div className="bk-wrap bk-header-inner">
        <Link to="/" className="bk-wordmark" aria-label="বইকথা">
          বইকথা<em>.</em>
        </Link>
        <nav className="bk-nav" aria-label={t("nav.home")}>
          {navItems.map((item) => (
            <Link key={item.to} to={item.to} data-active={isActive(pathname, item.to)}>
              {t(item.key)}
            </Link>
          ))}
        </nav>
        <div className="bk-header-tools">
          <button
            type="button"
            className="bk-lang"
            onClick={() => setLang(next)}
            aria-label={`${t("header.language")}: ${next.toUpperCase()}`}
            title={`${t("header.language")}: ${next.toUpperCase()}`}
          >
            <Languages size={14} />
            {lang.toUpperCase()}
          </button>
        </div>
      </div>
    </header>
  );
}
