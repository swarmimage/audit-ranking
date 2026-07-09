import NewsModule from "@/modules/NewsModule";

export const metadata = {
  title: "Новости | Архив новостей",
  description: "Архив новостей аудиторских организаций Республики Узбекистан",
};

export default function NewsPage() {
  return <NewsModule />;
}