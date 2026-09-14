"use client"

import { useState } from "react"
import { ArrowRight, Sparkles } from "lucide-react"
import { PageShell, SectionIntro } from "@/components/lunar-nav"
import { WritingCard } from "@/components/social-actions"

type Generation = {
  title: string
  oxymores: string[]
  poem: string
}

export default function OxymoresPage() {
  const [first, setFirst] = useState("")
  const [second, setSecond] = useState("")
  const [generation, setGeneration] = useState<Generation | null>(null)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  async function generate() {
    setIsLoading(true)
    setError("")
    setGeneration(null)

    try {
      const response = await fetch("/api/oxymores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ first, second }),
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "La génération a échoué.")
      }

      setGeneration(data as Generation)
    } catch (generationError) {
      setError(generationError instanceof Error ? generationError.message : "La génération a échoué.")
    } finally {
      setIsLoading(false)
    }
  }

  return <PageShell><div className="feature-page" data-tour="oxymores"><SectionIntro eyebrow="Le laboratoire des contradictions" title={<>Fais naître une<br /><em>lumière contraire.</em></>}>Associe deux émotions, deux images ou deux mots qui n&apos;auraient jamais dû se rencontrer. L&apos;espace entre eux devient poésie.</SectionIntro><div className="generator-panel"><div className="panel-heading"><Sparkles size={18} /><span>Nouvel oxymore</span></div><div className="emotion-grid"><label>Première force<input value={first} onChange={e => setFirst(e.target.value)} placeholder="ex. tendresse" maxLength={120} /></label><span className="plus">×</span><label>Force contraire<input value={second} onChange={e => setSecond(e.target.value)} placeholder="ex. distance" maxLength={120} /></label></div><button className="primary-button" onClick={generate} disabled={!first.trim() || !second.trim() || isLoading}>{isLoading ? "Le poème prend forme..." : "Faire surgir le poème"} <ArrowRight size={16} /></button>{error && <p className="generation-error" role="alert">{error}</p>}</div>{generation && <WritingCard><p className="eyebrow">Ton fragment</p><h2>{generation.title}</h2><ul className="oxymore-list" aria-label="Images nées de cet oxymore">{generation.oxymores.map((oxymore) => <li key={oxymore}>{oxymore}</li>)}</ul><p className="poem-text">{generation.poem}</p></WritingCard>}</div></PageShell>
}
