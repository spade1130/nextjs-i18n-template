"use client";

import { createContext, useState, useEffect, useContext } from "react";
import i18n from '@/i18n-client';
import { usePathname } from 'next/navigation';

// Create context for language state
const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const pathname = usePathname();
  
  // Initial setup: detect language from URL path
  useEffect(() => {
    if (pathname) {
      const isEnglishPath = pathname.startsWith('/en');
      const detectedLanguage = isEnglishPath ? 'en' : 'zh';
      
      if (i18n.language !== detectedLanguage) {
        i18n.changeLanguage(detectedLanguage);
      }
    }
  }, [pathname]);
  
  // Update language state when i18n language changes
  useEffect(() => {
    const handleLanguageChange = () => {
      setCurrentLanguage(i18n.language);
      console.log("Language changed to:", i18n.language);
    };
    
    i18n.on('languageChanged', handleLanguageChange);
    
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);
  
  return (
    <LanguageContext.Provider value={{ currentLanguage, setCurrentLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook to use language context
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 