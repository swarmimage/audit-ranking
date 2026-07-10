"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageContext";

interface Rating {
  _id: string;
  title: string;
  year: string;
  originalName: string;
  filename: string;
  createdAt: string;
}

type FileType = "docx" | "pdf" | null;

const Ratings = () => {
  const { t } = useLanguage();
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [selectedRating, setSelectedRating] = useState<Rating | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [fileType, setFileType] = useState<FileType>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const displayPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ratings`)
      .then((r) => r.json())
      .then((data) => setRatings(data))
      .catch(() => setLoadError(true))
      .finally(() => setPageLoading(false));
  }, []);

  useEffect(() => {
    if (!selectedRating) return;

    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
      setPdfUrl(null);
    }
    setFileType(null);

    const renderPreview = async () => {
      setPreviewLoading(true);

      // На мобилке скроллим к панели предпросмотра
      if (window.innerWidth <= 992 && displayPanelRef.current) {
        displayPanelRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/ratings/${selectedRating._id}/file?t=${Date.now()}`,
        );

        if (!response.ok) throw new Error("Ошибка загрузки файла");

        const contentType = response.headers.get("Content-Type") || "";

        if (contentType.includes("pdf")) {
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          setPdfUrl(url);
          setFileType("pdf");
        } else {
          const { renderAsync } = await import("docx-preview");
          const arrayBuffer = await response.arrayBuffer();
          setFileType("docx");
          await new Promise((r) => setTimeout(r, 0));
          if (previewRef.current) {
            previewRef.current.innerHTML = "";
            await renderAsync(arrayBuffer, previewRef.current, undefined, {
              className: styles.docxWrapper,
              ignoreWidth: true,
              breakPages: true,
              useBase64URL: true,
            });
          }
        }
      } catch (err) {
        console.error("Preview error:", err);
        setFileType("docx");
        await new Promise((r) => setTimeout(r, 0));
        if (previewRef.current) {
          previewRef.current.innerHTML = `
            <div style="color:#64748b;text-align:center;padding:24px">
              <p>❌ ${t("ratings.previewError")}</p>
              <p style="font-size:14px;margin-top:8px">${t("ratings.previewErrorHint")}</p>
            </div>
          `;
        }
      } finally {
        setPreviewLoading(false);
      }
    };

    renderPreview();

    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [selectedRating]);

  const decodeFileName = (name: string) => {
    if (!name) return t("ratings.document");
    try {
      return decodeURIComponent(escape(name));
    } catch {
      return name;
    }
  };

  const handleDownload = () => {
    if (!selectedRating) return;
    window.open(
      `${process.env.NEXT_PUBLIC_API_URL}/api/ratings/${selectedRating._id}/download`,
    );
  };

  return (
    <section className={styles.ratings}>
      <div className="global-container">
        <h1>{t("ratings.title")}</h1>
        <div className={styles.header}>
        </div>

        <div className={styles.grid}>
          {/* Левый блок — displayPanel (order:2 на мобилке) */}
          <div className={styles.displayPanel} ref={displayPanelRef}>
            {selectedRating ? (
              <div className={styles.activeContent}>
                <div className={styles.fileBar}>
                  <div className={styles.fileInfo}>
                    <span>
                      <Image
                        src="/white.svg"
                        width={12}
                        height={12}
                        alt="File Icon"
                      />
                    </span>
                    <p>
                      {decodeFileName(selectedRating.originalName) ||
                        selectedRating.title}
                    </p>
                  </div>
                  <button
                    className={styles.downloadBtn}
                    onClick={handleDownload}
                  >
                    <Image src="/whitedw.svg" width={12} height={12} alt="" />
                    {t("ratings.download")}
                  </button>
                </div>

                <div className={styles.previewContainer}>
                  {previewLoading && (
                    <div className={styles.previewLoader}>
                      <span>⏳ {t("ratings.loadingDoc")}</span>
                    </div>
                  )}

                  {fileType === "pdf" && pdfUrl && !previewLoading && (
                    <iframe
                      src={pdfUrl}
                      className={styles.pdfViewer}
                      title={selectedRating.title}
                    />
                  )}

                  <div
                    ref={previewRef}
                    className={styles.previewContent}
                    style={{
                      display:
                        fileType === "docx" && !previewLoading
                          ? "block"
                          : "none",
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className={styles.emptyState}>
                <div className={styles.iconWrapper}>
                  <Image
                    src="/ArchiceDoc.svg"
                    width={37}
                    height={48}
                    alt="Arrow Icon"
                    style={{ height: "auto" }}
                  />
                </div>{" "}
                <p className={styles.emptyStateText}>{t("ratings.selectYear")}</p>
                <p className={styles.emptyStateDescription}>
                  {t("ratings.selectYearDesc")}
                </p>
              </div>
            )}
          </div>

          {/* Правый блок — menuPanel (order:1 на мобилке — идёт первым) */}
          <div className={styles.menuPanel}>
            <p className={styles.menuTitle}>{t("ratings.chooseYear")}</p>
            <div className={styles.list}>
              {pageLoading ? (
                <p className={styles.loadingText}>{t("ratings.loading")}</p>
              ) : loadError ? (
                <p className={styles.loadingText} role="alert">
                  Не удалось загрузить рейтинги. Проверьте подключение к серверу.
                </p>
              ) : ratings.length === 0 ? (
                <p className={styles.loadingText}>{t("ratings.noRatings")}</p>
              ) : (
                ratings.map((item) => (
                  <button
                    key={item._id}
                    className={`${styles.listItem} ${
                      selectedRating?._id === item._id ? styles.activeItem : ""
                    }`}
                    onClick={() => setSelectedRating(item)}
                  >
                    <span className={styles.dot}>•</span>
                    <span className={styles.itemText}>
                      {item.title} {item.year && `(${item.year})`}
                    </span>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ratings;
