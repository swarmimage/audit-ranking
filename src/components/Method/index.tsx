"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { useLanguage } from "@/i18n/LanguageContext";

type FileType = "docx" | "pdf" | null;

const MethodologyModule = () => {
  const { t } = useLanguage();
  const previewRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [fileType, setFileType] = useState<FileType>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    const render = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/methodology/file`
        );

        if (!res.ok) {
          setNotFound(true);
          return;
        }

        const contentType = res.headers.get("Content-Type") || "";

        if (contentType.includes("pdf")) {
          const blob = await res.blob();
          const url = URL.createObjectURL(blob);
          setPdfUrl(url);
          setFileType("pdf");
        } else {
          const { renderAsync } = await import("docx-preview");
          const arrayBuffer = await res.arrayBuffer();
          if (previewRef.current) {
            previewRef.current.innerHTML = "";
            await renderAsync(arrayBuffer, previewRef.current, undefined, {
              className: styles.docxWrapper,
              ignoreWidth: true,
              breakPages: false,
              useBase64URL: true,
            });
          }
          setFileType("docx");
        }
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    render();

    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, []);

  const handleDownload = () => {
    window.open(`${process.env.NEXT_PUBLIC_API_URL}/api/methodology/download`);
  };

  return (
    <div className={styles.methodology}>
      <div className="global-container">
        <div className={styles.methodologyWrapper}>
          <h1>{t("method.title")}</h1>

          {loading && (
            <div className={styles.loader}>{t("method.loadingDoc")}</div>
          )}

          {!loading && notFound && (
            <div className={styles.notFound}>
              {t("method.notFound")}
            </div>
          )}

          {!loading && !notFound && (
            <>
              <div className={styles.docToolbar}>
                <button className={styles.downloadBtn} onClick={handleDownload}>
                  {t("method.download")}
                </button>
              </div>

              {fileType === "pdf" && pdfUrl && (
                <iframe
                  src={pdfUrl}
                  className={styles.pdfViewer}
                  title={t("method.title")}
                />
              )}

              {fileType === "docx" && (
                <div ref={previewRef} className={styles.docxContent} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MethodologyModule;