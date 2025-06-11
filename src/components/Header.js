"use client";

import Link from 'next/link';
import Image from 'next/image';
import i18n from '@/i18n-client';
import { useTranslation } from "react-i18next";
import { usePathname } from 'next/navigation';
import { useRouter } from "next/navigation";
import { useLanguage } from './LanguageProvider';
import { useEffect, useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const { t } = useTranslation();
  const { currentLanguage, setCurrentLanguage } = useLanguage();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  
  // Ensure we only render language-specific elements after hydration
  // and set the initial language based on URL path
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
  
  // Function to change language and navigate to the corresponding URL
  const changeLanguage = (targetLang) => {
    // Change i18n language first
    i18n.changeLanguage(targetLang);
    
    // Then navigate to the appropriate URL
    const newPath = getLocalizedPath(targetLang);
    router.push(newPath);
  };
  
  // Function to get localized URL
  const getLocalizedPath = (targetLang) => {
    if (targetLang === 'en') {
      // If switching to English
      if (pathname.startsWith('/en')) {
        // Already on English path
        return pathname;
      } else {
        // Add /en prefix
        return `/en${pathname}`;
      }
    } else {
      // If switching to Chinese (default)
      if (pathname.startsWith('/en')) {
        // Remove /en prefix
        return pathname.replace(/^\/en/, '') || '/';
      } else {
        // Already on Chinese path
        return pathname;
      }
    }
  };
  
  // Determine language button content based on mounted state and URL path
  const renderLanguageButton = () => {
    if (!mounted) return null;
    
    // Check if we're on an English path
    const isEnglishPath = pathname?.startsWith('/en');
    
    // Show Chinese button if we're on English path, English button otherwise
    if (isEnglishPath) {
      return (
        <div className="nav-item">
          <button 
            onClick={() => changeLanguage('zh')}
            className="nav-link hover:text-blue-500 transition-colors"
            style={{color: "white", background: "none", border: "none", cursor: "pointer"}}
          >
            <i className="bi bi-globe2 me-2"></i> Chinese
          </button>
        </div>
      );
    } else {
      return (
        <div className="nav-item">
          <button 
            onClick={() => changeLanguage('en')}
            className="nav-link hover:text-blue-500 transition-colors"
            style={{color: "white", background: "none", border: "none", cursor: "pointer"}}
          >
            <i className="bi bi-globe2 me-2"></i> English
          </button>
        </div>
      );
    }
  };
  
  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm py-4 px-8 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <Link href={mounted ? (pathname?.startsWith('/en') ? '/en' : '/') : '/'} className="flex items-center">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={120}
            height={30}
            priority
          />
        </Link>
        <nav className="flex gap-6">
          <Link href={mounted ? (pathname?.startsWith('/en') ? '/en' : '/') : '/'} className="hover:text-blue-500 transition-colors">
            {t("Home")}
          </Link>
          <Link href={mounted ? (pathname?.startsWith('/en') ? '/en/test' : '/test') : '/test'} className="hover:text-blue-500 transition-colors">
            {t("Test")}
          </Link>
          {renderLanguageButton()}
        </nav>
      </div>
    </header>
  );
} 