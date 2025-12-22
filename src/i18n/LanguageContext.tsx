import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { SupportedLanguage, TranslationKey, translations } from './translations';

type LanguageContextValue = {
  language: SupportedLanguage;
  setLanguage: (language: SupportedLanguage) => void;
  t: (key: TranslationKey) => string;
};

const defaultLanguage: SupportedLanguage = 'en';
const LOCAL_STORAGE_KEY = 'preferredLanguage';

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<SupportedLanguage>(() => {
    const stored = typeof window !== 'undefined' ? (localStorage.getItem(LOCAL_STORAGE_KEY) as SupportedLanguage | null) : null;
    return stored && translations[stored] ? stored : defaultLanguage;
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, language);
  }, [language]);

  const t = useMemo(
    () =>
      (key: TranslationKey) => {
        const translated = translations[language][key];
        return translated ?? translations[defaultLanguage][key];
      },
    [language],
  );

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t,
    }),
    [language, t],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
