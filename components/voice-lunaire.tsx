"use client"

import { Pause, Play, Volume2 } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export function VoiceLunaire({ text }: { text: string }) {
  const [speaking, setSpeaking] = useState(false)
  const utterance = useRef<SpeechSynthesisUtterance | null>(null)

  useEffect(() => () => { window.speechSynthesis?.cancel() }, [])

  function toggle() {
    if (!window.speechSynthesis) return
    if (speaking) { window.speechSynthesis.cancel(); setSpeaking(false); return }
    const next = new SpeechSynthesisUtterance(text)
    next.lang = "fr-FR"
    next.rate = 0.82
    next.pitch = 0.82
    next.onend = () => setSpeaking(false)
    utterance.current = next
    window.speechSynthesis.speak(next)
    setSpeaking(true)
  }

  return <button className="voice-button" onClick={toggle} aria-label={speaking ? "Arrêter la voix lunaire" : "Écouter la voix lunaire"} title={speaking ? "Arrêter" : "Voix lunaire"}>{speaking ? <Pause size={14} /> : <Play size={14} />}<Volume2 size={13} /><span>{speaking ? "La lune lit" : "Voix lunaire"}</span></button>
}
