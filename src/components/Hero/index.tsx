'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './index.module.scss';
import '@/app/globals.css';
import { useLanguage } from '@/i18n/LanguageContext';

interface HeroCardItem {
  icon: string; // Путь к SVG из папки public
  key: 'about' | 'services' | 'process' | 'reliability';
  href: string;
}

const cards: HeroCardItem[] = [
  {
    icon: '/main/people.svg',
    key: 'about',
    href: '/about',
  },
  {
    icon: '/main/level.svg',
    key: 'services',
    href: '/method',
  },
  {
    icon: '/main/folder.svg',
    key: 'process',
    href: '/method',
  },
  {
    icon: '/main/about.svg',
    key: 'reliability',
    href: '/method',
  },
];

export default function HeroCard():React.ReactNode {
  const { t } = useLanguage();
  return (
    <div className="global-container">
      <div className={styles.grid}>
        {cards.map((card) => {
          const content = t(`heroCard.${card.key}`) as { title: string; description: string; linkText: string };
          return (
            <Link key={card.key} href={card.href} className={styles.card}>
              <div className={styles.iconWrap}>
                <Image 
                  src={card.icon} 
                  alt={content.title} 
                  className={styles.icon} 
                  width={20} 
                  height={20} 
                  style={{ width: "auto", height: "auto" }}
                />
              </div>
              <div className={styles.content}>
                <h3 className={styles.title}>{content.title}</h3>
                <p className={styles.description}>{content.description}</p>
                <span className={styles.link}>
                  {content.linkText}
                  <span className={styles.arrow}>→</span>
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
