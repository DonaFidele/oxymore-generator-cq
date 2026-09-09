"use client"

import { useMemo, useState } from "react"
import { CloudRain, Droplets, Moon, Sparkles, Sun, Wind } from "lucide-react"
import { PageShell, SectionIntro } from "@/components/lunar-nav"
import { VoiceLunaire } from "@/components/voice-lunaire"

const phases = ["Nouvelle lune", "Premier quartier", "Pleine lune", "Dernier quartier"]
const weathers = [{ label: "Pluie douce", icon: CloudRain }, { label: "Brume", icon: Wind }, { label: "Clair", icon: Sun }]

export default function EmotionnelPage() {
  const [mood, setMood] = useState("")
  const [weather, setWeather] = useState("Pluie douce")
  const [phase, setPhase] = useState("Pleine lune")
  const [fragments, setFragments] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const date = useMemo(() => new Intl.DateTimeFormat("fr-FR", { dateStyle: "full" }).format(new Date()), [])
  async function generate() { setLoading(true); try { const response = await fetch("/api/generate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ mood: `${mood}. Météo: ${weather}. Phase: ${phase}`, moonPhase: phase }) }); const data = await response.json(); setFragments([data.poem, data.oxymore, data.prompt].filter(Boolean)) } finally { setLoading(false) } }
  return <PageShell><div className="feature-page emotion-page"><SectionIntro eyebrow={`Journal sensible · ${date}`} title={<>Lunogramme<br /><em>émotionnel.</em></>}>Décris la couleur de ton jour. La lune, la météo et ton humeur deviennent trois fragments à garder près de toi.</SectionIntro><section className="emotion-dashboard"><div className="moon-panel emotion-form"><div className="panel-heading"><Moon size={17} /> Les signes du jour</div><label className="mood-entry">Ton humeur<textarea value={mood} onChange={event => setMood(event.target.value)} placeholder="Je me sens..." rows={4} /></label><div className="emotion-choice"><span className="tool-label">Météo intérieure</span><div className="weather-options">{weathers.map(({ label, icon: Icon }) => <button key={label} className={weather === label ? "is-active" : ""} onClick={() => setWeather(label)}><Icon size={16} />{label}</button>)}</div></div><label className="mood-entry">Phase<select value={phase} onChange={event => setPhase(event.target.value)}>{phases.map(item => <option key={item}>{item}</option>)}</select></label><button className="primary-button" onClick={generate} disabled={!mood || loading}><Sparkles size={16} />{loading ? "La lune compose..." : "Révéler mes fragments"}</button></div><div className="emotion-results">{fragments.length === 0 ? <div className="empty-orbit"><Droplets size={28} /><p>Trois éclats apparaîtront ici.<br />Ils attendent ton premier mot.</p></div> : fragments.map((fragment, index) => <article className="fragment-card" key={`${fragment}-${index}`}><span className="eyebrow">Fragment {index + 1}</span><p>{fragment}</p>{index === 0 && <VoiceLunaire text={fragment} />}</article>)}</div></section></div></PageShell>
}
