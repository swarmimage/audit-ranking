import NewsModule from "@/modules/NewsModule";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata("news", "/news");

export default function NewsPage() {
  return <NewsModule />;
}
