"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, Globe2, Home, Moon, Palette, Sparkles, Languages, Wind } from "lucide-react"
import { useEffect, useState } from "react"

const items = [
  { href: "/", label: "Accueil", en: "Home", icon: Home },
  { href: "/oxymores", label: "Oxymores", en: "Oxymores", icon: Sparkles },
  { href: "/lunogramme", label: "Lunogramme", en: "Lunogram", icon: Moon },
  { href: "/atelier", label: "Atelier", en: "Studio", icon: Palette },
  { href: "/emotionnel", label: "Émotionnel", en: "Mood journal", icon: Moon },
  { href: "/bibliotheque", label: "Bibliothèque", en: "Library", icon: BookOpen },
  { href: "/brise", label: "Brise", en: "Disappear", icon: Wind },
  { href: "/carte", label: "Carte", en: "Poem map", icon: Globe2 },
]

export function LunarNav() {
  const pathname = usePathname()
  const [language, setLanguage] = useState("fr")
  const [open, setOpen] = useState(false)
  useEffect(() => { setLanguage(localStorage.getItem("lunogramme-language") || "fr") }, [])
  const changeLanguage = (value: string) => { setLanguage(value); localStorage.setItem("lunogramme-language", value); document.documentElement.lang = value }
  return <header className="site-header">
    <Link href="/" className="brand-mark" aria-label="Lunogramme, accueil"><span className="brand-orbit"><Moon size={17} strokeWidth={1.5} /></span><span>Lunogramme</span></Link>
    <button className="mobile-menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Ouvrir le menu"><Moon size={18} /></button>
    <nav className={`lunar-nav ${open ? "is-open" : ""}`} aria-label="Navigation principale">{items.map(({ href, label, en, icon: Icon }) => { const active = href === "/" ? pathname === href : pathname.startsWith(href); return <Link key={href} href={href} className={`nav-orbit ${active ? "is-active" : ""}`} aria-current={active ? "page" : undefined}><span className="nav-orbit-icon"><Icon size={18} strokeWidth={1.5} /></span><span>{language === "en" ? en : label}</span></Link> })}</nav>
    <div className="language-wrap"><button className="header-moon" aria-label="Choisir la langue"><Moon size={19} /></button><div className="language-menu"><Languages size={14} /><button className={language === "fr" ? "is-selected" : ""} onClick={() => changeLanguage("fr")}>FR</button><button className={language === "en" ? "is-selected" : ""} onClick={() => changeLanguage("en")}>EN</button></div></div>
  </header>
}

export function PageShell({ children }: { children: React.ReactNode }) { return <div className="app-shell"><div className="starfield" aria-hidden="true">{Array.from({ length: 34 }, (_, i) => <i key={i} style={{ "--star-x": `${(i * 29) % 100}%`, "--star-y": `${(i * 47) % 100}%`, "--star-delay": `${(i % 7) * 0.45}s`, "--star-size": `${i % 5 === 0 ? 3 : 1.5}px` } as React.CSSProperties} />)}<span className="star-moon" /></div><LunarNav /><main>{children}</main></div> }
export function SectionIntro({ eyebrow, title, children }: { eyebrow: string; title: React.ReactNode; children: React.ReactNode }) { return <section className="section-intro"><p className="eyebrow"><BookOpen size={14} /> {eyebrow}</p><h1>{title}</h1><p className="intro-copy">{children}</p></section> }
