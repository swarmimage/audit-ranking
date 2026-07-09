// components/About/AboutContacts/index.tsx
"use client";

import React from "react";
import styles from "./styles.module.scss";
import '@/app/globals.css'
import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageContext";

const AboutContacts = () => {
  const { t } = useLanguage();
  return (
    <div className="global-container">
      <div className={styles.contacts}>
      <h2 className={styles.title}>{t("aboutContacts.title")}</h2>

      <div className={styles.grid}>
        <div className={styles.card}>
          <Image
            src="/about/location.svg"
            alt="Pin Icon"
            width={24}
            height={24}
          />
          <div className={styles.cardText}>
            <span className={styles.label}>{t("aboutContacts.address")}</span>
            <p>
              {t("aboutContacts.addressText")}
            </p>
          </div>
        </div>

        <div className={styles.card}>
         <Image
            src="/about/phone.svg"
            alt="Phone Icon"
            width={25}
            height={25}
          />
          <div className={styles.cardText}>
            <span className={styles.label}>{t("aboutContacts.phone")}</span>
            <p>
              Tel: +998712357804
              <br />
              ИНН: 300778313
            </p>
          </div>
        </div>

        <div className={styles.card}>
          <Image
            src="/about/mail.svg"
            alt="Pin Icon"
            width={24}
            height={24}
          />
          <div className={styles.cardText}>
            <span className={styles.label}>{t("aboutContacts.email")}</span>
            <p>
              <a href="mailto:auditrenking@mail.ru">auditrenking@mail.ru</a>
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AboutContacts;
