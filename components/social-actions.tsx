"use client"

import { useState } from "react"
import { Heart, Send, Share2, ThumbsDown, ThumbsUp } from "lucide-react"

export function SocialActions({ text = "", title = "Lunogramme" }: { text?: string; title?: string }) {
  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)
  const [favorite, setFavorite] = useState(false)
  const [published, setPublished] = useState(false)
  const [shared, setShared] = useState(false)

  const share = async () => {
    const payload = { title, text: text || title, url: window.location.href }
    if (navigator.share) await navigator.share(payload).catch(() => undefined)
    else { await navigator.clipboard?.writeText(`${title}\n${text}\n${window.location.href}`); setShared(true); window.setTimeout(() => setShared(false), 1800) }
  }
  const publish = () => { setPublished(true); window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, "_blank", "noopener,noreferrer") }
  return <div className="social-actions" aria-label="Actions du texte">
    <button className={liked ? "is-selected" : ""} onClick={() => { setLiked(!liked); setDisliked(false) }} aria-label="J'aime" aria-pressed={liked}><ThumbsUp size={16} /><span>J&apos;aime</span></button>
    <button className={disliked ? "is-selected" : ""} onClick={() => { setDisliked(!disliked); setLiked(false) }} aria-label="Je n'aime pas" aria-pressed={disliked}><ThumbsDown size={16} /><span>Pas pour moi</span></button>
    <button onClick={share} aria-label="Partager"><Share2 size={16} /><span>{shared ? "Lien copié" : "Partager"}</span></button>
    <button className={favorite ? "is-selected" : ""} onClick={() => setFavorite(!favorite)} aria-label="Ajouter aux favoris" aria-pressed={favorite}><Heart size={16} /><span>Favori</span></button>
    <button className={published ? "is-selected" : ""} onClick={publish} aria-label="Publier"><Send size={16} /><span>{published ? "Publié" : "Publier"}</span></button>
  </div>
}

export function WritingCard({ children, text, title }: { children: React.ReactNode; text?: string; title?: string }) {
  return <article className="writing-card"><div className="card-rule" /><div className="card-content">{children}</div><SocialActions text={text} title={title} /></article>
}
