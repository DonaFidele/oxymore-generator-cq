"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { BookOpen, Languages, Moon, Sparkles } from "lucide-react"

const items = [
  { href: "/oxymores", label: "Oxymores", en: "Create", icon: Sparkles },
  { href: "/mesoxym", label: "MesOxym", en: "My feed", icon: BookOpen },
]

export function LunarNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [language, setLanguage] = useState<"fr" | "en">("fr")

  useEffect(() => {
    const saved = window.localStorage.getItem("oxymore-language")
    if (saved === "en" || saved === "fr") setLanguage(saved)
  }, [])

  const chooseLanguage = (next: "fr" | "en") => {
    setLanguage(next)
    window.localStorage.setItem("oxymore-language", next)
  }

  return <header className="site-header">
    <button className="mobile-menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Ouvrir le menu"><Moon size={18} /></button>
    <nav className={`lunar-nav ${open ? "is-open" : ""}`} aria-label="Navigation principale">
      {items.map(({ href, label, en, icon: Icon }) => { const active = href === "/" ? pathname === href : pathname.startsWith(href); return <Link key={href} href={href} onClick={() => setOpen(false)} className={`nav-orbit ${active ? "is-active" : ""}`} aria-current={active ? "page" : undefined}><span className="nav-orbit-icon"><Icon size={18} strokeWidth={1.5} /></span><span>{language === "fr" ? label : en}</span></Link> })}
    </nav>
    <div className="language-wrap">
      <button className="header-moon" aria-label="Choisir la langue"><Languages size={17} /></button>
      <div className="language-menu" role="group" aria-label="Language selector"><button className={language === "fr" ? "is-selected" : ""} onClick={() => chooseLanguage("fr")}>FR</button><button className={language === "en" ? "is-selected" : ""} onClick={() => chooseLanguage("en")}>EN</button></div>
    </div>
  </header>
}

export function PageShell({ children }: { children: React.ReactNode }) { return <div className="app-shell"><div className="starfield" aria-hidden="true">{Array.from({ length: 34 }, (_, i) => <i key={i} style={{ "--star-x": `${(i * 29) % 100}%`, "--star-y": `${(i * 47) % 100}%`, "--star-delay": `${(i % 7) * 0.45}s`, "--star-size": `${i % 5 === 0 ? 3 : 1.5}px` } as React.CSSProperties} />)}<span className="star-moon" /></div><LunarNav /><main>{children}</main></div> }
export function SectionIntro({ eyebrow, title, children }: { eyebrow: string; title: React.ReactNode; children: React.ReactNode }) { return <section className="section-intro"><p className="eyebrow"><BookOpen size={14} /> {eyebrow}</p><h1>{title}</h1><p className="intro-copy">{children}</p></section> }
