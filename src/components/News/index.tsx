"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.scss";
import { useLanguage } from "@/i18n/LanguageContext";

type NewsItemBase = {
  id: string;
  title: string;
  date: string;
  href?: string;
};

export type NewsCardVariant = NewsItemBase & {
  type: "card";
  thumbnail: string;
  excerpt: string;
  category?: string;
};

export type NewsPhotoVariant = NewsItemBase & {
  type: "photo";
  image: string;
};

export type NewsPdfVariant = NewsItemBase & {
  type: "pdf";
  fileUrl: string;
  fileSize?: string;
};

export type NewsItem = NewsCardVariant | NewsPhotoVariant | NewsPdfVariant;

function formatDate(date: string, lang: "ru" | "uz") {
  return new Date(date).toLocaleDateString(lang === "uz" ? "uz-Latn-UZ" : "ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M3.33 8h9.34M8.67 3.33 13.33 8l-4.66 4.67"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PdfIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M14 2v6h6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function NewsCard({ item }: { item: NewsItem }) {
  const { lang, t } = useLanguage();
  if (item.type === "card") {
    return (
      <Link href={item.href ?? "#"} className={styles.card}>
        <div className={styles.thumbWrap}>
          {item.thumbnail && (
            <Image
              src={item.thumbnail}
              alt={item.title}
              fill
              unoptimized
              className={styles.thumb}
              sizes="(max-width: 768px) 100vw, 360px"
            />
          )}
          {item.category && (
            <span className={styles.categoryBadge}>{item.category}</span>
          )}
        </div>
        <div className={styles.body}>
          <time className={styles.date}>{formatDate(item.date, lang)}</time>
          <h3 className={styles.title}>{item.title}</h3>
          <p className={styles.excerpt}>{item.excerpt}</p>
          <span className={styles.more}>
            {t("news.readMore")} <ArrowIcon />
          </span>
        </div>
      </Link>
    );
  }

  if (item.type === "photo") {
    return (
      <Link
        href={item.href ?? "#"}
        className={`${styles.card} ${styles.photoCard}`}
      >
        {item.image && (
          <Image
            src={item.image}
            alt={item.title}
            fill
            unoptimized
            className={styles.thumb}
            sizes="100vw"
          />
        )}

        <div className={styles.photoOverlay}>
          <time className={styles.dateLight}>{formatDate(item.date, lang)}</time>
          <h3 className={styles.titleLight}>{item.title}</h3>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={item.fileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.card} ${styles.pdfCard}`}
    >
      <div className={styles.pdfIcon}>
        <PdfIcon />
      </div>
      <div className={styles.body}>
        <time className={styles.date}>{formatDate(item.date, lang)}</time>
        <h3 className={styles.title}>{item.title}</h3>
        {item.fileSize && (
          <span className={styles.fileSize}>{item.fileSize}</span>
        )}
      </div>
      <span className={styles.pdfAction}>
        {t("news.openPdf")} <ArrowIcon />
      </span>
    </Link>
  );
}

export default function NewsGrid({ items }: { items: NewsItem[] }) {
  const { t } = useLanguage();
  if (!items.length) {
    return <p className={styles.empty}>{t("news.empty")}</p>;
  }

  return (
    <div style={{ paddingBottom: "35px" }}>
      <div className={styles.grid}>
        {items.map((item) => (
          <div
            key={item.id}
            className={item.type === "photo" ? styles.spanWide : undefined}
          >
            <NewsCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
