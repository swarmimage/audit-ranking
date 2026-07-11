export async function apiFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const res = await fetch(url, {
    ...options,
    credentials: "include",
  });

  if (res.status === 401) {
    const refreshRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh`,
      {
        method: "POST",
        credentials: "include",
      }
    );

    if (refreshRes.ok) {
      // Токен обновлён — повторяем оригинальный запрос один раз
      return fetch(url, {
        ...options,
        credentials: "include",
      });
    }

    // Refresh не удался — сессия истекла, отправляем на логин
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  }

  return res;
}