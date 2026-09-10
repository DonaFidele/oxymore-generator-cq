"use client"

import { Heart, MessageCircle, Share2, Sparkles } from "lucide-react"
import { useState } from "react"

const examples = [
  { title: "Douce violence", text: "Je te cherche dans le silence,\navec le bruit de tout ce que je n'ai pas dit.", author: "anonyme" },
  { title: "Lumière obscure", text: "Une clarté profonde\nqui ne demande pas à être comprise.", author: "Nora" },
  { title: "Présence absente", text: "Tu n'es plus là,\nmais chaque pièce garde ta forme.", author: "anonyme" },
]

export function OxymoreFeed({ onGenerate }: { onGenerate: () => void }) {
  const [index, setIndex] = useState(0)
  const [liked, setLiked] = useState(false)
  const item = examples[index]
  const next = () => { setIndex((current) => (current + 1) % examples.length); setLiked(false) }
  return <section className="public-feed" aria-label="Exemples d'oxymores">
    <div className="feed-intro"><p className="eyebrow"><Sparkles size={14} /> Le fil des contradictions</p><h1>Des mots qui se contredisent.<br /><em>Des émotions qui s&apos;accordent.</em></h1><p>Fais défiler trois fragments, puis publie le tien.</p></div>
    <div className="feed-stage" onWheel={(event) => { if (event.deltaY > 20) next() }}>
      <div className="feed-card"><div className="feed-card-top"><span>#{String(index + 1).padStart(2, "0")} / 03</span><span>{item.author}</span></div><div className="feed-poem"><h2>{item.title}</h2><p>{item.text}</p></div><div className="feed-actions"><button className={liked ? "is-selected" : ""} onClick={() => setLiked(!liked)} aria-label="J'aime"><Heart size={21} fill={liked ? "currentColor" : "none"} /></button><button aria-label="Commenter"><MessageCircle size={21} /></button><button aria-label="Partager" onClick={() => navigator.clipboard?.writeText(`${item.title}\n${item.text}`)}><Share2 size={21} /></button></div></div><button className="feed-next" onClick={next}>Faire défiler <span>↓</span></button></div>
    <button className="primary-button feed-cta" onClick={onGenerate}>Publiez vos propres oxymores</button>
  </section>
}

export { examples }
