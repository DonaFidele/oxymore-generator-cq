"use client"

import { useState } from "react"
import { Check, Copy, Heart, MoreHorizontal, Send, Share2, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react"

type SocialActionsProps = { text?: string; title?: string; onDelete?: () => void }

export function SocialActions({ text = "", title = "Lunogramme", onDelete }: SocialActionsProps) {
  const [reaction, setReaction] = useState<"like" | "dislike" | null>(null)
  const [favorite, setFavorite] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [publishOpen, setPublishOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const payload = `${title}\n${text}`
  const copy = async () => { await navigator.clipboard?.writeText(payload); setCopied(true); window.setTimeout(() => setCopied(false), 1600) }
  const share = async () => { if (navigator.share) await navigator.share({ title, text, url: window.location.href }).catch(() => undefined); else await copy() }
  const publish = (network: string) => { const body = encodeURIComponent(payload); const url = encodeURIComponent(window.location.href); const links: Record<string, string> = { facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${body}`, x: `https://twitter.com/intent/tweet?text=${body}&url=${url}` }; if (links[network]) window.open(links[network], "_blank", "noopener,noreferrer"); else copy(); setPublishOpen(false) }
  return <div className="social-actions" aria-label="Actions du texte">
    <button className={reaction === "like" ? "is-selected" : ""} onClick={() => setReaction(reaction === "like" ? null : "like")} aria-label="J'aime" aria-pressed={reaction === "like"} title="J'aime"><ThumbsUp size={16} /><span>J&apos;aime</span></button>
    <button className={reaction === "dislike" ? "is-selected is-negative" : ""} onClick={() => setReaction(reaction === "dislike" ? null : "dislike")} aria-label="Je n'aime pas" aria-pressed={reaction === "dislike"} title="Je n'aime pas"><ThumbsDown size={16} /><span>Pas pour moi</span></button>
    <button className={favorite ? "is-selected is-favorite" : ""} onClick={() => setFavorite(!favorite)} aria-label="Ajouter aux favoris" aria-pressed={favorite} title="Favori"><Heart size={16} fill={favorite ? "currentColor" : "none"} /><span>Favori</span></button>
    <button onClick={share} aria-label="Partager" title="Partager"><Share2 size={16} /><span>Partager</span></button>
    <div className="social-action-menu"><button onClick={() => setMenuOpen(!menuOpen)} aria-label="Plus d'actions" title="Plus d'actions"><MoreHorizontal size={18} /></button>{menuOpen && <div className="publish-chooser" role="menu"><button onClick={copy} title="Copier le texte"><Copy size={14} /> Copier</button><button onClick={() => setPublishOpen(!publishOpen)} title="Publier sur un réseau"><Send size={14} /> Publier</button>{publishOpen && <div className="publish-networks"><button onClick={() => publish("instagram")}><span className="brand-icon brand-instagram">◎</span> Instagram</button><button onClick={() => publish("tiktok")}><span className="brand-icon brand-tiktok">♪</span> TikTok</button><button onClick={() => publish("facebook")}><span className="brand-icon brand-facebook">f</span> Facebook</button><button onClick={() => publish("x")}><span className="brand-icon brand-x">𝕏</span> X</button></div>}{onDelete && <button className="danger-action" onClick={onDelete} title="Supprimer"><Trash2 size={14} /> Supprimer</button>}</div>}</div>{copied && <span className="action-toast" role="status"><Check size={13} /> Copié</span>}</div>
}

export function WritingCard({ children, text, title }: { children: React.ReactNode; text?: string; title?: string }) { return <article className="writing-card"><div className="card-rule" /><div className="card-content">{children}</div><SocialActions text={text} title={title} /></article> }

export function FavoriteShelf() { return null }
