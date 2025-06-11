"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import i18n from '@/i18n-client';
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/components/LanguageProvider";
import { usePathname } from 'next/navigation';

export default function TestIndex() {
  const { t } = useTranslation();
  const { currentLanguage, setCurrentLanguage } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  
  // Hydration safety and language setting
  useEffect(() => {
    // Ensure language is set to Chinese on this page
    const isEnglishPath = pathname?.startsWith('/en');
    
    if (!isEnglishPath && i18n.language !== 'zh') {
      i18n.changeLanguage('zh');
      setCurrentLanguage('zh');
    }
    
    setMounted(true);
  }, [pathname, setCurrentLanguage]);

  return (
    <div className="flex flex-col items-center justify-center p-16">
      {!mounted ? null : (
        <>
          <h1 className="text-4xl font-bold mb-8">{t("TestPage")}</h1>
          <div className="flex flex-col gap-4">
            <Link href="/test/1" className="text-blue-500 hover:underline">
              {t("TestID", { id: "1" })}
            </Link>
            <Link href="/test/2" className="text-blue-500 hover:underline">
              {t("TestID", { id: "2" })}
            </Link>
            <Link href="/test/3" className="text-blue-500 hover:underline">
              {t("TestID", { id: "3" })}
            </Link>
            <Link href="/test/custom-id" className="text-blue-500 hover:underline">
              {t("TestID", { id: "custom-id" })}
            </Link>
          </div>
        </>
      )}
    </div>
  );
} 