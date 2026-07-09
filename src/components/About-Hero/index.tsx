// components/About-Content/index.tsx
"use client";

import React from "react";
import "@/app/globals.css";
import styles from "./index.module.scss";
import { useLanguage } from "@/i18n/LanguageContext";

const AboutContent = () => {
  const { t } = useLanguage();
  return (
    <div className={styles.about}>
      <div className="global-container">
        <div className={styles.aboutWrapper}>
          <h1>{t("aboutHero.title")}</h1>

          <div className={styles.content}>
            <h2>
              {t("aboutHero.companyTitle")}
            </h2>

            <div className={styles.textBlock}>
              <p>
                {t("aboutHero.text")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutContent;
