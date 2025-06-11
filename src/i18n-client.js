"use client";

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import locale files
import enTranslation from '../public/locales/en.json';
import zhTranslation from '../public/locales/zh_TW.json';

// Initialize i18next
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation
      },
      zh: {
        translation: zhTranslation
      }
    },
    lng: 'zh', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already escapes values
    },
    react: {
      useSuspense: false
    }
  });

export default i18n; 