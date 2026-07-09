"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./page.module.scss";

interface MethodologyDoc {
  _id: string;
  originalName: string;
  createdAt: string;
}

export default function AdminMethodologyPage() {
  const [doc, setDoc] = useState<MethodologyDoc | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const fetchDoc = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/methodology`,
        { credentials: "include" }
      );
      if (res.ok) {
        const data = await res.json();
        setDoc(data);
      } else {
        setDoc(null);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDoc(); }, []);

  const handleUpload = async () => {
    setError("");
    setSuccess("");
    if (!file) {
      setError("Выберите файл");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/methodology`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );
      if (!res.ok) throw new Error();
      setSuccess("Документ успешно загружен");
      setFile(null);
      if (fileRef.current) fileRef.current.value = "";
      fetchDoc();
    } catch {
      setError("Ошибка при загрузке");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!doc) return;
    if (!confirm("Удалить документ методики?")) return;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/methodology`,
        { method: "DELETE", credentials: "include" }
      );
      if (!res.ok) throw new Error();
      setDoc(null);
      setSuccess("Документ удалён");
    } catch {
      setError("Ошибка при удалении");
    }
  };

  return (
    <div>
      <h1 className={styles.pageTitle}>Методика</h1>

      {/* Текущий документ */}
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Текущий документ</h2>
        {loading ? (
          <p className={styles.muted}>Загрузка...</p>
        ) : doc ? (
          <div className={styles.currentDoc}>
            <div className={styles.docInfo}>
              <span className={styles.docIcon}>📄</span>
              <div>
                <p className={styles.docName}>{doc.originalName}</p>
                <p className={styles.docDate}>
                  Загружен: {new Date(doc.createdAt).toLocaleDateString("ru-RU")}
                </p>
              </div>
            </div>
            <button className={styles.btnDelete} onClick={handleDelete}>
              Удалить
            </button>
          </div>
        ) : (
          <p className={styles.muted}>Документ не загружен</p>
        )}
      </div>

      {/* Форма загрузки */}
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>
          {doc ? "Заменить документ" : "Загрузить документ"}
        </h2>
        {doc && (
          <p className={styles.warning}>
            ⚠️ Загрузка нового файла автоматически заменит текущий
          </p>
        )}

        <div className={styles.formGroup}>
          <label>Файл (.docx)</label>
          <div
            className={styles.dropzone}
            onClick={() => fileRef.current?.click()}
          >
            {file ? (
              <p className={styles.fileName}>📄 {file.name}</p>
            ) : (
              <>
                <p>Нажмите для выбора файла</p>
                <span>Только .docx, максимум 20 МБ</span>
              </>
            )}
          </div>
          <input
            ref={fileRef}
            type="file"
           accept=".docx,.pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}

        <button
          className={styles.btnUpload}
          onClick={handleUpload}
          disabled={uploading}
        >
          {uploading ? "Загрузка..." : doc ? "Заменить" : "Загрузить"}
        </button>
      </div>
    </div>
  );
}