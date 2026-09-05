import React, { createContext, useContext, useState, useEffect } from 'react';
import { SupportedLanguage, SUPPORTED_LANGUAGES, TRANSLATIONS, LanguageInfo } from './translations';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  languages: LanguageInfo[];
  t: (key: string, defaultText?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_LANG_KEY = 'civic_ai_language_v1';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_LANG_KEY);
      if (saved === 'en' || saved === 'ta' || saved === 'hi') {
        return saved;
      }
    } catch {
      // fallback
    }
    return 'en';
  });

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_LANG_KEY, lang);
    } catch (e) {
      console.warn('Failed to save language preference', e);
    }
  };

  const t = (key: string, defaultText = ''): string => {
    const dict = TRANSLATIONS[language];
    if (dict && dict[key]) {
      return dict[key];
    }
    // Fallback to English if translation key not found in current language
    const enDict = TRANSLATIONS['en'];
    if (enDict && enDict[key]) {
      return enDict[key];
    }
    return defaultText || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        languages: SUPPORTED_LANGUAGES,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};
