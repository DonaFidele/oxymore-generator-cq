"use client"

import { useEffect, useState } from "react"
import { ChevronDown, Clock3, LockKeyhole, Sparkles } from "lucide-react"

type ArchiveItem = { id: string; title: string; text: string; createdAt: string }

export function CreationArchive({ storageKey, label, emptyText }: { storageKey: string; label: string; emptyText: string }) {
  const [items, setItems] = useState<ArchiveItem[]>([])
  const [openId, setOpenId] = useState<string | null>(null)

  useEffect(() => {
    try { setItems(JSON.parse(localStorage.getItem(storageKey) || "[]")) } catch { setItems([]) }
  }, [storageKey])

  if (!items.length) return <section className="archive-empty"><Sparkles size={16} /><span>{emptyText}</span></section>
  return <section className="creation-archive"><div className="archive-heading"><span className="eyebrow"><Clock3 size={14} /> {label}</span><span>{items.length} fragment{items.length > 1 ? "s" : ""}</span></div><div className="archive-list">{items.map(item => <article key={item.id} className={`archive-item ${openId === item.id ? "is-open" : ""}`}><button className="archive-trigger" onClick={() => setOpenId(openId === item.id ? null : item.id)} aria-expanded={openId === item.id}><span><strong>{item.title}</strong><small>{new Date(item.createdAt).toLocaleString("fr-FR", { dateStyle: "long", timeStyle: "short" })}</small></span><span className="archive-open"><LockKeyhole size={14} /> {openId === item.id ? "Refermer" : "Ouvrir"}<ChevronDown size={15} /></span></button>{openId === item.id && <div className="archive-reveal"><p>{item.text}</p></div>}</article>)}</div></section>
}

export function saveCreation(storageKey: string, item: Omit<ArchiveItem, "id" | "createdAt">) {
  const next: ArchiveItem = { ...item, id: crypto.randomUUID(), createdAt: new Date().toISOString() }
  const items = JSON.parse(localStorage.getItem(storageKey) || "[]") as ArchiveItem[]
  localStorage.setItem(storageKey, JSON.stringify([next, ...items].slice(0, 24)))
}
