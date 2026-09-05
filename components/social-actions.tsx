"use client"

import { useState } from "react"
import { Check, Copy, Heart, MessageCircle, Send, Share2, ThumbsDown, ThumbsUp } from "lucide-react"

export function SocialActions() {
  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)
  const [favorite, setFavorite] = useState(false)
  const [published, setPublished] = useState(false)
  const [copied, setCopied] = useState(false)

  const copy = async () => { await navigator.clipboard?.writeText(window.location.href); setCopied(true); setTimeout(() => setCopied(false), 1600) }
  return <div className="social-actions" aria-label="Actions du texte">
    <button className={liked ? "is-selected" : ""} onClick={() => { setLiked(!liked); setDisliked(false) }} aria-label="J'aime" aria-pressed={liked}><ThumbsUp size={16} /> <span>J&apos;aime</span></button>
    <button className={disliked ? "is-selected" : ""} onClick={() => { setDisliked(!disliked); setLiked(false) }} aria-label="Je n'aime pas" aria-pressed={disliked}><ThumbsDown size={16} /> <span>Pas pour moi</span></button>
    <button onClick={copy} aria-label="Partager"><Share2 size={16} /> <span>{copied ? "Copié" : "Partager"}</span></button>
    <button className={favorite ? "is-selected" : ""} onClick={() => setFavorite(!favorite)} aria-label="Ajouter aux favoris" aria-pressed={favorite}><Heart size={16} /> <span>Favori</span></button>
    <button className={published ? "is-selected" : ""} onClick={() => setPublished(!published)} aria-label="Publier" aria-pressed={published}><Send size={16} /> <span>{published ? "Publié" : "Publier"}</span></button>
  </div>
}

export function WritingCard({ children }: { children: React.ReactNode }) {
  return <article className="writing-card"><div className="card-rule" /><div className="card-content">{children}</div><SocialActions /></article>
}
