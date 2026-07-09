"use client";

import React from "react";
import styles from "./index.module.scss";
import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageContext";

const Hero = () => {
  const { t } = useLanguage();
  const scrollToDocument = () => {
    const element = document.getElementById("document-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }; 
  return (
    <section className={styles.hero}>
      <div className="global-container">
        <div className={styles.hero_wrapper}>
          <div className={styles.hero_content}>

            <h1 className={styles.hero_title}>
              {t("hero.titleLine1")} <br /> {t("hero.titleLine2")} <br />
              <span className={styles.hero_title_orange}>{t("hero.titleLine3")}</span>
            </h1>

            <p className={styles.hero_text}>
              {t("hero.text")}
            </p>

            <div className={styles.hero_actions}>
              <button className={styles.btn_orange}> <a href="/contacts">{t("hero.contactUs")}</a></button>
              <button className={styles.btn_gray} onClick={scrollToDocument}>
                {t("hero.viewDecree")}
                <span>
                  <Image
                    src="/arrow.svg"
                    width={14}
                    height={17}
                    alt="Arrow Icon"
                    className={styles.header_logo}
                    priority
                  />
                </span>
              </button>
            </div>
          </div>
          <Image
            src="/main/Hero.svg"
            width={500}
            height={300}
            alt="Hero Image"
            className={styles.hero_image}
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
