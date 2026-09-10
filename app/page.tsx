'use client'

import { FormEvent, useMemo, useState } from 'react'
import { Moon, Sparkles } from 'lucide-react'
import { Moon as LunarMoon } from 'lunarphase-js'

type RitualGeneration = {
  poem: string
  promptEcriture: string
}

const PHASE_LABELS: Record<string, string> = {
  New: 'Nouvelle lune',
  'Waxing Crescent': 'Premier croissant',
  'First Quarter': 'Premier quartier',
  'Waxing Gibbous': 'Gibbeuse croissante',
  Full: 'Pleine lune',
  'Waning Gibbous': 'Gibbeuse décroissante',
  'Last Quarter': 'Dernier quartier',
  'Waning Crescent': 'Dernier croissant',
}

const PHASE_INTENTIONS: Record<string, string> = {
  New: 'deuil, silence et recommencement',
  'Waxing Crescent': 'élan fragile et désir de naître',
  'First Quarter': 'choix, tension et passage à l’acte',
  'Waxing Gibbous': 'maturation et lumière intérieure',
  Full: 'colère, amour brut et vérité exposée',
  'Waning Gibbous': 'transmission, gratitude et partage',
  'Last Quarter': 'tri, lucidité et détachement',
  'Waning Crescent': 'repos, mémoire et retour à soi',
}

export default function Home() {
  const today = useMemo(() => new Date(), [])
  const moonPhase = useMemo(() => LunarMoon.lunarPhase(today), [today])
  const moonEmoji = useMemo(() => LunarMoon.lunarPhaseEmoji(today), [today])
  const phaseLabel = PHASE_LABELS[moonPhase] || moonPhase
  const intention = PHASE_INTENTIONS[moonPhase] || 'écoute et transformation'

  const [mood, setMood] = useState('')
  const [generation, setGeneration] = useState<RitualGeneration | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!mood.trim()) {
      setError('Dis-moi comment tu te sens, même en quelques mots.')
      return
    }

    setError('')
    setGeneration(null)
    setIsLoading(true)

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mood, moonPhase }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Une erreur est survenue.')
      setGeneration({ poem: data.poem, promptEcriture: data.promptEcriture })
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Le rituel a été interrompu.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-7 sm:px-10 lg:px-16">
        <header className="flex items-center justify-between border-b border-border/70 pb-6">
          <a href="#top" className="flex items-center gap-3 font-serif text-lg tracking-[0.18em] text-foreground">
            <span className="flex size-8 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-accent"><Moon className="size-4" strokeWidth={1.5} /></span>
            LUNOGRAMME
          </a>
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">Rituel 02</span>
        </header>

        <section id="top" className="grid flex-1 items-center gap-16 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <div className="max-w-xl">
            <div className="mb-7 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
              <span className="text-xl normal-case">{moonEmoji}</span>
              <span>{phaseLabel}</span>
            </div>
            <h1 className="max-w-lg font-serif text-5xl leading-[0.98] tracking-tight text-balance sm:text-7xl">
              Ce soir, la lune <span className="italic text-accent">te lit.</span>
            </h1>
            <p className="mt-8 max-w-md font-serif text-lg leading-8 text-muted-foreground">
              Ton humeur rencontre l’intention de la phase lunaire. Un poème apparaît, puis une invitation à écrire.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -inset-8 rounded-full bg-accent/5 blur-3xl" aria-hidden="true" />
            <form onSubmit={handleSubmit} className="relative border border-border bg-card/70 p-7 shadow-2xl shadow-black/20 backdrop-blur-sm sm:p-10">
              <div className="mb-8 flex items-start justify-between gap-5">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">L’intention du jour</span>
                  <p className="mt-3 font-serif text-lg text-foreground">{intention}</p>
                </div>
                <Sparkles className="mt-1 size-4 shrink-0 text-accent" strokeWidth={1.5} />
              </div>
              <label className="block">
                <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Comment tu te sens, ce soir ?</span>
                <textarea value={mood} onChange={(event) => setMood(event.target.value)} placeholder="fatiguée, en colère, légère, perdue…" rows={4} maxLength={500} className="w-full resize-y border border-border bg-transparent px-3 py-3 font-serif text-xl leading-relaxed text-foreground outline-none placeholder:text-muted-foreground/45 focus:border-accent focus:ring-0" aria-label="Ton humeur" />
              </label>
              {error && <p role="alert" className="mt-5 text-sm text-destructive">{error}</p>}
              <button type="submit" disabled={isLoading} className="mt-8 flex w-full items-center justify-center gap-3 bg-primary px-5 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-primary-foreground transition hover:bg-accent hover:text-accent-foreground disabled:cursor-wait disabled:opacity-60">
                {isLoading ? 'La lune écoute…' : 'Recevoir le rituel du jour'}
              </button>
            </form>
          </div>
        </section>

        {generation && (
          <section aria-live="polite" className="border-t border-border/70 py-16">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">À ton tour d’écrire</p>
                <p className="mt-6 font-serif text-lg italic leading-8 text-muted-foreground">{generation.promptEcriture}</p>
              </div>
              <blockquote className="whitespace-pre-line border-l border-accent/50 pl-7 font-serif text-2xl leading-relaxed text-foreground sm:text-3xl">{generation.poem}</blockquote>
            </div>
          </section>
        )}

        <footer className="flex items-center justify-between border-t border-border/70 py-6 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground"><span>Écrire entre les lignes</span><span>© Lunogramme</span></footer>
      </div>
    </main>
  )
}
