import HomeModule from "@/modules/HomeModule";
import { createPageMetadata } from "@/lib/seo";
import Script from "next/script";

export const metadata = createPageMetadata("home", "/");

export default function HomePage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{
      "@type": "ListItem",
      position: 1,
      name: "Главная",
      item: "https://auditranking.uz/",
    }],
  };

  return (
    <>
      <Script
        id="home-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <HomeModule />
    </>
  );
}
