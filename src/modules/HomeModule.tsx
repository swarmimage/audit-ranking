// src/modules/HomeModule.tsx
"use client";
import DocumentPreview from '@/components/DocumentPreview'
import { Main } from "next/document";
import MainDocument from "@/components/MainDocument";
import HeroCard from '@/components/HeroCard';
import Hero from '@/components/Hero';
 // если будете использовать интерактивность


export default function HomeModule() {
  return (
  <div>
    <HeroCard/>
    <MainDocument/>
    <Hero/>
    <DocumentPreview/>
  </div>
   );
}