"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.scss";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

    useEffect(() => {
    console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);
    console.log('Все переменные с NEXT_PUBLIC_:', Object.keys(process.env).filter(key => key.startsWith('NEXT_PUBLIC_')));
  }, []);

const handleLogin = async () => {
  setError("");
  if (!username || !password) {
    setError("Заполните все поля");
    return;
  }

  setLoading(true);
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ 
          email: username,  // ← Изменил username на email
          password 
        }),
      }
    );

    if (!res.ok) {
      const data = await res.json();
      setError(data.message || "Неверный логин или пароль");
      return;
    }

    router.push("/admin/ratings");
  } catch {
    setError("Ошибка соединения с сервером");
  } finally {
    setLoading(false);
  }
};

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logo}>
          <h1>Аудитрейтинг</h1>
          <p>Панель управления</p>
        </div>

        <div className={styles.formGroup}>
          <label>Логин</label>
          <input
            type="text"
            placeholder="admin"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="username"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Пароль</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="current-password"
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button
          className={styles.btnLogin}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Вход..." : "Войти"}
        </button>
      </div>
    </div>
  );
}