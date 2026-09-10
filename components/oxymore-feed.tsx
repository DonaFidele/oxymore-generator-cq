"use client"

import { ChevronDown, ChevronUp, Copy, Heart, MessageCircle, Share2, Sparkles, X } from "lucide-react"
import { useState } from "react"

export const examples = [
  { title: "Douce violence", text: "Je te cherche dans le silence,\navec le bruit de tout ce que je n'ai pas dit.", author: "anonyme" },
  { title: "Lumière obscure", text: "Une clarté profonde\nqui ne demande pas à être comprise.", author: "Nora" },
  { title: "Présence absente", text: "Tu n'es plus là,\nmais chaque pièce garde ta forme.", author: "anonyme" },
]

export function OxymoreFeed({ onGenerate }: { onGenerate: () => void }) {
  const [index, setIndex] = useState(0)
  const [liked, setLiked] = useState(false)
  const [commentsOpen, setCommentsOpen] = useState(false)
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState(["Une contradiction qui reste longtemps.", "La lumière a parfois besoin de l'ombre."])
  const [shared, setShared] = useState(false)
  const item = examples[index]
  const move = (direction: 1 | -1) => { setIndex((current) => (current + direction + examples.length) % examples.length); setLiked(false); setShared(false); setCommentsOpen(false) }
  const copy = async () => { await navigator.clipboard?.writeText(`${item.title}\n${item.text}`); setShared(true); setTimeout(() => setShared(false), 1600) }
  const submitComment = () => { if (!comment.trim()) return; setComments((current) => [...current, comment.trim()]); setComment("") }
  return <section className="public-feed" aria-label="Exemples d'oxymores"><div className="feed-intro"><p className="eyebrow"><Sparkles size={14} /> Le fil des contradictions</p><h1>Des mots qui se contredisent.<br /><em>Des émotions qui s&apos;accordent.</em></h1><p>Fais défiler les fragments comme un fil vivant, puis publie le tien.</p></div><div className="feed-stage"><div className="feed-card"><div className="feed-card-top"><span>#{String(index + 1).padStart(2, "0")} / 03</span><span>{item.author}</span></div><div className="feed-poem"><h2>{item.title}</h2><p>{item.text}</p></div><div className="feed-actions"><button className={liked ? "is-selected" : ""} onClick={() => setLiked(!liked)} aria-label="J'aime" title="J'aime"><Heart size={21} fill={liked ? "currentColor" : "none"} /></button><button className={commentsOpen ? "is-selected" : ""} onClick={() => setCommentsOpen(!commentsOpen)} aria-label="Commentaires" title="Commentaires"><MessageCircle size={21} /><span>{comments.length}</span></button><button onClick={copy} aria-label="Partager" title="Partager"><Share2 size={21} /></button><button onClick={copy} aria-label="Copier" title="Copier"><Copy size={19} /></button></div>{shared && <p className="action-toast">Fragment copié.</p>}{commentsOpen && <div className="feed-comments"><div className="feed-comment-list">{comments.map((entry) => <p key={entry}>{entry}</p>)}</div><div className="comment-row"><input value={comment} onChange={(event) => setComment(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.nativeEvent.isComposing) submitComment() }} placeholder="Écrire un commentaire..." /><button className="secondary-button" onClick={submitComment}>Publier</button></div></div>}</div><div className="feed-navigation"><button onClick={() => move(-1)} aria-label="Oxymore précédent" title="Précédent"><ChevronUp size={18} /></button><button className="feed-next" onClick={() => move(1)}>Suivant <ChevronDown size={16} /></button></div></div><button className="primary-button feed-cta" onClick={onGenerate}>Publiez vos propres oxymores</button></section>
}
