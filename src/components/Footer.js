"use client";

import Image from 'next/image';
import i18n from '@/i18n-client';
import { usePathname } from 'next/navigation';
import { useTranslation } from "react-i18next";
import { useEffect, useState } from 'react';
import { useLanguage } from './LanguageProvider';

export default function Footer() {
  const pathname = usePathname();
  const { t } = useTranslation();
  const { setCurrentLanguage } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Detect language from URL
    const isEnglishPath = pathname?.startsWith('/en');
    const detectedLanguage = isEnglishPath ? 'en' : 'zh';
    
    // Set language if it's different from current
    if (i18n.language !== detectedLanguage) {
      i18n.changeLanguage(detectedLanguage);
      setCurrentLanguage(detectedLanguage);
    }
    
    setMounted(true);
  }, [pathname, setCurrentLanguage]);
  
  // Always return a footer element to avoid hydration mismatch
  return (
    <footer className="bg-white dark:bg-gray-900 py-6 px-8 w-full border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto flex flex-wrap justify-center gap-6 items-center">
        {!mounted ? null : (
          <>
            <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
              href="https://nextjs.org/learn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="/file.svg"
                alt="File icon"
                width={16}
                height={16}
              />
              {t("Learn")}
            </a>
            <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
              href="https://vercel.com/templates?framework=next.js"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="/window.svg"
                alt="Window icon"
                width={16}
                height={16}
              />
              {t("Examples")}
            </a>
            <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="/globe.svg"
                alt="Globe icon"
                width={16}
                height={16}
              />
              Go to nextjs.org →
            </a>
          </>
        )}
      </div>
    </footer>
  );
} 