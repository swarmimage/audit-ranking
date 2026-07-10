"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./index.module.scss";
import "@/app/globals.css";
import { useLanguage } from "@/i18n/LanguageContext";

// Описываем структуру элементов навигации
interface NavItem {
  href: string;
  labelKey: string;
}

const navItems: NavItem[] = [
  { href: "/", labelKey: "header.nav.home" },
  { href: "/about", labelKey: "header.nav.about" },
  { href: "/news", labelKey: "header.nav.news" },
  { href: "/method", labelKey: "header.nav.method" },
  { href: "/regulations", labelKey: "header.nav.regulations" },
  { href: "/ratings", labelKey: "header.nav.ratings" },
  { href: "/contacts", labelKey: "header.nav.contacts" },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const { lang, toggleLang, t } = useLanguage();

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Явно указываем, что функция возвращает boolean
  const isActive = (href: string): boolean => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className={styles.header}>
      <div className="global-container">
        <div className={styles.header_wrapper}>
          <Link className={styles.header_logo_link} href="/" onClick={() => setIsMenuOpen(false)}>
            <Image
              src="/Header/Header.svg"
              width={160}
              height={40}
              alt="RankAudit Logo"
              className={styles.header_logo}
              priority
            />
            <div className={styles.header_logo_text}>
              <p className={styles.header_logo_text_primary}>{t("header.logoPrimary")}</p>
              <p className={styles.header_logo_text_secondary}>{t("header.logoSecondary")}</p>
            </div>
          </Link>

          <nav
            className={`${styles.header_menu} ${
              isMenuOpen ? styles.header_menu_open : ""
            }`}
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.menu_item} ${
                  isActive(item.href) ? styles.menu_item_active : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t(item.labelKey)}
              </Link>
            ))}
            <button
              type="button"
              className={`${styles.lang_switch} ${styles.lang_switch_mobile}`}
              onClick={toggleLang}
              aria-label="Til / Язык"
            >
              <span className={lang === "ru" ? styles.lang_active : ""}>RU</span>
              <span className={styles.lang_divider}>/</span>
              <span className={lang === "uz" ? styles.lang_active : ""}>UZ</span>
            </button>
            <button
              className={`${styles.btn_primary} ${styles.btn_primary_mobile}`}
            >
              {t("header.requestQuote")}
            </button>
          </nav>

          <div className={styles.header_actions}>
            <button
              type="button"
              className={styles.lang_switch}
              onClick={toggleLang}
              aria-label="Til / Язык"
            >
              <span className={lang === "ru" ? styles.lang_active : ""}>RU</span>
              <span className={styles.lang_divider}>/</span>
              <span className={lang === "uz" ? styles.lang_active : ""}>UZ</span>
            </button>
            <button className={styles.btn_primary}>{t("header.requestQuote")}</button>
          </div>

          <button
            className={`${styles.header_burger} ${
              isMenuOpen ? styles.header_burger_active : ""
            }`}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={t("header.menuAria")}
            aria-expanded={isMenuOpen}
          >
             <Image
              src="/Header/burger.svg"
              width={10}
              height={10}
              alt="RankAudit Logo"
              className={styles.header_logo}
              priority
            />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
