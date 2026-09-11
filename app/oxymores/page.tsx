"use client"

import { Check, Send, Sparkles } from "lucide-react"
import { useState } from "react"
import { PageShell } from "@/components/lunar-nav"

const generated = { title: "Tendre vertige", text: "Je tombe vers le haut,\navec la douceur précise d'une peur qui devient courage." }

export default function OxymoresPage() {
  const [draft, setDraft] = useState({ title: "", text: "" })
  const [publishOpen, setPublishOpen] = useState(false)
  const [notice, setNotice] = useState("")
  const setNoticeAndClear = (message: string) => { setNotice(message); window.setTimeout(() => setNotice(""), 2600) }
  const publish = (anonymous: boolean) => { localStorage.setItem("mesoxym-post", JSON.stringify({ title: draft.title || generated.title, text: draft.text || generated.text, author: anonymous ? "anonyme" : "toi" })); setPublishOpen(false); setNoticeAndClear(anonymous ? "Oxymore publié anonymement." : "Oxymore publié dans MesOxym.") }
  return <PageShell><main className="feature-page generator-page"><section className="generator-panel generator-panel-clean"><div className="panel-heading"><Sparkles size={16} /> Nouvel oxymore</div><div className="emotion-grid"><label>Première force<input value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} placeholder="ex. tendresse" /></label><span className="plus">×</span><label>Force contraire<input value={draft.text} onChange={(event) => setDraft({ ...draft, text: event.target.value })} placeholder="ex. distance" /></label></div><button className="primary-button generate-button" onClick={() => setDraft(generated)}><Sparkles size={16} /> Faire surgir le poème <span>→</span></button><div className="generated-editor"><label>Ton oxymore<textarea value={draft.text} onChange={(event) => setDraft({ ...draft, text: event.target.value })} placeholder="Le texte généré apparaîtra ici..." /></label><div className="composer-actions"><button className="primary-button" onClick={() => setDraft(generated)}><Sparkles size={16} /> Générer</button><button className="secondary-button" onClick={() => setNoticeAndClear("Brouillon gardé dans ton compte.")}><Check size={16} /> Brouillon</button><div className="publish-wrap"><button className="primary-button" onClick={() => setPublishOpen(!publishOpen)}><Send size={16} /> Publier</button>{publishOpen && <div className="publish-chooser"><button onClick={() => publish(false)}>Publier</button><button onClick={() => publish(true)}>Publier anonymement</button></div>}</div></div></div>{notice && <p className="action-toast">{notice}</p>}</section></main></PageShell>
}
