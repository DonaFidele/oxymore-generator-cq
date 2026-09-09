"use client"

import { useState } from "react"
import { Globe2, Heart, Send, Share2, ThumbsDown, ThumbsUp, X } from "lucide-react"

export function SocialActions({ text = "", title = "Lunogramme" }: { text?: string; title?: string }) {
  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)
  const [favorite, setFavorite] = useState(false)
  const [published, setPublished] = useState(false)
  const [shared, setShared] = useState(false)
  const [chooser, setChooser] = useState(false)
  const payload = { title, text: text || title, url: typeof window !== "undefined" ? window.location.href : "" }
  const share = async () => { if (navigator.share) await navigator.share(payload).catch(() => undefined); else { await navigator.clipboard?.writeText(`${title}\n${text}\n${payload.url}`); setShared(true); window.setTimeout(() => setShared(false), 1800) } }
  const network = (network: string) => { const url = encodeURIComponent(payload.url); const body = encodeURIComponent(`${title}\n${text}`); const links: Record<string, string> = { facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`, x: `https://twitter.com/intent/tweet?text=${body}&url=${url}`, instagram: "https://www.instagram.com/", tiktok: "https://www.tiktok.com/upload" }; window.open(links[network], "_blank", "noopener,noreferrer"); setPublished(true); setChooser(false) }
  return <div className="social-actions" aria-label="Actions du texte"><button className={liked ? "is-selected" : ""} onClick={() => { setLiked(!liked); setDisliked(false) }} aria-label="J'aime" aria-pressed={liked}><ThumbsUp size={16} /><span>J&apos;aime</span></button><button className={disliked ? "is-selected" : ""} onClick={() => { setDisliked(!disliked); setLiked(false) }} aria-label="Je n'aime pas" aria-pressed={disliked}><ThumbsDown size={16} /><span>Pas pour moi</span></button><button onClick={share} aria-label="Partager"><Share2 size={16} /><span>{shared ? "Lien copié" : "Partager"}</span></button><button className={favorite ? "is-selected" : ""} onClick={() => setFavorite(!favorite)} aria-label="Ajouter aux favoris" aria-pressed={favorite}><Heart size={16} /><span>{favorite ? "Favori" : "Favoris"}</span></button><button className={published ? "is-selected" : ""} onClick={() => setChooser(!chooser)} aria-label="Publier"><Send size={16} /><span>{published ? "Publié" : "Publier"}</span></button>{chooser && <div className="publish-chooser"><button onClick={() => network("instagram")}><Globe2 size={15} /> Instagram</button><button onClick={() => network("tiktok")}><span className="network-letter">T</span> TikTok</button><button onClick={() => network("facebook")}><Globe2 size={15} /> Facebook</button><button onClick={() => network("x")}><X size={15} /> X</button></div>}</div>
}

export function WritingCard({ children, text, title }: { children: React.ReactNode; text?: string; title?: string }) { return <article className="writing-card"><div className="card-rule" /><div className="card-content">{children}</div><SocialActions text={text} title={title} /></article> }

export function FavoriteShelf({ title = "Favoris" }: { title?: string }) { const [count, setCount] = useState(0); return <section className="favorite-shelf"><Heart size={15} /><span>{title}</span><strong>{count}</strong><button onClick={() => setCount(count + 1)} aria-label="Ajouter un favori de démonstration">+ Ajouter</button></section> }
