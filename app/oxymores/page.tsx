"use client"

import { Check, Languages, Send, Sparkles } from "lucide-react"
import { useEffect, useState } from "react"
import { PageShell } from "@/components/lunar-nav"

const generated = { title: "Tendre vertige", text: "Je tombe vers le haut,\navec la douceur précise d'une peur qui devient courage." }

export default function OxymoresPage() {
  const [draft, setDraft] = useState({ title: "", text: "" })
  const [publishOpen, setPublishOpen] = useState(false)
  const [notice, setNotice] = useState("")
  const [language, setLanguage] = useState<"fr" | "en">("fr")
  useEffect(() => { const saved = window.localStorage.getItem("oxymore-language"); if (saved === "en" || saved === "fr") setLanguage(saved) }, [])
  const chooseLanguage = (next: "fr" | "en") => { setLanguage(next); window.localStorage.setItem("oxymore-language", next) }
  const setNoticeAndClear = (message: string) => { setNotice(message); window.setTimeout(() => setNotice(""), 2600) }
  const saveToFeed = (author = "toi") => { localStorage.setItem("mesoxym-post", JSON.stringify({ title: draft.title || generated.title, text: draft.text || generated.text, author })); }
  const publish = (anonymous: boolean) => { saveToFeed(anonymous ? "anonyme" : "toi"); setPublishOpen(false); setNoticeAndClear(anonymous ? "Oxymore publié anonymement." : "Oxymore publié dans MesOxym.") }
  return <PageShell><main className="feature-page generator-page"><section className="generator-panel generator-panel-clean"><div className="panel-heading"><Sparkles size={16} /> Nouvel oxymore</div><div className="emotion-grid"><label>Première force<input value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} placeholder="ex. tendresse" /></label><span className="plus">×</span><label>Force contraire<input value={draft.text} onChange={(event) => setDraft({ ...draft, text: event.target.value })} placeholder="ex. distance" /></label></div><button className="primary-button generate-button" onClick={() => { setDraft(generated); saveToFeed("toi"); setNoticeAndClear("Oxymore ajouté à MesOxym.") }}><Sparkles size={16} /> Faire surgir le poème <span>→</span></button><div className="generated-editor" aria-live="polite"><div className="generated-heading"><span>Votre fragment</span><small>modifiable avant publication</small></div><label className="sr-only" htmlFor="generated-text">Votre oxymore généré</label><textarea id="generated-text" className="generated-textarea" value={draft.text} onChange={(event) => setDraft({ ...draft, text: event.target.value })} placeholder="Le poème apparaîtra ici, comme une pensée qui prend forme..." /></div><div className="composer-actions"><button className="secondary-button" onClick={() => setNoticeAndClear("Brouillon gardé dans ton compte.")}><Check size={16} /> Brouillon</button><div className="publish-wrap"><button className="primary-button" onClick={() => setPublishOpen(!publishOpen)}><Send size={16} /> Publier</button>{publishOpen && <div className="publish-chooser"><button onClick={() => publish(false)}>Publier</button><button onClick={() => publish(true)}>Publier anonymement</button></div>}</div></div>{notice && <p className="action-toast">{notice}</p>}<div className="generator-footer"><div className="language-wrap"><button className="header-moon" aria-label="Choisir la langue"><Languages size={17} /></button><div className="language-menu" role="group" aria-label="Language selector"><button className={language === "fr" ? "is-selected" : ""} onClick={() => chooseLanguage("fr")}>FR</button><button className={language === "en" ? "is-selected" : ""} onClick={() => chooseLanguage("en")}>EN</button></div></div></div></section></main></PageShell>
}
