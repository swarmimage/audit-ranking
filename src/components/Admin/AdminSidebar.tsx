"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./AdminSidebar.module.scss";

const links = [
  { href: "/admin/ratings",     label: "Рэнкинги",               icon: "🏆" },
  { href: "/admin/methodology", label: "Методика",               icon: "📄" },
  { href: "/admin/news",        label: "Новости",                icon: "📰" },
  { href: "/admin/regulations", label: "Нормативные документы",  icon: "⚖️" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <span>Аудитрейтинг</span>
        <p>Панель управления</p>
      </div>
      <nav>
        <p className={styles.section}>Контент</p>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`${styles.navItem} ${pathname === link.href ? styles.active : ""}`}
          >
            <span>{link.icon}</span>
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}