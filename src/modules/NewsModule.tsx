// modules/NewsModule/NewsModule.tsx
"use client";

import { useEffect, useState } from "react";
import NewsGrid from "@/components/News";
import { NewsItem } from "@/components/News";
import { adaptNewsItem } from "@/utils/newsAdapter";
import { useLanguage } from "@/i18n/LanguageContext";

const NewsModule = () => {
  const { t } = useLanguage();
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news`)
    .then((r) => r.json())
    .then((data) => {
      console.log('news raw:', data);
      console.log('api url:', process.env.NEXT_PUBLIC_API_URL);
      if (Array.isArray(data)) {
        setItems(data.map(adaptNewsItem));
      }
    })
    .finally(() => setLoading(false));
}, []);

  return (
    <div className="global-container">
      <h1 style={{ padding: "35px 0 10px" }}>{t("news.title")}</h1>
      {loading ? (
        <p style={{ color: "#6b7680", padding: "40px 0" }}>{t("news.loading")}</p>
      ) : (
        <NewsGrid items={items}  />
      )}
    </div>
  );
};

export default NewsModule;