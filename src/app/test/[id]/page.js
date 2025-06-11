"use client";

import Link from 'next/link';
import { useEffect, use, useState } from 'react';
import i18n from '@/i18n-client';
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/components/LanguageProvider";

export default function TestPage({ params }) {
  // Wait for params to be available
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const [mounted, setMounted] = useState(false);
  
  // Hydration safety and language setting
  useEffect(() => {
    // Set language to Chinese when this page loads
    if (i18n.language !== 'zh') {
      i18n.changeLanguage('zh');
    }
    setMounted(true);
  }, []);
  
  // If not mounted yet, render minimal UI to avoid hydration errors
  if (!mounted) {
    return <div className="flex flex-col items-center justify-center p-16"></div>;
  }
  
  return (
    <div className="flex flex-col items-center justify-center p-16">
      <h1 className="text-4xl font-bold mb-6">{t("IDColon")} {id}</h1>
      <Link href="/test" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
        {t("BackToTestPage")}
      </Link>
    </div>
  );
} 