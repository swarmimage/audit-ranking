import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { siteMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  ...siteMetadata,
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AuditRanking",
  url: "https://auditranking.uz",
  logo: "https://auditranking.uz/og-default.png",
  address: {
    "@type": "PostalAddress",
    streetAddress: "улица Бодомзор йули, 1А",
    addressLocality: "Ташкент",
    addressCountry: "UZ",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+998-71-235-78-04",
      contactType: "customer service",
      email: "auditrenkin@gmail.com",
      availableLanguage: ["ru", "uz"],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={inter.variable} data-scroll-behavior="smooth">
      <body suppressHydrationWarning>
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
