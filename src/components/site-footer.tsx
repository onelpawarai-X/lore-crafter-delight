import { Link } from "@tanstack/react-router";
import { useLanguage } from "@/lib/i18n";

export function SiteFooter() {
  const { t } = useLanguage();

  return (
    <footer className="bk-footer">
      <div className="bk-wrap">
        <div className="bk-footer-grid">
          <div>
            <div className="bk-footer-brand">
              বইকথা<em>.</em>
            </div>
            <p className="bk-footer-note">{t("footer.aboutBody")}</p>
          </div>
          <div>
            <h4>{t("footer.explore")}</h4>
            <ul>
              <li>
                <Link to="/">{t("nav.stories")}</Link>
              </li>
              <li>
                <Link to="/poems">{t("nav.poems")}</Link>
              </li>
              <li>
                <Link to="/captions">{t("nav.captions")}</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4>{t("footer.about")}</h4>
            <ul>
              <li>
                <a
                  href="https://github.com/onelpawarai-X/lore-crafter-delight/tree/main/pdf-library"
                  target="_blank"
                  rel="noreferrer"
                >
                  {t("community.cta")}
                </a>
              </li>
              <li>
                <a href="https://github.com/onelpawarai-X/lore-crafter-delight" target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="bk-footer-bottom">
          <span>{t("footer.note")}</span>
          <span>{t("footer.rights")}</span>
        </div>
      </div>
    </footer>
  );
}
