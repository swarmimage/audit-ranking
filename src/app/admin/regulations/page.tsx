"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./page.module.scss";

interface Regulation {
  _id: string;
  title: string;
  year: string;
  originalName: string;
  createdAt: string;
}

export default function AdminRegulationsPage() {
  const [regulations, setRegulations] = useState<Regulation[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const fetchRegulations = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/regulations`,
        { credentials: "include" }
      );
      const data = await res.json();
      setRegulations(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRegulations(); }, []);

  const handleUpload = async () => {
    setError("");
    setSuccess("");
    if (!title || !year || !file) {
      setError("Заполните все поля и выберите файл");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("year", year);
    formData.append("file", file);

    setUploading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/regulations`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );
      if (!res.ok) throw new Error();
      setSuccess("Документ успешно загружен");
      setTitle("");
      setYear("");
      setFile(null);
      if (fileRef.current) fileRef.current.value = "";
      fetchRegulations();
    } catch {
      setError("Ошибка при загрузке");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Удалить документ?")) return;
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/regulations/${id}`,
        { method: "DELETE", credentials: "include" }
      );
      fetchRegulations();
    } catch {
      setError("Ошибка при удалении");
    }
  };

  return (
    <div>
      <h1 className={styles.pageTitle}>Нормативные документы</h1>

      {/* Форма */}
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Загрузить документ</h2>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Название</label>
            <input
              type="text"
              placeholder="Закон об аудиторской деятельности"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Год</label>
            <input
              type="text"
              placeholder="2024"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>Файл (.docx или .pdf)</label>
          <div
            className={styles.dropzone}
            onClick={() => fileRef.current?.click()}
          >
            {file ? (
              <p className={styles.fileName}>📄 {file.name}</p>
            ) : (
              <>
                <p>Нажмите для выбора файла</p>
                <span>.docx или .pdf, максимум 50 МБ</span>
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
          {uploading ? "Загрузка..." : "Загрузить"}
        </button>
      </div>

      {/* Таблица */}
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Загруженные документы</h2>
        {loading ? (
          <p className={styles.muted}>Загрузка...</p>
        ) : regulations.length === 0 ? (
          <p className={styles.muted}>Документов пока нет</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Название</th>
                <th>Год</th>
                <th>Файл</th>
                <th>Дата загрузки</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {regulations.map((r) => (
                <tr key={r._id}>
                  <td>{r.title}</td>
                  <td>{r.year}</td>
                  <td>{r.originalName}</td>
                  <td>{new Date(r.createdAt).toLocaleDateString("ru-RU")}</td>
                  <td>
                    <button
                      className={styles.btnDelete}
                      onClick={() => handleDelete(r._id)}
                    >
                      Удалить
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}