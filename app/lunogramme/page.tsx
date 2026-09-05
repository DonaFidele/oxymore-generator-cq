"use client"

import { useState } from "react"
import { ArrowRight, Moon, Sparkles } from "lucide-react"
import { PageShell, SectionIntro } from "@/components/lunar-nav"
import { WritingCard } from "@/components/social-actions"
import { CreationArchive, saveCreation } from "@/components/creation-archive"

export default function LunogrammePage() {
  const [mood, setMood] = useState(""); const [generated, setGenerated] = useState(false); const [archiveVersion, setArchiveVersion] = useState(0)
  const openJournal = () => { saveCreation("lunogramme-journals", { title: "Ce qui grandit dans le silence", text: `${mood}, tu peux le déposer ici. Observe ce qui cherche sa forme avant de lui demander un nom.` }); setGenerated(true); setMood(""); setArchiveVersion(version => version + 1) }
  return <PageShell><div className="feature-page" data-tour="lunogramme"><SectionIntro eyebrow="Le journal lunaire · aujourd&apos;hui" title={<>Écris avec la<br /><em>phase du moment.</em></>}>La lune n&apos;explique rien. Elle accompagne. Dépose ici ce qui te traverse et reçois une invitation à écrire depuis l&apos;intention de sa phase.</SectionIntro><div className="moon-panel"><div className="moon-visual"><Moon size={70} strokeWidth={0.7} /><span>Premier quartier</span></div><div className="mood-entry"><p className="eyebrow">Ton humeur du jour</p><textarea value={mood} onChange={e => setMood(e.target.value)} placeholder="Je me sens..." rows={4} /><button className="primary-button" onClick={openJournal} disabled={!mood}>Ouvrir le journal <ArrowRight size={16} /></button></div></div>{generated && <WritingCard><p className="eyebrow"><Sparkles size={13} /> Invitation lunaire</p><h2>Ce qui grandit dans le silence</h2><p className="poem-text">{mood}, tu peux le déposer ici.<br />Observe ce qui cherche sa forme<br />avant de lui demander un nom.</p><div className="writing-prompt"><span>À écrire</span><p>Quelle petite chose en toi demande aujourd&apos;hui un peu plus de lumière ?</p></div></WritingCard>}<div key={archiveVersion}><CreationArchive storageKey="lunogramme-journals" label="Journaux précédents" emptyText="Tes journaux reposeront ici, datés et fermés jusqu’à leur prochaine ouverture." /></div></div></PageShell>
}
