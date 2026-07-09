// utils/newsAdapter.ts
import { NewsItem } from "@/components/News";
const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export function adaptNewsItem(raw: Record<string, string>): NewsItem {
  const base = {
    id: raw._id,
    title: raw.title,
    date: raw.date,
    href: raw.href,
  };

  if (raw.type === "card") {
    return {
      ...base,
      type: "card",
      thumbnail: raw.thumbnail
        ? `${API}/api/news/file/${raw.thumbnail}`
        : "/placeholder.jpg",
      excerpt: raw.excerpt ?? "",
      category: raw.category,
    };
  }

  if (raw.type === "photo") {
    return {
      ...base,
      type: "photo",
      image: raw.image
        ? `${API}/api/news/file/${raw.image}`
        : "/placeholder.jpg",
    };
  }

  return {
    ...base,
    type: "pdf",
    fileUrl: raw.filename ? `${API}/api/news/file/${raw.filename}` : "#",
    fileSize: raw.fileSize,
  };
}
