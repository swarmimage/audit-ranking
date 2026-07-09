// components/About/AboutHistory/index.tsx
"use client";

import React from "react";
import styles from "./styles.module.scss";
import "@/app/globals.css";
import { useLanguage } from "@/i18n/LanguageContext";

const AboutHistory = () => {
  const { t } = useLanguage();
  const milestones = t("aboutHistory.items") as { year: number; text: string }[];

  return (
    <div className="global-container">
      <div className={styles.history}>
      <h2 className={styles.title}>{t("aboutHistory.title")}</h2>

      <div className={styles.timeline}>
        {milestones.map((item) => (
          <div className={styles.item} key={item.year}>
            <span className={styles.dot} />
            <span className={styles.year}>{item.year}</span>
            <p className={styles.text}>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default AboutHistory;
