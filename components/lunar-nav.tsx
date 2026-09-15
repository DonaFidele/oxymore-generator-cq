"use client"

import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { BookOpen, Languages, Moon, Sparkles } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

const items = [
  { href: "/oxymores", label: "Oxymores", en: "Create", icon: Sparkles },
  { href: "/mesoxym", label: "MesOxym", en: "My feed", icon: BookOpen },
]

export function LunarNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const { language, setLanguage } = useLanguage()
  const chooseLanguage = (next: "fr" | "en") => setLanguage(next)

  return <header className="site-header">
    <button className="mobile-menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Ouvrir le menu"><Moon size={18} /></button>
    <nav className={`lunar-nav ${open ? "is-open" : ""}`} aria-label="Navigation principale">
      {items.map(({ href, label, en, icon: Icon }) => { const active = pathname.startsWith(href); return <Link key={href} href={href} onClick={() => setOpen(false)} className={`nav-orbit ${active ? "is-active" : ""}`} aria-current={active ? "page" : undefined}><span className="nav-orbit-icon"><Icon size={18} strokeWidth={1.5} /></span><span>{language === "fr" ? label : en}</span></Link> })}
    </nav>
  </header>
}

export function PageShell({ children }: { children: React.ReactNode }) { return <div className="app-shell"><div className="starfield" aria-hidden="true">{Array.from({ length: 34 }, (_, i) => <i key={i} style={{ "--star-x": `${(i * 29) % 100}%`, "--star-y": `${(i * 47) % 100}%`, "--star-delay": `${(i % 7) * 0.45}s`, "--star-size": `${i % 5 === 0 ? 3 : 1.5}px` } as React.CSSProperties} />)}<span className="star-moon" /></div><LunarNav /><main>{children}</main></div> }
export function SectionIntro({ eyebrow, title, children }: { eyebrow: string; title: React.ReactNode; children: React.ReactNode }) { return <section className="section-intro"><p className="eyebrow"><BookOpen size={14} /> {eyebrow}</p><h1>{title}</h1><p className="intro-copy">{children}</p></section> }
