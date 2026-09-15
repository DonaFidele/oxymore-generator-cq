"use client"

import { ChevronLeft, ChevronRight, Copy, Heart, MessageCircle, Share2, Sparkles, X } from "lucide-react"
import { useState } from "react"

export const examples = [
  { title: "Douce violence", text: "Je te cherche dans le silence,\navec le bruit de tout ce que je n'ai pas dit.", author: "anonyme" },
  { title: "Lumière obscure", text: "Une clarté profonde\nqui ne demande pas à être comprise.", author: "Nora" },
  { title: "Présence absente", text: "Tu n'es plus là,\nmais chaque pièce garde ta forme.", author: "anonyme" },
]
const networks = [{ name: "TikTok", mark: "♪", url: "https://www.tiktok.com/" }, { name: "Instagram", mark: "◎", url: "https://www.instagram.com/" }, { name: "Facebook", mark: "f", url: "https://www.facebook.com/sharer/sharer.php" }]

export function OxymoreFeed({ onGenerate }: { onGenerate: () => void }) {
  const [index, setIndex] = useState(0)
  const [activeDirection, setActiveDirection] = useState<1 | -1 | null>(null)
  const [liked, setLiked] = useState(false)
  const [likedComments, setLikedComments] = useState<number[]>([])
  const [commentsOpen, setCommentsOpen] = useState(false)
  const [shareOpen, setShareOpen] = useState(false)
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState(["Une contradiction qui reste longtemps.", "La lumière a parfois besoin de l'ombre."])
  const item = examples[index]
  const move = (direction: 1 | -1) => { setIndex((current) => (current + direction + examples.length) % examples.length); setActiveDirection(direction); setLiked(false); setLikedComments([]); setCommentsOpen(false); setShareOpen(false) }
  const copy = async () => { await navigator.clipboard?.writeText(`${item.title}\n${item.text}`); setShareOpen(false) }
  const submitComment = () => { if (!comment.trim()) return; setComments((current) => [...current, comment.trim()]); setComment("") }
  const share = (network: typeof networks[number]) => { if (network.name === "Facebook") window.open(`${network.url}?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(item.text)}`, "_blank", "noopener,noreferrer"); else window.open(network.url, "_blank", "noopener,noreferrer"); setShareOpen(false) }
  const toggleCommentLike = (commentIndex: number) => setLikedComments((current) => current.includes(commentIndex) ? current.filter((entry) => entry !== commentIndex) : [...current, commentIndex])
  return <section className="public-feed" aria-label="Exemples d'oxymores"><div className="feed-intro"><button className="primary-button" onClick={onGenerate}>Publiez vos propres oxymores</button></div><div className="feed-stage"><div className="feed-card"><div className="feed-card-top"><span>#{String(index + 1).padStart(2, "0")} / 03</span><span>{item.author}</span></div><div className="feed-poem"><h2>{item.title}</h2><p>{item.text}</p></div><div className="feed-actions"><button className={liked ? "is-selected" : ""} onClick={() => setLiked(!liked)} aria-label="J'aime" title="J'aime"><Heart size={21} fill={liked ? "currentColor" : "none"} /></button><button className={commentsOpen ? "is-selected" : ""} onClick={() => setCommentsOpen(!commentsOpen)} aria-label="Commentaires" title="Commentaires"><MessageCircle size={21} /><span>{comments.length}</span></button><div className="share-wrap"><button className={shareOpen ? "is-selected" : ""} onClick={() => setShareOpen(!shareOpen)} aria-label="Partager" title="Partager"><Share2 size={21} /></button>{shareOpen && <div className="share-chooser">{networks.map((network) => <button key={network.name} onClick={() => share(network)}><span className="network-mark">{network.mark}</span>{network.name}</button>)}<button onClick={copy}><Copy size={14} />Copier</button></div>}</div></div>{commentsOpen && <div className="tiktok-comments"><div className="comments-heading"><span>{comments.length} commentaires</span><button onClick={() => setCommentsOpen(false)} aria-label="Fermer"><X size={17} /></button></div><div className="feed-comment-list">{comments.map((entry, commentIndex) => <div className="tiktok-comment" key={`${entry}-${commentIndex}`}><span className="comment-avatar">{commentIndex % 2 ? "N" : "A"}</span><div><strong>{commentIndex % 2 ? "nuitclaire" : "anonyme"}</strong><p>{entry}</p><small>Répondre</small></div><button className={likedComments.includes(commentIndex) ? "is-selected" : ""} onClick={() => toggleCommentLike(commentIndex)} aria-label="Aimer le commentaire"><Heart size={15} fill={likedComments.includes(commentIndex) ? "currentColor" : "none"} /></button></div>)}</div><form className="comment-form" onSubmit={(event) => { event.preventDefault(); submitComment() }}><input value={comment} onChange={(event) => setComment(event.target.value)} placeholder="Ajouter un commentaire..." aria-label="Ajouter un commentaire" /><button aria-label="Envoyer"><Sparkles size={16} /></button></form></div>}</div><div className="feed-navigation"><button className={activeDirection === -1 ? "is-active" : ""} onClick={() => move(-1)} aria-label="Précédent" title="Précédent"><ChevronLeft size={22} /></button><button className={activeDirection === 1 ? "is-active" : ""} onClick={() => move(1)} aria-label="Suivant" title="Suivant"><ChevronRight size={22} /></button></div></div></section>
}
