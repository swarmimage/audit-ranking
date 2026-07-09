// src/app/admin/layout.tsx
import AdminSidebar from "@/components/Admin/AdminSidebar";
import styles from "./layout.module.scss";

export const metadata = { title: "Админ-панель" };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.layout}>
      <AdminSidebar />
      <main className={styles.main}>{children}</main>
    </div>
  );
}