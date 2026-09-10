"use client"

import { ArrowDown, Sparkles } from "lucide-react"
import { PageShell } from "@/components/lunar-nav"
import { OxymoreFeed } from "@/components/oxymore-feed"

export default function HomePage() { return <PageShell><main className="social-home"><section className="social-hero"><p className="eyebrow"><Sparkles size={14} /> Un réseau de poésie contradictoire</p><h1>Le fil des mots<br /><em>impossibles.</em></h1><p>Découvre des oxymores générés par l&apos;IA, fais-les résonner et publie les tiens.</p><a href="#feed" className="scroll-cue"><ArrowDown size={16} /> Défiler pour découvrir</a></section><div id="feed"><OxymoreFeed onGenerate={() => window.location.href = "/oxymores"} /></div></main></PageShell> }
