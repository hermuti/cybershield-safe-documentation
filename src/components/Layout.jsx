import React from "react";
import { useTranslation } from "../i18n.jsx";

export default function Layout({ children, step, setStep, savedCount }) {
  const { t, lang, setLang } = useTranslation();

  return (
    <div className="app layout-root">
      <header className="site-header">
        <div className="left">
          {step > 0 && (
            <button className="back-btn" onClick={() => setStep(0)}>
              {t("nav.back")}
            </button>
          )}
          <div className="site-name">{t("site.name")}</div>
        </div>

        <div className="center">
          <div className="tag">{t("site.tagline")}</div>
        </div>

        <div className="right">
          <select
            className="lang-select"
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            aria-label="Language selector"
          >
            <option value="en">English</option>
            <option value="am">አማርኛ</option>
          </select>

          <button className="records-btn" onClick={() => setStep(4)}>
            {t("nav.my_records")}{" "}
            {savedCount > 0 ? `(${savedCount})` : t("nav.my_records_empty")}
          </button>
        </div>
      </header>

      <div className="page-container">{children}</div>

      <footer className="site-footer">
        <div>{t("footer.line")}</div>
        <div className="small">{t("footer.small")}</div>
      </footer>
    </div>
  );
}
