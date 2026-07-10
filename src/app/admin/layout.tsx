// src/app/admin/layout.tsx
import AdminSidebar from "@/components/Admin/AdminSidebar";
import styles from "./layout.module.scss";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Админ-панель | AuditRanking",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.layout}>
      <AdminSidebar />
      <main className={styles.main}>{children}</main>
    </div>
  );
}
