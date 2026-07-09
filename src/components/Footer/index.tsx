"use client";

import React from "react";
import styles from "./index.module.scss";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageContext";

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className={styles.footer}>
      <div className="global-container">
        <div className={styles.footer_wrapper}>
          
          <div className={styles.footer_wrapper_top}>
      
            <Link href="/">
              <Image
                src="/Footer/Footer.svg"
                width={115}
                height={61}
                alt="RankAudit Logo"
                className={styles.footer_logo}
                priority
              />
            </Link>

            <div className={styles.footer_column}>
              <h2>{t("footer.navTitle")}</h2>
              <Link href="/method">{t("footer.services")}</Link>
              <Link href="/ratings">{t("footer.cases")}</Link>
              <Link href="/ratings">{t("footer.ratings")}</Link>
              <Link href="/about">{t("footer.about")}</Link>
            </div>

            <div className={styles.footer_column}>
              <h2>{t("footer.docsTitle")}</h2>
              <Link href="/privacy">{t("footer.privacy")}</Link>
              <Link href="/terms">{t("footer.terms")}</Link>
              <Link href="/disclosure">{t("footer.disclosure")}</Link>
            </div>

            <div className={styles.footer_column}>
              <h2>{t("footer.contactsTitle")}</h2>
              <a href="mailto:info@rankaudit.ru" className={styles.email}>info@rankaudit.ru</a>
              <button className={styles.btn_contact}>{t("footer.contactUs")}</button>
            </div>
          </div>

          <hr className={styles.footer_divider} />

          {/* Нижняя часть (Копирайт) */}
          <div className={styles.footer_wrapper_bottom}>
            <p>
              <span>{t("footer.copyright")}</span> | {t("footer.companyDesc")}
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
