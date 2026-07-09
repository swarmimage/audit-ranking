// components/About/AboutGoal/index.tsx
"use client";

import React from "react";
import Image from "next/image";
import styles from "./styles.module.scss";
import "@/app/globals.css";
import { useLanguage } from "@/i18n/LanguageContext";

const AboutGoal = () => {
  const { t } = useLanguage();
  return (
    <div className="global-container">
      <div className={styles.goal}>
        <div className={styles.textCol}>
          <Image src="/about/target.svg" alt={t("aboutGoal.targetAlt")} width={75} height={75} />
          <div className={styles.iconRow}>
            <h2 className={styles.label}>{t("aboutGoal.label")}</h2>
            <p className={styles.text}>
              {t("aboutGoal.text")}
            </p>
          </div>
        </div>

        <div className={styles.imageCol}>
          <Image
            src="/about/office.svg"
            alt={t("aboutGoal.officeAlt")}
            width={464}
            height={100}
            className={styles.image}
          />
        </div>
      </div>
    </div>
  );
};

export default AboutGoal;
