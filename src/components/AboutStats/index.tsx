// components/About/AboutStats/index.tsx
"use client";

import React from "react";
import styles from "./styles.module.scss";
import '@/app/globals.css'
import { useLanguage } from "@/i18n/LanguageContext";
import Image from "next/image";

const icons = ['/about/people.svg', '/about/level.svg', '/about/defend.svg', '/about/time.svg'];

const AboutStats = () => {
  const { t } = useLanguage();
  const stats = t("aboutStats.items") as { value: string; label: string }[];

  return (
    <div className="global-container">
      <div className={styles.stats}>
      <h2 className={styles.title}>{t("aboutStats.title")}</h2>

      <div className={styles.grid}>
        {stats.map((item, idx) => (
          <div className={styles.card} key={item.label}>
            <Image src={icons[idx]} alt={item.label} width={35} height={24}/>
            <div className={styles.card_box} >
              <span className={styles.value}>{item.value}</span>
            <span className={styles.label}>{item.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>  
    </div>
  );
};

export default AboutStats;
