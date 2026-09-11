"use client"

import { ArrowDown } from "lucide-react"
import { PageShell } from "@/components/lunar-nav"
import { OxymoreFeed } from "@/components/oxymore-feed"

export default function HomePage() { return <PageShell><main className="social-home"><section className="social-hero"><a href="#feed" className="scroll-cue"><ArrowDown size={16} /> Découvrir</a></section><div id="feed"><OxymoreFeed onGenerate={() => window.location.href = "/oxymores"} /></div></main></PageShell> }
