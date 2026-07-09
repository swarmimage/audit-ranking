"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./page.module.scss";

interface Rating {
  _id: string;
  title: string;
  year: string;
  originalName: string;
  createdAt: string;
}

export default function AdminRatingsPage() {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const fetchRatings = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ratings`, {
        credentials: "include",
      });
      const data = await res.json();
      setRatings(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRatings(); }, []);

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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ratings`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!res.ok) throw new Error();
      setSuccess("Рейтинг успешно загружен");
      setTitle("");
      setYear("");
      setFile(null);
      if (fileRef.current) fileRef.current.value = "";
      fetchRatings();
    } catch {
      setError("Ошибка при загрузке");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Удалить рейтинг?")) return;
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ratings/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      fetchRatings();
    } catch {
      setError("Ошибка при удалении");
    }
  };

  return (
    <div>
      <h1 className={styles.pageTitle}>Рэнкинги</h1>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Загрузить рейтинг</h2>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Название</label>
            <input
              type="text"
              placeholder="Рейтинг по итогам 2024 года"
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
                <span>.docx или .pdf, максимум 20 МБ</span>
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

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Загруженные Рэнкинги</h2>
        {loading ? (
          <p className={styles.muted}>Загрузка...</p>
        ) : ratings.length === 0 ? (
          <p className={styles.muted}>Рэнкингов пока нет</p>
        ) : (
          <>
            {/* Десктоп таблица */}
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
                {ratings.map((r) => (
                  <tr key={r._id}>
                    <td>{r.title}</td>
                    <td>{r.year}</td>
                    <td className={styles.fileCell}>{r.originalName}</td>
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

            {/* Мобильные карточки */}
            <div className={styles.mobileList}>
              {ratings.map((r) => (
                <div key={r._id} className={styles.mobileCard}>
                  <div className={styles.mobileCardRow}>
                    <span className={styles.mobileLabel}>Название</span>
                    <span className={styles.mobileValue}>{r.title}</span>
                  </div>
                  <div className={styles.mobileCardRow}>
                    <span className={styles.mobileLabel}>Год</span>
                    <span className={styles.mobileValue}>{r.year}</span>
                  </div>
                  <div className={styles.mobileCardRow}>
                    <span className={styles.mobileLabel}>Файл</span>
                    <span className={styles.mobileValue}>{r.originalName}</span>
                  </div>
                  <div className={styles.mobileCardRow}>
                    <span className={styles.mobileLabel}>Дата</span>
                    <span className={styles.mobileValue}>
                      {new Date(r.createdAt).toLocaleDateString("ru-RU")}
                    </span>
                  </div>
                  <button
                    className={styles.btnDelete}
                    onClick={() => handleDelete(r._id)}
                  >
                    Удалить
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}