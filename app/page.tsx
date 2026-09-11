"use client"

import { PageShell } from "@/components/lunar-nav"
import { OxymoreFeed } from "@/components/oxymore-feed"

export default function HomePage() {
  return <PageShell><main className="social-home"><OxymoreFeed onGenerate={() => { window.location.href = "/oxymores" }} /></main></PageShell>
}
