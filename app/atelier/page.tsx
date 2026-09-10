"use client"

import { useState } from "react"
import { Image, Palette, PenLine, Share2, Sparkles, WandSparkles } from "lucide-react"
import { PageShell, SectionIntro } from "@/components/lunar-nav"

const palettes = ["#d6c7ff", "#8f7aea", "#d9b98d", "#8fb5a6", "#e88d9a"]
const backgrounds = ["velvet", "paper", "night", "mist"]

export default function AtelierPage() {
  const [text, setText] = useState("")
  const [title, setTitle] = useState("")
  const [color, setColor] = useState(palettes[0])
  const [background, setBackground] = useState(backgrounds[0])
  const [generated, setGenerated] = useState(false)

  const generate = () => {
    setTitle("Une lumière à partager")
    setText("Même dans la nuit, quelque chose en nous continue de dessiner le chemin.")
    setGenerated(true)
  }

  return <PageShell><div className="feature-page atelier-page" data-tour="atelier"><SectionIntro eyebrow="La chambre de créativité" title={<>Donne une forme à<br /><em>ce qui veut circuler.</em></>}>Compose une citation, une intuition ou une petite inspiration. Décore-la comme une carte nocturne, puis partage-la avec le monde.</SectionIntro><div className="atelier-layout"><section className="atelier-tools" aria-label="Outils de création"><div className="panel-heading"><Palette size={17} /> Composer</div><label className="mood-entry">Titre<input className="atelier-input" value={title} onChange={e => setTitle(e.target.value)} placeholder="Un titre bref" /></label><label className="mood-entry">Ton texte<textarea value={text} onChange={e => setText(e.target.value)} rows={7} placeholder="Écris une phrase, une citation, une petite lumière..." /></label><div className="atelier-tool-block"><p className="eyebrow">Couleur d’accent</p><div className="swatches">{palettes.map(item => <button key={item} aria-label={`Choisir ${item}`} className={`swatch ${color === item ? "is-selected" : ""}`} style={{ background: item }} onClick={() => setColor(item)} />)}</div></div><div className="atelier-tool-block"><p className="eyebrow">Fond</p><div className="backgrounds">{backgrounds.map(item => <button key={item} className={`background-choice background-${item} ${background === item ? "is-selected" : ""}`} onClick={() => setBackground(item)}>{item}</button>)}</div></div><div className="atelier-buttons"><button className="primary-button" onClick={generate}><WandSparkles size={16} /> Demander à l&apos;IA</button><button className="secondary-button" onClick={() => setGenerated(true)}><PenLine size={16} /> Prévisualiser</button></div></section><section className={`post-preview post-${background}`} style={{ "--post-accent": color } as React.CSSProperties} aria-label="Prévisualisation du post"><div className="post-stars"><Sparkles size={16} /><span>Fragment nocturne</span></div><div className="post-copy"><p className="post-title">{title || "Ton titre apparaîtra ici"}</p><p className="post-text">{text || "Ta phrase attend encore sa constellation."}</p></div><div className="post-footer"><span>Lunogramme · Atelier</span><Image size={16} /></div></section></div>{generated && <div className="share-strip"><span><Sparkles size={15} /> Ton post est prêt à circuler.</span><button className="primary-button" onClick={() => navigator.share?.({ title: title || "Fragment nocturne", text })}><Share2 size={15} /> Partager</button></div>}</div></PageShell>
}
