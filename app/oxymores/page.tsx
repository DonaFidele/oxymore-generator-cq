"use client"

import { Check, Eye, Languages, Send, Sparkles, X } from "lucide-react"
import { useEffect, useState } from "react"
import { PageShell } from "@/components/lunar-nav"

export default function OxymoresPage() {
  const [forces, setForces] = useState({ first: "", contrary: "" })
  const [draft, setDraft] = useState({ title: "", topics: [] as string[], text: "" })
  const [notice, setNotice] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [language, setLanguage] = useState<"fr" | "en">("fr")
  useEffect(() => { const saved = window.localStorage.getItem("oxymore-language"); if (saved === "en" || saved === "fr") setLanguage(saved) }, [])
  const chooseLanguage = (next: "fr" | "en") => { setLanguage(next); window.localStorage.setItem("oxymore-language", next) }
  const setNoticeAndClear = (message: string) => { setNotice(message); window.setTimeout(() => setNotice(""), 2600) }
  const saveToFeed = async () => { const response = await fetch("/api/poems", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title: draft.title || "Oxymore sans titre", topics: draft.topics, text: draft.text, author: "toi" }) }); if (!response.ok) throw new Error("La publication a échoué.") }
  const generatePoem = async () => {
    if (!forces.first.trim() || !forces.contrary.trim()) { setNoticeAndClear("Écris les deux forces de ton oxymore."); return }
    setIsGenerating(true); setNotice("")
    try {
      const response = await fetch("/api/generate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ mood: `${forces.first.trim()} et ${forces.contrary.trim()}`, moonPhase: "Full" }) })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || "La génération a échoué.")
      setDraft({ title: result.title, topics: result.topics, text: result.poem })
      localStorage.setItem("mesoxym-post", JSON.stringify({ title: result.title, topics: result.topics, text: result.poem, author: "toi" }))
      setNoticeAndClear("Oxymore ajouté à MesOxym.")
    } catch (error) { setNoticeAndClear(error instanceof Error ? error.message : "La génération a échoué.") } finally { setIsGenerating(false) }
  }
  const publish = async () => { try { await saveToFeed(); setNoticeAndClear("Oxymore publié dans MesOxym.") } catch (error) { setNoticeAndClear(error instanceof Error ? error.message : "La publication a échoué.") } }
  return <PageShell><main className="feature-page generator-page"><section className="generator-panel generator-panel-clean"><div className="panel-heading"><Sparkles size={16} /> Nouvel oxymore</div><div className="emotion-grid"><label>Première force<input value={forces.first} onChange={(event) => setForces({ ...forces, first: event.target.value })} placeholder="ex. tendresse" /></label><span className="plus">×</span><label>Force contraire<input value={forces.contrary} onChange={(event) => setForces({ ...forces, contrary: event.target.value })} placeholder="ex. distance" /></label></div><button className="primary-button generate-button" onClick={generatePoem} disabled={isGenerating}><Sparkles size={16} /> {isGenerating ? "Le poème prend forme..." : "Faire surgir le poème"} <span>→</span></button><div className="generated-editor" aria-live="polite"><div className="generated-heading"><span>Votre fragment</span><small>modifiable avant publication</small></div>{draft.title && <h2 className="generated-title">{draft.title}</h2>}{draft.topics.length > 0 && <div className="generated-topics">{draft.topics.map((topic) => <span key={topic}>{topic}</span>)}</div>}<label className="sr-only" htmlFor="generated-text">Votre oxymore généré</label><textarea id="generated-text" className="generated-textarea" value={draft.text} onChange={(event) => setDraft({ ...draft, text: event.target.value })} placeholder="Le poème apparaîtra ici, comme une pensée qui prend forme..." /></div><div className="composer-actions"><button className="secondary-button" onClick={() => setNoticeAndClear("Brouillon gardé.")}><Check size={16} /> Brouillon</button><button className="secondary-button" onClick={() => setPreviewOpen(true)}><Eye size={16} /> Aperçu</button><button className="primary-button" onClick={publish}><Send size={16} /> Publier</button></div>{notice && <p className="action-toast">{notice}</p>}{previewOpen && <div className="preview-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setPreviewOpen(false) }}><section className="preview-modal" role="dialog" aria-modal="true" aria-labelledby="preview-title"><button className="preview-close" onClick={() => setPreviewOpen(false)} aria-label="Fermer l'aperçu"><X size={18} /></button><div className="preview-label">Aperçu de publication</div><h2 id="preview-title">{draft.title || "Oxymore sans titre"}</h2>{draft.topics.length > 0 && <div className="generated-topics">{draft.topics.map((topic) => <span key={topic}>{topic}</span>)}</div>}<p className="preview-poem">{draft.text || "Le poème apparaîtra ici après la génération."}</p></section></div>}<div className="generator-footer"><div className="language-wrap"><button className="header-moon" aria-label="Choisir la langue"><Languages size={17} /></button><div className="language-menu" role="group" aria-label="Language selector"><button className={language === "fr" ? "is-selected" : ""} onClick={() => chooseLanguage("fr")}>FR</button><button className={language === "en" ? "is-selected" : ""} onClick={() => chooseLanguage("en")}>EN</button></div></div></div></section></main></PageShell>
}
