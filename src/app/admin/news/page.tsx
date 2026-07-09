"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./page.module.scss";

type NewsType = "card" | "photo" | "pdf";

interface NewsItem {
  _id: string;
  type: NewsType;
  title: string;
  date: string;
  createdAt: string;
}

export default function AdminNewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [type, setType] = useState<NewsType>("card");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [href, setHref] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const fileRef = useRef<HTMLInputElement>(null);

  const fetchNews = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news`, {
        credentials: "include",
      });
      const data = await res.json();
      setNews(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchNews(); }, []);

  const resetForm = () => {
    setTitle("");
    setDate("");
    setHref("");
    setExcerpt("");
    setCategory("");
    setFileSize("");
    setFile(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleUpload = async () => {
    setError("");
    setSuccess("");

    if (!title || !date) {
      setError("Заполните заголовок и дату");
      return;
    }
    if ((type === "card" || type === "photo") && !file) {
      setError("Выберите изображение");
      return;
    }
    if (type === "pdf" && !file) {
      setError("Выберите PDF файл");
      return;
    }

    const formData = new FormData();
    formData.append("type", type);
    formData.append("title", title);
    formData.append("date", date);
    if (href) formData.append("href", href);
    if (type === "card") {
      formData.append("excerpt", excerpt);
      formData.append("category", category);
    }
    if (type === "pdf" && fileSize) {
      formData.append("fileSize", fileSize);
    }
    if (file) formData.append("file", file);

    setUploading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      if (!res.ok) throw new Error();
      setSuccess("Новость успешно добавлена");
      resetForm();
      fetchNews();
    } catch {
      setError("Ошибка при загрузке");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Удалить новость?")) return;
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      fetchNews();
    } catch {
      setError("Ошибка при удалении");
    }
  };

  const typeBadge: Record<NewsType, string> = {
    card: styles.badgeCard,
    photo: styles.badgePhoto,
    pdf: styles.badgePdf,
  };

  const typeLabel: Record<NewsType, string> = {
    card: "Карточка",
    photo: "Фото",
    pdf: "PDF",
  };

  const fileAccept = type === "pdf" ? ".pdf" : ".jpg,.jpeg,.png,.webp";
  const fileHint = type === "pdf" ? "PDF, максимум 50 МБ" : "JPG, PNG, WEBP";

  return (
    <div>
      <h1 className={styles.pageTitle}>Новости</h1>

      {/* Форма */}
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Добавить новость</h2>

        {/* Тип */}
        <div className={styles.formGroup}>
          <label>Тип новости</label>
          <div className={styles.typeRow}>
            {(["card", "photo", "pdf"] as NewsType[]).map((t) => (
              <button
                key={t}
                className={`${styles.typeBtn} ${type === t ? styles.typeBtnActive : ""}`}
                onClick={() => { setType(t); setFile(null); if (fileRef.current) fileRef.current.value = ""; }}
              >
                {typeLabel[t]}
              </button>
            ))}
          </div>
        </div>

        {/* Общие поля */}
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Заголовок</label>
            <input
              type="text"
              placeholder="Заголовок новости"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Дата</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>

        {/* card — доп поля */}
        {type === "card" && (
          <>
            <div className={styles.formGroup}>
              <label>Краткое описание</label>
              <input
                type="text"
                placeholder="Краткий анонс новости"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
              />
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Категория</label>
                <input
                  type="text"
                  placeholder="Методика"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Ссылка (href)</label>
                <input
                  type="text"
                  placeholder="/news/slug"
                  value={href}
                  onChange={(e) => setHref(e.target.value)}
                />
              </div>
            </div>
          </>
        )}

        {/* photo — ссылка */}
        {type === "photo" && (
          <div className={styles.formGroup}>
            <label>Ссылка (href)</label>
            <input
              type="text"
              placeholder="/news/slug"
              value={href}
              onChange={(e) => setHref(e.target.value)}
            />
          </div>
        )}

        {/* pdf — размер файла */}
        {type === "pdf" && (
          <div className={styles.formGroup}>
            <label>Размер файла (отображаемый)</label>
            <input
              type="text"
              placeholder="2.4 МБ"
              value={fileSize}
              onChange={(e) => setFileSize(e.target.value)}
            />
          </div>
        )}

        {/* Файл */}
        <div className={styles.formGroup}>
          <label>{type === "pdf" ? "PDF файл" : "Изображение"}</label>
          <div
            className={styles.dropzone}
            onClick={() => fileRef.current?.click()}
          >
            {file ? (
              <p className={styles.fileName}>📄 {file.name}</p>
            ) : (
              <>
                <p>Нажмите для выбора файла</p>
                <span>{fileHint}</span>
              </>
            )}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept={fileAccept}
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
          {uploading ? "Загрузка..." : "Добавить"}
        </button>
      </div>

      {/* Таблица */}
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Все новости</h2>
        {loading ? (
          <p className={styles.muted}>Загрузка...</p>
        ) : news.length === 0 ? (
          <p className={styles.muted}>Новостей пока нет</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Заголовок</th>
                <th>Тип</th>
                <th>Дата</th>
                <th>Добавлено</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {news.map((item) => (
                <tr key={item._id}>
                  <td>{item.title}</td>
                  <td>
                    <span className={`${styles.badge} ${typeBadge[item.type]}`}>
                      {typeLabel[item.type]}
                    </span>
                  </td>
                  <td>{new Date(item.date).toLocaleDateString("ru-RU")}</td>
                  <td>{new Date(item.createdAt).toLocaleDateString("ru-RU")}</td>
                  <td>
                    <button
                      className={styles.btnDelete}
                      onClick={() => handleDelete(item._id)}
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