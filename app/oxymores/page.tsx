"use client"

import { useState } from "react"
import { ArrowRight, Sparkles } from "lucide-react"
import { PageShell, SectionIntro } from "@/components/lunar-nav"
import { WritingCard } from "@/components/social-actions"

export default function OxymoresPage() {
  const [first, setFirst] = useState(""); const [second, setSecond] = useState(""); const [generated, setGenerated] = useState(false)
  return <PageShell><div className="feature-page" data-tour="oxymores"><SectionIntro eyebrow="Le laboratoire des contradictions" title={<>Fais naître une<br /><em>lumière contraire.</em></>}>Associe deux émotions, deux images ou deux mots qui n&apos;auraient jamais dû se rencontrer. L&apos;espace entre eux devient poésie.</SectionIntro><div className="generator-panel"><div className="panel-heading"><Sparkles size={18} /><span>Nouvel oxymore</span></div><div className="emotion-grid"><label>Première force<input value={first} onChange={e => setFirst(e.target.value)} placeholder="ex. tendresse" /></label><span className="plus">×</span><label>Force contraire<input value={second} onChange={e => setSecond(e.target.value)} placeholder="ex. distance" /></label></div><button className="primary-button" onClick={() => setGenerated(true)} disabled={!first || !second}>Faire surgir le poème <ArrowRight size={16} /></button></div>{generated && <WritingCard><p className="eyebrow">Ton fragment</p><h2>{first} <em>à l&apos;endroit de</em> {second}</h2><p className="poem-text">Dans le silence où {first} rencontre {second},<br />une porte s&apos;ouvre sans bruit.<br />Je reste là, entre l&apos;ombre et l&apos;appel,<br />à apprendre la forme de ce qui tremble.</p></WritingCard>}</div></PageShell>
}
