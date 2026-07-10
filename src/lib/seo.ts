import type { Metadata } from "next";
import { seoTranslations } from "@/i18n/seoTranslations";

const DEFAULT_OG_IMAGE = "/og-default.png";

type SeoPage = keyof typeof seoTranslations.ru;

export function createPageMetadata(page: SeoPage, pathname: string): Metadata {
  const content = seoTranslations.ru[page];
  const title = `${content.title} | AuditRanking`;

  return {
    title,
    description: content.description,
    keywords: [...content.keywords],
    alternates: { canonical: pathname },
    openGraph: {
      title,
      description: content.description,
      url: pathname,
      siteName: "AuditRanking",
      locale: "ru_RU",
      type: "website",
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: "AuditRanking" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: content.description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export const siteMetadata: Metadata = {
  metadataBase: new URL("https://auditranking.uz"),
  applicationName: "AuditRanking",
  title: "AuditRanking",
};
