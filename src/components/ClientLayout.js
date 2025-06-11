"use client";

import { LanguageProvider } from "@/components/LanguageProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import i18n from '@/i18n-client';

export default function ClientLayout({ children }) {
  const [lang, setLang] = useState(i18n.language);

  useEffect(() => {
    // Update HTML lang attribute when language changes
    const handleLanguageChange = () => {
      setLang(i18n.language);
      document.documentElement.lang = i18n.language;
    };
    
    // Set initial language
    document.documentElement.lang = i18n.language;
    
    // Listen for language changes
    i18n.on('languageChanged', handleLanguageChange);
    
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);

  return (
    <LanguageProvider>
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </LanguageProvider>
  );
} 