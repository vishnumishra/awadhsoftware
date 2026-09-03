'use client';

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { STRINGS, type Lang, type Strings } from './strings';

const STORAGE_KEY = 'awadh_lang';

type LangContextValue = { lang: Lang; setLang: (l: Lang) => void; t: Strings };

const LangContext = createContext<LangContextValue>({ lang: 'en', setLang: () => {}, t: STRINGS.en });

// Language preference lives in localStorage; pages are pre-rendered in English
// and switch on the client, which also updates <html lang> for screen readers.
export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'hi' || saved === 'en') setLangState(saved);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try { localStorage.setItem(STORAGE_KEY, l); } catch {}
  }, []);

  return <LangContext.Provider value={{ lang, setLang, t: STRINGS[lang] }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
