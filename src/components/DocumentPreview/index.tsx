"use client";

import { useRef, useState, useEffect } from "react";
import { documentData } from "@/data/documentData";
import styles from "./index.module.scss";
import "@/app/globals.css";
import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageContext";

const COLLAPSED_HEIGHT = 460;
const MOBILE_COLLAPSED_HEIGHT = 380;
const SMALL_MOBILE_COLLAPSED_HEIGHT = 320;

export default function DocumentPreview({ data = documentData }) {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState(false);
  const [collapsedHeight, setCollapsedHeight] = useState(COLLAPSED_HEIGHT);
  const contentRef = useRef<HTMLDivElement>(null);

  // 📱 Определяем высоту в зависимости от экрана
  useEffect(() => {
    const updateHeight = () => {
      const width = window.innerWidth;
      if (width <= 480) {
        setCollapsedHeight(SMALL_MOBILE_COLLAPSED_HEIGHT);
      } else if (width <= 768) {
        setCollapsedHeight(MOBILE_COLLAPSED_HEIGHT);
      } else {
        setCollapsedHeight(COLLAPSED_HEIGHT);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const handleDownload = () => {
    window.open(data.fileUrl, "_blank");
  };

  const handleToggle = () => {
    const el = contentRef.current;
    if (!el) return;

    if (!expanded) {
      el.style.maxHeight = `${el.scrollHeight}px`;
    } else {
      el.style.maxHeight = `${el.scrollHeight}px`;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (contentRef.current) {
            contentRef.current.style.maxHeight = `${collapsedHeight}px`;
          }
        });
      });
    }

    setExpanded((prev) => !prev);
  };

  const handleTransitionEnd = () => {
    if (expanded && contentRef.current) {
      contentRef.current.style.maxHeight = "none";
    }
  };

  return (
    
    <div className="global-container">
      <div className={styles.card} id="document-section">
        <a
          href={"https://lex.uz/uz/docs/5307899?ONDATE=25.09.2025"}
          className={styles.downloadBtn}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/download.svg"
            width={22}
            height={21}
            alt="RankAudit Logo"
            className={styles.header_logo}
            priority
          />
        </a>

        <div
          ref={contentRef}
          className={`${styles.content} ${expanded ? styles.expanded : ""}`}
          style={{ maxHeight: collapsedHeight }}
          onTransitionEnd={handleTransitionEnd}
        >
          {data.title.map((line, i) => (
            <p key={i} className={styles.titleLine}>
              {line}
            </p>
          ))}

          <p className={styles.approved}>
            {data.approvedBy.map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </p>

          {data.articles.map((article, i) => (
            <div key={i}>
              <p className={styles.heading}>{article}</p>
            </div>
          ))}
        </div>

        <div className={styles.footer}>
          <button
            className={styles.showMoreBtn}
            onClick={handleToggle}
            aria-expanded={expanded}
          >
            {expanded
              ? t("documentPreview.collapse")
              : t("documentPreview.showFullText")}
            <svg
              className={`${styles.chevron} ${expanded ? styles.chevronUp : ""}`}
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                d="M6 9l6 6 6-6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
