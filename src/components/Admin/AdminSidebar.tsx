"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./AdminSidebar.module.scss";
import Image from "next/image";

const links = [
  { href: "/admin/ratings", label: "Рэнкинги", icon: "/admin/cup.svg" },
  { href: "/admin/methodology", label: "Методика", icon: "/admin/doc.svg" },
  { href: "/admin/news", label: "Новости", icon: "/admin/news.svg" },
  {
    href: "/admin/regulations",
    label: "Нормативные документы",
    icon: "/admin/scales.svg",
  },
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
            <Image src={link.icon} alt={link.label} width={20} height={20} />
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
