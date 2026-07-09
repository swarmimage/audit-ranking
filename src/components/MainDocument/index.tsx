"use client";

import React from 'react';
import styles from './styles.module.scss';
import "@/app/globals.css";
import Image from 'next/image';
import { useLanguage } from '@/i18n/LanguageContext';

export default function MainDocument() {
  const { t } = useLanguage();
  const doc = t('mainDocument') as {
    type: string;
    title: string;
    adoptedText: string;
    approvedText: string;
    showFullText: string;
  };

  return (
    <div className="global-container">
      <div className={styles.documentList}>
      <div className={styles.documentCard}>
        
        <div className={styles.documentCard__left}>
          <div className={styles.documentCard__iconBox}>
            <Image
              src="/main/doc.svg"
              alt="Icon"
              width={24}
              height={31}
            />
          </div>


          <div className={styles.documentCard__text}>
            <span className={styles.documentCard__type}>
              {doc.type}
            </span>
            <h3 className={styles.documentCard__title}>
              {doc.title}
            </h3>
          </div>
        </div>

        {/* Адаптивный разделитель */}
        <div className={styles.documentCard__divider} />

        {/* Средняя часть: Информационные даты */}
        <div className={styles.documentCard__info}>
          <p>{doc.adoptedText}</p>
          <p>{doc.approvedText}</p>
        </div>

        {/* Правая часть: Кнопка действия */}
        <div className={styles.documentCard__action}>
          <a href="#document-section" className={styles.documentCard__btn}>
            {doc.showFullText}
            <svg
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              ></path>
            </svg>
          </a>
        </div>

      </div>
    </div>
    </div>
  );
}
