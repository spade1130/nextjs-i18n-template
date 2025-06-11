import i18n from 'i18next';

// Import locale files
import enTranslation from '../public/locales/en.json';
import zhTranslation from '../public/locales/zh_TW.json';

// Initialize i18next for server-side only
// without React integration
if (!i18n.isInitialized) {
  i18n.init({
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
      escapeValue: false
    }
  });
}

export default i18n; 