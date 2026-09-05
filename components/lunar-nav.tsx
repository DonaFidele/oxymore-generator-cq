"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, Home, Moon, Palette, Sparkles } from "lucide-react"

const items = [
  { href: "/", label: "Accueil", icon: Home },
  { href: "/oxymores", label: "Oxymores", icon: Sparkles },
  { href: "/lunogramme", label: "Lunogramme", icon: Moon },
  { href: "/atelier", label: "Atelier", icon: Palette },
]

export function LunarNav() {
  const pathname = usePathname()
  return (
    <header className="site-header">
      <Link href="/" className="brand-mark" aria-label="Lunogramme, accueil">
        <span className="brand-orbit"><Moon size={17} strokeWidth={1.5} /></span>
        <span>Lunogramme</span>
      </Link>
      <nav className="lunar-nav" aria-label="Navigation principale">
        {items.map(({ href, label, icon: Icon }) => {
          const active = href === "/" ? pathname === href : pathname.startsWith(href)
          return <Link key={href} href={href} className={`nav-orbit ${active ? "is-active" : ""}`} aria-current={active ? "page" : undefined}>
            <span className="nav-orbit-icon"><Icon size={18} strokeWidth={1.5} /></span>
            <span>{label}</span>
          </Link>
        })}
      </nav>
      <div className="header-moon" aria-hidden="true"><Moon size={19} /></div>
    </header>
  )
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return <div className="app-shell"><div className="starfield" aria-hidden="true">{Array.from({ length: 34 }, (_, i) => <i key={i} style={{ "--star-x": `${(i * 29) % 100}%`, "--star-y": `${(i * 47) % 100}%`, "--star-delay": `${(i % 7) * 0.45}s`, "--star-size": `${i % 5 === 0 ? 3 : 1.5}px` } as React.CSSProperties} />)}<span className="star-moon" /></div><LunarNav /><main>{children}</main></div>
}

export function SectionIntro({ eyebrow, title, children }: { eyebrow: string; title: React.ReactNode; children: React.ReactNode }) {
  return <section className="section-intro"><p className="eyebrow"><BookOpen size={14} /> {eyebrow}</p><h1>{title}</h1><p className="intro-copy">{children}</p></section>
}
