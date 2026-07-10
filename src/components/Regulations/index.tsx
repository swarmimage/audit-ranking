"use client";

import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";

interface Regulation {
  _id: string;
  title: string;
  year: string;
  filename: string;
  originalName: string;
  createdAt: string;
  updatedAt: string;
}

const Regulations = () => {
  const { t, lang } = useLanguage();
  const [regulations, setRegulations] = useState<Regulation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRegulations();
  }, []);

  const fetchRegulations = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/regulations`);
      if (!res.ok) throw new Error("Ошибка загрузки");
      const data = await res.json();
      setRegulations(data);
    } catch (err) {
      console.error("Ошибка:", err);
      setError(t("regulations.loadError"));
    } finally {
      setLoading(false);
    }
  };

  const decodeFileName = (name: string) => {
    try {
      return decodeURIComponent(escape(name));
    } catch {
      return name;
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString(lang === "uz" ? "uz-Latn-UZ" : "ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  const getFileLabel = (filename: string) => {
    const ext = filename.split(".").pop()?.toLowerCase();
    return ext === "pdf" ? "PDF" : "DOCX";
  };

  if (loading) {
    return (
      <div className={styles.regulations}>
        <div className="global-container">
          <div className={styles.regulationsWrapper}>
            <div className={styles.loading}>
              <div className={styles.spinner}></div>
              <p>{t("regulations.loadingDocs")}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.regulations}>
        <div className="global-container">
          <div className={styles.regulationsWrapper}>
            <div className={styles.error}>
              <p>{error}</p>
              <button onClick={fetchRegulations}>{t("regulations.tryAgain")}</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.regulations}>
      <div className="global-container">
        <div className={styles.regulationsWrapper}>
          <h1 className={styles.title}>{t("regulations.title")}</h1>
          <p className={styles.subtitle}>
            {t("regulations.subtitle")}
          </p>

          <div className={styles.content}>
            {regulations.length === 0 ? (
              <div className={styles.empty}>
                <p>{t("regulations.empty")}</p>
              </div>
            ) : (
              <div className={styles.layout}>
                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>{t("regulations.listTitle")}</h2>

                  <div className={styles.docList}>
                    {regulations.map((reg, index) => (
                      <div key={reg._id} className={styles.docItem}>
                        <span className={styles.docNumber}>{index + 1}.</span>

                        <span className={styles.docIcon}>
                                                <Image src="/Doc.svg" alt="Контакт" width={24} height={24} />

                        </span>

                        <div className={styles.docMain}>
                          <p className={styles.docName}>
                            {t("regulations.document")} <span className={styles.docYear}>{reg.year}</span>
                          </p>
                          <p className={styles.fileName}>
                            {decodeFileName(reg.originalName)}{" "}
                            <span className={styles.fileLabel}>
                              {getFileLabel(reg.filename)}
                            </span>
                          </p>
                        </div>

                        <span className={styles.docDate}>
                          {t("regulations.added")}: {formatDate(reg.createdAt)}
                        </span>

                        
                         <a href={`${process.env.NEXT_PUBLIC_API_URL}/api/regulations/${reg._id}/download`}
                          className={styles.docLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {t("regulations.download")}
                          <span className={styles.downloadIcon}>
                           <Image src="/downloadArchive.svg" alt="Скачать" width={16} height={16} />
                          </span>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={styles.sidebar}>
                  <div className={styles.illustration}>
                    <Image
                      src="/flowers.svg"
                      alt="Иллюстрация архива" width={260} height={160} />
                  </div>

                  <div className={styles.contactCard}>
                    <span className={styles.contactIcon}>
                      <Image src="/Doc.svg" alt="Контакт" width={24} height={24} />
                    </span>
                    <div className={styles.contactContent}>
                      <h4>{t("regulations.notFoundTitle")}</h4>
                      <p>{t("regulations.notFoundText")}</p>
                      <Link href="/contacts" className={styles.contactLink}>
                        {t("regulations.contactUs")}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Regulations;
