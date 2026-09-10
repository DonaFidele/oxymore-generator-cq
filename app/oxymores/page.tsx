"use client"

import { Check, LockKeyhole, Send, Sparkles } from "lucide-react"
import { useState } from "react"
import { PageShell } from "@/components/lunar-nav"

const generated = { title: "Tendre vertige", text: "Je tombe vers le haut,\navec la douceur précise d'une peur qui devient courage." }

export default function OxymoresPage() {
  const [account, setAccount] = useState(false)
  const [mode, setMode] = useState<"login" | "signup">("signup")
  const [authOpen, setAuthOpen] = useState(false)
  const [published, setPublished] = useState("")
  const [draft, setDraft] = useState({ title: "", text: "" })
  const [saved, setSaved] = useState<string[]>([])
  const openComposer = () => { if (!account) { setAuthOpen(true); return }; setDraft(generated) }
  const login = () => { setAccount(true); setAuthOpen(false); setDraft(generated) }
  const publish = (anonymous = false) => { const title = draft.title || "Sans titre"; localStorage.setItem("mesoxym-post", JSON.stringify({ title, text: draft.text || generated.text, author: anonymous ? "anonyme" : "toi" })); setPublished(anonymous ? "Envoyé anonymement à la communauté." : "Publié dans MesOxym.") }
  return <PageShell><main className="feature-page social-page"><section className="section-intro"><p className="eyebrow"><Sparkles size={14} /> Ton espace de création</p><h1>Écris ton<br /><em>oxymore.</em></h1><p className="intro-copy">Une première proposition de l&apos;IA, puis la liberté de modifier chaque mot avant de publier.</p></section>{!account ? <section className="signin-prompt"><div><LockKeyhole size={18} /><p>Connecte-toi pour générer et garder tes brouillons.</p></div><button className="primary-button" onClick={openComposer}>Se connecter</button></section> : <section className="generator-panel"><div className="panel-heading"><Sparkles size={16} /> Générateur IA ouvert</div><label className="composer-label">Deux forces contraires<input value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} placeholder="ex. calme / tempête" /></label><label className="composer-label">Ton texte<textarea value={draft.text} onChange={(event) => setDraft({ ...draft, text: event.target.value })} placeholder="Génère une première piste puis réécris-la..." /></label><div className="composer-actions"><button className="secondary-button" onClick={() => setDraft(generated)}><Sparkles size={16} /> Générer avec l&apos;IA</button><button className="secondary-button" onClick={() => { setSaved([...saved, draft.title || "Brouillon sans titre"]); setPublished("Brouillon gardé dans ton compte.") }}><Check size={16} /> Brouillon</button><button className="primary-button" onClick={() => publish(false)}><Send size={16} /> Publier</button><button className="secondary-button" onClick={() => publish(true)}>Publier anonymement</button></div>{saved.length > 0 && <p className="composer-note">{saved.length} brouillon{saved.length > 1 ? "s" : ""} dans ton compte.</p>}{published && <p className="action-toast">{published}</p>}</section>}{authOpen && <div className="tour-backdrop" role="dialog" aria-modal="true"><div className="tour-card auth-card"><button className="tour-close" onClick={() => setAuthOpen(false)} aria-label="Fermer">×</button><p className="eyebrow"><LockKeyhole size={14} /> Compte Lunogramme</p><h2>{mode === "signup" ? "Entre dans le fil." : "Ravi de te revoir."}</h2><p>Cette simulation te permet de créer, modifier et publier tes oxymores.</p><label className="composer-label">Email<input type="email" placeholder="toi@exemple.fr" /></label><label className="composer-label">Mot de passe<input type="password" placeholder="••••••••" /></label><button className="primary-button auth-submit" onClick={login}>{mode === "signup" ? "Créer mon compte" : "Se connecter"}</button><button className="auth-switch" onClick={() => setMode(mode === "signup" ? "login" : "signup")}>{mode === "signup" ? "J'ai déjà un compte" : "Créer un compte"}</button></div></div>}</main></PageShell>
}
