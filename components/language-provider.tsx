"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"

type Language = "en" | "fr"
type LanguageContextValue = { language: Language; setLanguage: (language: Language) => void; t: (english: string, french: string) => string }

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")
  useEffect(() => { const saved = window.localStorage.getItem("oxymore-language"); if (saved === "fr" || saved === "en") setLanguage(saved) }, [])
  const value = useMemo(() => ({ language, setLanguage: (next: Language) => { setLanguage(next); window.localStorage.setItem("oxymore-language", next) }, t: (english: string, french: string) => language === "fr" ? french : english }), [language])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const value = useContext(LanguageContext)
  if (!value) throw new Error("useLanguage must be used inside LanguageProvider")
  return value
}
