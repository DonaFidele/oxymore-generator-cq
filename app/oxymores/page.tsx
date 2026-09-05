"use client"

import { useState } from "react"
import { ArrowRight, Sparkles } from "lucide-react"
import { PageShell, SectionIntro } from "@/components/lunar-nav"
import { WritingCard } from "@/components/social-actions"
import { CreationArchive, saveCreation } from "@/components/creation-archive"

export default function OxymoresPage() {
  const [first, setFirst] = useState(""); const [second, setSecond] = useState(""); const [generated, setGenerated] = useState(false); const [archiveVersion, setArchiveVersion] = useState(0)
  const create = () => { const title = `${first} × ${second}`; saveCreation("lunogramme-oxymores", { title, text: `Dans le silence où ${first} rencontre ${second}, une porte s’ouvre sans bruit. Je reste là, entre l’ombre et l’appel, à apprendre la forme de ce qui tremble.` }); setGenerated(true); setFirst(""); setSecond(""); setArchiveVersion(version => version + 1) }
  return <PageShell><div className="feature-page" data-tour="oxymores"><SectionIntro eyebrow="Le laboratoire des contradictions" title={<>Fais naître une<br /><em>lumière contraire.</em></>}>Associe deux émotions, deux images ou deux mots qui n&apos;auraient jamais dû se rencontrer. L&apos;espace entre eux devient poésie.</SectionIntro><div className="generator-panel"><div className="panel-heading"><Sparkles size={18} /><span>Nouvel oxymore</span></div><div className="emotion-grid"><label>Première force<input value={first} onChange={e => setFirst(e.target.value)} placeholder="ex. tendresse" /></label><span className="plus">×</span><label>Force contraire<input value={second} onChange={e => setSecond(e.target.value)} placeholder="ex. distance" /></label></div><button className="primary-button" onClick={create} disabled={!first || !second}>Faire surgir le poème <ArrowRight size={16} /></button></div>{generated && <WritingCard><p className="eyebrow">Ton fragment est gardé</p><h2>Une surprise t&apos;attend en bas</h2><p className="poem-text">Les champs sont libres pour une nouvelle rencontre.</p></WritingCard>}<div key={archiveVersion}><CreationArchive storageKey="lunogramme-oxymores" label="Archives des oxymores" emptyText="Tes poèmes apparaîtront ici, fermés comme des lettres à ouvrir." /></div></div></PageShell>
}
