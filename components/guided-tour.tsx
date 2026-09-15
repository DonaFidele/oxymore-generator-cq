"use client"

import { useEffect, useState } from "react"
import { ArrowLeft, ArrowRight, Compass, Sparkles, X } from "lucide-react"

const steps = [
  { title: "Entre dans le rituel", text: "Explore les trois espaces de Lunogramme depuis la navigation flottante.", target: "nav" },
  { title: "Compose avec les oxymores", text: "Mélange deux émotions contraires pour faire surgir une poésie inattendue.", target: "oxymores" },
  { title: "Écris avec la lune", text: "Dépose ton humeur du jour et laisse la phase lunaire guider ton écriture.", target: "lunogramme" },
  { title: "Garde une trace", text: "Aime, partage, ajoute en favori ou publie les fragments qui te ressemblent.", target: "actions" },
]

export function GuidedTour() {
  const [step, setStep] = useState(0)
  const [open, setOpen] = useState(false)
  useEffect(() => { if (!sessionStorage.getItem("lunogramme-tour-seen")) setOpen(true) }, [])
  if (!open) return null
  const current = steps[step]
  const close = () => { sessionStorage.setItem("lunogramme-tour-seen", "true"); setOpen(false) }
  return <div className="tour-backdrop" role="dialog" aria-modal="true" aria-labelledby="tour-title">
    <div className={`tour-card tour-target-${current.target}`}>
      <div className="tour-orbit tour-orbit-one"><Sparkles size={13} /></div><div className="tour-orbit tour-orbit-two"><span /></div>
      <button className="tour-close" onClick={close} aria-label="Fermer la présentation"><X size={17} /></button>
      <div className="tour-icon"><Compass size={20} /></div><p className="eyebrow">Rituel {step + 1} / {steps.length}</p><h2 id="tour-title">{current.title}</h2><p>{current.text}</p>
      <div className="tour-footer"><button className="tour-back" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} aria-label="Étape précédente"><ArrowLeft size={15} /> Retour</button><div className="tour-dots">{steps.map((_, i) => <span key={i} className={i === step ? "active" : ""} />)}</div><button className="tour-next" onClick={() => step === steps.length - 1 ? close() : setStep(step + 1)}>{step === steps.length - 1 ? "Commencer" : "Suivant"} <ArrowRight size={16} /></button></div>
    </div>
  </div>
}
